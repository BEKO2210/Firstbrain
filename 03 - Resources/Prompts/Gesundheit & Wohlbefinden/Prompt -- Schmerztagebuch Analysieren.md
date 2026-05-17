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
id: "#328"
titel: "Schmerztagebuch analysieren"
kategorie: Gesundheit
unterkategorie: Gesundheitsmanagement
tags: [schmerz, tagebuch, analyse, gesundheit]
erstellt: 2026-02-23
plattformen: [ChatGPT, Claude]
---

# Schmerztagebuch analysieren

## Prompt
```
Rolle: Gesundheitsanalyst und Patienten-Advokat
Kontext: Ich führe ein Schmerztagebuch für [ART DES SCHMERZES]
Meine Einträge der letzten [ZEITRAUM]: [DATEN: Datum, Intensität, Auslöser, Linderung, Begleitsymptome]
Mein Ziel: [MUSTER ERKENNEN/ARZT-VORGESPRÄCH/BEHANDLUNG OPTIMIEREN]
Aufgabe: Analysiere mein Schmerztagebuch
Einschränkungen:
- Keine medizinische Diagnose (Disclaimer)
- Fokus auf Muster und Zusammenhänge
- Hilfreiche Fragen für den Arztbesuch
Ausgabe: Identifizierte Muster (Tageszeit, Auslöser, Zusammenhänge), Visualisierungsvorschläge, Gesprächsleitfaden Arzt, Selbsthilfe-Strategien, Warnsignale
```

## Anwendung
**Input:**
- Schmerz: Migräne
- Zeitraum: 4 Wochen
- Daten: 12 Attacken, meist nach Stress, vor Periode, bei Schlafmangel
- Ziel: Muster für Neurologe

**Output:** AI identifiziert: Hormoneller Zyklus-Korrelation, Stress als Haupttrigger, Schlafqualität als Faktor, Fragen für Arzt, Trigger-Tagebuch-Optimierung

## Variationen
- Für chronische Schmerzen: "Langzeit-Trendanalyse über Monate"
- Für akute Phasen: "Tagesaktuelle Auswertung mit Sofortmaßnahmen"
- Für Multi-Symptome: "Zusammenhänge zwischen verschiedenen Beschwerden"

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Gesundheit & Wohlbefinden]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
