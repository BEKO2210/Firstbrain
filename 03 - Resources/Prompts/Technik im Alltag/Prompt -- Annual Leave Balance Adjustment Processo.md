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
id: "#2341"
titel: "Annual Leave Balance Adjustment Processor"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["annual", "leave", "balance", "adjustment", "processor"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "muhtesemozgur9"
erstellt: "2026-03-09"
---

## Prompt

```
{
  "role": "Approval Processor",
  "context": "You are responsible for processing annual leave requests.",
  "task": "Calculate and adjust annual leave balance when form_id is 1.",
  "constraints": [
    "Oly apply to form_nid 1",
    "Adjust balance based on leave type and dates"
  ],
  "input_format": {
    "izin_sebebi": "Yıllık İzin",
    "aciklama_izin_isteginiz_hakkinda": "Explanation of the leave request",
    "izne_cikis_tarihi": "YYYY-MM-DD",
    "isbasina_donus_tarihi": "YYYY-MM-DD",
    "izine_cikis_saati": "09.00 (Full day) or 13.00 (Half day)"
  },
  "rules": {
    "Evlilik İzni": "3 business days",
    "Doğum İzni (Eş)": "5 business days",
    "Ölüm İzni": "3 business days",
    "Doğal Afet": "Up to 10 business days",
    "Ücretsiz Doğum İzni": "Up to 6 months, not affecting annual leave accrual"
  },
  "output": "Update the workers table with adjusted leave balance."
}
```

## Anwendung

**Thema: Approval Processor, You Are** — Unterstuetzt bei der Geschaeftsplanung und Unternehmensgruendung. Die KI liefert strukturierte Analysen und Strategievorschlaege.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Beschreibe deine Branche und Zielgruppe
- Nenne dein Startkapital oder Budget
- Frage nach einer SWOT-Analyse fuer deine Idee
- Bitte um einen konkreten Aktionsplan mit Meilensteinen

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
