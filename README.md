# Second Brain - Obsidian Edition

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Obsidian](https://img.shields.io/badge/Obsidian-7C3AED?logo=obsidian&logoColor=white)
![Claude Code](https://img.shields.io/badge/Claude_Code-AI_powered-orange)

Ein vollständiges **Second Brain System** für [Obsidian](https://obsidian.md), optimiert für die Nutzung mit **Claude Code** als KI-Assistent. Basierend auf bewährten Methoden: PARA, Zettelkasten und Maps of Content (MOC).

## Was ist das?

Dieses Repository ist ein vorkonfigurierter Obsidian Vault, der wie ein menschliches Gehirn funktioniert:

- **Neuronen** = Einzelne Notizen (atomare Wissenseinheiten)
- **Synapsen** = Wiki-Links `[[zwischen Notizen]]`
- **Gehirnregionen** = Ordner (Projects, Areas, Resources)
- **Navigationspfade** = Maps of Content (MOCs)
- **Gedächtnis** = Frontmatter-Metadaten + Tags

## Für wen ist das?

| Persona | Nutzen |
|---------|--------|
| **Wissensarbeiter** | Strukturiere dein gesamtes Wissen über Projekte, Meetings und Entscheidungen hinweg. Verknüpfe Ideen und finde Zusammenhänge, die dir sonst entgehen würden. |
| **Entwickler** | Dokumentiere Code-Snippets, Architektur-Entscheidungen und technische Ressourcen. Nutze Claude Code direkt im Vault für KI-gestützte Recherche und Automatisierung. |
| **Studenten** | Organisiere Vorlesungsnotizen, Lernmaterial und Prüfungsvorbereitung nach dem Zettelkasten-Prinzip. Verbinde Wissen aus verschiedenen Fächern intelligent miteinander. |

## Schnellstart

### 1. Repository klonen

```bash
git clone https://github.com/BEKO2210/Second_brain_Obsidian_Edition-.git
```

### 2. In Obsidian öffnen

1. Obsidian starten
2. "Open folder as vault" wählen
3. Den geklonten Ordner auswählen
4. **Empfohlen:** Community Plugin [Dataview](https://github.com/blacksmithgu/obsidian-dataview) installieren

### 3. Loslegen

1. Öffne `Home.md` — dein zentrales Dashboard
2. Lies den `Workflow Guide` für die Nutzung
3. Erstelle deine erste Notiz in `00 - Inbox`

## Ordnerstruktur

```
/
├── 00 - Inbox/              # Sammelpunkt für neue Gedanken
│   └── Daily Notes/         # Tagesnotizen
├── 01 - Projects/           # Aktive Projekte (zeitlich begrenzt)
├── 02 - Areas/              # Lebensbereiche (Gesundheit, Finanzen, ...)
├── 03 - Resources/          # Wissen, Bücher, Artikel, Tools
├── 04 - Archive/            # Abgeschlossenes
├── 05 - Templates/          # 11 vorgefertigte Vorlagen
│   ├── Project.md
│   ├── Area.md
│   ├── Resource.md
│   ├── Daily Note.md
│   ├── Meeting.md
│   ├── Person.md
│   ├── Zettel.md
│   ├── Weekly Review.md
│   ├── Code Snippet.md
│   ├── Tool.md
│   └── Decision.md
├── 06 - Atlas/
│   └── MOCs/                # 8 Maps of Content (Navigation)
│       ├── Projects MOC.md
│       ├── Areas MOC.md
│       ├── Resources MOC.md
│       ├── People MOC.md
│       ├── Tools MOC.md
│       ├── Code MOC.md
│       ├── Meetings MOC.md
│       └── Decisions MOC.md
├── 07 - Extras/             # Bilder, Anhänge, Kanban
├── Home.md                  # Zentrales Dashboard
├── Workflow Guide.md        # Anleitung zur Nutzung
├── Tag Conventions.md       # Tag-System Referenz
└── CLAUDE.md                # Claude Code Konfiguration
```

## Das System verstehen

### PARA-Methode (Ordner)

| Ordner | Frage | Beispiel |
|--------|-------|---------|
| **Projects** | Was arbeite ich gerade aktiv daran? | "Website Relaunch", "Umzug" |
| **Areas** | Wofür bin ich dauerhaft verantwortlich? | "Gesundheit", "Finanzen", "Karriere" |
| **Resources** | Was könnte in Zukunft nützlich sein? | Buch-Notizen, Tutorials, Artikel |
| **Archive** | Was ist abgeschlossen? | Fertige Projekte, alte Ressourcen |

### Zettelkasten (Denkweise)

- **Eine Idee = Eine Notiz** (atomar)
- **Eigene Worte** (nicht kopieren, sondern verstehen)
- **Verlinken** statt kategorisieren
- Nutze das `Zettel.md` Template

### Maps of Content (Navigation)

MOCs sind Index-Seiten, die verwandte Notizen zusammenfassen. Sie nutzen **Dataview-Queries** um automatisch relevante Notizen anzuzeigen.

## CLAUDE.md — KI-Integration

Dieses Vault enthält eine `CLAUDE.md`-Datei, die Claude Code automatisch liest und ihm beibringt, wie er mit deinem Second Brain arbeiten soll:

- **Vault Struktur** — Claude kennt alle Ordner und deren Zweck
- **Konventionen** — Jede Notiz bekommt korrektes Frontmatter (`type`, `created`, `tags`) und einen `## Verbindungen`-Abschnitt mit Wiki-Links
- **Wiki-Links** — Claude verwendet `[[Notizname]]` und verlinkt neue Notizen mit mindestens 2 bestehenden
- **Templates** — Claude wählt automatisch das passende Template aus `05 - Templates/`
- **Cross-Project Arbeit** — Claude navigiert über MOCs und `Home.md` und verknüpft Projekte, Areas und Ressourcen

> Starte einfach `claude` im Vault-Ordner — die Integration funktioniert sofort.

## Mit Claude Code nutzen

Dieses Vault ist speziell für die Arbeit mit Claude Code optimiert:

```bash
# Im Vault-Ordner:
claude

# Beispiel-Befehle:
# "Erstelle ein neues Projekt für meinen Blog"
# "Fasse alle Ressourcen zum Thema Marketing zusammen"
# "Welche offenen Tasks habe ich?"
# "Erstelle ein Meeting-Protokoll für heute"
# "Verlinke meine Notiz XY mit relevanten Ressourcen"
```

Claude liest die `CLAUDE.md` automatisch und kennt:
- Die Ordnerstruktur und Konventionen
- Alle Templates und wann welches zu nutzen ist
- Wie Wiki-Links und Frontmatter funktionieren
- Wie cross-project Verbindungen hergestellt werden

## Projektübergreifend arbeiten

Das System funktioniert als **zentrales Gehirn** über alle Projekte hinweg:

```
Projekt A ──┐
             ├── verlinkt auf ──> Ressource "React Patterns"
Projekt B ──┘

Meeting X ──> verlinkt auf ──> Person Y ──> verlinkt auf ──> Projekt A

Entscheidung Z ──> beeinflusst ──> Projekt A + Projekt B
```

Jede Notiz kann auf jede andere verlinken. Die **Graph View** (Ctrl/Cmd+G) zeigt alle Verbindungen als visuelles Netzwerk.

## Empfohlene Plugins

| Plugin | Zweck | Notwendig? |
|--------|-------|------------|
| **Dataview** | Automatische Listen und Tabellen | Sehr empfohlen |
| **Templater** | Erweiterte Templates | Optional |
| **Calendar** | Daily Notes Kalender | Optional |
| **Kanban** | Kanban-Boards | Optional |

## Beitragen

Beiträge sind willkommen! Lies die [CONTRIBUTING.md](CONTRIBUTING.md) für Details zu:
- Bug-Reports und Feature-Vorschläge
- Neue Templates einreichen
- Pull Requests erstellen

## Lizenz

MIT — Frei nutzbar für alle.

---

Wenn dir dieses System hilft, hinterlasse einen ⭐ auf [GitHub](https://github.com/BEKO2210/Second_brain_Obsidian_Edition-)!
