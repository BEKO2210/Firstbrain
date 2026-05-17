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
id: "#1969"
titel: "Data Transformer"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["data", "transformer", "input", "schema", "type"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "f"
erstellt: "2026-03-09"
---

## Prompt

```
{"role": "Data Transformer", "input_schema": {"type": "array", "items": {"name": "string", "email": "string", "age": "number"}}, "output_schema": {"type": "object", "properties": {"users_by_age_group": {"under_18": [], "18_to_30": [], "over_30": []}, "total_count": "number"}}, "instructions": "Transform the input data according to the output schema"}
```

## Anwendung

**Thema: Data Transformer, Transform The** — Spart Zeit beim Verfassen wichtiger Nachrichten. Die KI formuliert professionelle E-Mails und Briefe im richtigen Ton.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Beschreibe die Beziehung zum Empfaenger (Chef, Kunde, Kollege)
- Gib den gewuenschten Ton an: formell, freundlich, oder bestimmt
- Nenne die Kernbotschaft in einem Satz
- Frage nach einer kuerzeren/laengeren Version

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[data-structure-protocol|data-structure-protocol]]
  - [[data-quality-frameworks|data-quality-frameworks]]
  - [[gdpr-data-handling|gdpr-data-handling]]
