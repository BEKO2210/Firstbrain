---
name: synthesize
trigger: /synthesize
description: Generate a topic summary from related vault notes with wiki-link citations and AI provenance metadata
version: 3.0.0
---

# /synthesize -- Knowledge Synthesis

Transforms scattered vault knowledge into connected understanding. Given a topic, Claude discovers related notes, reads their content, and composes a new zettel that synthesizes ideas across sources -- with wiki-link citations and clear AI-generated provenance metadata. The result is a note that tells you "what the vault knows about X" in a way no single note could.

## Usage

```
/synthesize "Docker"                # Synthesize what the vault knows about Docker
/synthesize productivity systems    # Multi-word topic synthesis
/synthesize --top 5 "time mgmt"    # Limit to top 5 most relevant sources
```

## What It Does

The synthesis process has three distinct phases:

| Phase | Action | Details |
|-------|--------|---------|
| **Discover** | Find related notes | Search by tags, titles, and semantic similarity (if available) |
| **Read** | Load source content | Read full content of top-N related notes (default: top 10 by relevance) |
| **Synthesize** | Compose new zettel | Claude reads all source content and writes a coherent summary connecting ideas, identifying patterns, and citing sources via `[[wiki-links]]` |

This is NOT a list of note summaries -- it is genuine synthesis that connects ideas across notes and adds the "so what?" layer.

## Execution Flow

Claude follows these steps when `/synthesize` is invoked:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` to rebuild indexes if stale (>5 min).

2. **Discover related notes:** Call `findTopicNotes('.', topic)` from synthesize-utils.cjs. This searches three signal layers:
   - **Tag matching:** Tags containing the topic string (relevance 0.7 per match)
   - **Title matching:** Note names containing the topic (relevance 0.6, or +0.3 boost if already tag-matched)
   - **Semantic search (optional):** Embedding similarity when available (relevance = similarity * 0.5)

3. **Check minimum threshold:** If fewer than 2 notes are found, respond with:
   > "Not enough vault content about '{topic}' to synthesize. Found N note(s). Try a broader topic or add more notes first."

   Do not create a note in this case.

4. **Select top N notes** from the discovery results (default 10, configurable via `--top` flag). These become the source notes.

5. **Read full content** of each selected note via `fs.readFileSync`. Pass the complete content to the synthesis step.

6. **Claude composes the synthesis** by analyzing all source content:
   - Extract key ideas, concepts, and insights from each note
   - Identify connections, patterns, contradictions, and themes across notes
   - Write a coherent summary (200-500 words) that connects ideas -- not a bullet list of note summaries
   - Include `[[wiki-links]]` to source notes as citations throughout the text
   - Every major claim or insight must cite at least one source note

7. **Create synthesis note:** Call `createSynthesisNote('.', topic, synthesisContent, sourceNotes)` from synthesize-utils.cjs. This writes the note to `03 - Resources/` with full provenance metadata.

8. **Re-scan:** Call `scan('.')` to update vault indexes with the new note.

9. **Add to relevant MOC** if one exists for the topic (AUTO zone -- no approval needed).

10. **Log creation** to `.claude/changelog.md` with the note path and source count.

## Output Note Format

The generated synthesis note follows vault conventions with additional provenance fields:

```yaml
---
type: zettel
created: 2026-03-07
updated: 2026-03-07
tags:
  - synthesis
  - docker
synthesized: true
synthesized_by: claude
source_notes:
  - "03 - Resources/Tool -- Docker.md"
  - "01 - Projects/Container Migration.md"
status: active
---
```

**Provenance fields (PROA-06 compliant):**

| Field | Purpose |
|-------|---------|
| `synthesized: true` | Marks note as AI-generated synthesis |
| `synthesized_by: claude` | Identifies the AI that created it |
| `source_notes` | Array of vault-relative paths to all source notes |

**Body structure:**

```markdown
# Zettel -- {topic}

> Claude-synthesized summary based on vault knowledge.

