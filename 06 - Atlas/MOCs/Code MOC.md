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

> Code snippets, solutions, and technical knowledge.

## Save New Snippet

> Click on [[New Snippet]], then **Ctrl+Shift+T** and select the `Code Snippet` template.

## All Snippets

```dataview
TABLE language, project
FROM #snippet OR #code
WHERE type = "code-snippet"
SORT language ASC
```

## By Language

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
