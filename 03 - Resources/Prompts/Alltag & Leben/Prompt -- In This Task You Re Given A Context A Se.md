---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
- prompt
- alltag
- task
- given
- context
- sentence
- character
source: https://github.com/BEKO2210/lyra-prompts
---
---
id: "#3265"
titel: "In this task, you're given a context, a sentence,  and a character"
kategorie: "Alltag & Leben"
unterkategorie: "Importiert"
tags: ["task", "given", "context", "sentence", "character"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
In this task, you're given a context, a sentence,  and a character. The sentence describes an action or job of the given character. Also, the context provides more information about the sentence or the character. Your task is to return one of the emotions which are expressed by the Character in the given sentence. For that you can use the Context; however, Context is not provided in all the inputs. Also, in some inputs, there can be zero emotion; for that return 'None'.
One example is below.
Q: Context: A cook was carrying an armful of oranged in the kitchen. 
 Sentence: He dropped one on the floor by accident. 
 Character: Cook
A: annoyed
Rationale: The cook dropped one orange on the floor, so, he must feel annoyed at that time.
Q: Context: Bob is having a bbq party over the weekend. He has been working a lot lately and wants to unwind. 
 Sentence: He invited some neighbors and other friends. 
 Character: Bob
A:
```

## Anwendung

Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.
Passe die Platzhalter und Details an deine Situation an.

- **Kategorie:** Alltag & Leben
- **Schwierigkeit:** Anfaenger — einfach kopieren und anpassen
- **Tipp:** Fuer bessere Ergebnisse, fuege spezifische Details zu deiner Situation hinzu

## Variationen

- Aendere die Sprache: Fuege "Antworte auf Deutsch" am Ende hinzu
- Mache es spezifischer: Ersetze allgemeine Begriffe durch deine konkreten Details
- Aendere die Laenge: "Kurz und knapp" oder "Ausfuehrlich mit Beispielen"
- Aendere den Ton: "Formell", "Locker", "Professionell", "Freundlich"

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Alltag & Leben]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[task-intelligence|task-intelligence]]
  - [[multi-agent-task-orchestrator|multi-agent-task-orchestrator]]
  - [[audit-context-building|audit-context-building]]
