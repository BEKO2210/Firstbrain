<p align="center">
  <img src="https://img.shields.io/badge/Obsidian-7C3AED?style=for-the-badge&logo=obsidian&logoColor=white" alt="Obsidian" />
  <img src="https://img.shields.io/badge/Claude_Code-F97316?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude Code" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

<h1 align="center">Firstbrain</h1>

<p align="center">
  <strong>AI-Native Second Brain for Obsidian</strong><br/>
  <em>Claude thinks. You create.</em>
</p>

<p align="center">
  <a href="https://github.com/BEKO2210/Firstbrain/releases"><img src="https://img.shields.io/github/v/tag/BEKO2210/Firstbrain?label=version&style=flat-square&color=blue" alt="Version" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-blue?style=flat-square" alt="License: CC BY-NC 4.0" /></a>
  <a href="https://github.com/BEKO2210/Firstbrain/stargazers"><img src="https://img.shields.io/github/stars/BEKO2210/Firstbrain?style=flat-square" alt="Stars" /></a>
  <a href="https://github.com/BEKO2210/Firstbrain/issues"><img src="https://img.shields.io/github/issues/BEKO2210/Firstbrain?style=flat-square" alt="Issues" /></a>
  <img src="https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square" alt="Zero Dependencies" />
  <img src="https://img.shields.io/badge/skills-7-blueviolet?style=flat-square" alt="7 Skills" />
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> &bull;
  <a href="#skills">Skills</a> &bull;
  <a href="#architecture">Architecture</a> &bull;
  <a href="#templates">Templates</a> &bull;
  <a href="#memory-system">Memory</a> &bull;
  <a href="#contributing">Contributing</a>
</p>

---

## What is Firstbrain?

Firstbrain transforms a plain Obsidian vault into an **AI-native knowledge management system**. Claude Code acts as the cognitive layer — scanning your vault, creating notes from templates, discovering connections between ideas, searching by meaning, and remembering your context across sessions.

**Without Claude Code**, it's a beautifully structured Obsidian starter vault with PARA folders, 12 templates, and 8 Maps of Content.

**With Claude Code**, it becomes a second brain that actively works for you.

```
"Create a tool note about Docker"     → Claude picks the template, fills metadata, suggests links
"What did I write about productivity?" → Semantic search finds notes by meaning, not keywords
"Show me orphan notes"                 → Health check finds disconnected knowledge
```

---

## Features

| Feature | Description |
|---------|-------------|
| **7 Claude Code Skills** | `/create`, `/daily`, `/connect`, `/health`, `/scan`, `/search`, `/memory` |
| **Zero-Dependency Core** | All scanning, parsing, and indexing runs on Node.js built-ins — no `npm install` required |
| **Incremental Scanning** | SHA-256 content hashing detects changes without re-reading the entire vault |
| **Semantic Search** | Local embeddings via Transformers.js + SQLite — your notes never leave your machine |
| **Four-Layer Memory** | Session → Working → Long-term Summary → Project-specific context persistence |
| **Evolution Governance** | Three zones (AUTO / PROPOSE / NEVER) control what Claude can do autonomously |
| **12 Note Templates** | Project, Area, Resource, Tool, Zettel, Person, Decision, Meeting, Code Snippet, Daily, Weekly Review, Monthly Review |
| **8 Maps of Content** | Navigation hubs for Projects, Areas, Resources, Tools, People, Code, Meetings, Decisions |
| **Full Obsidian Compatibility** | Graph view, search, Properties panel, Dataview queries — everything works |

---

## Quick Start

### Prerequisites

