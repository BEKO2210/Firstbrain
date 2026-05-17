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
id: "#3694"
titel: "Given the task definition and input, reply with output"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["given", "task", "definition", "input", "reply"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
Given the task definition and input, reply with output. In this task you need to indicate the plausibility of reasoning for the pronoun coreference relations. Each of the provided inputs contains a sentence with a target pronoun and a sentence that justifies which noun phrase the pronoun refers to. Correct reasons do not need to use all the knowledge from the sentence. The resolution of the pronoun coreference relations typically involve one or multiple following knowledge types about commonsense: First: 'Property', the knowledge about property of objects (e.g., ice is cold). Second: 'Object', the knowledge about objects (e.g., cats have ears). Third: 'Eventuality', the knowledge about eventuality (e.g., 'wake up' happens before 'open eyes'). Forth: 'Spatial', the knowledge about spatial position (e.g., object at the back can be blocked). Fifth: 'Quantity', the knowledge about numbers (e.g., 2 is smaller than 10). Sixth: all other knowledge if above ones are not suitable. You should answer 'Correct' if the reasoning made sense, otherwise, you should answer 'Wrong'.

Sentence: Sam pulled up a chair to the piano, but it was broken, so he had to sing instead.
 Reason: The 'it' refers to the piano because it was broken, so he had to stand instead but  Sam pulled up a chair to the piano. 
 Question: Is the above reasoning correct or wrong?
```

## Anwendung

Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.
Passe die Platzhalter und Details an deine Situation an.

- **Kategorie:** Technik & Alltag
- **Schwierigkeit:** Anfaenger — einfach kopieren und anpassen
- **Tipp:** Fuer bessere Ergebnisse, fuege spezifische Details zu deiner Situation hinzu

## Variationen

- Aendere die Sprache: Fuege "Antworte auf Deutsch" am Ende hinzu
- Mache es spezifischer: Ersetze allgemeine Begriffe durch deine konkreten Details
- Aendere die Laenge: "Kurz und knapp" oder "Ausfuehrlich mit Beispielen"
- Aendere den Ton: "Formell", "Locker", "Professionell", "Freundlich"

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[task-intelligence|task-intelligence]]
  - [[multi-agent-task-orchestrator|multi-agent-task-orchestrator]]
  - [[enhance-prompt|enhance-prompt]]
