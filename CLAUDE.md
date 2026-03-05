# Second Brain - Claude Code Integration

## Vault Struktur

Dieses Repository ist ein Obsidian Vault, das als "Second Brain" fungiert.

```
/
├── 00 - Inbox/          # Neue Notizen, Daily Notes
├── 01 - Projects/       # Aktive Projekte (zeitlich begrenzt)
├── 02 - Areas/          # Lebensbereiche (dauerhaft)
├── 03 - Resources/      # Wissen, Referenzen, Lernmaterial
├── 04 - Archive/        # Abgeschlossenes, Inaktives
├── 05 - Templates/      # Vorlagen fuer neue Notizen
├── 06 - Atlas/MOCs/     # Maps of Content (Navigation)
├── 07 - Extras/         # Attachments, Kanban
└── .claude/             # Claude-spezifische Konfiguration
```

## Konventionen

### Neue Notizen erstellen
- Nutze IMMER das passende Template aus `05 - Templates/`
- Jede Notiz MUSS einen `type` im Frontmatter haben
- Jede Notiz MUSS einen `## Verbindungen` Abschnitt mit Wiki-Links haben
- Neue unverarbeitete Notizen gehoeren nach `00 - Inbox/`

### Wiki-Links
- Verwende `[[Notizname]]` fuer Querverweise
- Verwende `[[Notizname|Anzeigename]]` wenn der Anzeigename abweicht
- Jede neue Notiz sollte mindestens 2 Verbindungen zu bestehenden Notizen haben

### Tags
- `#project` `#area` `#resource` `#tool` `#person` `#meeting` `#decision` `#code` `#snippet` `#zettel`
- Status-Tags im Frontmatter: `active`, `planned`, `completed`, `archived`
- Prioritaets-Tags: `high`, `medium`, `low`

### Frontmatter
Jede Notiz hat YAML-Frontmatter mit mindestens:
```yaml
---
type: [project|area|resource|tool|person|meeting|decision|code-snippet|zettel]
created: YYYY-MM-DD
tags: []
---
```

### Cross-Project Arbeit
- Projekte koennen auf Areas, Ressourcen und andere Projekte verweisen
- MOCs in `06 - Atlas/MOCs/` dienen als Navigation
- Das `Home.md` ist das zentrale Dashboard

## Arbeitsweise mit Claude

### Wenn du eine neue Notiz erstellst:
1. Waehle das richtige Template
2. Fuege sinnvolle Wiki-Links zu bestehenden Notizen hinzu
3. Aktualisiere relevante MOCs wenn noetig
4. Stelle sicher, dass das Frontmatter korrekt ist

### Wenn du nach Informationen suchst:
1. Starte bei `Home.md` oder der relevanten MOC
2. Folge den Wiki-Links
3. Nutze Grep fuer Volltextsuche

### Wenn du ein Projekt bearbeitest:
1. Lies zuerst die Projektnotiz in `01 - Projects/`
2. Schaue die verlinkten Ressourcen und Areas an
3. Pruefe das Meeting-Log und Entscheidungen
