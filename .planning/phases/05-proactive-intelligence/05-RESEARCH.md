# Phase 5: Proactive Intelligence - Research

**Researched:** 2026-03-07
**Domain:** Proactive vault intelligence -- daily briefings, inbox triage, cross-note synthesis, and consistency maintenance
**Confidence:** HIGH

## Summary

Phase 5 builds four new Claude Code skills (/briefing, /triage, /synthesize, /maintain) that make the vault actively work for the user rather than passively responding. All four skills follow the same architectural pattern established in Phases 3-4: a SKILL.md interface definition plus supporting .cjs utility modules under `.agents/skills/{name}/`. Each skill consumes the existing JSON indexes (vault-index.json, link-map.json, tag-index.json) and memory infrastructure (MEMORY.md, insights.md, project-*.md) built in v1.0 -- no new infrastructure is needed.

The core architectural challenge is that these skills operate at a higher level of abstraction than v1.0 skills. Where /create works on a single note and /health checks structural validity, /briefing must reason across the entire vault state, /triage must classify content intelligently, /synthesize must compose new knowledge from multiple sources, and /maintain must detect semantic inconsistencies. The key insight is that Claude's reasoning IS the intelligence layer -- the utility modules provide data gathering, aggregation, and formatting, while Claude performs the actual analysis, classification, and content generation. No NLP library or ML model is needed for classification; Claude's own language understanding handles type inference, priority assessment, and content synthesis far better than any lightweight NLP package.

Every proactive skill must respect the AUTO/PROPOSE/NEVER governance zones established in Phase 1. /briefing is read-only (no governance concern). /triage auto-applies tags and metadata (AUTO zone) but proposes structural moves (PROPOSE zone). /synthesize creates new notes (content creation, not editing -- outside governance zones, but must be clearly marked as AI-generated). /maintain auto-fixes obvious inconsistencies (AUTO zone) but proposes corrections that involve judgment (PROPOSE zone).

**Primary recommendation:** Build each skill as a self-contained directory under `.agents/skills/` with a SKILL.md and supporting utilities. The utility modules handle data aggregation (scanning recent changes, collecting inbox notes, finding notes by topic, detecting inconsistencies) while Claude's reasoning handles classification, prioritization, synthesis, and recommendation quality. No external dependencies are needed -- everything builds on the existing v1.0 infrastructure.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROA-01 | /briefing generates calm daily executive summary (changes, priorities, neglected items, suggestions) | Data sources: scan-state.json (lastScan, file mtimes), vault-index.json (project status/priority, note types), MEMORY.md (current priorities), insights.md (patterns), project-*.md (project status). Aggregation utility computes "recent changes" from mtime comparison, "neglected items" from projects with status=active + old mtime, "priorities" from project frontmatter priority field. Claude formats as calm executive briefing. |
| PROA-02 | /triage classifies inbox notes by type and suggests target folder with confidence level | Data source: vault-index.json notes in `00 - Inbox/` (excluding Inbox.md, daily notes). Claude reads note content and infers type from content signals (headings, keywords, structure). TEMPLATE_MAP from create-utils.cjs provides canonical type-to-folder mapping for target suggestions. Confidence based on signal strength (clear type indicators = high, ambiguous = low). |
| PROA-03 | /triage auto-applies tags and metadata for high-confidence classifications (AUTO zone) | For high-confidence classifications: write frontmatter type + tags directly (AUTO zone -- same as "fill missing frontmatter fields" in governance). Re-scan after modifications. Log to changelog.md. |
| PROA-04 | /triage proposes folder moves and type changes for review (PROPOSE zone) | Folder moves are structural changes = PROPOSE zone. Present: "Move [[Note]] from 00 - Inbox to 03 - Resources? (classified as tool, high confidence)". User approves or rejects each. Execute approved moves via fs.renameSync. |
| PROA-05 | /synthesize generates topic summaries from multiple related notes with wiki-link citations | Data sources: tag-index.json (find notes by topic tag), semantic search (find notes by meaning), vault-index.json (note metadata). Claude reads matched notes' content, synthesizes a summary, includes `[[Note Name]]` wiki-links as citations. Output is a new markdown file. |
| PROA-06 | /synthesize marks generated notes as Claude-synthesized in frontmatter | Add `synthesized: true` and `synthesized_by: claude` to frontmatter. Also add `source_notes: [list of source note paths]` for provenance. Use `type: zettel` as the note type (atomic knowledge synthesis). |
| PROA-07 | /maintain detects and fixes tag/frontmatter inconsistencies across vault | Scan all notes for: missing required frontmatter (type, created, tags), type mismatches (note in wrong folder for its type), invalid status values, tag casing issues. Auto-fix obvious issues (missing created date from file mtime, tag lowercasing). Propose fixes for judgment calls (type reassignment). |
| PROA-08 | /maintain detects stale projects (active but untouched for configurable period) | From vault-index.json: find notes with type=project + status=active. Compare mtime against threshold (default: 30 days). Flag stale projects with last-modified date and suggest: update status to on-hold, or archive. |
| PROA-09 | /maintain detects outdated references and creates review queue | From link-map.json: find notes that link to archived/completed projects. From vault-index.json: find notes with stale external URLs (future), notes referencing deprecated tools. Generate review queue as formatted list with suggested actions. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js built-in `fs` | v25.6.1 | File I/O for reading note content, writing synthesized notes, modifying frontmatter | Consistent with all previous phases. Zero dependencies. |
| Node.js built-in `path` | v25.6.1 | Path construction for vault navigation | Cross-platform path handling. |
| Phase 2 scanner (`scanner.cjs`) | 1.0.0 | Pre-skill index freshness via `ensureFreshIndexes()` and post-modification `scan()` | All skills call this before operating. Established pattern. |
| Phase 2 indexes (`vault-index.json`, `link-map.json`, `tag-index.json`, `scan-state.json`) | v1 | Primary data source for all four skills | Already built, tested, and proven at scale. |
| Phase 3 utilities (`create-utils.cjs`) | 1.0.0 | TEMPLATE_MAP for type-to-folder mapping, template variable substitution | Reused in /triage for target folder inference and /synthesize for note creation. |
| Phase 3 connection discovery (`connect-utils.cjs`) | 1.0.0 | findConnections() for topic-related note discovery | Reused in /synthesize to find related notes for a topic. |
| Phase 3 health analysis (`health-utils.cjs`) | 1.0.0 | analyzeHealth() for broken link detection | Reused in /maintain alongside new consistency checks. |
| Phase 4 memory (`memory-utils.cjs`) | 1.0.0 | parseInsights(), getActiveProjects(), generateMemoryOverview() | Reused in /briefing for project status and insight surfacing. |
| Phase 4 search (`search-utils.cjs`, `embedder.cjs`) | 1.0.0 | semanticSearch() for topic-based note discovery | Reused in /synthesize for finding semantically related notes. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Claude's reasoning | N/A | Content classification, priority assessment, synthesis generation | Core intelligence layer for all four skills. No NLP library needed. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Claude reasoning for classification | `natural` NLP library | Claude's language understanding is far superior for content classification. `natural` adds a dependency, handles only English, and would provide worse results. STATE.md notes this was "unvalidated" as a concern. Decision: use Claude. |
| Manual mtime comparison | chokidar file watcher | File watching adds complexity and a runtime process. mtime comparison from scan-state.json is simpler and already works. |
| Custom synthesis template | Generic note creation | /synthesize notes are specialized -- they need frontmatter marking (synthesized: true) and citation structure. A dedicated creation path is cleaner than overloading /create. |

