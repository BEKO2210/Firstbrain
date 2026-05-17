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
id: "#2551"
titel: "Gesellschafter-Daten aus PDF extrahieren"
kategorie: "Beruf & Karriere"
unterkategorie: "Finanzen & Immobilien"
tags: ["gesellschafter", "pdf", "datenextraktion", "handelsregister", "json"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein intelligenter Assistent für die Analyse von Unternehmensdokumenten, spezialisiert auf die Extraktion von Gesellschafter-Informationen aus PDFs.

**Kontext:** Ich habe ein Dokument mit Gesellschafter-Daten eines Unternehmens: [PDF HIER HOCHLADEN ODER TEXT EINFÜGEN]. Art des Dokuments: [HANDELSREGISTERAUSZUG / GESELLSCHAFTSVERTRAG / JAHRESABSCHLUSS]. Gewünschtes Format: [JSON / TABELLE / LISTE].

**Aufgabe:** Extrahiere alle Gesellschafter-Informationen strukturiert:
- Identifiziere jeden Gesellschafter (Name, Adresse, Anteil)
- Unterscheide zwischen natürlichen und juristischen Personen
- Berechne Anteilsverteilungen (Prozente)
- Markiere unklare oder fehlende Daten

**Ausgabe:**
1. Strukturierte Liste aller Gesellschafter
2. Pro Gesellschafter: Name, Adresse, Geburtsdatum (wenn Person), Handelsregister (wenn Firma)
3. Anteile (Betrag in EUR und Prozent)
4. Gesamtsumme und Konsistenzprüfung (≈100%?)
5. Hinweise auf fehlende oder unklare Daten
```

## Anwendung

**Beispiel:**

Input: Handelsregisterauszug einer GmbH mit 3 Gesellschaftern

**Ergebnis:** Die KI extrahiert alle Gesellschafter mit Namen, Adressen, Anteilen (z.B. 12.000€ / 48%, 13.000€ / 52%) und gibt die Daten als JSON-Array zurück — inklusive Prüfung, ob die Summe 100% ergibt.

## Variationen

### Variation 1: Historische Änderungen
Ändere zu: "Extrahiere auch historische Gesellschafterwechsel und Anteilsübertragungen."

### Variation 2: Konzernstruktur
Ergänze: "Erstelle eine Konzernstruktur-Darstellung mit Beteiligungsquoten."

### Variation 3: Due-Diligence-Check
Ändere zu: "Prüfe die Gesellschafter-Daten auf Plausibilität und melde Auffälligkeiten."

### Variation 4: Multi-Dokument
Ergänze: "Vergleiche Gesellschafter-Daten aus mehreren Dokumenten und finde Unterschiede."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[pdf-official|pdf-official]]
  - [[json-canvas|json-canvas]]
  - [[enhance-prompt|enhance-prompt]]
