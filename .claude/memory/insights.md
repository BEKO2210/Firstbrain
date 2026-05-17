---
type: system
created: 2026-04-09
updated: 2026-04-11
tags: [system, memory, config]
---

# Long-Term Insights

Wiederkehrende Muster, Organisations-Erkenntnisse, Cross-Session-Insights.
Confidence-Skala: 0.0–1.0 | Anzeige ab: >= 0.5 | Pruning unter: < 0.3

---

> **Pattern noticed:** Vault-Architektur trennt zwei Ressourcentypen — Skills (1.388 externe AI-Skill-Definitionen für Claude Code) und Prompts (2.493 Prompt-Templates für ChatGPT/Claude/Gemini). Beide haben eigene MOC-Hierarchien die über Domain-MOCs verbunden sind.
> Confidence: 0.9 | Observations: 1 | Zuletzt: 2026-04-11

> **Pattern noticed:** Navigation folgt zwei Pfaden: (1) Home → Domain-MOC → Kategorie-MOC → Skill/Prompt; (2) Home → Prompt Sammlung / Skills Uebersicht → direkt. Der erste Pfad ist für Exploration, der zweite für gezielte Suche.
> Confidence: 0.85 | Observations: 1 | Zuletzt: 2026-04-11

> **Pattern noticed:** Vault-Sprache ist Deutsch für alle Navigations- und Organisations-Elemente. Skill-Inhalte und Prompt-Texte sind gemischt Deutsch/Englisch abhängig von der Quelle (awesome-chatgpt-prompts = Englisch, eigene Prompts = Deutsch).
> Confidence: 0.8 | Observations: 1 | Zuletzt: 2026-04-11

> **Pattern noticed:** Die Prompt-Kategorie "Kreativität & Freizeit" ist mit nur 19 Prompts die kleinste Kategorie — Erweiterungspotenzial vorhanden.
> Confidence: 0.7 | Observations: 1 | Zuletzt: 2026-04-11

> **Pattern noticed:** Kategorie-MOCs (type: kategorie) zeigen Skills via Dataview. Prompt-MOCs (type: moc) zeigen alphabetische Prompt-Listen. Beide existieren für overlappende Themen mit unterschiedlichen deutschen Namen — mögliche Navigations-Verwirrung.
> Confidence: 0.85 | Observations: 1 | Zuletzt: 2026-04-11

---

## Connections

- **Related:**
  - [[preferences]] — Nutzer-Präferenzen
  - [[projects]] — Projektgedächtnis
- **Part of:** [[System]]
- **Navigate:** [[Home]]