**Installation:**
```bash
# No new dependencies needed. Everything builds on v1.0 infrastructure.
# Optional: ensure embeddings are available for /synthesize semantic search
npm install   # already done -- @huggingface/transformers for semantic search
```

## Architecture Patterns

### Recommended Project Structure
```
.agents/skills/
├── briefing/
│   ├── SKILL.md              # /briefing interface definition
│   └── briefing-utils.cjs    # Data aggregation: recent changes, stale items, priorities
├── triage/
│   ├── SKILL.md              # /triage interface definition
│   └── triage-utils.cjs      # Inbox scanning, classification helpers, move execution
├── synthesize/
│   ├── SKILL.md              # /synthesize interface definition
│   └── synthesize-utils.cjs  # Topic note discovery, synthesis note creation
├── maintain/
│   ├── SKILL.md              # /maintain interface definition
│   └── maintain-utils.cjs    # Consistency checks, staleness detection, fix application
├── scan/                     # (existing -- Phase 2)
├── create/                   # (existing -- Phase 3)
├── connect/                  # (existing -- Phase 3)
├── daily/                    # (existing -- Phase 3)
├── health/                   # (existing -- Phase 3)
├── memory/                   # (existing -- Phase 4)
└── search/                   # (existing -- Phase 4)
```

### Pattern 1: Data Aggregation + Claude Reasoning
**What:** Utility modules gather and structure raw data; Claude's reasoning performs the intelligent analysis.
**When to use:** Every Phase 5 skill.
**Why:** Claude is better at classification, prioritization, and synthesis than any lightweight NLP library. The utility modules handle the mechanical parts (file scanning, mtime comparison, frontmatter parsing), while Claude handles the judgment calls (is this note a "tool" or a "resource"? which projects are truly neglected vs. intentionally paused?).

