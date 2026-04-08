---
name: search
trigger: /search
description: Search vault notes by meaning using semantic similarity or keyword matching
version: 3.0.0
---

# /search -- Semantic Search

Finds vault notes by meaning, not just keywords. Uses vector embeddings (Transformers.js + all-MiniLM-L6-v2) for semantic similarity search. Falls back to keyword search when embeddings are not available.

Supports both dedicated `/search` skill for explicit queries and implicit semantic search in conversation when relevant.

## Usage

```
/search "productivity systems"
```
Find notes about productivity even if the exact term is not used.

```
/search docker container orchestration
```
Multi-word concept search across all vault notes.

Natural language in conversation:
> "Find notes related to time management"

Claude uses /search internally to locate relevant notes.

## Setup (One-Time)

```bash
npm install    # Installs @huggingface/transformers (~23MB model downloaded on first use)
/scan          # Generates embeddings for all vault notes
```

If `npm install` has not been run, `/search` falls back to keyword-based search using tag-index and note titles. Semantic search is available only after the embedding library is installed.

## Result Display

Results show: note title + relevant excerpt showing why it matched + relevance indicator (high/medium/low). Adaptive result count based on relevance threshold (not fixed N) -- could be 3 or 8 depending on match quality.

`formatSearchResults` reads note files for top results and uses `extractExcerpt` to pull a query-relevant passage.

Example output:
```
## Search: "productivity systems"

Found 4 results:

1. **[[Book -- Getting Things Done]]** (high confidence)
   > ...a productivity methodology that organizes tasks into actionable next steps...
   Type: resource | Relevance: 0.82

2. **[[Zettel -- Personal Workflow]]** (medium confidence)
   > ...my daily system for managing tasks and priorities...
   Type: zettel | Relevance: 0.56

_Searched via semantic similarity_
```

## Execution Flow

Steps Claude follows when executing `/search`:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` to auto-scan if scan-state is stale (>5 min).

2. **Check embedding availability:** Call `isEmbeddingAvailable()`.

3. **If embeddings available (semantic mode):**
   a. Generate query embedding via `generateEmbedding(query)`
   b. Open db and retrieve all embeddings via `openDb(vaultRoot)` then `getAllEmbeddings(db)`
   c. Run `semanticSearch(queryEmbedding, allEmbeddings)` -- uses 0.3 similarity threshold, up to 20 results
   d. Format results with excerpts via `formatSearchResults(results, query, '.')` -- reads note files for top results, extracts body text, generates query-relevant excerpts automatically

4. **If embeddings unavailable (keyword fallback):**
   a. Load `vault-index.json` and `tag-index.json` from `.claude/indexes/`
   b. Run `keywordSearch(query, vaultIndex, tagIndex)` -- matches tags (+2) and titles (+1)
   c. Format results with excerpts via `formatSearchResults(results, query, '.')` -- excerpt extraction works the same way for keyword results
   d. Append note: "Tip: Install @huggingface/transformers for semantic search (finds notes by meaning, not just keywords)"

5. **Present results** to user.

6. If user wants to navigate to a result, open the note.

## Implicit Search

When a user asks about vault content during conversation and existing index lookups yield poor results, Claude may use semantic search internally to find relevant notes. Start conservative -- do not trigger embedding search on every conversation turn. Use it when keyword/tag searches are insufficient.

## Code Example

```javascript
const { ensureFreshIndexes, semanticSearch, keywordSearch, formatSearchResults } = require('./.agents/skills/search/search-utils.cjs');
const { generateEmbedding, isEmbeddingAvailable, openDb, getAllEmbeddings } = require('./.agents/skills/search/embedder.cjs');
const { loadJson } = require('./.agents/skills/scan/utils.cjs');
const path = require('path');

async function search(query, vaultRoot) {
  // Ensure indexes are fresh
  ensureFreshIndexes(vaultRoot);

  const available = await isEmbeddingAvailable();

  if (available) {
    // Semantic search path
    const queryEmbedding = await generateEmbedding(query, vaultRoot);
    const db = openDb(vaultRoot);
    const allEmbeddings = getAllEmbeddings(db);
    db.close();
    const results = semanticSearch(queryEmbedding, allEmbeddings);
    return formatSearchResults(results, query, vaultRoot);
  } else {
    // Keyword fallback path
    const indexDir = path.join(vaultRoot, '.claude', 'indexes');
    const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));
    const tagIndex = loadJson(path.join(indexDir, 'tag-index.json'));
    const results = keywordSearch(query, vaultIndex, tagIndex);
    let output = formatSearchResults(results, query, vaultRoot);
    output += '\n\n> Tip: Install @huggingface/transformers for semantic search (finds notes by meaning, not just keywords)';
    return output;
  }
}
```

## Embedding Management

- **Storage:** `.claude/embeddings.db` (SQLite database, WAL mode for concurrent reads)
- **Model cache:** `.claude/.models/` after first download (~23MB)
- **Embedding sync:** Happens during `/scan` (Plan 04-03 integrates this)
- **Status check:** Use `/memory` to check embedding index status (total embeddings, latest update)

### What Gets Embedded

- All user notes in `00 - Inbox/`, `01 - Projects/`, `02 - Areas/`, `03 - Resources/`, `04 - Archive/`
- Each note is embedded as: title + first ~500 characters of body text

### What Gets Skipped

- Templates (`05 - Templates/`)
- MOCs and Atlas files (`06 - Atlas/`)
- System files: `Home.md`, `START HERE.md`, `Workflow Guide.md`, `Tag Conventions.md`
- Notes flagged with `isTemplate: true`

## Limitations

- **Token window:** all-MiniLM-L6-v2 has a 256-token effective window (~500 chars of note body). Important content at the bottom of long notes may not influence search results.
- **First-time download:** The model (~23MB) is downloaded on first use. Subsequent calls use the cached version.
- **Templates and MOCs excluded:** Navigation files are not embedded since they contain structure, not knowledge.
- **Stale embeddings:** If notes are edited without running `/scan`, search results may not reflect recent changes. The `ensureFreshIndexes` function auto-scans if indexes are >5 minutes old.

## Dependencies

- `embedder.cjs` -- SQLite operations, embedding generation, text extraction
- `search-utils.cjs` -- Cosine similarity, search algorithms, result formatting
- `../scan/scanner.cjs` -- Vault scanning for fresh indexes
- `../scan/utils.cjs` -- `loadJson` for reading index files
- `@huggingface/transformers` -- Local embedding generation (optional; keyword fallback if not installed)
