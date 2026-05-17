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
id: "#2268"
titel: "Daten aus JSON extrahieren und filtern"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["json", "daten-extraktion", "filter", "api", "parsing"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein Daten-Ingenieur mit Expertise im Parsen, Filtern und Transformieren von JSON-Datenstrukturen.

**Kontext:** Ich habe JSON-Daten aus [QUELLE, z.B. REST-API, Datenbank-Export, Log-Dateien, Konfigurationsdateien] und möchte bestimmte Informationen extrahieren. Programmiersprache: [PYTHON / JAVASCRIPT / BASH (jq) / KEINE (manuell)]. Mein JSON sieht so aus: [JSON-BEISPIEL EINFÜGEN ODER STRUKTUR BESCHREIBEN].

**Aufgabe:** Hilf mir, die gewünschten Daten zu extrahieren und zu transformieren:
- Analysiere die JSON-Struktur und erkläre die Verschachtelung
- Erstelle Filter-/Extraktions-Logik für meine Anforderung
- Wandle die Daten in das gewünschte Ausgabeformat um
- Behandle Sonderfälle (fehlende Felder, verschachtelte Arrays)

**Ausgabe:**
1. Analyse der JSON-Struktur (Felder, Typen, Verschachtelung)
2. Code/Anleitung zum Extrahieren der gewünschten Daten
3. Ausgabe im gewünschten Format (CSV, Tabelle, neues JSON)
4. Fehlerbehandlung für unvollständige oder unerwartete Daten
5. Wiederverwendbare Funktion/Query für ähnliche Aufgaben
```

## Anwendung

**Beispiel:**

Input: REST-API liefert JSON mit verschachtelten Bestelldaten, Python, ich brauche nur Bestellnummer + Gesamtbetrag als CSV

**Ergebnis:** Die KI analysiert die JSON-Struktur, schreibt ein Python-Script mit json/csv-Modulen, das die verschachtelten Daten flach extrahiert, fehlende Felder abfängt und eine saubere CSV-Datei erzeugt.

## Variationen

### Variation 1: jq-Kommandozeile
Ändere zu: "Zeige mir jq-Befehle zum Filtern und Transformieren meiner JSON-Daten direkt im Terminal."

### Variation 2: API-Response verarbeiten
Ergänze: "Extrahiere und aggregiere Daten aus paginierten API-Responses (mehrere Seiten)."

### Variation 3: JSON zu Datenbank
Ändere zu: "Wandle meine JSON-Daten in SQL-INSERT-Statements oder ein Datenbankschema um."

### Variation 4: Log-Analyse
Ergänze: "Parse JSON-formatierte Log-Dateien und erstelle eine Zusammenfassung (Fehlerrate, häufigste Meldungen)."

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[json-canvas|json-canvas]]
  - [[moodle-external-api-development|moodle-external-api-development]]
  - [[api-endpoint-builder|api-endpoint-builder]]
