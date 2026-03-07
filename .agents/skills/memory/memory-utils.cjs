/**
 * Memory management utilities for the memory skill.
 * Handles insight distillation, project memory lifecycle, and memory overview.
 * Zero external dependencies beyond Node.js built-ins and scan/utils.cjs.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { loadJson } = require('../scan/utils.cjs');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Get today's date in YYYY-MM-DD format.
 * @returns {string}
 */
function today() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Generate a URL-safe slug from a project name.
 * Lowercase, spaces to hyphens, strip non-alphanumeric except hyphens.
 * @param {string} name
 * @returns {string}
 */
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ---------------------------------------------------------------------------
// Insight Parsing & Writing
// ---------------------------------------------------------------------------

/**
 * Parse .claude/memory/insights.md into a structured object.
 * @param {string} vaultRoot - Path to vault root
 * @returns {{ updated: string|null, entryCount: number, categories: Object<string, Array<{title: string, observation: string, confidence: number, observations: number, lastSeen: string}>> }}
 */
function parseInsights(vaultRoot) {
  const filePath = path.join(vaultRoot, '.claude', 'memory', 'insights.md');

  if (!fs.existsSync(filePath)) {
    return { updated: null, entryCount: 0, categories: {} };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Parse frontmatter
  let updated = null;
  let entryCount = 0;
  let inFrontmatter = false;
  let bodyStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (i === 0 && line === '---') {
      inFrontmatter = true;
      continue;
    }
    if (inFrontmatter) {
      if (line === '---') {
        bodyStart = i + 1;
        break;
      }
      const match = line.match(/^(\w[\w_]*):\s*(.+)$/);
      if (match) {
        const key = match[1];
        const val = match[2].trim();
        if (key === 'updated') updated = val;
        if (key === 'entry_count') entryCount = parseInt(val, 10) || 0;
      }
    }
  }

  // Parse categories and insights from markdown
  const categories = {};
  let currentCategory = null;
  let currentInsight = null;

  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i];

    // H2 = category
    const h2Match = line.match(/^## (.+)$/);
    if (h2Match) {
      currentCategory = h2Match[1].trim();
      if (!categories[currentCategory]) {
        categories[currentCategory] = [];
      }
      currentInsight = null;
      continue;
    }

    // H3 = insight title within a category
    const h3Match = line.match(/^### (.+)$/);
    if (h3Match && currentCategory) {
      currentInsight = {
        title: h3Match[1].trim(),
        observation: '',
        confidence: 0.5,
        observations: 1,
        lastSeen: today(),
      };
      categories[currentCategory].push(currentInsight);
      continue;
    }

    // Metadata lines within an insight
    if (currentInsight) {
      const obsMatch = line.match(/^- \*\*Observation:\*\*\s*(.+)$/);
      if (obsMatch) {
        currentInsight.observation = obsMatch[1].trim();
        continue;
      }

      const confMatch = line.match(/^- \*\*Confidence:\*\*\s*([\d.]+)/);
      if (confMatch) {
        currentInsight.confidence = parseFloat(confMatch[1]);
        // Also extract last seen from the parenthetical if present
        const seenMatch = line.match(/last seen:\s*([\d-]+)/);
        if (seenMatch) {
          currentInsight.lastSeen = seenMatch[1];
        }
        continue;
      }

      const countMatch = line.match(/^- \*\*Observations:\*\*\s*(\d+)/);
      if (countMatch) {
        currentInsight.observations = parseInt(countMatch[1], 10);
        continue;
      }

      const seenMatch = line.match(/^- \*\*Last seen:\*\*\s*([\d-]+)/);
      if (seenMatch) {
        currentInsight.lastSeen = seenMatch[1];
        continue;
      }
    }
  }

  // Count actual entries
  let actualCount = 0;
  for (const cat of Object.keys(categories)) {
    actualCount += categories[cat].length;
  }

  return { updated, entryCount: actualCount, categories };
}

/**
 * Write structured insight data to .claude/memory/insights.md.
 * Rewrites the entire file (not append).
 * @param {string} vaultRoot - Path to vault root
 * @param {{ categories: Object<string, Array<{title: string, observation: string, confidence: number, observations: number, lastSeen: string}>> }} insightData
 */
