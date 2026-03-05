---
type: moc
scope: code
created: 2024-01-01
updated: 2024-01-01
tags:
  - moc
  - navigation
---

# Code MOC

> Code Snippets, Patterns und technisches Wissen.

## Alle Snippets

```dataview
TABLE language, project
FROM #snippet OR #code
WHERE type = "code-snippet"
SORT language ASC
```

## Nach Sprache

```dataview
TABLE WITHOUT ID file.link AS "Snippet"
FROM #code
GROUP BY language
```

---

## Navigation

- [[Home]]
- [[Tools MOC]]
- [[Projects MOC]]
