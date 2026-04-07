/**
 * Graph Engine -- builds and analyzes a knowledge graph from vault indexes.
 *
 * Zero external dependencies -- Node.js built-ins only.
 * Operates on vault-index.json and link-map.json produced by the scanner.
 */
'use strict';

const fs = require('fs');
const path = require('path');

// ─── Graph Construction ──────────────────────────────────────────────

/**
 * Build a directed graph from vault indexes.
 * Nodes = notes, Edges = resolved wiki-links.
 *
 * @param {object} vaultIndex - Parsed vault-index.json (has .notes)
 * @param {object} linkMap - Parsed link-map.json (has .links)
 * @returns {{ nodes: Map, edges: object[], adjacency: Map, reverseAdj: Map }}
 */
function buildGraph(vaultIndex, linkMap) {
  const notes = vaultIndex.notes || vaultIndex;
  const nodes = new Map(); // path -> { name, type, tags, linkCount }
  const edges = [];        // { source, target, sourcePath, targetPath }
  const adjacency = new Map();    // path -> Set<path>  (outgoing)
  const reverseAdj = new Map();   // path -> Set<path>  (incoming)

  // Build nodes
  for (const [notePath, note] of Object.entries(notes)) {
    if (note.isTemplate) continue;
    nodes.set(notePath, {
      name: note.name,
      type: note.type || 'unknown',
      tags: note.allTags || note.tags || [],
      linkCount: (note.links || []).length,
    });
    adjacency.set(notePath, new Set());
    reverseAdj.set(notePath, new Set());
  }

  // Build edges from link-map (only resolved links between real notes)
  const links = linkMap.links || [];
  for (const link of links) {
    if (!link.resolved || !link.targetPath) continue;
    if (!nodes.has(link.source) || !nodes.has(link.targetPath)) continue;

    edges.push({
      source: link.source,
      target: link.targetPath,
    });

    adjacency.get(link.source).add(link.targetPath);
    if (reverseAdj.has(link.targetPath)) {
      reverseAdj.get(link.targetPath).add(link.source);
    }
  }

  return { nodes, edges, adjacency, reverseAdj };
}

// ─── Centrality Metrics ──────────────────────────────────────────────

/**
 * Compute degree centrality for all nodes.
 * Returns combined (in + out) degree normalized by (N-1).
 *
 * @param {{ nodes: Map, adjacency: Map, reverseAdj: Map }} graph
 * @returns {Map<string, number>} path -> centrality score (0-1)
 */
function degreeCentrality(graph) {
  const { nodes, adjacency, reverseAdj } = graph;
  const n = nodes.size;
  if (n <= 1) return new Map();

  const result = new Map();
  for (const nodePath of nodes.keys()) {
    const outDeg = adjacency.has(nodePath) ? adjacency.get(nodePath).size : 0;
    const inDeg = reverseAdj.has(nodePath) ? reverseAdj.get(nodePath).size : 0;
    result.set(nodePath, (outDeg + inDeg) / (n - 1));
  }
  return result;
}

/**
 * Compute PageRank scores.
 * Iterative algorithm with damping factor.
 *
 * @param {{ nodes: Map, adjacency: Map, reverseAdj: Map }} graph
 * @param {{ damping?: number, iterations?: number }} options
 * @returns {Map<string, number>} path -> pagerank score
 */
function pageRank(graph, options = {}) {
  const { damping = 0.85, iterations = 30 } = options;
  const { nodes, adjacency, reverseAdj } = graph;
  const n = nodes.size;
  if (n === 0) return new Map();

  const paths = [...nodes.keys()];
  const scores = new Map();
  const initial = 1 / n;

  for (const p of paths) scores.set(p, initial);

  for (let i = 0; i < iterations; i++) {
    const newScores = new Map();

    for (const p of paths) {
      let rank = (1 - damping) / n;
      const inbound = reverseAdj.get(p);
      if (inbound) {
        for (const src of inbound) {
          const outDeg = adjacency.get(src) ? adjacency.get(src).size : 1;
          rank += damping * (scores.get(src) || 0) / outDeg;
        }
      }
      newScores.set(p, rank);
    }

    scores.clear();
    for (const [k, v] of newScores) scores.set(k, v);
  }

  return scores;
}

