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

> Deine Lebensbereiche — alles was dauerhaft laeuft und Aufmerksamkeit braucht.

## Neuen Bereich anlegen

> Klick auf [[Neuer Bereich]], dann **Ctrl+Shift+T** → Template `Area` waehlen.

## Bereiche

```dataview
TABLE status, updated
FROM "02 - Areas"
WHERE type = "area"
SORT file.name ASC
```

## Bereiche mit aktiven Projekten

```dataview
TABLE length(filter(file.inlinks, (x) => contains(meta(x).path, "01 - Projects"))) AS "Projekte"
FROM "02 - Areas"
SORT file.name ASC
```

---

## Navigation

- [[Home]]
- [[Projects MOC]]
- [[Resources MOC]]
- [[People MOC]]
