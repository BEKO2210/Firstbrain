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
id: "#3731"
titel: "From http import HTTPStatus"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["http", "import", "httpstatus", "flask", "blueprint"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "openrlhf-UltraFeedback"
erstellt: "2026-03-10"
---

## Prompt

```
from http import HTTPStatus
from flask import Blueprint
from flasgger import swag\_from
from api.model.welcome import WelcomeModel
from api.schema.welcome import WelcomeSchema

home\_api = Blueprint('api', \_\_name\_\_)
@home\_api.route('/')
@swag\_from({
 'responses': {
 HTTPStatus.OK.value: {
 'description': 'Welcome to the Flask Starter Kit',
 'schema': WelcomeSchema
 }
 }
})
def welcome():
 """
 1 liner about the route
 A more detailed description of the endpoint
 ---
 """
 result = WelcomeModel()
 return WelcomeSchema().dump(result), 200

add get and post with flaskrestfull api and show me code
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
  - [[blueprint|blueprint]]
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
