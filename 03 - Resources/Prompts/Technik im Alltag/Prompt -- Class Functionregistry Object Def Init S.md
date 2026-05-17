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
id: "#3732"
titel: "```
class FunctionRegistry(object):
 def \_\_init\_\_(self):
 self"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["class", "functionregistry", "object", "init", "self"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
```
class FunctionRegistry(object):
 def \_\_init\_\_(self):
 self.functions = []

 def register(self, function):
 self.functions.append(function)

function\_registry = FunctionRegistry()
You can then write a really simple decorator to add functions to the registry:

def registry\_function(original\_function):
 function\_registry.register(original\_function)
 return original\_function
With those two tools, creating a new script is as simple as doing the following:

@registry\_function
def my\_script(foo):
 return process(foo)
```
give example to these code
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
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
