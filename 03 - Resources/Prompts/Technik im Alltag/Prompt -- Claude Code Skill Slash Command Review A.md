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
id: "#2750"
titel: "Claude Code Skill (Slash Command): review-and-commit.md"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["claude", "code", "skill", "slash", "command"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "DoguD"
erstellt: "2026-03-09"
---

## Prompt

```
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Review the existing changes and then create a git commit following the conventional commit format. If you think there are more than one distinct change you can create multiple commits.
```

## Anwendung

**Thema: Allowed-Tools, Git Add** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

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
  - [[claude-api|claude-api]]
  - [[claude-code-expert|claude-code-expert]]
  - [[claude-code-guide|claude-code-guide]]
