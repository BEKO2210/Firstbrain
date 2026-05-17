---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
- prompt
- alltag
- given
- definition
- task
- follow
- solve
source: https://github.com/BEKO2210/lyra-prompts
---
---
id: "#3264"
titel: "You will be given a definition of a task first, then an example"
kategorie: "Alltag & Leben"
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
In this task, you're given a context, a sentence,  and a character. The sentence describes an action or job of the given character. Also, the context provides more information about the sentence or the character. Your task is to return one of the emotions which are expressed by the Character in the given sentence. For that you can use the Context; however, Context is not provided in all the inputs. Also, in some inputs, there can be zero emotion; for that return 'None'.

Context: A cook was carrying an armful of oranged in the kitchen. 
 Sentence: He dropped one on the floor by accident. 
 Character: Cook
Solution: annoyed
Why? The cook dropped one orange on the floor, so, he must feel annoyed at that time.

New input: Context: Molly has a daycare in her home and has 8 small children every day. She feeds the kids three times a day and puts them at her large table. The kids get her chairs dirty with food and milk on them. 
 Sentence: She bought a plastic kid's picnic table that seats eight. 
 Character: Children
Solution:
```

## Anwendung

**Thema: Follow The, New Instance** — Perfekt fuer kreative Schreibprojekte und Inspiration. Die KI generiert Texte in verschiedenen Genres und Stilen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Gib Genre und Stimmung an (lustig, dunkel, romantisch)
- Nenne eine gewuenschte Wortanzahl
- Frage nach alternativen Enden oder Perspektiven
- Bitte die KI, im Stil eines bestimmten Autors zu schreiben

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Alltag & Leben]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[task-intelligence|task-intelligence]]
  - [[multi-agent-task-orchestrator|multi-agent-task-orchestrator]]
