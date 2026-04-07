---
name: maintain
trigger: /maintain
description: Audit vault consistency -- detect frontmatter issues, stale projects, and outdated references with auto-fix and proposed corrections
version: 3.0.0
---

# /maintain -- Vault Maintenance

A three-part vault consistency audit that detects frontmatter issues, stale projects, and outdated references. Separates fixes into governance zones: safe issues are auto-fixed (AUTO zone), judgment calls are proposed for review (PROPOSE zone), and destructive actions are never taken (NEVER zone). Think of it as the vault's self-care routine -- catching drift, decay, and inconsistency before they accumulate.

## Usage

```
/maintain                  # Full maintenance report
/maintain --fix            # Auto-apply all safe fixes (AUTO zone)
/maintain --stale-days 60  # Custom staleness threshold (default: 30 days)
```

## What It Checks

| Check | Severity | Auto-fixable | Governance |
|-------|----------|--------------|------------|
| Missing type | Critical | No (needs judgment) | PROPOSE |
| Invalid type value | Warning | No (needs judgment) | PROPOSE |
| Missing created date | Warning | Yes (from file mtime) | AUTO |
| Missing tags array | Warning | Yes (add empty []) | AUTO |
| Type/folder mismatch | Info | No (structural move) | PROPOSE |
| Invalid status value | Warning | No (needs judgment) | PROPOSE |
| Tag casing (uppercase) | Warning | Yes (lowercase) | AUTO |
| Stale projects | Info | No (status decision) | PROPOSE |
| Outdated references | Info | No (review needed) | READ-ONLY |

## Execution Flow

Claude follows these steps when `/maintain` is invoked:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` from health-utils to rebuild indexes if stale (>5 min).

2. **Load indexes:** Read `vault-index.json` and `link-map.json` from `.claude/indexes/`.

3. **Run consistency checks:** Call `runConsistencyChecks(vaultIndex)` to detect frontmatter and tag issues across all notes. Returns categorized issues (critical, warning, info) with auto-fix eligibility.

4. **Find stale projects:** Call `getStaleProjects(vaultIndex, staleDays)` to identify active/planned projects untouched for the threshold period (default 30 days). Returns sorted list with last-modified dates.

5. **Find outdated references:** Call `getOutdatedReferences(vaultIndex, linkMap)` to detect notes that link to completed or archived items. Returns source-target pairs with suggestions.

6. **Present structured report** in priority order:
   - **Critical Issues** (missing type) -- needs user classification
   - **Auto-fixable Issues** (missing created, tag casing, missing tags) -- can be applied with `--fix`
   - **Proposed Fixes** (type mismatch, invalid values, folder moves) -- needs user decision
   - **Stale Projects** -- with last-modified dates and suggested actions
   - **Outdated References** -- links to completed/archived notes for review

7. **If `--fix` flag:** Apply auto-fixes via `applyAutoFixes(vaultRoot, issues)`, then report results (files fixed, fields changed).

8. **Collect user decisions** on proposed fixes. For each proposed fix, present options and apply upon approval.

9. **Re-scan:** Call `scan('.')` after any modifications to rebuild indexes with the changes.

10. **Log actions** to `.claude/changelog.md` for any structural changes or auto-fixes applied.

## Report Format

Example output of a typical `/maintain` run:

```
## Vault Maintenance Report

**Critical** (1 issue)
- [[Random Notes]] -- missing type field. What type is this note?

**Auto-fixable** (3 issues)
- [[Docker Notes]] -- missing created date (will set to 2026-02-15 from file date)
- [[Meeting Notes]] -- tag "Docker" should be lowercase "docker"
- [[Quick Idea]] -- missing tags array (will add empty [])
Run /maintain --fix to apply these automatically.

**Proposed** (2 issues)
- [[Tool -- Git]] in 00 - Inbox/ should be in 03 - Resources/ (type: tool)
- [[Old Project]] has status "wip" -- should be "active" or "planned"?

**Stale Projects** (1 project)
- [[Blog Platform]] -- active, last modified 2026-01-15 (51 days ago)
  Consider: update status to on-hold or archive?

**Outdated References** (1 reference)
- [[Current Workflow]] links to [[Old API]] (status: archived)
  Review if this reference is still relevant.

