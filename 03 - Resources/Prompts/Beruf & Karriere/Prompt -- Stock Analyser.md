---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - finanzen-immobilien
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2685"
titel: "Aktien-Bewertung und Scoring"
kategorie: "Beruf & Karriere"
unterkategorie: "Finanzen & Immobilien"
tags: ["aktien-scoring", "bewertung", "vergleich", "kennzahlen", "investment"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein Aktienanalyst, der Unternehmen nach einem strukturierten Scoring-System bewertet und vergleichbar macht.

**Kontext:** Ich möchte folgende Aktie(n) bewerten: [AKTIENNAME(N)]. Branche: [BRANCHE]. Mein Ziel: [EINZELBEWERTUNG / VERGLEICH MEHRERER AKTIEN / PORTFOLIO-CHECK]. Fokus: [WACHSTUM / DIVIDENDE / VALUE / QUALITÄT].

**Aufgabe:** Führe eine strukturierte Aktienbewertung mit Scoring durch:
- Bewerte in 7 Kategorien mit je einem Score von 1-5
- Vergleiche mit Branchendurchschnitt (Peer-Vergleich)
- Identifiziere Stärken und Risiken
- Gib eine klare Handlungsempfehlung

**Ausgabe:**
1. Unternehmensübersicht (Kurzprofil, Branche, Marktposition)
2. Scoring-Tabelle (7 Kategorien à 1-5 Punkte):
   - Finanzkennzahlen (KGV, KBV, Verschuldung)
   - Wachstum (Umsatz, Gewinn, Prognose)
   - Profitabilität (Margen, ROE, Cashflow)
   - Wettbewerbsposition (Marktanteil, Moat)
   - Management (Strategie, Track Record)
   - Branchenausblick (Trends, Risiken)
   - Bewertungsniveau (fair bewertet, über-/unterbewertet)
3. Peer-Vergleich (Tabelle mit Wettbewerbern)
4. Gesamtscore und Einordnung
5. Handlungsempfehlung mit Begründung
6. Hinweis: Keine Anlageberatung
```

## Anwendung

**Beispiel:**

Input: Allianz SE vs. Munich Re vs. Hannover Rück, Dividendenfokus

**Ergebnis:** Die KI erstellt für jede Aktie einen 7-Kategorien-Score, vergleicht Dividendenrendite, Ausschüttungsquote und Wachstum in einer Übersichtstabelle und empfiehlt die beste Option für Dividendeninvestoren — mit Gesamtscore und Risiko-Hinweisen.

## Variationen

### Variation 1: Watchlist-Bewertung
Ändere zu: "Bewerte meine Watchlist mit 5-10 Aktien und erstelle ein Ranking."

### Variation 2: Sektoren-Vergleich
Ergänze: "Vergleiche die besten Aktien aus [SEKTOR 1] vs. [SEKTOR 2]."

### Variation 3: ETF-Vergleich
Ändere zu: "Bewerte und vergleiche ETFs nach Kosten, Tracking-Differenz und Zusammensetzung."

### Variation 4: Risiko-Score
Ergänze: "Erstelle einen Risiko-Score für mein Gesamtportfolio (Konzentration, Korrelation, Volatilität)."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
