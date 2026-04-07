---
type: system
tags:
  - system
  - guide
---

# Workflow Guide

> How to use this Second Brain system effectively.

## The PARA Principle

This system is based on **PARA** by Tiago Forte, extended with **Zettelkasten** and **MOCs**.

| Folder | Contents | Timeframe |
|--------|----------|-----------|
| **00 - Inbox** | Everything new, unprocessed | Temporary (empty weekly) |
| **01 - Projects** | Active projects with a clear goal | Limited (weeks/months) |
| **02 - Areas** | Life areas, responsibilities | Ongoing |
| **03 - Resources** | Knowledge, references | Ongoing |
| **04 - Archive** | Completed items | Ongoing (inactive) |

## Daily Workflow

### 1. Capture (anytime)
- New thoughts -> `00 - Inbox`
- Use the **Daily Note** (Ctrl/Cmd+D) for the day

### 2. Process (daily, 10 min)
- Go through the Inbox
- Each note: Is it actionable?
  - **Yes** -> Move to the right project/area
  - **No, but interesting** -> `03 - Resources`
  - **No** -> Delete or `04 - Archive`

### 3. Create (as needed)
- Always create new notes using a template
- Add at least 2 wiki-links per note
- Fill in the frontmatter

### 4. Connect (continuously)
- When creating: "Which existing notes relate to this?"
- Add wiki-links: `[[Note Name]]`
- The **Graph View** (Ctrl/Cmd+G) shows all connections

## Weekly Workflow

Use the **[[Weekly Review]]** template:

1. Empty the Inbox completely
2. Review projects — update statuses
3. Check the calendar for the coming week
4. Prioritize tasks

## Working with Claude Code

### Quick Start

```bash
./start.sh    # or double-click start.bat / start.command
```

### 13 Skills

| Do this | Command |
|---------|---------|
| Build vault indexes | `/scan` |
| Create a note | `/create` |
| Daily note with task rollover | `/daily` |
| Find notes by meaning | `/search` |
| Daily status summary | `/briefing` |
| Classify inbox notes | `/triage` |
| Find orphans and broken links | `/health` |
| Discover connections | `/connect` |
| Synthesize a topic | `/synthesize` |
| Audit vault consistency | `/maintain` |
| View memory dashboard | `/memory` |
| Execute prompts/actions from Inbox | `/process` |
| Auto-monitor Inbox | `/watch` |

### Execution Engine

Firstbrain is also an **execution engine**. Drop instructions in your Inbox:

```markdown
ACTION: Build a REST API with Flask and push to GitHub.
```

Claude executes the instructions: creates `workspace/my-api/`, writes code, commits, pushes, and logs everything in the vault.

- **Vault note** (`01 - Projects/`) = plan, status, decisions
- **Workspace folder** (`workspace/`) = actual code
- Both are linked and kept in sync

### Cross-Project Work
This vault works across projects:

1. **Create a project** -> `/create` or drop ACTION: in Inbox
2. **Link to an area** -> `area: "[[Health]]"` in the frontmatter
3. **Assign resources** -> Wiki-links to `03 - Resources/`
4. **Log meetings** -> `project: "[[My Project]]"` in the meeting
5. **Track decisions** -> Use the Decision template

## Tips

- **Atomic Notes**: One idea = one note (Zettelkasten principle)
- **Own Words**: Always summarize in your own words
- **Links > Folders**: The power lies in the connections, not the folder structure
- **Graph View**: Regularly visualize connections
- **Do not over-polish**: Capture quickly rather than format perfectly

---

[[Home]] | [[Tag Conventions]]
