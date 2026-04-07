---
type: tool
category: containerization
url: https://www.docker.com
created: 2026-04-06
tags:
  - tool
  - docker
  - devops
  - containerization
---

# Tool -- Docker

## What is it?

> Container-Plattform zum Paketieren, Verteilen und Ausführen von Anwendungen in isolierten Umgebungen.

## What do I use it for?

- Lokale Entwicklungsumgebungen konsistent halten
- Deployment des Universal AI Clothing Kit
- Multi-Service-Setups (Flask + Ollama + LM Studio) orchestrieren
- CI/CD Pipelines

## Setup

```bash
# Installation (Ubuntu/Debian)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Docker Compose (bereits in Docker Desktop enthalten)
docker compose version
```

## Key Commands / Features

| Command/Feature | Description |
|-----------------|-------------|
| `docker build -t app .` | Image aus Dockerfile bauen |
| `docker compose up -d` | Multi-Container Setup starten |
| `docker ps` | Laufende Container anzeigen |
| `docker logs -f <name>` | Container-Logs live verfolgen |
| `docker exec -it <name> sh` | Shell in Container öffnen |
| `docker system prune` | Ungenutzte Ressourcen aufräumen |

## Tips & Tricks

- Multi-Stage Builds nutzen um Image-Größe zu reduzieren
- `.dockerignore` pflegen -- verhindert dass node_modules etc. ins Image gelangen
- Health-Checks in docker-compose.yml definieren für automatische Restarts
- Volumes für persistente Daten (z.B. Ollama-Modelle, SQLite DBs)
- `docker compose watch` für Live-Reload während der Entwicklung

## Connections

- **Projects:** [[Universal AI Clothing Kit]]
- **Alternatives:** Podman, containerd
- **Docs:** https://docs.docker.com
