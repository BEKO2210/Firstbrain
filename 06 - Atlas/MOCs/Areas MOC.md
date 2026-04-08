---
type: moc
scope: areas
created: 2024-01-01
updated: 2024-01-01
tags:
  - moc
  - navigation
---

# Areas MOC

> Your life areas -- everything that runs continuously and needs attention.

## Create New Area

> Click on [[New Area]], then **Ctrl+Shift+T** and select the `Area` template.

## Areas

```dataview
TABLE status, updated
FROM "02 - Areas"
WHERE type = "area"
SORT file.name ASC
```

## Areas with Active Projects

```dataview
TABLE length(filter(file.inlinks, (x) => contains(meta(x).path, "01 - Projects"))) AS "Projects"
FROM "02 - Areas"
SORT file.name ASC
```

---

## Navigation

- [[Home]]
- [[Projects MOC]]
- [[Resources MOC]]
- [[People MOC]]
