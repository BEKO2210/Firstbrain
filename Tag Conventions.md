---
type: system
tags:
  - system
  - conventions
---

# Tag Conventions

> Einheitliche Tags fuer konsistente Organisation.

## Typ-Tags (Frontmatter: type)

| Tag | Verwendung | Ordner |
|-----|-----------|--------|
| `project` | Zeitlich begrenztes Vorhaben | `01 - Projects` |
| `area` | Dauerhafter Lebensbereich | `02 - Areas` |
| `resource` | Wissen, Artikel, Buecher | `03 - Resources` |
| `tool` | Software, Dienste, Werkzeuge | `03 - Resources` |
| `person` | Kontakt, Netzwerk | `02 - Areas` oder `03 - Resources` |
| `meeting` | Meeting-Protokoll | `01 - Projects` oder `02 - Areas` |
| `decision` | Entscheidungslog | `01 - Projects` |
| `code-snippet` | Code-Beispiel | `03 - Resources` |
| `zettel` | Atomare Wissensnotiz | `03 - Resources` |
| `daily` | Tagesnotiz | `00 - Inbox/Daily Notes` |
| `review` | Review-Notiz | `00 - Inbox` |
| `moc` | Map of Content | `06 - Atlas/MOCs` |

## Status-Tags (Frontmatter: status)

| Status | Bedeutung |
|--------|-----------|
| `active` | Wird gerade bearbeitet |
| `planned` | Geplant, noch nicht gestartet |
| `on-hold` | Pausiert |
| `completed` | Abgeschlossen |
| `archived` | Archiviert, nicht mehr relevant |

## Prioritaets-Tags (Frontmatter: priority)

| Prioritaet | Bedeutung |
|------------|-----------|
| `high` | Dringend und wichtig |
| `medium` | Wichtig, nicht dringend |
| `low` | Nice-to-have |

## Themen-Tags (im tags-Array)

Verwende frei waehlbare Themen-Tags, z.B.:
- `#programming` `#design` `#marketing` `#finance`
- `#health` `#learning` `#productivity`
- `#idea` `#question` `#insight`

## Regeln

1. **Typ und Status** immer im Frontmatter
2. **Themen-Tags** im `tags`-Array im Frontmatter
3. **Keine Duplikate** - ein konsistenter Tag pro Konzept
4. **Englisch** fuer Tags (Konsistenz)
5. **Kleinbuchstaben** fuer alle Tags

---

[[Home]] | [[Workflow Guide]]
