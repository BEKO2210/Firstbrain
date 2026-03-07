# Phase 1: Foundation & Vault Preparation - Research

**Researched:** 2026-03-07
**Domain:** Obsidian vault restructuring, Claude Code AI-native configuration, governance systems
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### English tone & style
- Tone: Professional but warm -- clear, polished, not stiff
- Voice: Mixed -- direct "you" in guides and workflows, impersonal in templates and system docs
- Naming conventions: Full English -- all existing German titles rewritten (e.g., "Gesundheit.md" -> "Health.md", "Entscheidung -- Thema.md" -> "Decision -- Topic.md")
- Scope: Everything -- system docs AND user-created notes are rewritten to English

#### Autonomy boundaries
- AUTO level: Moderate -- AUTO includes filing notes to correct folders, fixing broken links, updating MOCs. PROPOSE for structural changes
- NEVER zone (hard boundaries):
  - Never delete any file
  - Never merge notes
  - Never change note body content without explicit request
  - Never rename files without explicit approval
- Changelog: Log significant actions only (structural changes, new files, moved files, MOC updates). Skip trivial metadata fills
- Proposal format: Claude's discretion -- inline for single actions, batched when there are many

#### Governance zones
- Content zone (notes, daily entries, personal knowledge): Light assist -- Claude can auto-fix broken links and fill missing frontmatter, but never edit body text
- Structure zone (folders, MOCs, navigation, templates): AUTO for safe additions (adding note to existing MOC), PROPOSE for risky changes (new folders, restructuring)
- System zone (.claude/, CLAUDE.md, rules, config): Self-maintaining -- Claude can AUTO-update its memory files and changelog. Config and rules changes are PROPOSE
- Enforcement: Documentation + light guardrails -- rules in docs, plus a simple validation check Claude runs before making changes

#### AI instructions depth
- CLAUDE.md structure: Layered -- concise core rules (~150 lines) in CLAUDE.md, detailed per-concern docs in .claude/rules/
- Personality: Proactive partner -- suggests connections, flags opportunities, shares insights. Engaged but not chatty
- Memory architecture: Explicitly document the 4-layer memory model (session, working, long-term, project) in CLAUDE.md from Phase 1
- Rules organization: Per concern (naming.md, linking.md, frontmatter.md) -- each covers all folders for that topic, not one file per vault folder

### Claude's Discretion
- Exact changelog entry format
- How to structure the validation check for governance enforcement
- Order and grouping of CLAUDE.md sections
- Specific wording of rule files

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | All vault content (templates, MOCs, guides, system docs) rewritten in English | Full inventory of 31 markdown files completed; all German content catalogued with translation approach; wiki-link renaming strategy defined; Obsidian CLI available for safe file renames |
| FOUND-02 | CLAUDE.md rewritten with AI-native instructions covering autonomous behavior, memory, skills, and governance | Official Claude Code docs on CLAUDE.md structure, .claude/rules/, memory architecture, and best practices researched; ~150 line target confirmed viable |
| FOUND-03 | Path-specific rules in .claude/rules/ for per-directory conventions | Claude Code v2.0.64+ path-specific rules with YAML frontmatter `paths:` field verified; glob patterns documented; per-concern organization confirmed |
| FOUND-04 | Evolution governance system with three zones (content/structure/system) and explicit rules for each | Zone definitions locked in CONTEXT.md; enforcement via documentation + light validation check; rule file structure designed |
| FOUND-05 | Action classification system (AUTO / PROPOSE / NEVER) codified and enforced | Classification taxonomy designed from user decisions; each zone mapped to action levels; NEVER list is strict and enumerated |
| FOUND-06 | Changelog infrastructure (.claude/changelog.md) logging all autonomous actions | Changelog format at Claude's discretion; log significant actions only; structured entry format designed |
| FOUND-07 | Obsidian compatibility checklist verified (graph view, search, Properties panel, Dataview queries) | .obsidian/ config analyzed; core plugins verified; Dataview queries audited; wiki-link integrity strategy defined |

