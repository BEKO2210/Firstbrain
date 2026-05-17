---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - karriere
  - pkm
  - projektmanagement
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2639"
titel: "Umsetzungsideen aus Dokumenten generieren"
kategorie: "Beruf & Karriere"
unterkategorie: "Projektmanagement"
tags: ["projektplanung", "dokument-analyse", "umsetzung", "module", "strategie"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein erfahrener Projektmanager, der aus Projektdokumenten konkrete Umsetzungsideen und Strategien ableitet.

**Kontext:** Ich habe ein Projektdokument (Konzept, Anforderung, Pflichtenheft): [DOKUMENT-INHALT EINFÜGEN ODER BESCHREIBEN]. Art des Projekts: [SOFTWARE / MARKETING / ORGANISATION / PRODUKT]. Ziel: [z.B. schnelle Umsetzung, Machbarkeitsprüfung, Ressourcenplanung].

**Aufgabe:** Analysiere das Dokument und generiere Umsetzungsideen:
- Identifiziere die Hauptmodule und Arbeitspakete
- Entwickle konkrete Umsetzungsstrategien pro Modul
- Priorisiere nach Aufwand, Nutzen und Abhängigkeiten
- Schlage Quick Wins und kritische Pfade vor

**Ausgabe:**
1. Modul-Übersicht (alle identifizierten Bausteine)
2. Umsetzungsideen pro Modul (je 2-3 konkrete Ansätze)
3. Priorisierungs-Matrix (Aufwand vs. Nutzen)
4. Abhängigkeiten und kritischer Pfad
5. Empfohlene Reihenfolge der Umsetzung
```

## Anwendung

**Beispiel:**

Input: Pflichtenheft für ein Kundenportal (Login, Dashboard, Ticketsystem, Reporting)

**Ergebnis:** Die KI zerlegt das Dokument in 4 Module, empfiehlt Login + Dashboard als Quick Win (Woche 1-2), Ticketsystem als Kern (Woche 3-6) und Reporting als Phase 2 — mit konkreten Technologie-Vorschlägen und Ressourcenschätzung.

## Variationen

### Variation 1: Anforderungsanalyse
Ändere zu: "Analysiere dieses Anforderungsdokument und identifiziere Lücken, Widersprüche und fehlende Details."

### Variation 2: Machbarkeitsprüfung
Ergänze: "Prüfe die technische und wirtschaftliche Machbarkeit jedes Moduls und bewerte Risiken."

### Variation 3: Agile User Stories
Ändere zu: "Wandle die Dokumentinhalte in User Stories mit Akzeptanzkriterien um."

### Variation 4: Kostenabschätzung
Ergänze: "Schätze den Aufwand pro Modul in Personentagen und ordne Kompetenzbereiche zu."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[odoo-module-developer|odoo-module-developer]]
  - [[terraform-module-library|terraform-module-library]]
  - [[enhance-prompt|enhance-prompt]]
