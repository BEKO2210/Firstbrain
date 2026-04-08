---
type: moc
scope: resources
created: 2024-01-01
updated: 2024-01-01
tags:
  - moc
  - navigation
---

# Resources MOC

> Knowledge, references, and learning material -- organized by topic.

## Create New

> [[New Resource]] | [[New Zettel]] -- then **Ctrl+Shift+T** and select the appropriate template.

## All Resources

```dataview
TABLE source, author, rating
FROM "03 - Resources"
WHERE type = "resource"
SORT rating DESC
```

## Zettel (Atomic Ideas)

```dataview
TABLE source, created
FROM "03 - Resources"
WHERE type = "zettel"
SORT created DESC
```

## Recently Added

```dataview
TABLE created, type, source
FROM "03 - Resources"
SORT created DESC
LIMIT 10
```

---

## Navigation

- [[Home]]
- [[Projects MOC]]
- [[Tools MOC]]
- [[Code MOC]]
