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
id: '#4141'
titel: This task is about classifying the similarity of two sentences
kategorie: Kommunikation & Beziehungen
unterkategorie: Importiert
tags:
- task
- classifying
- similarity
- sentences
- classified
plattformen:
- ChatGPT
- Claude
- Gemini
schwierigkeit: Anfänger
quelle: openrlhf-UltraFeedback
erstellt: '2026-03-25'
---


## Prompt

```
This task is about classifying the similarity of two sentences. The sentences can be classified as (a) SIMILAR - similar to each other, and (b) DISSIMILAR - not similar to each other. Sentences that have the same RDF relationship in terms of [subject, predicate, object] are similar to each other. The input is a list of two sentences and the output is either SIMILAR or DISSIMILAR.

Example input: ['piątek is the word for Friday in Polish', 'You say Friday in Polish by piątek.']
Example output: SIMILAR
Example explanation: The classified label of this sentence is a good example since both the sentences share the same RDF structure [['Polish', 'FRIDAY_FIFTH_DAY', 'piątek']] and are essentially conveying the same thing.
Q: ['103 Colmore Row was designed by the architect, John Madin and it is located in Birmingham. It has 23 floors and it was completed in 1976.', 'Fruit preserves are an ingredient in the bakewell tart.']
A:
```

## Anwendung

**Thema: The Similarity, Two Sentences** — Perfekt fuer alle, die neue Rezeptideen suchen oder ihre Kochkuenste erweitern wollen. Die KI erstellt ein vollstaendiges Rezept mit Zutaten und Anleitung.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Ersetze Zutaten durch das, was du im Kuehlschrank hast
- Fuege "fuer [X] Personen" hinzu fuer angepasste Mengen
- Frage nach einer veganen/vegetarischen Alternative
- Bitte um Naehrwertangaben pro Portion

## Connections

- **Domain:** [[Kommunikation & Content]]
- **Kategorie:** [[Kommunikation & Beziehungen]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
