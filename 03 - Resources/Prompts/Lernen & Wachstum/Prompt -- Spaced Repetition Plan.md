---
type: resource
created: 2026-04-08
updated: 2026-04-09
tags:
  - prompt
  - lernen
  - wachstum
  - lyra
  - pkm
  - lernmethoden
  - produktivität
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: ""
titel: "Spaced Repetition Plan"
kategorie: Lernen & Wachstum
unterkategorie: Produktivität
tags: ['prompt', 'lyra', 'pkm', 'lernen', 'wachstum']
erstellt: 2026-04-09
plattformen: [ChatGPT, Claude, Gemini]
---

# Spaced-Repetition Plan

## Prompt
```
Rolle: Lernpsychologe und Gedächtnisforscher
Kontext: Ich muss folgenden Lernstoff langfristig behalten: [STOFF/THEMA]
Mein Prüfungstermin/Lernziel: [DATUM]
Verfügbare Lernzeit pro Tag: [ZEIT]
Mein aktueller Stand: [NOCH NICHT GELERNT/TEILWEISE/VERTRAUT]
Aufgabe: Erstelle einen optimierten Wiederholungsplan
Einschränkungen:
- Basierend auf Ebbinghaus Vergessenskurve
- Berücksichtige Schlaf und Konsolidierung
- Plane Puffer für verpasste Sessions
Ausgabe: Tagesplan mit Intervallen (1-3-7-14-30 Tage), Lernkarten-Vorschläge, Review-Checklisten
```

## Anwendung
**Input:**
- Stoff: Spanisch Vokabeln (500 Wörter)
- Ziel: Konversation in 3 Monaten
- Zeit: 30 Minuten täglich
- Stand: Anfänger

**Output:** AI erstellt: 20 Wörter/Tag, Intervall-Plan mit Anki-ähnlichen Abständen, tägliche Review-Quantität, Wochen-Reviews

## Variationen
- Für Prüfungsvorbereitung: "Intensiv-Plan mit 2-Wochen-Countdown"
- Für berufliche Weiterbildung: "Kontinuierlicher Plan über 6 Monate"
- Für Sprachen: "Inklusive aktiver Anwendungsphasen"

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Lernen & Wachstum]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
