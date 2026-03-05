---
type: moc
scope: meetings
created: 2024-01-01
updated: 2024-01-01
tags:
  - moc
  - navigation
---

# Meetings MOC

> Alle Meeting-Notizen chronologisch und nach Projekt.

## Letzte Meetings

```dataview
TABLE date, participants, project
FROM #meeting
SORT date DESC
LIMIT 20
```

## Nach Projekt

```dataview
TABLE date
FROM #meeting
WHERE project
GROUP BY project
```

---

## Navigation

- [[Home]]
- [[Projects MOC]]
- [[People MOC]]
