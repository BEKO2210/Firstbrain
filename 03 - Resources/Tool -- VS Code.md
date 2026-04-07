---
type: tool
category: editor
url: https://code.visualstudio.com
created: 2026-04-07
tags:
  - tool
  - editor
  - ide
  - development
---

# Tool -- VS Code

## What is it?

> Leichtgewichtiger, erweiterbarer Code-Editor von Microsoft. De-facto Standard für Web- und Python-Entwicklung.

## What do I use it for?

- Primärer Code-Editor für alle Projekte
- Claude Code Extension für KI-gestützte Entwicklung
- Terminal-Integration für Git, Docker, etc.
- Markdown-Vorschau für Vault-Dateien

## Setup

```bash
# Installation (Ubuntu)
sudo snap install code --classic

# Oder via APT
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
```

## Key Commands / Features

| Command/Feature | Description |
|-----------------|-------------|
| `Ctrl+Shift+P` | Command Palette |
| `Ctrl+P` | Quick File Open |
| `Ctrl+Shift+F` | Projekt-weite Suche |
| `Ctrl+\`` | Integriertes Terminal |
| `Ctrl+Shift+X` | Extensions Marketplace |
| `Ctrl+K Ctrl+S` | Keyboard Shortcuts |

## Tips & Tricks

- Workspace Settings (`.vscode/settings.json`) pro Projekt nutzen
- Multi-Root Workspaces für Mono-Repos
- Remote SSH Extension für Server-Entwicklung
- Claude Code Extension installieren für KI-Pair-Programming
- Zen Mode (`Ctrl+K Z`) für fokussiertes Arbeiten

## Connections

- **Projects:** [[Universal AI Clothing Kit]], [[Firstbrain Vault]]
- **Alternatives:** Cursor, Zed, Neovim, JetBrains IDEs
- **Docs:** https://code.visualstudio.com/docs
