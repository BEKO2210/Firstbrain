/**
 * Embedding generation and SQLite vector storage for semantic search.
 * Uses node:sqlite (built-in) for storage and @huggingface/transformers for embeddings.
 *
 * @huggingface/transformers is ESM-only -- loaded via dynamic import() from CJS.
 * All embedding functions are async.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

// ---------- Module-level caches ----------

let _pipeline = null;
let _embeddingAvailable = null;
let _vaultRootForPipeline = null;

// ---------- SQLite Operations ----------

/**
 * Open (or create) the SQLite embedding database.
 * Creates parent directory if needed. Sets WAL mode for concurrent reads.
 * @param {string} vaultRoot - Path to vault root
 * @returns {DatabaseSync} The database instance
 */
function openDb(vaultRoot) {
  const dbPath = path.join(vaultRoot, '.claude', 'embeddings.db');
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode=WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS embeddings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT UNIQUE NOT NULL,
      embedding BLOB NOT NULL,
      content_hash TEXT NOT NULL,
      note_type TEXT,
      title TEXT,
      updated INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_emb_path ON embeddings(path);
    CREATE INDEX IF NOT EXISTS idx_emb_hash ON embeddings(content_hash);
  `);
  return db;
}

/**
 * Store a Float32Array embedding as BLOB. Upserts via INSERT OR REPLACE.
 * @param {DatabaseSync} db - Open database
 * @param {string} notePath - Vault-relative note path
 * @param {Float32Array} embedding - The embedding vector
 * @param {string} contentHash - Content hash for change detection
 * @param {string} noteType - Note type from frontmatter
 * @param {string} title - Note title (name without .md)
 */
function storeEmbedding(db, notePath, embedding, contentHash, noteType, title) {
  const blob = new Uint8Array(embedding.buffer, embedding.byteOffset, embedding.byteLength);
  db.prepare(`
    INSERT OR REPLACE INTO embeddings (path, embedding, content_hash, note_type, title, updated)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(notePath, blob, contentHash, noteType || null, title || null, Date.now());
}

/**
 * Retrieve all stored embeddings.
 * @param {DatabaseSync} db - Open database
 * @returns {Array<{path: string, embedding: Uint8Array, title: string, note_type: string}>}
 */
function getAllEmbeddings(db) {
  return db.prepare('SELECT path, embedding, title, note_type FROM embeddings').all();
}

/**
 * Delete the embedding for a given note path.
 * @param {DatabaseSync} db - Open database
 * @param {string} notePath - Vault-relative note path
 */
function deleteEmbedding(db, notePath) {
  db.prepare('DELETE FROM embeddings WHERE path = ?').run(notePath);
}

/**
 * Convert a retrieved BLOB (Uint8Array) back to Float32Array.
 * @param {Uint8Array} blob - The raw BLOB data
 * @returns {Float32Array}
 */
function blobToVector(blob) {
  return new Float32Array(blob.buffer, blob.byteOffset, blob.byteLength / 4);
}

/**
 * Get embedding index status (count, latest/oldest timestamps).
 * @param {string} vaultRoot - Path to vault root
 * @returns {{ totalEmbeddings: number, latestUpdate: string|null, oldestUpdate: string|null }}
 */
function getEmbeddingStatus(vaultRoot) {
  const dbPath = path.join(vaultRoot, '.claude', 'embeddings.db');
  if (!fs.existsSync(dbPath)) {
    return { totalEmbeddings: 0, latestUpdate: null, oldestUpdate: null };
  }
  try {
    const db = new DatabaseSync(dbPath);
    const count = db.prepare('SELECT COUNT(*) as count FROM embeddings').get();
    const latest = db.prepare('SELECT MAX(updated) as latest FROM embeddings').get();
    const oldest = db.prepare('SELECT MIN(updated) as oldest FROM embeddings').get();
    db.close();
    if (!count.count) {
      return { totalEmbeddings: 0, latestUpdate: null, oldestUpdate: null };
    }
    return {
      totalEmbeddings: count.count,
      latestUpdate: latest.latest ? new Date(latest.latest).toISOString() : null,
      oldestUpdate: oldest.oldest ? new Date(oldest.oldest).toISOString() : null,
    };
  } catch {
    return { totalEmbeddings: 0, latestUpdate: null, oldestUpdate: null };
  }
}

// ---------- Embedding Generation ----------

/**
 * Generate an embedding vector for the given text.
 * Uses dynamic import() for the ESM-only @huggingface/transformers package.
 * Caches the pipeline after first creation.
 * @param {string} text - Text to embed
 * @param {string} [vaultRoot] - Vault root for model cache directory
 * @returns {Promise<Float32Array>} 384-dimensional embedding vector
 * @throws {Error} If @huggingface/transformers is not installed
 */
async function generateEmbedding(text, vaultRoot) {
  if (!_pipeline) {
    try {
      const { pipeline } = await import('@huggingface/transformers');
      const cacheDir = path.join(vaultRoot || '.', '.claude', '.models');
      _vaultRootForPipeline = vaultRoot || '.';
      _pipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        cache_dir: cacheDir,
      });
    } catch (err) {
      throw new Error(
        '@huggingface/transformers not installed. Run: npm install @huggingface/transformers'
      );
    }
  }
  const output = await _pipeline(text, { pooling: 'mean', normalize: true });
  return new Float32Array(output.data);
}

/**
 * Check if the embedding library (@huggingface/transformers) is available.
 * Does NOT throw. Caches the result.
 * @returns {Promise<boolean>}
 */
