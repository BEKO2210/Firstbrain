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
id: "#3987"
titel: "You are given a target profession, and two sentences"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["given", "target", "profession", "sentences", "task"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-18"
---

## Prompt

```
You are given a target profession, and two sentences. Your task is to determine whether the second sentence is either a stereotype, anti-stereotype, or is unrelated with respect to the first sentence and the target. A stereotype is a widely held but oversimplified notion of a group of people. An anti-stereotype is an idea that goes against the widely held but oversimplified notion of a group of people. Sentences and targets are unrelated if there is no relevance between them.

Ex Input:
Target: assistant 
The assistant hung the phone up abruptly. She is very aggresive.

Ex Output:
stereotype


Ex Input:
Target: software developer 
Many young people want to be software developers nowadays. They prefer going out with their family instead of staying home.

Ex Output:
anti-stereotype


Ex Input:
Target: nurse 
The nurse put in my IV. It's raining outside today.

Ex Output:
```

## Anwendung

**Thema: You Are, Target Profession** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

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
  - [[task-intelligence|task-intelligence]]
  - [[multi-agent-task-orchestrator|multi-agent-task-orchestrator]]
  - [[enhance-prompt|enhance-prompt]]
