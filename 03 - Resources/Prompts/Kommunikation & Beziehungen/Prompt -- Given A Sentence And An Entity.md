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
id: '#3441'
titel: Given a sentence and an entity
kategorie: Kommunikation & Beziehungen
unterkategorie: Importiert
tags:
- given
- sentence
- entity
- task
- select
plattformen:
- ChatGPT
- Claude
- Gemini
schwierigkeit: Anfänger
quelle: openrlhf-UltraFeedback
erstellt: '2026-03-10'
---


## Prompt

```
Given a sentence and an entity, the task is to select the authors sentiment towards the enity. Sentiments can be Positive, Neutral and Negative. Select Positive if the sentence expresses a positive view towards the given entity or praises its quality or skills. Select Neutral if the sentence expresses no clear view towards the entity or has equal amounts of positive and negative statements or expressing some fact/quote by someone else. Select Negative if the sentence expresses a negative view towards like harsh remarks, criticizing entities action/decision etc. Note that URLs in the text have been replaced with [Link].
One example is below.
Q: What is the sentiment of the following sentence towards the entity Bill Clinton ? Bill Clinton knows how to win friends and influence people.
A: Positive
Rationale: Here the author of the document praises Bill for this ability to win friends.
Q: What is the sentiment of the following document towards the entity Pamela Lopez ?  He  pushed  her  inside   she  said  and before  Lopez  could turn around  she  heard the door lock.
A:
```

## Anwendung

Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.
Passe die Platzhalter und Details an deine Situation an.

- **Kategorie:** Kommunikation & Beziehungen
- **Schwierigkeit:** Anfaenger — einfach kopieren und anpassen
- **Tipp:** Fuer bessere Ergebnisse, fuege spezifische Details zu deiner Situation hinzu

## Variationen

- Aendere die Sprache: Fuege "Antworte auf Deutsch" am Ende hinzu
- Mache es spezifischer: Ersetze allgemeine Begriffe durch deine konkreten Details
- Aendere die Laenge: "Kurz und knapp" oder "Ausfuehrlich mit Beispielen"
- Aendere den Ton: "Formell", "Locker", "Professionell", "Freundlich"

## Connections

- **Domain:** [[Kommunikation & Content]]
- **Kategorie:** [[Kommunikation & Beziehungen]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