**Example: /briefing data flow:**
```javascript
// briefing-utils.cjs gathers raw data
const { loadJson } = require('../scan/utils.cjs');
const { getActiveProjects, parseInsights } = require('../memory/memory-utils.cjs');
const fs = require('fs');
const path = require('path');

/**
 * Gather all data needed for a daily briefing.
 * Claude uses this structured data to compose the actual briefing.
 */
function gatherBriefingData(vaultRoot) {
  const indexDir = path.join(vaultRoot, '.claude', 'indexes');
  const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));
  const scanState = loadJson(path.join(indexDir, 'scan-state.json'));

  // Recent changes: notes modified in last 24-48 hours
  const recentThreshold = Date.now() - (48 * 60 * 60 * 1000);
  const recentChanges = [];
  for (const [notePath, note] of Object.entries(vaultIndex.notes)) {
    if (note.mtime > recentThreshold && !note.isTemplate) {
      recentChanges.push({ path: notePath, name: note.name, mtime: note.mtime, type: note.type });
    }
  }
  recentChanges.sort((a, b) => b.mtime - a.mtime);

  // Active projects with priorities
  const projects = getActiveProjects(vaultRoot);

  // Neglected items: active projects not modified in 14+ days
  const neglectThreshold = Date.now() - (14 * 24 * 60 * 60 * 1000);
  const neglected = [];
  for (const [notePath, note] of Object.entries(vaultIndex.notes)) {
    const fm = note.frontmatter || {};
    if (fm.type === 'project' && fm.status === 'active' && note.mtime < neglectThreshold) {
      neglected.push({ path: notePath, name: note.name, lastModified: new Date(note.mtime).toISOString().slice(0, 10) });
    }
  }

  // Inbox count
  const inboxNotes = Object.entries(vaultIndex.notes)
    .filter(([p, n]) => p.startsWith('00 - Inbox/') && !n.isTemplate && n.name !== 'Inbox' && !p.includes('Daily Notes/'))
    .length;

  // Insights summary
  const insights = parseInsights(vaultRoot);

  // Working memory
  const memoryPath = path.join(vaultRoot, 'MEMORY.md');
  const memoryContent = fs.existsSync(memoryPath) ? fs.readFileSync(memoryPath, 'utf8') : '';

  return {
    recentChanges,
    projects,
    neglected,
    inboxCount: inboxNotes,
    insights,
    memoryContent,
    vaultStats: { totalNotes: vaultIndex.noteCount, lastScan: scanState?.lastScan },
  };
}
```

### Pattern 2: Confidence-Based Action Classification
**What:** Every triage/maintain action is assigned a confidence level that maps to a governance zone.
**When to use:** /triage and /maintain -- any skill that modifies vault content.

**Example: /triage governance mapping:**
```
HIGH confidence (>= 0.8) -> AUTO zone
  - Note has clear type indicators (e.g., "---\ntype: tool\n---" already in frontmatter)
  - Missing tags that match the type (add #tool to a tool note)
  - Missing created date (fill from file mtime)

MEDIUM confidence (0.5-0.8) -> PROPOSE zone
  - Note content strongly suggests a type but frontmatter is absent
  - Folder move recommendation (from Inbox to target folder)
  - Type reclassification

LOW confidence (< 0.5) -> PRESENT for review, no action
  - Ambiguous content that could be multiple types
  - Notes with minimal content (can't classify)
```

### Pattern 3: Synthesis Note as Distinct Type
**What:** /synthesize creates a new note with special frontmatter marking it as AI-generated synthesis.
**When to use:** /synthesize output notes.

**Example frontmatter:**
```yaml
---
type: zettel
created: 2026-03-07
tags:
  - synthesis
  - {topic-tag}
synthesized: true
synthesized_by: claude
source_notes:
  - "03 - Resources/Book -- Getting Things Done.md"
  - "03 - Resources/Zettel -- Personal Workflow.md"
status: active
---
```

### Anti-Patterns to Avoid
- **Over-automation:** Do NOT auto-move files. File moves are structural changes and MUST be proposed (PROPOSE zone). Only metadata fills and tag corrections are AUTO.
- **Information overload in briefings:** /briefing should produce a "calm executive summary" -- 10-20 lines max, not a comprehensive vault report. Prioritize actionable items over completeness.
- **Blind NLP classification:** Do NOT use keyword matching or regex to classify note types. Claude reads the actual note content and makes a judgment call. Utility code only gathers the notes; Claude classifies them.
- **Synthesizing without citations:** Every claim in a /synthesize output MUST reference at least one source note via `[[wiki-link]]`. Uncited synthesis is useless.
- **Silent structural changes:** NEVER move files, rename notes, or change note types without user approval. This is a NEVER zone violation.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Note type classification | Keyword/regex classifier | Claude's reasoning | Claude understands context, tone, and structure far better than pattern matching. A note titled "Docker" could be a tool, resource, project, or zettel depending on content. |
| Priority assessment | Rule-based priority engine | Claude's judgment | Priority depends on user context (from MEMORY.md), project deadlines, and relationship to other work. Rules can't capture this. |
| Content synthesis | Template-based summary | Claude's writing | Synthesis requires understanding, connecting ideas, and producing coherent text. Templates produce formulaic output. |
| Staleness detection algorithm | Complex decay formulas | Simple mtime threshold comparison | Staleness is just "active project not modified in N days." A simple date comparison is all that's needed. Don't over-engineer. |
| Frontmatter validation | Custom schema validator | Regex checks against known field values | The frontmatter format is simple flat YAML. A few regex checks against known valid values (type in known list, status in known list, tags is array) is sufficient. |