// ─── Cluster Detection ───────────────────────────────────────────────

/**
 * Find connected components (treating graph as undirected).
 *
 * @param {{ nodes: Map, adjacency: Map, reverseAdj: Map }} graph
 * @returns {string[][]} Array of components, each is array of paths
 */
function findComponents(graph) {
  const { nodes, adjacency, reverseAdj } = graph;
  const visited = new Set();
  const components = [];

  for (const nodePath of nodes.keys()) {
    if (visited.has(nodePath)) continue;

    const component = [];
    const queue = [nodePath];
    visited.add(nodePath);

    while (queue.length > 0) {
      const current = queue.shift();
      component.push(current);

      // Follow both directions (undirected)
      const neighbors = new Set();
      if (adjacency.has(current)) {
        for (const n of adjacency.get(current)) neighbors.add(n);
      }
      if (reverseAdj.has(current)) {
        for (const n of reverseAdj.get(current)) neighbors.add(n);
      }

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && nodes.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    components.push(component);
  }

  return components.sort((a, b) => b.length - a.length);
}

/**
 * Find topic clusters by grouping notes with shared tags.
 * Uses a simple union-find approach on tag co-occurrence.
 *
 * @param {object} vaultIndex - Parsed vault-index.json
 * @param {object} tagIndex - Parsed tag-index.json
 * @param {{ minClusterSize?: number, excludeTags?: string[] }} options
 * @returns {{ tag: string, notes: string[], size: number }[]}
 */
function findTagClusters(vaultIndex, tagIndex, options = {}) {
  const { minClusterSize = 3, excludeTags = ['navigation', 'moc', 'daily', 'guide', 'system', 'home'] } = options;
  const tags = tagIndex.tags || {};
  const notes = vaultIndex.notes || vaultIndex;

  const clusters = [];
  for (const [tag, notePaths] of Object.entries(tags)) {
    if (excludeTags.includes(tag)) continue;

    // Filter to real content notes (no templates, no MOCs, no system)
    const contentNotes = notePaths.filter(p => {
      const note = notes[p];
      if (!note) return false;
      if (note.isTemplate) return false;
      if (note.type === 'moc' || note.type === 'system' || note.type === 'home') return false;
      return true;
    });

    if (contentNotes.length >= minClusterSize) {
      clusters.push({
        tag,
        notes: contentNotes,
        size: contentNotes.length,
      });
    }
  }

  return clusters.sort((a, b) => b.size - a.size);
}

// ─── Path Finding ────────────────────────────────────────────────────

/**
 * Find shortest path between two notes using BFS (undirected).
 *
 * @param {{ nodes: Map, adjacency: Map, reverseAdj: Map }} graph
 * @param {string} startPath - Source note path
 * @param {string} endPath - Target note path
 * @returns {string[] | null} Array of paths from start to end, or null if no path
 */
function shortestPath(graph, startPath, endPath) {
  const { nodes, adjacency, reverseAdj } = graph;
  if (!nodes.has(startPath) || !nodes.has(endPath)) return null;
  if (startPath === endPath) return [startPath];

  const visited = new Set([startPath]);
  const queue = [[startPath]];

  while (queue.length > 0) {
    const currentPath = queue.shift();
    const current = currentPath[currentPath.length - 1];

    const neighbors = new Set();
    if (adjacency.has(current)) {
      for (const n of adjacency.get(current)) neighbors.add(n);
    }
    if (reverseAdj.has(current)) {
      for (const n of reverseAdj.get(current)) neighbors.add(n);
    }

    for (const neighbor of neighbors) {
      if (neighbor === endPath) return [...currentPath, neighbor];
      if (!visited.has(neighbor) && nodes.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...currentPath, neighbor]);
      }
    }
  }

  return null; // No path found
}

