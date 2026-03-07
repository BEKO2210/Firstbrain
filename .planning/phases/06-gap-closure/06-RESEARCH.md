# Phase 6: Gap Closure - Research

**Researched:** 2026-03-08
**Domain:** Bug fixes in maintain-utils.cjs and triage-utils.cjs
**Confidence:** HIGH

## Summary

Phase 6 closes three specific integration bugs identified by the v1.1 milestone audit. All three are precisely located, root-caused, and have known fixes. No new libraries, no architecture changes, no design decisions -- this is surgical code repair.

**Bug 1 (PROA-09):** `getOutdatedReferences()` in `maintain-utils.cjs` uses `link.resolvedPath` on lines 384, 386, 388 but the actual field in link-map.json is `link.targetPath`. The function silently returns an empty array for every call because `link.resolvedPath` is always `undefined`.

**Bug 2 (PROA-08):** `getStaleProjects()` in `maintain-utils.cjs` has no template guard. The file `05 - Templates/Project.md` (which has `type: project`, `status: active`) is reported as a stale project. The `isExcluded()` helper exists and checks `noteData.isTemplate`, but it is only called by `runConsistencyChecks`, not by `getStaleProjects`.

**Bug 3 (non-blocking, PROA-02 edge case):** `getTargetFolder('review')` in `triage-utils.cjs` delegates to `create-utils.cjs getTemplateInfo('review')` which returns `null` because TEMPLATE_MAP uses `'weekly'` and `'monthly'` as keys, not `'review'`. The frontmatter `type: review` has no mapping.

**Primary recommendation:** Fix all three in a single plan. Each fix is 1-3 lines of code change. Also fix the "12 valid types" documentation typo in triage SKILL.md (says 12, lists 11).

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROA-08 | /maintain detects stale projects (without false positives) | Bug 2: Add `isTemplate` guard or path check to `getStaleProjects()` in maintain-utils.cjs |
| PROA-09 | /maintain detects outdated references | Bug 1: Replace `link.resolvedPath` with `link.targetPath` in `getOutdatedReferences()` in maintain-utils.cjs |
</phase_requirements>

## Standard Stack

### Core

No new libraries needed. All fixes are within existing `.agents/skills/` modules.

| File | Location | Purpose |
|------|----------|---------|
| maintain-utils.cjs | `.agents/skills/maintain/maintain-utils.cjs` | Consistency checks, staleness, outdated references |
| triage-utils.cjs | `.agents/skills/triage/triage-utils.cjs` | Inbox classification, type-to-folder mapping |
| create-utils.cjs | `.agents/skills/create/create-utils.cjs` | Template mapping, `TEMPLATE_MAP` constant |

### Data Files

| File | Location | Purpose |
|------|----------|---------|
| link-map.json | `.claude/indexes/link-map.json` | Wiki-link resolution data (schema uses `targetPath`, not `resolvedPath`) |
| vault-index.json | `.claude/indexes/vault-index.json` | Note metadata including `isTemplate` flag and `frontmatter` |

## Architecture Patterns

### Existing Pattern: isTemplate Guard

The scanner (`parser.cjs` line 260) sets `isTemplate = normalizedPath.startsWith('05 - Templates/')` on every parsed note. This flag is available in vault-index.json entries.

Three existing functions already use this guard:
- `isExcluded()` in maintain-utils.cjs (line 159): `if (noteData.isTemplate) return true;`
- `isExcludedFromRecent()` in briefing-utils.cjs (line 55): `if (noteData.isTemplate) return true;`
- `getStaleProjects()` in briefing-utils.cjs (line 122): `if (noteData.isTemplate) continue;`

The pattern is consistent: check `noteData.isTemplate` at the top of the iteration loop before any other logic.

### Existing Pattern: link-map.json Schema

The link-map schema (produced by `indexer.cjs buildLinkMap()`) uses these fields per link entry:

```javascript
{
  source: "sourcePath",      // Vault-relative source file path
  target: "linkTarget",      // Raw wiki-link target text
  targetPath: "resolved/path.md",  // Resolved vault-relative path (or null)
  resolved: true,            // Whether the link was resolved
  alias: null,               // Display alias if [[target|alias]]
  heading: null               // Heading reference if [[target#heading]]
}
```