**Key insight:** Phase 5's intelligence comes from Claude's reasoning, not from code. The utility modules are data plumbing -- they gather, filter, and format data for Claude to analyze. Resist the urge to encode classification logic, priority rules, or synthesis templates in code.

## Common Pitfalls

### Pitfall 1: Briefing Information Overload
**What goes wrong:** The briefing dumps every recent change, every project status, every insight -- producing a wall of text that the user ignores.
**Why it happens:** Completeness bias. Developers feel every data point should be reported.
**How to avoid:** Cap the briefing at ~15-20 lines. Show top 5 recent changes, top 3 priorities, top 3 neglected items, 1-2 suggestions. Use "X more items" summaries for the rest.
**Warning signs:** Briefing output exceeds one screen. User never reads past the first section.

### Pitfall 2: Triage Overconfidence
**What goes wrong:** /triage auto-applies type classification to notes that are ambiguous, leading to incorrect metadata.
**Why it happens:** The confidence threshold is set too low, or signals are weighted incorrectly.
**How to avoid:** Be conservative with AUTO actions. Only auto-tag when the note already has partial frontmatter that clearly indicates type. When in doubt, PROPOSE. Better to ask the user than to silently misclassify.
**Warning signs:** User frequently corrects auto-applied metadata. Notes end up in wrong folders after triage.

### Pitfall 3: Synthesis Without Depth
**What goes wrong:** /synthesize produces a shallow summary that just lists note titles without connecting ideas.
**Why it happens:** The skill reads only titles and tags, not actual note content.
**How to avoid:** Read the full content of top-N related notes (e.g., top 10 by relevance). Extract key ideas, not just metadata. The synthesis should add value beyond what a Dataview query provides.
**Warning signs:** Synthesis note could have been generated from vault-index.json alone without reading any note content.

### Pitfall 4: Maintain Scope Creep
**What goes wrong:** /maintain tries to fix everything at once -- broken links, orphans, stale projects, tag inconsistencies, folder misplacements -- producing an overwhelming report.
**Why it happens:** All maintenance tasks feel equally important.
**How to avoid:** Structure the report in priority sections. Start with critical issues (broken links, missing frontmatter) then informational items (stale projects, review suggestions). Let the user choose which sections to act on.
**Warning signs:** /maintain report exceeds 50 items. User feels overwhelmed and doesn't act on any.

### Pitfall 5: Not Re-scanning After Modifications
**What goes wrong:** /triage or /maintain modifies frontmatter or moves files but forgets to call `scan()` afterward. Subsequent skill invocations see stale index data.
**Why it happens:** The re-scan step is easy to forget when multiple modifications happen in sequence.
**How to avoid:** Every skill that modifies vault files MUST call `scan('.')` as its final step. This is the established pattern from /create and /daily.
**Warning signs:** Running `/health` after `/triage` shows inconsistencies that /triage just fixed.

### Pitfall 6: Governance Zone Violations
**What goes wrong:** /triage moves files without asking (NEVER zone for silent structural changes). /maintain edits note body text to fix formatting (NEVER zone for content editing without request).
**Why it happens:** The skill implementation doesn't check governance classification before acting.
**How to avoid:** Include explicit governance zone checks in each SKILL.md's execution flow. Map every action to AUTO/PROPOSE/NEVER before executing. Include a "Pre-Action Governance Check" step in each skill's flow.
**Warning signs:** Changelog shows structural changes that weren't proposed. User discovers files have been moved or renamed without approval.

## Code Examples

### /briefing Data Gathering and Formatting

