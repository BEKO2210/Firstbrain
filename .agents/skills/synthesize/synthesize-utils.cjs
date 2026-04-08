/**
 * Utility functions for the /synthesize skill.
 * Discovers related vault notes by topic and creates synthesis notes
 * with proper AI-generated provenance metadata.
 *
 * Zero external dependencies -- Node.js built-ins only.
 * Optional semantic search via ../search/ (graceful degradation).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { loadJson } = require('../scan/utils.cjs');

// ---------- Topic-to-Tag Conversion ----------

/**
 * Convert a topic string to a tag-safe identifier.
 * Lowercases, replaces spaces with hyphens, strips non-alphanumeric chars
 * (except hyphens), collapses consecutive hyphens, trims trailing hyphens.
 * @param {string} topic - The raw topic string
 * @returns {string} Tag-safe identifier
 * @example topicToTag("Machine Learning") => "machine-learning"
 * @example topicToTag("C++") => "c"
 * @example topicToTag("Node.js Streams") => "nodejs-streams"
 */
function topicToTag(topic) {
  return topic
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ---------- Note Discovery ----------

/**
 * Discover vault notes related to a given topic using three signal layers:
 * tag matching, title matching, and optional semantic search.
 *
 * Exclusions: templates (05 - Templates/), atlas navigation (06 - Atlas/),
 * system files (.claude/), and template-flagged notes.
 *
 * @param {string} vaultRoot - Path to vault root
 * @param {string} topic - The topic to search for
 * @returns {Promise<Array<{path: string, name: string, relevance: number, source: string}>>}
 *   Array sorted by relevance descending. `source` indicates which signals matched
 *   (e.g. "tag", "title", "tag+title", "tag+title+semantic").
 */
async function findTopicNotes(vaultRoot, topic) {
  const topicLower = topic.toLowerCase();
  const topicTag = topicToTag(topic);

  // Deduplicate by path -- Map<path, { name, relevance, sources: Set }>
  const noteMap = new Map();

  /**
   * Add or boost a note in the map.
   * @param {string} notePath - Vault-relative path
   * @param {string} name - Display name
   * @param {number} addRelevance - Relevance to add
   * @param {string} sourceLabel - Signal source label
   */
  function addNote(notePath, name, addRelevance, sourceLabel) {
    // Exclude templates, atlas, system files
    if (notePath.startsWith('05 - Templates/')) return;
    if (notePath.startsWith('06 - Atlas/')) return;
    if (notePath.startsWith('.claude/')) return;

    if (noteMap.has(notePath)) {
      const entry = noteMap.get(notePath);
      entry.relevance = Math.min(1.0, entry.relevance + addRelevance);
      entry.sources.add(sourceLabel);
    } else {
      noteMap.set(notePath, {
        name,
        relevance: addRelevance,
        sources: new Set([sourceLabel]),
      });
    }
  }

  // --- Layer 1: Tag matching ---
  const tagIndexPath = path.join(vaultRoot, '.claude', 'indexes', 'tag-index.json');
  const tagIndex = loadJson(tagIndexPath);

  if (tagIndex && tagIndex.tags) {
    for (const [tag, notePaths] of Object.entries(tagIndex.tags)) {
      if (tag.toLowerCase().includes(topicLower) || (topicTag && tag.toLowerCase().includes(topicTag))) {
        for (const notePath of notePaths) {
          const name = path.basename(notePath, '.md');
          addNote(notePath, name, 0.7, 'tag');
        }
      }
    }
  }

  // --- Layer 2: Title matching ---
  const vaultIndexPath = path.join(vaultRoot, '.claude', 'indexes', 'vault-index.json');
  const vaultIndex = loadJson(vaultIndexPath);

  if (vaultIndex && vaultIndex.notes) {
    for (const [notePath, noteData] of Object.entries(vaultIndex.notes)) {
      const noteName = noteData.name || path.basename(notePath, '.md');
      if (noteName.toLowerCase().includes(topicLower)) {
        // If already matched via tag, boost by 0.3; otherwise set to 0.6
        if (noteMap.has(notePath)) {
          addNote(notePath, noteName, 0.3, 'title');
        } else {
          addNote(notePath, noteName, 0.6, 'title');
        }
      }
    }
  }

  // --- Layer 3: Semantic search (optional) ---
  try {
    const { isEmbeddingAvailable, generateEmbedding, openDb, getAllEmbeddings } =
      require('../search/embedder.cjs');
    const { semanticSearch } = require('../search/search-utils.cjs');

    const available = await isEmbeddingAvailable();
    if (available) {
      const queryEmbedding = await generateEmbedding(topic, vaultRoot);
      const db = openDb(vaultRoot);
      const allEmbeddings = getAllEmbeddings(db);
      db.close();

      const semanticResults = semanticSearch(queryEmbedding, allEmbeddings, {
        threshold: 0.3,
        maxResults: 20,
      });

      for (const result of semanticResults) {
        const name = result.title || path.basename(result.path, '.md');
        const addRelevance = result.similarity * 0.5;
        addNote(result.path, name, addRelevance, 'semantic');
      }
    }
  } catch {
    // Semantic search unavailable -- tag + title results are sufficient
  }

  // --- Build sorted result array ---
  const results = [];
  for (const [notePath, entry] of noteMap) {
    results.push({
      path: notePath,
      name: entry.name,
      relevance: Math.round(entry.relevance * 1000) / 1000, // 3 decimal places
      source: Array.from(entry.sources).sort().join('+'),
    });
  }

  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

// ---------- Synthesis Note Creation ----------

/**
 * Create a new synthesis note with proper AI-generated provenance metadata.
 * Places the note in 03 - Resources/ with Zettel naming convention.
 * If a file already exists at the target path, appends a date suffix to avoid overwriting.
 *
 * @param {string} vaultRoot - Path to vault root
 * @param {string} topic - The topic name (e.g. "Docker", "Productivity Systems")
 * @param {string} content - The synthesis body text (markdown with [[wiki-links]])
 * @param {Array<{path: string, name: string}>} sourceNotes - Notes that were synthesized from
 * @returns {{path: string, name: string}} The created note's vault-relative path and name
 */
function createSynthesisNote(vaultRoot, topic, content, sourceNotes) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const tag = topicToTag(topic);

  // Build filename
  let noteName = `Zettel -- ${topic}`;
  let fileName = `${noteName}.md`;
  let relativePath = `03 - Resources/${fileName}`;
  let fullPath = path.join(vaultRoot, relativePath);

  // Handle filename collision
  if (fs.existsSync(fullPath)) {
    noteName = `Zettel -- ${topic} (${today})`;
    fileName = `${noteName}.md`;
    relativePath = `03 - Resources/${fileName}`;
    fullPath = path.join(vaultRoot, relativePath);
  }

  // Build source_notes YAML array
  const sourceNotesYaml = sourceNotes
    .map(sn => `  - "${sn.path}"`)
    .join('\n');

  // Build tags array
  const tagsYaml = tag
    ? `  - synthesis\n  - ${tag}`
    : '  - synthesis';

  // Build Connections section (up to 10 source links)
  const connectionLinks = sourceNotes
    .slice(0, 10)
    .map(sn => {
      const displayName = sn.name || path.basename(sn.path, '.md');
      return `- **Source:** [[${displayName}]]`;
    })
    .join('\n');

  // Assemble note content
  const noteContent = [
    '---',
    'type: zettel',
    `created: ${today}`,
    `updated: ${today}`,
    'tags:',
    tagsYaml,
    'synthesized: true',
    'synthesized_by: claude',
    'source_notes:',
    sourceNotesYaml,
    'status: active',
    '---',
    '',
    `# ${noteName}`,
    '',
    '> Claude-synthesized summary based on vault knowledge.',
    '',
    content,
    '',
    '## Connections',
    '',
    connectionLinks,
    '',
  ].join('\n');

  // Ensure target directory exists
  const targetDir = path.dirname(fullPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Write the note
  fs.writeFileSync(fullPath, noteContent, 'utf8');

  return { path: relativePath, name: noteName };
}

module.exports = {
  findTopicNotes,
  createSynthesisNote,
  topicToTag,
};
