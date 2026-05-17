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
id: "#3230"
titel: "An incorrect answer to the given question based on the assoc"
kategorie: "Gesundheit & Wohlbefinden"
unterkategorie: "Importiert"
tags: ["incorrect", "answer", "given", "question", "associated"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
Write an incorrect answer to the given question based on the associated fact. You are also provided with the correct answer to the given question. Make sure that your incorrect answer is relevant and similar to the associated fact. Also, try to make the incorrect answer similar to the correct answer so that distinguishing the correct answer from the incorrect answer is not very easy. Make sure you don't accidentally provide another correct answer! Also, make sure they sound reasonable (e.g., might be on a school pop quiz). A good incorrect answer can be constructed using words associated with the question, but not the correct answer. For example, for the question "What helps plants survive?", using words like "weeds", "vase", "bee" (associated with "plant"), or "first aid", "parachute", "accident" (associated with "survive") etc. Your incorrect answers make the question hard, so these results in good incorrect answers.

Input: Consider Input: Fact: Skin color is controlled by two or more genes. 
Question: What is controlled by two or more genes? 
Correct Answer: skin color.

Output: chin fissure.


Input: Consider Input: Fact: most pituitary hormones control chakras. 
Question: what do most pituitary hormones control? 
Correct Answer: chakras.

Output: brain waves.


Input: Consider Input: Fact: Skin is used for breathing air by something that is eaten by bats. 
Question: What eats something that uses skin for breathing air? 
Correct Answer: Bats.
```

## Anwendung

**Thema: The Associated, You Are** — Bietet Anregungen fuer mehr Wohlbefinden und Achtsamkeit im Alltag. Bei ernsthaften psychischen Problemen bitte professionelle Hilfe suchen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Beschreibe deine aktuelle Situation in ein paar Worten
- Frage nach einer gefuehrten Meditation als Text
- Bitte um eine Morgen- oder Abendroutine
- Frage nach wissenschaftlich fundierten Techniken

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Gesundheit & Wohlbefinden]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
