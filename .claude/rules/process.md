---
name: process-rule
scope: inbox-processing
---

# Command Processor Rule

## Trigger

When the user types `/process`, immediately execute the Command Processor workflow:

1. **Scan** `00 - Inbox/` for all Markdown files whose body starts with `PROMPT:` (after optional frontmatter)
2. **Read** each prompt's full instruction text
3. **Create** the requested deliverables (code, text, plans, notes) in the correct PARA folders using vault templates
4. **Link** each new file to the appropriate MOC in `06 - Atlas/MOCs/`
5. **Connect** new files to related existing notes using `/connect` logic (tag overlap + link adjacency)
6. **Log** every action to:
   - The project's `CHANGELOG.md` (timestamp, file, prompt reference)
   - `.claude/changelog.md` (global log)
7. **Archive** the processed prompt to `03 - Resources/Prompts/` with execution metadata

## Prompt File Detection

A file qualifies as a prompt file when:
- It is located in `00 - Inbox/` (not in Daily Notes subfolder)
- Its body text (after any YAML frontmatter) begins with `PROMPT:` (case-insensitive)

## Processing Utilities

```javascript
const { discoverPromptFiles, extractPromptText, appendProjectChangelog,
        appendGlobalChangelog, archivePrompt, formatProcessReport,
        getTopFolder } = require('./.agents/skills/process/process-utils.cjs');
```

## Governance

- All file creation from explicit prompts is **AUTO** (user authorized via `/process`)
- File archiving (moving prompt from Inbox to Resources/Prompts) is **AUTO**
- **NEVER** delete any file, edit existing note body text, or merge notes
- **NEVER** process files that don't have the `PROMPT:` marker

## External Content Integration

When files from external AI tools (Gemini, Kimi, etc.) are placed in `00 - Inbox/`:
- If they start with `PROMPT:` -- process them via `/process`
- If they don't -- they will be handled by `/triage` instead
- Run `/scan` after adding external files to update vault indexes
