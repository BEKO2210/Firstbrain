# Firstbrain — AI-Native Second Brain

## What This Is

Firstbrain is an open-source Obsidian vault that transforms a traditional PARA + Zettelkasten starter kit into an adaptive AI-native second brain. Claude acts as the cognitive layer — scanning the vault, creating notes from templates, discovering connections between notes, searching by meaning, and remembering context across sessions — while preserving full Obsidian compatibility. The vault is designed for anyone who wants an intelligent knowledge system that grows smarter over time without requiring manual organization.

## Core Value

Claude autonomously maintains, connects, and evolves the knowledge base so the user can focus on thinking and creating — not filing and organizing.

## Requirements

### Validated

- ✓ Full English rewrite of all existing vault content (templates, MOCs, guides, system docs) — v1.0
- ✓ Markdown-first architecture with regenerable JSON cache (.claude/ directory) — v1.0
- ✓ Evolution governance system (content evolves freely, structure evolves intentionally, system rules remain governed) — v1.0
- ✓ Scalable architecture designed for 5,000+ notes (incremental scanning, indexing, selective rescans) — v1.0
- ✓ Claude Code skills as primary implementation vehicle (/create, /daily, /connect, /health, /scan, /search, /memory) — v1.0
- ✓ Orphan detection and link suggestion engine — v1.0
- ✓ Persistent layered memory system (session memory, working memory, long-term summary memory, project-specific memory) — v1.0
- ✓ Tiered semantic understanding engine (Level 1: explicit structure, Level 2: semantic search via embeddings) — v1.0
- ✓ Calm daily briefing system (priorities, changes, neglected items, suggestions) — v1.1
- ✓ Inbox triage automation (classify, suggest routing, auto-tag low-risk, propose moves) — v1.1
- ✓ Cross-note synthesis capability (thematic summaries, concept overviews, "what the vault knows about X") — v1.1
- ✓ Knowledge decay detection (stale projects, outdated notes, deprecated references, review queues) — v1.1
- ✓ Conflict resolution system (detect misclassifications, propose corrections, never override silently) — v1.1

### Active

(None — next milestone requirements to be defined via `/gsd:new-milestone`)

### Out of Scope

- Mobile app or non-Obsidian clients — Obsidian-native only
- Real-time sync or collaboration features — single-user vault
- External API integrations (Notion, Todoist, etc.) — self-contained system
- Custom Obsidian plugins — Claude Code skills only, no JS plugin development
- Automatic deletion or archiving without user review — review-first always
- Smart template adaptation — current 12-template system covers all use cases adequately
- Knowledge graph with typed, weighted relationships — deferred to v2

## Context

### Current State
Shipped v1.1 with ~30,124 LOC across markdown, CJS modules, and JSON.
Tech stack: Node.js (zero external deps for core), @huggingface/transformers (optional, for embeddings), SQLite (node:sqlite built-in).

**Skills available:** /create, /daily, /connect, /health, /scan, /search, /memory, /briefing, /triage, /synthesize, /maintain
**Infrastructure:** vault-index.json, link-map.json, tag-index.json, scan-state.json, embeddings.db
**Memory:** MEMORY.md (working), insights.md (long-term), project-{name}.md (per-project)

### Design Philosophy
- **Markdown-first**: All knowledge lives in plain markdown files. JSON caches are derivative, regenerable, invisible to Obsidian users.
- **AI-native**: Claude is the cognitive layer, not just a chatbot. It understands semantics, tracks relationships, and maintains the vault autonomously.
- **Calm intelligence**: The system is proactive but restrained. Deep reasoning underneath, minimal surface noise. Executive briefing, not notification spam.
- **Governed evolution**: Content flows freely. Structure evolves when patterns are strong and repeated. System rules change only through explicit proposals.
- **Propose, don't override**: Claude suggests, explains, and offers actions. It never silently overrides user intent. Low-risk auto-actions (tags, metadata) are acceptable; structural changes require confirmation.

