# Phase 3: Core Skills & Working Memory - Research

**Researched:** 2026-03-07
**Domain:** Claude Code skill authoring, Obsidian note creation, template variable substitution, graph-based connection discovery, working memory architecture
**Confidence:** HIGH

## Summary

Phase 3 builds four user-facing Claude Code skills (/create, /daily, /connect, /health) and a persistent working memory system. All four skills consume the JSON indexes produced by Phase 2's /scan infrastructure. The skills are "Claude-interpreted" -- they are markdown instruction files (SKILL.md) with supporting Node.js utility modules (.cjs) that Claude reads and executes at invocation time. There is no CLI binary or framework; Claude IS the runtime.

The key architectural insight is that these skills operate in a pipeline: (1) ensure indexes are fresh (call scan() if stale), (2) read index data to make decisions, (3) perform file operations (create/modify vault .md files), (4) re-scan to update indexes after changes. The templates already exist in `05 - Templates/` with well-defined frontmatter and `{{variable}}` placeholders. The vault-index.json, link-map.json, and tag-index.json provide all the data needed for connection discovery and health checks without re-parsing files.

Working memory is a separate concern: MEMORY.md at vault root plus topic files in `.claude/memory/` give Claude persistent context across sessions. This is a convention-based system -- Claude reads these files at session start and writes to them after significant actions. No external services or databases are needed.

**Primary recommendation:** Build each skill as a directory under `.agents/skills/` following the /scan pattern: SKILL.md (interface definition Claude reads) plus .cjs utility modules for operations that benefit from code (template variable substitution, date arithmetic, connection scoring, health analysis). Keep utility modules minimal -- Claude's reasoning handles the complex decisions (template selection, wiki-link suggestion ranking, memory summarization).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Hybrid invocation: natural language when intent is clear ("create a tool note about Docker"), guided prompts when ambiguous (/create without clear context)
- Show-and-proceed transparency: Claude announces template selection and target folder, then creates without waiting for confirmation
- 3-5 wiki-link suggestions per new note, ranked by relevance
- Auto-add new notes to relevant MOCs (governance AUTO zone) -- Claude mentions it in output but doesn't ask
- Only unchecked checkboxes (`- [ ]`) count as open items for rollover
- Rolled-over items appear under a `## Rolled Over` heading with source links: `- [ ] Task text (from [[2026-03-06]])`
- Scan back up to 7 days for missed daily notes -- picks up items even if user skipped days
- If today's daily note already exists, open it and merge any new rolled-over items non-destructively
- Ranked list with evidence: each connection suggestion shows note name, why it's related (shared tags, existing links), and confidence indicator -- top suggestions first
- User picks which suggestions to add -- Claude presents list, user selects, Claude inserts into ## Connections section
- Summary stats at top for /health (e.g., "3 orphans, 2 broken links"), then actionable list with suggested fixes for each item
- Auto-fix broken links when correct target is obvious (single clear match, e.g., typo) -- follows AUTO zone governance
- Propose fixes when ambiguous (multiple candidates) -- user approves
- Silent background load on startup: Claude reads MEMORY.md and vault index, knows context but doesn't announce it
- MEMORY.md = concise summary (active projects, priorities, preferences), with links to topic files in .claude/memory/ for detailed per-area context
- Memory writes triggered by significant actions: project status changes, new projects, user preferences, confirmed patterns -- not after every note edit
- Phase 3 implements layers 1-2 fully (session memory + working memory). Layers 3-4 (long-term summary, project-specific) documented as stubs for Phase 4

