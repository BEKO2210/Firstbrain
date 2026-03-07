---
phase: 05-proactive-intelligence
plan: 04
subsystem: vault-maintenance
tags: [consistency, staleness, frontmatter, governance, auto-fix]

# Dependency graph
requires:
  - phase: 02-scanning-engine
    provides: vault-index.json, link-map.json, scan/utils.cjs loadJson
  - phase: 03-core-skills
    provides: health-utils.cjs ensureFreshIndexes, triage frontmatter fix pattern
provides:
  - "/maintain skill -- vault consistency auditing with auto-fix"
  - "runConsistencyChecks -- 7-type frontmatter/tag issue detection"
  - "getStaleProjects -- configurable staleness threshold detection"
  - "getOutdatedReferences -- completed/archived link detection"
  - "applyAutoFixes -- governance-aware frontmatter-only fixes"
affects: [future-maintenance-enhancements, vault-quality-monitoring]

# Tech tracking
tech-stack:
  added: []
  patterns: [governance-zone-aware-fixes, frontmatter-only-modification, issue-categorization-by-severity]

key-files:
  created:
    - .agents/skills/maintain/maintain-utils.cjs
    - .agents/skills/maintain/SKILL.md

key-decisions:
  - "Reimplemented frontmatter parsing/serialization in maintain-utils rather than importing from triage-utils to avoid cross-skill dependency"
  - "Issue categorization uses three severity levels (critical/warning/info) with autoFixable flag for governance zone alignment"
  - "Auto-fixes grouped by file path for efficiency -- single read/write per file even with multiple issues"

patterns-established:
  - "Governance-aware fix application: AUTO zone issues get autoFix objects, PROPOSE zone issues get human-readable fix descriptions"
  - "System note exclusion constant: centralized list of notes to skip during vault-wide checks"
  - "Deduplication in reference scanning: Set-based source-target pair tracking"

requirements-completed: [PROA-07, PROA-08, PROA-09]

# Metrics
duration: 4min
completed: 2026-03-07
---

# Phase 5 Plan 4: /maintain Vault Maintenance Summary

**Vault consistency auditing skill with 7-type frontmatter checks, configurable stale project detection, outdated reference scanning, and governance-aware auto-fix application**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-07T22:14:58Z
- **Completed:** 2026-03-07T22:18:31Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments

- Created maintain-utils.cjs with 4 exported functions covering consistency checks (7 issue types), stale project detection, outdated reference scanning, and auto-fix application
- Built SKILL.md with complete /maintain interface: trigger definition, 9-check table, 10-step execution flow, structured report format, governance mapping, and edge case handling
- Implemented governance-aware fix categorization: AUTO for safe fixes (missing created, tag casing, missing tags), PROPOSE for judgment calls (type classification, status, folder moves), NEVER for destructive actions

## Task Commits

Each task was committed atomically:

1. **Task 1: Create maintain-utils.cjs consistency checking and fix module** - `d356204` (feat)
2. **Task 2: Create /maintain SKILL.md interface definition** - `ee759e7` (feat)

## Files Created/Modified

- `.agents/skills/maintain/maintain-utils.cjs` - Consistency checks, staleness detection, outdated reference auditing, and auto-fix application (499 lines)
- `.agents/skills/maintain/SKILL.md` - Skill interface definition with trigger, check table, execution flow, report format, and governance mapping (175 lines)

## Decisions Made

- **Frontmatter logic reimplemented locally:** Duplicated the ~60-line parseSimpleYaml/serializeSimpleYaml from triage-utils.cjs rather than importing, to maintain skill independence and avoid circular dependency if maintain loads before triage.
- **Three-tier severity categorization:** Issues classified as critical (missing type -- blocks proper filing), warning (fixable or judgment-needed), and info (structural suggestions). This maps cleanly to governance zones.
- **File-grouped auto-fixes:** When applying fixes, issues for the same file are merged into a single read-parse-write cycle rather than processing each issue independently. Prevents unnecessary I/O and race conditions.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 4 plans in Phase 5 (Proactive Intelligence) are now complete
- The /maintain skill completes the v1.1 proactive intelligence feature set alongside /briefing, /triage, and /synthesize
- Vault now has full lifecycle coverage: scanning, health checks, skill-based operations, and proactive maintenance

## Self-Check: PASSED

- [x] `.agents/skills/maintain/maintain-utils.cjs` exists
- [x] `.agents/skills/maintain/SKILL.md` exists
- [x] `.planning/phases/05-proactive-intelligence/05-04-SUMMARY.md` exists
- [x] Commit `d356204` found in git log
- [x] Commit `ee759e7` found in git log

---
*Phase: 05-proactive-intelligence*
*Completed: 2026-03-07*
