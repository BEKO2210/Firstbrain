/**
 * Shared utilities for the scan skill.
 * Zero external dependencies -- Node.js built-ins only.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Compute SHA-256 hash of content string.
 * @param {string} content - File content
 * @returns {string} Hex-encoded SHA-256 hash
 */
function hashContent(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

/**
 * Write JSON data atomically: write to .tmp first, then rename.
 * Creates parent directories if they don't exist.
 * @param {string} filePath - Target file path
 * @param {*} data - Data to serialize as JSON
 */
function writeJsonAtomic(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const tmpPath = filePath + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmpPath, filePath);
}

/**
 * Discover all .md files in the vault, excluding dot-directories.
 * fs.globSync excludes dot-directories (.*) by default.
 * @param {string} vaultRoot - Absolute or relative path to vault root
 * @returns {string[]} Sorted array of vault-relative paths (forward slashes)
 */
function discoverFiles(vaultRoot) {
  const files = fs.globSync('**/*.md', { cwd: path.resolve(vaultRoot) });
  return files
    .map(f => f.replace(/\\/g, '/'))
    .sort();
}

/**
 * Normalize a file path to use forward slashes.
 * @param {string} p - File path
 * @returns {string} Normalized path with forward slashes
 */
function normalizePath(p) {
  return p.replace(/\\/g, '/');
}

/**
 * Load and parse a JSON file. Returns null if file doesn't exist or is invalid.
 * @param {string} filePath - Path to JSON file
 * @returns {*|null} Parsed JSON data or null
 */
function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

module.exports = {
  hashContent,
  writeJsonAtomic,
  discoverFiles,
  normalizePath,
  loadJson,
};