### Tiered Understanding Model
| Level | What Claude understands | Source | Status |
|-------|------------------------|--------|--------|
| 1 — Explicit | Frontmatter, tags, wiki-links, folder location | Direct file parsing | ✓ v1.0 |
| 2 — Semantic | Topics, themes, concepts inferred from note content | Embedding-based search | ✓ v1.0 |
| 3 — Relational | Cross-vault patterns, clusters, contradictions, knowledge gaps | Graph analysis | Planned |

### Memory Architecture
| Layer | Persistence | Content | Status |
|-------|------------|---------|--------|
| Session memory | Current session only | Active conversation context | ✓ v1.0 |
| Working memory | MEMORY.md + topic files | Current priorities, active projects, recent changes | ✓ v1.0 |
| Long-term summary | insights.md | Distilled patterns, recurring themes, organizational insights | ✓ v1.0 |
| Project-specific | project-{name}.md | Project state, decisions, blockers, context | ✓ v1.0 |

### Target Audience
Open-source template for anyone who wants an AI-driven second brain. Must work well without Claude (standard Obsidian vault) but becomes significantly more powerful with Claude as the cognitive engine.

## Constraints

- **Obsidian compatibility**: Every feature must preserve full Obsidian compatibility. No note should require Claude to be readable or useful. The vault must work as a standard Obsidian vault for users who don't use Claude Code.
- **Markdown-first**: Source of truth is always markdown + frontmatter. JSON caches in .claude/ are derivative and regenerable. If the cache is deleted, Claude can rebuild it from markdown.
- **No custom plugins**: All AI features are implemented as Claude Code skills, not Obsidian JS plugins. This keeps the system portable and maintainable.
- **Open source**: Everything must be shareable. No hardcoded personal data, API keys, or user-specific configuration in the repository.
- **Scale-ready**: Architecture must handle 5,000+ notes without degrading. Incremental scanning, not full vault re-reads.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Full English rewrite | Vault is open-source template for international audience | ✓ Good — clean English vault, Dataview preserved |
| Claude Code skills as implementation | Structured, versioned, shareable commands vs. CLAUDE.md instructions alone | ✓ Good — 7 skills shipped, clear separation of concerns |
| Markdown-first + JSON cache | Obsidian compatibility preserved, cache is regenerable, not a dependency | ✓ Good — .gitignore'd indexes, zero Obsidian breakage |
| Zero external dependencies for core | Hand-rolled YAML parser, regex-based scanner vs. unified/gray-matter | ✓ Good — no ESM issues, fast startup, ~15ms full scan |
| Layered memory architecture | Compressed high-signal memory vs. raw context dumping | ✓ Good — 4 layers active, confidence scoring works |
| Auto for low-risk, propose for structural | Balance autonomy with user trust — tags/metadata auto, moves/merges proposed | ✓ Good — governance system enforced consistently |
| SQLite for embeddings | node:sqlite built-in, no external DB dependency, BLOB storage for vectors | ✓ Good — <5ms search at vault scale |
| Dynamic import() for ESM modules | Transformers.js is ESM-only, CJS codebase needs compatibility | ✓ Good — graceful degradation when not installed |
| Scale-ready from day one | Design for 5,000+ notes even though starting near zero | ✓ Good — incremental scan, hash-based change detection |
| Evolution governance | Content evolves freely, structure intentionally, system rules governed | ✓ Good — three zones, clear classification |
| READ-ONLY /briefing skill | Never modifies vault — pure data aggregation and presentation | ✓ Good — zero governance risk |
| Confidence-tiered triage governance | HIGH auto-tags, MEDIUM proposes, LOW reviews — maps to AUTO/PROPOSE/NEVER | ✓ Good — consistent with governance model |
| Three-layer relevance scoring for /synthesize | Tag (0.7) + title (0.6) + semantic (sim*0.5) with graceful degradation | ✓ Good — works without embeddings installed |
| Local frontmatter parsing in /maintain | Reimplemented vs. cross-skill dependency on triage-utils | ✓ Good — avoided coupling between skills |
| TYPE_FOLDER_FALLBACK for review routing | Separate constant vs. modifying shared TEMPLATE_MAP | ✓ Good — preserved weekly/monthly template distinction |

---
*Last updated: 2026-03-08 after v1.1 milestone*
