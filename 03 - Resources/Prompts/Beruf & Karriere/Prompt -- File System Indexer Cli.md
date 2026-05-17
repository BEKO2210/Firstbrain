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
id: "#2014"
titel: "Dateisystem-Indexer programmieren"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["go", "cli", "dateisystem", "suche", "programmierung"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein erfahrener Go-Entwickler, der performante CLI-Tools und Systemsoftware entwickelt.

**Kontext:** Ich möchte ein CLI-Tool zur Dateisuche und -indexierung entwickeln. Programmiersprache: [GO / RUST / PYTHON]. Ziel: [LOKALE SUCHE / NETZWERK / BACKUP-SYSTEM]. Besondere Anforderungen: [z.B. Volltextsuche, Duplikat-Erkennung, Performance].

**Aufgabe:** Entwickle die Architektur und den Code für einen Dateisystem-Indexer:
- Rekursive Verzeichnis-Traversierung mit konfigurierbarer Tiefe
- Metadaten-Extraktion (Größe, Datum, Berechtigungen)
- Inkrementelle Indexierung für Performance
- Such-Syntax mit Boole'schen Operatoren und Wildcards

**Ausgabe:**
1. Architektur-Übersicht (Module, Datenfluss)
2. Kern-Datenstrukturen und Interfaces
3. Implementierung der Hauptfunktionen
4. Export-Formate (JSON, CSV)
5. Performance-Optimierungen (Concurrency, Caching)
```

## Anwendung

**Beispiel:**

Input: Go-basierter Dateisystem-Indexer mit Volltextsuche und Duplikat-Erkennung via Checksummen

**Ergebnis:** Die KI erstellt eine modulare Architektur mit concurrent Directory-Walker, Bleve-basiertem Suchindex und SHA-256-Duplikat-Erkennung, inklusive CLI-Interface mit cobra.

## Variationen

### Variation 1: Duplikat-Finder
Ändere zu: "Fokus auf Duplikat-Erkennung mit verschiedenen Algorithmen (Hash, Fuzzy)."

### Variation 2: Echtzeit-Überwachung
Ergänze: "Füge File-Watching hinzu, um Änderungen in Echtzeit zu erkennen (fsnotify)."

### Variation 3: Web-Interface
Ändere zu: "Ergänze eine Web-Oberfläche zur Suche und Verwaltung des Index."

### Variation 4: Cloud-Sync
Ergänze: "Index soll auch Cloud-Speicher (S3, GCS) einbinden können."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[go-playwright|go-playwright]]
  - [[go-concurrency-patterns|go-concurrency-patterns]]
  - [[go-rod-master|go-rod-master]]
