---
type: home
tags:
  - navigation
  - home
---

# My Second Brain

> Everything is reachable from here. Click a link — done.

---

## Create a New Note

> Simply click the appropriate link. Obsidian opens a new page.
> Then **Ctrl+Shift+T** → select the matching template → start writing.

| What do you want? | Click here | Template |
|-------------------|------------|----------|
| Start a new project | [[New Project]] | `Project` |
| Create a life area | [[New Area]] | `Area` |
| Capture knowledge | [[New Resource]] | `Resource` |
| Document a tool | [[New Tool]] | `Tool` |
| Jot down an idea | [[New Zettel]] | `Zettel` |
| Record a decision | [[New Decision]] | `Decision` |
| Person/Contact | [[New Person]] | `Person` |
| Log a meeting | [[New Meeting]] | `Meeting` |
| Save a code snippet | [[New Snippet]] | `Code Snippet` |

> **Tip:** Rename the note after creating it — e.g. `New Project` → `Website Relaunch`.

---

## Overview

### Active Projects

```dataview
TABLE status, priority, area
FROM "01 - Projects"
WHERE status = "active"
SORT priority ASC
```

### Open Tasks

```dataview
TASK
FROM "01 - Projects" OR "00 - Inbox"
WHERE !completed
LIMIT 15
```

### Recent Changes

```dataview
TABLE file.mtime AS "Modified", type
FROM ""
WHERE type AND type != "home" AND type != "moc"
SORT file.mtime DESC
LIMIT 10
```

---

## Navigation

| Section | What you will find there |
|---------|------------------------|
| [[00 - Inbox/Inbox\|Inbox]] | Everything new that comes in |
| [[Projects MOC]] | All projects (active, planned, completed) |
| [[Areas MOC]] | Your life areas (career, family, hobbies...) |
| [[Resources MOC]] | Books, courses, videos, articles |
| [[Tools MOC]] | Software and services you use |
| [[People MOC]] | Contacts and network |
| [[Code MOC]] | Code snippets and solutions |
| [[Meetings MOC]] | Meeting notes |
| [[Decisions MOC]] | Decision log |

---

## Getting Started

Empty here? That is by design — your brain grows with you.

1. **Create your first project** → Click [[New Project]] above
2. **Define your life areas** → e.g. career, family, health
3. **Capture an idea** → [[New Zettel]] for your first thought
4. **Learn more?** → [[START HERE]] explains everything step by step

---

## System & Help

- [[START HERE]] — Getting started guide
- [[Workflow Guide]] — How to work with the system daily
- [[Cheatsheet]] — All 15 skills and commands at a glance
- [[Tag Conventions]] — Available tags and when to use them
- [[CLAUDE|Claude Code]] — AI assistant for your Second Brain

*Use the Graph View (**Ctrl/Cmd+G**) to see all connections.*