function writeInsights(vaultRoot, insightData) {
  const dir = path.join(vaultRoot, '.claude', 'memory');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Count total entries
  let totalEntries = 0;
  for (const cat of Object.keys(insightData.categories)) {
    totalEntries += insightData.categories[cat].length;
  }

  // Build markdown
  const lines = [
    '---',
    `updated: ${today()}`,
    `entry_count: ${totalEntries}`,
    '---',
    '',
    '# Long-term Insights',
    '',
    "Claude's distilled understanding of vault patterns, recurring themes, and organizational habits. Updated during significant vault activity. User-editable -- corrections are respected.",
    '',
  ];

  for (const [catName, insights] of Object.entries(insightData.categories)) {
    lines.push(`## ${catName}`);
    lines.push('');

    if (insights.length === 0) {
      lines.push(`(No insights in this category yet)`);
      lines.push('');
      continue;
    }

    for (const insight of insights) {
      lines.push(`### ${insight.title}`);
      lines.push(`- **Observation:** ${insight.observation}`);
      lines.push(`- **Confidence:** ${insight.confidence.toFixed(1)} (observed ${insight.observations} times, last seen: ${insight.lastSeen})`);
      lines.push(`- **Observations:** ${insight.observations}`);
      lines.push(`- **Last seen:** ${insight.lastSeen}`);
      lines.push('');
    }
  }

  const filePath = path.join(dir, 'insights.md');
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');

  // Update entryCount in data
  insightData.entryCount = totalEntries;
  insightData.updated = today();
}

// ---------------------------------------------------------------------------
// Insight Distillation
// ---------------------------------------------------------------------------

/**
 * Check if two observation texts are similar enough to be the same insight.
 * Uses simple substring/keyword matching.
 * @param {string} existing - Existing observation text
 * @param {string} candidate - Candidate observation text
 * @returns {boolean}
 */
function observationMatches(existing, candidate) {
  const a = existing.toLowerCase();
  const b = candidate.toLowerCase();

  // Direct substring match
  if (a.includes(b) || b.includes(a)) return true;

  // Keyword overlap: if 60%+ of significant words overlap
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'and', 'or', 'but', 'not', 'has', 'have', 'had', 'this', 'that', 'from', 'by']);
  const wordsA = a.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
  const wordsB = b.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));

  if (wordsA.length === 0 || wordsB.length === 0) return false;

  const setA = new Set(wordsA);
  const overlap = wordsB.filter(w => setA.has(w)).length;
  const ratio = overlap / Math.min(wordsA.length, wordsB.length);

  return ratio >= 0.6;
}

/**
 * Find an existing insight that matches a candidate observation.
 * @param {Object} categories - Categories object from insightData
 * @param {string} candidateObservation - Observation text to match
 * @returns {{ category: string, index: number }|null}
 */
function findMatchingInsight(categories, candidateObservation) {
  for (const [catName, insights] of Object.entries(categories)) {
    for (let i = 0; i < insights.length; i++) {
      if (observationMatches(insights[i].observation, candidateObservation)) {
        return { category: catName, index: i };
      }
    }
  }
  return null;
}

/**
 * Core insight distillation function. Analyzes vault patterns and writes findings.
 * @param {string} vaultRoot
 * @param {Array} vaultIndex - Parsed vault-index.json array of note entries
 * @param {{ tags: Object<string, string[]>, tagCount: number }} tagIndex - Parsed tag-index.json
 * @param {{ activityLog?: Array<{ action: string, path: string, date: string }> }} options
 * @returns {{ added: number, reinforced: number, decayed: number, pruned: number, total: number }}
 */
