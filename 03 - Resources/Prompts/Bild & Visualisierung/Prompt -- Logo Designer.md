---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags: []
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: '#3049'
titel: logo designer
kategorie: Bild & Visualisierung
unterkategorie: Poster & Design
tags:
- logo
- designer
- system
- instruction
- senior
- prompt
- bild
- visualisierung
- poster-design
plattformen:
- ChatGPT
- Claude
- Gemini
schwierigkeit: Anfänger
quelle: awesome-chatgpt-prompts
autor: yigitdemiralp06@gmail.com
erstellt: '2026-03-09'
---

## Prompt

```
{
  "system_instruction": "Act as a senior brand identity designer. Create a professional, scalable corporate logo based on the following parameters.",
  "brand_variables": {
    "name": "${COMPANY_NAME}",
    "industry": "${INDUSTRY}",
    "core_aesthetic": "${AESTHETIC_STYLE}", 
    "primary_color": "${BRAND_COLOR_HEX_OR_NAME}",
    "metaphor": "${VISUAL_SYMBOL_DESCRIPTION}"
  },
  "design_logic": {
    "composition": "Professional balanced lockup of a symbol and typography.",
    "typography": "High-fidelity rendering of '${COMPANY_NAME}'. Style: Bold, modern, sans-serif, optimized kerning.",
    "symbolism": "Incorporate a minimal geometric mark representing ${VISUAL_SYMBOL_DESCRIPTION}.",
    "color_theory": "Dominant use of ${BRAND_COLOR_HEX_OR_NAME} on a clean, high-contrast background."
  },
  "nano_banana_constraints": {
    "style_reference": "Swiss Graphic Design, Modern Corporate Minimalism",
    "technical_specs": [
      "Vector-style clarity",
      "No 3D effects or drop shadows",
      "Solid flat colors",
      "Maximum legibility at small scale"
    ],
    "negative_space": "Utilize intentional white space to enhance the ${AESTHETIC_STYLE} feel."
  },
  "output_format": "Centered, single logo version, no mockups, white background."
}
```

## Anwendung

**Thema: Senior Brand, Identity Designer** — Generiert beeindruckende KI-Bilder mit optimierten Beschreibungen. Kopiere den Prompt in ChatGPT (DALL-E), Midjourney oder andere Bild-KIs.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Aendere Farben, Stimmung oder Beleuchtung nach Wunsch
- Fuege "--ar 16:9" (Midjourney) oder Formatangaben hinzu
- Ersetze das Hauptmotiv durch dein eigenes Thema
- Kombiniere verschiedene Stile (z.B. "watercolor meets cyberpunk")

## Connections

- **Domain:** [[Design & Kreativitaet]]
- **Kategorie:** [[Bild & Visualisierung]]
- **Sammlung:** [[Prompt Sammlung]]
