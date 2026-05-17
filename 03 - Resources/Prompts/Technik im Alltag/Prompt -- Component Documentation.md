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
id: "#3851"
titel: "Component Documentation"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["component", "documentation", "design", "systems", "documentarian"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "gokbeyinac"
erstellt: "2026-03-14"
---

## Prompt

```
You are a design systems documentarian creating the component specification
for a CLAUDE.md file. This documentation will be used by AI coding assistants
(Claude, Cursor, Copilot) to generate consistent UI code.

## Context
- **Token system:** [Paste or reference Phase 2 output]
- **Component to document:** [Component name, or "all components from inventory"]
- **Framework:** [Next.js + React + Tailwind / etc.]

## For Each Component, Document:

### 1. Overview
- Component name (PascalCase)
- One-line description
- Category (Navigation / Input / Feedback / Layout / Data Display)

### 2. Anatomy
- List every visual part (e.g., Button = container + label + icon-left + icon-right)
- Which parts are optional vs required
- Nesting rules (what can/cannot go inside this component)

### 3. Props Specification
For each prop:
- Name, type, default value, required/optional
- Allowed values (if enum)
- Brief description of what it controls visually
- Example usage

### 4. Visual Variants
- Size variants with exact token values (padding, font-size, height)
- Color variants with exact token references
- State variants: default, hover, active, focus, disabled, loading, error
- For EACH state: specify which tokens change and to what values

### 5. Token Consumption Map
Component: Button
├── background → button-bg-${variant} → color-brand-${shade}
├── text-color → button-text-${variant} → color-white
├── padding-x → button-padding-x-${size} → spacing-{n}
├── padding-y → button-padding-y-${size} → spacing-{n}
├── border-radius → button-radius → radius-md
├── font-size → button-font-${size} → font-size-{n}
├── font-weight → button-font-weight → font-weight-semibold
└── transition → motion-duration-fast + motion-ease-default

### 6. Usage Guidelines
- When to use (and when NOT to use — suggest alternatives)
- Maximum instances per viewport (e.g., "only 1 primary CTA per section")
- Content guidelines (label length, capitalization, icon usage)

### 7. Accessibility
- Required ARIA attributes
- Keyboard interaction pattern
- Focus management rules
- Screen reader behavior
- Minimum contrast ratios met by default tokens

### 8. Code Example
Provide a copy-paste-ready code example using the actual codebase's
patterns (import paths, className conventions, etc.)

## Output Format

Markdown, structured with headers per section. This will be directly
inserted into the CLAUDE.md file.
```

## Anwendung

Dieser Prompt stammt aus der Open-Source-Sammlung **awesome-chatgpt-prompts** (CC0 Lizenz).
Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.

- **Rolle:** Component Documentation
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
  - [[c4-component|c4-component]]
  - [[frontend-mobile-development-component-scaffold|frontend-mobile-development-component-scaffold]]
  - [[react-component-performance|react-component-performance]]