</phase_requirements>

## Summary

This phase transforms a German-language Obsidian vault into a fully English, AI-native knowledge base with governance infrastructure. The vault currently contains 31 markdown files across 8 directories, plus Obsidian configuration. All user-facing content is in German, while frontmatter keys and tags are already in English. The CLAUDE.md is a basic instruction file (~117 lines of German) that needs complete rewriting as an AI-native governance document.

The primary technical risk is wiki-link breakage during file renames. When files are renamed outside Obsidian (which is how Claude Code operates), wiki-links in other files are NOT automatically updated. This means every file rename requires a manual find-and-replace across all files that reference the old name. The vault uses the `"newLinkFormat": "shortest"` setting with wiki-links (not markdown links), so links use just the filename without path. This simplifies the search-and-replace: `[[Neues Projekt]]` becomes `[[New Project]]` everywhere it appears. The Obsidian CLI (v1.12.4, February 2026) can handle renames with automatic link updates, but requires Obsidian to be running -- making it unsuitable for CI or headless Claude Code operations.

The Claude Code `.claude/rules/` system supports exactly what this phase needs: path-specific rules with YAML frontmatter `paths:` fields and glob patterns. Rules without `paths` are loaded unconditionally. The user's decision to organize rules per-concern (naming.md, linking.md, frontmatter.md) rather than per-folder aligns well with Claude Code's rule loading architecture.

**Primary recommendation:** Execute the English rewrite in a controlled sequence -- first rename files and update all wiki-links simultaneously, then translate file content. Use grep-based validation after each rename to catch broken links before proceeding.

## Standard Stack

This phase does not involve programming or external libraries. The "stack" is the toolchain used for vault transformation:

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Obsidian | 1.12.4+ | Vault host, rendering, graph view, Dataview | Target platform; compatibility is a requirement |
| Claude Code | 2.0.64+ | AI assistant, file operations, .claude/rules/ | Executor of all phase work; rules engine |
| Dataview plugin | latest | Dynamic queries in MOCs and Home.md | Already configured; queries must survive translation |
| Obsidian Core Templates | built-in | Template insertion via Ctrl+Shift+T | Already configured; `05 - Templates` folder path |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Obsidian CLI | File renames with automatic link updates | Only if Obsidian is running and user prefers CLI-based renames |
| grep/ripgrep | Validate wiki-link integrity after renames | After every file rename to catch broken references |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual find-replace for links | Obsidian CLI `move` command | CLI requires Obsidian running; not headless-compatible |
| Per-concern rule files | Per-folder rule files | Per-concern is user's locked decision; better for cross-cutting concerns |
| Single CLAUDE.md | Split CLAUDE.md + rules/ | Layered approach is user's locked decision; keeps CLAUDE.md concise |

## Architecture Patterns

### Vault File Inventory (Current State)

```
Firstbrain-main/
├── .obsidian/                    # 7 config files (keep as-is)
├── .claude/
│   ├── settings.json             # German instructions -> rewrite
│   └── settings.local.json       # Permissions (keep as-is)
├── 00 - Inbox/
│   ├── Daily Notes/              # Empty directory
│   ├── Inbox.md                  # German content
│   ├── Neues Projekt.md          # Empty placeholder -> rename
│   └── Unbenannt.md              # Empty placeholder -> rename
├── 01 - Projects/                # Empty
├── 02 - Areas/                   # Empty
├── 03 - Resources/               # Empty
├── 04 - Archive/                 # Empty
├── 05 - Templates/               # 12 templates, all German
├── 06 - Atlas/MOCs/              # 8 MOCs, all German
├── 07 - Extras/
│   ├── Attachments/              # Empty
│   ├── Kanban/                   # Empty
│   └── github-setup.md           # German content
├── CLAUDE.md                     # German, ~117 lines -> full rewrite
├── CONTRIBUTING.md               # German -> translate
├── Home.md                       # German, has Dataview queries
├── README.md                     # German -> translate
├── START HERE.md                 # German -> translate
├── Tag Conventions.md            # German -> translate
└── Workflow Guide.md             # German -> translate
```

