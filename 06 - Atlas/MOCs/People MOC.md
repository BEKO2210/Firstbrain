---
type: moc
scope: people
created: 2024-01-01
updated: 2024-01-01
tags:
  - moc
  - navigation
---

# People MOC

> Netzwerk und Kontakte - wer kennt wen, wer arbeitet woran.

## Alle Personen

```dataview
TABLE role, company
FROM #person
SORT file.name ASC
```

## Nach Unternehmen

```dataview
TABLE role
FROM #person
WHERE company
GROUP BY company
```

---

## Navigation

- [[Home]]
- [[Projects MOC]]
- [[Meetings MOC]]
