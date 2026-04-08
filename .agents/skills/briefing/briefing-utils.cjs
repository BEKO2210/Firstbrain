/**
 * Data aggregation utilities for the /briefing skill.
 * Gathers recent vault changes, project status, neglected items, inbox count,
 * insights, and memory content for composing a calm daily executive summary.
 * Zero external dependencies -- Node.js built-ins + existing v1.0 modules only.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { loadJson } = require('../scan/utils.cjs');
const { getActiveProjects, parseInsights } = require('../memory/memory-utils.cjs');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default lookback period for recent changes: 48 hours in milliseconds. */
const DEFAULT_LOOKBACK_MS = 48 * 60 * 60 * 1000;

/** Default threshold in days before an active project is considered neglected. */
const DEFAULT_STALE_DAYS = 14;

/** Maximum number of recent changes to include in briefing data. */
const MAX_RECENT_ITEMS = 10;

/** Maximum number of top insights to surface. */
const MAX_TOP_INSIGHTS = 5;

/** Minimum insight confidence to include in briefing. */
const MIN_INSIGHT_CONFIDENCE = 0.5;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Determine the top-level vault folder for a note path.
 * @param {string} notePath - Vault-relative path (e.g., "01 - Projects/Foo.md")
 * @returns {string} Folder name or 'root'
 */
function folderOf(notePath) {
  const slash = notePath.indexOf('/');
  return slash > 0 ? notePath.slice(0, slash) : 'root';
}

/**
 * Check whether a note path should be excluded from recent-changes reporting.
 * Excludes templates, .claude/ system files, and 06 - Atlas/ navigation notes.
 * @param {string} notePath - Vault-relative path
 * @param {object} noteData - Vault index entry for the note
 * @returns {boolean} True if the note should be excluded
 */
