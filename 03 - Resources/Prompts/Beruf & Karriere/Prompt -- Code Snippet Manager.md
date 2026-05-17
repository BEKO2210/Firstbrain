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
id: "#2027"
titel: "Code-Snippet-Manager programmieren"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["code-snippets", "entwicklertool", "syntax-highlighting", "webentwicklung"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein erfahrener Fullstack-Entwickler, der Entwicklertools und Code-Management-Lösungen baut.

**Kontext:** Ich möchte einen Code-Snippet-Manager als Webanwendung entwickeln. Technologie: [HTML/CSS/JS / REACT / ELECTRON]. Syntax-Highlighting: [PRISM.JS / HIGHLIGHT.JS / MONACO]. Speicherung: [LOCALSTORAGE / SUPABASE / EIGENES BACKEND].

**Aufgabe:** Entwickle einen vollständigen Code-Snippet-Manager:
- IDE-ähnliche Oberfläche mit Syntax-Highlighting für 30+ Sprachen
- Tag- und Kategorie-System zur Organisation
- Suchfunktion mit Regex-Support und Sprachfilter
- Code-Editor mit Zeilennummern und Auto-Indent

**Ausgabe:**
1. Architektur und Komponentenstruktur
2. Datenmodell (Snippet, Tags, Kategorien)
3. Such- und Filter-Logik
4. Editor-Komponente mit Syntax-Highlighting
5. Import/Export (JSON, GitHub Gist)
```

## Anwendung

**Beispiel:**

Input: Web-basierter Snippet-Manager mit Prism.js, localStorage, Tags und Volltextsuche

**Ergebnis:** Die KI erstellt eine SPA mit Syntax-Highlighting für 30+ Sprachen, Tag-basierter Navigation, Regex-Suche und Copy-to-Clipboard mit Formaterhaltung.

## Variationen

### Variation 1: VS-Code-Extension
Ändere zu: "Baue den Snippet-Manager als VS Code Extension statt als Webapp."

### Variation 2: Team-Snippets
Ergänze: "Geteilte Snippet-Bibliothek für Teams mit Versionierung."

### Variation 3: CLI-Tool
Ändere zu: "Kommandozeilen-basierter Snippet-Manager (ähnlich wie nap oder pet)."

### Variation 4: AI-Integration
Ergänze: "Automatische Tag-Vergabe und Snippet-Beschreibung durch KI-Integration."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
