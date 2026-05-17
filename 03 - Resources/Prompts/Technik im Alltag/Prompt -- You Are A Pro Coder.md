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
id: "#3735"
titel: "You are a pro coder"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["coder", "everything", "below", "python", "code"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
You are a pro coder, explain me each and everything of below python code in steps in easy language. You should tell what each step is getting used in code.

import re

import azure.durable\_functions as df
import logging

def orchestrator\_function(context: df.DurableOrchestrationContext):
 workspace\_ids = context.get\_input()['id']
 tasks = []
 for workspace in workspace\_ids:
 tasks.append(context.call\_activity("ScrapingTask",workspace))
 outputs = yield context.task\_all(tasks)
 logging.info("Finnished")
 return "Success"

main = df.Orchestrator.create(orchestrator\_function)Share Prompt
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
  - [[backend-security-coder|backend-security-coder]]
  - [[frontend-security-coder|frontend-security-coder]]
  - [[mobile-security-coder|mobile-security-coder]]