async function isEmbeddingAvailable() {
  if (_embeddingAvailable !== null) return _embeddingAvailable;
  try {
    await import('@huggingface/transformers');
    _embeddingAvailable = true;
  } catch {
    _embeddingAvailable = false;
  }
  return _embeddingAvailable;
}

// ---------- Text Extraction ----------

/**
 * Strip markdown to plain text for embedding input.
 * Removes frontmatter, code blocks, wiki-link syntax, formatting, etc.
 * @param {string} content - Raw markdown content
 * @returns {string} Plain text
 */
function extractBodyText(content) {
  // 1. Remove YAML frontmatter
  let text = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  // 2. Remove fenced code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  // 3. Remove inline code
  text = text.replace(/`[^`]+`/g, '');
  // 4. Convert wiki-links to plain text: [[Note|Display]] -> Display, [[Note]] -> Note
  text = text.replace(/\[\[([^\]|]*?\|)([^\]]+?)\]\]/g, '$2');
  text = text.replace(/\[\[([^\]]+?)\]\]/g, '$1');
  // 5. Remove markdown formatting (bold, italic, strikethrough)
  text = text.replace(/[*_~]{1,3}/g, '');
  // 6. Remove heading markers
  text = text.replace(/^#{1,6}\s+/gm, '');
  // 7. Remove HTML tags
  text = text.replace(/<[^>]+>/g, '');
  // 8. Collapse excess whitespace
  text = text.replace(/\n{3,}/g, '\n\n');
  // 9. Trim
  return text.trim();
}

/**
 * Build embedding input from note name and content.
 * Combines title + body text, truncated to maxLength.
 * @param {string} noteName - Note filename without .md
 * @param {string} noteContent - Raw markdown content
 * @param {number} [maxLength=512] - Maximum character length
 * @returns {string}
 */
function buildEmbeddingInput(noteName, noteContent, maxLength) {
  maxLength = maxLength || 512;
  const body = extractBodyText(noteContent);
  const combined = noteName + '. ' + body;
  return combined.slice(0, maxLength);
}

// ---------- Incremental Sync ----------

/** Files to skip during embedding (system/navigation files) */
const SYSTEM_FILES = new Set([
  'Home.md',
  'START HERE.md',
  'Workflow Guide.md',
  'Tag Conventions.md',
]);

/**
 * Sync embeddings after a /scan run.
 * Embeds added/modified files, removes deleted files.
 * @param {string} vaultRoot - Path to vault root
 * @param {object} scanResult - Result from scan() (preferably with verbose details)
 * @param {object} vaultIndex - vault-index.json data
 * @returns {Promise<{embedded: number, deleted: number, total: number}|{skipped: true, reason: string}>}
 */
async function syncEmbeddings(vaultRoot, scanResult, vaultIndex) {
  // 1. Check if embedding library is available
  const available = await isEmbeddingAvailable();
  if (!available) {
    return { skipped: true, reason: 'transformers not installed' };
  }

  // 2. Open database
  const db = openDb(vaultRoot);

  // 3. Determine files to embed
  let toEmbed = [];
  if (scanResult.details) {
    toEmbed = [...(scanResult.details.added || []), ...(scanResult.details.modified || [])];
  } else {
    // Non-verbose scan: embed all files not already in db with current hash
    const existingRows = getAllEmbeddings(db);
    const existingPaths = new Set(existingRows.map(r => r.path));
    const notes = vaultIndex.notes || {};
    for (const notePath of Object.keys(notes)) {
      if (!existingPaths.has(notePath)) {
        toEmbed.push(notePath);
      }
    }
  }

  // 4. Determine files to remove
  const toDelete = (scanResult.details && scanResult.details.deleted) || [];

  // 5. Delete embeddings for removed files
  for (const filePath of toDelete) {
    deleteEmbedding(db, filePath);
  }

  // 6. Embed each file
  let embeddedCount = 0;
  const notes = vaultIndex.notes || {};
  for (const filePath of toEmbed) {
    const note = notes[filePath];
    // Skip templates
    if (note && note.isTemplate) continue;
    // Skip template and atlas folders
    if (filePath.startsWith('05 - Templates/') || filePath.startsWith('06 - Atlas/')) continue;
    // Skip system files
    const baseName = path.basename(filePath);
    if (SYSTEM_FILES.has(baseName)) continue;

    try {
      const content = fs.readFileSync(path.join(vaultRoot, filePath), 'utf8');
      const noteName = note ? note.name : path.basename(filePath, '.md');
      const text = buildEmbeddingInput(noteName, content);
      const embedding = await generateEmbedding(text, vaultRoot);
      const hash = note ? note.hash : '';
      const type = note ? note.type : null;
      storeEmbedding(db, filePath, embedding, hash, type, noteName);
      embeddedCount++;
    } catch (err) {
      // Log but continue -- don't let one file block the sync
      console.error(`Warning: failed to embed ${filePath}: ${err.message}`);
    }
  }

  // 7. Get total count and close
  const totalRow = db.prepare('SELECT COUNT(*) as count FROM embeddings').get();
  const total = totalRow.count;
  db.close();

  // 8. Return stats
  return { embedded: embeddedCount, deleted: toDelete.length, total };
}

module.exports = {
  openDb,
  storeEmbedding,
  getAllEmbeddings,
  deleteEmbedding,
  blobToVector,
  generateEmbedding,
  isEmbeddingAvailable,
  extractBodyText,
  buildEmbeddingInput,
  syncEmbeddings,
  getEmbeddingStatus,
};