function distillInsights(vaultRoot, vaultIndex, tagIndex, options = {}) {
  const insightData = parseInsights(vaultRoot);
  const { activityLog = [] } = options;

  // Track stats
  let added = 0;
  let reinforced = 0;
  const reinforcedSet = new Set(); // Track which insights were reinforced this pass

  // -----------------------------------------------------------------------
  // 1. Analyze vault structure for organizational patterns
  // -----------------------------------------------------------------------

  const notes = vaultIndex && vaultIndex.notes
    ? Object.values(vaultIndex.notes)
    : (Array.isArray(vaultIndex) ? vaultIndex : []);

  // Tag usage distribution
  const tagCounts = {};
  if (tagIndex && tagIndex.tags) {
    for (const [tag, paths] of Object.entries(tagIndex.tags)) {
      tagCounts[tag] = paths.length;
    }
  }

  // Find dominant tags (top 20% by note count)
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  const dominantThreshold = Math.max(3, Math.ceil(sortedTags.length * 0.2));
  const dominantTags = sortedTags.slice(0, dominantThreshold);

  for (const [tag, count] of dominantTags) {
    if (count >= 3) {
      const observation = `Tag #${tag} is used frequently across ${count} notes`;
      const match = findMatchingInsight(insightData.categories, observation);
      if (match) {
        const insight = insightData.categories[match.category][match.index];
        insight.observations += 1;
        insight.confidence = Math.min(1.0, insight.confidence + 0.1);
        insight.lastSeen = today();
        reinforced++;
        reinforcedSet.add(`${match.category}::${match.index}`);
      } else {
        if (!insightData.categories['Organizational Patterns']) {
          insightData.categories['Organizational Patterns'] = [];
        }
        insightData.categories['Organizational Patterns'].push({
          title: `Frequent use of #${tag}`,
          observation,
          confidence: 0.5,
          observations: 1,
          lastSeen: today(),
        });
        added++;
      }
    }
  }

  // Folder distribution
  const folderCounts = {};
  for (const note of notes) {
    if (note.isTemplate) continue;
    const folder = note.path.split('/')[0] || 'root';
    folderCounts[folder] = (folderCounts[folder] || 0) + 1;
  }

  const totalNotes = notes.filter(n => !n.isTemplate).length;
  for (const [folder, count] of Object.entries(folderCounts)) {
    const pct = totalNotes > 0 ? ((count / totalNotes) * 100).toFixed(0) : 0;
    if (count >= 5 && pct >= 20) {
      const observation = `Folder "${folder}" contains ${pct}% of vault notes (${count} notes)`;
      const match = findMatchingInsight(insightData.categories, observation);
      if (match) {
        const insight = insightData.categories[match.category][match.index];
        insight.observations += 1;
        insight.confidence = Math.min(1.0, insight.confidence + 0.1);
        insight.lastSeen = today();
        reinforced++;
        reinforcedSet.add(`${match.category}::${match.index}`);
      } else {
        if (!insightData.categories['Organizational Patterns']) {
          insightData.categories['Organizational Patterns'] = [];
        }
        insightData.categories['Organizational Patterns'].push({
          title: `Heavy use of ${folder}`,
          observation,
          confidence: 0.5,
          observations: 1,
          lastSeen: today(),
        });
        added++;
      }
    }
  }

  // Type distribution
  const typeCounts = {};
  for (const note of notes) {
    if (note.isTemplate) continue;
    const noteType = (note.frontmatter && note.frontmatter.type) || note.type || 'unknown';
    typeCounts[noteType] = (typeCounts[noteType] || 0) + 1;
  }

  for (const [noteType, count] of Object.entries(typeCounts)) {
    if (count >= 3 && noteType !== 'unknown') {
      const observation = `Note type "${noteType}" is commonly used with ${count} notes`;
      const match = findMatchingInsight(insightData.categories, observation);
      if (match) {
        const insight = insightData.categories[match.category][match.index];
        insight.observations += 1;
        insight.confidence = Math.min(1.0, insight.confidence + 0.1);
        insight.lastSeen = today();
        reinforced++;
        reinforcedSet.add(`${match.category}::${match.index}`);
      } else {
        if (!insightData.categories['Organizational Patterns']) {
          insightData.categories['Organizational Patterns'] = [];
        }
        insightData.categories['Organizational Patterns'].push({
          title: `Common note type: ${noteType}`,
          observation,
          confidence: 0.5,
          observations: 1,
          lastSeen: today(),
        });
        added++;
      }
    }
  }

  // -----------------------------------------------------------------------
  // 2. Analyze tag-index for thematic patterns
  // -----------------------------------------------------------------------

  if (tagIndex && tagIndex.tags) {
    // Tag clusters: groups of notes sharing 2+ tags
    const tagPairs = {};
    const tagNotes = tagIndex.tags;

    const tagNames = Object.keys(tagNotes);
    for (let i = 0; i < tagNames.length; i++) {
      for (let j = i + 1; j < tagNames.length; j++) {
        const tag1 = tagNames[i];
        const tag2 = tagNames[j];
        const shared = tagNotes[tag1].filter(p => tagNotes[tag2].includes(p));
        if (shared.length >= 2) {
          const pairKey = [tag1, tag2].sort().join('+');
          tagPairs[pairKey] = shared.length;
        }
      }
    }

    // Report significant tag clusters
    for (const [pairKey, count] of Object.entries(tagPairs)) {
      if (count >= 3) {
        const [tag1, tag2] = pairKey.split('+');
        const observation = `Tags #${tag1} and #${tag2} frequently co-occur across ${count} notes`;
        const match = findMatchingInsight(insightData.categories, observation);
        if (match) {
          const insight = insightData.categories[match.category][match.index];
          insight.observations += 1;
          insight.confidence = Math.min(1.0, insight.confidence + 0.1);
          insight.lastSeen = today();
          reinforced++;
          reinforcedSet.add(`${match.category}::${match.index}`);
        } else {
          if (!insightData.categories['Thematic Patterns']) {
            insightData.categories['Thematic Patterns'] = [];
          }
          insightData.categories['Thematic Patterns'].push({
            title: `Tag cluster: #${tag1} + #${tag2}`,
            observation,
            confidence: 0.5,
            observations: 1,
            lastSeen: today(),
          });
          added++;
        }
      }
    }

    // Growing topics: tags with many notes
    for (const [tag, paths] of Object.entries(tagNotes)) {
      if (paths.length >= 5) {
        const observation = `Topic #${tag} is a growing area of interest with ${paths.length} notes`;
        const match = findMatchingInsight(insightData.categories, observation);
        if (match) {
          const insight = insightData.categories[match.category][match.index];
          insight.observations += 1;
          insight.confidence = Math.min(1.0, insight.confidence + 0.1);
          insight.lastSeen = today();
          reinforced++;
          reinforcedSet.add(`${match.category}::${match.index}`);
        } else {
          if (!insightData.categories['Thematic Patterns']) {
            insightData.categories['Thematic Patterns'] = [];
          }
          insightData.categories['Thematic Patterns'].push({
            title: `Growing topic: #${tag}`,
            observation,
            confidence: 0.5,
            observations: 1,
            lastSeen: today(),
          });
          added++;
        }
      }
    }
  }

  // -----------------------------------------------------------------------
  // 3. Apply confidence decay (activity-relative, not calendar-based)
  // -----------------------------------------------------------------------

  let decayed = 0;
  const hasActivity = activityLog.length > 0;

  if (hasActivity) {
    for (const [catName, insights] of Object.entries(insightData.categories)) {
      for (let i = 0; i < insights.length; i++) {
        const key = `${catName}::${i}`;
        if (!reinforcedSet.has(key)) {
          insights[i].confidence = Math.max(0, +(insights[i].confidence - 0.05).toFixed(2));
          decayed++;
        }
      }
    }
  }

  // -----------------------------------------------------------------------
  // 4. Prune low-quality insights
  // -----------------------------------------------------------------------

  const pruneResult = pruneInsights(insightData);

  // -----------------------------------------------------------------------
  // 5. Write back
  // -----------------------------------------------------------------------

  writeInsights(vaultRoot, insightData);

  // Count total
  let total = 0;
  for (const cat of Object.keys(insightData.categories)) {
    total += insightData.categories[cat].length;
  }

  return {
    added,
    reinforced,
    decayed,
    pruned: pruneResult.pruned,
    total,
  };
}

