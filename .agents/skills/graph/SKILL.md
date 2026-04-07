---
name: graph
description: Knowledge graph analysis -- statistics, clusters, paths, bridges, PageRank
version: 3.0.0
triggers:
  - /graph
---

# Graph -- Knowledge Graph Analysis

## What it does

Builds a directed graph from vault notes and their wiki-links, then runs graph algorithms to reveal structure, importance, and hidden patterns.

## Usage

```
/graph                    → Full graph statistics
/graph clusters           → Topic clusters by shared tags
/graph rank               → Top notes by PageRank importance
/graph path "Note A" "Note B"  → Shortest path between two notes
/graph bridges            → Notes that connect otherwise separate groups
/graph similar "Note"     → Notes with similar connection patterns
/graph hops "Note"        → Hidden connections 2-3 hops away
```

## How it works

1. Calls `ensureFreshIndexes('.')` from scan utils (rebuild if stale)
2. Loads vault-index.json, link-map.json, tag-index.json
3. Calls `loadAndBuild('.')` from graph-engine.cjs to construct the graph
4. Runs the requested analysis algorithm
5. Formats and presents results

## Algorithms

| Command | Algorithm | What it reveals |
|---------|-----------|----------------|
| (default) | `graphStats()` | Node/edge count, density, components, degree distribution, orphans |
| clusters | `findTagClusters()` | Groups of 3+ notes sharing the same tag |
| rank | `pageRank()` | Notes ranked by structural importance (link authority) |
| path | `shortestPath()` | Minimum hops between any two notes |
| bridges | `findBridgeNotes()` | Notes whose removal would split the graph |
| similar | `findStructurallySimilar()` | Notes linking to/from the same neighbors (Jaccard similarity) |
| hops | `findMultiHopConnections()` | Notes reachable in 2-3 hops but not directly linked |

## Dependencies

```javascript
const { loadAndBuild, graphStats, pageRank, findTagClusters, shortestPath,
        findBridgeNotes, findStructurallySimilar, findMultiHopConnections
      } = require('./.agents/skills/graph/graph-engine.cjs');
const { ensureFreshIndexes } = require('./.agents/skills/connect/connect-utils.cjs');
```

## Output Format

Results are presented as formatted text tables. Example:

```
Knowledge Graph | 57 nodes, 238 edges

Density:    0.074 (sparse -- room to grow)
Components: 2 (1 main + 1 isolated)
Avg degree: 8.35 links per note

Top 5 by PageRank:
  1. Home (0.082)
  2. Universal AI Clothing Kit (0.041)
  3. Projects MOC (0.038)
  ...
```

## Governance

- **AUTO:** Read indexes, compute graph metrics (read-only, no vault changes)
- All graph operations are non-destructive
- Never modifies files -- only analyzes and reports
