---
name: connect
trigger: /connect
description: Discover connections using tags, link adjacency, multi-hop graph paths, and structural similarity
version: 3.0.0
---

# /connect -- Advanced Connection Discovery

Analyzes a note's tags, link graph, multi-hop paths, and structural similarity to discover related notes. Three signal layers:

1. **Direct** -- shared tags + link adjacency (Level 1, fast)
2. **Multi-hop** -- notes reachable in 2-3 hops but not directly linked (Level 2, graph engine)
3. **Structural** -- notes with similar connection patterns via Jaccard similarity (Level 3, graph engine)

Presents a ranked list with evidence. User selects which to add.

## Usage

```
/connect                      # Analyze the current note (Claude determines from context)
/connect "Tool -- Docker"     # Analyze a specific note by name
```

## Connection Scoring

Two Level 1 signals are used to score potential connections:

| Signal | Score | Description |
|--------|-------|-------------|
| Tag overlap | +1 per shared tag | Notes sharing frontmatter or inline tags with the target |
| Link adjacency | +0.5 per shared link target | Notes that link to the same targets as the target note |

**Confidence levels** (based on combined score):

| Level | Score | Meaning |
|-------|-------|---------|
| High | >= 3 | Strong connection -- multiple shared tags or tags + link overlap |
| Medium | >= 1.5 | Moderate connection -- some shared context |
| Low | > 0 | Weak connection -- minimal overlap, worth reviewing |

**Exclusions:** Templates, MOCs, system files (Home, START HERE, Workflow Guide, Tag Conventions), and notes already linked from the target are excluded from suggestions.

## Execution Flow

Claude follows these steps when `/connect` is invoked:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` to rebuild indexes if stale (>5 min)
2. **Identify the target note:** From user input (e.g., `"Tool -- Docker"`) or conversation context
3. **Load indexes:**
   ```javascript
   const { loadJson } = require('./.agents/skills/scan/utils.cjs');
   const path = require('path');
   const indexDir = path.join('.', '.claude', 'indexes');
   const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));
   const linkMap = loadJson(path.join(indexDir, 'link-map.json'));
   const tagIndex = loadJson(path.join(indexDir, 'tag-index.json'));
   ```
4. **Find connections:**
   ```javascript
   const { findConnections, formatConnectionSuggestions } = require('./.agents/skills/connect/connect-utils.cjs');
   const results = findConnections(targetPath, vaultIndex, linkMap, tagIndex);
   ```
5. **Format and present results:**
   ```javascript
   const formatted = formatConnectionSuggestions(results);
   ```
6. **Present ranked list** to the user with evidence and confidence indicators
7. **User selects** which suggestions to add (e.g., "add 1, 3, 5")
8. **Insert connections:** For each selected suggestion, add `- [[Note Name]]` to the target note's `## Connections` section under the appropriate category (Related, Source, Supports, etc.)
9. **Re-scan:** Call `scan('.')` to update indexes after modifications

## Code Example

```javascript
const { findConnections, formatConnectionSuggestions, ensureFreshIndexes } = require('./.agents/skills/connect/connect-utils.cjs');
const { loadJson } = require('./.agents/skills/scan/utils.cjs');
const path = require('path');

// Step 1: Ensure indexes are current
ensureFreshIndexes('.');

// Step 2: Load indexes
const indexDir = path.join('.', '.claude', 'indexes');
const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));
const linkMap = loadJson(path.join(indexDir, 'link-map.json'));
const tagIndex = loadJson(path.join(indexDir, 'tag-index.json'));

// Step 3: Find connections for a specific note
const targetPath = '03 - Resources/Tool -- Docker.md';
const results = findConnections(targetPath, vaultIndex, linkMap, tagIndex);

// Step 4: Format for display
const output = formatConnectionSuggestions(results);
console.log(output);
```

## Output Format

```
1. **[[Tool -- Obsidian]]** (high confidence)
   - shared tag: #tool
   - shared tag: #productivity
   - both link to [[Home]]

2. **[[Website Relaunch]]** (medium confidence)
   - shared tag: #project
   - both link to [[Home]]

3. **[[Zettel -- Knowledge Management]]** (low confidence)
   - shared tag: #productivity
```

The user reviews the list and selects entries by number. Claude then adds the selected notes as wiki-links in the target note's `## Connections` section.

## Limitations

- **Level 1 only:** Uses tag overlap and link-graph adjacency. No semantic similarity or body text analysis (deferred to Phase 4).
- **Filters out navigation notes:** Templates, MOCs, Home, and system files are excluded from suggestions since they are navigation, not content notes.
- **Existing connections excluded:** Notes the target already links to are not suggested again.
- **Score ceiling:** Small vaults with few tags may produce mostly "low confidence" suggestions. This improves as the vault grows and tags are used consistently.
