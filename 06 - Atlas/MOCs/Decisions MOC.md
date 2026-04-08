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

> Decision log -- what was decided and why.

## Document New Decision

> Click on [[New Decision]], then **Ctrl+Shift+T** and select the `Decision` template.

## Open Decisions

```dataview
TABLE impact, date
FROM #decision
WHERE status = "pending"
SORT impact DESC
```

## Made Decisions

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
