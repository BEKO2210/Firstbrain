/**
 * Utility module for the /process skill (Command Processor).
 * Discovers PROMPT: files in Inbox, extracts prompt text, archives processed
 * prompts, and manages per-project changelogs.
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

/** Regex to match YAML frontmatter block at file start. */
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/** Regex to detect the PROMPT: marker (case-insensitive, after optional whitespace). */
const PROMPT_MARKER_RE = /^\s*PROMPT:\s*/i;

/** Folder where processed prompts are archived. */
const PROMPTS_ARCHIVE = '03 - Resources/Prompts';

/** Global changelog path. */
const GLOBAL_CHANGELOG = '.claude/changelog.md';

// ---------------------------------------------------------------------------
// Prompt Discovery
// ---------------------------------------------------------------------------

/**
 * Discover all Markdown files in 00 - Inbox/ whose body starts with "PROMPT:".
 *
 * Scans the vault index for inbox notes, reads their content, and checks
 * whether the body (after any frontmatter) begins with the PROMPT: marker.
 *
 * @param {string} vaultRoot - Path to the vault root
 * @param {object} vaultIndex - Parsed vault-index.json
 * @returns {Array<{path: string, name: string, content: string, frontmatter: string, body: string, promptText: string}>}
 */
function discoverPromptFiles(vaultRoot, vaultIndex) {
  const resolvedRoot = path.resolve(vaultRoot);
  const notes = vaultIndex.notes || vaultIndex;
  const results = [];

  for (const [notePath, noteData] of Object.entries(notes)) {
    const normalized = notePath.replace(/\\/g, '/');

    // Must be in 00 - Inbox/
    if (!normalized.startsWith('00 - Inbox/')) continue;

    // Skip Daily Notes subfolder and Inbox.md itself
    if (normalized.startsWith('00 - Inbox/Daily Notes')) continue;
    if (path.basename(normalized) === 'Inbox.md') continue;

    // Skip templates
    if (noteData.isTemplate) continue;

    // Read file content
    const fullPath = path.join(resolvedRoot, notePath);
    let content = '';
    try {
      content = fs.readFileSync(fullPath, 'utf8');
    } catch {
      continue; // File may have been moved/deleted
    }

    // Strip frontmatter to get body
    let body = content;
    let frontmatter = '';
    const fmMatch = content.match(FRONTMATTER_RE);
    if (fmMatch) {
      frontmatter = fmMatch[0];
      body = content.slice(fmMatch[0].length);
    }

    // Check if body starts with PROMPT:
    if (!PROMPT_MARKER_RE.test(body)) continue;

    // Extract the prompt text (everything after "PROMPT:")
    const promptText = extractPromptText(body);

    results.push({
      path: normalized,
      name: noteData.name || path.basename(normalized, '.md'),
      content,
      frontmatter,
      body,
      promptText,
    });
  }

  return results;
}

/**
 * Extract the prompt text from a note body that starts with "PROMPT:".
 * Removes the "PROMPT:" prefix and trims whitespace.
 *
 * @param {string} body - Note body text (after frontmatter)
 * @returns {string} The prompt instruction text
 */
function extractPromptText(body) {
  return body.replace(PROMPT_MARKER_RE, '').trim();
}

// ---------------------------------------------------------------------------
// Changelog Management
// ---------------------------------------------------------------------------

/**
 * Append an entry to a project-level CHANGELOG.md.
 * Creates the file if it doesn't exist.
 *
 * @param {string} vaultRoot - Path to the vault root
 * @param {string} projectFolder - Vault-relative project folder (e.g. "01 - Projects")
 * @param {object} entry - Changelog entry
 * @param {string} entry.date - Date string YYYY-MM-DD
 * @param {string} entry.action - Action verb (created, modified, linked, archived)
 * @param {string} entry.file - Vault-relative path of the affected file
 * @param {string} entry.promptRef - Name of the source prompt file
 */
function appendProjectChangelog(vaultRoot, projectFolder, entry) {
  const resolvedRoot = path.resolve(vaultRoot);
  const changelogPath = path.join(resolvedRoot, projectFolder, 'CHANGELOG.md');

  let content = '';
  if (fs.existsSync(changelogPath)) {
    content = fs.readFileSync(changelogPath, 'utf8');
  } else {
    content = '# Changelog\n';
  }

  const dateHeader = `\n## ${entry.date}\n`;
  const actionLine = `- **${capitalize(entry.action)}** \`${entry.file}\` (from [[${entry.promptRef}]])\n`;

  // Check if today's date header already exists
  if (content.includes(`## ${entry.date}`)) {
    // Append under existing date header
    content = content.replace(
      `## ${entry.date}\n`,
      `## ${entry.date}\n${actionLine}`
    );
  } else {
    // Add new date section after the title
    content += dateHeader + actionLine;
  }

  fs.writeFileSync(changelogPath, content, 'utf8');
}

/**
 * Append an entry to the global .claude/changelog.md.
 * Creates the file if it doesn't exist.
 *
 * @param {string} vaultRoot - Path to the vault root
 * @param {object} entry - Changelog entry
 * @param {string} entry.date - Date string YYYY-MM-DD
 * @param {string} entry.action - Action description
 * @param {string} entry.file - Vault-relative path of the affected file
 * @param {string} [entry.promptRef] - Name of the source prompt file
 */
