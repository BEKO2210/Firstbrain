---
type: system
tags:
  - reference
  - commands
  - cheatsheet
---

# Firstbrain Cheatsheet

> All 15 skills with every command, subcommand, and flag. Copy & paste ready.

---

## Core Skills

### /create -- Note Creator

```
/create                              Guided (prompts for type + title)
/create project My App               Create project note
/create tool Docker                   Create tool note
/create zettel My Idea                Create zettel note
/create person John Doe               Create person note
/create decision API Strategy         Create decision note
/create meeting Kickoff 2026-04-07    Create meeting note
/create area Health                   Create area note
/create resource Book Title           Create resource note
/create code-snippet My Snippet       Create code snippet
```

Types: `project` `area` `resource` `tool` `zettel` `person` `decision` `meeting` `code-snippet` `daily` `weekly` `monthly`

---

### /daily -- Daily Note

```
/daily                               Create today's daily note
/daily 2026-04-07                    Create note for specific date
```

Rolls over open tasks from the last 7 days with provenance links.

---

### /scan -- Vault Scanner

```
/scan                                Incremental (only changed files)
/scan --full                         Force re-scan everything
/scan --verbose                      Show per-file details
```

Builds: `vault-index.json` `link-map.json` `tag-index.json`

---

### /search -- Semantic Search

```
/search "productivity"               Search by meaning
/search API design patterns          Multi-word search
```

Uses local embeddings (Transformers.js) if installed, falls back to keyword matching.

---

### /connect -- Connection Discovery

```
/connect                             Analyze note from context
/connect "Tool -- Docker"            Analyze specific note
```

Three signal layers:
1. Direct -- shared tags + link adjacency
2. Multi-hop -- 2-3 hops via graph, not directly linked
3. Structural -- Jaccard similarity on neighborhoods

---

### /health -- Vault Health Check

```
/health                              Full health report
/health --fix                        Auto-fix broken links
```

Detects orphans (0-1 connections) and broken wiki-links. Suggests fixes with Levenshtein matching.

---

### /memory -- Memory Dashboard

```
/memory                              Full dashboard (all layers)
/memory insights                     Long-term insights only
/memory projects                     Project memories only
/memory distill                      Trigger manual distillation
```

Shows all 4 memory layers: Session, Working, Long-term, Project.

---

## Proactive Intelligence

### /briefing -- Daily Briefing

```
/briefing                            Today's summary (48h lookback)
/briefing --days 7                   Extended lookback (7 days)
```

Read-only. Shows: recent changes, priorities, neglected items, suggestions.

---

### /triage -- Inbox Triage

```
/triage                              Classify all inbox notes
/triage --dry-run                    Preview only, no changes
```

Classifies by type, suggests target folder, auto-tags high-confidence items.

---

### /synthesize -- Knowledge Synthesis

```
/synthesize "machine learning"       Synthesize topic
/synthesize --top 5 "Docker"         Limit to top 5 sources
```

Creates a summary zettel with wiki-link citations and AI provenance metadata.

---

### /maintain -- Vault Maintenance

```
/maintain                            Full audit report
/maintain --fix                      Auto-fix safe issues
/maintain --stale-days 60            Custom staleness (default: 30)
```

Checks: frontmatter, tag consistency, stale projects, outdated references.

---

## Execution Engine

### /process -- Command Processor

```
/process                             Execute all inbox prompts/actions
/process --dry-run                   Preview without changes
```

Processes files with markers:

| Marker | Mode |
|--------|------|
| `PROMPT:` | Create vault notes |
| `ACTION:` | Execute code, git, files |
| `TASK:` | Same as ACTION |

---

### /watch -- Inbox Monitor

```
/watch                               Start (polls every 30s)
/watch 10s                           Poll every 10 seconds
/watch 5m                            Poll every 5 minutes
/watch stop                          Stop watching
```

Auto-detects and executes new PROMPT:/ACTION:/TASK: files in Inbox.

Safety: max 10 files/cycle, no recursive loops, injection scanning.

---

## Knowledge Graph

### /graph -- Graph Analysis

```
/graph                               Full statistics
/graph rank                          PageRank importance ranking
/graph clusters                      Topic clusters by tag
/graph path "Note A" "Note B"        Shortest path between notes
/graph bridges                       Critical connecting notes
/graph similar "Note Name"           Structurally similar notes
/graph hops "Note Name"              Hidden connections (2-3 hops)
```

All read-only -- analyzes but never modifies files.

---

### /propose -- Emergent Structure

```
/propose                             Full analysis (all 4 types)
/propose mocs                        MOC suggestions only
/propose connections                 Missed connections only
/propose hubs                        Hub candidates only
/propose orphans                     Orphan rescue only
```

All proposals are displayed for review -- never auto-applied.

---

## Action File Format

Drop these in `00 - Inbox/` for `/process` or `/watch` to pick up:

```markdown
---
type: action
project: "[[Project Name]]"
priority: high
---

ACTION: Your instructions here.
Create a Flask API, push to GitHub, etc.
```

---

## Quick Reference

| Skill | Command | Key Flags |
|-------|---------|-----------|
| Create | `/create {type} {title}` | 12 note types |
| Daily | `/daily` | `{YYYY-MM-DD}` |
| Scan | `/scan` | `--full` `--verbose` |
| Search | `/search "{query}"` | semantic + keyword |
| Connect | `/connect "{note}"` | 3 signal layers |
| Health | `/health` | `--fix` |
| Memory | `/memory` | `insights` `projects` `distill` |
| Briefing | `/briefing` | `--days {N}` |
| Triage | `/triage` | `--dry-run` |
| Synthesize | `/synthesize "{topic}"` | `--top {N}` |
| Maintain | `/maintain` | `--fix` `--stale-days {N}` |
| Process | `/process` | `--dry-run` |
| Watch | `/watch` | `{interval}` `stop` |
| Graph | `/graph` | `rank` `clusters` `path` `bridges` `similar` `hops` |
| Propose | `/propose` | `mocs` `connections` `hubs` `orphans` |

---

[[Home]] | [[Workflow Guide]] | [[START HERE]]
