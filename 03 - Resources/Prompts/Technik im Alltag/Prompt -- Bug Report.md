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
id: "#340"
titel: "Bug-Report schreiben"
kategorie: Technik
unterkategorie: Softwareentwicklung
tags: [bug-report, debugging, dokumentation, qa]
erstellt: 2026-02-23
plattformen: [ChatGPT, Claude]
---

# Bug-Report schreiben

## Prompt
```
Rolle: QA-Engineer und technischer Dokumentar
Kontext: Ich habe einen Bug gefunden in [SYSTEM/APP/WEBSITE]
Was passiert: [FEHLERBESCHREIBUNG]
Was sollte passieren: [ERWARTETES VERHALTEN]
Mein Umfeld: [BROWSER/OS/GERÄT/VERSION]
Aufgabe: Erstelle einen professionellen Bug-Report
Einschränkungen:
- Reproduzierbarkeit ist oberstes Gebot
- Keine Annahmen, nur beobachtete Fakten
- Priorisierung nach Impact und Dringlichkeit
Ausgabe: Strukturierter Report mit Titel, Beschreibung, Schritte zur Reproduktion, erwartet vs. tatsächlich, Umgebung, Screenshots/Logs, Priorität, mögliche Ursachen
```

## Anwendung
**Input:**
- System: E-Commerce Checkout
- Fehler: Rabattcode wird nicht angewendet
- Erwartet: 10% Rabatt
- Umgebung: Chrome 120, Windows 11

**Output:** AI erstellt: Prägnanter Titel, Schritt-für-Schritt Reproduktion (1. Artikel in Warenkorb...), Screenshots, Console-Logs, Impact-Schätzung (Umsatzverlust), Vorschlag für Hotfix

## Variationen
- Für Mobile Apps: "Geräte-spezifische Details und Crash-Logs"
- Für Performance-Bugs: "Metriken, Messungen und Vergleichsdaten"
- Für Security-Bugs: "Vertrauliche Behandlung und CVSS-Score"

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[phase-gated-debugging|phase-gated-debugging]]
  - [[systematic-debugging|systematic-debugging]]
  - [[debugging-toolkit-smart-debug|debugging-toolkit-smart-debug]]
