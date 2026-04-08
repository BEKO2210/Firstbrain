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

> All meeting minutes -- chronological and by project.

## Record New Meeting

> Click on [[New Meeting]], then **Ctrl+Shift+T** and select the `Meeting` template.

## Recent Meetings

```dataview
TABLE date, participants, project
FROM #meeting
SORT date DESC
LIMIT 20
```

## By Project

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