function isExcludedFromRecent(notePath, noteData) {
  if (noteData.isTemplate) return true;
  if (notePath.startsWith('.claude/')) return true;
  if (notePath.startsWith('06 - Atlas/')) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Core Functions
// ---------------------------------------------------------------------------

/**
 * Extract recently modified notes from the vault index.
 *
 * Returns notes modified within the lookback window, sorted newest-first.
 * Excludes templates, .claude/ system files, and 06 - Atlas/ navigation notes.
 *
 * @param {object} vaultIndex - Parsed vault-index.json with { notes: { path: { name, type, mtime, ... } } }
 * @param {number} [lookbackMs=DEFAULT_LOOKBACK_MS] - Lookback period in milliseconds (default 48h)
 * @returns {Array<{ path: string, name: string, type: string, folder: string, mtime: number, hoursAgo: number }>}
 *   Array sorted by mtime descending (newest first)
 */
function getRecentChanges(vaultIndex, lookbackMs) {
  if (!vaultIndex || !vaultIndex.notes) return [];

  const lb = typeof lookbackMs === 'number' ? lookbackMs : DEFAULT_LOOKBACK_MS;
  const now = Date.now();
  const cutoff = now - lb;
  const results = [];

  for (const [notePath, noteData] of Object.entries(vaultIndex.notes)) {
    if (isExcludedFromRecent(notePath, noteData)) continue;
    if (!noteData.mtime || noteData.mtime < cutoff) continue;

    const fm = noteData.frontmatter || {};
    results.push({
      path: notePath,
      name: noteData.name || path.basename(notePath, '.md'),
      type: fm.type || 'unknown',
      folder: folderOf(notePath),
      mtime: noteData.mtime,
      hoursAgo: Math.round((now - noteData.mtime) / (1000 * 60 * 60)),
    });
  }

  results.sort((a, b) => b.mtime - a.mtime);
  return results;
}

/**
 * Find active or planned projects whose last modification exceeds a staleness threshold.
 *
 * Returns projects sorted oldest-first (most neglected at top).
 *
 * @param {object} vaultIndex - Parsed vault-index.json
 * @param {number} [staleDays=DEFAULT_STALE_DAYS] - Number of days before a project is stale (default 14)
 * @returns {Array<{ path: string, name: string, status: string, priority: string, lastModified: string, daysSinceModified: number }>}
 *   Array sorted by daysSinceModified descending (oldest first)
 */
function getStaleProjects(vaultIndex, staleDays) {
  if (!vaultIndex || !vaultIndex.notes) return [];

  const threshold = typeof staleDays === 'number' ? staleDays : DEFAULT_STALE_DAYS;
  const now = Date.now();
  const thresholdMs = threshold * 24 * 60 * 60 * 1000;
  const results = [];

  for (const [notePath, noteData] of Object.entries(vaultIndex.notes)) {
    if (noteData.isTemplate) continue;

    const fm = noteData.frontmatter || {};
    if (fm.type !== 'project') continue;
    if (!notePath.startsWith('01 - Projects/')) continue;

    const status = (fm.status || '').toLowerCase();
    if (status !== 'active' && status !== 'planned') continue;

    const mtime = noteData.mtime || 0;
    const age = now - mtime;

    if (age > thresholdMs) {
      const daysSince = Math.floor(age / (1000 * 60 * 60 * 24));
      const lastMod = mtime > 0
        ? new Date(mtime).toISOString().slice(0, 10)
        : 'unknown';

      results.push({
        path: notePath,
        name: noteData.name || path.basename(notePath, '.md'),
        status: fm.status || 'unknown',
        priority: fm.priority || 'none',
        lastModified: lastMod,
        daysSinceModified: daysSince,
      });
    }
  }

  // Sort oldest-first (most neglected at top)
  results.sort((a, b) => b.daysSinceModified - a.daysSinceModified);
  return results;
}

/**
 * Gather all data needed to compose a daily briefing.
 *
 * This is the main entry point for the /briefing skill. It aggregates data from
 * the vault index, project memories, insights, and MEMORY.md into a single
 * structured object that Claude uses to compose the briefing output.
 *
 * @param {string} vaultRoot - Path to the vault root directory
 * @returns {{
 *   recentChanges: Array<{ path: string, name: string, type: string, folder: string, mtime: number, hoursAgo: number }>,
 *   totalRecent: number,
 *   projects: Array<{ path: string, name: string, status: string }>,
 *   neglected: Array<{ path: string, name: string, status: string, priority: string, lastModified: string, daysSinceModified: number }>,
 *   inboxCount: number,
 *   insights: Array<{ title: string, observation: string, confidence: number, category: string }>,
 *   memoryContent: string|null,
 *   vaultStats: { totalNotes: number, lastScan: number|null }
 * }}
 */
function gatherBriefingData(vaultRoot) {
  const resolvedRoot = path.resolve(vaultRoot);
  const indexDir = path.join(resolvedRoot, '.claude', 'indexes');

  // -----------------------------------------------------------------------
  // 1. Load vault index
  // -----------------------------------------------------------------------

  const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));
  const scanState = loadJson(path.join(indexDir, 'scan-state.json'));

  // -----------------------------------------------------------------------
  // 2. Recent changes (capped at MAX_RECENT_ITEMS)
  // -----------------------------------------------------------------------

  const allRecent = getRecentChanges(vaultIndex, DEFAULT_LOOKBACK_MS);
  const recentChanges = allRecent.slice(0, MAX_RECENT_ITEMS);
  const totalRecent = allRecent.length;

  // -----------------------------------------------------------------------
  // 3. Active projects (reuse memory-utils)
  // -----------------------------------------------------------------------

  const projects = getActiveProjects(resolvedRoot);

  // -----------------------------------------------------------------------
  // 4. Neglected projects
  // -----------------------------------------------------------------------

  const neglected = getStaleProjects(vaultIndex, DEFAULT_STALE_DAYS);

  // -----------------------------------------------------------------------
  // 5. Inbox count
  // -----------------------------------------------------------------------

  let inboxCount = 0;
  if (vaultIndex && vaultIndex.notes) {
    for (const [notePath, noteData] of Object.entries(vaultIndex.notes)) {
      if (!notePath.startsWith('00 - Inbox/')) continue;
      if (noteData.isTemplate) continue;
      // Exclude the Inbox.md MOC itself
      if (notePath === '00 - Inbox/Inbox.md') continue;
      // Exclude Daily Notes subfolder
      if (notePath.startsWith('00 - Inbox/Daily Notes/')) continue;
      inboxCount++;
    }
  }

  // -----------------------------------------------------------------------
  // 6. Top insights (confidence >= MIN_INSIGHT_CONFIDENCE)
  // -----------------------------------------------------------------------

  const insightData = parseInsights(resolvedRoot);
  const topInsights = [];

  for (const [catName, entries] of Object.entries(insightData.categories)) {
    for (const entry of entries) {
      if (entry.confidence >= MIN_INSIGHT_CONFIDENCE) {
        topInsights.push({
          title: entry.title,
          observation: entry.observation,
          confidence: entry.confidence,
          category: catName,
        });
      }
    }
  }

  // Sort by confidence descending, take top N
  topInsights.sort((a, b) => b.confidence - a.confidence);
  const insights = topInsights.slice(0, MAX_TOP_INSIGHTS);

  // -----------------------------------------------------------------------
  // 7. MEMORY.md content
  // -----------------------------------------------------------------------

  let memoryContent = null;
  const memoryPath = path.join(resolvedRoot, 'MEMORY.md');
  try {
    memoryContent = fs.readFileSync(memoryPath, 'utf8');
  } catch {
    // MEMORY.md may not exist yet -- that is fine
  }

  // -----------------------------------------------------------------------
  // 8. Vault stats
  // -----------------------------------------------------------------------

  const totalNotes = (vaultIndex && vaultIndex.noteCount) || 0;
  const lastScan = (scanState && scanState.lastScan) || null;

  const vaultStats = { totalNotes, lastScan };

  // -----------------------------------------------------------------------
  // Return aggregated briefing data
  // -----------------------------------------------------------------------

  return {
    recentChanges,
    totalRecent,
    projects,
    neglected,
    inboxCount,
    insights,
    memoryContent,
    vaultStats,
  };
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
  gatherBriefingData,
  getRecentChanges,
  getStaleProjects,
};
