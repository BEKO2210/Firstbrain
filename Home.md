---
type: home
tags:
  - navigation
  - home
---

# Mein Second Brain

> Von hier aus erreichst du alles. Klick auf einen Link — fertig.

---

## Neue Notiz erstellen

> Einfach auf den passenden Link klicken. Obsidian oeffnet eine neue Seite.
> Dann **Ctrl+Shift+T** → passendes Template auswaehlen → loslegen.

| Was willst du? | Klick hier | Template |
|----------------|------------|----------|
| Neues Projekt starten | [[Neues Projekt]] | `Project` |
| Lebensbereich anlegen | [[Neuer Bereich]] | `Area` |
| Wissen festhalten | [[Neue Ressource]] | `Resource` |
| Tool dokumentieren | [[Neues Tool]] | `Tool` |
| Eigene Idee notieren | [[Neuer Zettel]] | `Zettel` |
| Entscheidung festhalten | [[Neue Entscheidung]] | `Decision` |
| Person/Kontakt | [[Neue Person]] | `Person` |
| Meeting protokollieren | [[Neues Meeting]] | `Meeting` |
| Code Snippet speichern | [[Neues Snippet]] | `Code Snippet` |

> **Tipp:** Benenne die Notiz nach dem Erstellen um — z.B. `Neues Projekt` → `Website Relaunch`.

---

## Uebersicht

### Aktive Projekte

```dataview
TABLE status, priority, area
FROM "01 - Projects"
WHERE status = "active"
SORT priority ASC
```

### Offene Aufgaben

```dataview
TASK
FROM "01 - Projects" OR "00 - Inbox"
WHERE !completed
LIMIT 15
```

### Letzte Aenderungen

```dataview
TABLE file.mtime AS "Geaendert", type
FROM ""
WHERE type AND type != "home" AND type != "moc"
SORT file.mtime DESC
LIMIT 10
```

---

## Navigation

| Bereich | Was findest du dort? |
|---------|---------------------|
| [[00 - Inbox/Inbox\|Inbox]] | Alles was neu reinkommt |
| [[Projects MOC]] | Alle Projekte (aktiv, geplant, abgeschlossen) |
| [[Areas MOC]] | Deine Lebensbereiche (Beruf, Familie, Hobbys...) |
| [[Resources MOC]] | Buecher, Kurse, Videos, Artikel |
| [[Tools MOC]] | Software und Dienste die du nutzt |
| [[People MOC]] | Kontakte und Netzwerk |
| [[Code MOC]] | Code Snippets und Loesungen |
| [[Meetings MOC]] | Meeting-Protokolle |
| [[Decisions MOC]] | Entscheidungslog |

---

## Erste Schritte

Noch leer hier? Das ist gewollt — dein Brain waechst mit dir.

1. **Leg dein erstes Projekt an** → Klick oben auf [[Neues Projekt]]
2. **Definiere deine Lebensbereiche** → z.B. Beruf, Familie, Gesundheit
3. **Halte eine Idee fest** → [[Neuer Zettel]] fuer deinen ersten Gedanken
4. **Mehr erfahren?** → [[START HERE]] erklaert alles Schritt fuer Schritt

---

## System & Hilfe

- [[START HERE]] — Anleitung fuer den Einstieg
- [[Workflow Guide]] — Wie du taeglich mit dem System arbeitest
- [[Tag Conventions]] — Welche Tags es gibt und wann du sie nutzt
- [[CLAUDE|Claude Code]] — KI-Assistent fuer dein Second Brain

*Nutze die Graph-View (**Ctrl/Cmd+G**) um alle Verbindungen zu sehen.*
