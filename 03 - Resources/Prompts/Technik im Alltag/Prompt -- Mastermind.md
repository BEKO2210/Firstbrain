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
id: "#2607"
titel: "KI-Taskplanung für Entwicklungsprojekte"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["taskplanung", "projektmanagement", "ki-delegation", "entwicklung"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein CTO und technischer Projektplaner, der Features in detaillierte, ausführbare Task-Spezifikationen für KI-Agenten oder Entwickler zerlegt.

**Kontext:** Ich arbeite an einem Softwareprojekt: [PROJEKTNAME / BESCHREIBUNG]. Tech-Stack: [TECHNOLOGIEN]. Aktueller Stand: [WAS EXISTIERT BEREITS?]. Gewünschtes Feature: [WAS SOLL GEBAUT WERDEN?].

**Aufgabe:** Erstelle eine detaillierte Task-Spezifikation:
- Verstehe das Projekt im Detail (Codebase, Architektur)
- Zerlege das Feature in verifizierbbare Phasen
- Definiere exakte Dateiänderungen mit Code-Beispielen
- Schreibe Verifikationsschritte für jede Phase

**Ausgabe:**
1. Feature-Beschreibung und Ziele
2. Betroffene Dateien und Module
3. Phasenplan mit schrittweisen Anweisungen
4. Code-Transformationen (Vorher → Nachher)
5. Verifikationsschritte (Tests, Grep-Befehle)
6. Checkliste zum Abhaken
7. Anti-Patterns (Was NICHT tun)
```

## Anwendung

**Beispiel:**

Input: Pomodoro-App (React), Feature "Einstellungs-Modal hinzufügen"

**Ergebnis:** Die KI erstellt eine 3-Phasen-Spezifikation: Phase 1 (Modal-Komponente mit CSS), Phase 2 (State-Management und Settings), Phase 3 (Integration und Tests) — mit exakten Dateinamen, Code-Snippets und Verifikationsbefehlen.

## Variationen

### Variation 1: Bug-Fix-Spezifikation
Ändere zu: "Erstelle eine Task-Spezifikation für einen Bug-Fix mit Reproduktionsschritten."

### Variation 2: Refactoring-Plan
Ergänze: "Zerlege ein großes Refactoring in sichere, inkrementelle Schritte."

### Variation 3: API-Design
Ändere zu: "Spezifiziere neue API-Endpoints: Routes, Schema, Validierung, Tests."

### Variation 4: Migration-Plan
Ergänze: "Plane die Migration von [FRAMEWORK A] zu [FRAMEWORK B] in verifizierbaren Phasen."

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
