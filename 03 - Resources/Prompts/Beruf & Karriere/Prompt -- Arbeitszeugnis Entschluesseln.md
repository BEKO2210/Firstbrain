---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - bewerbung-jobsuche
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#055"
titel: "Arbeitszeugnis entschlüsseln"
kategorie: "Beruf & Karriere"
unterkategorie: "Bewerbung & Jobsuche"
tags: ["arbeitszeugnis", "bewertung", "geheimcode", "karriere"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
erstellt: "2026-02-23"
---

## Prompt

```
**Rolle:** Du bist ein Arbeitsrecht-Experte spezialisiert auf deutsche Zeugnissprache und die versteckten Codes in Arbeitszeugnissen.

**Kontext:** Ich möchte mein Arbeitszeugnis verstehen oder ein faires Zeugnis für mich einfordern.
Mein Anliegen:
- Zeugnis analysieren: [TEXT DES ZEUGNISSES EINFÜGEN]
- Oder: Zeugnis-Entwurf erstellen für Position [JOBTITEL] mit Note [1-5]

**Aufgabe:** Analysiere das Zeugnis Satz für Satz und übersetze die Zeugnissprache in Klartext:
- Deutsche Zeugnissprache und Rechtsprechung anwenden
- Jede Formulierung mit Schulnote bewerten (1-6)
- Versteckte negative Codes aufdecken
- Verbesserungsvorschläge für schwache Formulierungen machen

**Ausgabe:**
1. Gesamtnote des Zeugnisses
2. Einzelbewertung jeder Formulierung (Originaltext → Klartext → Note)
3. Versteckte Codes und deren Bedeutung
4. Verbesserungsvorschläge für schwache Stellen
5. Musterformulierungen für eine bessere Note
```

## Anwendung

**Beispiel:**

Input: "Er erledigte die ihm übertragenen Aufgaben zu unserer Zufriedenheit."

**Ergebnis:** Die KI analysiert: "Note 4 (ausreichend) — Standardformulierung für unterdurchschnittliche Leistung. Besser wäre: 'stets zu unserer vollsten Zufriedenheit' (Note 1). Der fehlende Superlativ 'vollsten' und das fehlende 'stets' drücken die Bewertung deutlich."

## Variationen

### Variation 1: Zeugnis prüfen
Ändere zu: "Analysiere mein vorhandenes Zeugnis Satz für Satz und bewerte jede Formulierung mit Schulnote."

### Variation 2: Zeugnis schreiben
Ergänze: "Erstelle einen Zeugnis-Entwurf für die Position [JOBTITEL] mit der Gesamtnote [1-5]."

### Variation 3: Widerspruch formulieren
Ändere zu: "Mein Zeugnis ist unfair. Erstelle einen Widerspruchsbrief mit rechtlicher Begründung."

### Variation 4: Zwischenzeugnis beantragen
Ergänze: "Ich möchte ein Zwischenzeugnis beantragen. Wann ist es sinnvoll und wie formuliere ich die Anfrage?"

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