/**
 * Remove low-quality insights from the data structure.
 * - Remove entries with confidence < 0.3
 * - If total > 100, remove lowest-confidence until at or below 100
 * @param {{ categories: Object<string, Array> }} insightData - Mutated in place
 * @returns {{ pruned: number, remaining: number }}
 */
function pruneInsights(insightData) {
  let pruned = 0;

  // Pass 1: remove confidence < 0.3
  for (const catName of Object.keys(insightData.categories)) {
    const before = insightData.categories[catName].length;
    insightData.categories[catName] = insightData.categories[catName].filter(
      insight => insight.confidence >= 0.3
    );
    pruned += before - insightData.categories[catName].length;
  }

  // Count remaining
  let remaining = 0;
  for (const cat of Object.keys(insightData.categories)) {
    remaining += insightData.categories[cat].length;
  }

  // Pass 2: soft limit of 100 entries
  if (remaining > 100) {
    // Collect all insights with their location
    const allInsights = [];
    for (const [catName, insights] of Object.entries(insightData.categories)) {
      for (let i = 0; i < insights.length; i++) {
        allInsights.push({ catName, index: i, confidence: insights[i].confidence });
      }
    }

    // Sort by confidence ascending (lowest first)
    allInsights.sort((a, b) => a.confidence - b.confidence);

    // Mark entries to remove
    const toRemove = remaining - 100;
    const removeSet = new Set();
    for (let i = 0; i < toRemove; i++) {
      removeSet.add(`${allInsights[i].catName}::${allInsights[i].index}`);
    }

    // Remove marked entries (reverse order to preserve indices)
    for (const catName of Object.keys(insightData.categories)) {
      const insights = insightData.categories[catName];
      insightData.categories[catName] = insights.filter((_, i) => {
        return !removeSet.has(`${catName}::${i}`);
      });
    }

    pruned += toRemove;
    remaining -= toRemove;
  }

  return { pruned, remaining };
}

