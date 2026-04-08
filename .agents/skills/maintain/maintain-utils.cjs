/**
 * Vault maintenance utilities for the /maintain skill.
 * Consistency checks, staleness detection, outdated reference auditing,
 * and auto-fix application with governance zone awareness.
 *
 * Zero external dependencies -- Node.js built-ins + Phase 2 scan infrastructure.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { loadJson } = require('../scan/utils.cjs');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const VALID_TYPES = [
  'project', 'area', 'resource', 'tool', 'person', 'meeting',
  'decision', 'code-snippet', 'zettel', 'daily', 'review',
];

const VALID_STATUSES = ['active', 'planned', 'on-hold', 'completed', 'archived'];

const TYPE_FOLDER_MAP = {
  'project': '01 - Projects',
  'area': '02 - Areas',
  'resource': '03 - Resources',
  'tool': '03 - Resources',
  'zettel': '03 - Resources',
  'person': '03 - Resources',
  'decision': '01 - Projects',
  'meeting': '01 - Projects',
  'code-snippet': '03 - Resources',
  'daily': '00 - Inbox/Daily Notes',
  'review': '00 - Inbox',
};

const DEFAULT_STALE_DAYS = 30;

/** System notes excluded from consistency checks. */
const SYSTEM_NOTES = ['Home', 'START HERE', 'Workflow Guide', 'Tag Conventions', 'Inbox', 'README'];

// ---------------------------------------------------------------------------
// Frontmatter regex -- handles both \n and \r\n line endings (Windows compat)
// ---------------------------------------------------------------------------

/**
 * Match a YAML frontmatter block at the start of a file.
 * Captures everything between the opening and closing `---` delimiters.
 */
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Parse a simple YAML frontmatter string into a plain object.
 * Handles scalar values and simple arrays (both inline [a, b] and multi-line - a).
 * Intentionally minimal -- not a full YAML parser.
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

/**
 * Check whether a note should be excluded from consistency checks.
 *
 * Excludes: templates, 06 - Atlas/ notes, .claude/ system files,
 * and well-known system notes (Home, START HERE, etc.).
 *
 * @param {string} notePath - Vault-relative note path
 * @param {object} noteData - Note metadata from vault index
 * @returns {boolean} true if the note should be excluded
 */
function isExcluded(notePath, noteData) {
  if (noteData.isTemplate) return true;
  if (notePath.startsWith('06 - Atlas/')) return true;
  if (notePath.startsWith('.claude/')) return true;
  if (notePath.startsWith('05 - Templates/')) return true;

  const name = noteData.name || '';
  if (SYSTEM_NOTES.includes(name)) return true;

  return false;
}

/**
 * Format a Date object (or timestamp) as YYYY-MM-DD.
 *
 * @param {Date|number|string} dateVal - Date value
 * @returns {string} Formatted date string
 */
