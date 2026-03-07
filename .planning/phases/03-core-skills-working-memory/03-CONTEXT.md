# Phase 3: Core Skills & Working Memory - Context

**Gathered:** 2026-03-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Claude Code skills for note creation (/create, /daily), connection discovery (/connect, /health), and persistent working memory across sessions. Users can create notes, generate daily notes, discover connections, check vault health, and Claude remembers context between sessions.

</domain>

<decisions>
## Implementation Decisions

### Note creation flow
- Hybrid invocation: natural language when intent is clear ("create a tool note about Docker"), guided prompts when ambiguous (/create without clear context)
- Show-and-proceed transparency: Claude announces template selection and target folder, then creates without waiting for confirmation
- 3-5 wiki-link suggestions per new note, ranked by relevance
- Auto-add new notes to relevant MOCs (governance AUTO zone) — Claude mentions it in output but doesn't ask

### Daily note rollover
- Only unchecked checkboxes (`- [ ]`) count as open items for rollover
- Rolled-over items appear under a `## Rolled Over` heading with source links: `- [ ] Task text (from [[2026-03-06]])`
- Scan back up to 7 days for missed daily notes — picks up items even if user skipped days
- If today's daily note already exists, open it and merge any new rolled-over items non-destructively

### Connection discovery (/connect)
- Ranked list with evidence: each suggestion shows note name, why it's related (shared tags, existing links), and confidence indicator — top suggestions first
- User picks which suggestions to add — Claude presents list, user selects, Claude inserts into ## Connections section

### Vault health (/health)
- Summary stats at top (e.g., "3 orphans, 2 broken links"), then actionable list with suggested fixes for each item
- Auto-fix broken links when correct target is obvious (single clear match, e.g., typo) — follows AUTO zone governance
- Propose fixes when ambiguous (multiple candidates) — user approves

### Session memory
- Silent background load on startup: Claude reads MEMORY.md and vault index, knows context but doesn't announce it
- MEMORY.md = concise summary (active projects, priorities, preferences), with links to topic files in .claude/memory/ for detailed per-area context
- Memory writes triggered by significant actions: project status changes, new projects, user preferences, confirmed patterns — not after every note edit
- Phase 3 implements layers 1-2 fully (session memory + working memory). Layers 3-4 (long-term summary, project-specific) documented as stubs for Phase 4

### Claude's Discretion
- Exact template matching algorithm when intent is ambiguous
- Wiki-link suggestion ranking algorithm details
- Health report formatting and severity ordering
- Memory topic file organization structure
- Rollover section placement within daily note template

</decisions>

<specifics>
## Specific Ideas

- Rollover format: `- [ ] Task text (from [[2026-03-06]])` — preserves provenance with wiki-link back to source day
- /health should feel like a quick diagnostic, not an audit — summary first, details on demand
- Memory should be invisible to the user during normal operation — Claude just "knows" without being told

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-core-skills-working-memory*
*Context gathered: 2026-03-07*
