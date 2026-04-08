/**
 * Scan orchestration: incremental scanning with vault-index.json and scan-state.json.
 * Discovers all .md files, classifies changes via content hashing, parses changed files,
 * and produces cached JSON indexes.
 *
 * Zero external dependencies -- Node.js built-ins only.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { hashContent, writeJsonAtomic, discoverFiles, loadJson } = require('./utils.cjs');
const { parseFile } = require('./parser.cjs');
const { buildLinkMap, buildTagIndex } = require('./indexer.cjs');

/**
 * Classify file changes by comparing current files against previous scan state.
 * Uses mtime as a fast pre-check before computing SHA-256 hash.
 *
 * @param {string} vaultRoot - Path to vault root
 * @param {string[]} currentFiles - Array of vault-relative .md file paths
 * @param {object|null} prevState - Previous scan-state.json data
 * @param {boolean} forceFull - Force all files to be treated as "added"
 * @returns {{ added: string[], modified: string[], deleted: string[], unchanged: string[] }}
 */
function classifyChanges(vaultRoot, currentFiles, prevState, forceFull) {
  if (forceFull || !prevState || !prevState.files) {
    return { added: currentFiles, modified: [], deleted: [], unchanged: [] };
  }

  const added = [];
  const modified = [];
  const unchanged = [];
  const prevPaths = new Set(Object.keys(prevState.files));

  for (const file of currentFiles) {
    const normalPath = file.replace(/\\/g, '/');
    const prev = prevState.files[normalPath];

    if (!prev) {
      added.push(file);
    } else {
      prevPaths.delete(normalPath);

      try {
        const fullPath = path.join(vaultRoot, file);
        const stat = fs.statSync(fullPath);

        if (stat.mtimeMs === prev.mtime) {
          // Fast path: mtime unchanged, skip hash computation
          unchanged.push(file);
        } else {
          // Mtime changed -- verify with hash
          const content = fs.readFileSync(fullPath, 'utf8');
          const hash = hashContent(content);
          if (hash === prev.hash) {
            // Content identical despite mtime change
            unchanged.push(file);
          } else {
            modified.push(file);
          }
        }
      } catch {
        // If we can't stat/read, treat as modified to trigger re-parse
        modified.push(file);
      }
    }
  }

  // Remaining paths in prevPaths no longer exist on disk
  const deleted = [...prevPaths];

  return { added, modified, deleted, unchanged };
}

/**
 * Merge parse results with unchanged entries from previous vault-index.
 * Builds the final notes object keyed by normalized path.
 *
 * @param {object[]} parsed - Newly parsed file results
 * @param {string[]} unchangedFiles - Files to carry forward from previous index
 * @param {object|null} prevIndex - Previous vault-index.json data
 * @returns {object} Notes object keyed by normalized path
 */
function mergeResults(parsed, unchangedFiles, prevIndex) {
  const notes = {};

  // Add newly parsed files
  for (const result of parsed) {
    notes[result.path] = result;
  }

  // Carry forward unchanged files from previous index
  if (prevIndex && prevIndex.notes) {
    for (const file of unchangedFiles) {
      const normalPath = file.replace(/\\/g, '/');
      if (prevIndex.notes[normalPath]) {
        notes[normalPath] = prevIndex.notes[normalPath];
      }
    }
  }

  // Deleted files are simply not included

  return notes;
}

/**
 * Run a full or incremental scan of the vault.
 *
 * @param {string} vaultRoot - Path to vault root
 * @param {object} [options] - Scan options
 * @param {boolean} [options.full=false] - Force full re-scan ignoring hashes
 * @param {boolean} [options.verbose=false] - Return per-file details in results
 * @param {string} [options.indexDir] - Where to write index files (default: .claude/indexes)
 * @returns {object} Scan results with counts and optional details
 */
