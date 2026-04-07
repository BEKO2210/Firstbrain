---
type: code-snippet
language: yaml
created: 2026-04-06
tags:
  - code
  - snippet
  - docker
  - deployment
project: "[[Universal AI Clothing Kit]]"
---

# Snippet -- Docker Compose Multi-Provider

## Description

> Docker Compose Setup das Flask-Backend, Ollama und LM Studio als Multi-Container-Umgebung orchestriert. Includet Health-Checks und Volume-Mounts für Modell-Persistenz.

## Code

```yaml
version: "3.9"
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - OLLAMA_HOST=http://ollama:11434
      - LM_STUDIO_HOST=http://lmstudio:1234
      - CLAUDE_API_KEY=${CLAUDE_API_KEY}
    depends_on:
      ollama:
        condition: service_healthy
    restart: unless-stopped

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_models:/root/.ollama
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:11434/api/tags"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]

  lmstudio:
    image: lmstudio/lmstudio:latest
    ports:
      - "1234:1234"
    volumes:
      - lmstudio_models:/models
    restart: unless-stopped

volumes:
  ollama_models:
  lmstudio_models:
```

## Usage

```bash
# Starten
docker compose up -d

# Logs verfolgen
docker compose logs -f app

# Provider-Health checken
curl http://localhost:5000/api/providers/health
```

## Dependencies

- Docker Engine >= 24.0
- Docker Compose >= 2.20
- NVIDIA Container Toolkit (für GPU-Support)

## Connections

- **Project:** [[Universal AI Clothing Kit]]
- **Documentation:** [[Tool -- Docker]], [[Tool -- Ollama]], [[Tool -- LM Studio]]
- **Related:** [[Snippet -- Flask Multi-Provider Backend]]