// ─── Bridge Detection ────────────────────────────────────────────────

/**
 * Find bridge notes -- nodes whose removal increases the number of components.
 * These are important connecting notes between otherwise separate clusters.
 *
 * @param {{ nodes: Map, adjacency: Map, reverseAdj: Map }} graph
 * @returns {{ path: string, name: string, componentsBefore: number, componentsAfter: number }[]}
 */
function findBridgeNotes(graph) {
  const { nodes } = graph;
  const baseComponents = findComponents(graph).length;
  const bridges = [];

  for (const [nodePath, nodeData] of nodes) {
    // Skip templates, MOCs, system
    if (nodeData.type === 'moc' || nodeData.type === 'system' || nodeData.type === 'home') continue;

    // Simulate removal: rebuild graph without this node
    const reducedNodes = new Map(nodes);
    reducedNodes.delete(nodePath);

    const reducedAdj = new Map();
    const reducedRev = new Map();
    for (const [p, neighbors] of graph.adjacency) {
      if (p === nodePath) continue;
      const filtered = new Set();
      for (const n of neighbors) {
        if (n !== nodePath) filtered.add(n);
      }
      reducedAdj.set(p, filtered);
    }
    for (const [p, neighbors] of graph.reverseAdj) {
      if (p === nodePath) continue;
      const filtered = new Set();
      for (const n of neighbors) {
        if (n !== nodePath) filtered.add(n);
      }
      reducedRev.set(p, filtered);
    }

    const reduced = { nodes: reducedNodes, adjacency: reducedAdj, reverseAdj: reducedRev };
    const newComponents = findComponents(reduced).length;

    if (newComponents > baseComponents) {
      bridges.push({
        path: nodePath,
        name: nodeData.name,
        componentsBefore: baseComponents,
        componentsAfter: newComponents,
        impact: newComponents - baseComponents,
      });
    }
  }

  return bridges.sort((a, b) => b.impact - a.impact);
}

// ─── Multi-Hop Connections ───────────────────────────────────────────

/**
 * Find notes reachable within N hops that are NOT directly linked.
 * These are "hidden" connections the user might want to make explicit.
 *
 * @param {{ nodes: Map, adjacency: Map, reverseAdj: Map }} graph
 * @param {string} startPath - Source note path
 * @param {{ maxHops?: number, maxResults?: number }} options
 * @returns {{ path: string, name: string, hops: number, via: string[] }[]}
 */
function findMultiHopConnections(graph, startPath, options = {}) {
  const { maxHops = 3, maxResults = 20 } = options;
  const { nodes, adjacency, reverseAdj } = graph;
  if (!nodes.has(startPath)) return [];

  // Direct neighbors (to exclude from results)
  const directNeighbors = new Set();
  if (adjacency.has(startPath)) {
    for (const n of adjacency.get(startPath)) directNeighbors.add(n);
  }
  if (reverseAdj.has(startPath)) {
    for (const n of reverseAdj.get(startPath)) directNeighbors.add(n);
  }

  // BFS with path tracking
  const visited = new Map(); // path -> { hops, via }
  visited.set(startPath, { hops: 0, via: [] });
  const queue = [{ path: startPath, hops: 0, via: [] }];
  const results = [];

  while (queue.length > 0) {
    const { path: current, hops, via } = queue.shift();
    if (hops >= maxHops) continue;

    const neighbors = new Set();
    if (adjacency.has(current)) {
      for (const n of adjacency.get(current)) neighbors.add(n);
    }
    if (reverseAdj.has(current)) {
      for (const n of reverseAdj.get(current)) neighbors.add(n);
    }

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) continue;
      if (!nodes.has(neighbor)) continue;

      const newVia = [...via, current];
      const newHops = hops + 1;
      visited.set(neighbor, { hops: newHops, via: newVia });

      // Only include if NOT a direct neighbor and NOT the start
      if (!directNeighbors.has(neighbor) && neighbor !== startPath) {
        const node = nodes.get(neighbor);
        if (node.type !== 'moc' && node.type !== 'system' && node.type !== 'home') {
          results.push({
            path: neighbor,
            name: node.name,
            type: node.type,
            hops: newHops,
            via: newVia.slice(1).map(p => nodes.get(p)?.name || p),
          });
        }
      }

      queue.push({ path: neighbor, hops: newHops, via: newVia });
    }
  }

  // Sort by hops (closer = more relevant), then by name
  return results.sort((a, b) => a.hops - b.hops || a.name.localeCompare(b.name)).slice(0, maxResults);
}