function appendGlobalChangelog(vaultRoot, entry) {
  const resolvedRoot = path.resolve(vaultRoot);
  const changelogPath = path.join(resolvedRoot, GLOBAL_CHANGELOG);

  let content = '';
  if (fs.existsSync(changelogPath)) {
    content = fs.readFileSync(changelogPath, 'utf8');
  } else {
    content = '# Changelog\n\nSignificant vault actions logged by Claude.\n';
  }

  const dateHeader = `\n## ${entry.date}\n`;
  const promptRef = entry.promptRef ? ` (from [[${entry.promptRef}]])` : '';
  const actionLine = `- **${capitalize(entry.action)}** \`${entry.file}\`${promptRef}\n`;

  if (content.includes(`## ${entry.date}`)) {
    content = content.replace(
      `## ${entry.date}\n`,
      `## ${entry.date}\n${actionLine}`
    );
  } else {
    content += dateHeader + actionLine;
  }

  fs.writeFileSync(changelogPath, content, 'utf8');
}

// ---------------------------------------------------------------------------
// Prompt Archiving
// ---------------------------------------------------------------------------

/**
 * Archive a processed prompt file to 03 - Resources/Prompts/.
 * Updates frontmatter with processing metadata and moves the file.
 *
 * @param {string} vaultRoot - Path to the vault root
 * @param {string} promptPath - Vault-relative path of the prompt file in Inbox
 * @param {object} metadata - Processing results
 * @param {string} metadata.processedDate - Date of processing (YYYY-MM-DD)
 * @param {string[]} metadata.createdFiles - List of created file paths
 * @returns {{ archived: boolean, from: string, to: string }|{ archived: boolean, reason: string }}
 */
function archivePrompt(vaultRoot, promptPath, metadata) {
  const resolvedRoot = path.resolve(vaultRoot);
  const sourcePath = path.join(resolvedRoot, promptPath);

  if (!fs.existsSync(sourcePath)) {
    return { archived: false, reason: 'Source file not found' };
  }

  let content = fs.readFileSync(sourcePath, 'utf8');

  // Build new frontmatter
  const newFrontmatter = [
    '---',
    'type: resource',
    `created: ${metadata.processedDate}`,
    'tags: [prompt, processed]',
    'status: processed',
    `processed-date: ${metadata.processedDate}`,
  ];

  if (metadata.createdFiles && metadata.createdFiles.length > 0) {
    newFrontmatter.push('created-files:');
    for (const f of metadata.createdFiles) {
      newFrontmatter.push(`  - "${f}"`);
    }
  }

  newFrontmatter.push('---');

  // Replace or prepend frontmatter
  const fmMatch = content.match(FRONTMATTER_RE);
  if (fmMatch) {
    content = content.replace(FRONTMATTER_RE, newFrontmatter.join('\n') + '\n');
  } else {
    content = newFrontmatter.join('\n') + '\n\n' + content;
  }

  // Ensure archive folder exists
  const archiveDir = path.join(resolvedRoot, PROMPTS_ARCHIVE);
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  // Build archive filename with "Prompt -- " prefix
  const baseName = path.basename(promptPath, '.md');
  const archiveName = baseName.startsWith('Prompt -- ')
    ? baseName + '.md'
    : 'Prompt -- ' + baseName + '.md';
  const archivePath = path.join(PROMPTS_ARCHIVE, archiveName);
  const archiveFullPath = path.join(resolvedRoot, archivePath);

  // Check for collision
  if (fs.existsSync(archiveFullPath)) {
    return { archived: false, reason: `File already exists at ${archivePath}` };
  }

  // Write updated content to archive location
  fs.writeFileSync(archiveFullPath, content, 'utf8');

  // Remove original from inbox
  fs.unlinkSync(sourcePath);

  return {
    archived: true,
    from: promptPath,
    to: archivePath,
  };
}

// ---------------------------------------------------------------------------
// Report Formatting
// ---------------------------------------------------------------------------

/**
 * Format a processing report for display to the user.
 *
 * @param {Array<{promptName: string, promptPath: string, createdFiles: Array<{path: string, type: string}>, connections: Array<{name: string}>, archivedTo: string}>} results
 * @returns {string} Formatted report
 */
function formatProcessReport(results) {
  if (!results || results.length === 0) {
    return 'No PROMPT: files found in Inbox.';
  }

  const lines = ['## /process Report\n'];

  for (const r of results) {
    lines.push(`### Processed: [[${r.promptName}]]\n`);

    if (r.createdFiles && r.createdFiles.length > 0) {
      lines.push('**Created files:**');
      for (const f of r.createdFiles) {
        lines.push(`- \`${f.path}\` (${f.type})`);
      }
      lines.push('');
    }

    if (r.connections && r.connections.length > 0) {
      lines.push('**Connections discovered:**');
      for (const c of r.connections) {
        lines.push(`- [[${c.name}]]`);
      }
      lines.push('');
    }

    if (r.archivedTo) {
      lines.push(`**Archived to:** \`${r.archivedTo}\`\n`);
    }
  }

  return lines.join('\n').trim();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Capitalize the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get the target project folder for a created file, used for CHANGELOG placement.
 * Returns the first path segment (e.g. "01 - Projects" from "01 - Projects/My Project.md").
 *
 * @param {string} filePath - Vault-relative path
 * @returns {string} Top-level folder
 */
function getTopFolder(filePath) {
  const parts = filePath.replace(/\\/g, '/').split('/');
  return parts[0] || filePath;
}

module.exports = {
  discoverPromptFiles,
  extractPromptText,
  appendProjectChangelog,
  appendGlobalChangelog,
  archivePrompt,
  formatProcessReport,
  getTopFolder,
};