### Pattern 1: File Rename + Link Update Strategy

**What:** When renaming a German-named file to English, simultaneously update all wiki-links across the vault.
**When to use:** Every file that has a German filename and is referenced by wiki-links.
**Critical detail:** Obsidian does NOT update links when files are renamed outside the app. Claude Code operates outside Obsidian, so every rename must include a vault-wide search-and-replace.

**Files requiring rename (German -> English):**

| Current Name | New Name | Referenced By |
|---|---|---|
| `Neues Projekt.md` | `New Project.md` | Home.md, Projects MOC.md |
| `Unbenannt.md` | (delete or rename) | None (empty placeholder) |

**Wiki-links requiring update (German link targets in content):**

These are wiki-links that reference German-named concepts. Even though the target files may not exist yet (they are "click to create" placeholders), the link text must be translated for English consistency:

| German Link | English Link | Found In |
|---|---|---|
| `[[Neues Projekt]]` | `[[New Project]]` | Home.md, Projects MOC.md, START HERE.md |
| `[[Neuer Bereich]]` | `[[New Area]]` | Home.md, Areas MOC.md |
| `[[Neue Ressource]]` | `[[New Resource]]` | Home.md, Resources MOC.md |
| `[[Neues Tool]]` | `[[New Tool]]` | Home.md, Tools MOC.md |
| `[[Neuer Zettel]]` | `[[New Zettel]]` | Home.md, Resources MOC.md, START HERE.md |
| `[[Neue Entscheidung]]` | `[[New Decision]]` | Home.md, Decisions MOC.md |
| `[[Neue Person]]` | `[[New Person]]` | Home.md, People MOC.md |
| `[[Neues Meeting]]` | `[[New Meeting]]` | Home.md, Meetings MOC.md |
| `[[Neues Snippet]]` | `[[New Snippet]]` | Home.md, Code MOC.md |
| `[[Weekly Review]]` | `[[Weekly Review]]` | Inbox.md, Workflow Guide.md (already English) |
| `[[Gesundheit]]` | `[[Health]]` | Workflow Guide.md (example reference) |

**Procedure per rename:**
```
1. Rename the file: mv "Old Name.md" "New Name.md"
2. Search entire vault: grep -r "[[Old Name]]" --include="*.md"
3. Replace all occurrences: [[Old Name]] -> [[New Name]]
4. Also replace display-name variants: [[Old Name|...]] -> [[New Name|...]]
5. Verify: grep -r "Old Name" --include="*.md" (should return 0 results)
```

### Pattern 2: CLAUDE.md Layered Architecture

**What:** Concise core document (~150 lines) with detailed rules delegated to .claude/rules/ files.
**When to use:** This is the target architecture for FOUND-02 and FOUND-03.

```
CLAUDE.md                          # ~150 lines, core rules
.claude/
├── rules/
│   ├── naming.md                  # File naming conventions for all folders
│   ├── linking.md                 # Wiki-link rules, minimum connections
│   ├── frontmatter.md             # YAML frontmatter standards
│   ├── governance.md              # AUTO/PROPOSE/NEVER classification
│   └── templates.md               # Template usage rules
│       (paths: "05 - Templates/**")
├── changelog.md                   # Log of autonomous actions
├── settings.json                  # Claude Code project settings
└── settings.local.json            # Local permissions
```

**CLAUDE.md core sections (recommended):**
```markdown
# Firstbrain -- AI-Native Second Brain

## Identity & Role
[Who Claude is in this vault, personality, proactive partner behavior]

## Vault Structure
[Folder tree with purpose of each folder]

## Memory Architecture
[4-layer model: session, working, long-term, project]

## Governance
[Three zones: content, structure, system]
[Action classification: AUTO, PROPOSE, NEVER]
[Hard boundaries: NEVER list]

## Quick Reference
[Key entry points, common commands, template table]

## Rules
[Pointer to .claude/rules/ for detailed conventions]
```