// ─── Structural Similarity ──────────────────────────────────────────

/**
 * Find notes with similar connection patterns (structural equivalence).
 * Two notes are structurally similar if they link to/from the same notes.
 *
 * @param {{ nodes: Map, adjacency: Map, reverseAdj: Map }} graph
 * @param {string} targetPath - Note to find similar notes for
 * @param {{ minSimilarity?: number, maxResults?: number }} options
 * @returns {{ path: string, name: string, similarity: number, sharedNeighbors: string[] }[]}
 */
function findStructurallySimilar(graph, targetPath, options = {}) {
  const { minSimilarity = 0.2, maxResults = 10 } = options;
  const { nodes, adjacency, reverseAdj } = graph;
  if (!nodes.has(targetPath)) return [];

  // Get target's full neighborhood
  const targetNeighbors = new Set();
  if (adjacency.has(targetPath)) {
    for (const n of adjacency.get(targetPath)) targetNeighbors.add(n);
  }
  if (reverseAdj.has(targetPath)) {
    for (const n of reverseAdj.get(targetPath)) targetNeighbors.add(n);
  }

  if (targetNeighbors.size === 0) return [];

  const results = [];
  for (const [candidatePath, candidateData] of nodes) {
    if (candidatePath === targetPath) continue;
    if (candidateData.type === 'moc' || candidateData.type === 'system') continue;

    // Get candidate's neighborhood
    const candidateNeighbors = new Set();
    if (adjacency.has(candidatePath)) {
      for (const n of adjacency.get(candidatePath)) candidateNeighbors.add(n);
    }
    if (reverseAdj.has(candidatePath)) {
      for (const n of reverseAdj.get(candidatePath)) candidateNeighbors.add(n);
    }

    if (candidateNeighbors.size === 0) continue;

    // Jaccard similarity
    const intersection = [];
    for (const n of targetNeighbors) {
      if (candidateNeighbors.has(n)) intersection.push(n);
    }
    const unionSize = new Set([...targetNeighbors, ...candidateNeighbors]).size;
    const similarity = unionSize > 0 ? intersection.length / unionSize : 0;

    if (similarity >= minSimilarity) {
      results.push({
        path: candidatePath,
        name: candidateData.name,
        type: candidateData.type,
        similarity: Math.round(similarity * 100) / 100,
        sharedNeighbors: intersection.map(p => nodes.get(p)?.name || p),
      });
    }
  }

  return results.sort((a, b) => b.similarity - a.similarity).slice(0, maxResults);
}

// ─── Graph Statistics ────────────────────────────────────────────────

/**
 * Compute comprehensive graph statistics.
 *
 * @param {{ nodes: Map, edges: object[], adjacency: Map, reverseAdj: Map }} graph
 * @returns {object} Statistics summary
 */
