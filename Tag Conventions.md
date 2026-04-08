---
type: system
tags:
  - system
  - conventions
---

# Tag Conventions

> Consistent tags for consistent organization.

## Type Tags (Frontmatter: type)

| Tag | Usage | Folder |
|-----|-------|--------|
| `project` | Time-limited endeavor | `01 - Projects` |
| `area` | Ongoing life area | `02 - Areas` |
| `resource` | Knowledge, articles, books | `03 - Resources` |
| `tool` | Software, services, utilities | `03 - Resources` |
| `person` | Contact, network | `02 - Areas` or `03 - Resources` |
| `meeting` | Meeting notes | `01 - Projects` or `02 - Areas` |
| `decision` | Decision log | `01 - Projects` |
| `code-snippet` | Code example | `03 - Resources` |
| `zettel` | Atomic knowledge note | `03 - Resources` |
| `daily` | Daily note | `00 - Inbox/Daily Notes` |
| `review` | Review note | `00 - Inbox` |
| `moc` | Map of Content | `06 - Atlas/MOCs` |

## Status Tags (Frontmatter: status)

| Status | Meaning |
|--------|---------|
| `active` | Currently being worked on |
| `planned` | Planned, not yet started |
| `on-hold` | Paused |
| `completed` | Finished |
| `archived` | Archived, no longer relevant |

## Priority Tags (Frontmatter: priority)

| Priority | Meaning |
|----------|---------|
| `high` | Urgent and important |
| `medium` | Important, not urgent |
| `low` | Nice-to-have |

## Topic Tags (in the tags array)

Use freely chosen topic tags, e.g.:
- `#programming` `#design` `#marketing` `#finance`
- `#health` `#learning` `#productivity`
- `#idea` `#question` `#insight`

## Rules

1. **Type and Status** always go in the frontmatter
2. **Topic tags** go in the `tags` array in the frontmatter
3. **No duplicates** — one consistent tag per concept
4. **English** for all tags (consistency)
5. **Lowercase** for all tags

---

[[Home]] | [[Workflow Guide]]
