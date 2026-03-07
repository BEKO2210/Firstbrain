# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-07
**Phases:** 4 | **Plans:** 14 | **Commits:** 60

### What Was Built
- Full English vault rewrite with Dataview query preservation across all templates, MOCs, and system docs
- Zero-dependency scanning engine with incremental SHA-256 change detection (~15ms full scan, ~5ms incremental)
- 7 Claude Code skills: /create, /daily, /connect, /health, /scan, /search, /memory
- Four-layer memory architecture with confidence-scored insights and per-project state tracking
- Semantic search via local Transformers.js embeddings with SQLite storage and keyword fallback
- Three-zone evolution governance system (AUTO/PROPOSE/NEVER) with path-specific rules

### What Worked
- Zero-dependency approach for core modules eliminated all ESM compatibility issues that were flagged as risks
- Hand-rolled YAML parser and regex-based scanner turned out simpler and faster than any library would have been
- Wave-based plan parallelization within phases kept execution efficient (avg 4min/plan)
- Gap-closure plan pattern (04-04) caught real bugs before milestone close -- wiring issues between modules that unit-level verification missed
- Keeping skills as SKILL.md + .cjs utilities gave clean separation between "what Claude does" and "how the code works"

### What Was Inefficient
- Phase 4 required a gap-closure plan (04-04) to fix wiring bugs in memory-utils.cjs -- these could have been caught by integration verification within earlier plans
- All 4 phases completed in a single day, making per-phase velocity metrics less meaningful than they would be in a multi-day project
- SUMMARY.md files lacked structured one_liner fields, requiring manual extraction during milestone completion

### Patterns Established
- CJS modules with zero external dependencies for all core functionality
- Dynamic import() pattern for optional ESM-only dependencies (Transformers.js)
- SKILL.md as the single interface definition between Claude and utility code
- Governance zones (AUTO/PROPOSE/NEVER) as a reusable pattern for any AI-assisted system
- Graceful degradation via try/catch require() -- features degrade rather than fail when optional dependencies are missing

### Key Lessons
1. Hand-rolling simple parsers is often faster than fighting library compatibility issues (YAML, markdown frontmatter)
2. Integration wiring bugs (wrong paths, missing exports) are a distinct class of issue that per-module verification doesn't catch -- dedicated integration plans are worth it
3. SQLite built into Node.js (node:sqlite) is surprisingly capable for embedding storage -- no need for external vector databases at vault scale
4. Gap-closure plans should be a standard milestone step, not an afterthought

### Cost Observations
- Model mix: Primarily opus for execution, sonnet for research/planning agents
- Sessions: Single extended session for entire v1.0
- Notable: 14 plans in ~56 minutes total -- consistent 4min/plan average across all phases

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Commits | Phases | Key Change |
|-----------|---------|--------|------------|
| v1.0 | 60 | 4 | Initial process -- wave-based execution, gap-closure pattern discovered |

### Cumulative Quality

| Milestone | Plans | Avg Duration | Zero-Dep Modules |
|-----------|-------|--------------|------------------|
| v1.0 | 14 | 4min | 7 (utils, parser, scanner, indexer, create-utils, daily-utils, connect-utils, health-utils, memory-utils, search-utils) |

### Top Lessons (Verified Across Milestones)

1. Zero-dependency core + optional-dependency extensions is the right architecture for a portable tool
2. Gap-closure plans catch integration bugs that per-module verification misses
