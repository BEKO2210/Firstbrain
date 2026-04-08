/**
 * Derived index builder: produces link-map.json and tag-index.json from vault-index data.
 * Both functions operate purely on the in-memory vaultIndex object -- no file I/O.
 *
 * Zero external dependencies -- Node.js built-ins only.
 */
'use strict';

/**
 * Build a wiki-link source-to-target mapping with resolution status.
 *
 * For each note in the vault index, iterates its links array and resolves
 * each link target to a file path using case-insensitive matching (Obsidian behavior).
 *
 * @param {object} vaultIndex - The vault-index object with `notes` property keyed by path
 * @returns {object} Link map with version, generated timestamp, links array, and counts
 */
function buildLinkMap(vaultIndex) {
  const notes = vaultIndex.notes || {};

  // Build a name-to-path lookup for case-insensitive resolution
  // Maps lowercased note name (without .md) -> vault-relative path
  const nameToPath = {};
  for (const [notePath, noteData] of Object.entries(notes)) {
    const name = noteData.name || '';
    if (name) {
      nameToPath[name.toLowerCase()] = notePath;
    }
  }

  // Also build a path-based lookup for targets that include folder paths
  // e.g., "00 - Inbox/Inbox" -> look up "00 - Inbox/Inbox.md"
  const pathLookup = new Set(Object.keys(notes));

  // Known exceptions: links that are valid by design but don't resolve to notes
  const KNOWN_EXCEPTIONS = new Set([
    'new project', 'new area', 'new resource', 'new tool', 'new zettel',
    'new person', 'new decision', 'new meeting', 'new snippet',
  ]);

  const links = [];
  let unresolvedCount = 0;

  for (const [sourcePath, noteData] of Object.entries(notes)) {
    if (!noteData.links || !Array.isArray(noteData.links)) continue;

    for (const link of noteData.links) {
      const target = link.target;
      if (!target) continue;

      let resolved = false;
      let targetPath = null;

      // Skip known exceptions: "New X" placeholder links, .claude/ paths, template variables
      const loweredTarget = target.toLowerCase();
      if (KNOWN_EXCEPTIONS.has(loweredTarget) ||
          target.startsWith('.claude/') ||
          target.startsWith('{{') && target.endsWith('}}')) {
        resolved = true;
        targetPath = null; // Valid exception, no actual file
        links.push({
          source: sourcePath,
          target: target,
          targetPath: targetPath,
          resolved: resolved,
          alias: link.alias || null,
          heading: link.heading || null,
        });
        continue;
      }

      // Try exact match: target + '.md' as a key in notes
      const exactKey = target + '.md';
      if (pathLookup.has(exactKey)) {
        resolved = true;
        targetPath = exactKey;
      }

      // Try exact match with the target as-is (if it already ends in .md)
      if (!resolved && pathLookup.has(target)) {
        resolved = true;
        targetPath = target;
      }

      // Try case-insensitive match via name lookup
      if (!resolved) {
        if (nameToPath[loweredTarget]) {
          resolved = true;
          targetPath = nameToPath[loweredTarget];
        }
      }

      if (!resolved) {
        unresolvedCount++;
      }

      links.push({
        source: sourcePath,
        target: target,
        targetPath: targetPath,
        resolved: resolved,
        alias: link.alias || null,
        heading: link.heading || null,
      });
    }
  }

  return {
    version: 1,
    generated: Date.now(),
    links: links,
    unresolvedCount: unresolvedCount,
    totalCount: links.length,
  };
}

/**
 * Build a tag-to-notes inverted index.
 *
 * For each note in the vault index, iterates its allTags array (combined
 * frontmatter + inline tags) and builds an inverted mapping from tag to
 * an array of note paths that use it.
 *
 * @param {object} vaultIndex - The vault-index object with `notes` property keyed by path
 * @returns {object} Tag index with version, generated timestamp, tags map, and counts
 */
function buildTagIndex(vaultIndex) {
  const notes = vaultIndex.notes || {};
  const tags = {};
  let notesWithTags = 0;

  for (const [notePath, noteData] of Object.entries(notes)) {
    const allTags = noteData.allTags || [];
    if (allTags.length > 0) {
      notesWithTags++;
    }

    for (const tag of allTags) {
      if (!tag) continue;
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(notePath);
    }
  }

  // Sort note paths within each tag entry for consistency
  for (const tag of Object.keys(tags)) {
    tags[tag].sort();
  }

  return {
    version: 1,
    generated: Date.now(),
    tags: tags,
    tagCount: Object.keys(tags).length,
    noteCount: notesWithTags,
  };
}

module.exports = { buildLinkMap, buildTagIndex };
