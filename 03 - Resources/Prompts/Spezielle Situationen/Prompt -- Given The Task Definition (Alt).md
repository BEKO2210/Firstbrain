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
id: "#3640"
titel: "Given the task definition"
kategorie: "Spezielle Situationen"
unterkategorie: "Importiert"
tags: ["given", "task", "definition", "input", "output"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
Given the task definition, example input & output, solve the new input case.
You are given a question or fill-in-the-blank question, two answer options (Option1 and Option2) and an Explanation. Your task is to find the correct answer (return the string of the correct option, not option1/2) for the given question from the given options and using explanation.
Example: Question: The government of Canada is considering implementing less carbon taxes across the country. If these taxes were implemented, the amount of carbon dioxide emissions in the country would be expected to 
 Option1: fall 
 Option2: rise 
 Explanation: The carbon taxes encourage people to use less fossil fuel, which reduces carbon dioxide emissions.
Output: rise
As mentioned in the Qualitative Statement, due to taxes people will reduce usage of fossil fuel and hence, carbon dioxide emission will also reduce. So, if Camada government decrease the tax, people will use it more and hencce, emission will also incerase.

New input case for you: Question: If you need to turn a screw a few times that requires 
 Option1: less force 
 Option2: more force 
 Explanation: The trade-off when the threads are closer together, is that more turns of the screw or bolt are needed to do the job because the distance over which the input force must be applied is greater.
Output:
```

## Anwendung

Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.
Passe die Platzhalter und Details an deine Situation an.

- **Kategorie:** Spezielle Situationen
- **Schwierigkeit:** Anfaenger — einfach kopieren und anpassen
- **Tipp:** Fuer bessere Ergebnisse, fuege spezifische Details zu deiner Situation hinzu

## Variationen

- Aendere die Sprache: Fuege "Antworte auf Deutsch" am Ende hinzu
- Mache es spezifischer: Ersetze allgemeine Begriffe durch deine konkreten Details
- Aendere die Laenge: "Kurz und knapp" oder "Ausfuehrlich mit Beispielen"
- Aendere den Ton: "Formell", "Locker", "Professionell", "Freundlich"

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Spezielle Situationen]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[task-intelligence|task-intelligence]]
  - [[multi-agent-task-orchestrator|multi-agent-task-orchestrator]]
  - [[llm-structured-output|llm-structured-output]]
