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

> Your network -- contacts, colleagues, clients.

## Create New Contact

> Click on [[New Person]], then **Ctrl+Shift+T** and select the `Person` template.

## All People

```dataview
TABLE role, company
FROM #person
SORT file.name ASC
```

## By Company

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
