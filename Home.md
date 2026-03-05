---
type: home
tags:
  - navigation
  - home
---

# Second Brain - Home

> Dein zentrales Dashboard. Von hier aus erreichst du alles.

---

## Quick Navigation

| Bereich | Link |
|---------|------|
| Inbox | [[00 - Inbox/Inbox]] |
| Projekte | [[Projects MOC]] |
| Areas | [[Areas MOC]] |
| Ressourcen | [[Resources MOC]] |
| People | [[People MOC]] |
| Tools | [[Tools MOC]] |
| Code | [[Code MOC]] |
| Meetings | [[Meetings MOC]] |
| Entscheidungen | [[Decisions MOC]] |

---

## Aktive Projekte

```dataview
TABLE status, priority, updated
FROM "01 - Projects"
WHERE status = "active"
SORT priority ASC
LIMIT 5
```

## Heutige Aufgaben

```dataview
TASK
FROM "01 - Projects" OR "00 - Inbox"
WHERE !completed
LIMIT 10
```

## Letzte Aenderungen

```dataview
TABLE file.mtime AS "Geaendert"
FROM ""
WHERE type
SORT file.mtime DESC
LIMIT 10
```

---

## System

- [[CLAUDE|Claude Code Integration]]
- [[Workflow Guide]]
- [[Tag Conventions]]

---

*Letzte Aktualisierung: Nutze die Graph-View (Ctrl/Cmd+G) um alle Verbindungen zu sehen.*
