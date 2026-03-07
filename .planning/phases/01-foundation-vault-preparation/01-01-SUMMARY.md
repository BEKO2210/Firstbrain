---
phase: 01-foundation-vault-preparation
plan: 01
subsystem: i18n
tags: [obsidian, translation, wiki-links, dataview, markdown]

# Dependency graph
requires: []
provides:
  - "All vault file names in English (New Project.md, Untitled.md)"
  - "All wiki-links point to English-named targets"
  - "8 system docs fully translated to English (Home, START HERE, Workflow Guide, Tag Conventions, Inbox, github-setup, README, CONTRIBUTING)"
  - "Dataview query display aliases translated (Geaendert -> Modified)"
affects: [01-foundation-vault-preparation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "English-only file naming convention"
    - "English-only system documentation"
    - "Dataview AS aliases in English"

key-files:
  created:
    - "00 - Inbox/New Project.md"
    - "00 - Inbox/Untitled.md"
  modified:
    - "Home.md"
    - "START HERE.md"
    - "Workflow Guide.md"
    - "Tag Conventions.md"
    - "00 - Inbox/Inbox.md"
    - "07 - Extras/github-setup.md"
    - "README.md"
    - "CONTRIBUTING.md"
    - "06 - Atlas/MOCs/Projects MOC.md"
    - "06 - Atlas/MOCs/Areas MOC.md"
    - "06 - Atlas/MOCs/Resources MOC.md"
    - "06 - Atlas/MOCs/Tools MOC.md"
    - "06 - Atlas/MOCs/Decisions MOC.md"
    - "06 - Atlas/MOCs/People MOC.md"
    - "06 - Atlas/MOCs/Meetings MOC.md"
    - "06 - Atlas/MOCs/Code MOC.md"

key-decisions:
  - "Translated Dataview AS alias from Geaendert to Modified while preserving all FROM/WHERE/SORT clauses unchanged"
  - "Updated CONTRIBUTING.md repo URL from old Second_brain_Obsidian_Edition- to current Firstbrain project name"
  - "Translated wiki-links in MOC files as part of Task 1 since they contained German link targets"
  - "Used direct 'you' voice for guides (START HERE, Workflow Guide), impersonal voice for references (Tag Conventions, README, CONTRIBUTING), mixed for Home.md"

patterns-established:
  - "English-only: All vault system files use English prose and headings"
  - "Wiki-link consistency: All [[link targets]] use English names"
  - "Dataview preservation: FROM clauses, WHERE conditions, frontmatter keys, and tag names are never translated"

requirements-completed: [FOUND-01]

# Metrics
duration: 5min
completed: 2026-03-07
---

# Phase 1 Plan 1: File Renames & System Doc Translation Summary

**Renamed 2 German files to English, updated wiki-links across 11 files, and fully translated 8 system documentation files from German to English with Dataview queries preserved**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-07T12:37:41Z
- **Completed:** 2026-03-07T12:42:50Z
- **Tasks:** 2
- **Files modified:** 18

## Accomplishments
- Renamed Neues Projekt.md to New Project.md and Unbenannt.md to Untitled.md
- Updated all German wiki-link targets to English across 11 vault files (Home.md, START HERE.md, Workflow Guide.md, 8 MOC files)
- Fully translated 8 system documentation files from German to English with consistent tone and terminology
- Preserved all Dataview query logic (FROM paths, WHERE conditions, SORT clauses) while translating display aliases

## Task Commits

Each task was committed atomically:

1. **Task 1: Rename German files and update all wiki-links vault-wide** - `1546e01` (feat)
2. **Task 2: Translate all system documentation files to English** - `7907eda` (feat)

## Files Created/Modified
- `00 - Inbox/New Project.md` - Renamed from Neues Projekt.md (placeholder for new project creation)
- `00 - Inbox/Untitled.md` - Renamed from Unbenannt.md (placeholder for untitled notes)
- `Home.md` - Translated dashboard with working Dataview queries and English navigation
- `START HERE.md` - Translated getting-started guide with step-by-step onboarding
- `Workflow Guide.md` - Translated daily/weekly workflow documentation
- `Tag Conventions.md` - Translated tag reference with all conventions
- `00 - Inbox/Inbox.md` - Translated inbox rules and descriptions
- `07 - Extras/github-setup.md` - Translated repository setup checklist
- `README.md` - Fully translated project README with templates, navigation, and setup guide
- `CONTRIBUTING.md` - Translated contribution guidelines with updated repo URL
- `06 - Atlas/MOCs/Projects MOC.md` - Updated wiki-link from [[Neues Projekt]] to [[New Project]]
- `06 - Atlas/MOCs/Areas MOC.md` - Updated wiki-link from [[Neuer Bereich]] to [[New Area]]
- `06 - Atlas/MOCs/Resources MOC.md` - Updated wiki-links from [[Neue Ressource]]/[[Neuer Zettel]] to English
- `06 - Atlas/MOCs/Tools MOC.md` - Updated wiki-link from [[Neues Tool]] to [[New Tool]]
- `06 - Atlas/MOCs/Decisions MOC.md` - Updated wiki-link from [[Neue Entscheidung]] to [[New Decision]]
- `06 - Atlas/MOCs/People MOC.md` - Updated wiki-link from [[Neue Person]] to [[New Person]]
- `06 - Atlas/MOCs/Meetings MOC.md` - Updated wiki-link from [[Neues Meeting]] to [[New Meeting]]
- `06 - Atlas/MOCs/Code MOC.md` - Updated wiki-link from [[Neues Snippet]] to [[New Snippet]]

## Decisions Made
- Translated Dataview AS alias from "Geaendert" to "Modified" while preserving all FROM/WHERE/SORT clauses unchanged
- Updated CONTRIBUTING.md repo URL from old Second_brain_Obsidian_Edition- to current Firstbrain project name
- Updated wiki-links in all 8 MOC files as part of Task 1 since they contained German link targets that would have been broken references
- Applied voice/tone per user decision: direct "you" voice for guides, impersonal voice for references, mixed for Home.md

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All system docs are in English, ready for template translation (Plan 01-02)
- MOC files still have German prose headings/descriptions (not wiki-links) -- these will be addressed in subsequent plans
- CLAUDE.md still in German -- to be translated in Plan 01-03 (AI governance)
- All wiki-link targets are now English-named, providing a stable foundation for further vault work

## Self-Check: PASSED

- All 10 created/modified vault files: FOUND
- Commit 1546e01 (Task 1): FOUND
- Commit 7907eda (Task 2): FOUND
- SUMMARY.md: FOUND

---
*Phase: 01-foundation-vault-preparation*
*Completed: 2026-03-07*
