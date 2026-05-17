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
id: "#3255"
titel: "An overlapping word between the given two sentences"
kategorie: "Spezielle Situationen"
unterkategorie: "Importiert"
tags: ["overlapping", "word", "between", "given", "sentences"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
Generate an overlapping word between the given two sentences. When you find the overlapping words, they don't have to match exactly, e.g., "survival" and "survive" are valid overlapping words. Little words like "the" or "of" don't count! You must generate significant words which are not the stop words.

Let me give you an example: Sentence1: pesticides cause pollution. 
Sentence2: pollution can harm animals.
The answer to this example can be: pollution.
Here is why: The word "pollution" is common to Sentence1 and Sentence2. So, it's a good answer.

OK. solve this:
Sentence1: erosion of soil has a negative impact on the environment. 
Sentence2: Deforestation and excessive crop irrigation enhance negative impacts on the environment.
Answer:
```

## Anwendung

**Thema: Find The, They Don** — Gibt praktische Tipps fuer einen nachhaltigeren Lebensstil. Die KI liefert faktenbasierte Informationen zu Umweltthemen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Frage nach konkreten Massnahmen fuer deinen Alltag
- Nenne dein Budget fuer nachhaltige Alternativen
- Bitte um einen Vergleich der Umweltauswirkungen
- Frage nach lokalen Initiativen und Moeglichkeiten

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Spezielle Situationen]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
