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

> Alle aktiven und geplanten Projekte auf einen Blick.

## Neues Projekt anlegen

> Klick auf [[Neues Projekt]], dann **Ctrl+Shift+T** → Template `Project` waehlen.

## Aktive Projekte

```dataview
TABLE status, priority, area
FROM "01 - Projects"
WHERE status = "active"
SORT priority ASC
```

## Geplante Projekte

```dataview
TABLE status, priority
FROM "01 - Projects"
WHERE status = "planned"
SORT priority ASC
```

## Nach Area

```dataview
TABLE area, status
FROM "01 - Projects"
WHERE status != "archived"
GROUP BY area
```

## Kuerzlich abgeschlossen

```dataview
TABLE status, updated
FROM "01 - Projects"
WHERE status = "completed"
SORT updated DESC
LIMIT 10
```

---

## Navigation

- [[Home]]
- [[Areas MOC]]
- [[Resources MOC]]
- [[Decisions MOC]]
