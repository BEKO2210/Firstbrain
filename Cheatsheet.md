---
type: system
tags:
  - reference
  - commands
  - cheatsheet
---

# Firstbrain Cheatsheet

> All 15 skills. Every command in its own code block. Copy & paste ready.

---

## Core Skills

### /create -- Note Creator

Create a note with guided prompts:
```
/create
```

Create project note:
```
/create project My App
```

Create tool note:
```
/create tool Docker
```

Create zettel (atomic idea):
```
/create zettel My Idea
```

Create person note:
```
/create person John Doe
```

Create decision note:
```
/create decision API Strategy
```

Create meeting note:
```
/create meeting Kickoff 2026-04-07
```

Create area note:
```
/create area Health
```

Create resource note:
```
/create resource Book Title
```

Create code snippet:
```
/create code-snippet My Snippet
```

Types: `project` `area` `resource` `tool` `zettel` `person` `decision` `meeting` `code-snippet` `daily` `weekly` `monthly`

---

### /daily -- Daily Note

Create today's daily note:
```
/daily
```

Create note for a specific date:
```
/daily 2026-04-07
```

---

### /scan -- Vault Scanner

Incremental scan (only changed files):
```
/scan
```

Force full re-scan:
```
/scan --full
```

Scan with per-file details:
```
/scan --verbose
```

---

### /search -- Semantic Search

Search by meaning:
```
/search "productivity"
```

Multi-word search:
```
/search API design patterns
```

---

### /connect -- Connection Discovery

Analyze note from current context:
```
/connect
```

Analyze a specific note:
```
/connect "Tool -- Docker"
```

Three signal layers: direct (tags), multi-hop (2-3 hops), structural (Jaccard).

---

### /health -- Vault Health Check

Full health report:
```
/health
```

Auto-fix broken links:
```
/health --fix
```

---

### /memory -- Memory Dashboard

Full dashboard (all 4 layers):
```
/memory
```

Show long-term insights only:
```
/memory insights
```

Show project memories only:
```
/memory projects
```

Trigger manual insight distillation:
```
/memory distill
```

---

## Proactive Intelligence

### /briefing -- Daily Briefing

Today's summary (48h lookback):
```
/briefing
```

Extended lookback (7 days):
```
/briefing --days 7
```

Read-only. Never modifies vault.

---

### /triage -- Inbox Triage

Classify all inbox notes:
```
/triage
```

Preview only, no changes:
```
/triage --dry-run
```

---

### /synthesize -- Knowledge Synthesis

Synthesize a topic:
```
/synthesize "machine learning"
```

Limit to top 5 sources:
```
/synthesize --top 5 "Docker"
```

Creates a summary zettel with wiki-link citations.

---

### /maintain -- Vault Maintenance

Full audit report:
```
/maintain
```

Auto-fix safe issues:
```
/maintain --fix
```

Custom staleness threshold (default 30 days):
```
/maintain --stale-days 60
```

---

## Execution Engine

### /process -- Command Processor

Execute all inbox prompts and actions:
```
/process
```

Preview without changes:
```
/process --dry-run
```

#### Inbox Markers

PROMPT marker (creates vault notes):
```
PROMPT: Create a project structure for my new app
```

ACTION marker (executes code, git, files):
```
ACTION: Set up a Flask REST API with SQLite and push to GitHub
```

TASK marker (alias for ACTION):
```
TASK: Install dependencies and run tests
```

#### Action File Template

```markdown
---
type: action
project: "[[Project Name]]"
priority: high
---

ACTION: Your instructions here.
Multiple lines are fine.
```

---

### /watch -- Inbox Monitor

Start watching (polls every 30s):
```
/watch
```

Poll every 10 seconds:
```
/watch 10s
```

Poll every 5 minutes:
```
/watch 5m
```

Stop watching:
```
/watch stop
```

---

## Knowledge Graph

### /graph -- Graph Analysis

Full graph statistics:
```
/graph
```

PageRank importance ranking:
```
/graph rank
```

Topic clusters by shared tags:
```
/graph clusters
```

Shortest path between two notes:
```
/graph path "Note A" "Note B"
```

Critical connecting notes:
```
/graph bridges
```

Notes with similar connection patterns:
```
/graph similar "Note Name"
```

Hidden connections 2-3 hops away:
```
/graph hops "Note Name"
```

All read-only. Never modifies files.

---

### /propose -- Emergent Structure

Full analysis (all 4 types):
```
/propose
```

Only MOC suggestions:
```
/propose mocs
```

Only missed connections:
```
/propose connections
```

Only hub candidates:
```
/propose hubs
```

Only orphan rescue:
```
/propose orphans
```

All proposals require user approval. Never auto-applied.

---

## Quick Reference

| Skill | Key Flags / Subcommands |
|-------|------------------------|
| `/create` | `{type} {title}` -- 12 note types |
| `/daily` | `{YYYY-MM-DD}` |
| `/scan` | `--full` `--verbose` |
| `/search` | `"{query}"` |
| `/connect` | `"{note}"` |
| `/health` | `--fix` |
| `/memory` | `insights` `projects` `distill` |
| `/briefing` | `--days {N}` |
| `/triage` | `--dry-run` |
| `/synthesize` | `--top {N}` `"{topic}"` |
| `/maintain` | `--fix` `--stale-days {N}` |
| `/process` | `--dry-run` |
| `/watch` | `{10s\|5m\|...}` `stop` |
| `/graph` | `rank` `clusters` `path` `bridges` `similar` `hops` |
| `/propose` | `mocs` `connections` `hubs` `orphans` |

---

[[Home]] | [[Workflow Guide]] | [[START HERE]]
