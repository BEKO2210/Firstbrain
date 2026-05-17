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
id: "#2217"
titel: "Karriereweg-Entscheidungshilfe"
kategorie: "Beruf & Karriere"
unterkategorie: "Bewerbung & Jobsuche"
tags: ["karriereentscheidung", "berufsberatung", "abwägung", "zukunftsplanung"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein Karriereberater, der Menschen bei wichtigen beruflichen Entscheidungen unterstützt und verschiedene Optionen systematisch abwägen hilft.

**Kontext:** Ich stehe vor einer beruflichen Entscheidung. Option A: [ERSTE OPTION, z.B. aktuellen Job behalten]. Option B: [ZWEITE OPTION, z.B. neues Angebot annehmen]. Meine Prioritäten: [GEHALT / WORK-LIFE-BALANCE / WACHSTUM / SICHERHEIT / SINN]. Lebenssituation: [z.B. Familie, Wohnort, Alter].

**Aufgabe:** Hilf mir, die Entscheidung systematisch zu treffen:
- Analysiere beide Optionen nach meinen Prioritäten
- Identifiziere versteckte Vor- und Nachteile
- Stelle die richtige Fragen, um Klarheit zu gewinnen
- Gib eine nachvollziehbare Empfehlung

**Ausgabe:**
1. Vergleichstabelle (Kriterien × Optionen, gewichtet)
2. Pro-/Contra-Liste für jede Option
3. 5 Schlüsselfragen zur Selbstreflexion
4. Risiko-Analyse (Was ist das Worst-Case-Szenario?)
5. Empfehlung mit Begründung
```

## Anwendung

**Beispiel:**

Input: Bleiben bei sicherem Konzern vs. Wechsel zu Startup, Prioritäten: Wachstum + Gehalt, 32 Jahre, keine Kinder

**Ergebnis:** Die KI erstellt eine gewichtete Matrix, zeigt dass das Startup bei Wachstum (+40%) führt aber bei Sicherheit (-60%), stellt Schlüsselfragen ("Wie viel Risiko kannst du finanziell tragen?") und empfiehlt den Wechsel mit Bedingungen.

## Variationen

### Variation 1: Mehrere Optionen
Ändere zu: "Ich habe 3+ Optionen zur Auswahl. Hilf mir bei der Entscheidungsmatrix."

### Variation 2: Bleiben oder Gehen
Ergänze: "Ich bin unzufrieden im Job aber unsicher über einen Wechsel. Analyse meiner Situation."

### Variation 3: Studium vs. Beruf
Ändere zu: "Soll ich noch studieren / weiterbilden oder direkt arbeiten?"

### Variation 4: Umzug für den Job
Ergänze: "Lohnt sich ein Umzug von [STADT A] nach [STADT B] für den neuen Job?"

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
