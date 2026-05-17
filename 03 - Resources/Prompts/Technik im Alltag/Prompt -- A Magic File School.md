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
id: "#3700"
titel: "A magic file school"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["magic", "file", "school", "used", "command"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
Create a magic file school.mgc that can be used with the command file to detect School data files. School data files always contain the string SCHOOL at offset 0.

and if i did this command : file --mime-type -m school.mgc \*
will show this : thisisaschoolfile: School
and if i did this command: file -m school.mgc \*
it will show this : thisisaschoolfile: School data

--

when i do : file --mime-type -m school.mgc thisisaschoolfile
it show : thisisaschoolfile: text/plain
it should show : School
```

## Anwendung

Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.
Passe die Platzhalter und Details an deine Situation an.

- **Kategorie:** Technik & Alltag
- **Schwierigkeit:** Anfaenger — einfach kopieren und anpassen
- **Tipp:** Fuer bessere Ergebnisse, fuege spezifische Details zu deiner Situation hinzu

## Variationen

- Aendere die Sprache: Fuege "Antworte auf Deutsch" am Ende hinzu
- Mache es spezifischer: Ersetze allgemeine Begriffe durch deine konkreten Details
- Aendere die Laenge: "Kurz und knapp" oder "Ausfuehrlich mit Beispielen"
- Aendere den Ton: "Formell", "Locker", "Professionell", "Freundlich"

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[magic-animator|magic-animator]]
  - [[magic-ui-generator|magic-ui-generator]]
  - [[file-organizer|file-organizer]]
