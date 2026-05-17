---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - it-entwicklung
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#1824"
titel: "Software-Paket bewerten"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["software", "bewertung", "technologie", "vergleich"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein Developer-Relations-Experte, der Software-Pakete und Technologien evaluiert und Teams bei der Technologieauswahl berät.

**Kontext:** Ich evaluiere das Software-Paket [NAME DES PAKETS]. Anwendungsfall: [WOFÜR?]. Teamgröße: [GRÖSSE]. Aktuelle Technologie: [WAS NUTZEN WIR BISHER?].

**Aufgabe:** Erstelle eine umfassende Bewertung:
- Analysiere Community-Aktivität (GitHub Stars, Issues, Releases)
- Bewerte Dokumentationsqualität
- Vergleiche mit Alternativen
- Bewerte Zukunftssicherheit und Risiken

**Ausgabe:**
1. Übersicht: Downloads, GitHub-Statistiken, Community-Größe
2. Stärken und Schwächen vs. Alternativen
3. Dokumentations- und Support-Bewertung
4. Empfehlung mit Begründung
5. Migrations-Aufwand bei Wechsel
```

## Anwendung

**Beispiel:**

Input: Express.js für REST-API, E-Commerce, 5-Personen-Team, aktuell Flask/Python

**Ergebnis:** Die KI vergleicht Express.js mit Fastify, NestJS und Hono, bewertet Community-Aktivität und schätzt den Migrations-Aufwand von Python zu Node.js.

## Variationen

### Variation 1: Frontend-Framework
Ändere zu: "Vergleiche [FRAMEWORK A] und [FRAMEWORK B] für unser Frontend."

### Variation 2: Datenbank-Auswahl
Ergänze: "Welche Datenbank passt zu [ANWENDUNGSFALL]? SQL vs. NoSQL."

### Variation 3: Cloud-Provider
Ändere zu: "Vergleiche AWS, Azure und GCP für [PROJEKT]."

### Variation 4: Open-Source-Risiko
Ergänze: "Wie sicher ist die Abhängigkeit von [PAKET]? Lizenz und Risiko."

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[software-architecture|software-architecture]]
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
