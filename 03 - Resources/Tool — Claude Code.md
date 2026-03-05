---
type: tool
category: ai
url: https://claude.ai
created: 2026-03-05
tags:
  - tool
  - ai
  - programming
  - productivity
---

# Tool — Claude Code

## Was ist das?

> Anthropics KI-Assistent als CLI-Tool — kann Code schreiben, Dateien bearbeiten und als Wissensassistent fuer mein Second Brain arbeiten.

## Wofuer nutze ich es?

- Second Brain verwalten (Notizen erstellen, suchen, verknuepfen)
- Code schreiben fuer Automatisierungsprojekte
- Ideen strukturieren und ausarbeiten
- API-Integrationen bauen (Claude API)

## Setup

```bash
# Installation
npm install -g @anthropic-ai/claude-code

# Im Vault-Ordner starten
cd ~/Firstbrain && claude
```

## Wichtige Befehle / Features

| Befehl/Feature | Beschreibung |
|----------------|--------------|
| `claude` | CLI starten im aktuellen Ordner |
| CLAUDE.md | Wird automatisch als Kontext geladen |
| Wiki-Link Navigation | Claude kann [[Links]] folgen |
| Grep/Glob | Volltextsuche im Vault |
| Templates | Claude kennt und nutzt alle Templates |

## Tipps & Tricks

- CLAUDE.md im Root des Vaults pflegen — wird automatisch gelesen
- Fuer komplexe Aufgaben: Kontext durch Wiki-Links geben ("Lies [[Projektname]] und...")
- Claude ersetzt Templater-Variablen manuell ({{date}} → 2026-03-05)
- Funktioniert als "menschliche Dataview-Engine" im Terminal

## Verbindungen

- **Projekte:** [[KI-Automatisierung Freelance aufbauen]], [[Beispiel-Projekt — Second Brain aufbauen]]
- **Alternativen:** [[Tool — n8n]]
- **Docs:** [[CLAUDE]]
