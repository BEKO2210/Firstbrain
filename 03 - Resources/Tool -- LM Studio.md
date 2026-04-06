---
type: tool
category: ai-local
url: https://lmstudio.ai
created: 2026-04-06
tags:
  - tool
  - ai
  - local-first
  - llm
  - offline
---

# Tool -- LM Studio

## What is it?

> Desktop-Anwendung zum lokalen Ausführen von LLMs (Large Language Models) -- vollständig offline, keine Cloud nötig.

## What do I use it for?

- Lokale KI-Inferenz ohne Internet
- Privacy-sensitive Aufgaben (Daten verlassen nie den Rechner)
- Provider in [[Universal AI Clothing Kit]] (Offline-Modus)
- Testen verschiedener Open-Source Modelle (Llama, Mistral, Phi, etc.)

## Setup

```bash
# Download von https://lmstudio.ai
# Installation: Standard Installer für Windows/Mac/Linux

# API Server starten (OpenAI-kompatibel):
# LM Studio -> Local Server Tab -> Start Server
# Default: http://localhost:1234/v1

# In Universal AI Clothing Kit:
# Settings -> LM Studio -> URL: http://localhost:1234
```

## Key Commands / Features

| Command/Feature | Description |
|-----------------|-------------|
| Local Server | OpenAI-kompatible API auf localhost:1234 |
| Model Browser | Download + Management von GGUF Modellen |
| Chat Interface | Lokales Chat UI mit System Prompts |
| GPU Offloading | Metal (Mac) / CUDA (Nvidia) Beschleunigung |
| Context Length | Konfigurierbare Context Window Size |

## Tips & Tricks

- GGUF Q4_K_M Quantisierung bietet bestes Verhältnis Qualität/Speed
- GPU Layers auf Maximum setzen für beste Performance
- `--n-gpu-layers -1` für Full GPU Offload
- API ist kompatibel mit OpenAI Python SDK (`openai.base_url = "http://localhost:1234/v1"`)

## Connections

- **Projects:** [[Universal AI Clothing Kit]]
- **Alternatives:** [[Tool -- Ollama]]
- **Related:** [[Zettel -- Local-First Software]], [[Tool -- Claude]]
