---
name: create
trigger: /create
description: Create a new note from template with filled frontmatter and wiki-link suggestions
version: 3.0.0
---

# /create -- Note Creator

Creates a new note by selecting the appropriate template, filling frontmatter, substituting all template variables, suggesting wiki-links to related notes, and placing the file in the correct target folder. Supports all 12 note types defined in the vault.

**Invocation style:** Hybrid -- natural language when intent is clear, guided prompts when ambiguous. Show-and-proceed transparency: Claude announces template selection and target folder, then creates without waiting for confirmation.

## Usage

**Natural language (Claude infers type and title):**
```
"create a tool note about Docker"         -> type=tool, title=Docker
"new project for Website Relaunch"        -> type=project, title=Website Relaunch
"add a zettel about emergent behavior"    -> type=zettel, title=Emergent Behavior
"log meeting with Sarah about Q2 plans"   -> type=meeting, title=Sarah Q2 Plans
```

**Explicit invocation:**
```
/create tool Docker
/create project Website Relaunch
/create decision API Strategy
```

**Guided (when ambiguous):**
```
/create
```
Claude asks: "What type of note? (project, area, resource, tool, zettel, person, decision, meeting, code-snippet, daily, weekly, monthly)" then asks for the title.

## Template Mapping

| Type | Template File | Target Folder | Filename Prefix | Example Filename |
|------|--------------|---------------|-----------------|------------------|
| project | Project.md | 01 - Projects/ | (none) | Website Relaunch.md |
| area | Area.md | 02 - Areas/ | (none) | Health.md |
| resource | Resource.md | 03 - Resources/ | (none) | Book -- Clean Code.md |
| tool | Tool.md | 03 - Resources/ | Tool -- | Tool -- Docker.md |
| zettel | Zettel.md | 03 - Resources/ | Zettel -- | Zettel -- Emergent Behavior.md |
| person | Person.md | 03 - Resources/ | Person -- | Person -- Sarah Chen.md |
| decision | Decision.md | 01 - Projects/ | Decision -- | Decision -- API Strategy.md |
| meeting | Meeting.md | 01 - Projects/ | Meeting -- | Meeting -- Standup 2026-03-07.md |
| code-snippet | Code Snippet.md | 03 - Resources/ | Snippet -- | Snippet -- Quicksort.md |
| daily | Daily Note.md | 00 - Inbox/Daily Notes/ | (none) | 2026-03-07.md |
| weekly | Weekly Review.md | 00 - Inbox/ | (none) | Weekly Review 2026-03-07.md |
| monthly | Monthly Review.md | 00 - Inbox/ | (none) | Monthly Review 2026-03-07.md |

## Execution Flow

Claude follows these steps when /create is invoked:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` to refresh vault indexes if stale (older than 5 minutes).

2. **Determine note type:** Parse user input to identify the note type. If ambiguous, ask the user to specify from the 12 available types.

3. **Look up template info:** Call `getTemplateInfo(type)` to get the template filename, target folder, and filename prefix.

4. **Read template file:** Load template content from `05 - Templates/{template}`.

5. **Compute date variables:** Call `getDateVars(today)` to get `{ date, yesterday, tomorrow, time }`.

6. **Build filename:** Call `buildFileName(type, title, date)` to construct the correct filename per naming conventions.

7. **Substitute template variables:** Call `substituteVariables(content, vars)` with `vars = { date, title, time, yesterday, tomorrow }`. This handles:
   - Standard: `{{date}}`, `{{title}}`, `{{time}}`, `{{yesterday}}`, `{{tomorrow}}`
   - Templater-style: `{{date:YYYY-MM-DD}}`, `{{date:MMMM YYYY}}`, `{{date:ww}}`, `{{date:YYYY}}`

8. **Load vault indexes:** Read `vault-index.json` and `tag-index.json` from `.claude/indexes/`.

9. **Suggest wiki-links:** Call `suggestWikiLinks(type, tags, vaultIndex, tagIndex)` to generate 3-5 ranked suggestions based on shared tags, with the relevant MOC boosted (+2 score).

10. **Write note file:** Write the substituted content to `{folder}/{filename}`.

11. **Check MOC format:** Call `mocUsesDataview('.', mocPath)` on the relevant MOC. If the MOC uses Dataview queries, the note will appear automatically via its frontmatter type/tags. If the MOC is static (no Dataview), add a wiki-link to the MOC (AUTO zone governance).

12. **Re-scan:** Call `scan('.')` to update indexes with the new note.

13. **Report to user:** Announce:
    - Template used and target folder
    - Created file path
    - 3-5 wiki-link suggestions with reasons (shared tags, relevant MOC)
    - Whether the note was added to a MOC (or will appear via Dataview)

## Code Example

```javascript
const { ensureFreshIndexes, getTemplateInfo, buildFileName, getDateVars,
        substituteVariables, suggestWikiLinks, mocUsesDataview } = require('./.agents/skills/create/create-utils.cjs');
const { scan } = require('./.agents/skills/scan/scanner.cjs');
const { loadJson } = require('./.agents/skills/scan/utils.cjs');
const fs = require('fs');
const path = require('path');

// 1. Ensure indexes are fresh
ensureFreshIndexes('.');

// 2-3. Determine type and get template info
const type = 'tool';  // from user input
const title = 'Docker';
const info = getTemplateInfo(type);
// info = { template: 'Tool.md', folder: '03 - Resources', prefix: 'Tool -- ' }

// 4. Read template
const templateContent = fs.readFileSync(path.join('05 - Templates', info.template), 'utf8');

// 5. Compute date vars
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const vars = getDateVars(today);
vars.title = info.prefix + title; // "Tool -- Docker"

// 6. Build filename
const filename = buildFileName(type, title, today);
// "Tool -- Docker.md"

// 7. Substitute variables
const content = substituteVariables(templateContent, vars);

// 8. Load indexes
const vaultIndex = loadJson('.claude/indexes/vault-index.json');
const tagIndex = loadJson('.claude/indexes/tag-index.json');

// 9. Suggest wiki-links
const suggestions = suggestWikiLinks(type, ['tool'], vaultIndex, tagIndex, 5);

// 10. Write file
const targetPath = path.join(info.folder, filename);
fs.writeFileSync(targetPath, content, 'utf8');

// 11. Check MOC
const usesDataview = mocUsesDataview('.', '06 - Atlas/MOCs/Tools MOC.md');

// 12. Re-scan
scan('.');
```

## Edge Cases

- **Unknown type:** Ask the user to specify from the list of 12 supported types. Do not guess.
- **Template file not found:** Report error with the expected template path. Do not create a blank note.
- **File already exists:** Warn the user that a note with that name already exists in the target folder. Ask whether to open the existing note or create with a modified name.
- **Empty title:** For types that require a title (all except daily), ask the user to provide one.
- **Special characters in title:** Use the title as-is in the filename (Obsidian handles special characters in filenames).

## Limitations

- Does not edit note body text (NEVER zone governance). Only fills template variables and frontmatter.
- Does not support custom templates beyond the 12 defined types. New template types require updating CLAUDE.md and create-utils.cjs.
- Does not auto-create folders. Target folders must already exist in the vault structure.
- Wiki-link suggestions are based on tag overlap only (Level 1). Semantic similarity deferred to Phase 4.
