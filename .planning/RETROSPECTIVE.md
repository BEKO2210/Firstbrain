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

## Milestone: v1.1 — Proactive Intelligence

**Shipped:** 2026-03-08
**Phases:** 2 | **Plans:** 5 | **Commits:** 25

### What Was Built
- /briefing skill — calm daily executive summary aggregating changes, priorities, neglected items, and actionable suggestions
- /triage skill — inbox classification with three-tier confidence model mapped to governance zones (AUTO/PROPOSE/REVIEW)
- /synthesize skill — topic-based knowledge synthesis with multi-signal relevance scoring (tag + title + semantic) and AI provenance metadata
- /maintain skill — vault consistency auditing with 7-type issue detection, staleness tracking, outdated reference detection, and governance-aware auto-fix
- Gap closure — fixed 3 integration bugs (field name mismatch, template false-positive, review-type routing null return)

### What Worked
- Milestone audit after Phase 5 caught 3 real integration bugs that per-plan verification missed (same pattern as v1.0)
- Reusing existing utilities (memory-utils, create-utils, health-utils) kept skill modules lean and avoided code duplication
- Confidence-tiered governance mapping (HIGH→AUTO, MEDIUM→PROPOSE, LOW→REVIEW) provided a clean, consistent pattern for all proactive skills
- Optional semantic search with graceful degradation — /synthesize works without embeddings installed, just with reduced relevance quality

### What Was Inefficient
- Phase 5 verification passed all plans statically, but integration bugs were only caught by the milestone audit — reinforces that static verification alone is insufficient
- SUMMARY.md one_liner fields still not populated by executor agents, requiring manual extraction during milestone completion (same issue as v1.0)
- Maintain-utils reimplemented frontmatter parsing locally to avoid coupling with triage-utils — slight code duplication, but justified by independence

### Patterns Established
- Proactive skills follow a consistent structure: SKILL.md interface + {name}-utils.cjs module
- Governance zone mapping for autonomous features: tier actions by confidence, map to existing AUTO/PROPOSE/NEVER zones
- TYPE_FOLDER_FALLBACK pattern for type-to-folder mappings that don't fit the primary TEMPLATE_MAP
- Milestone audit → gap-closure phase is now a validated two-step quality gate

### Key Lessons
1. Milestone audits are essential — they caught 3 bugs that per-plan verification missed, same pattern as v1.0
2. Governance zone mapping is reusable — any new autonomous feature can classify its actions into the existing three-tier system
3. Skills should be independently deployable — reimplementing a small utility locally is preferable to creating cross-skill dependencies
4. Graceful degradation should be the default for optional features — try/catch around optional deps, not hard failures

### Cost Observations
- Model mix: Opus for execution, sonnet for research/verification
- Sessions: 2 sessions (phase 5 execution, phase 6 gap closure + milestone completion)
- Notable: 5 plans in ~16 minutes total — consistent 3-4min/plan average

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Commits | Phases | Key Change |
|-----------|---------|--------|------------|
| v1.0 | 60 | 4 | Initial process -- wave-based execution, gap-closure pattern discovered |
| v1.1 | 25 | 2 | Milestone audit → gap-closure validated as standard quality gate |

### Cumulative Quality

| Milestone | Plans | Avg Duration | Modules Added |
|-----------|-------|--------------|---------------|
| v1.0 | 14 | 4min | 10 core modules (scanner, indexer, 7 skill utils) |
| v1.1 | 5 | 3min | 4 skill modules (briefing, triage, synthesize, maintain) |

### Top Lessons (Verified Across Milestones)

1. Zero-dependency core + optional-dependency extensions is the right architecture for a portable tool
2. Gap-closure plans catch integration bugs that per-module verification misses — confirmed in both v1.0 and v1.1
3. Governance zone mapping (AUTO/PROPOSE/NEVER) scales cleanly to new autonomous features
4. Skills should be independently deployable — avoid cross-skill utility dependencies
