/**
 * Utility module for the /triage skill.
 * Inbox scanning, frontmatter fixing, and note moving utilities.
 *
 * Zero external dependencies -- Node.js built-ins + existing skill modules only.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { loadJson } = require('../scan/utils.cjs');
const { getTemplateInfo } = require('../create/create-utils.cjs');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Notes in these inbox sub-paths are excluded from triage. */
const EXCLUDED_SUBFOLDERS = ['00 - Inbox/Daily Notes'];

/** The inbox MOC / index file itself should not be triaged. */
const EXCLUDED_FILENAMES = ['Inbox.md'];

// ---------------------------------------------------------------------------
// Frontmatter regex -- handles both \n and \r\n line endings (Windows compat)
// ---------------------------------------------------------------------------

/**
 * Match a YAML frontmatter block at the start of a file.
 * Captures everything between the opening and closing `---` delimiters.
 * Supports both Unix (\n) and Windows (\r\n) line endings.
 */
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Parse a simple YAML frontmatter string into a plain object.
 * Handles scalar values and simple arrays (both inline `[a, b]` and multi-line `- a`).
 * This is intentionally minimal -- not a full YAML parser.
 *
 * @param {string} yamlStr - Raw YAML content between --- delimiters
 * @returns {object} Parsed key-value pairs
 */
function parseSimpleYaml(yamlStr) {
  const result = {};
  const lines = yamlStr.split(/\r?\n/);
  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    // Array continuation: "  - value"
    const arrayItemMatch = line.match(/^\s+-\s+(.+)$/);
    if (arrayItemMatch && currentKey) {
      if (!currentArray) currentArray = [];
      currentArray.push(arrayItemMatch[1].trim());
      continue;
    }

    // Flush any pending array
    if (currentKey && currentArray) {
      result[currentKey] = currentArray;
      currentArray = null;
      currentKey = null;
    }

    // Key-value pair: "key: value"
    const kvMatch = line.match(/^([a-zA-Z_-]+)\s*:\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      let value = kvMatch[2].trim();

      // Inline array: [a, b, c]
      if (value.startsWith('[') && value.endsWith(']')) {
        const inner = value.slice(1, -1).trim();
        result[key] = inner
          ? inner.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''))
          : [];
        currentKey = null;
      } else if (value === '' || value === '[]') {
        // Empty value -- might be start of multi-line array
        currentKey = key;
        currentArray = value === '[]' ? [] : null;
        if (value === '[]') {
          result[key] = [];
          currentKey = null;
          currentArray = null;
        }
      } else {
        // Scalar value -- strip surrounding quotes
        result[key] = value.replace(/^['"]|['"]$/g, '');
        currentKey = null;
      }
    }
  }

  // Flush trailing array
  if (currentKey && currentArray) {
    result[currentKey] = currentArray;
  }

  return result;
}

/**
 * Serialize a plain object back into simple YAML frontmatter string.
 * Preserves order of keys from the original where possible.
 *
 * @param {object} obj - Key-value pairs to serialize
 * @returns {string} YAML string (without --- delimiters)
 */
