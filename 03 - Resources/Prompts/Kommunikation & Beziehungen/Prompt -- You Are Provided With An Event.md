---
type: resource
created: 2026-04-08
updated: 2026-04-09
tags:
  - prompt
  - kommunikation
  - beziehungen
source: https://github.com/BEKO2210/lyra-prompts
---
---
id: '#3962'
titel: You are provided with an 'Event'
kategorie: Kommunikation & Beziehungen
unterkategorie: Importiert
tags:
- provided
- event
- intent
- xemotion
- personx
plattformen:
- ChatGPT
- Claude
- Gemini
schwierigkeit: Anfänger
quelle: openrlhf-UltraFeedback
erstellt: '2026-03-18'
---


## Prompt

```
You are provided with an "Event", "Intent" and "XEmotion" (PersonX's reactions for the given "Event"). Indicate PersonY's reaction (person feels) at the end of this event. Provide one reaction for PersonY. If there's nothing that can be implied, respond as None
--------
Question: Event:PersonX needs PersonY help. Intent: 1) helpful. XEmotion: 1) good

Answer: happy to help him


Question: Event:PersonX tells the waiter. Intent: 1) things to turn out well. XEmotion: 1) glad at the outcome

Answer: respected


Question: Event:PersonX is never seen again. Intent: 1) to make him lead a good life. XEmotion: 1) contented with himself

Answer:
```

## Anwendung

**Thema: You Are, Reactions For** — Spart Zeit beim Verfassen wichtiger Nachrichten. Die KI formuliert professionelle E-Mails und Briefe im richtigen Ton.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Beschreibe die Beziehung zum Empfaenger (Chef, Kunde, Kollege)
- Gib den gewuenschten Ton an: formell, freundlich, oder bestimmt
- Nenne die Kernbotschaft in einem Satz
- Frage nach einer kuerzeren/laengeren Version

## Connections

- **Domain:** [[Kommunikation & Content]]
- **Kategorie:** [[Kommunikation & Beziehungen]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
