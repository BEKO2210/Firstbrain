/**
 * Semantic search and keyword fallback for the /search skill.
 * Provides cosine similarity, vector search, keyword search, excerpt extraction,
 * and result formatting.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { blobToVector, extractBodyText } = require('./embedder.cjs');
const { loadJson } = require('../scan/utils.cjs');
const { scan } = require('../scan/scanner.cjs');

// ---------- Cosine Similarity ----------

/**
 * Compute cosine similarity between two Float32Arrays.
 * Uses tight for-loop for performance (no array methods).
 * Returns 0 if either vector has zero norm.
 * @param {Float32Array} a - First vector
 * @param {Float32Array} b - Second vector
 * @returns {number} Similarity in [-1, 1]
 */
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ---------- Semantic Search ----------

/**
 * Search all stored embeddings for semantic similarity to a query vector.
 * Uses adaptive threshold (default 0.3) and confidence levels.
 * @param {Float32Array} queryEmbedding - The query vector
 * @param {Array} allEmbeddings - Rows from getAllEmbeddings()
 * @param {object} [options] - Search options
 * @param {number} [options.threshold=0.3] - Minimum similarity to include
 * @param {number} [options.maxResults=20] - Maximum results to return
 * @returns {Array<{path: string, title: string, type: string, similarity: number, confidence: string}>}
 */
function semanticSearch(queryEmbedding, allEmbeddings, options) {
  options = options || {};
  const threshold = options.threshold !== undefined ? options.threshold : 0.3;
  const maxResults = options.maxResults || 20;

  const results = [];
  for (const row of allEmbeddings) {
    const stored = blobToVector(row.embedding);
    const similarity = cosineSimilarity(queryEmbedding, stored);
    if (similarity >= threshold) {
      let confidence;
      if (similarity >= 0.7) {
        confidence = 'high';
      } else if (similarity >= 0.5) {
        confidence = 'medium';
      } else {
        confidence = 'low';
      }
      results.push({
        path: row.path,
        title: row.title,
        type: row.note_type,
        similarity,
        confidence,
      });
    }
  }

  results.sort((a, b) => b.similarity - a.similarity);
  return results.slice(0, maxResults);
}

// ---------- Keyword Search (Fallback) ----------

/** System files to skip in search results */
const SYSTEM_FILES = new Set([
  'Home.md',
  'START HERE.md',
  'Workflow Guide.md',
  'Tag Conventions.md',
]);

/**
 * Fallback search when embeddings are unavailable.
 * Searches by tag matching and title matching.
 * @param {string} query - Search query text
 * @param {object} vaultIndex - vault-index.json data
 * @param {object} tagIndex - tag-index.json data
 * @returns {Array<{path: string, title: string, type: string, score: number, confidence: string, method: string}>}
 */
function keywordSearch(query, vaultIndex, tagIndex) {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return [];

  const scores = {}; // path -> { score, title, type }
  const notes = vaultIndex.notes || {};
  const tags = (tagIndex && tagIndex.tags) || {};

  // 1. Tag matching: +2 per tag match
  for (const word of words) {
    if (tags[word]) {
      for (const notePath of tags[word]) {
        if (!scores[notePath]) {
          const note = notes[notePath];
          scores[notePath] = {
            score: 0,
            title: note ? note.name : path.basename(notePath, '.md'),
            type: note ? note.type : null,
          };
        }
        scores[notePath].score += 2;
      }
    }
  }

  // 2. Title matching: +1 per word match
  for (const notePath of Object.keys(notes)) {
    const note = notes[notePath];
    const nameLower = (note.name || '').toLowerCase();
    for (const word of words) {
      if (nameLower.includes(word)) {
        if (!scores[notePath]) {
          scores[notePath] = {
            score: 0,
            title: note.name,
            type: note.type,
          };
        }
        scores[notePath].score += 1;
      }
    }
  }

  // 3. Filter out templates, MOCs, system files
  const results = [];
  for (const [notePath, info] of Object.entries(scores)) {
    // Skip templates
    const note = notes[notePath];
    if (note && note.isTemplate) continue;
    // Skip MOCs
    if (notePath.startsWith('06 - Atlas/')) continue;
    // Skip template folder
    if (notePath.startsWith('05 - Templates/')) continue;
    // Skip system files
    const baseName = path.basename(notePath);
    if (SYSTEM_FILES.has(baseName)) continue;

    let confidence;
    if (info.score >= 4) {
      confidence = 'high';
    } else if (info.score >= 2) {
      confidence = 'medium';
    } else {
      confidence = 'low';
    }

    results.push({
      path: notePath,
      title: info.title,
      type: info.type,
      score: info.score,
      confidence,
      method: 'keyword',
    });
  }

  // 4. Sort by score descending, return top 10
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 10);
}

