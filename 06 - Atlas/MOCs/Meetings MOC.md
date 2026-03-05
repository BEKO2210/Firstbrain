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

> Alle Meeting-Protokolle — chronologisch und nach Projekt.

## Neues Meeting protokollieren

> Klick auf [[Neues Meeting]], dann **Ctrl+Shift+T** → Template `Meeting` waehlen.

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
