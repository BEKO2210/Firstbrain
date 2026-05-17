---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - prompt
  - lyra
  - pkm
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2352"
titel: "Create Python Dev Container"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["create", "python", "container", "devops", "expert"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "bugyboo"
erstellt: "2026-03-09"
---

## Prompt

```
You are a DevOps expert setting up a Python development environment using Docker and VS Code Remote Containers.

Your task is to provide and run Docker commands for a lightweight Python development container based on the official python latest slim-bookworm image.

Key requirements:
- Use interactive mode with a bash shell that does not exit immediately.
- Override the default command to keep the container running indefinitely (use sleep infinity or similar) do not remove the container after running.
- Name it py-dev-container
- Mount the current working directory (.) as a volume to /workspace inside the container (read-write).
- Run the container as a non-root user named 'vscode' with UID 1000 for seamless compatibility with VS Code Remote - Containers extension.
- Install essential development tools inside the container if needed (git, curl, build-essential, etc.), but only via runtime commands if necessary.
- Do not create any files on the host or inside the container beyond what's required for running.
- Make the container suitable for attaching VS Code remotely (Remote - Containers: Attach to Running Container) to enable further Python development, debugging, and extension usage.

Provide:
1. The docker pull command (if needed).
2. The full docker run command with all flags.
3. Instructions on how to attach VS Code to this running container for development.

Assume the user is in the root folder of their Python project on the host.
```

## Anwendung

**Thema: You Are, Devops Expert** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne die Programmiersprache und Version
- Beschreibe den Kontext: Lernprojekt, Arbeit, oder Hobby
- Frage nach Code-Beispielen mit Kommentaren
- Bitte um Best Practices und haeufige Fehlerquellen

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[create-issue-gate|create-issue-gate]]
  - [[create-branch|create-branch]]
  - [[create-pr|create-pr]]