function graphStats(graph) {
  const { nodes, edges, adjacency, reverseAdj } = graph;
  const n = nodes.size;
  const e = edges.length;

  // Type distribution
  const typeCount = {};
  for (const [, data] of nodes) {
    const t = data.type || 'unknown';
    typeCount[t] = (typeCount[t] || 0) + 1;
  }

  // Degree distribution
  let maxInDeg = 0, maxOutDeg = 0, maxInNode = '', maxOutNode = '';
  let totalDeg = 0;
  const orphans = [];

  for (const [nodePath, data] of nodes) {
    const outDeg = adjacency.has(nodePath) ? adjacency.get(nodePath).size : 0;
    const inDeg = reverseAdj.has(nodePath) ? reverseAdj.get(nodePath).size : 0;
    totalDeg += outDeg + inDeg;

    if (inDeg > maxInDeg) { maxInDeg = inDeg; maxInNode = data.name; }
    if (outDeg > maxOutDeg) { maxOutDeg = outDeg; maxOutNode = data.name; }

    if (inDeg === 0 && outDeg <= 1 && data.type !== 'moc' && data.type !== 'system' && data.type !== 'home') {
      orphans.push({ path: nodePath, name: data.name, type: data.type });
    }
  }

  const components = findComponents(graph);
  const density = n > 1 ? e / (n * (n - 1)) : 0;

  return {
    nodeCount: n,
    edgeCount: e,
    density: Math.round(density * 10000) / 10000,
    avgDegree: n > 0 ? Math.round((totalDeg / n) * 100) / 100 : 0,
    components: components.length,
    largestComponent: components.length > 0 ? components[0].length : 0,
    orphanCount: orphans.length,
    orphans: orphans.slice(0, 10),
    typeDistribution: typeCount,
    mostLinkedTo: { name: maxInNode, inDegree: maxInDeg },
    mostLinksFrom: { name: maxOutNode, outDegree: maxOutDeg },
  };
}

// ─── Emergent Structure Proposals ────────────────────────────────────

/**
 * Analyze the graph and propose structural improvements.
 *
 * @param {{ nodes: Map, edges: object[], adjacency: Map, reverseAdj: Map }} graph
 * @param {object} vaultIndex
 * @param {object} tagIndex
 * @returns {{ mocSuggestions: object[], missedConnections: object[], hubCandidates: object[], orphanRescue: object[] }}
 */
