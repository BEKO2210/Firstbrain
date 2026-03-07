---
name: scan
trigger: /scan
description: Scan the vault and rebuild cached indexes for all .md files
version: 1.0.0
---

# /scan -- Vault Scanner

Incrementally scans all vault `.md` files, extracts Level 1 metadata (frontmatter, wiki-links, tags, headings), and writes four cached JSON indexes to `.claude/indexes/`.

## Usage

```
/scan              # Incremental scan (only re-parses changed files)
/scan --verbose    # Show per-file details (added/modified/deleted/unchanged)
/scan --full       # Force complete re-scan ignoring cached hashes
```

## What It Does

1. Discovers all `.md` files in the vault (excludes dot-directories: `.claude/`, `.obsidian/`, etc.)
2. Compares each file's content hash against `scan-state.json` to detect changes
3. Re-parses only added/modified files (or all files with `--full`)
4. Writes four index files:
   - `vault-index.json` -- Per-note metadata (path, type, tags, links, headings, hash, mtime)
   - `link-map.json` -- Every wiki-link mapped from source to target with resolution status
   - `tag-index.json` -- Every tag mapped to the notes that use it
   - `scan-state.json` -- Per-file content hashes for incremental scanning

## Output

Default: One-line summary
```
Scanned 47 files (3 added, 2 modified, 1 deleted) in 0.8s
```

With `--verbose`: Per-file breakdown plus link/tag statistics.

## Execution

```javascript
const { scan } = require('./.agents/skills/scan/scanner.cjs');
const result = scan('.', { full: false, verbose: false });
// result: { added, modified, deleted, unchanged, total, elapsed, links, unresolvedLinks, tags }
```

## Auto-Scan Behavior

- Auto-scan on session start if indexes are older than 5 minutes (configurable)
- Other skills should call `scan()` before running if indexes may be stale
- After Claude creates or modifies vault files, call `scan()` to update indexes immediately

## Index Location

All indexes stored in `.claude/indexes/` (gitignored, regenerable from vault content).

## Limitations

- Level 1 only: extracts metadata, not body text content
- No Dataview inline field extraction (frontmatter fields only)
- No semantic analysis (deferred to Phase 4)
- Templates in `05 - Templates/` are scanned but flagged with `isTemplate: true`
