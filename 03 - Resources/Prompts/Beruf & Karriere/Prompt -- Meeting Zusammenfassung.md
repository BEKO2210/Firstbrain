---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - karriere
  - meetings-kommunikation
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#321"
titel: "Meeting-Zusammenfassung"
kategorie: "Beruf & Karriere"
unterkategorie: "Meetings & Kommunikation"
tags: ["meeting", "zusammenfassung", "protokoll", "effizienz"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
erstellt: "2026-02-23"
---

## Prompt

```
**Rolle:** Du bist ein professioneller Meeting-Moderator und Protokollführer, der aus chaotischen Notizen klare, handlungsorientierte Zusammenfassungen erstellt.

**Kontext:** Ich habe ein Meeting mit [TEILNEHMER] zu [THEMA] geführt.
Meine Rohnotizen: [NOTIZEN, STICHWÖRTER, GESPRÄCHSPUNKTE EINFÜGEN]
Meeting-Dauer: [DAUER]

**Aufgabe:** Erstelle eine strukturierte Meeting-Zusammenfassung:
- Maximal 1 Seite für die Übersicht
- Klare Action Items mit Verantwortlichen und Deadlines
- Keine wörtlichen Wiedergaben, nur Fakten und Entscheidungen
- Offene Punkte klar kennzeichnen

**Ausgabe:**
1. Kurzübersicht (3-5 Sätze: Wer, Was, Ergebnis)
2. Getroffene Entscheidungen (nummeriert)
3. Action Items mit Verantwortlichem und Deadline
4. Offene Punkte für das nächste Meeting
5. Nächster Termin und Agenda-Vorschlag
```

## Anwendung

**Beispiel:**

Input: 5 Personen (Marketing, Sales, Produkt), Q3 Kampagnenplanung, Budget 50k, Social Media Fokus, Influencer-Strategie, Launch 15.8.

**Ergebnis:** Die KI erstellt ein strukturiertes Protokoll mit 3 Entscheidungen (Budget-Verteilung, Kanal-Fokus, Launch-Datum), 5 Action Items mit Namen und Deadlines und einem Agenda-Vorschlag für das Follow-up-Meeting.

## Variationen

### Variation 1: Status-Meeting
Ändere zu: "Dokumentiere nur Abweichungen vom Plan, Blocker und Entscheidungsbedarf — kein Wiederholen von Bekanntem."

### Variation 2: Brainstorming
Ergänze: "Kategorisiere die gesammelten Ideen, priorisiere nach Machbarkeit und Impact, und definiere nächste Schritte."

### Variation 3: Kundenmeetings
Ändere zu: "Diplomatische Formulierung für den Kunden. Keine internen Details, klare Zusagen und Erwartungsmanagement."

### Variation 4: Board-Meeting
Ergänze: "Formelles Protokoll mit Beschlüssen, Abstimmungsergebnissen und rechtlich relevanten Formulierungen."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
