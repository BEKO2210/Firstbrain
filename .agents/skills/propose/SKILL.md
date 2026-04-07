---
name: propose
description: Emergent structure proposals -- MOC suggestions, missed connections, hub detection, orphan rescue
version: 3.0.0
triggers:
  - /propose
---

# Propose -- Emergent Structure Intelligence

## What it does

Analyzes the knowledge graph to **propose structural improvements** the user might not see. Finds patterns, gaps, and opportunities in how notes are organized and connected.

## Usage

```
/propose                  → Full analysis (all four proposal types)
/propose mocs             → Only MOC suggestions
/propose connections      → Only missed connections
/propose hubs             → Only hub candidates
/propose orphans          → Only orphan rescue suggestions
```

## Four Proposal Types

### 1. MOC Suggestions

Finds tag clusters with **5+ notes** that have no corresponding MOC. If many notes share a tag but there's no navigation hub for that topic, a new MOC could help.

**Example output:**
```
New MOC suggested: "Docker MOC"
  Tag #docker has 7 notes but no MOC
  Notes: Tool -- Docker, Snippet -- Dockerfile, Project -- Deploy...
```

### 2. Missed Connections

Finds pairs of notes sharing **3+ tags** but NOT linked to each other. These are likely related but the user hasn't made the connection explicit.

**Example output:**
```
Missed connection (4 shared tags):
  "Zettel -- Circuit Breaker" ↔ "Zettel -- Resilience Patterns"
  Shared: #architecture, #patterns, #resilience, #backend
```

### 3. Hub Candidates

Notes with **high PageRank AND high degree centrality** that aren't MOCs. These notes are already acting as hubs -- the user might want to promote them to proper MOCs or navigation notes.

### 4. Orphan Rescue

Notes with **0 incoming links and 0-1 outgoing links**. For each orphan, suggests the best notes to link to based on tag overlap.

**Example output:**
```
Orphan: "Tool -- Podman" (0 links in, 1 out)
  Suggest linking to: Tool -- Docker (3 shared tags), Projects MOC
```

## How it works

1. Ensure fresh indexes (same as /graph)
2. Build graph via `loadAndBuild('.')`
3. Call `proposeStructure(graph, vaultIndex, tagIndex)` from graph-engine.cjs
4. Format proposals as actionable suggestions
5. User selects which proposals to apply

## Governance

- **READ-ONLY analysis.** Proposals are displayed, never auto-applied.
- User explicitly approves each change before Claude modifies any file.
- This is a PROPOSE-level skill -- everything requires user confirmation.
- Creating new MOCs = PROPOSE (new structure)
- Adding links = AUTO (fix broken connections)