| Tool | Version | Required |
|------|---------|----------|
| [Obsidian](https://obsidian.md) | Latest | Yes |
| [Claude Code](https://claude.ai/claude-code) | Latest | For AI features |
| [Node.js](https://nodejs.org) | ≥ 22 | For AI features |
| [Dataview Plugin](https://github.com/blacksmithgu/obsidian-dataview) | Latest | For auto-lists |

### Installation

```bash
# Clone the repository
git clone https://github.com/BEKO2210/Firstbrain.git

# Open as vault in Obsidian
# File → Open Vault → Open folder as vault → Select "Firstbrain"

# Install Dataview plugin
# Settings → Community Plugins → Browse → Search "Dataview" → Install → Enable
```

### Optional: Enable Semantic Search

```bash
cd Firstbrain
npm install    # Installs @huggingface/transformers for local embeddings
```

> Semantic search runs **100% locally** — no API calls, no data leaves your machine. If you skip this step, `/search` falls back to keyword matching.

### First Steps

1. Open `Home.md` — your central dashboard
2. Read `START HERE.md` — onboarding guide
3. Start Claude Code in the vault folder: `claude`
4. Try: *"Create a new project: Learn Rust"*

---

## Skills

Firstbrain ships with **7 Claude Code skills** that understand your vault structure, templates, and conventions.

### `/create` — Create Notes

```
"Create a tool note about Docker"
"New zettel: Why deadlines improve creativity"
"Create a decision note about API strategy"
```

Picks the right template from 12 types, fills frontmatter, substitutes variables, suggests wiki-links, and places the file in the correct folder.

### `/daily` — Daily Notes

```
"Create today's daily note"
```

Creates today's daily note with the Daily Note template. Automatically rolls over open tasks from the past 7 days with provenance links back to originating notes.

### `/connect` — Discover Connections

```
"/connect on Docker note"
```

Analyzes shared tags and wiki-link adjacency to suggest connections you haven't made yet. Returns scored suggestions with evidence explaining *why* notes are related.

### `/health` — Vault Health Check

```
"/health"
```

Detects orphan notes (0–1 connections) and broken wiki-links. Suggests fixes with Levenshtein distance matching. Classifies fixes as AUTO (obvious typos) or PROPOSE (ambiguous matches).

### `/scan` — Index the Vault

```
"/scan"
```

Incrementally scans all markdown files, builds `vault-index.json`, `link-map.json`, and `tag-index.json`. Only re-parses changed files using SHA-256 content hashing.

### `/search` — Semantic Search

```
"Search for notes about productivity systems"
```

Finds notes by **meaning**, not just keywords. Uses local Transformers.js embeddings stored in SQLite. Falls back to keyword matching (tags + title) if embeddings aren't installed.

### `/memory` — Memory Dashboard

```
"/memory"
```

Shows memory status across all four layers: active projects, recent insights, organizational patterns, and distillation triggers. Manage long-term memory and project-specific context.

---

## Architecture

### Vault Structure

```
Firstbrain/
├── 00 - Inbox/              Landing zone for new notes and daily notes
├── 01 - Projects/            Active projects (time-bound, has end date)
├── 02 - Areas/               Life areas (ongoing, no end date)
├── 03 - Resources/           Knowledge, references, learning material
├── 04 - Archive/             Completed or inactive items
├── 05 - Templates/           12 note templates (read-only)
├── 06 - Atlas/MOCs/          8 Maps of Content (navigation hubs)
├── 07 - Extras/              Attachments, Kanban boards, media
├── .agents/skills/           Claude Code skill definitions + utilities
│   ├── connect/              Connection discovery engine
│   ├── create/               Template-based note creation
│   ├── daily/                Daily note with rollover
│   ├── health/               Orphan + broken link detection
│   ├── memory/               Four-layer memory management
│   ├── scan/                 Incremental vault scanner
│   └── search/               Semantic + keyword search
├── .claude/                  AI system config, rules, memory
│   ├── memory/               Working memory + insights + project state
│   └── rules/                Governance rules (naming, linking, frontmatter)
├── CLAUDE.md                 AI-native instructions (loaded on startup)
├── Home.md                   Central dashboard
└── START HERE.md             User onboarding guide
```

### Scanning Pipeline

```
Markdown Files
     │
     ▼
┌─────────┐    ┌──────────┐    ┌───────────────┐
│ parser  │──▶│ scanner  │────│ vault-index   │
│   .cjs  │    │   .cjs   │    │   .json       │
└─────────┘    └──────────┘    └───────────────┘
                    │               │
                    │          ┌────┴────┐
                    │          ▼         ▼
                    │    ┌──────────┐ ┌──────────┐
                    │    │ link-map │ │ tag-index│
                    │    │  .json   │ │  .json   │
                    │    └──────────┘ └──────────┘
                    │
                    ▼
              ┌──────────┐    ┌──────────────┐
              │ embedder │───▶│ embeddings   │
              │   .cjs   │    │   .db        │
              └──────────┘    └──────────────┘
```

### Zero-Dependency Core

The scanning engine, parser, indexer, and all core skills use **only Node.js built-ins** — no external packages. This means:

- No `npm install` needed for core functionality
- No ESM/CJS compatibility issues
- No supply chain risk
- Fast startup (~15ms full scan, ~5ms incremental)

The only optional dependency is `@huggingface/transformers` for semantic search embeddings, loaded via dynamic `import()` with graceful degradation.

---

## Memory System

Firstbrain implements a **four-layer memory architecture** that gives Claude persistent context across sessions.

```
┌─────────────────────────────────────────────────┐
│  Layer 4: Project-Specific Memory               │
│  .claude/memory/project-{name}.md               │
│  Per-project state, decisions, blockers          │
├─────────────────────────────────────────────────┤
│  Layer 3: Long-term Summary Memory              │
│  .claude/memory/insights.md                      │
│  Distilled patterns, confidence-scored insights  │
├─────────────────────────────────────────────────┤
│  Layer 2: Working Memory                         │
│  MEMORY.md + .claude/memory/ topic files         │
│  Active projects, recent changes, priorities     │
├─────────────────────────────────────────────────┤
│  Layer 1: Session Memory                         │
│  Current conversation context                    │
│  Automatic, no persistence needed                │
└─────────────────────────────────────────────────┘
```

| Layer | Persistence | Updates |
|-------|-------------|---------|
| Session | Current session only | Continuous |
| Working | `MEMORY.md` + topic files | On significant actions |
| Long-term | `insights.md` | After 10+ note changes or topic density triggers |
| Project | `project-{name}.md` | Per project interaction |

Long-term insights use **confidence scoring** (0.0–1.0) with decay. Entries below 0.3 are pruned. Only insights ≥ 0.5 are surfaced to the user.

---

## Governance

Claude's autonomy is governed by three zones:

| Zone | AUTO | PROPOSE | NEVER |
|------|------|---------|-------|
| **Content** | Fix broken links, fill frontmatter | — | Edit body text |
| **Structure** | Add note to MOC, fix MOC links | New folders, restructure, new MOCs | Delete folders |
| **System** | Update memory, log to changelog | Modify CLAUDE.md, rules, config | Delete system files |

**Hard boundaries (no exceptions):**
- Never delete any file
- Never merge notes
- Never change note body content without explicit request
- Never rename files without explicit approval

---

## Templates

12 templates with correct frontmatter, clean structure, and a Connections section:

| Template | Target Folder | Use Case |
|----------|---------------|----------|
| `Project` | `01 - Projects/` | Active projects with tasks and deadlines |
| `Area` | `02 - Areas/` | Life areas and ongoing responsibilities |
| `Resource` | `03 - Resources/` | Books, courses, articles, references |
| `Tool` | `03 - Resources/` | Software, services, and utilities |
| `Zettel` | `03 - Resources/` | Atomic ideas in your own words |
| `Person` | `03 - Resources/` | Contacts and network |
| `Decision` | `01 - Projects/` | Decisions with pros, cons, and outcomes |
| `Meeting` | `01 - Projects/` | Meeting notes with participants and actions |
| `Code Snippet` | `03 - Resources/` | Code with language, context, and explanation |
| `Daily Note` | `00 - Inbox/Daily Notes/` | Daily journal with task rollover |
| `Weekly Review` | `00 - Inbox/` | Weekly retrospective and planning |
| `Monthly Review` | `00 - Inbox/` | Monthly reflection and goal tracking |

### Template Variables

| Variable | Replaced With | Example |
|----------|---------------|---------|
| `{{date}}` | Current date | 2026-03-07 |
| `{{title}}` | Note filename | Docker |
| `{{time}}` | Current time | 14:30 |

---

## Recommended Plugins

| Plugin | Purpose | Required? |
|--------|---------|-----------|
| [Dataview](https://github.com/blacksmithgu/obsidian-dataview) | Automatic lists and tables on MOC pages | **Yes** |
| [Templater](https://github.com/SilentVoid13/Templater) | Advanced template variables and scripting | No |
| [Calendar](https://github.com/liamcain/obsidian-calendar-plugin) | Visual calendar for Daily Notes | No |

---

## Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Vault | Obsidian + Markdown | Knowledge storage |
| AI Layer | Claude Code | Cognitive engine |
| Scanner | Node.js built-ins | File parsing + indexing |
| Embeddings | Transformers.js (optional) | Semantic vector generation |
| Vector Store | SQLite (node:sqlite) | Embedding storage + search |
| Search | Cosine similarity + keyword fallback | Note discovery |

---

## Roadmap

- [x] **v1.0 MVP** — Foundation, scanning, core skills, semantic search, memory *(shipped)*
- [ ] **v1.1 Proactive Intelligence** — `/briefing`, `/triage`, `/synthesize`, `/maintain`
- [ ] **v2.0** — Advanced connection intelligence, emergent structure, smart templates

See [`.planning/ROADMAP.md`](.planning/ROADMAP.md) for detailed phase breakdown.

---

## Contributing

Ideas, bugs, or new templates? See [CONTRIBUTING.md](CONTRIBUTING.md).

```bash
# Fork → Clone → Branch → Commit → PR
git clone https://github.com/YOUR_USERNAME/Firstbrain.git
cd Firstbrain
git checkout -b feature/my-feature
# Make changes
git commit -m "feat: add my feature"
git push origin feature/my-feature
# Open PR on GitHub
```

---

## License

[CC BY-NC 4.0](LICENSE) — Free for personal and non-commercial use. For commercial licensing, [contact the author](https://github.com/BEKO2210).

---

<p align="center">
  <a href="https://star-history.com/#BEKO2210/Firstbrain&Date">
    <img src="https://api.star-history.com/svg?repos=BEKO2210/Firstbrain&type=Date" alt="Star History Chart" width="600" />
  </a>
</p>

<p align="center">
  <sub>Built with Obsidian + Claude Code</sub>
</p>
