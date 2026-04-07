---
name: triage
trigger: /triage
description: Classify inbox notes by type, auto-tag high-confidence items, and propose folder moves for review
version: 3.0.0
---

# /triage -- Inbox Triage

Intelligent inbox classification that reads each note's full content, assigns a type with confidence level, auto-applies metadata for high-confidence items, and proposes structural moves for user review. Follows the three-tier action model mapped directly to vault governance zones (AUTO / PROPOSE / NEVER).

The inbox should not be a dumping ground. /triage transforms unorganized inbox notes into properly classified, tagged, and filed knowledge -- respecting governance by auto-applying only safe metadata changes and proposing structural changes for review.

## Usage

```
/triage              # Triage all inbox notes
/triage --dry-run    # Show classifications only, no changes applied
```

## Classification Approach

Claude reads each inbox note's full content and uses its own reasoning to determine the note type. There is no NLP library or keyword matching -- classification relies on Claude's understanding of the content in context.

**Classification signals (strongest to weakest):**

1. **Headings structure** -- e.g., `## Installation`, `## Usage` suggests tool; `## Pros`, `## Cons` suggests decision
2. **Content patterns** -- e.g., code blocks suggest code-snippet; meeting attendees and action items suggest meeting; personal reflection suggests zettel
3. **Existing partial frontmatter** -- if `type:` is already set, trust it; if `tags:` exist, use them as classification hints
4. **File naming patterns** -- e.g., `Book -- ` prefix strongly signals resource, `Tool -- ` signals tool, `Decision -- ` signals decision, `Person -- ` signals person
5. **Links and tags already present** -- shared tags with existing notes of a known type provide classification context

Claude combines these signals to assign both a type and a confidence score. Strong, unambiguous signals (e.g., file named `Tool -- Docker.md` with installation instructions) yield high confidence. Weak or conflicting signals yield low confidence.

## Confidence Levels and Governance Mapping

| Confidence | Score | Governance Zone | Action |
|------------|-------|-----------------|--------|
| High | >= 0.8 | AUTO | Fill missing frontmatter (type, created, tags). Log to changelog. |
| Medium | 0.5 - 0.8 | PROPOSE | Present classification and target folder. Wait for user approval before applying changes. |
| Low | < 0.5 | REVIEW | Show the note with Claude's best guess. No action taken. User decides. |

**Score calculation guidance:**

- File name matches a known prefix (e.g., `Tool -- `) AND content confirms type: **high** (>= 0.8)
- Content clearly matches a type but no naming signal: **medium** (0.6 - 0.7)
- Ambiguous content, could be multiple types: **low** (< 0.5)
- Very short notes (< 50 characters body text): **low** regardless of other signals

## Execution Flow

Claude follows these steps when `/triage` is invoked:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` from create-utils to rebuild indexes if stale (> 5 min).

2. **Load vault index:** Read `.claude/indexes/vault-index.json` using `loadJson`.

3. **Get inbox notes:** Call `getInboxNotes('.', vaultIndex)` from triage-utils.cjs to collect all notes in `00 - Inbox/` that need triage (excluding Daily Notes, templates, and the Inbox.md file itself).

4. **Empty inbox check:** If no inbox notes are found, report: "Inbox is clear -- nothing to triage." and stop.

5. **Classify each note.** For each inbox note, Claude reads the full content and determines:
   - **Note type** -- one of the 11 valid types: project, area, resource, tool, person, meeting, decision, code-snippet, zettel, daily, review
   - **Confidence** -- high (>= 0.8), medium (0.5 - 0.8), or low (< 0.5) based on signal strength
   - **Target folder** -- via `getTargetFolder(type)` from triage-utils.cjs
   - **Suggested tags** -- based on content analysis (lowercase, English)

6. **Present triage results** grouped by confidence level:
   - **HIGH:** "Auto-applying: [[Note]] -> type: tool, tags: [docker, devops]"
   - **MEDIUM:** "Proposed: Move [[Note]] to 03 - Resources/ (classified as tool, medium confidence) -- approve?"
   - **LOW:** "Review: [[Note]] might be a zettel (low confidence) -- what type is this?"

7. **Apply AUTO actions:** For high-confidence items, call `applyFrontmatterFix()` from triage-utils.cjs to fill missing frontmatter fields (type, created, tags). These are safe metadata changes within the AUTO governance zone.

8. **Collect user decisions on PROPOSED items.** Present medium-confidence classifications for user review. After user approval, execute approved moves via `moveNote()` from triage-utils.cjs.

9. **Re-scan:** Call `scan('.')` from scanner.cjs after all modifications to update vault indexes.

10. **Log actions** to `.claude/changelog.md` -- record which notes were auto-tagged and which were moved.

### Dry-run mode

When `--dry-run` is specified, skip steps 7-10. Show all classifications and proposed actions without applying any changes. This lets the user preview triage results before committing.

## Governance

This skill maps directly to the vault's three governance zones:

### AUTO (do it, log it)

Actions that /triage performs automatically for high-confidence items:

- Fill missing `type` field in frontmatter
- Fill missing `created` field (using file mtime or today's date)
- Fill missing `tags` array based on content analysis
- Fix broken wiki-links found during content analysis

These are identical to the governance rule "fill missing frontmatter fields" -- safe metadata changes that never alter meaning.

### PROPOSE (ask first)

Actions that /triage presents for user approval:

- Move note from Inbox to target folder (e.g., `03 - Resources/`)
- Rename note to match naming conventions (e.g., adding `Tool -- ` prefix)
- Reclassify a note to a different type than its current frontmatter type

Medium-confidence items always go through PROPOSE regardless of action type.

### NEVER (hard boundaries)

Actions that /triage will never perform:

- **Never delete notes** -- even empty or duplicate-looking notes stay
- **Never edit note body text** -- only frontmatter is touched
- **Never merge notes** -- even if two notes appear to cover the same topic
- **Never rename files without explicit approval** -- renaming is always PROPOSE

## Output Format

Example of a typical triage report:

```
## Inbox Triage -- 5 notes

