---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - importiert
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2931"
titel: "Second Opinion"
kategorie: "Beruf & Karriere"
unterkategorie: "Importiert"
tags: ["second", "opinion", "name", "description", "codex"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "ilkerulusoy"
erstellt: "2026-03-09"
---

## Prompt

```
---
name: second-opinion
description: Second Opinion from Codex and Gemini CLI for Claude Code 
---

# Second Opinion

When invoked:

1. **Summarize the problem** from conversation context (~100 words)

2. **Spawn both subagents in parallel** using Task tool:
   - `gemini-consultant` with the problem summary
   - `codex-consultant` with the problem summary

3. **Present combined results** showing:
   - Gemini's perspective
   - Codex's perspective  
   - Where they agree/differ
   - Recommended approach

## CLI Commands Used by Subagents

```bash
gemini -p "I'm working on a coding problem... [problem]"
codex exec "I'm working on a coding problem... [problem]"
```
```

## Anwendung

**Thema: Second-Opinion, Second Opinion** — Verbessert deine Kommunikationsfaehigkeiten in verschiedenen Situationen. Die KI gibt Formulierungshilfen und Gespraechsstrategien.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Beschreibe die konkrete Situation und die Beziehung
- Nenne das gewuenschte Ergebnis des Gespraechs
- Frage nach verschiedenen Formulierungsvorschlaegen
- Bitte um Tipps fuer Koerpersprache und Tonfall

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[seo-aeo-meta-description-generator|seo-aeo-meta-description-generator]]
  - [[codex-review|codex-review]]
  - [[enhance-prompt|enhance-prompt]]