### Claude's Discretion
- Exact template matching algorithm when intent is ambiguous
- Wiki-link suggestion ranking algorithm details
- Health report formatting and severity ordering
- Memory topic file organization structure
- Rollover section placement within daily note template

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NOTE-01 | /create skill selects appropriate template based on user intent | Template matching via keyword extraction from user input. 12 templates with distinct `type` values. SKILL.md documents the mapping. Claude's NLU handles ambiguity; fallback: ask user to clarify. |
| NOTE-02 | /create fills frontmatter, substitutes template variables, and suggests wiki-links to existing notes | Template variables (`{{date}}`, `{{title}}`, `{{time}}`, `{{yesterday}}`, `{{tomorrow}}`) replaced via string substitution. Wiki-link suggestions from vault-index tag overlap + link-map adjacency. |
| NOTE-03 | /create places new note in correct folder per template conventions | Template-to-folder mapping defined in CLAUDE.md quick reference table. 12 templates map to 4 target folders. SKILL.md encodes this mapping. |
| NOTE-04 | /daily skill creates today's daily note with template and rolls over open items from previous day | Daily Note template in `05 - Templates/`. Date arithmetic for yesterday/tomorrow links. Regex `- \[ \]` extraction from previous 7 days of daily notes. Rollover section with provenance links. |
| CONN-01 | /connect discovers connections from shared tags and explicit wiki-links (Level 1) | tag-index.json provides tag overlap scoring. link-map.json provides existing link graph. Combine for ranked suggestions. |
| CONN-02 | /connect suggests new wiki-links with evidence explaining why notes are related | Evidence generation: "shares tags: #tool, #productivity" or "linked from [[Projects MOC]]". Confidence based on overlap count. |
| CONN-03 | /health detects orphan notes (0-1 connections) and suggests links | Computed from link-map.json: count inbound + outbound links per note. Notes with 0-1 total connections are orphans. Suggest links from tag overlap. |
| CONN-04 | /health detects broken wiki-links and suggests fixes | link-map.json `resolved: false` entries. Fuzzy match target against known note names for fix suggestions. Levenshtein or substring matching for typo detection. |
| MEM-01 | Working memory persists across sessions via MEMORY.md + topic files in .claude/memory/ | MEMORY.md at vault root. Topic files in `.claude/memory/` for per-area detail. Claude reads on session start, writes after significant actions. |
| MEM-02 | Session start loads vault awareness (active projects, recent changes, priorities) | MEMORY.md contains structured summary. vault-index.json provides current state. Claude reads both silently on startup. |
| MEM-03 | Four-layer memory architecture implemented (session, working, long-term summary, project-specific) | Layers 1-2 fully implemented. Layers 3-4 as documented stubs with clear extension points for Phase 4. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js built-in `fs` | v25.6.1 | File I/O for note creation, template reading, daily note scanning | Consistent with Phase 2. Zero dependencies. |
| Node.js built-in `path` | v25.6.1 | Path construction for target folders, template paths | Cross-platform path handling. |
| Phase 2 scanner (`scanner.cjs`) | 1.0.0 | Pre-skill index freshness check via `scan()` | All skills call scan() before operating if indexes are stale. |
| Phase 2 indexes (`vault-index.json`, `link-map.json`, `tag-index.json`) | v1 | Data source for connection discovery, health analysis, wiki-link suggestions | Already built and tested. No new parsing needed. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Phase 2 `utils.cjs` | 1.0.0 | `loadJson`, `writeJsonAtomic`, `normalizePath` | Loading indexes, writing new note files |
| Phase 2 `parser.cjs` | 1.0.0 | `extractFrontmatter`, `extractWikiLinks` | Parsing daily notes for rollover item extraction |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-rolled template substitution | Mustache/Handlebars | Templates use only 5 simple variables (`{{date}}`, `{{title}}`, `{{time}}`, `{{yesterday}}`, `{{tomorrow}}`). String.replace() is sufficient. Template engines add complexity and dependencies for no benefit. |
| Manual date arithmetic | date-fns / dayjs | Only need add/subtract days and format YYYY-MM-DD. Node.js `Date` handles this. |
| Levenshtein distance for typo detection | fast-levenshtein npm | Only needed for /health broken link suggestions. Simple character-by-character comparison (~15 lines) is sufficient for short note names. |

**Installation:**
```bash
# No npm install needed -- zero external dependencies
# All functionality reuses Phase 2 modules + Node.js built-ins
```

## Architecture Patterns