**Auto-applied** (high confidence)
- [[Docker Notes]] -- type: tool, tags: [docker, containers] -> filled frontmatter
- [[Meeting with Sarah]] -- type: meeting, created: 2026-03-05 -> filled frontmatter

**Proposed** (medium confidence)
- Move [[Docker Notes]] from Inbox to 03 - Resources/? (tool)
- Move [[Meeting with Sarah]] from Inbox to 01 - Projects/? (meeting)

**Needs Review** (low confidence)
- [[Random Thoughts]] -- could be zettel or daily? Please classify.

Approve proposed moves? (yes/no/select)
```

Notes:
- Auto-applied items are already done by the time the report is shown.
- Proposed items await user response before any action.
- Needs Review items require user classification -- Claude will not guess.

## Edge Cases

- **Empty inbox:** "Inbox is clear -- nothing to triage." No further action.
- **Note already has complete frontmatter:** Skip classification. Only check whether the note is in the correct folder for its type, and propose a move if not.
- **Note with `type: daily` in inbox root (not Daily Notes/):** Propose move to `00 - Inbox/Daily Notes/` subfolder.
- **Very short notes (< 50 chars body):** Flag as low confidence regardless of other signals. Short notes rarely have enough context for reliable classification.
- **File naming conflicts on move:** `moveNote()` checks for collisions. If a file with the same name exists at the target, report the conflict and skip the move. Never overwrite.
- **Notes with no content (empty files):** Classify as low confidence. Suggest the user add content or delete manually.
- **`--dry-run` mode:** Show all classifications and proposed actions without applying any changes.

## Utility Module

**File:** `triage-utils.cjs`

Provides inbox scanning, frontmatter fixing, and file operation functions used during the execution flow:

```javascript
const { getInboxNotes, applyFrontmatterFix, moveNote, getTargetFolder } = require('./.agents/skills/triage/triage-utils.cjs');
```

### Function Signatures

**`getInboxNotes(vaultRoot, vaultIndex)`**
Collects all notes in `00 - Inbox/` that need triage. Excludes Daily Notes subfolder, the Inbox.md file itself, and templates. Reads full file content for each qualifying note. Returns array of objects with path, name, content, frontmatter, tags, headings, links, hasType, and hasTags.

**`applyFrontmatterFix(vaultRoot, notePath, updates)`**
Modifies frontmatter fields on a note file (AUTO zone action). If no frontmatter exists, inserts a new block at the top. If frontmatter exists, updates/adds specified fields without disturbing other fields or the note body. Returns `{ applied: true, fields: [...] }`.

**`moveNote(vaultRoot, sourcePath, targetFolder)`**
Moves a note file from one folder to another (PROPOSE zone -- only call after user approval). Checks for filename collision at target. Returns `{ moved: true, from, to }` on success or `{ moved: false, reason }` on collision.

**`getTargetFolder(type)`**
Returns the canonical target folder for a given note type. Delegates to create-utils.cjs `getTemplateInfo` for consistent mapping. Returns folder string or null for unknown types.

### Dependencies

- `scan/utils.cjs` -- `loadJson` for reading JSON indexes
- `create/create-utils.cjs` -- `getTemplateInfo` for type-to-folder mapping, `ensureFreshIndexes` for index freshness
- `scan/scanner.cjs` -- `scan` for re-scanning after modifications

## Limitations

- **Classification relies on Claude's reasoning:** No algorithmic classifier. Classification quality depends on content richness and Claude's contextual understanding. Garbage in, uncertain results out.
- **No learning from corrections:** If a user corrects a classification, that correction applies to the single note. /triage does not "learn" from past corrections to improve future classifications (future enhancement opportunity).
- **Single-pass classification:** Each note is classified independently. Cross-note context (e.g., "these three notes are all about the same project") is not considered.
- **Tag suggestions are best-effort:** Suggested tags come from Claude's content analysis, not from a controlled vocabulary. Tags may not match existing tag conventions -- user review is recommended.
- **No batch undo:** Once AUTO actions are applied, they cannot be bulk-reverted. Individual notes can be manually edited to restore previous frontmatter.