function scan(vaultRoot, options = {}) {
  const startTime = Date.now();

  try {
    const resolvedRoot = path.resolve(vaultRoot);
    const full = options.full || false;
    const verbose = options.verbose || false;
    const indexDir = options.indexDir || path.join(resolvedRoot, '.claude', 'indexes');

    // Phase 1: Discover all .md files
    const currentFiles = discoverFiles(resolvedRoot);

    // Phase 2: Load previous state
    const prevState = loadJson(path.join(indexDir, 'scan-state.json'));
    const prevIndex = loadJson(path.join(indexDir, 'vault-index.json'));

    // Phase 3: Classify changes
    const { added, modified, deleted, unchanged } = classifyChanges(
      resolvedRoot, currentFiles, prevState, full
    );

    // Phase 4: Parse changed files
    const toProcess = [...added, ...modified];
    const parsed = [];
    for (const file of toProcess) {
      try {
        parsed.push(parseFile(resolvedRoot, file));
      } catch (err) {
        // Log error but continue scanning -- don't let one bad file block the scan
        console.error(`Warning: failed to parse ${file}: ${err.message}`);
      }
    }

    // Phase 5: Merge results
    const notes = mergeResults(parsed, unchanged, prevIndex);

    // Phase 6: Write vault-index.json
    const vaultIndex = {
      version: 1,
      generated: Date.now(),
      noteCount: Object.keys(notes).length,
      notes,
    };
    writeJsonAtomic(path.join(indexDir, 'vault-index.json'), vaultIndex);

    // Phase 6b: Build and write derived indexes
    const linkMap = buildLinkMap(vaultIndex);
    writeJsonAtomic(path.join(indexDir, 'link-map.json'), linkMap);

    const tagIndex = buildTagIndex(vaultIndex);
    writeJsonAtomic(path.join(indexDir, 'tag-index.json'), tagIndex);

    // Phase 7: Write scan-state.json
    const scanState = {
      version: 1,
      lastScan: Date.now(),
      lastFullScan: full ? Date.now() : (prevState ? prevState.lastFullScan || null : null),
      scanCount: prevState ? (prevState.scanCount || 0) + 1 : 1,
      files: {},
    };

    // Populate files from the merged notes (hash and mtime for every note)
    for (const [notePath, noteData] of Object.entries(notes)) {
      scanState.files[notePath] = {
        hash: noteData.hash,
        mtime: noteData.mtime,
      };
    }
    writeJsonAtomic(path.join(indexDir, 'scan-state.json'), scanState);

    // Phase 8: Return results
    const result = {
      added: added.length,
      modified: modified.length,
      deleted: deleted.length,
      unchanged: unchanged.length,
      total: Object.keys(notes).length,
      elapsed: Date.now() - startTime,
      links: linkMap.totalCount,
      unresolvedLinks: linkMap.unresolvedCount,
      tags: tagIndex.tagCount,
    };

    if (verbose) {
      result.details = { added, modified, deleted, unchanged };
    }

    return result;
  } catch (err) {
    return {
      error: err.message,
      added: 0,
      modified: 0,
      deleted: 0,
      unchanged: 0,
      total: 0,
      elapsed: Date.now() - startTime,
    };
  }
}

/**
 * Run scan with post-scan embedding sync.
 * Wraps the synchronous scan() and adds async embedding generation for changed notes.
 *
 * @param {string} vaultRoot - Path to vault root
 * @param {object} [options] - Same options as scan() (full, verbose, indexDir)
 * @returns {Promise<object>} Scan results augmented with result.embedding
 */
async function scanWithEmbeddings(vaultRoot, options = {}) {
  const result = scan(vaultRoot, options);

  // If scan failed, return immediately without embedding
  if (result.error) {
    return result;
  }

  // Try to load embedder -- skip gracefully if not available
  let embedder;
  try {
    embedder = require('../search/embedder.cjs');
  } catch {
    result.embedding = { skipped: true, reason: 'embedder not available' };
    return result;
  }

  try {
    const resolvedRoot = path.resolve(vaultRoot);
    const indexDir = options.indexDir || path.join(resolvedRoot, '.claude', 'indexes');
    const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));

    if (!vaultIndex) {
      result.embedding = { skipped: true, reason: 'vault-index.json not found' };
      return result;
    }

    const embedResult = await embedder.syncEmbeddings(resolvedRoot, result, vaultIndex);
    result.embedding = embedResult;
  } catch (err) {
    result.embedding = { skipped: true, reason: err.message };
  }

  return result;
}

module.exports = { scan, scanWithEmbeddings };
