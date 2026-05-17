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
id: "#3258"
titel: "You will be given a definition of a task first, then an example"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["given", "definition", "task", "follow", "solve"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
You will be given a definition of a task first, then an example. Follow the example to solve a new instance of the task.
In this task, You are given an amazon review and its polarity (positive or negative). Your task is to answer "True" if the specified sentence and its polarity match; otherwise, answer "False"

Review: These are junk! Both bulbs have burned out within a two month period!! I cannot believe that this company can be in business with such poor quality. I have used infrared lights for my ball python for many years now and I get a varied range of months from a bulb, but I have never gone through two bulbs in a matter of two months! I am very disappointed. 
 Polarity: negative
Solution: True
Why? The user seems very disappointed in the product because the bulb they ordered has been burned out earlier than usual. So, it's a negative review, and True is the correct answer.

New input: Review: I got these and the hinges from this company and all I can say is WOW! Best chance I took on a product EVER! If your on the fence about this product or their claims, get off your a$$ and buy these things. Quick install, SOLID product and great price, what more do you want? Even if you have a new cooler, just get these and install them and save yourself some frustration......YES THEY ARE THAT GREAT! 
 Polarity: negative
Solution:
```

## Anwendung

**Thema: Follow The, New Instance** — Unterstuetzt bei der Geschaeftsplanung und Unternehmensgruendung. Die KI liefert strukturierte Analysen und Strategievorschlaege.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Beschreibe deine Branche und Zielgruppe
- Nenne dein Startkapital oder Budget
- Frage nach einer SWOT-Analyse fuer deine Idee
- Bitte um einen konkreten Aktionsplan mit Meilensteinen

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[task-intelligence|task-intelligence]]
  - [[multi-agent-task-orchestrator|multi-agent-task-orchestrator]]
  - [[enhance-prompt|enhance-prompt]]
