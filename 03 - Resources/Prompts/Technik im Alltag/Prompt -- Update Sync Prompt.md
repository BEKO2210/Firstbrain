---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - prompt
  - lyra
  - pkm
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#3854"
titel: "Update/Sync Prompt"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["update", "sync", "prompt", "updating", "existing"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "gokbeyinac"
erstellt: "2026-03-14"
---

## Prompt

```
You are updating an existing FORME.md documentation file to reflect
changes in the codebase since it was last written.

## Inputs
- **Current FORGME.md:** ${paste_or_reference_file}
- **Updated codebase:** ${upload_files_or_provide_path}
- **Known changes (if any):** [e.g., "We added Stripe integration and switched from REST to tRPC" — or "I don't know what changed, figure it out"]

## Your Tasks

1. **Diff Analysis:** Compare the documentation against the current code.
   Identify what's new, what changed, and what's been removed.

2. **Impact Assessment:** For each change, determine:
   - Which FORME.md sections are affected
   - Whether the change is cosmetic (file renamed) or structural (new data flow)
   - Whether existing analogies still hold or need updating

3. **Produce Updates:** For each affected section:
   - Write the REPLACEMENT text (not the whole document, just the changed parts)
   - Mark clearly: ${section_name} → [REPLACE FROM "..." TO "..."]
   - Maintain the same tone, analogy system, and style as the original

4. **New Additions:** If there are entirely new systems/features:
   - Write new subsections following the same structure and voice
   - Integrate them into the right location in the document
   - Update the Big Picture section if the overall system description changed

5. **Changelog Entry:** Add a dated entry at the top of the document:
   "### Updated ${date} — [one-line summary of what changed]"

## Rules
- Do NOT rewrite sections that haven't changed
- Do NOT break existing analogies unless the underlying system changed
- If a technology was replaced, update the "crew" analogy (or equivalent)
- Keep the same voice — if the original is casual, stay casual
- Flag anything you're uncertain about: "I noticed [X] but couldn't determine if [Y]"
```

## Anwendung

Dieser Prompt stammt aus der Open-Source-Sammlung **awesome-chatgpt-prompts** (CC0 Lizenz).
Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.

- **Rolle:** Update/Sync Prompt
- **Schwierigkeit:** Anfaenger — einfach kopieren und nutzen
- **Tipp:** Passe den Prompt an deine Beduerfnisse an, indem du spezifische Details hinzufuegst

## Variationen

- Aendere die Sprache: Fuege "Antworte auf Deutsch" am Ende hinzu
- Mache es spezifischer: Ersetze allgemeine Begriffe durch deine konkreten Details
- Kombiniere mit anderen Prompts: Nutze mehrere Rollen in einem Gespraech
- Erstelle eine Serie: Baue auf den Ergebnissen auf und verfeinere iterativ

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[claude-win11-speckit-update-skill|claude-win11-speckit-update-skill]]
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
