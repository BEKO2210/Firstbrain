---
type: system
tags:
  - system
  - guide
---

# Workflow Guide

> Wie du dieses Second Brain System effektiv nutzt.

## Das PARA-Prinzip

Dieses System basiert auf **PARA** von Tiago Forte, erweitert mit **Zettelkasten** und **MOCs**.

| Ordner | Inhalt | Zeitrahmen |
|--------|--------|------------|
| **00 - Inbox** | Alles Neue, Unverarbeitete | Temporaer (woechentlich leeren) |
| **01 - Projects** | Aktive Projekte mit klarem Ziel | Begrenzt (Wochen/Monate) |
| **02 - Areas** | Lebensbereiche, Verantwortung | Dauerhaft |
| **03 - Resources** | Wissen, Referenzen | Dauerhaft |
| **04 - Archive** | Abgeschlossenes | Dauerhaft (inaktiv) |

## Taeglicher Workflow

### 1. Capture (jederzeit)
- Neue Gedanken -> `00 - Inbox`
- Nutze die **Daily Note** (Ctrl/Cmd+D) fuer den Tag

### 2. Process (taeglich, 10 Min)
- Inbox durchgehen
- Jede Notiz: Ist das actionable?
  - **Ja** -> Zum richtigen Projekt/Area verschieben
  - **Nein, aber interessant** -> `03 - Resources`
  - **Nein** -> Loeschen oder `04 - Archive`

### 3. Create (bei Bedarf)
- Neue Notizen immer mit Template erstellen
- Mindestens 2 Wiki-Links pro Notiz setzen
- Frontmatter ausfuellen

### 4. Connect (fortlaufend)
- Beim Erstellen: "Welche bestehenden Notizen passen dazu?"
- Wiki-Links setzen: `[[Notizname]]`
- Die **Graph View** (Ctrl/Cmd+G) zeigt alle Verbindungen

## Woechentlicher Workflow

Nutze das **[[Weekly Review]]** Template:

1. Inbox komplett leeren
2. Projekte reviewen - Status aktualisieren
3. Kalender der naechsten Woche pruefen
4. Tasks priorisieren

## Mit Claude Code arbeiten

### Claude als Wissensassistent
Claude kann dieses Vault lesen und verstehen. Nutze es fuer:

- **"Fasse Projekt X zusammen"** - Claude liest die Projektnotiz und verlinkte Ressourcen
- **"Erstelle eine neue Projektnotiz fuer Y"** - Claude nutzt das Template
- **"Welche Verbindungen gibt es zwischen A und B?"** - Claude folgt den Links
- **"Erstelle ein Meeting-Protokoll"** - Claude nutzt das Meeting-Template
- **"Was weiss ich ueber Thema Z?"** - Claude durchsucht Resources und Zettel

### Cross-Project Arbeit
Dieses Vault funktioniert projektuebergreifend:

1. **Ein Projekt erstellen** -> In `01 - Projects/` mit Template
2. **Mit Area verlinken** -> `area: "[[Gesundheit]]"` im Frontmatter
3. **Ressourcen zuordnen** -> Wiki-Links zu `03 - Resources/`
4. **Meetings protokollieren** -> `project: "[[Mein Projekt]]"` im Meeting
5. **Entscheidungen tracken** -> Decision-Template nutzen

## Tipps

- **Atomic Notes**: Eine Idee = eine Notiz (Zettelkasten-Prinzip)
- **Eigene Worte**: Immer in eigenen Worten zusammenfassen
- **Links > Ordner**: Die Kraft liegt in den Verbindungen, nicht der Ordnerstruktur
- **Graph View**: Regelmaessig die Verbindungen visualisieren
- **Nicht perfektionieren**: Lieber schnell erfassen als perfekt formatieren

---

[[Home]] | [[Tag Conventions]]
