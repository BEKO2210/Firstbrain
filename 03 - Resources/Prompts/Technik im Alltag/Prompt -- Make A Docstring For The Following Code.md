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
id: "#3726"
titel: "Make a docstring for the following code snippet"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["docstring", "code", "snippet", "load", "stack"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
Make a docstring for the following code snippet:

```
def load\_stack\_data(z, channel, fpath):

 for filename in os.listdir(fpath):
 # pattern = f".+-{z}\_{channel}.tif"
 pattern = f".\*{z}\_{channel}.tif"

 maybe\_match = re.match(pattern, filename)
 if maybe\_match is None:
 continue
 images = load\_tif(os.path.join(fpath, filename))

 return images
```
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
  - [[code-refactoring-context-restore|code-refactoring-context-restore]]
  - [[code-refactoring-tech-debt|code-refactoring-tech-debt]]
  - [[code-reviewer|code-reviewer]]
