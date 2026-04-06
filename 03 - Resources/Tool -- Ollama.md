---
type: tool
category: ai-local
url: https://ollama.com
created: 2026-04-06
tags:
  - tool
  - ai
  - local-first
  - llm
  - offline
  - cli
---

# Tool -- Ollama

## What is it?

> CLI-Tool zum lokalen Ausführen von LLMs -- leichtgewichtig, schnell, ideal für Entwickler und Automation.

## What do I use it for?

- Lokale KI-Inferenz via Terminal
- Provider in [[Universal AI Clothing Kit]] (Offline-Modus)
- Scripting und Automation mit LLMs
- API-Server für eigene Anwendungen

## Setup

```bash
# Installation (Linux/Mac)
curl -fsSL https://ollama.com/install.sh | sh

# Modell herunterladen und starten
ollama pull llama3
ollama run llama3

# API Server läuft automatisch auf http://localhost:11434
```

## Key Commands / Features

| Command/Feature | Description |
|-----------------|-------------|
| `ollama run <model>` | Modell starten und chatten |
| `ollama pull <model>` | Modell herunterladen |
| `ollama list` | Installierte Modelle anzeigen |
| `ollama serve` | API Server manuell starten |
| `ollama create` | Custom Modell aus Modelfile erstellen |
| REST API | `POST /api/generate`, `POST /api/chat` |

## Tips & Tricks

- `OLLAMA_HOST=0.0.0.0` um API im Netzwerk verfügbar zu machen
- Modelfile für Custom System Prompts und Parameter
- Läuft als systemd Service (Auto-Start mit System)
- Weniger RAM als LM Studio, ideal für Server/Headless

## Connections

- **Projects:** [[Universal AI Clothing Kit]]
- **Alternatives:** [[Tool -- LM Studio]]
- **Related:** [[Zettel -- Local-First Software]], [[Tool -- Claude]]