### Pattern 3: Path-Specific Rules with Frontmatter

**What:** Rules that only load when Claude reads files in matching directories.
**When to use:** For rules that are only relevant to specific parts of the vault.

```markdown
---
paths:
  - "05 - Templates/**"
---

# Template Rules

- Never modify template files directly
- Template variables: {{date}}, {{title}}, {{time}}
- Every template must have: type, created, tags in frontmatter
```

```markdown
---
paths:
  - "01 - Projects/**"
  - "02 - Areas/**"
  - "03 - Resources/**"
---

# Content Zone Rules

- AUTO: Fix broken wiki-links, fill missing frontmatter fields
- NEVER: Edit body text without explicit request
- NEVER: Delete or merge notes
```

Rules without `paths:` frontmatter load unconditionally (e.g., naming.md, governance.md).

### Pattern 4: Changelog Entry Format

**What:** Structured log entries for autonomous actions.
**When to use:** Every time Claude takes an AUTO or PROPOSE action.

```markdown
## Changelog

### 2026-03-07

- **AUTO** | Filed `Quick Idea.md` from Inbox to `03 - Resources/` | type: zettel
- **AUTO** | Fixed broken link `[[Old Name]]` -> `[[New Name]]` in `Home.md`
- **AUTO** | Added `Project X.md` to Projects MOC
- **PROPOSE** | Suggest creating new MOC for "Machine Learning" (5+ unlinked notes)
```

**Fields per entry:** Classification (AUTO/PROPOSE) | Action description | Affected files/details

### Anti-Patterns to Avoid

- **Renaming files without updating links:** This WILL break the vault. Every rename must include a vault-wide link search-and-replace.
- **Translating Dataview query field names:** Dataview queries reference frontmatter field names (e.g., `status`, `priority`, `area`), which are already in English. Do NOT translate these.
- **Translating tag names:** Tags are already English (`#project`, `#area`, etc.). Do not change them.
- **Over-translating Obsidian UI strings in workspace.json:** The workspace.json contains German UI strings like "Dateiexplorer", "Suchen", "Lesezeichen" -- these are generated by Obsidian based on locale settings and should NOT be manually edited. They will change when the user switches Obsidian's language.
- **Monolithic CLAUDE.md:** User explicitly chose layered architecture. Do not put everything in CLAUDE.md.
- **Per-folder rules:** User explicitly chose per-concern rules. Do not create one rule file per vault folder.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Wiki-link find-and-replace | Custom regex parser | Simple string match on `[[filename]]` | Wiki-links are simple `[[Name]]` or `[[Name\|Display]]` patterns; regex overcomplicates it |
| Broken link detection | Custom link graph builder | `grep -r "[[" --include="*.md"` + compare against file list | The vault is small (31 files); a full graph builder is overkill |
| File inventory | Database or JSON index | `find . -name "*.md"` + grep for frontmatter | Phase 2 builds the real index; this phase just needs a file list |
| Governance enforcement | Complex rule engine | Documentation in .claude/rules/ + simple pre-action check | User chose "light guardrails" -- a validation checklist is enough |

**Key insight:** This phase is about content and configuration, not code. Every "tool" needed is already available via standard file operations. Do not build infrastructure that Phase 2+ will build properly.

## Common Pitfalls

### Pitfall 1: Broken Wiki-Links After Rename
**What goes wrong:** Files are renamed but wiki-links in other files still point to the old name. Obsidian shows broken link warnings, graph view has disconnected nodes.
**Why it happens:** Claude Code operates outside Obsidian. Obsidian only auto-updates links for renames done within its own UI.
**How to avoid:** After EVERY file rename, immediately grep the entire vault for the old filename in `[[...]]` patterns and replace all occurrences. Verify with a second grep that returns zero results.
**Warning signs:** Any `[[filename]]` where the target file does not exist.