### Recommended Project Structure
```
.agents/skills/
├── scan/                    # Phase 2 (existing)
│   ├── SKILL.md
│   ├── scanner.cjs
│   ├── parser.cjs
│   ├── indexer.cjs
│   └── utils.cjs
├── create/                  # Phase 3: Note creation
│   ├── SKILL.md             # /create interface definition
│   └── create-utils.cjs     # Template substitution, folder mapping
├── daily/                   # Phase 3: Daily notes
│   ├── SKILL.md             # /daily interface definition
│   └── daily-utils.cjs      # Date arithmetic, rollover extraction
├── connect/                 # Phase 3: Connection discovery
│   ├── SKILL.md             # /connect interface definition
│   └── connect-utils.cjs    # Tag overlap scoring, evidence generation
└── health/                  # Phase 3: Vault health
    ├── SKILL.md             # /health interface definition
    └── health-utils.cjs     # Orphan detection, broken link analysis, fuzzy matching

.claude/
├── memory/                  # Phase 3: Working memory topic files
│   └── (topic files created as needed)
├── indexes/                 # Phase 2 (existing)
│   ├── vault-index.json
│   ├── link-map.json
│   ├── tag-index.json
│   └── scan-state.json
├── changelog.md
├── rules/
└── settings.json

MEMORY.md                    # Phase 3: Working memory summary (vault root)
```

### Pattern 1: Skill Structure (SKILL.md + Utils Module)
**What:** Each skill is a directory containing a SKILL.md (Claude-readable interface definition) and optional .cjs utility modules for operations that benefit from deterministic code.
**When to use:** Every new skill.
**Why:** Claude reads SKILL.md to understand how to execute the skill. The .cjs module handles deterministic operations (date math, string substitution, scoring algorithms) that should not vary between invocations. Claude handles the judgment calls (template selection, relevance ranking, memory summarization).

```markdown
# SKILL.md pattern
---
name: create
trigger: /create
description: Create a new note from template with filled frontmatter and wiki-link suggestions
version: 1.0.0
---

# /create -- Note Creator

[Human-readable description of what the skill does]

## Usage
[Invocation patterns]

## Execution
[JavaScript code Claude runs, referencing the utils module]

## Template Mapping
[Data tables Claude uses for decision-making]
```

### Pattern 2: Pre-Skill Index Freshness Check
**What:** Every skill calls scan() at the start if indexes are stale (older than 5 minutes). This ensures skills always operate on current data.
**When to use:** Every skill execution entry point.
**Example:**
```javascript
// At the start of any skill execution
const { scan } = require('./.agents/skills/scan/scanner.cjs');
const { loadJson } = require('./.agents/skills/scan/utils.cjs');
const scanState = loadJson('.claude/indexes/scan-state.json');
const STALE_MS = 5 * 60 * 1000; // 5 minutes
if (!scanState || (Date.now() - scanState.lastScan > STALE_MS)) {
  scan('.'); // Refresh indexes
}
```

### Pattern 3: Template Variable Substitution
**What:** Read template file, replace all `{{variable}}` placeholders with actual values, write to target folder.
**When to use:** /create and /daily skills.
**Example:**
```javascript
// create-utils.cjs
function substituteVariables(templateContent, vars) {
  let content = templateContent;
  content = content.replace(/\{\{date\}\}/g, vars.date);           // YYYY-MM-DD
  content = content.replace(/\{\{title\}\}/g, vars.title);         // Note name
  content = content.replace(/\{\{time\}\}/g, vars.time);           // HH:mm
  content = content.replace(/\{\{yesterday\}\}/g, vars.yesterday); // YYYY-MM-DD
  content = content.replace(/\{\{tomorrow\}\}/g, vars.tomorrow);   // YYYY-MM-DD
  return content;
}

function getDateVars(dateStr) {
  // dateStr: 'YYYY-MM-DD'
  const d = new Date(dateStr + 'T12:00:00'); // noon to avoid timezone issues
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

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}
```

