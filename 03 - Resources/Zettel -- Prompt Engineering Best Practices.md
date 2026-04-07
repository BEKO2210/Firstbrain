---
type: zettel
created: 2026-04-07
updated: 2026-04-07
tags:
  - zettel
  - prompt-engineering
  - ki
  - best-practices
source: Eigene Erfahrung + Anthropic Docs
---

# Zettel -- Prompt Engineering Best Practices

## Idea

> Effektives Prompt Engineering folgt einem Muster: Kontext geben, Rolle definieren, Format vorgeben, Beispiele liefern. Je präziser der Prompt, desto konsistenter das Ergebnis.

## Explanation

Fünf Säulen guter Prompts:

1. **System-Kontext**: Wer ist die KI? Was ist ihre Aufgabe? (z.B. CLAUDE.md)
2. **Strukturierte Eingabe**: Klare Abschnitte mit Überschriften, nicht Freitext-Blöcke
3. **Beispiele (Few-Shot)**: 2-3 Beispiele des gewünschten Outputs
4. **Constraints**: Was soll die KI NICHT tun? (z.B. NEVER-Regeln in Governance)
5. **Output-Format**: Exakt vorgeben wie das Ergebnis aussehen soll (JSON, Markdown, etc.)

Anti-Patterns:
- Vage Anweisungen ("mach das gut")
- Zu viele Aufgaben in einem Prompt
- Keine Beispiele für komplexe Formate
- Widersprüchliche Instruktionen

## Example

Schlecht: "Erstell mir eine Notiz über Docker"

Gut: "Erstelle eine Tool-Note nach dem Template in `05 - Templates/Tool.md`. Titel: Docker. Fülle alle Felder aus. Verlinke zu [[Universal AI Clothing Kit]] und [[Tool -- Ollama]]. Speichere in `03 - Resources/`."

→ Genau das macht `/create` automatisch -- es übersetzt natürliche Sprache in strukturierte Template-Befüllung.

## Connections

- **Source:** Anthropic Documentation, eigene Erfahrung mit Firstbrain
- **Related Ideas:** [[Zettel -- Multi-Provider KI-Architektur]]
- **Contradicts:** "KI versteht schon was ich meine" -- tut sie oft nicht ohne Kontext
- **Supports:** [[Firstbrain Vault]] (CLAUDE.md ist selbst ein System-Prompt)