### Pitfall 2: Dataview Query Breakage
**What goes wrong:** Dataview queries in MOCs and Home.md stop working after translation because field names or path references were changed.
**Why it happens:** Dataview queries like `FROM "01 - Projects"` reference folder paths, and `WHERE status = "active"` references frontmatter fields. If either changes, queries break.
**How to avoid:** Do NOT change folder names (they are already English: "01 - Projects", etc.). Do NOT translate frontmatter field names (they are already English: `status`, `priority`, `type`, etc.). Only translate the surrounding prose and section headings.
**Warning signs:** Dataview blocks showing "No results" after translation.

### Pitfall 3: Template Variable Corruption
**What goes wrong:** Template variables like `{{date}}`, `{{title}}`, `{{time}}` are accidentally translated or modified.
**Why it happens:** They look like regular text but are functional markers that Obsidian's template system replaces at insertion time.
**How to avoid:** Treat all `{{...}}` patterns as untouchable code. Translate only the prose around them.
**Warning signs:** Templates that insert literal `{{date}}` text instead of the actual date.

### Pitfall 4: Workspace.json German UI Strings
**What goes wrong:** Someone translates the German strings in `.obsidian/workspace.json` (e.g., "Dateiexplorer" -> "File Explorer"), causing Obsidian to not recognize its own saved workspace state.
**Why it happens:** These strings are generated by Obsidian based on the app's language setting, not user content.
**How to avoid:** Never edit `.obsidian/workspace.json` or any `.obsidian/*.json` file unless specifically required. These are Obsidian-managed files.
**Warning signs:** Obsidian failing to restore the workspace layout on startup.

### Pitfall 5: CLAUDE.md Too Long
**What goes wrong:** The rewritten CLAUDE.md exceeds ~200 lines, causing Claude to ignore or deprioritize instructions.
**Why it happens:** Temptation to include all governance details in the main file instead of delegating to .claude/rules/.
**How to avoid:** Target 150 lines for CLAUDE.md. Move all detailed rules to .claude/rules/ files. Every line in CLAUDE.md must pass the test: "Would removing this cause Claude to make mistakes?"
**Warning signs:** CLAUDE.md exceeding 200 lines; Claude not following specific rules.

### Pitfall 6: Inconsistent Translation
**What goes wrong:** Some German fragments remain in translated files, or terminology is inconsistent across files (e.g., "Connections" in one file, "Links" in another for the same concept).
**Why it happens:** Translation is done file-by-file without a terminology glossary.
**How to avoid:** Create a translation glossary before starting (see below). Use consistent English terms for German concepts that appear across multiple files.
**Warning signs:** `grep -ri` for common German words finding hits in supposedly-translated files.

## Code Examples

### Example 1: Safe File Rename with Link Update

```bash
# Step 1: Rename the file
mv "00 - Inbox/Neues Projekt.md" "00 - Inbox/New Project.md"

# Step 2: Find all references to old name
grep -rn "\[\[Neues Projekt" --include="*.md" .

# Step 3: Replace in each file (using sed or Edit tool)
# [[Neues Projekt]] -> [[New Project]]
# [[Neues Projekt|display]] -> [[New Project|display]]

# Step 4: Verify no references remain
grep -rn "Neues Projekt" --include="*.md" .
# Expected: 0 results
```

### Example 2: Translation Glossary (German -> English)