### Pattern 4: Connection Scoring via Tag Overlap + Link Adjacency
**What:** Score potential connections between notes using shared tags (from tag-index.json) and link-graph adjacency (from link-map.json). Produce ranked suggestions with evidence.
**When to use:** /connect skill.
**Example:**
```javascript
// connect-utils.cjs
function findConnections(targetPath, vaultIndex, linkMap, tagIndex) {
  const targetNote = vaultIndex.notes[targetPath];
  if (!targetNote) return [];

  const targetTags = new Set(targetNote.allTags || []);
  const scores = {}; // notePath -> { score, evidence[] }

  // Score by shared tags
  for (const tag of targetTags) {
    const notesWithTag = tagIndex.tags[tag] || [];
    for (const notePath of notesWithTag) {
      if (notePath === targetPath) continue;
      if (vaultIndex.notes[notePath]?.isTemplate) continue;
      if (!scores[notePath]) scores[notePath] = { score: 0, evidence: [] };
      scores[notePath].score += 1;
      scores[notePath].evidence.push('shared tag: #' + tag);
    }
  }

  // Score by link adjacency (notes that link to or are linked from shared targets)
  const targetLinks = new Set(
    (targetNote.links || []).map(l => l.target.toLowerCase())
  );
  for (const link of linkMap.links) {
    const sourceLower = (vaultIndex.notes[link.source]?.name || '').toLowerCase();
    const targetLower = (link.target || '').toLowerCase();
    // If another note links to the same target as our note
    if (link.source !== targetPath && targetLinks.has(targetLower)) {
      if (!scores[link.source]) scores[link.source] = { score: 0, evidence: [] };
      scores[link.source].score += 0.5;
      scores[link.source].evidence.push('both link to [[' + link.target + ']]');
    }
  }

  // Sort by score descending, return top results
  return Object.entries(scores)
    .filter(([p, s]) => s.score > 0)
    .sort((a, b) => b[1].score - a[1].score)
    .map(([notePath, data]) => ({
      path: notePath,
      name: vaultIndex.notes[notePath]?.name || notePath,
      score: data.score,
      evidence: [...new Set(data.evidence)], // deduplicate
    }));
}
```

### Pattern 5: Daily Note Rollover Extraction
**What:** Scan previous daily notes (up to 7 days back) for unchecked checkboxes. Extract task text and source date. Format with provenance links.
**When to use:** /daily skill.
**Example:**
```javascript
// daily-utils.cjs
function extractOpenItems(vaultRoot, today) {
  const items = [];
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today + 'T12:00:00');
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const filePath = path.join(vaultRoot, '00 - Inbox', 'Daily Notes', dateStr + '.md');

    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (const line of lines) {
      const match = line.match(/^[-*]\s+\[ \]\s+(.+)$/);
      if (match) {
        const taskText = match[1].trim();
        // Skip items that are already rollover entries (contain "(from [[")
        if (taskText.includes('(from [[')) continue;
        items.push({
          text: taskText,
          source: dateStr,
          formatted: '- [ ] ' + taskText + ' (from [[' + dateStr + ']])',
        });
      }
    }
  }
  return items;
}
```

### Pattern 6: Orphan Detection and Health Analysis
**What:** Compute connection counts per note from link-map. Identify orphans (0-1 connections) and broken links (unresolved targets). Generate fix suggestions using fuzzy matching.
**When to use:** /health skill.
**Example:**
```javascript
// health-utils.cjs
function analyzeHealth(vaultIndex, linkMap) {
  const connectionCounts = {}; // notePath -> count

  // Count outbound + inbound links per note
  for (const link of linkMap.links) {
    if (!link.resolved) continue;
    connectionCounts[link.source] = (connectionCounts[link.source] || 0) + 1;
    if (link.targetPath) {
      connectionCounts[link.targetPath] = (connectionCounts[link.targetPath] || 0) + 1;
    }
  }

  // Find orphans (0-1 connections, excluding templates, system files, MOCs)
  const orphans = [];
  for (const [notePath, noteData] of Object.entries(vaultIndex.notes)) {
    if (noteData.isTemplate) continue;
    if (noteData.type === 'moc' || noteData.type === 'home' || noteData.type === 'system') continue;
    const count = connectionCounts[notePath] || 0;
    if (count <= 1) {
      orphans.push({ path: notePath, name: noteData.name, connections: count });
    }
  }

  // Find broken links
  const brokenLinks = linkMap.links
    .filter(l => !l.resolved)
    .filter(l => !vaultIndex.notes[l.source]?.isTemplate) // Skip template placeholder links
    .map(l => ({
      source: l.source,
      target: l.target,
      suggestions: suggestFixes(l.target, Object.values(vaultIndex.notes).map(n => n.name)),
    }));

  return { orphans, brokenLinks };
}

function suggestFixes(brokenTarget, knownNames) {
  // Simple substring + case-insensitive matching
  const lower = brokenTarget.toLowerCase();
  return knownNames
    .filter(name => {
      const nameLower = name.toLowerCase();
      return nameLower.includes(lower) || lower.includes(nameLower) || levenshtein(lower, nameLower) <= 2;
    })
    .slice(0, 3);
}

function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = b[i-1] === a[j-1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i-1][j] + 1,
        matrix[i][j-1] + 1,
        matrix[i-1][j-1] + cost
      );
    }
  }
  return matrix[b.length][a.length];
}
```

