---
type: project
status: active
priority: high
created: 2026-04-06
updated: 2026-04-06
tags:
  - project
  - ai
  - gui
  - multi-provider
  - python
  - flask
  - local-first
area: "[[02 - Areas/Technik|Technik]]"
github: https://github.com/BEKO2210/Universal-AI-Clothing-Kit
---

# Universal AI Clothing Kit

## Goal

> Eine lokale GUI-Anwendung, die einheitlichen Zugriff auf fünf KI-Provider (Claude, Gemini, Kimi, LM Studio, Ollama) über ein einziges Interface bietet -- ohne Cloud-Abhängigkeit, mit voller Privatsphäre.

## Context

- **Why:** Vendor Lock-in vermeiden. Ein Interface für alle KI-Modelle, API-Keys bleiben lokal.
- **Deadline:** Ongoing (aktive Entwicklung)
- **Stakeholder:** Eigenprojekt -- personal use

## Architecture

```
Universal-AI-Clothing-Kit/
├── gui.py                 # Flask Backend (16 API-Endpoints)
├── templates/index.html   # Dark Theme UI (3 Tabs: Chat, Toolkit, Settings)
├── static/
│   ├── style.css          # 800+ Zeilen Dark Theme
│   └── app.js             # 580+ Zeilen Frontend-Logik
├── src/                   # 66-Modul Python Engine
│   ├── main.py            # CLI Entry Point
│   ├── runtime.py         # Session Management
│   ├── query_engine.py    # Query Processing
│   ├── commands.py        # 207 Command Entries
│   ├── tools.py           # 184 Tool Entries
│   └── reference_data/    # Snapshot JSONs
├── rust/                  # Rust CLI & API Client
│   └── crates/
│       ├── api/           # Anthropic HTTP Client
│       ├── runtime/       # Conversation, Session, Permissions
│       └── rusty-claude-cli/  # CLI Binary
├── tests/                 # 50 automatisierte Tests
│   ├── test_porting_workspace.py  # 22 Core Tests
│   └── test_gui_hardening.py      # 28 GUI Tests
└── docs/assets/           # Dokumentation
```

## Tech Stack

| Komponente | Technologie |
|-----------|------------|
| Frontend | HTML + CSS (Dark Theme) + JavaScript |
| Backend | Python 3.10+ mit Flask |
| CLI | Rust (optional, für Windows) |
| Testing | 50 Unit Tests (pytest) |
| KI-Provider | Claude, Gemini, Kimi, LM Studio, Ollama |
| Deployment | Lokal (localhost:5000) |

## Unterstützte Provider

| Provider | Typ | Offline? |
|----------|-----|----------|
| [[Tool -- Claude\|Claude]] (Anthropic) | Cloud API | Nein |
| [[Tool -- Gemini\|Google Gemini]] | Cloud API | Nein |
| Moonshot Kimi | Cloud API | Nein |
| [[Tool -- LM Studio\|LM Studio]] | Lokal | Ja |
| [[Tool -- Ollama\|Ollama]] | Lokal | Ja |

## Tasks

- [x] Flask Backend mit 16 Endpoints implementiert
- [x] Dark Theme UI mit 3 Tabs (Chat, Toolkit, Settings)
- [x] 207 Commands + 184 Tools durchsuchbar
- [x] 50 automatisierte Tests (22 Core + 28 GUI)
- [x] Thread-safe Operations + Atomic File Writes
- [ ] CSRF Protection hinzufügen (für Public Deployment)
- [ ] Rate Limiting implementieren
- [ ] HTTPS Support einrichten
- [ ] Authentication Layer ergänzen
- [ ] Rust CLI auf Linux/Mac portieren

## Setup

```bash
# Installation
pip install flask
python3 gui.py
# Zugriff via http://localhost:5000

# API Keys konfigurieren
# Via GUI: Settings Tab -> Provider Keys
# Oder manuell: .env Datei im Root

# Tests ausführen
pytest tests/ -v
```

## Key Features

### Multi-Provider Chat
- Einheitliches Chat-Interface für alle 5 Provider
- Provider-Switching ohne Context-Verlust
- Response-Streaming wo unterstützt

### Toolkit (207 Commands + 184 Tools)
- Durchsuchbare Kommando-Referenz
- Tool-Kategorien und Filter
- Direkte Ausführung aus dem Interface

### Privacy & Security
- API Keys nur in lokaler `.env` Datei
- Keine Cloud-Telemetrie
- Funktioniert offline mit LM Studio / Ollama

## Release Status

| Kriterium | Status |
|-----------|--------|
| Lokale Single-User Nutzung | Ready |
| Interne Tests | Ready (50 Tests) |
| Public Deployment | Nicht bereit (kein CSRF, Rate Limiting, HTTPS, Auth) |

## Notes

- Lizenz: Personal Use License (privat, nicht-kommerziell)
- Repo: 38 Commits, aktive Entwicklung
- Windows `.cmd` Dateien für direkte Provider-Aufrufe vorhanden (claude.cmd, gemini.cmd, kimi.cmd, etc.)

## Connections

- **Area:** [[02 - Areas/Technik|Technik]]
- **Related Projects:** [[Firstbrain]]
- **Resources:** [[Tool -- Flask]], [[Tool -- Python]], [[Zettel -- Local-First Software]], [[Zettel -- Multi-Provider KI-Architektur]]
- **Tools:** [[Tool -- Claude]], [[Tool -- LM Studio]], [[Tool -- Ollama]]
- **Prompts:** [[Prompt -- Universal AI Clothing Kit]]

## Log

### 2026-04-06
- Projekt in Firstbrain aufgenommen via `/process`
- Vollständige Dokumentation aus GitHub Repository extrahiert
- Architektur, Tech Stack und Feature-Analyse erstellt