```
# Section Headings
Verbindungen        -> Connections
Beschreibung        -> Description
Ziel                -> Goal
Kontext             -> Context
Aufgaben / Tasks    -> Tasks
Notizen             -> Notes
Zusammenfassung     -> Summary
Kernideen           -> Key Ideas
Erklaerung          -> Explanation
Beispiel            -> Example
Anwendung           -> Application
Zitate              -> Quotes
Idee                -> Idea
Kontakt             -> Contact
Interaktionen       -> Interactions
Entscheidung        -> Decision
Begruendung         -> Rationale
Konsequenzen        -> Consequences
Review Datum        -> Review Date
Agenda              -> Agenda (same)
Naechste Schritte   -> Next Steps
Rueckblick          -> Retrospective / Review
Reflexion           -> Reflection
Neue Eintraege      -> New Entries
Uebersicht          -> Overview
Navigation          -> Navigation (same)
Erste Schritte      -> Getting Started
System & Hilfe      -> System & Help

# Template Prompts
"Was ist das Ergebnis dieses Projekts?"           -> "What is the outcome of this project?"
"Welchen Lebensbereich deckt das ab?"              -> "What area of life does this cover?"
"Kernaussage in 2-3 Saetzen"                       -> "Core message in 2-3 sentences"
"Kurze Beschreibung in einem Satz"                  -> "Brief description in one sentence"
"Eine klare, atomare Idee in eigenen Worten"        -> "A clear, atomic idea in your own words"
"Woher kenne ich diese Person?"                     -> "How do I know this person?"
"Was macht dieser Code?"                            -> "What does this code do?"
"Was ist die wichtigste Sache heute?"               -> "What is the most important thing today?"

# Connections Labels
Verwandte Projekte  -> Related Projects
Ressourcen          -> Resources
Verwandt            -> Related
Quelle              -> Source
Verwandte Ideen     -> Related Ideas
Widerspricht        -> Contradicts
Unterstuetzt        -> Supports
Vorgestellt durch   -> Introduced By
Vorheriges Meeting  -> Previous Meeting
Vorherige Woche     -> Previous Week
Beeinflusst         -> Impacts
Projekte            -> Projects
Dokumentation       -> Documentation
Alternativen        -> Alternatives
Unternehmen         -> Company
```

### Example 3: .claude/rules/ File with Path Scoping

```markdown
---
paths:
  - "05 - Templates/**"
---

# Template Conventions

Templates are read-only reference files. Never modify their content.

## Template Variables
- `{{date}}` -- replaced with current date (YYYY-MM-DD) at insertion
- `{{title}}` -- replaced with the note's filename at insertion
- `{{time}}` -- replaced with current time (HH:mm) at insertion

## Required Frontmatter
Every template must include at minimum:
- `type:` -- the note type (project, area, resource, etc.)
- `created:` -- set to `{{date}}`
- `tags:` -- array with at least the type tag

## Connections Section
Every template must end with a `## Connections` section containing
at least 2 wiki-link placeholders `[[]]`.
```

### Example 4: Governance Validation Check

```markdown
# Pre-Action Validation

Before taking any autonomous action, verify:

1. **Zone check:** Which zone does this action affect?
   - Content zone (notes body text) -> Almost nothing is AUTO here
   - Structure zone (folders, MOCs, links) -> Check if safe addition or structural change
   - System zone (.claude/, rules) -> Only memory and changelog are AUTO

2. **Classification check:** Is this action AUTO, PROPOSE, or NEVER?
   - AUTO: Execute and log to changelog
   - PROPOSE: Present to user with rationale, wait for approval
   - NEVER: Do not execute under any circumstances

3. **NEVER list check:** Does this action involve:
   - [ ] Deleting a file -> STOP
   - [ ] Merging notes -> STOP
   - [ ] Changing note body content without request -> STOP
   - [ ] Renaming a file without approval -> STOP
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| Monolithic CLAUDE.md | Layered CLAUDE.md + .claude/rules/ | Claude Code v2.0.64 (2025) | Instructions can be modular and path-scoped |
| Manual file instructions only | Auto memory + manual instructions | Claude Code 2025 | Claude learns preferences automatically; MEMORY.md supplements CLAUDE.md |
| External file rename breaks links | Obsidian CLI `move` command | Obsidian v1.12.4 (Feb 2026) | CLI renames update links, but requires Obsidian running |
| No path-specific rules | YAML frontmatter `paths:` field | Claude Code v2.0.64 | Rules load only when working with matching files |

**Deprecated/outdated:**
- Single CLAUDE.md approach is still supported but not recommended for complex projects
- `.claude/settings.json` `instructions` field (still works but CLAUDE.md is preferred for multi-line instructions)

## Open Questions

