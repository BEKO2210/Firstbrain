---
name: health
trigger: /health
description: Detect orphan notes and broken wiki-links with suggested fixes
version: 3.0.0
---

# /health -- Vault Health Check

Quick diagnostic of vault health. Reports orphan notes (0-1 connections) and broken wiki-links with suggested fixes. Auto-fixes obvious typos (single clear match), proposes fixes for ambiguous cases, and flags items with no match for user attention.

## Usage

```
/health             # Full vault health report
/health --fix       # Auto-apply all auto-fixable broken links (Levenshtein <= 1, single match)
```

## What It Checks

| Check | Description | Threshold |
|-------|-------------|-----------|
| Orphan notes | Notes with 0-1 total connections (inbound + outbound resolved links) | Excludes templates, MOCs, system files |
| Broken links | Wiki-links pointing to nonexistent targets (`resolved: false` in link-map) | Excludes links from template files |

## Execution Flow

Claude follows these steps when `/health` is invoked:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` to rebuild indexes if stale (>5 min)
2. **Load indexes:**
   ```javascript
   const { loadJson } = require('./.agents/skills/scan/utils.cjs');
   const path = require('path');
   const indexDir = path.join('.', '.claude', 'indexes');
   const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));
   const linkMap = loadJson(path.join(indexDir, 'link-map.json'));
   ```
3. **Analyze health:**
   ```javascript
   const { analyzeHealth, classifyFix } = require('./.agents/skills/health/health-utils.cjs');
   const { orphans, brokenLinks, stats } = analyzeHealth(vaultIndex, linkMap);
   ```
4. **Display summary stats** at the top of the report:
   ```
   Vault Health: X orphan notes, Y broken links (Z total notes, W total links)
   ```
5. **Orphan section:** For each orphan note:
   - Show the note name and current connection count
   - Run a mini `findConnections` (from connect-utils.cjs) to suggest potential links based on the orphan's tags
   - Present suggestions so the user can decide which connections to add
6. **Broken links section:** For each broken link:
   a. Call `classifyFix(suggestions)` to determine the action
   b. If `auto`: Show the fix and mark for auto-application
      ```
      AUTO-FIX: [[Docekr]] -> [[Docker]] (in Note.md, typo correction)
      ```
   c. If `propose`: Show candidates and ask the user
      ```
      PROPOSE: [[dock]] in Note.md -- Did you mean: [[Docker]] or [[Docker Compose]]?
      ```
   d. If `manual`: Flag for user attention
      ```
      MANUAL: [[Nonexistent Note]] in Note.md -- No match found
      ```
7. **Apply auto-fixes** (if `--fix` flag is used):
   - Read each source file containing an auto-fixable broken link
   - Replace the broken link text `[[old target]]` with `[[correct target]]`
   - Write the file back
   - Log each fix to `.claude/changelog.md` (per governance AUTO zone)
8. **Re-scan:** Call `scan('.')` to update indexes after any fixes are applied

## Code Example

```javascript
const { analyzeHealth, suggestFixes, classifyFix, ensureFreshIndexes } = require('./.agents/skills/health/health-utils.cjs');
const { findConnections } = require('./.agents/skills/connect/connect-utils.cjs');
const { loadJson } = require('./.agents/skills/scan/utils.cjs');
const path = require('path');

// Step 1: Ensure indexes are current
ensureFreshIndexes('.');

// Step 2: Load indexes
const indexDir = path.join('.', '.claude', 'indexes');
const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));
const linkMap = loadJson(path.join(indexDir, 'link-map.json'));
const tagIndex = loadJson(path.join(indexDir, 'tag-index.json'));

// Step 3: Run health analysis
const { orphans, brokenLinks, stats } = analyzeHealth(vaultIndex, linkMap);

// Step 4: For each orphan, suggest connections
for (const orphan of orphans) {
  const suggestions = findConnections(orphan.path, vaultIndex, linkMap, tagIndex);
  console.log(`Orphan: ${orphan.name} (${orphan.connections} connections)`);
  console.log(`  Suggested links: ${suggestions.map(s => s.name).join(', ')}`);
}

// Step 5: Classify broken link fixes
for (const bl of brokenLinks) {
  const classification = classifyFix(bl.suggestions);
  console.log(`Broken: [[${bl.target}]] in ${bl.source} -> ${classification.action}`);
}
```

## Report Format

```
## Vault Health Report

**Summary:** 3 orphan notes, 2 broken links (47 total notes, 89 total links)

### Orphan Notes (0-1 connections)

1. **Note A** (0 connections)
   Suggested links: [[Related Note]], [[Another Note]]

2. **Note B** (1 connection)
   Suggested links: [[Topic Note]]

### Broken Wiki-Links

1. AUTO-FIX: [[Docekr]] -> [[Docker]] (in Project Notes.md)
2. PROPOSE: [[dock]] in Daily.md -- Did you mean: [[Docker]] or [[Docker Compose]]?
3. MANUAL: [[Nonexistent]] in Ideas.md -- No match found

### Actions Available
- Reply "fix all" to apply all auto-fixes
- Reply "fix 1" to apply a specific auto-fix
- For PROPOSE items, reply with your choice (e.g., "2: Docker")
```

## Governance

This skill respects the three governance zones defined in `.claude/rules/governance.md`:

| Zone | Action | When |
|------|--------|------|
| AUTO | Fix broken link automatically | Single clear match with Levenshtein distance <= 1 (obvious typo) |
| PROPOSE | Present fix candidates for user approval | Multiple possible matches or ambiguous correction |
| MANUAL | Flag for user attention | No match found -- user must decide |

**Logging:** All auto-fixes are logged to `.claude/changelog.md` as required by the AUTO zone governance rule.

## Limitations

- **Does not detect semantic orphans:** Notes with links but no meaningful content overlap are not flagged. Semantic analysis is deferred to Phase 4.
- **Does not check frontmatter consistency:** Missing or incorrect frontmatter fields are not reported. This is deferred to `/maintain` in Phase 5.
- **Fix suggestions are name-based:** Uses substring matching and Levenshtein distance on note names. Does not consider note content or aliases for fix suggestions.
- **Orphan threshold is fixed at 0-1:** Notes with exactly 2 connections are not flagged, even if they are poorly connected relative to vault average.
