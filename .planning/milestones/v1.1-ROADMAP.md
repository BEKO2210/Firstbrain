# Roadmap: Firstbrain -- AI-Native Second Brain

## Milestones

- ✅ **v1.0 MVP** — Phases 1-4 (shipped 2026-03-07)
- ✅ **v1.1 Proactive Intelligence** — Phases 5-6 (shipped 2026-03-08)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-4) — SHIPPED 2026-03-07</summary>

- [x] Phase 1: Foundation & Vault Preparation (4/4 plans) — completed 2026-03-07
- [x] Phase 2: Scanning Engine & Cache Infrastructure (2/2 plans) — completed 2026-03-07
- [x] Phase 3: Core Skills & Working Memory (4/4 plans) — completed 2026-03-07
- [x] Phase 4: Deep Memory & Semantic Search (4/4 plans) — completed 2026-03-07

See: `.planning/milestones/v1.0-ROADMAP.md` for full details.

</details>

### v1.1 Proactive Intelligence (Complete)

- [x] **Phase 5: Proactive Intelligence** — /briefing, /triage, /synthesize, /maintain skills for autonomous vault care
- [x] **Phase 6: Gap Closure** — Fix /maintain and /triage integration bugs found by milestone audit

## Phase Details

### Phase 5: Proactive Intelligence
**Goal**: The vault actively works for the user -- surfacing priorities, classifying inbox items, synthesizing knowledge, and maintaining consistency without being asked
**Depends on**: Phase 4
**Requirements**: PROA-01, PROA-02, PROA-03, PROA-04, PROA-05, PROA-06, PROA-07, PROA-08, PROA-09
**Success Criteria** (what must be TRUE):
  1. User invokes /briefing and gets a calm daily summary covering recent changes, current priorities, neglected items, and actionable suggestions -- without information overload
  2. User invokes /triage on inbox notes and each note gets classified by type with a suggested target folder; high-confidence items get auto-tagged, structural changes are proposed for review
  3. User invokes /synthesize on a topic and gets a generated summary note that cites specific vault notes via wiki-links and is marked as Claude-synthesized in its frontmatter
  4. User invokes /maintain and gets a report of tag/frontmatter inconsistencies, stale projects (active but untouched), and outdated references -- with proposed fixes
  5. All proactive actions respect the AUTO/PROPOSE/NEVER classification from Phase 1 -- no silent structural changes
**Plans:** 4/4 plans executed

Plans:
- [x] 05-01-PLAN.md — /briefing skill: calm daily executive summary (changes, priorities, neglected items, suggestions)
- [x] 05-02-PLAN.md — /triage skill: inbox classification with confidence-based governance (AUTO/PROPOSE/REVIEW)
- [x] 05-03-PLAN.md — /synthesize skill: topic-based knowledge synthesis with wiki-link citations
- [x] 05-04-PLAN.md — /maintain skill: vault consistency auditing (frontmatter, staleness, outdated references)

### Phase 6: Gap Closure — Fix /maintain and /triage Bugs
**Goal**: Close all gaps identified by milestone audit — fix broken outdated reference detection, false-positive stale project reporting, and review-type triage routing
**Depends on**: Phase 5
**Requirements**: PROA-08, PROA-09
**Gap Closure:** Closes gaps from v1.1-MILESTONE-AUDIT.md
**Success Criteria** (what must be TRUE):
  1. `getOutdatedReferences` correctly reads `link.targetPath` from link-map.json and returns actual outdated references
  2. `getStaleProjects` skips template files (05 - Templates/) — no false positives
  3. `getTargetFolder('review')` returns a valid target folder instead of null
**Plans:** 1/1 plans executed

Plans:
- [x] 06-01-PLAN.md — Fix maintain-utils (PROA-09 resolvedPath->targetPath, PROA-08 isTemplate guard) and triage review-type routing

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation & Vault Preparation | v1.0 | 4/4 | Complete | 2026-03-07 |
| 2. Scanning Engine & Cache Infrastructure | v1.0 | 2/2 | Complete | 2026-03-07 |
| 3. Core Skills & Working Memory | v1.0 | 4/4 | Complete | 2026-03-07 |
| 4. Deep Memory & Semantic Search | v1.0 | 4/4 | Complete | 2026-03-07 |
| 5. Proactive Intelligence | v1.1 | 4/4 | Complete | 2026-03-07 |
| 6. Gap Closure | v1.1 | 1/1 | Complete | 2026-03-08 |
