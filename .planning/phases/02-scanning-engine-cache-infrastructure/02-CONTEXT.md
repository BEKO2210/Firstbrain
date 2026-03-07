# Phase 2: Scanning Engine & Cache Infrastructure - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a Level 1 parser and incremental scanning system that extracts metadata from all vault .md files, produces cached JSON indexes (vault-index, link-map, tag-index), and detects changes via content hashing. Exposes /scan skill for manual triggering. This infrastructure enables all downstream skills (Phase 3+) to query vault structure without full re-reads.

</domain>

<decisions>
## Implementation Decisions

### Index storage & visibility
- Store all index files in `.claude/indexes/` (vault-index.json, link-map.json, tag-index.json, scan-state.json)
- Gitignore index files — they are derived data, regenerable from vault content
- Hidden from Obsidian file explorer by default (inside .claude/)

### Scan trigger & automation
- Auto-scan on session start only if indexes are stale (configurable threshold — Claude picks sensible default)
- Other skills (Phase 3: /create, /connect, /health) auto-trigger scan before running if indexes are stale
- After Claude creates or modifies vault files, auto-update indexes immediately
- /scan available for manual triggering at any time

### Scan reporting & output
- Default /scan output: summary with change counts ("Scanned 47 files (3 added, 2 modified, 1 deleted) in 1.2s")
- /scan --verbose flag for detailed file-by-file report
- /scan --full flag to force complete re-scan (ignoring hashes) as safety valve
- Auto-scan (session start / pre-skill) shows one-line summary: "⚡ Index refreshed (2 changes)"
- /scan focuses on indexing only — vault health analysis belongs in /health (Phase 3)

### Parser extraction depth
- Level 1: metadata only — frontmatter, wiki-links, tags, headings, content hash, mtime
- No body text extraction (deferred to Phase 4 for semantic search)
- No Dataview inline field extraction (frontmatter only)
- Flat heading list with level indicators (h1, h2, h3) — no nested hierarchy tree
- Plugin-style parser design: clean interface so Level 2 (body text) and Level 3 (semantic) extractors can be added in Phase 4 without rewriting Level 1

### Implementation technology
- Node.js scripts (.cjs) for parser and scanning logic — Node.js already available from Claude Code
- Plain JSON files for all index storage
- Scanner code lives in `.agents/skills/scan/` as a user-facing skill with SKILL.md interface definition

### Claude's Discretion
- Exact staleness threshold for auto-scan (suggested: ~1 hour, configurable via config)
- Internal parser module structure and file organization within .agents/skills/scan/
- JSON index schema details (exact field names, nesting)
- Hash algorithm choice for content change detection
- Error handling for malformed frontmatter or unreadable files

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Key constraints come from the requirements: vault-index.json, link-map.json, tag-index.json, and scan-state.json are the four required output files. /scan is the user-facing skill entry point.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-scanning-engine-cache-infrastructure*
*Context gathered: 2026-03-07*
