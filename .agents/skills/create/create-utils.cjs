/**
 * Utility module for the /create skill.
 * Template substitution, folder mapping, filename building, date format handling,
 * wiki-link suggestion, and index freshness checking.
 *
 * Zero external dependencies -- Node.js built-ins + Phase 2 scan modules only.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { loadJson } = require('../scan/utils.cjs');
const { scan } = require('../scan/scanner.cjs');

// ---------------------------------------------------------------------------
// Template-to-folder mapping (from CLAUDE.md Quick Reference table -- authoritative)
// ---------------------------------------------------------------------------
const TEMPLATE_MAP = {
  'project':      { template: 'Project.md',       folder: '01 - Projects',          prefix: '' },
  'area':         { template: 'Area.md',           folder: '02 - Areas',             prefix: '' },
  'resource':     { template: 'Resource.md',       folder: '03 - Resources',         prefix: '' },
  'tool':         { template: 'Tool.md',           folder: '03 - Resources',         prefix: 'Tool -- ' },
  'zettel':       { template: 'Zettel.md',         folder: '03 - Resources',         prefix: 'Zettel -- ' },
  'person':       { template: 'Person.md',         folder: '03 - Resources',         prefix: 'Person -- ' },
  'decision':     { template: 'Decision.md',       folder: '01 - Projects',          prefix: 'Decision -- ' },
  'meeting':      { template: 'Meeting.md',        folder: '01 - Projects',          prefix: 'Meeting -- ' },
  'code-snippet': { template: 'Code Snippet.md',   folder: '03 - Resources',         prefix: 'Snippet -- ' },
  'daily':        { template: 'Daily Note.md',     folder: '00 - Inbox/Daily Notes', prefix: '' },
  'weekly':       { template: 'Weekly Review.md',  folder: '00 - Inbox',             prefix: '' },
  'monthly':      { template: 'Monthly Review.md', folder: '00 - Inbox',             prefix: '' },
};

// ---------------------------------------------------------------------------
// MOC name mapping for wiki-link suggestion boosting
// ---------------------------------------------------------------------------
const MOC_MAP = {
  'tool':         'Tools MOC',
  'project':      'Projects MOC',
  'resource':     'Resources MOC',
  'person':       'People MOC',
  'meeting':      'Meetings MOC',
  'decision':     'Decisions MOC',
  'code-snippet': 'Code MOC',
  'area':         'Areas MOC',
};

// ---------------------------------------------------------------------------
// Month names for {{date:MMMM YYYY}} substitution
// ---------------------------------------------------------------------------
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Get month name for a 0-based month index.
 * @param {number} monthIndex - 0-11
 * @returns {string} English month name
 */
function getMonthName(monthIndex) {
  return MONTH_NAMES[monthIndex] || '';
}

/**
 * Compute ISO 8601 week number for a given Date.
 * Algorithm: find the nearest Thursday, then compute week count from Jan 1.
 * @param {Date} date
 * @returns {number} ISO week number (1-53)
 */
function getISOWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number (Monday=1, Sunday=7)
  const dayNum = d.getUTCDay() || 7; // Sunday=0 -> 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

/**
 * Format a Date object as YYYY-MM-DD string.
 * @param {Date} d
 * @returns {string}
 */