### Pattern 7: Memory Architecture (MEMORY.md + Topic Files)
**What:** MEMORY.md at vault root contains a concise structured summary. Topic files in `.claude/memory/` contain per-area detailed context. Claude reads silently on startup, writes after significant events.
**When to use:** Session start (read) and after significant actions (write).
**Example MEMORY.md structure:**
```markdown
---
updated: 2026-03-07
---

# Working Memory

## Active Projects
- [[Website Relaunch]] -- status: active, priority: high, next: finalize design mockups
- [[Learning Rust]] -- status: active, priority: medium, next: complete chapter 5

## Current Priorities
1. Complete Website Relaunch design phase
2. Weekly review due Friday

## Recent Changes
- Created Tool -- Docker note (2026-03-06)
- Updated Website Relaunch status to active (2026-03-05)

## User Preferences
- Prefers concise daily notes
- Uses #productivity tag for workflow-related content

## Topic Files
- [[.claude/memory/projects.md]] -- detailed project context
- [[.claude/memory/preferences.md]] -- user patterns and preferences
```

### Anti-Patterns to Avoid
- **Over-engineering utility modules:** Claude is the runtime. Don't build a full template engine or NLP system in .cjs. Keep utilities to deterministic operations (string replacement, date math, scoring). Let Claude handle judgment calls.
- **Hardcoding template content in code:** Templates live in `05 - Templates/`. Read them at runtime. Never duplicate template content in .cjs files.
- **Blocking on stale indexes:** If scan fails, skills should degrade gracefully (use whatever index data exists) rather than refuse to run.
- **Writing to vault files without re-scanning:** After creating or modifying any vault .md file, always call scan() to keep indexes current. Other skills may run immediately after.
- **Verbose memory writes:** MEMORY.md should be concise (under 50 lines). Detailed context goes in topic files. Don't dump full note contents into memory.
- **Announcing memory loads:** User decision: silent background load. Claude should not say "I loaded your memory" at session start.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Template engine | Custom Mustache/Handlebars parser | String.replace() for 5 known variables | Only 5 variables exist (`{{date}}`, `{{title}}`, `{{time}}`, `{{yesterday}}`, `{{tomorrow}}`). No conditionals, loops, or partials needed. |
| Full NLP for intent detection | Keyword classifier for template selection | Claude's built-in NLU | Claude understands "create a tool note about Docker" natively. No ML model needed. SKILL.md documents the mapping for Claude's reference. |
| Full-text search | Custom inverted index for body text | Phase 4 scope | Phase 3 uses tag overlap and link adjacency only. Body text search deferred to Phase 4 semantic search. |
| Session persistence framework | Custom state management system | MEMORY.md + topic files (plain markdown) | Markdown files readable by Claude with zero infrastructure. No database, no serialization framework needed. |
| Complex fuzzy matching library | Levenshtein implementation with phonetic matching | Simple Levenshtein (~15 lines) + substring match | Only used for broken link fix suggestions. Note names are short and unique enough for basic matching. |

**Key insight:** Claude is the runtime. The skill system is "Claude-interpreted markdown + lightweight utility code." Don't build a framework -- build documents that Claude reads and utilities that handle math.

## Common Pitfalls

### Pitfall 1: Template Variable Collision in Regex
**What goes wrong:** `{{date}}` appears in frontmatter AND body. Naive `replace(/\{\{date\}\}/g, ...)` replaces ALL occurrences including those inside Dataview queries or code blocks where `{{date}}` should be preserved.
**Why it happens:** Templates use `{{date}}` as a universal placeholder with no scoping.
**How to avoid:** Replace ALL `{{date}}` occurrences globally -- this is correct behavior for this vault. All `{{date}}` in templates are intended to be substituted. The templates don't contain Dataview `{{date}}` references (verified: Monthly Review uses `{{date:MMMM YYYY}}` and `{{date:YYYY-MM-DD}}` variants).
**Warning signs:** Date placeholders remaining in created notes, or Dataview queries breaking.

