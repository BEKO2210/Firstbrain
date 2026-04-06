---
type: moc
scope: prompts
created: 2026-04-06
updated: 2026-04-06
tags:
  - moc
  - navigation
  - prompts
---

# Prompts MOC

> All processed prompts -- organized by category and status.

## How It Works

1. Drop a note starting with `PROMPT:` into `00 - Inbox/`
2. Run `/process` in Claude Code
3. Claude reads the prompt, creates the requested files, and archives the prompt here

## All Prompts

```dataview
TABLE status, processed-date, created-files
FROM "03 - Resources/Prompts"
WHERE type = "resource" AND contains(tags, "prompt")
SORT processed-date DESC
```

## By Category

### Musik

```dataview
LIST
FROM "03 - Resources/Prompts"
WHERE contains(tags, "musik") OR contains(tags, "music")
SORT processed-date DESC
```

### Code & Technik

```dataview
LIST
FROM "03 - Resources/Prompts"
WHERE contains(tags, "code") OR contains(tags, "tech")
SORT processed-date DESC
```

### Projekte

```dataview
LIST
FROM "03 - Resources/Prompts"
WHERE contains(tags, "project")
SORT processed-date DESC
```

## Unprocessed Prompts (Inbox)

```dataview
LIST
FROM "00 - Inbox"
WHERE contains(file.content, "PROMPT:")
```

---

## Navigation

- [[Home]]
- [[Projects MOC]]
- [[Resources MOC]]
