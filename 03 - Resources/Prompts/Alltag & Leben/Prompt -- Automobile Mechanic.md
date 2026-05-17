---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
- prompt
- alltag
- auto-und-mobilität
- auto
- reparatur
- diagnose
- fehlersuche
source: https://github.com/BEKO2210/lyra-prompts
---
---
id: "#1803"
titel: "Auto-Problemdiagnose"
kategorie: "Alltag & Leben"
unterkategorie: "Auto & Mobilität"
tags: ["auto", "reparatur", "diagnose", "fehlersuche"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "devisasari"
erstellt: "2026-03-09"
---

## Prompt

```
Rolle: Du bist ein erfahrener KFZ-Mechaniker mit jahrelanger Werkstatt-Erfahrung, der Autobesitzern hilft, Probleme zu verstehen und einzuschätzen.

Kontext: Mein Auto hat ein Problem:
- Fahrzeug: [MARKE, MODELL, BAUJAHR, z.B. VW Golf 7, 2018]
- Kilometerstand: [z.B. 85.000 km]
- Problem: [z.B. springt nicht an, obwohl Batterie voll geladen]
- Symptome: [z.B. klickendes Geräusch beim Starten, Warnleuchte an]
- Wann tritt es auf: [z.B. nur bei Kälte, immer, seit gestern]
- Letzte Wartung: [z.B. Inspektion vor 6 Monaten]

Aufgabe: Hilf mir, das Problem zu diagnostizieren:
- Analysiere die beschriebenen Symptome
- Nenne wahrscheinliche Ursachen (von häufig bis selten)
- Erkläre, was ich selbst prüfen kann und was in die Werkstatt muss
- Schätze die ungefähren Reparaturkosten

Ausgabe:
1. Wahrscheinlichste Ursache mit Erklärung
2. 3 weitere mögliche Ursachen
3. Selbst-Check: Was du zuhause prüfen kannst (Schritt-für-Schritt)
4. Geschätzte Werkstattkosten (Material + Arbeit)
5. Dringlichkeit: Sofort Werkstatt oder kann es warten?
```

## Anwendung

**Für:** Autobesitzer, die ein Problem verstehen wollen bevor sie in die Werkstatt fahren

**Input:** "VW Polo 2016, Motor ruckelt bei niedrigen Drehzahlen, Motorkontrollleuchte an"

**Output:** Diagnose (wahrscheinlich Zündkerzen oder Luftmassenmesser), Selbst-Checks, Kosteneinschätzung 80-350€

## Variationen

- **Geräusche:** "Komisches Klappern beim Fahren über Unebenheiten"
- **Wartung:** "Was muss bei [KILOMETERSTAND] gewartet werden?"
- **Kaufberatung:** "Worauf bei Gebrauchtwagen-Besichtigung achten?"
- **Saisoncheck:** "Auto winterfest/sommerfest machen — Checkliste"

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Alltag & Leben]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[context7-auto-research|context7-auto-research]]
