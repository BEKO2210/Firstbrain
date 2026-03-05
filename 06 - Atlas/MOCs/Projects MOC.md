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

## Projektübersicht mit Details

```dataview
TABLE created, tags, file.mtime as "Zuletzt geändert"
FROM "01 - Projects"
WHERE type = "project" AND status = "active"
SORT file.mtime DESC
```

## Alle Projekte

```dataview
TABLE created, status, tags
FROM "01 - Projects"
WHERE type = "project"
SORT created DESC
```

---

## Navigation

- [[Home]]
- [[Areas MOC]]
- [[Resources MOC]]
- [[Decisions MOC]]