```javascript
// Source: Designed to match existing skill patterns from Phase 3-4

/**
 * Compute recent vault changes by comparing note mtimes against a threshold.
 * Returns notes modified within the lookback period, sorted newest first.
 */
function getRecentChanges(vaultIndex, lookbackMs) {
  const threshold = Date.now() - lookbackMs;
  const changes = [];

  for (const [notePath, note] of Object.entries(vaultIndex.notes || {})) {
    if (note.isTemplate) continue;
    if (notePath.startsWith('06 - Atlas/')) continue;
    if (notePath.startsWith('.claude/')) continue;

    if (note.mtime > threshold) {
      changes.push({
        path: notePath,
        name: note.name,
        type: (note.frontmatter && note.frontmatter.type) || note.type || 'unknown',
        folder: notePath.split('/')[0],
        mtime: note.mtime,
        age: Math.round((Date.now() - note.mtime) / (1000 * 60 * 60)), // hours ago
      });
    }
  }

  return changes.sort((a, b) => b.mtime - a.mtime);
}

/**
 * Find stale projects: type=project, status=active, mtime older than threshold.
 */
function getStaleProjects(vaultIndex, staleDays) {
  const threshold = Date.now() - (staleDays * 24 * 60 * 60 * 1000);
  const stale = [];

  for (const [notePath, note] of Object.entries(vaultIndex.notes || {})) {
    const fm = note.frontmatter || {};
    if (fm.type === 'project' && (fm.status === 'active' || fm.status === 'planned') && note.mtime < threshold) {
      stale.push({
        path: notePath,
        name: note.name,
        status: fm.status,
        priority: fm.priority || 'none',
        lastModified: new Date(note.mtime).toISOString().slice(0, 10),
        daysSinceModified: Math.round((Date.now() - note.mtime) / (1000 * 60 * 60 * 24)),
      });
    }
  }

  return stale.sort((a, b) => a.mtime - b.mtime); // oldest first
}
```

### /triage Inbox Scanning

```javascript
// Source: Designed to match existing skill patterns from Phase 3-4

/**
 * Collect inbox notes that need triage (excluding system notes and daily notes).
 * Returns array of objects with path, name, content, and existing frontmatter.
 */
function getInboxNotes(vaultRoot, vaultIndex) {
  const fs = require('fs');
  const path = require('path');
  const notes = [];

  for (const [notePath, note] of Object.entries(vaultIndex.notes || {})) {
    // Only notes in 00 - Inbox (but not daily notes or the Inbox.md itself)
    if (!notePath.startsWith('00 - Inbox/')) continue;
    if (notePath.includes('Daily Notes/')) continue;
    if (note.name === 'Inbox') continue;
    if (note.isTemplate) continue;

    // Read full content for Claude to classify
    const fullPath = path.join(vaultRoot, notePath);
    let content = '';
    try {
      content = fs.readFileSync(fullPath, 'utf8');
    } catch { continue; }

    notes.push({
      path: notePath,
      name: note.name,
      content,
      frontmatter: note.frontmatter || {},
      tags: note.allTags || [],
      headings: note.headings || [],
      links: note.links || [],
      hasType: !!(note.frontmatter && note.frontmatter.type),
      hasTags: (note.allTags || []).length > 0,
    });
  }

  return notes;
}

/**
 * Apply frontmatter corrections to a note file (AUTO zone).
 * Only modifies frontmatter block, never body text.
 */
function applyFrontmatterFix(vaultRoot, notePath, updates) {
  const fs = require('fs');
  const path = require('path');
  const fullPath = path.join(vaultRoot, notePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    // No frontmatter -- insert new frontmatter block at top
    const fmLines = ['---'];
    for (const [key, val] of Object.entries(updates)) {
      if (Array.isArray(val)) {
        fmLines.push(`${key}:`);
        for (const item of val) {
          fmLines.push(`  - ${item}`);
        }
      } else {
        fmLines.push(`${key}: ${val}`);
      }
    }
    fmLines.push('---', '');
    content = fmLines.join('\n') + content;
  } else {
    // Existing frontmatter -- update/add fields
    let fmContent = fmMatch[1];
    for (const [key, val] of Object.entries(updates)) {
      const keyRegex = new RegExp(`^${key}:\\s*.*$`, 'm');
      if (keyRegex.test(fmContent)) {
        if (Array.isArray(val)) {
          const replacement = `${key}:\n${val.map(v => `  - ${v}`).join('\n')}`;
          fmContent = fmContent.replace(keyRegex, replacement);
        } else {
          fmContent = fmContent.replace(keyRegex, `${key}: ${val}`);
        }
      } else {
        if (Array.isArray(val)) {
          fmContent += `\n${key}:\n${val.map(v => `  - ${v}`).join('\n')}`;
        } else {
          fmContent += `\n${key}: ${val}`;
        }
      }
    }
    content = content.replace(fmMatch[1], fmContent);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
}

/**
 * Move a note from one folder to another (PROPOSE zone -- only call after user approval).
 */
function moveNote(vaultRoot, sourcePath, targetFolder) {
  const fs = require('fs');
  const path = require('path');
  const sourceFullPath = path.join(vaultRoot, sourcePath);
  const fileName = path.basename(sourcePath);
  const targetFullPath = path.join(vaultRoot, targetFolder, fileName);

  // Ensure target folder exists
  const targetDir = path.join(vaultRoot, targetFolder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Check for collision
  if (fs.existsSync(targetFullPath)) {
    return { moved: false, reason: `File already exists at ${targetFolder}/${fileName}` };
  }

  fs.renameSync(sourceFullPath, targetFullPath);
  return { moved: true, from: sourcePath, to: `${targetFolder}/${fileName}` };
}
```

