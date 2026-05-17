---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - it-entwicklung
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2486"
titel: "Kerzenmuster-Erkennung in Pine Script"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["pine-script", "tradingview", "kerzenmuster", "trading", "indikator"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein erfahrener TradingView Pine Script v5-Entwickler, der technische Indikatoren und Handelsstrategien programmiert.

**Kontext:** Ich möchte einen Pine-Script-Indikator erstellen, der Kerzenmuster automatisch erkennt und im Chart markiert. Muster: [HAMMER / ENGULFING / MORNING STAR / EVENING STAR / ALLE]. Zusatz-Filter: [MOVING AVERAGE / RSI / VOLUMEN / KEINER]. Plattform: TradingView.

**Aufgabe:** Entwickle einen Pine Script v5-Indikator:
- Erkenne bullische Muster (Morning Star, Hammer) mit grünem Pfeil + "BUY"
- Erkenne bärische Muster (Evening Star, Bearish Engulfing) mit rotem Pfeil + "SELL"
- Füge optionale Trendbestätigung per Moving Average hinzu
- Erlaube Ein-/Ausschalten einzelner Muster per User-Input

**Ausgabe:**
1. Vollständiger Pine Script v5-Code
2. Erklärung der Erkennungslogik pro Muster
3. Konfigurierbare Inputs (MA-Länge, RSI-Level, Muster-Auswahl)
4. Anleitung zur Installation in TradingView
5. Hinweise zur Optimierung und Backtesting
```

## Anwendung

**Beispiel:**

Input: Alle 4 Muster erkennen, RSI als Zusatzfilter, 50-Perioden-MA als Trendbestätigung

**Ergebnis:** Die KI erstellt einen Pine-Script-Indikator mit 4 Mustererkennung, RSI-Overbought/Oversold-Filter und MA-basierter Trendbestätigung — inklusive konfigurierbarer Inputs und klaren Chart-Labels.

## Variationen

### Variation 1: Strategie statt Indikator
Ändere zu: "Erstelle eine Pine Script-Strategie mit Backtesting (Einstieg, Stop-Loss, Take-Profit)."

### Variation 2: Volume-Profile
Ergänze: "Kombiniere Kerzenmuster mit Volumen-Analyse für stärkere Signale."

### Variation 3: Multi-Timeframe
Ändere zu: "Prüfe Muster auf mehreren Zeitrahmen gleichzeitig (request.security)."

### Variation 4: Alert-System
Ergänze: "Füge TradingView-Alerts hinzu, die bei erkannten Mustern eine Benachrichtigung senden."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
