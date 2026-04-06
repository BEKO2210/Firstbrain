---
name: process
trigger: /process
description: Scan Inbox for PROMPT:-prefixed notes, execute instructions, create files, link to MOCs, and archive prompts
version: 1.0.0
---

# /process -- Command Processor

Scans `00 - Inbox/` for Markdown files whose body begins with `PROMPT:`, interprets the instructions, creates the requested files in the correct PARA folders, links them to the appropriate MOCs, archives the prompt to `03 - Resources/Prompts/`, and logs every action to a per-project CHANGELOG.md.

## Usage

```
/process              # Scan inbox and process all PROMPT: files
/process --dry-run    # Show what would be created without making changes
```

## What It Does

1. **Scan** `00 - Inbox/` for `.md` files starting with `PROMPT:` (after optional frontmatter)
2. **Parse** the prompt text to identify: requested deliverables, target note types, project name, and relevant tags
3. **Create** requested files using vault templates, placing them in the correct PARA folders (`01 - Projects/`, `03 - Resources/`, etc.)
4. **Link** new files to the appropriate MOCs in `06 - Atlas/MOCs/` (static link insertion for non-Dataview MOCs, or note that Dataview will auto-list)
5. **Connect** new files to existing related notes using `/connect` logic (tag overlap + link adjacency)
6. **Archive** the processed prompt file to `03 - Resources/Prompts/` with metadata recording execution results
7. **Log** all actions to the project's CHANGELOG.md and to `.claude/changelog.md`

## Prompt File Format

Prompt files in the Inbox should follow this structure:

```markdown
PROMPT: <instruction text>
<optional multi-line details>
```

Or with frontmatter:

```markdown
---
tags: [prompt]
---

PROMPT: <instruction text>
<optional multi-line details>
```

The `PROMPT:` marker must appear as the first non-whitespace content after any frontmatter block.

## Execution Flow

Claude follows these steps when `/process` is invoked:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` to rebuild if stale.

2. **Discover prompt files:** Call `discoverPromptFiles('.', vaultIndex)` to find all Inbox notes starting with `PROMPT:`.

3. **Empty check:** If no prompt files found, report: "No PROMPT: files found in Inbox." and stop.

4. **For each prompt file:**

   a. **Read and parse:** Extract the prompt text after `PROMPT:`.

   b. **Analyze intent:** Claude reads the prompt and determines:
      - What files to create (projects, resources, tasks, etc.)
      - What note types to use (project, resource, zettel, tool, etc.)
      - What tags apply
      - Which existing notes are related

   c. **Create files:** For each requested deliverable:
      - Select the correct template via `getTemplateInfo(type)`
      - Read and substitute template variables via `substituteVariables()`
      - Write the file to the correct PARA folder via `buildFileName()`
      - Fill in content based on the prompt instructions

   d. **Link to MOCs:** For each created file, check the relevant MOC:
      - If MOC uses Dataview: note will appear automatically
      - If MOC is static: add a `- [[Note Name]]` entry

   e. **Connect to existing notes:** Use `findConnections()` from connect-utils to discover related notes. Add wiki-links in the `## Connections` section of each new file.

   f. **Log to CHANGELOG:** Call `appendChangelog()` to record:
      - Timestamp
      - Created/changed file paths
      - Reference to the source prompt file

   g. **Archive prompt:** Move the processed prompt file to `03 - Resources/Prompts/` with updated frontmatter recording execution status.

5. **Re-scan:** Call `scan('.')` to update all vault indexes.

6. **Report:** Present a summary of all actions taken.

## Code Example

```javascript
const { discoverPromptFiles, extractPromptText, appendChangelog,
        archivePrompt, formatProcessReport } = require('./.agents/skills/process/process-utils.cjs');
const { ensureFreshIndexes, getTemplateInfo, buildFileName, getDateVars,
        substituteVariables, suggestWikiLinks, mocUsesDataview } = require('./.agents/skills/create/create-utils.cjs');
const { findConnections } = require('./.agents/skills/connect/connect-utils.cjs');
const { scan } = require('./.agents/skills/scan/scanner.cjs');
const { loadJson } = require('./.agents/skills/scan/utils.cjs');
const { moveNote } = require('./.agents/skills/triage/triage-utils.cjs');
const fs = require('fs');
const path = require('path');

// 1. Ensure indexes are fresh
ensureFreshIndexes('.');

// 2. Load indexes
const indexDir = path.join('.', '.claude', 'indexes');
const vaultIndex = loadJson(path.join(indexDir, 'vault-index.json'));
const tagIndex = loadJson(path.join(indexDir, 'tag-index.json'));
const linkMap = loadJson(path.join(indexDir, 'link-map.json'));

// 3. Discover prompt files
const promptFiles = discoverPromptFiles('.', vaultIndex);

// 4. Process each prompt
for (const pf of promptFiles) {
  const promptText = extractPromptText(pf.content);

  // Claude analyzes promptText and determines what to create...
  // (This is where Claude's reasoning takes over)

  // After creating files, log each action:
  appendChangelog('.', {
    timestamp: new Date().toISOString(),
    action: 'created',
    file: 'path/to/new-file.md',
    promptRef: pf.path,
  });

  // Archive the prompt
  archivePrompt('.', pf.path, {
    status: 'processed',
    processedDate: new Date().toISOString().slice(0, 10),
    createdFiles: ['path/to/file1.md', 'path/to/file2.md'],
  });
}

// 5. Re-scan
scan('.');
```

## CHANGELOG Format

Each project gets a `CHANGELOG.md` in its project folder. Format:

```markdown
# Changelog

## 2026-04-06

- **Created** `Task -- Unteraufgabe 1.md` (from [[Prompt -- Neuer App-Plan]])
- **Created** `Task -- Unteraufgabe 2.md` (from [[Prompt -- Neuer App-Plan]])
- **Linked** to [[Projects MOC]], [[Resources MOC]]
```

Global actions are also logged to `.claude/changelog.md`.

## Governance

- **AUTO:** Create files from explicit prompt instructions, fill frontmatter, add to MOCs, archive prompt, update changelog
- **PROPOSE:** Nothing -- the user explicitly triggered /process, so all prompt-derived actions are authorized
- **NEVER:** Delete files, edit existing note body text, merge notes

## Prompt Archive

Processed prompts are moved to `03 - Resources/Prompts/` with updated frontmatter:

```yaml
---
type: resource
created: 2026-04-06
tags: [prompt, processed]
status: processed
processed-date: 2026-04-06
created-files:
  - "01 - Projects/Beat to the Kiss.md"
  - "03 - Resources/Task -- Unteraufgabe 1.md"
---
```

The [[Prompts MOC]] in `06 - Atlas/MOCs/` tracks all prompts by category and status.

## Limitations

- **Claude-dependent:** The prompt interpretation step relies entirely on Claude's reasoning. The utility module handles file discovery, archiving, and logging -- but the creative work of understanding and executing the prompt is Claude's responsibility.
- **Single-pass:** Each prompt is processed once. If the result is unsatisfactory, create a new prompt to iterate.
- **No undo:** Files created by /process follow normal vault governance. They can be archived but not auto-deleted.
- **Prompt format:** The `PROMPT:` prefix is required. Notes without it are ignored by /process (use /triage for those).