// ---------- Excerpt Extraction ----------

/**
 * Extract a relevant excerpt from note body text that shows why it matched.
 * @param {string} bodyText - Plain text body of the note
 * @param {string} query - The search query
 * @param {number} [maxLength=150] - Maximum excerpt length
 * @returns {string} The excerpt
 */
function extractExcerpt(bodyText, query, maxLength) {
  maxLength = maxLength || 150;
  if (!bodyText) return '';

  // Tokenize query into words, filter short words
  const words = (query || '').toLowerCase().split(/\s+/).filter(w => w.length >= 3);
  const bodyLower = bodyText.toLowerCase();

  // Search for first occurrence of any query word
  let matchIndex = -1;
  for (const word of words) {
    const idx = bodyLower.indexOf(word);
    if (idx !== -1 && (matchIndex === -1 || idx < matchIndex)) {
      matchIndex = idx;
    }
  }

  if (matchIndex !== -1) {
    // Extract window centered on the match
    const halfWindow = Math.floor(maxLength / 2);
    let start = Math.max(0, matchIndex - halfWindow);
    let end = Math.min(bodyText.length, start + maxLength);
    // Adjust start if end is at the boundary
    if (end - start < maxLength) {
      start = Math.max(0, end - maxLength);
    }
    let excerpt = bodyText.slice(start, end);
    if (start > 0) excerpt = '...' + excerpt;
    if (end < bodyText.length) excerpt = excerpt + '...';
    return excerpt;
  }

  // No query word found: return first maxLength chars
  if (bodyText.length <= maxLength) return bodyText;
  return bodyText.slice(0, maxLength) + '...';
}

// ---------- Result Formatting ----------

/**
 * Format search results for display to the user.
 * Includes note title, excerpt, confidence, and relevance score.
 * @param {Array} results - Search results (from semanticSearch or keywordSearch)
 * @param {string} query - The original search query
 * @param {string} vaultRoot - Path to vault root
 * @returns {string} Formatted markdown output
 */
function formatSearchResults(results, query, vaultRoot) {
  if (!results || results.length === 0) {
    return `## Search: "${query}"\n\nNo results found.`;
  }

  // Determine search method
  const method = results[0].similarity !== undefined ? 'semantic similarity' : 'keyword matching';

  // Count total notes searched (approximate from results metadata)
  const totalNote = results.length;

  const lines = [];
  lines.push(`## Search: "${query}"`);
  lines.push('');
  lines.push(`Found ${results.length} result${results.length === 1 ? '' : 's'}:`);
  lines.push('');

  for (let i = 0; i < results.length; i++) {
    const r = results[i];

    // Generate excerpt if not already set
    if (!r.excerpt) {
      try {
        const filePath = path.join(vaultRoot, r.path);
        const content = fs.readFileSync(filePath, 'utf8');
        const bodyText = extractBodyText(content);
        r.excerpt = extractExcerpt(bodyText, query);
      } catch {
        r.excerpt = '';
      }
    }

    const relevance = r.similarity !== undefined
      ? `Relevance: ${r.similarity.toFixed(2)}`
      : `Score: ${r.score}`;

    lines.push(`${i + 1}. **[[${r.title || r.path}]]** (${r.confidence} confidence)`);
    if (r.excerpt) {
      lines.push(`   > ${r.excerpt}`);
    }
    lines.push(`   Type: ${r.type || 'unknown'} | ${relevance}`);
    lines.push('');
  }

  lines.push(`_Searched via ${method}_`);

  return lines.join('\n');
}

// ---------- Index Freshness ----------

/**
 * Ensure fresh scan indexes exist. Triggers a scan if scan-state is stale (>5 min).
 * @param {string} vaultRoot - Path to vault root
 * @returns {object|null} Scan result if scan was triggered, null if indexes are fresh
 */
function ensureFreshIndexes(vaultRoot) {
  const indexDir = path.join(vaultRoot, '.claude', 'indexes');
  const scanStatePath = path.join(indexDir, 'scan-state.json');
  const scanState = loadJson(scanStatePath);

  const STALE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

  if (scanState && scanState.lastScan) {
    const age = Date.now() - scanState.lastScan;
    if (age < STALE_THRESHOLD) {
      return null; // Fresh enough
    }
  }

  // Stale or missing -- run scan
  return scan(vaultRoot, { verbose: true });
}

module.exports = {
  cosineSimilarity,
  semanticSearch,
  keywordSearch,
  extractExcerpt,
  formatSearchResults,
  ensureFreshIndexes,
};