function formatDate(dateVal) {
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return 'unknown';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Scan all notes in the vault index for frontmatter and tag consistency issues.
 *
 * Checks performed:
 * - Missing type (critical, not autoFixable)
 * - Invalid type value (warning, not autoFixable)
 * - Missing created date (warning, autoFixable -- derive from mtime)
 * - Missing tags array (warning, autoFixable -- add empty [])
 * - Type/folder mismatch (info, not autoFixable -- PROPOSE zone)
 * - Invalid status value (warning, not autoFixable)
 * - Tag casing (warning, autoFixable -- lowercase all tags)
 *
 * Excludes templates, 06 - Atlas/, .claude/, and system notes.
 *
 * @param {object} vaultIndex - Parsed vault-index.json
 * @returns {{ critical: Array, warning: Array, info: Array }}
 */
function runConsistencyChecks(vaultIndex) {
  const notes = (vaultIndex && vaultIndex.notes) || vaultIndex || {};
  const critical = [];
  const warning = [];
  const info = [];

  for (const [notePath, noteData] of Object.entries(notes)) {
    const normalized = notePath.replace(/\\/g, '/');

    // Skip excluded notes
    if (isExcluded(normalized, noteData)) continue;

    const fm = noteData.frontmatter || {};
    const name = noteData.name || path.basename(normalized, '.md');

    // 1. Missing type (critical, not autoFixable)
    if (!fm.type || fm.type === '') {
      critical.push({
        type: 'missing-type',
        path: normalized,
        name,
        fix: 'Add a type field to frontmatter (e.g., type: resource)',
        autoFixable: false,
      });
    }

    // 2. Invalid type value (warning, not autoFixable)
    if (fm.type && fm.type !== '' && !VALID_TYPES.includes(fm.type)) {
      warning.push({
        type: 'invalid-type',
        path: normalized,
        name,
        fix: `Type "${fm.type}" is not valid. Use one of: ${VALID_TYPES.join(', ')}`,
        autoFixable: false,
      });
    }

    // 3. Missing created date (warning, autoFixable)
    if (!fm.created) {
      const mtime = noteData.mtime || null;
      const dateStr = mtime ? formatDate(mtime) : formatDate(new Date());
      warning.push({
        type: 'missing-created',
        path: normalized,
        name,
        fix: `Add created date: ${dateStr} (from file modification time)`,
        autoFixable: true,
        autoFix: { created: dateStr },
      });
    }

    // 4. Missing tags array (warning, autoFixable)
    const tags = fm.tags;
    if (!tags || !Array.isArray(tags)) {
      warning.push({
        type: 'missing-tags',
        path: normalized,
        name,
        fix: 'Add empty tags array: tags: []',
        autoFixable: true,
        autoFix: { tags: [] },
      });
    }

    // 5. Type/folder mismatch (info, not autoFixable -- PROPOSE zone)
    if (fm.type && VALID_TYPES.includes(fm.type)) {
      const expectedFolder = TYPE_FOLDER_MAP[fm.type];
      if (expectedFolder && !normalized.startsWith(expectedFolder)) {
        info.push({
          type: 'folder-mismatch',
          path: normalized,
          name,
          fix: `Note with type "${fm.type}" is in "${normalized.split('/')[0]}" but expected in "${expectedFolder}"`,
          autoFixable: false,
        });
      }
    }

    // 6. Invalid status value (warning, not autoFixable)
    if (fm.status && !VALID_STATUSES.includes(fm.status)) {
      warning.push({
        type: 'invalid-status',
        path: normalized,
        name,
        fix: `Status "${fm.status}" is not valid. Use one of: ${VALID_STATUSES.join(', ')}`,
        autoFixable: false,
      });
    }

    // 7. Tag casing (warning, autoFixable)
    if (Array.isArray(fm.tags) && fm.tags.length > 0) {
      const uppercaseTags = fm.tags.filter(t => typeof t === 'string' && t !== t.toLowerCase());
      if (uppercaseTags.length > 0) {
        const lowered = fm.tags.map(t => typeof t === 'string' ? t.toLowerCase() : t);
        warning.push({
          type: 'tag-casing',
          path: normalized,
          name,
          fix: `Tags contain uppercase: ${uppercaseTags.join(', ')} -- should be lowercase`,
          autoFixable: true,
          autoFix: { tags: lowered },
        });
      }
    }
  }

  return { critical, warning, info };
}

/**
 * Find projects with active/planned status that have not been modified
 * within the given staleness threshold.
 *
 * @param {object} vaultIndex - Parsed vault-index.json
 * @param {number} [staleDays=DEFAULT_STALE_DAYS] - Days without modification to consider stale
 * @returns {Array<{path: string, name: string, status: string, priority: string, lastModified: string, daysSinceModified: number, suggestion: string}>}
 */
function getStaleProjects(vaultIndex, staleDays) {
  if (staleDays === undefined || staleDays === null) {
    staleDays = DEFAULT_STALE_DAYS;
  }

  const notes = (vaultIndex && vaultIndex.notes) || vaultIndex || {};
  const now = Date.now();
  const staleMs = staleDays * 24 * 60 * 60 * 1000;
  const stale = [];

  for (const [notePath, noteData] of Object.entries(notes)) {
    // Skip template files (e.g., 05 - Templates/Project.md)
    if (noteData.isTemplate) continue;

    const fm = noteData.frontmatter || {};

    // Only projects
    if (fm.type !== 'project') continue;

    // Only active or planned
    if (fm.status !== 'active' && fm.status !== 'planned') continue;

    // Check mtime
    const mtime = noteData.mtime ? new Date(noteData.mtime).getTime() : 0;
    if (mtime === 0) continue; // No mtime data -- skip

    const age = now - mtime;
    if (age > staleMs) {
      const daysSince = Math.floor(age / (24 * 60 * 60 * 1000));
      stale.push({
        path: notePath.replace(/\\/g, '/'),
        name: noteData.name || path.basename(notePath, '.md'),
        status: fm.status,
        priority: fm.priority || 'unset',
        lastModified: formatDate(mtime),
        daysSinceModified: daysSince,
        suggestion: 'Consider updating status to on-hold or archiving.',
      });
    }
  }

  // Sort oldest first (most stale at top)
  stale.sort((a, b) => b.daysSinceModified - a.daysSinceModified);

  return stale;
}

/**
 * Detect notes that link to completed or archived items.
 *
 * Scans link-map.json for resolved links where the target note has
 * status=completed or status=archived.
 *
 * @param {object} vaultIndex - Parsed vault-index.json
 * @param {object} linkMap - Parsed link-map.json
 * @returns {Array<{sourcePath: string, sourceName: string, targetPath: string, targetName: string, targetStatus: string, suggestion: string}>}
 */
function getOutdatedReferences(vaultIndex, linkMap) {
  const notes = (vaultIndex && vaultIndex.notes) || vaultIndex || {};
  const links = (linkMap && linkMap.links) || [];
  const results = [];
  const seen = new Set(); // Deduplicate source->target pairs

  for (const link of links) {
    if (!link.resolved || !link.targetPath) continue;

    const targetPath = link.targetPath.replace(/\\/g, '/');
    const sourcePath = (link.source || '').replace(/\\/g, '/');
    const targetNote = notes[targetPath] || notes[link.targetPath];

    if (!targetNote) continue;

    const targetFm = targetNote.frontmatter || {};
    const targetStatus = targetFm.status;

    if (targetStatus !== 'completed' && targetStatus !== 'archived') continue;

    // Skip self-references
    if (sourcePath === targetPath) continue;

    // Deduplicate
    const pairKey = `${sourcePath}::${targetPath}`;
    if (seen.has(pairKey)) continue;
    seen.add(pairKey);

    const sourceNote = notes[sourcePath] || notes[link.source];
    const sourceName = sourceNote ? (sourceNote.name || sourcePath) : sourcePath;
    const targetName = targetNote.name || targetPath;

    results.push({
      sourcePath,
      sourceName,
      targetPath,
      targetName,
      targetStatus,
      suggestion: `[[${sourceName}]] links to [[${targetName}]] which is ${targetStatus}. Review if this reference is still relevant.`,
    });
  }

  return results;
}

/**
 * Apply all auto-fixable issues from runConsistencyChecks.
 *
 * For each issue with autoFixable: true, reads the file, modifies only
 * the frontmatter block with the autoFix field values, and writes back.
 * NEVER modifies anything outside the frontmatter block.
 *
 * @param {string} vaultRoot - Absolute or relative path to vault root
 * @param {Array} issues - Issues from runConsistencyChecks (combined critical + warning + info)
 * @returns {{ fixed: number, details: Array<{path: string, name: string, fieldsFixed: string[]}> }}
 */
function applyAutoFixes(vaultRoot, issues) {
  const resolvedRoot = path.resolve(vaultRoot);
  const fixable = issues.filter(issue => issue.autoFixable && issue.autoFix);

  // Group fixes by file path to apply all fixes for a file at once
  const fixesByPath = {};
  for (const issue of fixable) {
    if (!fixesByPath[issue.path]) {
      fixesByPath[issue.path] = { name: issue.name, fixes: {} };
    }
    // Merge autoFix fields
    Object.assign(fixesByPath[issue.path].fixes, issue.autoFix);
  }

  const details = [];

  for (const [notePath, { name, fixes }] of Object.entries(fixesByPath)) {
    const fullPath = path.join(resolvedRoot, notePath);

    let content;
    try {
      content = fs.readFileSync(fullPath, 'utf8');
    } catch {
      // File may have been moved/deleted since scan -- skip
      continue;
    }

    const match = content.match(FRONTMATTER_RE);

    if (match) {
      // Existing frontmatter -- parse, merge, and rewrite the block only
      const existingYaml = match[1];
      const parsed = parseSimpleYaml(existingYaml);

      for (const [key, value] of Object.entries(fixes)) {
        parsed[key] = value;
      }

      const newYaml = serializeSimpleYaml(parsed);
      content = content.replace(FRONTMATTER_RE, `---\n${newYaml}\n---`);
    } else {
      // No frontmatter -- insert a new block at the very top
      const newYaml = serializeSimpleYaml(fixes);
      content = `---\n${newYaml}\n---\n\n${content}`;
    }

    fs.writeFileSync(fullPath, content, 'utf8');

    details.push({
      path: notePath,
      name,
      fieldsFixed: Object.keys(fixes),
    });
  }

  return {
    fixed: details.length,
    details,
  };
}

module.exports = {
  runConsistencyChecks,
  getStaleProjects,
  getOutdatedReferences,
  applyAutoFixes,
};