function formatDate(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get template info for a given note type.
 * @param {string} type - Note type (project, tool, daily, etc.)
 * @returns {{ template: string, folder: string, prefix: string }|null}
 */
function getTemplateInfo(type) {
  return TEMPLATE_MAP[type] || null;
}

/**
 * Build the correct filename for a note type per naming conventions.
 * @param {string} type - Note type
 * @param {string} title - Note title (user-provided)
 * @param {string} date - Date string YYYY-MM-DD
 * @returns {string|null} Filename with .md extension, or null for unknown types
 */
function buildFileName(type, title, date) {
  const info = TEMPLATE_MAP[type];
  if (!info) return null;

  if (type === 'daily') return date + '.md';
  if (type === 'meeting') return 'Meeting -- ' + title + ' ' + date + '.md';
  if (type === 'weekly') return 'Weekly Review ' + date + '.md';
  if (type === 'monthly') return 'Monthly Review ' + date + '.md';

  const prefix = info.prefix || '';
  return prefix + title + '.md';
}

/**
 * Compute date variables from a YYYY-MM-DD string.
 * Uses noon (T12:00:00) to avoid timezone-induced date shifts.
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {{ date: string, yesterday: string, tomorrow: string, time: string }}
 */
function getDateVars(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');

  const yesterday = new Date(d);
  yesterday.setDate(d.getDate() - 1);

  const tomorrow = new Date(d);
  tomorrow.setDate(d.getDate() + 1);

  return {
    date: dateStr,
    yesterday: formatDate(yesterday),
    tomorrow: formatDate(tomorrow),
    time: new Date().toTimeString().slice(0, 5), // HH:mm
  };
}

/**
 * Substitute all template variables in content.
 * Handles standard variables ({{date}}, {{title}}, {{time}}, {{yesterday}}, {{tomorrow}})
 * and Obsidian Templater-style format variants:
 *   {{date:YYYY-MM-DD}} -> date string
 *   {{date:MMMM YYYY}}  -> "March 2026"
 *   {{date:ww}}          -> ISO week number
 *   {{date:YYYY}}        -> year
 *
 * @param {string} templateContent - Raw template content
 * @param {object} vars - Variable values { date, title, time, yesterday, tomorrow }
 * @returns {string} Content with all variables substituted
 */
function substituteVariables(templateContent, vars) {
  let content = templateContent;

  // Handle Templater-style {{date:FORMAT}} variants first (before plain {{date}})
  content = content.replace(/\{\{date:YYYY-MM-DD\}\}/g, vars.date || '');
  content = content.replace(/\{\{date:MMMM YYYY\}\}/g, function () {
    if (!vars.date) return '';
    const d = new Date(vars.date + 'T12:00:00');
    return getMonthName(d.getMonth()) + ' ' + d.getFullYear();
  });
  content = content.replace(/\{\{date:ww\}\}/g, function () {
    if (!vars.date) return '';
    const d = new Date(vars.date + 'T12:00:00');
    return String(getISOWeekNumber(d));
  });
  content = content.replace(/\{\{date:YYYY\}\}/g, function () {
    if (!vars.date) return '';
    return vars.date.slice(0, 4);
  });

  // Standard variables
  content = content.replace(/\{\{date\}\}/g, vars.date || '');
  content = content.replace(/\{\{title\}\}/g, vars.title || '');
  content = content.replace(/\{\{time\}\}/g, vars.time || '');
  content = content.replace(/\{\{yesterday\}\}/g, vars.yesterday || '');
  content = content.replace(/\{\{tomorrow\}\}/g, vars.tomorrow || '');

  return content;
}

/**
 * Suggest wiki-links for a newly created note based on tag overlap.
 *
 * Scoring:
 * 1. +1 per shared tag between the new note and existing notes
 * 2. +2 for the relevant MOC matching the note type
 * 3. Filter out templates, MOCs (except the boosted one), and system files
 *
 * @param {string} noteType - Type of the new note
 * @param {string[]} noteTags - Tags of the new note
 * @param {object} vaultIndex - vault-index.json data ({ notes: { path: noteData } })
 * @param {object} tagIndex - tag-index.json data ({ tags: { tagName: [notePath, ...] } })
 * @param {number} [limit=5] - Max number of suggestions
 * @returns {Array<{ path: string, name: string, score: number, reasons: string[] }>}
 */
function suggestWikiLinks(noteType, noteTags, vaultIndex, tagIndex, limit) {
  limit = limit || 5;
  const candidates = {};
  const notes = vaultIndex.notes || vaultIndex;

  // Score by shared tags
  for (const tag of noteTags) {
    const notesWithTag = (tagIndex.tags || {})[tag] || [];
    for (const notePath of notesWithTag) {
      const note = notes[notePath];
      if (!note || note.isTemplate) continue;
      // Skip system-type entries (home, moc, etc.) from tag scoring
      if (note.type === 'moc' || note.type === 'home') continue;
      if (!candidates[notePath]) candidates[notePath] = { score: 0, reasons: [] };
      candidates[notePath].score += 1;
      candidates[notePath].reasons.push('shared tag #' + tag);
    }
  }

  // Boost the relevant MOC for the note type
  const relevantMocName = MOC_MAP[noteType];
  if (relevantMocName) {
    for (const [p, n] of Object.entries(notes)) {
      if (n.name === relevantMocName) {
        if (!candidates[p]) candidates[p] = { score: 0, reasons: [] };
        candidates[p].score += 2;
        candidates[p].reasons.push('relevant MOC for type: ' + noteType);
        break;
      }
    }
  }

  return Object.entries(candidates)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, limit)
    .map(([p, data]) => ({
      path: p,
      name: notes[p]?.name || p,
      score: data.score,
      reasons: [...new Set(data.reasons)],
    }));
}

/**
 * Check if a MOC file uses Dataview queries for listings.
 * MOCs with ```dataview blocks auto-list notes -- no manual link insertion needed.
 *
 * @param {string} vaultRoot - Path to vault root
 * @param {string} mocPath - Vault-relative path to the MOC file
 * @returns {boolean} True if MOC contains Dataview blocks
 */
function mocUsesDataview(vaultRoot, mocPath) {
  try {
    const fullPath = path.join(vaultRoot, mocPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    return content.includes('```dataview');
  } catch {
    return false;
  }
}

/**
 * Ensure vault indexes are fresh (not older than 5 minutes).
 * If stale or missing, triggers a scan to rebuild them.
 *
 * @param {string} vaultRoot - Path to vault root
 * @returns {object|null} Scan result if re-scanned, null if indexes were fresh
 */
function ensureFreshIndexes(vaultRoot) {
  const resolvedRoot = path.resolve(vaultRoot);
  const indexDir = path.join(resolvedRoot, '.claude', 'indexes');
  const scanState = loadJson(path.join(indexDir, 'scan-state.json'));
  const STALE_MS = 5 * 60 * 1000; // 5 minutes

  if (!scanState || !scanState.lastScan || (Date.now() - scanState.lastScan > STALE_MS)) {
    return scan(vaultRoot);
  }
  return null; // Indexes are fresh
}

module.exports = {
  getTemplateInfo,
  buildFileName,
  getDateVars,
  substituteVariables,
  suggestWikiLinks,
  mocUsesDataview,
  ensureFreshIndexes,
};