Summary: 1 critical, 3 auto-fixable, 2 proposed, 1 stale, 1 outdated
```

## Governance

Explicit governance zone mapping for all /maintain actions:

| Zone | Actions | Classification |
|------|---------|----------------|
| Content | Fix missing created date (from mtime), lowercase tags, add empty tags array | AUTO |
| Content | Type reclassification, status correction | PROPOSE |
| Content | Delete files, edit body text, force-override user classifications | NEVER |
| Structure | Folder moves for type/folder mismatch | PROPOSE |
| Structure | Delete folders, remove notes from MOCs | NEVER |
| System | Log fixes to changelog | AUTO |
| System | Delete system files | NEVER |
| Read-only | Outdated reference detection, stale project flagging | READ-ONLY |

**AUTO actions** are applied immediately when `--fix` is used. Each auto-fix is logged to `.claude/changelog.md`.

**PROPOSE actions** are presented to the user with context and rationale. The user decides whether to apply them.

**NEVER actions** are hard boundaries -- /maintain will never delete files, edit note body text, or force-override user classifications under any circumstances.

**READ-ONLY actions** surface information for the user to review. No modifications are made or proposed.

## Configuration

| Setting | Default | Override |
|---------|---------|----------|
| Stale threshold | 30 days | `--stale-days N` |
| System notes excluded | Home, START HERE, Workflow Guide, Tag Conventions, Inbox | Constant in maintain-utils.cjs |
| Templates excluded | All notes with isTemplate flag | Automatic |
| Atlas notes excluded | All notes in 06 - Atlas/ | Automatic |

## Edge Cases

- **Clean vault (no issues):** Display "Vault is in good shape -- no issues found." with a brief summary of what was checked (note count, link count).
- **Many issues (50+):** Show top 10 per category with "N more issues..." summary. Offer to show the full list on request.
- **Recently archived project still linked:** Flag as outdated reference but note it may be intentional (recent archival is normal).
- **No vault-index.json:** Trigger a full scan first via `ensureFreshIndexes`, then proceed.
- **Note deleted since last scan:** Skip gracefully during auto-fix (file read will fail, caught and skipped).
- **`--fix` with no auto-fixable issues:** Display "No auto-fixable issues found. Vault frontmatter is consistent."

## Utility Module

**File:** `maintain-utils.cjs`

Provides consistency checking, staleness detection, and fix application utilities:

```javascript
const {
  runConsistencyChecks,
  getStaleProjects,
  getOutdatedReferences,
  applyAutoFixes
} = require('./.agents/skills/maintain/maintain-utils.cjs');
```

### Function Signatures

**`runConsistencyChecks(vaultIndex)`**
Scans all notes for frontmatter and tag consistency issues. Returns `{ critical: [...], warning: [...], info: [...] }` with each issue containing type, path, name, fix description, autoFixable flag, and optional autoFix object.

**`getStaleProjects(vaultIndex, staleDays?)`**
Finds active/planned projects with mtime older than the threshold (default 30 days). Returns array sorted oldest-first with path, name, status, priority, lastModified date, days since modification, and suggested action.

**`getOutdatedReferences(vaultIndex, linkMap)`**
Detects resolved links where the target note has status completed or archived. Returns array of source-target pairs with targetStatus and suggestion text. Deduplicates source-target pairs.

**`applyAutoFixes(vaultRoot, issues)`**
Applies all autoFixable issues by modifying only the frontmatter block of each affected file. Groups fixes by file path for efficiency. Returns `{ fixed: number, details: [{path, name, fieldsFixed}] }`. Never modifies content outside frontmatter.

### Dependencies

- `scan/utils.cjs` -- `loadJson` for reading JSON files
- `health/health-utils.cjs` -- `ensureFreshIndexes` for pre-flight index freshness check (used in execution flow, not imported by maintain-utils)
- `scan/scanner.cjs` -- `scan` for post-fix re-indexing (used in execution flow, not imported by maintain-utils)

## Limitations

- **Type classification requires judgment:** Missing type is flagged but not auto-fixed because the correct type depends on note content and user intent.
- **Staleness is mtime-based:** Uses file modification time from the vault index. A metadata-only change (e.g., tag edit) resets the stale clock even if the note content is unchanged.
- **No historical tracking:** Each /maintain run is independent. Does not compare to previous runs or track fix history beyond the changelog.
- **Link map dependency:** Outdated reference detection requires a valid link-map.json from the scan infrastructure. If link-map is missing or stale, ensureFreshIndexes handles this.
