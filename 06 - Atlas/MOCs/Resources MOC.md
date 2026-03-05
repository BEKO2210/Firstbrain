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

> Wissen, Referenzen und Lernmaterial - organisiert nach Thema.

## Schnelluebersicht

### Buecher & Kurse
- [[Buch — Building a Second Brain (Tiago Forte)]] — Rating: 5
- [[Kurs — ChatGPT und KI fuer Unternehmer]] — Rating: 3

### Videos
- [[YouTube — AI Automation Agency Modell]] — Rating: 4

### Zettel (Atomare Ideen)
- [[Zettel — Atomare Notizen schreiben]]
- [[Zettel — Die 1000-Euro-Regel fuer Side Business]]
- [[Zettel — KI-Agenten als Geschaeftsmodell]]

## Alle Ressourcen

```dataview
TABLE source, author, rating
FROM "03 - Resources"
WHERE type = "resource"
SORT rating DESC
```

## Nach Tags

```dataview
TABLE tags
FROM "03 - Resources"
SORT file.name ASC
```

## Zuletzt hinzugefuegt

```dataview
TABLE created, source
FROM "03 - Resources"
SORT created DESC
LIMIT 10
```

---

## Alle Ressourcen (erweitert)

```dataview
TABLE created, tags, rating
FROM "03 - Resources"
WHERE type = "resource" OR type = "zettel" OR type = "book"
SORT created DESC
```

---

## Navigation

- [[Home]]
- [[Projects MOC]]
- [[Tools MOC]]
- [[Code MOC]]
