/**
 * Vault health analysis utilities for the /health skill.
 * Detects orphan notes, broken wiki-links, and generates fix suggestions.
 * Zero external dependencies -- Node.js built-ins + Phase 2 scan infrastructure.
 */
'use strict';

const path = require('path');
const { loadJson } = require('../scan/utils.cjs');

/**
 * Perform full vault health analysis: orphan detection and broken link detection.
 *
 * Orphan: a note with 0-1 connections (inbound + outbound resolved links),
 * excluding templates, MOCs, home, and system files.
 *
 * Broken link: a wiki-link where resolved === false in link-map.json,
 * excluding links from template files.
 *
 * @param {object} vaultIndex - Parsed vault-index.json
 * @param {object} linkMap - Parsed link-map.json
 * @returns {{ orphans: Array, brokenLinks: Array, stats: object }}
 */
function analyzeHealth(vaultIndex, linkMap) {
  // --- Orphan detection ---

  // Build connection count map from resolved links
  const connectionCounts = {}; // notePath -> count

  const links = (linkMap && linkMap.links) || [];
  for (const link of links) {
    if (!link.resolved) continue;
    // Count +1 for source
    connectionCounts[link.source] = (connectionCounts[link.source] || 0) + 1;
    // Count +1 for target
    if (link.targetPath) {
      connectionCounts[link.targetPath] = (connectionCounts[link.targetPath] || 0) + 1;
    }
  }

  // Find orphans (0-1 connections, excluding templates, MOCs, system files)
  const orphans = [];
  const notes = (vaultIndex && vaultIndex.notes) || {};

  for (const [notePath, noteData] of Object.entries(notes)) {
    if (noteData.isTemplate) continue;
    // Exclude MOC, home, and system-type notes
    if (notePath.startsWith('06 - Atlas/')) continue;
    if (noteData.name === 'Home' || noteData.name === 'START HERE' ||
        noteData.name === 'Workflow Guide' || noteData.name === 'Tag Conventions') continue;
    // Exclude .claude/ system files
    if (notePath.startsWith('.claude/')) continue;

    const count = connectionCounts[notePath] || 0;
    if (count <= 1) {
      orphans.push({
        path: notePath,
        name: noteData.name || notePath,
        connections: count,
      });
    }
  }

  // --- Broken link detection ---

  // Collect known note names for fix suggestions
  const knownNames = Object.values(notes).map(n => n.name);

  const brokenLinks = links
    .filter(l => !l.resolved)
    .filter(l => {
      // Skip links from template files
      const sourceNote = notes[l.source];
      return sourceNote && !sourceNote.isTemplate;
    })
    .map(l => ({
      source: l.source,
      target: l.target,
      suggestions: suggestFixes(l.target, knownNames),
    }));

  // --- Stats ---
  const totalNotes = Object.keys(notes).length;
  const totalLinks = links.length;
  const orphanCount = orphans.length;
  const brokenLinkCount = brokenLinks.length;

  return {
    orphans,
    brokenLinks,
    stats: { totalNotes, totalLinks, orphanCount, brokenLinkCount },
  };
}

/**
 * Generate fix suggestions for a broken link target.
 * Uses case-insensitive substring matching and Levenshtein distance.
 *
 * @param {string} brokenTarget - The unresolved link target text
 * @param {string[]} knownNames - Array of known note names in the vault
 * @returns {Array<{name: string, distance: number}>} Up to 3 suggestions sorted by relevance
 */
function suggestFixes(brokenTarget, knownNames) {
  const lowerTarget = brokenTarget.toLowerCase();
  const candidates = [];

  for (const name of knownNames) {
    const lowerName = name.toLowerCase();

    // Exact substring match (either direction)
    const isSubstring = lowerName.includes(lowerTarget) || lowerTarget.includes(lowerName);

    // Levenshtein distance
    const dist = levenshtein(lowerTarget, lowerName);

    if (isSubstring) {
      // Substring matches get priority (distance 0 for sorting)
      candidates.push({ name, distance: 0, isSubstring: true, levenshtein: dist });
    } else if (dist <= 2) {
      // Levenshtein matches for typo detection
      candidates.push({ name, distance: dist, isSubstring: false, levenshtein: dist });
    }
  }

  // Sort: exact substring first, then by Levenshtein distance
  candidates.sort((a, b) => {
    if (a.isSubstring && !b.isSubstring) return -1;
    if (!a.isSubstring && b.isSubstring) return 1;
    return a.levenshtein - b.levenshtein;
  });

  // Return top 3, with simplified output
  return candidates.slice(0, 3).map(c => ({
    name: c.name,
    distance: c.levenshtein,
  }));
}

/**
 * Standard Levenshtein distance implementation via dynamic programming.
 * Operates on lowercased strings for case-insensitive comparison.
 *
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} Edit distance between the two strings
 */
function levenshtein(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // Initialize first column
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // Initialize first row
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = b[i - 1] === a[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,     // deletion
        matrix[i][j - 1] + 1,     // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Classify whether a broken link fix can be auto-applied per governance zones.
 *
 * - auto: Exactly 1 suggestion with Levenshtein distance <= 1 (obvious typo, AUTO zone)
 * - propose: 1+ suggestions but ambiguous (PROPOSE zone -- ask user)
 * - manual: 0 suggestions (user decides)
 *
 * @param {Array<{name: string, distance: number}>} suggestions - Fix suggestions from suggestFixes
 * @returns {{ action: string, fix?: object, candidates?: Array, reason?: string }}
 */
function classifyFix(suggestions) {
  if (!suggestions || suggestions.length === 0) {
    return { action: 'manual', reason: 'no match found' };
  }

  // Auto-fix: exactly 1 suggestion with very low edit distance (obvious typo)
  if (suggestions.length === 1 && suggestions[0].distance <= 1) {
    return { action: 'auto', fix: suggestions[0] };
  }

  // Propose: there are candidates but it's ambiguous
  return { action: 'propose', candidates: suggestions };
}

/**
 * Ensure vault indexes are fresh (not older than 5 minutes).
 * If stale, triggers a scan to rebuild them.
 *
 * @param {string} vaultRoot - Path to vault root
 * @returns {object|null} Scan result if scan was triggered, null if indexes are fresh
 */
function ensureFreshIndexes(vaultRoot) {
  const resolvedRoot = path.resolve(vaultRoot);
  const indexDir = path.join(resolvedRoot, '.claude', 'indexes');
  const scanState = loadJson(path.join(indexDir, 'scan-state.json'));
  const STALE_MS = 5 * 60 * 1000; // 5 minutes

  if (!scanState || (Date.now() - scanState.lastScan > STALE_MS)) {
    const { scan } = require('../scan/scanner.cjs');
    return scan(resolvedRoot);
  }
  return null; // Indexes are fresh
}

module.exports = { analyzeHealth, suggestFixes, levenshtein, classifyFix, ensureFreshIndexes };