### /synthesize Topic Discovery and Note Creation

```javascript
// Source: Designed to match existing skill patterns from Phase 3-4

/**
 * Find notes related to a topic using both tag matching and semantic search.
 * Returns combined results sorted by relevance.
 */
async function findTopicNotes(vaultRoot, topic) {
  const { loadJson } = require('../scan/utils.cjs');
  const path = require('path');
  const indexDir = path.join(vaultRoot, '.claude', 'indexes');

  const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));
  const tagIndex = loadJson(path.join(indexDir, 'tag-index.json'));

  const results = new Map(); // notePath -> { path, name, relevance, source }

  // 1. Tag-based: find notes with matching tags
  const topicLower = topic.toLowerCase().replace(/\s+/g, '-');
  if (tagIndex && tagIndex.tags) {
    for (const [tag, paths] of Object.entries(tagIndex.tags)) {
      if (tag.toLowerCase().includes(topicLower) || topicLower.includes(tag.toLowerCase())) {
        for (const notePath of paths) {
          const note = vaultIndex.notes[notePath];
          if (!note || note.isTemplate) continue;
          if (notePath.startsWith('06 - Atlas/')) continue;
          results.set(notePath, {
            path: notePath,
            name: note.name,
            relevance: 0.7,
            source: 'tag',
          });
        }
      }
    }
  }

  // 2. Title-based: find notes with topic in name
  for (const [notePath, note] of Object.entries(vaultIndex.notes || {})) {
    if (note.isTemplate) continue;
    if ((note.name || '').toLowerCase().includes(topicLower)) {
      const existing = results.get(notePath);
      if (existing) {
        existing.relevance = Math.min(1.0, existing.relevance + 0.3);
      } else {
        results.set(notePath, {
          path: notePath,
          name: note.name,
          relevance: 0.6,
          source: 'title',
        });
      }
    }
  }

  // 3. Semantic search (if available)
  try {
    const { isEmbeddingAvailable, generateEmbedding, openDb, getAllEmbeddings } = require('../search/embedder.cjs');
    const { semanticSearch } = require('../search/search-utils.cjs');

    if (await isEmbeddingAvailable()) {
      const queryEmb = await generateEmbedding(topic, vaultRoot);
      const db = openDb(vaultRoot);
      const allEmb = getAllEmbeddings(db);
      db.close();
      const semanticResults = semanticSearch(queryEmb, allEmb);

      for (const sr of semanticResults) {
        const existing = results.get(sr.path);
        if (existing) {
          existing.relevance = Math.min(1.0, existing.relevance + sr.similarity * 0.5);
        } else {
          results.set(sr.path, {
            path: sr.path,
            name: sr.name || path.basename(sr.path, '.md'),
            relevance: sr.similarity,
            source: 'semantic',
          });
        }
      }
    }
  } catch {
    // Semantic search not available -- tag + title results are sufficient
  }

  return [...results.values()].sort((a, b) => b.relevance - a.relevance);
}

/**
 * Create a synthesis note with proper frontmatter and Connections section.
 */
function createSynthesisNote(vaultRoot, topic, content, sourceNotes) {
  const fs = require('fs');
  const path = require('path');
  const today = new Date().toISOString().slice(0, 10);

  const topicTag = topic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const fileName = `Zettel -- ${topic}.md`;
  const filePath = path.join(vaultRoot, '03 - Resources', fileName);

  const sourceList = sourceNotes.map(n => `  - "${n.path}"`).join('\n');
  const connectionLinks = sourceNotes.slice(0, 5).map(n => `- **Source:** [[${n.name}]]`).join('\n');

  const noteContent = [
    '---',
    'type: zettel',
    `created: ${today}`,
    `updated: ${today}`,
    'tags:',
    '  - synthesis',
    `  - ${topicTag}`,
    'synthesized: true',
    'synthesized_by: claude',
    'source_notes:',
    sourceList,
    'status: active',
    '---',
    '',
    `# Zettel -- ${topic}`,
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

  fs.writeFileSync(filePath, noteContent, 'utf8');
  return { path: `03 - Resources/${fileName}`, name: `Zettel -- ${topic}` };
}
```

### /maintain Consistency Checks

```javascript
// Source: Designed to match existing skill patterns from Phase 3-4

const VALID_TYPES = ['project', 'area', 'resource', 'tool', 'person', 'meeting',
  'decision', 'code-snippet', 'zettel', 'daily', 'review', 'moc', 'inbox', 'system'];
const VALID_STATUSES = ['active', 'planned', 'on-hold', 'completed', 'archived'];

// Expected folder for each type (from TEMPLATE_MAP)
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

/**
 * Run all consistency checks across the vault.
 * Returns categorized issues with severity and suggested fixes.
 */