function proposeStructure(graph, vaultIndex, tagIndex) {
  const { nodes } = graph;
  const notes = vaultIndex.notes || vaultIndex;
  const tags = tagIndex.tags || {};

  // 1. MOC Suggestions: tag clusters with 5+ notes but no existing MOC
  const existingMOCTopics = new Set();
  for (const [, data] of nodes) {
    if (data.type === 'moc') {
      const topicMatch = data.name.replace(/ MOC$/, '').toLowerCase();
      existingMOCTopics.add(topicMatch);
    }
  }

  const mocSuggestions = [];
  for (const [tag, notePaths] of Object.entries(tags)) {
    if (['navigation', 'moc', 'daily', 'guide', 'system', 'home', 'onboarding'].includes(tag)) continue;

    const contentNotes = notePaths.filter(p => {
      const note = notes[p];
      return note && !note.isTemplate && note.type !== 'moc' && note.type !== 'system';
    });

    if (contentNotes.length >= 5 && !existingMOCTopics.has(tag)) {
      mocSuggestions.push({
        tag,
        noteCount: contentNotes.length,
        sampleNotes: contentNotes.slice(0, 5).map(p => notes[p]?.name || p),
        suggestedName: `${tag.charAt(0).toUpperCase() + tag.slice(1)} MOC`,
      });
    }
  }

  // 2. Missed Connections: notes sharing 3+ tags but not linked
  const missedConnections = [];
  const noteList = [...nodes.entries()].filter(([, d]) => d.type !== 'moc' && d.type !== 'system');

  for (let i = 0; i < noteList.length; i++) {
    for (let j = i + 1; j < noteList.length; j++) {
      const [pathA, dataA] = noteList[i];
      const [pathB, dataB] = noteList[j];

      // Check if already linked
      const aLinksB = graph.adjacency.has(pathA) && graph.adjacency.get(pathA).has(pathB);
      const bLinksA = graph.adjacency.has(pathB) && graph.adjacency.get(pathB).has(pathA);
      if (aLinksB || bLinksA) continue;

      // Count shared tags
      const sharedTags = dataA.tags.filter(t => dataB.tags.includes(t));
      if (sharedTags.length >= 3) {
        missedConnections.push({
          noteA: { path: pathA, name: dataA.name },
          noteB: { path: pathB, name: dataB.name },
          sharedTags,
          strength: sharedTags.length,
        });
      }
    }
  }
  missedConnections.sort((a, b) => b.strength - a.strength);

  // 3. Hub Candidates: high PageRank + high degree but NOT a MOC
  const pr = pageRank(graph);
  const dc = degreeCentrality(graph);
  const hubCandidates = [];

  for (const [nodePath, data] of nodes) {
    if (data.type === 'moc' || data.type === 'system' || data.type === 'home') continue;
    const prScore = pr.get(nodePath) || 0;
    const dcScore = dc.get(nodePath) || 0;

    // Threshold: top performers in both metrics
    if (prScore > (1 / nodes.size) * 2 && dcScore > 0.15) {
      hubCandidates.push({
        path: nodePath,
        name: data.name,
        type: data.type,
        pageRank: Math.round(prScore * 10000) / 10000,
        degreeCentrality: Math.round(dcScore * 100) / 100,
        suggestion: `Consider promoting "${data.name}" to a MOC or hub note`,
      });
    }
  }
  hubCandidates.sort((a, b) => b.pageRank - a.pageRank);

  // 4. Orphan Rescue: orphan notes matched to the best cluster
  const orphans = [];
  for (const [nodePath, data] of nodes) {
    if (data.type === 'moc' || data.type === 'system' || data.type === 'home') continue;
    const inDeg = graph.reverseAdj.has(nodePath) ? graph.reverseAdj.get(nodePath).size : 0;
    const outDeg = graph.adjacency.has(nodePath) ? graph.adjacency.get(nodePath).size : 0;

    if (inDeg === 0 && outDeg <= 1) {
      // Find best matching notes by tag overlap
      const matches = [];
      for (const [candidatePath, candidateData] of nodes) {
        if (candidatePath === nodePath) continue;
        if (candidateData.type === 'moc' || candidateData.type === 'system') continue;
        const shared = data.tags.filter(t => candidateData.tags.includes(t));
        if (shared.length > 0) {
          matches.push({ path: candidatePath, name: candidateData.name, sharedTags: shared.length });
        }
      }
      matches.sort((a, b) => b.sharedTags - a.sharedTags);

      orphans.push({
        path: nodePath,
        name: data.name,
        type: data.type,
        suggestedLinks: matches.slice(0, 3),
      });
    }
  }

  return {
    mocSuggestions: mocSuggestions.slice(0, 10),
    missedConnections: missedConnections.slice(0, 15),
    hubCandidates: hubCandidates.slice(0, 5),
    orphanRescue: orphans.slice(0, 10),
  };
}

// ─── Loader Helper ───────────────────────────────────────────────────

/**
 * Load indexes and build graph in one call.
 *
 * @param {string} vaultRoot - Path to vault root
 * @returns {{ graph: object, vaultIndex: object, linkMap: object, tagIndex: object }}
 */
function loadAndBuild(vaultRoot) {
  const indexDir = path.join(vaultRoot, '.claude', 'indexes');

  const readJSON = (file) => {
    const fullPath = path.join(indexDir, file);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Index file missing: ${file}. Run /scan first.`);
    }
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  };

  const vaultIndex = readJSON('vault-index.json');
  const linkMap = readJSON('link-map.json');
  const tagIndex = readJSON('tag-index.json');
  const graph = buildGraph(vaultIndex, linkMap);

  return { graph, vaultIndex, linkMap, tagIndex };
}

module.exports = {
  buildGraph,
  degreeCentrality,
  pageRank,
  findComponents,
  findTagClusters,
  shortestPath,
  findBridgeNotes,
  findMultiHopConnections,
  findStructurallySimilar,
  graphStats,
  proposeStructure,
  loadAndBuild,
};
