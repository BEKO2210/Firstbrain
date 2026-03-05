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

> Dein Netzwerk — Kontakte, Kollegen, Kunden.

## Neuen Kontakt anlegen

> Klick auf [[Neue Person]], dann **Ctrl+Shift+T** → Template `Person` waehlen.

## Alle Personen

```dataview
TABLE role, company
FROM #person
SORT file.name ASC
```

## Nach Unternehmen

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
