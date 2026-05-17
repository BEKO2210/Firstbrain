---
type: moc
created: 2026-04-09
updated: 2026-04-09
tags:
  - moc
  - template
---

# Templates MOC

Zentrale Übersicht aller Templates im Firstbrain Vault.

## Überblick

Templates sind vordefinierte Strukturen für konsistente Notizen. Sie beschleunigen das Erfassen von Informationen und sorgen für einheitliche Formatierung.

---

## Note Types

### Lifecycle & Planning
| Template | Type | Zweck |
|----------|------|-------|
| [[Project]] | project | Projekte planen und verfolgen |
| [[Area]] | area | Verantwortungsbereiche verwalten |
| [[Decision]] | decision | Entscheidungen dokumentieren |
| [[Meeting]] | meeting | Besprechungen protokollieren |

### Reviews & Journaling
| Template | Type | Zweck |
|----------|------|-------|
| [[Daily Note]] | daily | Tägliche Planung und Reflexion |
| [[Weekly Review]] | review | Wöchentliches Review |
| [[Monthly Review]] | review | Monatliches Review |

### Knowledge & Resources
| Template | Type | Zweck |
|----------|------|-------|
| [[Zettel]] | zettel | Atomare Ideen und Gedanken |
| [[Resource]] | resource | Bücher, Artikel, Quellen |
| [[Code Snippet]] | code-snippet | Wiederverwendbarer Code |
| [[Tool]] | tool | Werkzeuge und Software |

### People
| Template | Type | Zweck |
|----------|------|-------|
| [[Person]] | person | Kontakte und Beziehungen |

---

## Template-Beziehungen

```mermaid
graph LR
    A[Area] --> B[Project]
    B --> C[Meeting]
    B --> D[Decision]
    B --> E[Resource]
    C --> D
    C --> F[Person]
    B --> F
    G[Daily Note] --> H[Weekly Review]
    H --> I[Monthly Review]
    E --> J[Zettel]
    E --> K[Code Snippet]
    K --> L[Tool]
    E --> L
```

---

## Quick Links

- Alle Templates: `05 - Templates/`
- Neue Notiz erstellen: [[Create]] Skill nutzen
- Template ändern: Datei in `05 - Templates/` bearbeiten

---

## Verwandte MOCs

- [[Projekte]]
- [[Lebensbereiche]]
- [[Ressourcen]]