### Pitfall 2: Daily Note Date Format Edge Cases
**What goes wrong:** Date arithmetic crosses month/year boundaries incorrectly. January 1st's "yesterday" should be December 31st of the previous year.
**Why it happens:** Manual date math with string manipulation instead of proper Date objects.
**How to avoid:** Always use JavaScript `Date` objects for arithmetic, then format to YYYY-MM-DD string. Use noon (T12:00:00) to avoid timezone-induced date shifts.
**Warning signs:** Daily note for Jan 1 links to wrong "yesterday" date.

### Pitfall 3: Daily Note Template Special Variables
**What goes wrong:** The Daily Note template uses `{{yesterday}}` and `{{tomorrow}}` which are NOT standard Obsidian template variables -- they are custom to this vault. Missing substitution leaves broken wiki-links.
**Why it happens:** Assuming only `{{date}}`, `{{title}}`, `{{time}}` need substitution.
**How to avoid:** The substitution function must handle all 5 variables: `{{date}}`, `{{title}}`, `{{time}}`, `{{yesterday}}`, `{{tomorrow}}`. Additionally, the Monthly Review template uses `{{date:MMMM YYYY}}` and `{{date:YYYY-MM-DD}}` format variants -- handle these too.
**Warning signs:** `[[{{yesterday}}]]` and `[[{{tomorrow}}]]` appearing as broken links in daily notes.

### Pitfall 4: Rollover Deduplication
**What goes wrong:** If the user invokes /daily twice on the same day, rolled-over items get duplicated.
**Why it happens:** Second invocation scans previous days again and finds the same open items.
**How to avoid:** When today's daily note already exists, check its content for existing rollover items before adding new ones. Match by task text (ignoring the `(from [[date]])` suffix). Only add genuinely new items. The user decision specifies "merge any new rolled-over items non-destructively."
**Warning signs:** Same task appearing multiple times in the Rolled Over section.

