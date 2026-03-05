# Second Brain - Claude Code Integration

## Initial Prompt

Wenn jemand Claude Code in diesem Vault startet, soll er diesen Text als erstes eingeben:

```
Lies die CLAUDE.md und mach dich mit meinem Second Brain vertraut.
Ich moechte dass du mir hilfst, Notizen zu erstellen, zu suchen
und zu verknuepfen. Halte dich an die Templates und Konventionen.
```

## Vault Struktur

Dieses Repository ist ein Obsidian Vault, das als "Second Brain" fungiert.

```
/
├── 00 - Inbox/          # Neue Notizen, Daily Notes
├── 01 - Projects/       # Aktive Projekte (zeitlich begrenzt)
├── 02 - Areas/          # Lebensbereiche (dauerhaft)
├── 03 - Resources/      # Wissen, Referenzen, Lernmaterial
├── 04 - Archive/        # Abgeschlossenes, Inaktives
├── 05 - Templates/      # Vorlagen fuer neue Notizen (NICHT bearbeiten)
├── 06 - Atlas/MOCs/     # Maps of Content (Navigation)
├── 07 - Extras/         # Attachments, Kanban
└── .claude/             # Claude-spezifische Konfiguration
```

## Wichtige Einstiegspunkte

- `Home.md` — Zentrales Dashboard mit Ein-Klick-Erstellung neuer Notizen
- `START HERE.md` — Benutzerfreundliche Anleitung fuer Einsteiger
- `Workflow Guide.md` — Taegliche Arbeitsablaeufe
- `Tag Conventions.md` — Alle Tags und deren Bedeutung

## Templates (in `05 - Templates/`)

| Template | Ordner fuer neue Notiz | type-Wert |
|----------|----------------------|-----------|
| Project.md | `01 - Projects/` | project |
| Area.md | `02 - Areas/` | area |
| Resource.md | `03 - Resources/` | resource |
| Tool.md | `03 - Resources/` | tool |
| Zettel.md | `03 - Resources/` | zettel |
| Person.md | `03 - Resources/` | person |
| Decision.md | `01 - Projects/` | decision |
| Meeting.md | `01 - Projects/` | meeting |
| Code Snippet.md | `03 - Resources/` | code-snippet |
| Daily Note.md | `00 - Inbox/Daily Notes/` | daily |
| Weekly Review.md | `00 - Inbox/` | review |
| Monthly Review.md | `00 - Inbox/` | review |

Template-Variablen: `{{date}}` → aktuelles Datum (YYYY-MM-DD), `{{title}}` → Dateiname, `{{time}}` → aktuelle Uhrzeit

## Konventionen

### Neue Notizen erstellen
1. Waehle IMMER das passende Template aus der Tabelle oben
2. Erstelle die Notiz im richtigen Ordner (siehe Tabelle)
3. Ersetze Template-Variablen: `{{date}}` → aktuelles Datum, `{{title}}` → gewaehlter Titel
4. Fuege mindestens 2 Wiki-Links zu bestehenden Notizen hinzu
5. Stelle sicher dass der `## Verbindungen` Abschnitt ausgefuellt ist

### Frontmatter
Jede Notiz hat YAML-Frontmatter mit mindestens:
```yaml
---
type: [project|area|resource|tool|person|meeting|decision|code-snippet|zettel|daily|review]
created: YYYY-MM-DD
tags: []
---
```

### Wiki-Links
- Verwende `[[Notizname]]` fuer Querverweise
- Verwende `[[Notizname|Anzeigename]]` wenn der Anzeigename abweicht
- Jede neue Notiz MUSS mindestens 2 Verbindungen zu bestehenden Notizen haben

### Tags
- Typ-Tags: `#project` `#area` `#resource` `#tool` `#person` `#meeting` `#decision` `#code` `#snippet` `#zettel`
- Status-Tags im Frontmatter: `active`, `planned`, `on-hold`, `completed`, `archived`
- Prioritaets-Tags: `high`, `medium`, `low`
- Tags sind IMMER englisch und lowercase

### Dateinamen
- Projekte: Beschreibender Name → `Website Relaunch.md`
- Areas: Bereichsname → `Gesundheit.md`
- Resources: Prefix + Name → `Buch — Titel.md`, `Tool — Name.md`, `Zettel — Idee.md`
- Daily Notes: Datum → `YYYY-MM-DD.md`
- Decisions: `Entscheidung — Thema.md`

## Arbeitsweise mit Claude

### Wenn du eine neue Notiz erstellst:
1. Lies das passende Template aus `05 - Templates/`
2. Erstelle die Notiz im richtigen Ordner
3. Ersetze alle Template-Variablen ({{date}}, {{title}}, {{time}})
4. Fuege sinnvolle Wiki-Links zu bestehenden Notizen hinzu
5. Stelle sicher dass das Frontmatter komplett und korrekt ist

### Wenn du nach Informationen suchst:
1. Starte bei `Home.md` oder der relevanten MOC in `06 - Atlas/MOCs/`
2. Folge den Wiki-Links
3. Nutze Grep fuer Volltextsuche im Vault

### Wenn du ein Projekt bearbeitest:
1. Lies zuerst die Projektnotiz in `01 - Projects/`
2. Schaue die verlinkten Ressourcen und Areas an
3. Pruefe das Meeting-Log und Entscheidungen

### Cross-Project Arbeit
- Projekte koennen auf Areas, Ressourcen und andere Projekte verweisen
- MOCs in `06 - Atlas/MOCs/` dienen als Navigation
- Das `Home.md` ist das zentrale Dashboard
- Wenn eine neue Notiz thematisch zu einer MOC passt, verlinke sie dort