1. **Obsidian CLI availability for rename operations**
   - What we know: Obsidian CLI (v1.12.4) can rename/move files with automatic link updates. It requires Obsidian to be running.
   - What's unclear: Whether the user has Obsidian 1.12.4+ installed and whether they want to use CLI-based renames or prefer manual grep-and-replace.
   - Recommendation: Default to manual grep-and-replace approach (works without Obsidian running). Document Obsidian CLI as an optional enhancement. The vault is small enough (31 files) that manual approach is practical.

2. **Placeholder files "Neues Projekt.md" and "Unbenannt.md"**
   - What we know: Both files in `00 - Inbox/` are empty (0 content). "Neues Projekt" is referenced by Home.md as a "click to create" link. "Unbenannt" means "Untitled" and appears to be a default/scratch file.
   - What's unclear: Whether to rename them, delete them, or leave them. The NEVER zone says "never delete any file."
   - Recommendation: Rename "Neues Projekt.md" to "New Project.md" (it serves as a creation target). Rename "Unbenannt.md" to "Untitled.md" for consistency. Update all wiki-links referencing the old names.

3. **README.md and CONTRIBUTING.md language**
   - What we know: User decision says "Everything" should be English. These are GitHub-facing files.
   - What's unclear: Whether the user wants to maintain bilingual GitHub presence or go fully English.
   - Recommendation: Translate both to English per the "Everything" scope decision. The user can always add bilingual sections later.

4. **Dataview query column headers**
   - What we know: Some Dataview TABLE queries use German aliases: `file.mtime AS "Geaendert"`. The `AS` clause is display text, not functional.
   - What's unclear: Whether these display aliases should be translated.
   - Recommendation: Yes, translate display aliases (`AS "Geaendert"` -> `AS "Modified"`) since they are user-facing text, but leave the field references (`file.mtime`, `status`, `priority`) untouched.

5. **GitHub-setup.md in 07 - Extras/**
   - What we know: Contains German GitHub repository setup instructions. References the old repository name and description.
   - What's unclear: Whether this file should be updated to reflect the new English identity or kept as historical reference.
   - Recommendation: Translate to English and update to reflect current project state.

## Sources

### Primary (HIGH confidence)
- [Claude Code Memory Documentation](https://code.claude.com/docs/en/memory) -- CLAUDE.md structure, .claude/rules/, path-specific rules, auto memory, loading order
- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices) -- CLAUDE.md size limits, content guidelines, skills, hooks
- Obsidian .obsidian/ config files -- directly read from vault (app.json, core-plugins.json, templates.json, daily-notes.json, graph.json)
- All 31 vault markdown files -- directly read and inventoried

### Secondary (MEDIUM confidence)
- [Obsidian CLI article](https://dev.to/shimo4228/obsidians-official-cli-is-here-no-more-hacking-your-vault-from-the-back-door-3123) -- Obsidian CLI v1.12.4 capabilities, `move` command with link updates
- [Obsidian Forum: External rename breaks links](https://forum.obsidian.md/t/will-externally-renamed-files-lose-all-backlinks-do-settings-matter/40004) -- Confirmed: external renames do not trigger link updates
- [Claude Code Rules Directory Guide](https://claudefa.st/blog/guide/mechanics/rules-directory) -- Practical examples of .claude/rules/ organization

### Tertiary (LOW confidence)
- None -- all findings verified with primary or secondary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All tools are known quantities already in use (Obsidian, Claude Code, Dataview)
- Architecture: HIGH -- CLAUDE.md structure and .claude/rules/ system verified against official docs; vault inventory is complete
- Pitfalls: HIGH -- Wiki-link breakage risk confirmed by official Obsidian forum; Dataview query sensitivity verified by direct inspection of queries
- Translation scope: HIGH -- Complete file inventory with German content catalogued; translation glossary drafted from actual content

**Research date:** 2026-03-07
**Valid until:** 2026-04-07 (stable domain; Obsidian and Claude Code architectures unlikely to change in 30 days)
