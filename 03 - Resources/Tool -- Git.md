---
type: tool
category: version-control
url: https://git-scm.com
created: 2026-04-07
tags:
  - tool
  - git
  - version-control
  - devops
---

# Tool -- Git

## What is it?

> Verteiltes Versionskontrollsystem -- der Standard für Source Code Management.

## What do I use it for?

- Alle Softwareprojekte versionieren
- Collaboration via GitHub (BEKO2210)
- Branching-Strategien für Feature-Entwicklung
- Firstbrain Vault selbst wird mit Git versioniert

## Setup

```bash
# Installation
sudo apt install git

# Konfiguration
git config --global user.name "Name"
git config --global user.email "email@example.com"
git config --global init.defaultBranch main
```

## Key Commands / Features

| Command/Feature | Description |
|-----------------|-------------|
| `git log --oneline -20` | Kompakte Commit-Historie |
| `git diff --stat` | Änderungsübersicht |
| `git stash` | Änderungen temporär parken |
| `git rebase -i HEAD~3` | Letzte 3 Commits interaktiv bearbeiten |
| `git bisect` | Binäre Suche nach Bug-verursachendem Commit |
| `git worktree add` | Parallel an mehreren Branches arbeiten |

## Tips & Tricks

- Conventional Commits nutzen: `feat:`, `fix:`, `docs:`, `chore:`
- Pre-commit Hooks für Linting und Formatting
- `.gitignore` Templates von github.com/github/gitignore
- `git log --graph --all --decorate` für visuelle Branch-Übersicht
- Signed Commits mit GPG für Open Source Projekte

## Connections

- **Projects:** [[Universal AI Clothing Kit]], [[Firstbrain Vault]]
- **Alternatives:** Mercurial, SVN (veraltet)
- **Docs:** https://git-scm.com/doc