// ---------------------------------------------------------------------------
// Project Memory
// ---------------------------------------------------------------------------

/**
 * Scan vault-index.json for project notes.
 * @param {string} vaultRoot
 * @returns {Array<{ path: string, name: string, status: string }>}
 */
function getActiveProjects(vaultRoot) {
  const indexPath = path.join(vaultRoot, '.claude', 'indexes', 'vault-index.json');
  const index = loadJson(indexPath);

  if (!index || !index.notes) return [];

  return Object.values(index.notes)
    .filter(note => {
      const fm = note.frontmatter || {};
      return (
        fm.type === 'project' &&
        note.path &&
        note.path.startsWith('01 - Projects/') &&
        note.isTemplate !== true
      );
    })
    .map(note => ({
      path: note.path,
      name: note.name || path.basename(note.path, '.md'),
      status: (note.frontmatter && note.frontmatter.status) || 'unknown',
    }));
}

/**
 * Create a project-specific memory file.
 * @param {string} vaultRoot
 * @param {{ path: string, name: string, status: string }} projectNote
 * @returns {{ created: boolean, path?: string, reason?: string }}
 */
function createProjectMemory(vaultRoot, projectNote) {
  const slug = slugify(projectNote.name);
  const filePath = path.join(vaultRoot, '.claude', 'memory', `project-${slug}.md`);

  if (fs.existsSync(filePath)) {
    return { created: false, reason: 'already exists' };
  }

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const status = projectNote.status || 'active';
  const content = [
    '---',
    `project: ${projectNote.name}`,
    `source: ${projectNote.path}`,
    `status: ${status}`,
    `created: ${today()}`,
    `updated: ${today()}`,
    '---',
    '',
    `# Project Memory: ${projectNote.name}`,
    '',
    '## Current Status',
    `${status} -- (context will be filled as Claude interacts with this project)`,
    '',
    '## Key Decisions',
    '- (Decisions will be tracked here as they are made)',
    '',
    '## Blockers',
    '- (No current blockers)',
    '',
    '## Next Actions',
    '- (Next actions will be tracked here)',
    '',
    '## Context',
    `Source note: [[${projectNote.name}]]`,
    '',
  ].join('\n');

  fs.writeFileSync(filePath, content, 'utf8');

  return { created: true, path: filePath };
}

/**
 * Archive a project memory on completion and distill key lessons into insights.md.
 * @param {string} vaultRoot
 * @param {string} slug - Project slug (from slugify)
 * @returns {{ archived: boolean, path?: string, reason?: string, lessonsDistilled?: number }}
 */
