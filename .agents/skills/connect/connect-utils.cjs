/**
 * Connection discovery utilities for the /connect skill.
 * Scores potential connections between notes using tag overlap and link adjacency.
 * Zero external dependencies -- Node.js built-ins + Phase 2 scan infrastructure.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { loadJson } = require('../scan/utils.cjs');

/**
 * Discover related notes for a given note using tag overlap and link adjacency.
 *
 * Scoring:
 * - Tag overlap: +1 per shared tag
 * - Link adjacency: +0.5 per shared link target
 *
 * Filters out: templates, MOCs, system files, already-linked notes.
 *
 * @param {string} targetPath - Vault-relative path of the note to analyze
 * @param {object} vaultIndex - Parsed vault-index.json
 * @param {object} linkMap - Parsed link-map.json
 * @param {object} tagIndex - Parsed tag-index.json
 * @returns {Array<{path: string, name: string, score: number, evidence: string[], confidence: string}>}
 */
function findConnections(targetPath, vaultIndex, linkMap, tagIndex) {
  const targetNote = vaultIndex.notes[targetPath];
  if (!targetNote) return [];

  const targetTags = new Set(targetNote.allTags || []);
  const scores = {}; // notePath -> { score, evidence[] }

  // Build set of already-linked notes to exclude from suggestions
  const alreadyLinked = new Set();
  const targetLinks = targetNote.links || [];
  for (const link of targetLinks) {
    // Add the link target (lowercased for matching)
    alreadyLinked.add(link.target.toLowerCase());
  }
  // Also resolve link targets to paths for path-based exclusion
  const alreadyLinkedPaths = new Set();
  if (linkMap && linkMap.links) {
    for (const link of linkMap.links) {
      if (link.source === targetPath && link.resolved && link.targetPath) {
        alreadyLinkedPaths.add(link.targetPath);
      }
    }
  }

  // Helper: check if a note should be excluded from suggestions
  function shouldExclude(notePath) {
    if (notePath === targetPath) return true;
    const note = vaultIndex.notes[notePath];
    if (!note) return true;
    if (note.isTemplate) return true;
    // Exclude MOCs, home, and system-type notes
    if (notePath.startsWith('06 - Atlas/')) return true;
    if (note.name === 'Home' || note.name === 'START HERE' || note.name === 'Workflow Guide' || note.name === 'Tag Conventions') return true;
    // Exclude already-linked notes
    if (alreadyLinkedPaths.has(notePath)) return true;
    if (alreadyLinked.has((note.name || '').toLowerCase())) return true;
    return false;
  }

  // Score by shared tags
  for (const tag of targetTags) {
    const notesWithTag = (tagIndex.tags && tagIndex.tags[tag]) || [];
    for (const notePath of notesWithTag) {
      if (shouldExclude(notePath)) continue;
      if (!scores[notePath]) scores[notePath] = { score: 0, evidence: [] };
      scores[notePath].score += 1;
      scores[notePath].evidence.push('shared tag: #' + tag);
    }
  }

  // Score by link adjacency: notes that link to the same targets as the target note
  const targetLinkTargets = new Set(
    targetLinks.map(l => l.target.toLowerCase())
  );

  if (linkMap && linkMap.links) {
    for (const link of linkMap.links) {
      if (link.source === targetPath) continue;
      if (shouldExclude(link.source)) continue;

      const linkTargetLower = (link.target || '').toLowerCase();
      if (targetLinkTargets.has(linkTargetLower)) {
        if (!scores[link.source]) scores[link.source] = { score: 0, evidence: [] };
        const evidenceStr = 'both link to [[' + link.target + ']]';
        // Avoid duplicate evidence for the same shared target
        if (!scores[link.source].evidence.includes(evidenceStr)) {
          scores[link.source].score += 0.5;
          scores[link.source].evidence.push(evidenceStr);
        }
      }
    }
  }

  // Sort by score descending, assign confidence, return results
  return Object.entries(scores)
    .filter(([, data]) => data.score > 0)
    .sort((a, b) => b[1].score - a[1].score)
    .map(([notePath, data]) => ({
      path: notePath,
      name: (vaultIndex.notes[notePath] && vaultIndex.notes[notePath].name) || notePath,
      score: data.score,
      evidence: [...new Set(data.evidence)],
      confidence: data.score >= 3 ? 'high' : data.score >= 1.5 ? 'medium' : 'low',
    }));
}

/**
 * Format connection suggestions for display as a numbered list with evidence.
 *
 * @param {Array<{path: string, name: string, score: number, evidence: string[], confidence: string}>} suggestions
 * @returns {string} Formatted suggestion list
 */
function formatConnectionSuggestions(suggestions) {
  if (!suggestions || suggestions.length === 0) {
    return 'No connection suggestions found.';
  }

  const lines = [];
  for (let i = 0; i < suggestions.length; i++) {
    const s = suggestions[i];
    lines.push((i + 1) + '. **[[' + s.name + ']]** (' + s.confidence + ' confidence)');
    for (const ev of s.evidence) {
      lines.push('   - ' + ev);
    }
    lines.push('');
  }

  return lines.join('\n').trim();
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

module.exports = { findConnections, formatConnectionSuggestions, ensureFreshIndexes };
