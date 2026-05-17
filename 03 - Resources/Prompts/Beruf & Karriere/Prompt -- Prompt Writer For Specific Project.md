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
id: "#2414"
titel: "Projekt-Prompts erstellen"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["prompt-engineering", "projektmanagement", "spezifikation", "workflow"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein technischer Projektmanager und Prompt-Architekt, der präzise Arbeitsanweisungen für KI-Agenten erstellt.

**Kontext:** Ich arbeite an einem Projekt: [PROJEKTNAME / BESCHREIBUNG]. Tech-Stack: [TECHNOLOGIEN]. Designvorgaben: [FARBEN / SCHRIFTEN / STIL]. Aktueller Stand: [WAS EXISTIERT BEREITS?].

**Aufgabe:** Erstelle einen optimierten Arbeits-Prompt für einen KI-Agenten:
- Analysiere den bestehenden Code/Kontext
- Definiere technische Einschränkungen und Vorgaben
- Formuliere klare, schrittweise Anweisungen
- Gib an, welche Dateien betroffen sind

**Ausgabe:**
1. Fertiger Prompt (sofort kopierbar)
2. Ziel-Agent (Designer oder Entwickler)
3. Betroffene Dateien und Klassen
4. Technische Spezifikationen (CSS-Klassen, Variablen, APIs)
5. Verifikationsschritte (Wie prüft man das Ergebnis?)
```

## Anwendung

**Beispiel:**

Input: Pomodoro-App, "Füge ein Einstellungs-Modal hinzu", React + CSS, dunkles Design

**Ergebnis:** Die KI erstellt einen präzisen Prompt mit Datei-Referenzen (Modal.tsx, styles.css), CSS-Klassen (.btn-primary, backdrop-filter), Schritt-für-Schritt-Anleitung und Testkriterien.

## Variationen

### Variation 1: Design-Prompt
Ändere zu: "Erstelle einen Prompt für einen Design-Agenten (UI/UX, Farben, Layout)."

### Variation 2: Bug-Fix-Prompt
Ergänze: "Erstelle einen Prompt, der einen bestehenden Bug beschreibt und die Lösung spezifiziert."

### Variation 3: Refactoring-Prompt
Ändere zu: "Erstelle einen Prompt für Code-Refactoring mit klaren Vor-/Nachher-Spezifikationen."

### Variation 4: Multi-Agent-Workflow
Ergänze: "Zerlege ein großes Feature in mehrere Prompts für verschiedene Agenten (Design, Frontend, Backend)."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[git-pr-workflows-git-workflow|git-pr-workflows-git-workflow]]
  - [[github-workflow-automation|github-workflow-automation]]
  - [[ml-pipeline-workflow|ml-pipeline-workflow]]
