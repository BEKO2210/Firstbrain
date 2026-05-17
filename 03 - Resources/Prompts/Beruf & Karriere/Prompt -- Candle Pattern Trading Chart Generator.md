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
id: "#2485"
titel: "Trading-Chart mit Kerzenmuster erstellen"
kategorie: "Beruf & Karriere"
unterkategorie: "Finanzen & Immobilien"
tags: ["trading", "chartanalyse", "kerzenmuuster", "technische-analyse"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein Experte für technische Analyse und Chartmuster, der Tradern hilft, Kauf- und Verkaufssignale auf Basis von Kerzenmustern zu erkennen. Hinweis: Bildungszwecke, keine Anlageberatung.

**Kontext:** Ich möchte Kerzenmuster in Charts erkennen und interpretieren. Asset: [AKTIE / KRYPTO / FOREX-PAAR]. Zeitrahmen: [1H / 4H / TÄGLICH / WÖCHENTLICH]. Zusätzliche Indikatoren: [RSI / MACD / MOVING AVERAGE / KEINE].

**Aufgabe:** Erstelle eine Chartanalyse mit Kerzenmustern:
- Identifiziere bullische Muster (Hammer, Morning Star, Engulfing)
- Identifiziere bärische Muster (Evening Star, Shooting Star, Engulfing)
- Markiere Kauf-/Verkaufssignale mit Erklärung
- Kombiniere mit Trendindikatoren für Bestätigung

**Ausgabe:**
1. Übersicht der erkannten Kerzenmuster
2. Kauf-Signale mit Begründung und Konfidenzniveau
3. Verkauf-Signale mit Begründung und Konfidenzniveau
4. Empfohlene Stop-Loss- und Take-Profit-Levels
5. Disclaimer: Keine Anlageberatung, eigenes Risiko
```

## Anwendung

**Beispiel:**

Input: Bitcoin/USD, Tages-Chart, mit RSI und 50-Tage-MA

**Ergebnis:** Die KI identifiziert einen Hammer am Support-Level, bestätigt durch überverkauften RSI (<30) und Preisreaktion am 50-MA, und markiert ein bullisches Signal mit Stop-Loss unter dem Hammer-Tief.

## Variationen

### Variation 1: Automatische Erkennung
Ändere zu: "Erstelle ein Script (Python/Pine Script), das Kerzenmuster automatisch erkennt."

### Variation 2: Backtesting
Ergänze: "Teste die Zuverlässigkeit von [MUSTER] über die letzten 12 Monate für [ASSET]."

### Variation 3: Multi-Timeframe-Analyse
Ändere zu: "Analysiere das gleiche Asset in 3 Zeitrahmen (1H, 4H, Daily) für ein Gesamtbild."

### Variation 4: Lernmaterial
Ergänze: "Erkläre die 10 wichtigsten Kerzenmuster mit visueller Beschreibung und Beispielen."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
