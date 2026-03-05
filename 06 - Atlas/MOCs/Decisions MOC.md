---
type: moc
scope: decisions
created: 2024-01-01
updated: 2024-01-01
tags:
  - moc
  - navigation
---

# Decisions MOC

> Entscheidungslog - was wurde warum entschieden.

## Offene Entscheidungen

```dataview
TABLE impact, date
FROM #decision
WHERE status = "pending"
SORT impact DESC
```

## Schnelluebersicht

- [[Entscheidung — KI-Geschaeftsmodell]] — Entschieden: KI-Workflow-Automatisierung (high impact)

## Getroffene Entscheidungen

```dataview
TABLE impact, date
FROM #decision
WHERE status = "decided"
SORT date DESC
```

---

## Navigation

- [[Home]]
- [[Projects MOC]]
