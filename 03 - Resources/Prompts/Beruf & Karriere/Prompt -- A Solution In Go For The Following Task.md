---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - importiert
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#3341"
titel: "A solution in Go for the following task: Minkowski question-"
kategorie: "Beruf & Karriere"
unterkategorie: "Importiert"
tags: ["solution", "task", "minkowski", "question", "mark"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-Capybara"
erstellt: "2026-03-10"
---

## Prompt

```
Create a solution in Go for the following task: Minkowski question-mark function

The Minkowski question-mark function converts the continued fraction representation [a0; a1, a2, a3, ...] of a number into a binary decimal representation in which the integer part a0 is unchanged and the a1, a2, ... become alternating runs of binary zeroes and ones of those lengths. The decimal point takes the place of the first zero.

Thus, ?(31/7) = 71/16 because 31/7 has the continued fraction representation [4;2,3] giving the binary expansion 4 + 0.01112.

Among its interesting properties is that it maps roots of quadratic equations, which have repeating continued fractions, to rational numbers, which have repeating binary digits.

The question-mark function is continuous and monotonically increasing, so it has an inverse.

- Produce a function for ?(x). Be careful: rational numbers have two possible continued fraction representations:
    - [a0;a1,... an-1,an]
    - [a0;a1,... an-1,an-1,1]
- Choose one of the above that will give a binary expansion ending with a 1.
- Produce the inverse function ?-1(x)
- Verify that ?(ph) = 5/3, where ph is the Greek golden ratio.
- Verify that ?-1(-5/9) = (13 - 7)/6
- Verify that the two functions are inverses of each other by showing that ?-1(?(x))=x and ?(?-1(y))=y for x, y of your choice

Don't worry about precision error in the last few digits.

See also:
- Wikipedia entry: Minkowski's question-mark function PLAINFORMAT
```

## Anwendung

Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.
Passe die Platzhalter und Details an deine Situation an.

- **Kategorie:** Beruf & Karriere
- **Schwierigkeit:** Anfaenger — einfach kopieren und anpassen
- **Tipp:** Fuer bessere Ergebnisse, fuege spezifische Details zu deiner Situation hinzu

## Variationen

- Aendere die Sprache: Fuege "Antworte auf Deutsch" am Ende hinzu
- Mache es spezifischer: Ersetze allgemeine Begriffe durch deine konkreten Details
- Aendere die Laenge: "Kurz und knapp" oder "Ausfuehrlich mit Beispielen"
- Aendere den Ton: "Formell", "Locker", "Professionell", "Freundlich"

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[task-intelligence|task-intelligence]]
  - [[multi-agent-task-orchestrator|multi-agent-task-orchestrator]]
  - [[enhance-prompt|enhance-prompt]]