### Pitfall 5: Connection Suggestions Including Templates
**What goes wrong:** /connect suggests linking to template files (e.g., "Tool.md" matches tag #tool).
**Why it happens:** Templates are in vault-index with `isTemplate: true` but the connection algorithm doesn't filter them.
**How to avoid:** Always filter out `isTemplate: true` entries from connection candidates. Also filter MOC entries and system files -- they are navigation, not content notes.
**Warning signs:** "Connect to [[Tool]]" appearing as a suggestion (the template, not a tool note).

### Pitfall 6: Memory File Size Creep
**What goes wrong:** MEMORY.md grows unbounded as Claude appends project updates, eventually exceeding useful context size.
**Why it happens:** Writing to memory without pruning outdated entries.
**How to avoid:** MEMORY.md should be rewritten (not appended) on each significant update. Keep it under 50 lines. Move detailed context to topic files in `.claude/memory/`. Archive old entries rather than accumulating them.
**Warning signs:** MEMORY.md exceeding 100 lines, containing stale project references.

### Pitfall 7: MOC Auto-Update Without Checking MOC Format
**What goes wrong:** Claude adds a wiki-link to a MOC that uses Dataview queries for listing, creating a duplicate entry (one from Dataview, one static link).
**Why it happens:** MOCs in this vault use Dataview queries (`FROM #tool`) to auto-list notes. Adding a static `[[Tool -- Docker]]` link creates redundancy.
**How to avoid:** Check if the relevant MOC section uses Dataview queries. If so, the note will appear automatically once it has the correct frontmatter type/tags -- no manual link insertion needed. Only add to MOCs that have static link lists.
**Warning signs:** Duplicate entries in MOC views in Obsidian.

## Code Examples

Verified patterns from existing vault infrastructure:

### Template-to-Folder Mapping
```javascript
// create-utils.cjs
// From CLAUDE.md Quick Reference table -- authoritative source
const TEMPLATE_MAP = {
  'project':      { template: 'Project.md',       folder: '01 - Projects',   prefix: '' },
  'area':         { template: 'Area.md',           folder: '02 - Areas',      prefix: '' },
  'resource':     { template: 'Resource.md',       folder: '03 - Resources',  prefix: '' },
  'tool':         { template: 'Tool.md',           folder: '03 - Resources',  prefix: 'Tool -- ' },
  'zettel':       { template: 'Zettel.md',         folder: '03 - Resources',  prefix: 'Zettel -- ' },
  'person':       { template: 'Person.md',         folder: '03 - Resources',  prefix: 'Person -- ' },
  'decision':     { template: 'Decision.md',       folder: '01 - Projects',   prefix: 'Decision -- ' },
  'meeting':      { template: 'Meeting.md',        folder: '01 - Projects',   prefix: 'Meeting -- ' },
  'code-snippet': { template: 'Code Snippet.md',   folder: '03 - Resources',  prefix: 'Snippet -- ' },
  'daily':        { template: 'Daily Note.md',     folder: '00 - Inbox/Daily Notes', prefix: '' },
  'weekly':       { template: 'Weekly Review.md',  folder: '00 - Inbox',      prefix: '' },
  'monthly':      { template: 'Monthly Review.md', folder: '00 - Inbox',      prefix: '' },
};

function getTemplateInfo(type) {
  return TEMPLATE_MAP[type] || null;
}

function buildFileName(type, title, date) {
  const info = TEMPLATE_MAP[type];
  if (!info) return null;

  if (type === 'daily') return date + '.md';
  if (type === 'meeting') return 'Meeting -- ' + title + ' ' + date + '.md';

  const prefix = info.prefix || '';
  return prefix + title + '.md';
}
```

### Index Freshness Check
```javascript
// Shared utility for all skills
function ensureFreshIndexes(vaultRoot) {
  const { loadJson } = require('./.agents/skills/scan/utils.cjs');
  const path = require('path');
  const indexDir = path.join(vaultRoot, '.claude', 'indexes');
  const scanState = loadJson(path.join(indexDir, 'scan-state.json'));
  const STALE_MS = 5 * 60 * 1000;

  if (!scanState || (Date.now() - scanState.lastScan > STALE_MS)) {
    const { scan } = require('./.agents/skills/scan/scanner.cjs');
    return scan(vaultRoot);
  }
  return null; // Indexes are fresh
}
```

### MOC Detection (Dataview vs Static)
```javascript
// Check if a MOC uses Dataview queries for its listings
function mocUsesDataview(vaultRoot, mocPath) {
  const fs = require('fs');
  const path = require('path');
  const content = fs.readFileSync(path.join(vaultRoot, mocPath), 'utf8');
  // MOCs with ```dataview blocks auto-list notes -- no manual link needed
  return content.includes('```dataview');
}
```

### Wiki-Link Suggestion Ranking
```javascript
// Rank wiki-link suggestions for a newly created note
function suggestWikiLinks(noteType, noteTags, vaultIndex, tagIndex, limit) {
  limit = limit || 5; // User decision: 3-5 suggestions
  const candidates = {};

  // Score by shared tags
  for (const tag of noteTags) {
    const notesWithTag = tagIndex.tags[tag] || [];
    for (const notePath of notesWithTag) {
      const note = vaultIndex.notes[notePath];
      if (!note || note.isTemplate) continue;
      if (note.type === 'moc' || note.type === 'home') continue;
      if (!candidates[notePath]) candidates[notePath] = { score: 0, reasons: [] };
      candidates[notePath].score += 1;
      candidates[notePath].reasons.push('shared tag #' + tag);
    }
  }

  // Boost MOCs that match the note type (link to the navigation hub)
  const mocMap = { tool: 'Tools MOC', project: 'Projects MOC', resource: 'Resources MOC',
                   person: 'People MOC', meeting: 'Meetings MOC', decision: 'Decisions MOC',
                   'code-snippet': 'Code MOC', area: 'Areas MOC' };
  const relevantMoc = mocMap[noteType];
  if (relevantMoc) {
    for (const [p, n] of Object.entries(vaultIndex.notes)) {
      if (n.name === relevantMoc) {
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
      name: vaultIndex.notes[p]?.name || p,
      score: data.score,
      reasons: [...new Set(data.reasons)],
    }));
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom plugin frameworks for vault skills | Claude-interpreted SKILL.md + .cjs utilities | Claude Code 2024+ | No framework overhead; Claude IS the runtime. Skills are documents, not applications. |
| Database-backed memory systems | Plain markdown files (MEMORY.md) | N/A (design decision) | Zero infrastructure. Claude reads markdown natively. Editable by user in Obsidian. |
| Template engines (Mustache, EJS) for note creation | String.replace() for known variable set | N/A (design decision) | 5 variables don't justify a template engine dependency. |
| Graph databases for connection discovery | JSON index files + scoring algorithm | N/A (design decision) | Vault is small (<100 notes). In-memory JSON processing is instant. |

**Deprecated/outdated:**
- Complex skill registries with dependency injection: Not needed. Claude reads SKILL.md files directly.
- External memory services (vector DBs, Redis): Overkill for single-user vault. Plain markdown is sufficient through Phase 3. Phase 4 may introduce embeddings if needed.

## Open Questions

1. **Monthly Review template format variants**
   - What we know: The Monthly Review template uses `{{date:MMMM YYYY}}` and `{{date:YYYY-MM-DD}}` -- these are Obsidian Templater format variants, not the simple `{{date}}` used elsewhere.
   - What's unclear: Should the /create skill handle these Templater-style format variants, or should it only handle the simple `{{date}}` pattern?
   - Recommendation: **Handle the format variants.** Parse `{{date:FORMAT}}` and apply the format. `MMMM YYYY` = "March 2026", `YYYY-MM-DD` = "2026-03-07", `ww` = ISO week number. This is ~10 lines of code and avoids broken template output.

2. **Weekly Review template week number**
   - What we know: The Weekly Review template uses `{{date:ww}}` for ISO week number.
   - What's unclear: JavaScript Date doesn't have built-in ISO week number. Need ~10 lines of code for the ISO week calculation.
   - Recommendation: **Implement ISO week calculation.** It is a well-known algorithm. Don't add a library for one function.

3. **MEMORY.md placement**
   - What we know: CLAUDE.md references "MEMORY.md" without specifying path. It logically belongs at vault root (alongside CLAUDE.md) or inside `.claude/`.
   - What's unclear: Whether Obsidian users will be confused by a MEMORY.md file in their vault root.
   - Recommendation: **Place at vault root** -- consistent with CLAUDE.md placement. Add to .gitignore if the user prefers it hidden. Claude reads vault root files automatically. Users can inspect it in Obsidian if curious.

4. **Decision template frontmatter uses `date:` not `created:`**
   - What we know: The Decision template has `date: {{date}}` instead of `created: {{date}}`. The Meeting template also uses `date: {{date}}` in addition to (not instead of) other fields.
   - What's unclear: Whether /create should add a `created:` field if the template lacks one, or respect the template's field naming.
   - Recommendation: **Respect template field naming.** Templates are READ-ONLY and authoritative. Don't add fields they don't define. The frontmatter rule says "every note MUST have created" but the templates predate this rule -- address inconsistency as a separate /health finding, not during /create.

## Sources

### Primary (HIGH confidence)
- Vault template files (12 templates in `05 - Templates/`) -- all read and analyzed for variable patterns, frontmatter structure, and Connections section format
- Phase 2 scanner infrastructure (`scanner.cjs`, `parser.cjs`, `indexer.cjs`, `utils.cjs`) -- all read and verified as the data foundation for Phase 3
- Existing vault-index.json, link-map.json, tag-index.json -- data structures verified against actual vault content (31 notes, 19 non-template)
- CLAUDE.md -- authoritative template-to-folder mapping table, frontmatter requirements, governance rules
- `.claude/rules/` -- naming.md, linking.md, frontmatter.md, governance.md, templates.md -- all conventions verified
- MOC files (8 MOCs in `06 - Atlas/MOCs/`) -- verified all use Dataview queries for listings
- Phase 2 RESEARCH.md and plan files -- established patterns for skill structure and .cjs module design

### Secondary (MEDIUM confidence)
- Claude Code skill invocation pattern -- based on analysis of /scan SKILL.md structure and the Skill tool mechanism in the runtime environment
- Obsidian Templater variable syntax (`{{date:FORMAT}}`) -- observed in Monthly Review and Weekly Review templates; format handling inferred from standard date formatting conventions

### Tertiary (LOW confidence)
- None -- all findings verified against actual vault files and existing infrastructure

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Zero new dependencies. All reuses Phase 2 infrastructure + Node.js built-ins.
- Architecture: HIGH - Skill pattern established by /scan in Phase 2. Template structure verified against all 12 templates. Index data structures tested.
- Pitfalls: HIGH - Identified from actual template analysis (variable patterns, Dataview MOCs, rollover dedup) and Phase 2 experience (Windows paths, code block filtering).

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (stable domain -- vault structure fixed, no fast-moving dependencies)