function archiveProjectMemory(vaultRoot, slug) {
  const sourcePath = path.join(vaultRoot, '.claude', 'memory', `project-${slug}.md`);

  if (!fs.existsSync(sourcePath)) {
    return { archived: false, reason: 'file not found' };
  }

  const content = fs.readFileSync(sourcePath, 'utf8');

  // -----------------------------------------------------------------------
  // 1. Distill key lessons from the project memory
  // -----------------------------------------------------------------------

  const lessons = [];
  const lines = content.split('\n');

  // Extract project name from frontmatter
  let projectName = slug;
  const projectMatch = content.match(/^project:\s*(.+)$/m);
  if (projectMatch) {
    projectName = projectMatch[1].trim();
  }

  // Parse "Key Decisions" section
  let inDecisions = false;
  for (const line of lines) {
    if (line.match(/^## Key Decisions/)) {
      inDecisions = true;
      continue;
    }
    if (line.match(/^## /) && inDecisions) {
      inDecisions = false;
      continue;
    }
    if (inDecisions) {
      const decision = line.replace(/^-\s*/, '').trim();
      // Skip placeholder entries
      if (decision && !decision.startsWith('(') && decision.length > 5) {
        lessons.push({
          title: `${projectName}: ${decision.slice(0, 60)}${decision.length > 60 ? '...' : ''}`,
          observation: decision,
        });
      }
    }
  }

  // Parse "Context" section for patterns/takeaways
  let inContext = false;
  for (const line of lines) {
    if (line.match(/^## Context/)) {
      inContext = true;
      continue;
    }
    if (line.match(/^## /) && inContext) {
      inContext = false;
      continue;
    }
    if (inContext) {
      const note = line.replace(/^-\s*/, '').trim();
      // Skip template placeholders and source note line
      if (note && !note.startsWith('(') && !note.startsWith('Source note:') && note.length > 10) {
        lessons.push({
          title: `${projectName}: ${note.slice(0, 60)}${note.length > 60 ? '...' : ''}`,
          observation: note,
        });
      }
    }
  }

  // Write lessons to insights.md
  if (lessons.length > 0) {
    const insightData = parseInsights(vaultRoot);
    if (!insightData.categories['Project Lessons']) {
      insightData.categories['Project Lessons'] = [];
    }

    for (const lesson of lessons) {
      insightData.categories['Project Lessons'].push({
        title: lesson.title,
        observation: lesson.observation,
        confidence: 0.6,
        observations: 1,
        lastSeen: today(),
      });
    }

    writeInsights(vaultRoot, insightData);
  }

  // -----------------------------------------------------------------------
  // 2. Copy to archive (never delete source -- governance)
  // -----------------------------------------------------------------------

  const archiveDir = path.join(vaultRoot, '.claude', 'memory', 'archive');
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  const archivePath = path.join(archiveDir, `project-${slug}.md`);

  // Update status in the archived copy
  const archivedContent = content.replace(
    /^status:\s*.+$/m,
    'status: archived'
  );

  fs.writeFileSync(archivePath, archivedContent, 'utf8');

  return {
    archived: true,
    path: archivePath,
    lessonsDistilled: lessons.length,
  };
}

// ---------------------------------------------------------------------------
// Memory Overview / Dashboard
// ---------------------------------------------------------------------------

/**
 * Generate the /memory dashboard output.
 * @param {string} vaultRoot
 * @returns {string} Formatted markdown dashboard
 */
function generateMemoryOverview(vaultRoot) {
  const sections = [];

  sections.push('# Memory Dashboard');
  sections.push('');

  // -----------------------------------------------------------------------
  // Working Memory
  // -----------------------------------------------------------------------

  sections.push('## Working Memory');

  const memoryPath = path.join(vaultRoot, 'MEMORY.md');
  if (fs.existsSync(memoryPath)) {
    const memContent = fs.readFileSync(memoryPath, 'utf8');
    const memLines = memContent.split('\n');

    // Skip frontmatter, take first 10 content lines
    let inFrontmatter = false;
    let pastFrontmatter = false;
    let contentLines = 0;

    for (const line of memLines) {
      if (line.trim() === '---' && !pastFrontmatter) {
        if (inFrontmatter) {
          pastFrontmatter = true;
        } else {
          inFrontmatter = true;
        }
        continue;
      }

      if (pastFrontmatter && contentLines < 10) {
        sections.push(line);
        contentLines++;
      }
    }
  } else {
    sections.push('(No MEMORY.md found)');
  }
  sections.push('');

  // -----------------------------------------------------------------------
  // Long-term Insights
  // -----------------------------------------------------------------------

  sections.push('## Long-term Insights');

  const insightData = parseInsights(vaultRoot);
  const categoryNames = Object.keys(insightData.categories);
  const totalEntries = insightData.entryCount;

  sections.push(`- **Entries:** ${totalEntries} across ${categoryNames.length} categories`);
  sections.push(`- **Categories:** ${categoryNames.length > 0 ? categoryNames.join(', ') : 'None yet'}`);

  // Top insights by confidence
  const allInsights = [];
  for (const [catName, insights] of Object.entries(insightData.categories)) {
    for (const insight of insights) {
      allInsights.push({ ...insight, category: catName });
    }
  }
  allInsights.sort((a, b) => b.confidence - a.confidence);

  if (allInsights.length > 0) {
    const topN = allInsights.slice(0, 3);
    const topLines = topN.map(i => `${i.title} (${i.confidence.toFixed(1)})`);
    sections.push(`- **Top insights:** ${topLines.join('; ')}`);
  } else {
    sections.push('- **Top insights:** None yet -- insights emerge as vault activity accumulates');
  }
  sections.push('');

  // -----------------------------------------------------------------------
  // Project Memories
  // -----------------------------------------------------------------------

  sections.push('## Project Memories');

  const memDir = path.join(vaultRoot, '.claude', 'memory');
  let projectFiles = [];
  try {
    const files = fs.readdirSync(memDir);
    projectFiles = files.filter(f => f.startsWith('project-') && f.endsWith('.md'));
  } catch {
    // Directory may not exist
  }

  if (projectFiles.length > 0) {
    for (const pf of projectFiles) {
      const pfPath = path.join(memDir, pf);
      const pfContent = fs.readFileSync(pfPath, 'utf8');

      // Extract project name and status from frontmatter
      let pName = pf.replace('project-', '').replace('.md', '');
      let pStatus = 'unknown';
      let pUpdated = 'unknown';

      const nameMatch = pfContent.match(/^project:\s*(.+)$/m);
      if (nameMatch) pName = nameMatch[1].trim();
      const statusMatch = pfContent.match(/^status:\s*(.+)$/m);
      if (statusMatch) pStatus = statusMatch[1].trim();
      const updatedMatch = pfContent.match(/^updated:\s*(.+)$/m);
      if (updatedMatch) pUpdated = updatedMatch[1].trim();

      sections.push(`- ${pName} (${pStatus}) -- last updated ${pUpdated}`);
    }
  } else {
    sections.push('No project memories yet');
  }
  sections.push('');

  // -----------------------------------------------------------------------
  // Embedding Index
  // -----------------------------------------------------------------------

  sections.push('## Embedding Index');

  try {
    const embedderPath = path.join(vaultRoot, '.agents', 'skills', 'search', 'embedder.cjs');
    if (fs.existsSync(embedderPath)) {
      // Get embedding stats from SQLite via embedder.cjs
      const embedder = require(embedderPath);
      const embStatus = embedder.getEmbeddingStatus(vaultRoot);
      if (embStatus && embStatus.totalEmbeddings > 0) {
        sections.push(`- **Notes embedded:** ${embStatus.totalEmbeddings}`);
        sections.push(`- **Last update:** ${embStatus.latestUpdate || 'unknown'}`);
      } else {
        sections.push('- Embedder available but no embeddings generated yet');
        sections.push('- Run `/scan` to generate embeddings');
      }
    } else {
      sections.push('- Not configured -- embedding infrastructure not yet installed');
      sections.push('- Semantic search will be available after Phase 4 Plan 1 completes');
    }
  } catch {
    sections.push('- Not configured -- run `/scan` to enable semantic search');
  }
  sections.push('');

  return sections.join('\n');
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

module.exports = {
  distillInsights,
  parseInsights,
  writeInsights,
  pruneInsights,
  createProjectMemory,
  archiveProjectMemory,
  getActiveProjects,
  generateMemoryOverview,
};
