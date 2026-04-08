---
name: watch
description: Watch Inbox for new action/prompt files and execute them automatically
version: 3.0.0
triggers:
  - /watch
  - /dashboard
---

# Watch -- Inbox Monitor & Auto-Executor

## What it does

Polls `00 - Inbox/` for new files with `PROMPT:`, `ACTION:`, or `TASK:` markers. When found, executes them immediately using `/process` logic.

## Usage

```
/watch              → Start watching (default: check every 30 seconds)
/watch 10s          → Check every 10 seconds
/watch 5m           → Check every 5 minutes
/watch stop         → Stop watching
```

## Behavior

1. **Scan** `00 - Inbox/` for `.md` files (skip Daily Notes/)
2. **Filter** files that start with PROMPT:, ACTION:, or TASK: (after frontmatter)
3. **Execute** each file according to its marker type (see process.md rule)
4. **Report** what was done in a brief summary
5. **Wait** for the configured interval
6. **Repeat** from step 1

## Watch Output

After each scan cycle, show a one-line status:

- If nothing found: `[watch] 14:30 -- Inbox clean`
- If action found: `[watch] 14:30 -- Executed: "Set up Flask API" → 8 files created`

## Stop Conditions

- User types `/watch stop` or `stop`
- User types any other command (watch pauses, command runs, watch resumes)
- Session ends

## Safety Limits

- **Max 10 files per cycle.** If more than 10 actionable files found, process 10 and ask user before continuing.
- **No recursive execution.** If an action creates a new file in Inbox, do NOT process it in the same cycle. Wait for next cycle.
- **Mark processed files.** Track processed filenames to prevent double-execution. Reset on `/watch stop`.
- **Injection scanning.** Every file goes through the security checks in `process.md` before execution.
- **Timeout.** If a single action takes >5 minutes, pause watch and report status to user.

## Implementation Note

This skill uses Claude Code's `/loop` mechanism or manual polling. Claude reads the Inbox, processes files, and waits. The user can continue chatting -- watch runs between interactions.
