---
name: memory
trigger: /memory
description: View and manage Claude's memory -- insights, project context, and embedding status
version: 3.0.0
---

# /memory -- Memory Dashboard

A single entry point to understand what Claude knows -- "a dashboard for your AI's brain." Shows working memory summary, long-term insights, active project memories, and embedding index status.

## Usage

- `/memory` -- Show full memory dashboard (default overview)
- `/memory insights` -- Show only long-term insights with details
- `/memory projects` -- Show only project memories
- `/memory distill` -- Manually trigger insight distillation (normally happens automatically during significant vault activity)

## Memory Architecture Overview

Claude operates with a four-layer memory model:

| Layer | Name | Storage | Persistence |
|-------|------|---------|-------------|
| 1 | Session Memory | In-context | Single conversation |
| 2 | Working Memory | MEMORY.md + .claude/memory/ topic files | Cross-session |
| 3 | Long-term Summary Memory | .claude/memory/insights.md | Weeks/months |
| 4 | Project-specific Memory | .claude/memory/project-{name}.md files | Project lifetime |

- **Layer 1:** Automatic -- Claude tracks discussion context within a single conversation.
- **Layer 2:** MEMORY.md at vault root (under 50 lines) plus topic files for detailed per-area context.
- **Layer 3:** insights.md distills recurring patterns, themes, and organizational habits with confidence scores.
- **Layer 4:** Individual project memory files track status, decisions, blockers, and next actions per project.

## Execution Flow: `/memory` (overview)

1. Load `memory-utils.cjs`:
   ```javascript
   const { generateMemoryOverview } = require('./.agents/skills/memory/memory-utils.cjs');
   ```
2. Call `generateMemoryOverview('.')`.
3. Present formatted dashboard to user.

Output includes: working memory summary, insight count + categories + top entries, active project memories with status, embedding index status.

## Execution Flow: `/memory insights`

1. Load and parse insights.md:
   ```javascript
   const { parseInsights } = require('./.agents/skills/memory/memory-utils.cjs');
   const data = parseInsights('.');
   ```
2. Display all categories with full insight details (title, observation, confidence, observation count, last seen).
3. Sort by confidence descending within each category.

## Execution Flow: `/memory projects`

1. List all `.claude/memory/project-*.md` files.
2. For each file, display project name, status, last updated date.
3. If archive directory exists, note archived projects.

## Execution Flow: `/memory distill`

1. Ensure fresh indexes: run `/scan` if indexes are stale.
2. Load vault-index.json and tag-index.json:
   ```javascript
   const { loadJson } = require('./.agents/skills/scan/utils.cjs');
   const vaultIndex = loadJson('.claude/indexes/vault-index.json');
   const tagIndex = loadJson('.claude/indexes/tag-index.json');
   ```
3. Gather activity log from session actions.
4. Call distillation:
   ```javascript
   const { distillInsights } = require('./.agents/skills/memory/memory-utils.cjs');
   const result = distillInsights('.', vaultIndex, tagIndex, { activityLog });
   ```
5. Report: "Distilled insights: {added} new, {reinforced} reinforced, {decayed} decayed, {pruned} pruned. Total: {total}"
6. If significant new insights found, display them with "Pattern noticed:" callout format.

## Automatic Distillation Triggers

Claude should distill without being asked when either threshold is met:

- **Activity volume:** 10+ note changes in a session (creates, edits, moves).
- **Topic density:** 3+ notes sharing the same tag cluster detected.

Either signal meeting threshold triggers distillation. These are guidelines -- Claude uses judgment on when to run distillation and when to stay silent.

**Notification policy:** Notify for significant updates (new patterns, high-confidence reinforcements). Stay silent for minor ones (small confidence adjustments, no new insights). This is at Claude's discretion.

## Insight Surfacing

When proactively surfacing insights during conversation, use a distinct visual callout block:

> **Pattern noticed:** You frequently tag tool notes with both the tool name and #productivity.
> Want me to apply this pattern to your new Docker note?

Rules for surfacing:
- Only surface insights with confidence >= 0.5
- Use the callout block format -- never weave insights into conversation text
- Keep surfacing brief -- one callout per topic, not a flood
- Ask before applying insight-based suggestions

## Project Memory Lifecycle

### Creation
- Created automatically when Claude first interacts with a project note.
- Projects identified from vault-index: notes in `01 - Projects/` with `type: project` frontmatter.
- Each project gets `.claude/memory/project-{slug}.md` with: status, key decisions, blockers, next actions, source link.

### Updates
- Updated when project status changes, decisions are made, or blockers arise.
- Claude writes context during natural project interaction -- not a separate step.
- Frontmatter `updated` field tracks last modification date.

### Archive
- When project status changes to 'completed', the memory file is archived:
  1. File copies to `.claude/memory/archive/project-{slug}.md` (never deleted -- governance)
  2. Key decisions and context are distilled into insights.md as "Project Lessons" category entries
  3. Lessons start at confidence 0.6 (higher than default -- concrete observations)
  4. Archived file's frontmatter status updates to 'archived'

```javascript
const { archiveProjectMemory } = require('./.agents/skills/memory/memory-utils.cjs');
const result = archiveProjectMemory('.', 'website-relaunch');
// { archived: true, path: '...', lessonsDistilled: 3 }
```

### Structure
Individual files per project. Each tracks:
- **Current Status** -- active/on-hold/blocked with context
- **Key Decisions** -- decisions made during the project
- **Blockers** -- current impediments
- **Next Actions** -- what needs to happen next
- **Context** -- source note link and accumulated context

## User Editing

insights.md is plain markdown -- the user can edit, correct, or delete entries directly. Claude respects all user modifications on next read. No special format required beyond the H2/H3 heading structure.

If the user corrects an insight's observation text or confidence, Claude uses the updated values going forward. If the user deletes an insight, Claude does not recreate it unless the pattern re-emerges strongly.

## Code Example

```javascript
const {
  generateMemoryOverview,
  distillInsights,
  parseInsights,
  createProjectMemory,
  archiveProjectMemory,
  getActiveProjects,
} = require('./.agents/skills/memory/memory-utils.cjs');
const { loadJson } = require('./.agents/skills/scan/utils.cjs');

// Show dashboard
const dashboard = generateMemoryOverview('.');
console.log(dashboard);

// Manually distill
const vaultIndex = loadJson('.claude/indexes/vault-index.json');
const tagIndex = loadJson('.claude/indexes/tag-index.json');
const result = distillInsights('.', vaultIndex, tagIndex, { activityLog: [] });

// Create project memory
const projects = getActiveProjects('.');
for (const project of projects) {
  createProjectMemory('.', project);
}
```

## Limitations

- Insight distillation is heuristic-based (tag/folder/type distributions), not ML-based. Patterns are statistical, not semantic.
- Pattern detection requires accumulated vault activity -- new vaults will have few insights initially.
- Project memory is manual-ish: Claude writes context when interacting with projects, but does not auto-scan all project notes on every session start.
- Confidence scores are approximations. User corrections via direct editing are the authoritative source of truth.
- Tag cluster detection uses pairwise comparison, which scales quadratically with tag count. Very large tag sets (500+) may be slow.
