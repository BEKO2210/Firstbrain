---
type: moc
scope: resources
created: 2024-01-01
updated: 2024-01-01
tags:
  - moc
  - navigation
---

# Resources MOC

> Wissen, Referenzen und Lernmaterial — organisiert nach Thema.

## Neu erstellen

> [[Neue Ressource]] | [[Neuer Zettel]] — dann **Ctrl+Shift+T** → passendes Template waehlen.

## Alle Ressourcen

```dataview
TABLE source, author, rating
FROM "03 - Resources"
WHERE type = "resource"
SORT rating DESC
```

## Zettel (Atomare Ideen)

```dataview
TABLE source, created
FROM "03 - Resources"
WHERE type = "zettel"
SORT created DESC
```

## Zuletzt hinzugefuegt

```dataview
TABLE created, type, source
FROM "03 - Resources"
SORT created DESC
LIMIT 10
```

---

## Navigation

- [[Home]]
- [[Projects MOC]]
- [[Tools MOC]]
- [[Code MOC]]
