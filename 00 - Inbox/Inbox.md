---
type: inbox
tags:
  - inbox
  - navigation
---

# Inbox

> All new thoughts, ideas, and notes land here.
> Go through regularly and move them to the right category.

## New Entries

<!-- Write quick notes here -->

-

## Inbox Rules

1. **Capture** — Write everything down immediately, do not filter
2. **Clarify** — What does this mean? Is it actionable?
3. **Organize** — Move to the right folder:
   - Actionable + project? -> `01 - Projects`
   - Area of responsibility? -> `02 - Areas`
   - Reference material? -> `03 - Resources`
   - No longer relevant? -> `04 - Archive`
4. **Review** — Empty the Inbox weekly ([[Weekly Review]])

## Unprocessed Notes

```dataview
LIST
FROM "00 - Inbox"
WHERE file.name != "Inbox"
SORT file.ctime DESC
```

---

[[Home]] | [[Projects MOC]]
