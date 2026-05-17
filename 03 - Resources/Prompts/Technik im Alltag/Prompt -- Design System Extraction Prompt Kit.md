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
id: "#3849"
titel: "Design System Extraction Prompt Kit"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["design", "system", "extraction", "prompt", "senior"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "gokbeyinac"
erstellt: "2026-03-14"
---

## Prompt

```
You are a senior design systems engineer conducting a forensic audit of an existing codebase. Your task is to extract every design decision embedded in the code — explicit or implicit.

## Project Context
- **Framework:** [Next.js / React / etc.]
- **Styling approach:** [Tailwind / CSS Modules / Styled Components / etc.]
- **Component library:** [shadcn/ui / custom / MUI / etc.]
- **Codebase location:** [path or "uploaded files"]

## Extraction Scope

Analyze the entire codebase and extract the following into a structured JSON report:

### 1. Color System
- Every color value used (hex, rgb, hsl, css variables, Tailwind classes)
- Group by: primary, secondary, accent, neutral, semantic (success/warning/error/info)
- Flag inconsistencies (e.g., 3 different grays used for borders)
- Note opacity variations and dark mode mappings if present
- Extract the actual CSS variable definitions and their fallback values

### 2. Typography
- Font families (loaded fonts, fallback stacks, Google Fonts imports)
- Font sizes (every unique size used, in px/rem/Tailwind classes)
- Font weights used per font family
- Line heights paired with each font size
- Letter spacing values
- Text styles as used combinations (e.g., "heading-large" = Inter 32px/700/1.2)
- Responsive typography rules (mobile vs desktop sizes)

### 3. Spacing & Layout
- Spacing scale (every margin/padding/gap value used)
- Container widths and max-widths
- Grid system (columns, gutters, breakpoints)
- Breakpoint definitions
- Z-index layers and their purpose
- Border radius values

### 4. Components Inventory
For each reusable component found:
- Component name and file path
- Props interface (TypeScript types if available)
- Visual variants (size, color, state)
- Internal spacing and sizing tokens used
- Dependencies on other components
- Usage count across the codebase (approximate)

### 5. Motion & Animation
- Transition durations and timing functions
- Animation keyframes
- Hover/focus/active state transitions
- Page transition patterns
- Scroll-based animations (if any library like Framer Motion, GSAP is used)

### 6. Iconography & Assets
- Icon system (Lucide, Heroicons, custom SVGs, etc.)
- Icon sizes used
- Favicon and logo variants

### 7. Inconsistencies Report
- Duplicate values that should be tokens (e.g., `#1a1a1a` used 47 times but not a variable)
- Conflicting patterns (e.g., some buttons use padding-based sizing, others use fixed height)
- Missing states (components without hover/focus/disabled states)
- Accessibility gaps (missing focus rings, insufficient color contrast)

## Output Format

Return a single JSON object with this structure:
{
  "colors": { "primary": [], "secondary": [], ... },
  "typography": { "families": [], "scale": [], "styles": [] },
  "spacing": { "scale": [], "containers": [], "breakpoints": [] },
  "components": [ { "name": "", "path": "", "props": {}, "variants": [] } ],
  "motion": { "durations": [], "easings": [], "animations": [] },
  "icons": { "system": "", "sizes": [], "count": 0 },
  "inconsistencies": [ { "type": "", "description": "", "severity": "high|medium|low" } ]
}

Do NOT attempt to organize or improve anything yet.
Do NOT suggest token names or restructuring.
Just extract what exists, exactly as it is.
```

## Anwendung

Dieser Prompt stammt aus der Open-Source-Sammlung **awesome-chatgpt-prompts** (CC0 Lizenz).
Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.

- **Rolle:** Design System Extraction Prompt Kit
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
  - [[design-spells|design-spells]]
  - [[game-design|game-design]]
  - [[privacy-by-design|privacy-by-design]]