{synthesis content with [[wiki-links]]}

## Connections

- **Source:** [[Source Note 1]]
- **Source:** [[Source Note 2]]
...
```

## Quality Standards

A good synthesis meets these criteria:

- **Citation density:** Every paragraph cites at least one source via `[[Note Name]]`
- **Cross-note connections:** Synthesis connects ideas across notes, not just summarizes each one
- **Concise but substantive:** Total length 200-500 words
- **Adds value:** Avoids repeating what any single note already says -- adds the "so what?" layer by identifying patterns, connections, and implications
- **Honest scope:** Notes when semantic search was unavailable or when many potential sources were excluded

## Governance

| Zone | Action | Classification |
|------|--------|----------------|
| Content | Reading source note content | READ-ONLY |
| Content | Reading vault-index, tag-index | READ-ONLY |
| Structure | Creating the new synthesis note in 03 - Resources/ | AUTO |
| Structure | Adding synthesis note to existing MOC | AUTO |
| Content | Modifying source notes | NEVER |

The synthesis references source notes but never edits them. Source notes remain untouched.

## Edge Cases

- **Topic matches 0-1 notes:** Report insufficient content, do not create a note.
- **Topic matches 50+ notes:** Use top 10 by relevance. Note in output how many total were found (e.g., "Synthesized from 10 of 54 related notes").
- **Synthesis note already exists for topic:** Append date suffix to filename (`Zettel -- Docker (2026-03-07).md`) to avoid overwriting.
- **Semantic search unavailable:** Proceed with tag + title matching only. Note reduced coverage in output (e.g., "Semantic search unavailable -- discovery based on tags and titles only").
- **Source note unreadable:** Skip it, note the skip, continue with remaining sources.

## Utility Module

**File:** `synthesize-utils.cjs`

Provides topic discovery and note creation functions used during the execution flow:

```javascript
const { findTopicNotes, createSynthesisNote, topicToTag } = require('./.agents/skills/synthesize/synthesize-utils.cjs');
```

### Function Signatures

**`findTopicNotes(vaultRoot, topic)`**
Async function. Discovers notes related to a topic using three signal layers: tag matching (relevance 0.7), title matching (relevance 0.6, +0.3 boost for dual match), and optional semantic search (relevance = similarity * 0.5). Returns array of `{ path, name, relevance, source }` sorted by relevance descending. Excludes templates, atlas notes, and system files.

**`createSynthesisNote(vaultRoot, topic, content, sourceNotes)`**
Creates a new zettel in `03 - Resources/` with complete frontmatter including `synthesized: true`, `synthesized_by: claude`, and `source_notes` array. Returns `{ path, name }`. Handles filename collision with date suffix.

**`topicToTag(topic)`**
Converts a topic string to a tag-safe identifier. Handles edge cases like "Machine Learning" -> "machine-learning" and "C++" -> "c".

### Dependencies

- `scan/utils.cjs` -- `loadJson` for reading JSON indexes
- `search/embedder.cjs` -- Optional: `isEmbeddingAvailable`, `generateEmbedding`, `openDb`, `getAllEmbeddings`
- `search/search-utils.cjs` -- Optional: `semanticSearch` for vector search

## Limitations

- **Synthesis quality depends on source quality:** If source notes are sparse or poorly written, the synthesis will reflect that. Claude cannot add knowledge that is not in the vault.
- **No incremental updates:** Each synthesis creates a new note. Running `/synthesize Docker` twice creates two separate notes (with date suffix on the second). There is no "update existing synthesis" mode.
- **Semantic search is optional:** Without the embedding library, discovery relies on tag and title matching only, which may miss semantically related notes that use different terminology.
- **Top-N cutoff:** Only the top 10 (or --top N) notes are read for synthesis. Lower-ranked notes are excluded even if relevant.
- **No cross-synthesis linking:** Synthesis notes do not automatically link to other synthesis notes. They only link to their source notes.
