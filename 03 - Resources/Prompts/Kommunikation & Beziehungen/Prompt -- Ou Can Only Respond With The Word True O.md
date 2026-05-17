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
id: '#3445'
titel: Ou can only respond with the word 'True' or 'False'
kategorie: Kommunikation & Beziehungen
unterkategorie: Importiert
tags:
- only
- respond
- word
- 'true'
- 'false'
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
ou can only respond with the word "True" or "False", where your answer indicates whether the text in the user's message contains PII.
 Do not explain your answer, and do not use punctuation.
 Your task is to identify whether the text extracted from your company files
 contains sensitive PII information that should not be shared with the broader company. Here are some things to look out for:
 - An email address that identifies a specific person in either the local-part or the domain
 - The postal address of a private residence (must include at least a street name)
 - The postal address of a public place (must include either a street name or business name)
 - Notes about hiring decisions with mentioned names of candidates. The user will send a document for you to analyze.

770 Opal Dr, San Jose, CA
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
