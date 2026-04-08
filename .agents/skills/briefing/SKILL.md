---
name: briefing
trigger: /briefing
description: Generate a calm daily executive summary of vault state -- priorities, changes, neglected items, and suggestions
version: 3.0.0
---

# /briefing -- Daily Briefing

A calm, concise executive summary of your vault's current state. Surfaces recent changes, active project priorities, neglected items, and 1-2 actionable suggestions -- all in 15-20 lines. Designed to replace the mental overhead of "what changed? what's stalled? what should I focus on?" with a quick daily snapshot.

## Usage

```
/briefing              # Today's briefing (48-hour lookback)
/briefing --days 7     # Extended lookback (7 days)
```

## What It Shows

| Section | Source | Cap |
|---------|--------|-----|
| Recent Changes | vault-index.json mtimes | Top 5, "N more" summary |
| Active Projects | memory-utils getActiveProjects | All, sorted by priority |
| Neglected Items | Projects with stale mtime (14+ days) | Top 3 |
| Inbox Status | Inbox note count | Count only |
| Suggestions | Claude reasoning over all data | 1-2 items |

## Execution Flow

Claude follows these steps when `/briefing` is invoked:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` from health-utils to rebuild indexes if stale (>5 min).

2. **Gather briefing data:** Call `gatherBriefingData('.')` from briefing-utils.cjs. This returns a structured object with:
   - `recentChanges` -- notes modified in the lookback window (capped at 10, newest first)
   - `totalRecent` -- total count of recent changes (for "N more" summaries)
   - `projects` -- active projects from memory-utils
   - `neglected` -- active/planned projects untouched for 14+ days
   - `inboxCount` -- notes awaiting triage in 00 - Inbox/
   - `insights` -- top 5 insights with confidence >= 0.5
   - `memoryContent` -- raw MEMORY.md for additional context
   - `vaultStats` -- total notes and last scan timestamp

3. **Format as calm executive briefing.** Claude composes the output naturally from the data -- this is not a rigid template. The tone should be informative and calm, not alarming.

4. **Cap output at 15-20 lines.** Use "N more items" summaries when lists overflow. Do not dump raw data.

5. **Present with clear section headers** but no excessive formatting. Keep it scannable.

## Output Format

Example of a typical briefing:

```
## Daily Briefing -- 2026-03-07

**Recent Changes** (last 48h)
- Modified: [[Website Relaunch]] (project, 2h ago)
- Created: [[Tool -- Docker]] (tool, 5h ago)
- 3 more changes

**Active Projects**
- [[Website Relaunch]] -- high priority, active
- [[API Migration]] -- medium priority, planned

**Needs Attention**
- [[Blog Platform]] -- active but untouched for 23 days
- 4 notes in Inbox awaiting triage

**Suggestions**
- Consider running /triage to classify inbox items
- [[Blog Platform]] may need status update to on-hold
```

## Governance

This skill is **READ-ONLY**. The /briefing command never modifies vault files, indexes, or memory. All data is gathered through read operations on existing indexes and files.

| Zone | Action | Classification |
|------|--------|----------------|
| Content | Read vault-index, link-map, MEMORY.md | READ-ONLY |
| Structure | Read folder counts, MOC references | READ-ONLY |
| System | Read .claude/memory/insights.md, scan-state.json | READ-ONLY |

No changelog entry is needed because no modifications occur.

## Utility Module

**File:** `briefing-utils.cjs`

Provides data aggregation functions used during the execution flow:

```javascript
const { gatherBriefingData, getRecentChanges, getStaleProjects } = require('./.agents/skills/briefing/briefing-utils.cjs');
```

### Function Signatures

**`gatherBriefingData(vaultRoot)`**
Main entry point. Returns a structured object containing all data Claude needs to compose the briefing. Aggregates recent changes, projects, neglected items, inbox count, insights, memory content, and vault stats.

**`getRecentChanges(vaultIndex, lookbackMs?)`**
Extracts notes modified within the lookback window from the vault index. Default lookback is 48 hours. Returns array sorted by mtime descending (newest first). Excludes templates, .claude/ system files, and 06 - Atlas/ navigation notes.

**`getStaleProjects(vaultIndex, staleDays?)`**
Finds active or planned projects with mtime older than the stale threshold (default 14 days). Returns array sorted oldest-first (most neglected at top).

### Dependencies

- `scan/utils.cjs` -- `loadJson` for reading JSON indexes
- `memory/memory-utils.cjs` -- `getActiveProjects` for project list, `parseInsights` for insight data

## Edge Cases

- **Empty vault (no notes):** Show "No notes found. Try /create to get started."
- **No recent changes:** Show "No changes in the last 48 hours." and skip the Recent Changes section.
- **No active projects:** Skip the Active Projects section entirely.
- **No neglected items:** Skip the Needs Attention section (this is good news -- nothing is stalled).
- **No insights yet:** Omit the insights context. Briefing works without them.
- **MEMORY.md missing:** Briefing still works -- memory content is optional context for suggestion generation.
- **Indexes stale or missing:** `ensureFreshIndexes` triggers a rescan automatically before gathering data.

## Limitations

- **Suggestions are Claude-composed:** The 1-2 suggestions are generated by Claude reasoning over the data, not computed algorithmically. Quality depends on data richness.
- **No historical trending:** Does not compare today's snapshot to previous briefings. Each briefing is independent.
- **Lookback is time-based:** Uses file modification time from the vault index. Does not detect content-level changes (e.g., a frontmatter-only update counts the same as a full rewrite).
- **Project detection requires frontmatter:** Only notes in `01 - Projects/` with `type: project` frontmatter are recognized as projects. Informal project notes elsewhere are not surfaced.