function runConsistencyChecks(vaultIndex) {
  const issues = {
    critical: [],   // Missing type, broken structure
    warning: [],    // Type/folder mismatch, missing tags
    info: [],       // Suggestions, improvements
  };

  for (const [notePath, note] of Object.entries(vaultIndex.notes || {})) {
    if (note.isTemplate) continue;
    if (notePath.startsWith('06 - Atlas/')) continue;
    if (notePath.startsWith('.claude/')) continue;
    // Skip system notes
    if (['Home', 'START HERE', 'Workflow Guide', 'Tag Conventions', 'Inbox', 'README', 'CONTRIBUTING', 'LICENSE'].includes(note.name)) continue;

    const fm = note.frontmatter || {};
    const folder = notePath.split('/')[0];

    // Check 1: Missing type
    if (!fm.type) {
      issues.critical.push({
        type: 'missing-type',
        path: notePath,
        name: note.name,
        fix: 'Add type field to frontmatter',
        autoFixable: false, // Requires classification judgment
      });
    }

    // Check 2: Invalid type value
    if (fm.type && !VALID_TYPES.includes(fm.type)) {
      issues.warning.push({
        type: 'invalid-type',
        path: notePath,
        name: note.name,
        value: fm.type,
        fix: `Change type from "${fm.type}" to one of: ${VALID_TYPES.join(', ')}`,
        autoFixable: false,
      });
    }

    // Check 3: Missing created date
    if (!fm.created) {
      issues.warning.push({
        type: 'missing-created',
        path: notePath,
        name: note.name,
        fix: `Add created: ${new Date(note.mtime).toISOString().slice(0, 10)}`,
        autoFixable: true,
        autoFix: { created: new Date(note.mtime).toISOString().slice(0, 10) },
      });
    }

    // Check 4: Missing tags array
    if (!fm.tags && !Array.isArray(fm.tags)) {
      issues.warning.push({
        type: 'missing-tags',
        path: notePath,
        name: note.name,
        fix: 'Add tags: [] to frontmatter',
        autoFixable: true,
        autoFix: { tags: [] },
      });
    }

    // Check 5: Type/folder mismatch
    if (fm.type && TYPE_FOLDER_MAP[fm.type]) {
      const expectedFolder = TYPE_FOLDER_MAP[fm.type];
      if (!notePath.startsWith(expectedFolder)) {
        issues.info.push({
          type: 'folder-mismatch',
          path: notePath,
          name: note.name,
          expectedFolder,
          actualFolder: folder,
          fix: `Move to ${expectedFolder}/`,
          autoFixable: false, // Structural change = PROPOSE
        });
      }
    }

    // Check 6: Invalid status value
    if (fm.status && !VALID_STATUSES.includes(fm.status)) {
      issues.warning.push({
        type: 'invalid-status',
        path: notePath,
        name: note.name,
        value: fm.status,
        fix: `Change status from "${fm.status}" to one of: ${VALID_STATUSES.join(', ')}`,
        autoFixable: false,
      });
    }

    // Check 7: Tag casing (should be lowercase)
    const upperTags = (note.allTags || []).filter(t => t !== t.toLowerCase());
    if (upperTags.length > 0) {
      issues.warning.push({
        type: 'tag-casing',
        path: notePath,
        name: note.name,
        tags: upperTags,
        fix: `Lowercase tags: ${upperTags.map(t => `${t} -> ${t.toLowerCase()}`).join(', ')}`,
        autoFixable: true,
        autoFix: { tags: (note.allTags || []).map(t => t.toLowerCase()) },
      });
    }
  }

  return issues;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| NLP library for classification | LLM reasoning for classification | 2024-2025 | Claude's understanding is far superior to any lightweight NLP library. No need for `natural`, `compromise`, or similar packages. |
| Rule-based priority engines | Context-aware LLM judgment | 2024-2025 | Priority depends on user context and project relationships. Rules can't capture this nuance. |
| Template-based summarization | LLM synthesis with citations | 2024-2025 | Claude generates coherent, contextual summaries that connect ideas. Templates produce generic output. |
| File system watchers for change detection | Hash-based incremental scanning | v1.0 (Phase 2) | Already implemented. `scan-state.json` tracks per-file content hashes. mtime is fast pre-check. |

**Deprecated/outdated:**
- Using `natural` or `compromise.js` for text classification in a Claude-powered system is unnecessary overhead. Claude's built-in language understanding is the classification engine.
- Chokidar/file watchers add runtime complexity. The existing scan-on-demand approach with staleness checks is simpler and already proven.

## Open Questions

1. **Briefing frequency and scope**
   - What we know: /briefing is invoked by the user, not automatic. It should cover "recent changes, priorities, neglected items, suggestions."
   - What's unclear: What constitutes "recent"? 24 hours? Since last briefing? Since last session?
   - Recommendation: Default to 48-hour lookback for recent changes. If a "last briefing" timestamp is stored, use that instead. Store last briefing timestamp in `.claude/settings.local.json` for next-session awareness.

2. **Staleness threshold for projects**
   - What we know: PROA-08 says "configurable period" for stale project detection.
   - What's unclear: Where is the configuration stored? What's a reasonable default?
   - Recommendation: Default 30 days for staleness, stored in `.claude/settings.json` as `maintain.staleDays`. Configurable via /maintain --stale-days N argument.

3. **Synthesize note naming and placement**
   - What we know: Output is a new note marked as Claude-synthesized. Type should be zettel.
   - What's unclear: Should it go to `03 - Resources/` like other zettels, or to `00 - Inbox/` for review first?
   - Recommendation: Place directly in `03 - Resources/` with `Zettel -- {Topic}.md` naming. The `synthesized: true` frontmatter flag clearly marks it as AI-generated. Adding it to Inbox would defeat the purpose of proactive synthesis.

4. **Maintain report persistence**
   - What we know: /maintain generates a report of issues. User may want to reference it later.
   - What's unclear: Should the report be saved as a file, or only displayed in the conversation?
   - Recommendation: Display in conversation only. Do not create a report file -- it would itself become a maintenance burden. The issues are derived from live vault state and would become stale immediately.

## Governance Mapping for All Phase 5 Skills

This section maps every action in Phase 5 to its governance zone, ensuring compliance with PROA-09 (all proactive actions respect AUTO/PROPOSE/NEVER).

### /briefing
| Action | Zone | Rationale |
|--------|------|-----------|
| Read vault indexes | READ-ONLY | No modifications |
| Read MEMORY.md, insights.md | READ-ONLY | No modifications |
| Display formatted briefing | READ-ONLY | Output only |

### /triage
| Action | Zone | Rationale |
|--------|------|-----------|
| Read inbox notes | READ-ONLY | No modifications |
| Classify notes (display classification) | READ-ONLY | Output only |
| Fill missing frontmatter (type, created, tags) | AUTO | "Fill missing frontmatter fields" is AUTO per governance |
| Move note to target folder | PROPOSE | Structural change requires user approval |
| Rename note to match conventions | PROPOSE | File renaming requires user approval |
| Delete notes from inbox | NEVER | Never delete any file |
| Edit note body text | NEVER | Never change note body content without explicit request |

### /synthesize
| Action | Zone | Rationale |
|--------|------|-----------|
| Read source notes | READ-ONLY | No modifications |
| Search for related notes | READ-ONLY | No modifications |
| Create new synthesis note | AUTO | Creating new files is a form of content creation, logged to changelog |
| Add synthesis to MOC | AUTO | "Add note to existing MOC" is AUTO per governance |
| Modify source notes | NEVER | Never change note body content without explicit request |

### /maintain
| Action | Zone | Rationale |
|--------|------|-----------|
| Scan for inconsistencies | READ-ONLY | No modifications |
| Fix missing created date from mtime | AUTO | "Fill missing frontmatter fields" is AUTO |
| Fix tag casing (lowercase) | AUTO | Metadata normalization, no semantic change |
| Propose type reclassification | PROPOSE | Judgment call requires user approval |
| Propose folder moves | PROPOSE | Structural change requires user approval |
| Propose status changes for stale projects | PROPOSE | Status change is a judgment call |
| Report review queue | READ-ONLY | Information only, no action |

## Sources

### Primary (HIGH confidence)
- **Existing codebase**: Full read of all 7 skill directories (.agents/skills/*), all utility modules (*.cjs), SKILL.md files, and supporting infrastructure
- **Vault structure**: Direct inspection of vault-index.json data format, link-map.json, tag-index.json, scan-state.json
- **Governance rules**: `.claude/rules/governance.md` -- AUTO/PROPOSE/NEVER classification
- **CLAUDE.md**: Complete project instructions, vault structure, memory architecture, template conventions
- **v1.0 REQUIREMENTS.md**: Full PROA-01 through PROA-09 requirement definitions with traceability

### Secondary (MEDIUM confidence)
- **Previous phase research** (`.planning/milestones/v1.0-phases/03-core-skills-working-memory/03-RESEARCH.md`): Established pattern for skill research and implementation
- **STATE.md**: Note that `natural` NLP library fitness was "unvalidated" with fallback to "use Claude reasoning" -- validates the recommendation to skip NLP libraries

### Tertiary (LOW confidence)
- None. All findings are based on direct codebase inspection and established patterns.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries are existing v1.0 infrastructure. No new dependencies.
- Architecture: HIGH -- Direct continuation of established skill pattern (SKILL.md + utils.cjs). Four new directories following the same structure as seven existing ones.
- Pitfalls: HIGH -- Identified from direct analysis of governance rules, existing code patterns, and project design philosophy ("calm intelligence", "propose don't override").
- Code examples: HIGH -- Based on direct reading of existing utility modules and matching their patterns exactly.

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (stable codebase, no external dependency changes expected)