There is NO `resolvedPath` field. The correct field name is `targetPath`. This is confirmed by:
1. `indexer.cjs` lines 64, 97-101: explicitly writes `targetPath`
2. `link-map.json` on disk: every entry uses `targetPath`

### Existing Pattern: Type-to-Folder Mapping

`create-utils.cjs TEMPLATE_MAP` has 13 entries using these keys:
```
project, area, resource, tool, zettel, person, decision, meeting,
code-snippet, daily, weekly, monthly
```

CLAUDE.md defines 11 frontmatter types:
```
project, area, resource, tool, person, meeting, decision,
code-snippet, zettel, daily, review
```

The mismatch: `review` is a frontmatter type, but TEMPLATE_MAP has `weekly` and `monthly` instead. Both `Weekly Review.md` and `Monthly Review.md` templates use `type: review` in their frontmatter, but the TEMPLATE_MAP keys are `weekly` and `monthly` to distinguish which template to use.

`maintain-utils.cjs TYPE_FOLDER_MAP` already has the correct mapping: `'review': '00 - Inbox'`. This is the correct pattern -- map the frontmatter type, not the template variant.

## Don't Hand-Roll

Not applicable -- this phase makes targeted fixes to existing code. No new functionality is being built.

## Common Pitfalls

### Pitfall 1: Fixing resolvedPath in Wrong Places
**What goes wrong:** Replacing `resolvedPath` globally across the codebase instead of only in `getOutdatedReferences`.
**Why it happens:** Over-eager search-and-replace.
**How to avoid:** The fix is scoped to lines 384, 386, 388 of `maintain-utils.cjs`. Only these three lines reference `link.resolvedPath`. Verify no other files use `resolvedPath` (they don't -- confirmed by grep).

### Pitfall 2: Using Path Check vs isTemplate for Stale Projects
**What goes wrong:** Adding `notePath.startsWith('05 - Templates/')` instead of `noteData.isTemplate` (or vice versa).
**Why it happens:** briefing-utils uses both checks (isTemplate AND path check).
**How to avoid:** Either approach works. The `isTemplate` flag is set based on `05 - Templates/` path in the parser, so they are equivalent. However, `isTemplate` is the idiomatic approach used elsewhere in the codebase. For belt-and-suspenders safety, briefing-utils uses both -- the maintain-utils fix should use at minimum `noteData.isTemplate` for consistency with `runConsistencyChecks` which already uses `isExcluded()`.

### Pitfall 3: Breaking getTargetFolder for weekly/monthly
**What goes wrong:** Adding `'review'` to TEMPLATE_MAP but then breaking the `weekly`/`monthly` distinction that `buildFileName()` and other create-utils functions depend on.
**Why it happens:** The naive fix is to add `'review': { template: ..., folder: '00 - Inbox', prefix: '' }` to TEMPLATE_MAP, but this creates ambiguity for which template to use.
**How to avoid:** The fix should be in `triage-utils.cjs getTargetFolder()` itself -- add a fallback that maps `'review'` to `'00 - Inbox'` when `getTemplateInfo` returns null, rather than modifying TEMPLATE_MAP. Alternatively, add a `'review'` entry to TEMPLATE_MAP pointing to `Weekly Review.md` (reasonable default). The cleanest approach is to handle it in `getTargetFolder` since the function only needs the folder, not the template.

### Pitfall 4: Not Testing Against Actual Data
**What goes wrong:** Making the fix and calling it done without verifying against the live vault-index.json and link-map.json.
**Why it happens:** The original Phase 5 plan passed static verification but failed integration verification.
**How to avoid:** After the fix, verify by examining: (1) link-map.json entries with resolved targetPaths, (2) vault-index.json entries in `05 - Templates/` that have `type: project`, (3) `getTargetFolder('review')` returns a string not null.

## Code Examples

### Bug 1 Fix: resolvedPath -> targetPath (maintain-utils.cjs)

**Current code (lines 383-388):**
```javascript
for (const link of links) {
    if (!link.resolved || !link.resolvedPath) continue;

    const targetPath = link.resolvedPath.replace(/\\/g, '/');
    const sourcePath = (link.source || '').replace(/\\/g, '/');
    const targetNote = notes[targetPath] || notes[link.resolvedPath];
```

**Fixed code:**
```javascript
for (const link of links) {
    if (!link.resolved || !link.targetPath) continue;

    const targetPath = link.targetPath.replace(/\\/g, '/');
    const sourcePath = (link.source || '').replace(/\\/g, '/');
    const targetNote = notes[targetPath] || notes[link.targetPath];
```

**Scope:** 3 occurrences of `resolvedPath` on lines 384, 386, 388. Replace each with `targetPath`.

### Bug 2 Fix: isTemplate Guard (maintain-utils.cjs)

**Current code (lines 333-337):**
```javascript
for (const [notePath, noteData] of Object.entries(notes)) {
    const fm = noteData.frontmatter || {};

    // Only projects
    if (fm.type !== 'project') continue;
```

**Fixed code:**
```javascript
for (const [notePath, noteData] of Object.entries(notes)) {
    // Skip template files (e.g., 05 - Templates/Project.md)
    if (noteData.isTemplate) continue;

    const fm = noteData.frontmatter || {};

    // Only projects
    if (fm.type !== 'project') continue;
```

**Scope:** Add one line after the `for` loop opens, before any other logic.

### Bug 3 Fix: review Type Folder Mapping (triage-utils.cjs)

**Current code (lines 301-305):**
```javascript
function getTargetFolder(type) {
  const info = getTemplateInfo(type);
  if (!info) return null;
  return info.folder;
}
```

**Fixed code:**
```javascript
// Fallback for types not in TEMPLATE_MAP (e.g., 'review' maps to 'weekly'/'monthly')
const TYPE_FOLDER_FALLBACK = {
  'review': '00 - Inbox',
};

function getTargetFolder(type) {
  const info = getTemplateInfo(type);
  if (info) return info.folder;
  return TYPE_FOLDER_FALLBACK[type] || null;
}
```

**Scope:** Add a constant and modify the function to use fallback before returning null.

### Documentation Fix: triage SKILL.md line 63

**Current:** `one of the 12 valid types: project, area, resource, tool, person, meeting, decision, code-snippet, zettel, daily, review`

**Fixed:** `one of the 11 valid types: project, area, resource, tool, person, meeting, decision, code-snippet, zettel, daily, review`

## State of the Art

Not applicable -- this phase is bug-fixing, not technology adoption.

## Open Questions

None. All three bugs are fully root-caused with known fixes. No ambiguity remains.

## Sources

### Primary (HIGH confidence)

All findings are from direct inspection of the actual source files in the repository:

- `maintain-utils.cjs` (499 lines) -- Direct code inspection confirmed `link.resolvedPath` on lines 384, 386, 388; confirmed missing `isTemplate` guard in `getStaleProjects`
- `indexer.cjs` -- Direct code inspection confirmed link-map schema uses `targetPath` (lines 64, 97-101)
- `link-map.json` -- Direct data inspection confirmed all entries use `targetPath`, no `resolvedPath` field exists
- `parser.cjs` -- Direct code inspection confirmed `isTemplate` is set on line 260 based on `05 - Templates/` path
- `create-utils.cjs` -- Direct code inspection confirmed TEMPLATE_MAP has no `'review'` key (uses `'weekly'`/`'monthly'`)
- `briefing-utils.cjs` -- Direct code inspection confirmed correct `isTemplate` guard pattern (line 122)
- `triage-utils.cjs` -- Direct code inspection confirmed `getTargetFolder` delegates to `getTemplateInfo` which returns null for `'review'`
- `v1.1-MILESTONE-AUDIT.md` -- Gap identification and root cause analysis

## Metadata

**Confidence breakdown:**
- Bug 1 (resolvedPath): HIGH - Direct code + data inspection, field mismatch is unambiguous
- Bug 2 (isTemplate): HIGH - Direct code inspection, pattern exists in codebase, false positive documented
- Bug 3 (review type): HIGH - Direct code inspection, TEMPLATE_MAP keys verified, mismatch is clear
- All fixes: HIGH - Each is 1-5 lines of change with zero architectural risk

**Research date:** 2026-03-08
**Valid until:** Indefinite (bug fixes don't expire)