function serializeSimpleYaml(obj) {
  const lines = [];
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else {
        lines.push(`${key}: [${value.join(', ')}]`);
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Collect all notes in 00 - Inbox/ that need triage.
 *
 * Excludes:
 * - Notes in 00 - Inbox/Daily Notes/ subfolder
 * - The Inbox.md file itself
 * - Template files (isTemplate flag in vault index)
 *
 * For each qualifying note, reads the full file content from disk
 * and enriches with metadata from the vault index.
 *
 * @param {string} vaultRoot - Absolute or relative path to vault root
 * @param {object} vaultIndex - Parsed vault-index.json (notes keyed by path)
 * @returns {Array<{path: string, name: string, content: string, frontmatter: object, tags: string[], headings: string[], links: Array, hasType: boolean, hasTags: boolean}>}
 */
function getInboxNotes(vaultRoot, vaultIndex) {
  const resolvedRoot = path.resolve(vaultRoot);
  const notes = vaultIndex.notes || vaultIndex;
  const result = [];

  for (const [notePath, noteData] of Object.entries(notes)) {
    const normalized = notePath.replace(/\\/g, '/');

    // Must be in 00 - Inbox/
    if (!normalized.startsWith('00 - Inbox/')) continue;

    // Exclude Daily Notes subfolder
    if (EXCLUDED_SUBFOLDERS.some(sub => normalized.startsWith(sub))) continue;

    // Exclude the Inbox.md index file itself
    const basename = path.basename(normalized);
    if (EXCLUDED_FILENAMES.includes(basename)) continue;

    // Exclude templates
    if (noteData.isTemplate) continue;

    // Read full file content from disk
    const fullPath = path.join(resolvedRoot, notePath);
    let content = '';
    try {
      content = fs.readFileSync(fullPath, 'utf8');
    } catch {
      // File may have been moved or deleted since last scan -- skip it
      continue;
    }

    const fm = noteData.frontmatter || {};
    const allTags = noteData.allTags || [];

    result.push({
      path: normalized,
      name: noteData.name || basename.replace(/\.md$/, ''),
      content,
      frontmatter: fm,
      tags: allTags,
      headings: noteData.headings || [],
      links: noteData.links || [],
      hasType: !!(fm.type && fm.type !== ''),
      hasTags: allTags.length > 0,
    });
  }

  return result;
}

/**
 * Modify frontmatter fields on a note file (AUTO zone action).
 *
 * - If the note has no frontmatter block, inserts a new one at the top.
 * - If the note has existing frontmatter, updates/adds specified fields
 *   without disturbing other fields or the note body.
 * - NEVER modifies anything outside the frontmatter block.
 *
 * @param {string} vaultRoot - Absolute or relative path to vault root
 * @param {string} notePath - Vault-relative path to the note
 * @param {object} updates - Fields to set, e.g. { type: "tool", tags: ["docker"] }
 * @returns {{ applied: boolean, fields: string[] }}
 */
function applyFrontmatterFix(vaultRoot, notePath, updates) {
  const resolvedRoot = path.resolve(vaultRoot);
  const fullPath = path.join(resolvedRoot, notePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  const match = content.match(FRONTMATTER_RE);

  if (match) {
    // Existing frontmatter -- parse, merge, and rewrite the block only
    const existingYaml = match[1];
    const parsed = parseSimpleYaml(existingYaml);

    // Merge updates into existing frontmatter
    for (const [key, value] of Object.entries(updates)) {
      parsed[key] = value;
    }

    const newYaml = serializeSimpleYaml(parsed);
    // Replace only the frontmatter block -- body text is untouched
    content = content.replace(FRONTMATTER_RE, `---\n${newYaml}\n---`);
  } else {
    // No frontmatter -- insert a new block at the very top
    const newYaml = serializeSimpleYaml(updates);
    content = `---\n${newYaml}\n---\n\n${content}`;
  }

  fs.writeFileSync(fullPath, content, 'utf8');

  return {
    applied: true,
    fields: Object.keys(updates),
  };
}

/**
 * Move a note file from one folder to another.
 *
 * This is a PROPOSE zone action -- only call after user approval.
 *
 * - Constructs target path as targetFolder/basename(sourcePath).
 * - Creates target directory if it doesn't exist.
 * - Checks for filename collision at target.
 * - Uses fs.renameSync to move the file.
 *
 * @param {string} vaultRoot - Absolute or relative path to vault root
 * @param {string} sourcePath - Vault-relative path of the note to move
 * @param {string} targetFolder - Vault-relative target folder (e.g. "03 - Resources")
 * @returns {{ moved: boolean, from?: string, to?: string, reason?: string }}
 */
function moveNote(vaultRoot, sourcePath, targetFolder) {
  const resolvedRoot = path.resolve(vaultRoot);
  const sourceFullPath = path.join(resolvedRoot, sourcePath);
  const basename = path.basename(sourcePath);
  const targetPath = path.join(targetFolder, basename).replace(/\\/g, '/');
  const targetFullPath = path.join(resolvedRoot, targetPath);

  // Create target directory if it doesn't exist
  const targetDir = path.dirname(targetFullPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Check for collision at target
  if (fs.existsSync(targetFullPath)) {
    return {
      moved: false,
      reason: `File already exists at ${targetPath}`,
    };
  }

  // Move the file
  fs.renameSync(sourceFullPath, targetFullPath);

  return {
    moved: true,
    from: sourcePath,
    to: targetPath,
  };
}

// Fallback for frontmatter types not in TEMPLATE_MAP
// (e.g., 'review' maps to 'weekly'/'monthly' in TEMPLATE_MAP but is a single frontmatter type)
const TYPE_FOLDER_FALLBACK = {
  'review': '00 - Inbox',
};

/**
 * Get the canonical target folder for a given note type.
 *
 * Delegates to create-utils.cjs getTemplateInfo for consistent mapping.
 * Falls back to TYPE_FOLDER_FALLBACK for types not in TEMPLATE_MAP.
 * Returns the folder string, or null if the type is unknown.
 *
 * @param {string} type - Note type (project, tool, zettel, etc.)
 * @returns {string|null} Target folder path or null
 */
function getTargetFolder(type) {
  const info = getTemplateInfo(type);
  if (info) return info.folder;
  return TYPE_FOLDER_FALLBACK[type] || null;
}

module.exports = {
  getInboxNotes,
  applyFrontmatterFix,
  moveNote,
  getTargetFolder,
};
