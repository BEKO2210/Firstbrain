<p align="center">
  <img src="https://img.shields.io/badge/Obsidian-7C3AED?style=for-the-badge&logo=obsidian&logoColor=white" alt="Obsidian" />
  <img src="https://img.shields.io/badge/Claude_Code-F97316?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude Code" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

<h1 align="center">Firstbrain</h1>

<p align="center">
  <strong>AI-Native Second Brain, Execution Engine &amp; Knowledge Graph</strong><br/>
  <em>You think. Claude organizes, codes, ships, and discovers connections.</em>
</p>

<p align="center">
  <a href="https://github.com/BEKO2210/Firstbrain/releases"><img src="https://img.shields.io/github/v/tag/BEKO2210/Firstbrain?label=version&style=flat-square&color=blue" alt="Version" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-blue?style=flat-square" alt="License: CC BY-NC 4.0" /></a>
  <a href="https://github.com/BEKO2210/Firstbrain/stargazers"><img src="https://img.shields.io/github/stars/BEKO2210/Firstbrain?style=flat-square" alt="Stars" /></a>
  <a href="https://github.com/BEKO2210/Firstbrain/issues"><img src="https://img.shields.io/github/issues/BEKO2210/Firstbrain?style=flat-square" alt="Issues" /></a>
  <img src="https://img.shields.io/badge/skills-15-blueviolet?style=flat-square" alt="15 Skills" />
</p>

<p align="center">
  <a href="#features">Features</a> &bull;
  <a href="#quick-start">Quick Start</a> &bull;
  <a href="#execution-engine">Execution Engine</a> &bull;
  <a href="#knowledge-graph">Knowledge Graph</a> &bull;
  <a href="#skills">Skills</a> &bull;
  <a href="#architecture">Architecture</a> &bull;
  <a href="#governance">Governance</a> &bull;
  <a href="#memory-system">Memory</a>
</p>

---

## What is Firstbrain?

Firstbrain turns an Obsidian vault into an **AI command center**. Claude Code organizes your notes, **executes your instructions** (writing code, creating projects, pushing to GitHub), and **discovers hidden connections** in your knowledge using graph algorithms -- all documented as interconnected markdown.

**Without Claude Code** -- a structured Obsidian starter vault (PARA folders, 12 templates, 9 MOCs).

**With Claude Code** -- a second brain that thinks, builds, ships, and understands its own structure.

> **[Cheatsheet](Cheatsheet.md)** -- All 15 skills with every command, subcommand, and flag. Copy & paste ready.

---

## Features

<p align="center">
  <img src="docs/assets/feat-v3.svg" alt="Features" width="780"/>
</p>

---

## Quick Start

### One-Click Launcher

Double-click to start. The launcher checks Node.js, Claude Code CLI, validates the vault, and launches:

<p align="center">
  <code>start.sh</code> (Linux/macOS) &nbsp;&bull;&nbsp; <code>start.bat</code> (Windows) &nbsp;&bull;&nbsp; <code>start.command</code> (macOS Finder)
</p>

### Manual Setup

<p align="center">
  <img src="docs/assets/start-v3.svg" alt="Quick Start" width="780"/>
</p>

---

## Execution Engine

<p align="center">
  <img src="docs/assets/exec-v3.svg" alt="Execution Engine" width="780"/>
</p>

---

## Knowledge Graph

Built-in graph engine analyzes your vault's structure with zero external dependencies.

**`/graph`** -- PageRank ranking, topic clusters, shortest paths, bridge detection, structural similarity, multi-hop discovery. Read-only, never modifies files.

**`/propose`** -- Finds emergent patterns and suggests improvements: new MOCs for tag clusters (5+ notes), missed connections (3+ shared tags, no link), hub candidates (high PageRank notes), orphan rescue (isolated notes matched to best links). All proposals require user approval.

**`/connect` v3** -- Three signal layers: direct (tags + links), multi-hop (2-3 hops via graph), structural similarity (Jaccard on neighborhoods).

---

## Skills

<p align="center">
  <img src="docs/assets/skills-v3a.svg" alt="Skills" width="780"/>
</p>

---

## Architecture

### Vault Structure

<p align="center">
  <img src="docs/assets/vault-v3.svg" alt="Vault Structure" width="780"/>
</p>

### Scanning Pipeline

<p align="center">
  <img src="docs/assets/scan-v3.svg" alt="Scanning Pipeline" width="720"/>
</p>

---

## Governance

<p align="center">
  <img src="docs/assets/gov-v3.svg" alt="Governance" width="780"/>
</p>

---

## Memory System

<p align="center">
  <img src="docs/assets/mem-v3.svg" alt="Memory Architecture" width="620"/>
</p>

---

## Roadmap

- [x] **v1.0** -- Foundation, scanning, 7 core skills, semantic search, 4-layer memory *(2026-03-07)*
- [x] **v1.1** -- Proactive Intelligence: `/briefing`, `/triage`, `/synthesize`, `/maintain` *(2026-03-08)*
- [x] **v2.0** -- Execution Engine, `/process`, `/watch`, `workspace/`, `ACTION:`/`TASK:` markers, guided onboarding, prompt injection defense *(2026-04-07)*
- [x] **v3.0** -- Knowledge Graph Engine, `/graph` (PageRank, clusters, bridges, paths), `/propose` (emergent structure), `/connect` v3 (multi-hop + structural similarity) *(2026-04-07)*
- [ ] **v4.0** -- Temporal analysis, automated weekly digests, cross-vault federation

---

## Contributing

Ideas, bugs, or new templates? See [CONTRIBUTING.md](CONTRIBUTING.md).

```bash
git clone https://github.com/YOUR_USERNAME/Firstbrain.git
cd Firstbrain && git checkout -b feature/my-feature
# Make changes, then:
git commit -m "feat: add my feature" && git push origin feature/my-feature
```

---

## License

[CC BY-NC 4.0](LICENSE) -- Free for personal and non-commercial use. For commercial licensing, [contact the author](https://github.com/BEKO2210).

---

<p align="center">
  <sub>Built with Obsidian + Claude Code</sub>
</p>
