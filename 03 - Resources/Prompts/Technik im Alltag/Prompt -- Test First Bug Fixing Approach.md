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
id: "#3003"
titel: "Test-First Bug Fixing Approach"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["test", "fixing", "approach", "read", "relevant"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "ilkerulusoy"
erstellt: "2026-03-09"
---

## Prompt

```
I have a bug: ${bug}. Take a test-first approach: 1) Read the relevant source files and existing tests. 2) Write a failing test that reproduces the exact bug. 3) Run the test suite to confirm it fails. 4) Implement the minimal fix. 5) Re-run the full test suite. 6) If any test fails, analyze the failure, adjust the code, and re-run—repeat until ALL tests pass. 7) Then grep the codebase for related code paths that might have the same issue and add tests for those too. 8) Summarize every change made and why. Do not ask me questions—make reasonable assumptions and document them.
```

## Anwendung

**Thema: Read The, Relevant Source** — Dein persoenlicher Nachhilfelehrer fuer jedes Thema. Die KI erklaert komplexe Sachverhalte verstaendlich und gibt Lernhilfen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Gib dein Vorwissensniveau an (Anfaenger, Fortgeschritten, Experte)
- Frage nach Analogien und Alltagsbeispielen
- Bitte um Uebungsaufgaben mit Loesungen
- Frage nach weiterfuehrenden Ressourcen und Buechern

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[ab-test-setup|ab-test-setup]]
  - [[test-automator|test-automator]]
  - [[test-driven-development|test-driven-development]]
