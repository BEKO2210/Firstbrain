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
id: "#2640"
titel: "Report-Anforderungen analysieren"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["reporting", "anforderungsanalyse", "datenvisualisierung", "erp", "dashboard"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein Business-Intelligence-Experte, der Anforderungen für Reports und Dashboards analysiert und in technische Spezifikationen übersetzt.

**Kontext:** Ich benötige einen Report/ein Dashboard für: [BESCHREIBUNG DER ANFORDERUNG, z.B. "Umsatz pro Region der letzten 12 Monate"]. System: [ERP / CRM / DATENBANK / EXCEL]. Zielgruppe: [MANAGEMENT / CONTROLLING / OPERATIV]. Gewünschte Darstellung: [TABELLE / DIAGRAMM / DASHBOARD / AUTOMATISCH].

**Aufgabe:** Analysiere meine Report-Anforderung und erstelle eine Spezifikation:
- Identifiziere die benötigten Datenfelder und Metriken
- Empfehle die passende Visualisierung
- Definiere Filter und Gruppierungen
- Schlage eine technische Umsetzung vor

**Ausgabe:**
1. Anforderungsanalyse (Was wird gebraucht, warum)
2. Datenmodell (Felder, Quellen, Berechnungen)
3. Visualisierungsempfehlung (Diagrammtyp, Layout)
4. Filter und Interaktivität (Zeitraum, Drill-Down)
5. Technische Umsetzung (Tool-Empfehlung, SQL/Query)
```

## Anwendung

**Beispiel:**

Input: "Top-10-Lieferanten nach Liefertreue" aus SAP, für Einkaufsleitung, als Dashboard

**Ergebnis:** Die KI identifiziert die nötigen SAP-Tabellen, definiert den KPI "Liefertreue" (pünktliche/gesamte Lieferungen), empfiehlt ein Balkendiagramm mit Ampel-Farbcodierung und erstellt den SQL-Query — inklusive Zeitraum-Filter und Drill-Down nach Materialgruppe.

## Variationen

### Variation 1: Excel-Report
Ändere zu: "Erstelle eine Excel-Report-Vorlage mit Pivot-Tabellen und Diagrammen für meine Daten."

### Variation 2: Management-Dashboard
Ergänze: "Designe ein Management-Dashboard mit den wichtigsten KPIs für [BEREICH] auf einer Seite."

### Variation 3: Automatisierter Report
Ändere zu: "Erstelle einen automatisierten Report, der täglich/wöchentlich per E-Mail versendet wird."

### Variation 4: Datenqualitäts-Report
Ergänze: "Erstelle einen Report zur Datenqualität: fehlende Werte, Duplikate, Inkonsistenzen."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[kpi-dashboard-design|kpi-dashboard-design]]
  - [[sankhya-dashboard-html-jsp-custom-best-pratices|sankhya-dashboard-html-jsp-custom-best-pratices]]
  - [[enhance-prompt|enhance-prompt]]
