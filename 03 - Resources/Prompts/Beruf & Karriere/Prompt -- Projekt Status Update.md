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
id: "#323"
titel: "Projekt-Status-Update"
kategorie: "Beruf & Karriere"
unterkategorie: "Projektmanagement"
tags: ["projekt", "status", "update", "reporting"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
erstellt: "2026-02-23"
---

## Prompt

```
**Rolle:** Du bist ein erfahrener Projektmanager mit Fokus auf klare, stakeholder-gerechte Kommunikation und professionelles Reporting.

**Kontext:** Mein Projekt [PROJEKTNAME] läuft seit [ZEITRAUM].
- Aktueller Stand: [FORTSCHRITT IN %, ERREICHTE MEILENSTEINE]
- Herausforderungen: [RISIKEN, VERZÖGERUNGEN, BLOCKER]
- Stakeholder: [AN WEN GEHT DAS UPDATE: Geschäftsführung, Kunde, Team]

**Aufgabe:** Formuliere ein professionelles Status-Update:
- Ehrlich über Probleme, aber lösungsorientiert
- Fortschritt quantifizieren wo möglich
- Detailtiefe an Stakeholder anpassen
- Klare Handlungsempfehlungen bei Problemen

**Ausgabe:**
1. Ampel-Status pro Projektbereich (Grün/Gelb/Rot)
2. Highlights und erreichte Meilensteine
3. Risiken und Gegenmaßnahmen
4. Nächste Meilensteine mit Terminen
5. Benötigte Entscheidungen oder Ressourcen
```

## Anwendung

**Beispiel:**

Input: Website-Relaunch, 70% fertig, Design abgeschlossen, Entwicklung verzögert wegen krankem Entwickler, Stakeholder: Geschäftsführung

**Ergebnis:** Die KI erstellt ein Update mit Ampel-Status (Design: Grün, Entwicklung: Gelb, Budget: Grün), beschreibt den Lösungsvorschlag (externer Freelancer als Backup), schlägt einen angepassten Zeitplan vor und fragt die GF nach einer Entscheidung.

## Variationen

### Variation 1: Agile Sprint-Review
Ändere zu: "Sprint-Review Zusammenfassung: erledigte User Stories, Velocity, Blocker und Sprint-Ziel für nächste Woche."

### Variation 2: Kunden-Update
Ergänze: "Fokus auf gelieferten Mehrwert und nächste sichtbare Ergebnisse. Keine internen Details."

### Variation 3: Eskalation
Ändere zu: "Das Projekt ist gefährdet. Formuliere eine klare Eskalation mit Handlungsbedarf und Entscheidungsoptionen."

### Variation 4: Projektabschluss
Ergänze: "Das Projekt ist abgeschlossen. Erstelle eine Lessons-Learned-Zusammenfassung mit Erfolgen und Verbesserungspotenzialen."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[hig-components-status|hig-components-status]]
  - [[conductor-status|conductor-status]]
  - [[claude-win11-speckit-update-skill|claude-win11-speckit-update-skill]]
