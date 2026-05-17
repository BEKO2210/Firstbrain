---
type: system
created: 2026-04-09
tags: [system, memory, config]
---

# Changelog

Significant vault actions logged by Claude.

## 2026-04-11 — Vollständige Vault-Optimierung

### Rebuilt
- **Home.md** — Neural Hub neu aufgebaut: Skills+Prompts pro Domain in einer Tabelle, Schnellaktionen, Status-Dataviews, alle Schnell-Links
- **MEMORY.md** — Gefüllt mit aktuellem Vault-Status, Nutzer-Info (Belkis), Statistiken
- **.claude/memory/preferences.md** — Sprache auf Deutsch gesetzt, Onboarding als complete markiert
- **.claude/memory/insights.md** — 5 strukturelle Insights mit Confidence-Scores eingefügt

### Fixed: MOC Connection Bugs (9 Dateien)
Alle Prompt-MOCs hatten `[[Domain]], [[Domain]], [[Home]]` (doppelter Domain-Link):
- Alltag & Leben → behoben + Verwandte Skills ergänzt
- Bild & Visualisierung → behoben + Verwandte Skills ergänzt
- Lernen & Wachstum → behoben + Verwandte Skills ergänzt
- Technik im Alltag → behoben + Verwandte Skills ergänzt
- Kommunikation & Beziehungen → behoben + Verwandte Skills ergänzt
- Kreativität & Freizeit → behoben + Verwandte Skills ergänzt
- Spezielle Situationen → behoben
- Beruf & Karriere → behoben (hatte `[[Domain]]` 3× statt 2×) + Verwandte Skills ergänzt
- Gesundheit & Wohlbefinden → behoben + Verwandte Skills ergänzt

### Fixed: System.md broken links
- `[[Skills MOC]]` → `[[Skills Uebersicht]]`
- `[[Prompts MOC]]` → `[[Prompt Sammlung]]`
- `[[Resources MOC]]` → `[[Ressourcen]]`
- `[[Templates MOC]]` → `[[Vorlagen]]`

### Added: Cross-Links Skills ↔ Prompts
- Karriere & Beruf (Skills) → Verwandte Prompts: [[Beruf & Karriere]]
- Bildung & Wissen (Skills) → Verwandte Prompts: [[Lernen & Wachstum]]
- Gesundheit & Wellness (Skills) → Verwandte Prompts: [[Gesundheit & Wohlbefinden]]

<!-- Actions will be logged here as Claude works with the vault -->

## Connections

- **Related System Files:**
  - [[Insights]] - Long-term patterns and insights
  - [[Preferences]] - User preferences and settings
  - [[Projects]] - Project memory and context
- **Part of:** [[System MOC]]
- **Navigate:** [[Home]]
