---
type: moc
scope: projects
created: 2024-01-01
updated: 2024-01-01
tags:
  - moc
  - navigation
---

# Projects MOC

## Summary

Übersicht aller laufenden Projekte.
Fokus auf Wissensmanagement und Effizienz.
Optimierung des Systems ist oberste Priorität.

> All active and planned projects at a glance.

## Create New Project

> Click on [[New Project]], then **Ctrl+Shift+T** and select the `Project` template.

## Active Projects

```dataview
TABLE status, priority, area
FROM "01 - Projects"
WHERE status = "active"
SORT priority ASC
```

## Planned Projects

```dataview
TABLE status, priority
FROM "01 - Projects"
WHERE status = "planned"
SORT priority ASC
```

## By Area

```dataview
TABLE area, status
FROM "01 - Projects"
WHERE status != "archived"
GROUP BY area
```

## Recently Completed

```dataview
TABLE status, updated
FROM "01 - Projects"
WHERE status = "completed"
SORT updated DESC
LIMIT 10
```

---

## Connections

- **Navigation:** [[Home]], [[Lebensbereiche]], [[Ressourcen]], [[Entscheidungen]]
- **Knowledge Graph:** [[Skills Uebersicht]], [[Prompt Sammlung]]
