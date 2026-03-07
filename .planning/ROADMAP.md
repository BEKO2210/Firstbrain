# Roadmap: Firstbrain -- AI-Native Second Brain

## Overview

Firstbrain transforms a plain-markdown Obsidian vault into an AI-native knowledge management system through Claude Code skills. The roadmap progresses from vault preparation (English rewrite, governance) through scanning infrastructure and core skills to proactive intelligence features. Each phase builds on the previous: the vault must be readable before it can be indexed, indexed before skills can query it, and skills must be proven before proactive automation layers on top. Value delivery is front-loaded -- after Phase 3 a user gets the full "AI-native" experience; Phases 4-5 add depth and autonomy.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Vault Preparation** - English rewrite, governance system, trust infrastructure, Obsidian compatibility
- [ ] **Phase 2: Scanning Engine & Cache Infrastructure** - Level 1 parser, incremental scanning, JSON indexes, /scan skill
- [ ] **Phase 3: Core Skills & Working Memory** - /create, /daily, /connect, /health skills with cross-session working memory
- [ ] **Phase 4: Deep Memory & Semantic Search** - Long-term summary memory, project-specific memory, semantic search
- [ ] **Phase 5: Proactive Intelligence** - /briefing, /triage, /synthesize, /maintain skills for autonomous vault care

## Phase Details

### Phase 1: Foundation & Vault Preparation
**Goal**: The vault is fully English, governed by explicit evolution rules, and verified Obsidian-compatible -- ready for AI features to build on
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07
**Success Criteria** (what must be TRUE):
  1. All templates, MOCs, guides, and system docs render in English with no German fragments remaining
  2. CLAUDE.md contains AI-native instructions covering autonomous behavior, memory architecture, skill invocation, and governance rules
  3. Path-specific rules in .claude/rules/ load automatically when Claude reads files in matching directories
  4. Every autonomous action Claude takes is classified as AUTO, PROPOSE, or NEVER -- and logged to .claude/changelog.md
  5. The vault opens in Obsidian with working graph view, search, Properties panel, and Dataview queries (no broken references from the rewrite)
**Plans**: 4 plans in 3 waves

Plans:
- [ ] 01-01-PLAN.md -- English rewrite: rename files, update wiki-links, translate system docs
- [ ] 01-02-PLAN.md -- AI-native governance: CLAUDE.md rewrite, .claude/rules/, changelog
- [ ] 01-03-PLAN.md -- English rewrite: translate all 12 templates and 8 MOCs
- [ ] 01-04-PLAN.md -- Obsidian compatibility verification (automated checks + human checkpoint)

### Phase 2: Scanning Engine & Cache Infrastructure
**Goal**: Claude can incrementally scan the vault, build cached indexes of all notes, and detect changes without full re-reads -- enabling all downstream skills
**Depends on**: Phase 1
**Requirements**: SCAN-01, SCAN-02, SCAN-03, SCAN-04, SCAN-05, SCAN-06, SCAN-07
**Success Criteria** (what must be TRUE):
  1. Running /scan produces vault-index.json with correct metadata (path, type, tags, links, headings, hash, mtime) for every .md file in the vault
  2. After editing a single note and running /scan again, only that note is re-parsed (incremental scan verified by scan-state.json hash comparison)
  3. link-map.json accurately maps every wiki-link to its source and target note
  4. tag-index.json maps every tag to the notes that use it, with no missing entries
  5. /scan reports a summary of changes (added, modified, deleted files) after each run
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Core Skills & Working Memory
**Goal**: Users can create notes, generate daily notes, discover connections, and check vault health through Claude Code skills -- and Claude remembers context across sessions
**Depends on**: Phase 2
**Requirements**: NOTE-01, NOTE-02, NOTE-03, NOTE-04, CONN-01, CONN-02, CONN-03, CONN-04, MEM-01, MEM-02, MEM-03
**Success Criteria** (what must be TRUE):
  1. User says "create a tool note about Docker" and Claude selects the Tool template, fills frontmatter, substitutes variables, suggests wiki-links, and places the file in 03 - Resources/
  2. User invokes /daily and gets today's daily note with open items from the previous day rolled over automatically
  3. User invokes /connect on a note and gets suggested wiki-links with evidence explaining why each related note is relevant (based on shared tags and explicit links)
  4. User invokes /health and gets a report listing orphan notes (0-1 connections) and broken wiki-links with suggested fixes
  5. After closing and reopening Claude Code, Claude knows the active projects, recent changes, and current priorities without the user re-explaining context
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD

### Phase 4: Deep Memory & Semantic Search
**Goal**: Claude develops long-term understanding of vault patterns and can find notes by meaning, not just keywords -- transitioning from explicit data to semantic intelligence
**Depends on**: Phase 3
**Requirements**: MEM-04, MEM-05, CONN-05
**Success Criteria** (what must be TRUE):
  1. Long-term summary memory distills recurring themes, organizational patterns, and insights -- and this knowledge persists across weeks of sessions
  2. Project-specific memory tracks per-project state, decisions, blockers, and context -- accessible when the user returns to that project
  3. User can search for a concept (e.g., "notes about productivity systems") and get relevant results even when the exact term does not appear in those notes
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

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
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD
- [ ] 05-03: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Vault Preparation | 0/4 | Planned | - |
| 2. Scanning Engine & Cache Infrastructure | 0/? | Not started | - |
| 3. Core Skills & Working Memory | 0/? | Not started | - |
| 4. Deep Memory & Semantic Search | 0/? | Not started | - |
| 5. Proactive Intelligence | 0/? | Not started | - |
