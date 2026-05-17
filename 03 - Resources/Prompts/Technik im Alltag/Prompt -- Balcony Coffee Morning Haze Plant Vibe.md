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
id: "#2438"
titel: "Balcony Coffee (morning haze, plant vibe)"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["balcony", "coffee", "morning", "haze", "plant"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "dorukkurtoglu@gmail.com"
erstellt: "2026-03-09"
---

## Prompt

```
{
  "category": "BALCONY_COFFEE_PLANTS",
  "identity_lock": {
    "enabled": true,
    "priority": "ABSOLUTE_MAX",
    "instruction": "Preserve exact identity from reference. Adult 21+ only. No beautification or face changes."
  },
  "subject": {
    "demographics": "Adult woman, 21-29 (match reference identity).",
    "hair": {
      "color": "Match reference.",
      "style": "Loose waves or messy bun with tendrils",
      "texture": "Real strands, flyaways, realistic volume",
      "movement": "Natural, slight breeze lift"
    },
    "face": {
      "eyes": "Exact reference eyes; soft morning catchlights",
      "skin_details": "Natural texture, pores visible, gentle morning glow",
      "micro_details": "Keep reference marks"
    },
    "clothing": {
      "outfit": "Cozy cardigan + simple top (no logos/text)",
      "fabric": "Knit texture visible, slight pilling allowed"
    },
    "accessories": {
      "jewelry": ["Small silver hoops"],
      "props": ["Ceramic mug (unbranded)"]
    }
  },
  "pose": {
    "type": "Lifestyle candid",
    "orientation": "Half-body seated on balcony chair",
    "head_position": "Slight tilt, chin relaxed",
    "hands": "Both hands around mug for warmth (hands correct)",
    "gaze": "Near-direct eye contact",
    "expression": "Soft smile, relaxed"
  },
  "setting": {
    "environment": "Balcony with potted plants",
    "background_elements": [
      "Plant leaves in foreground bokeh",
      "Soft city background blur (no readable signs)",
      "Morning haze, gentle atmosphere"
    ],
    "depth": "Foreground leaves blurred; face sharp; background soft"
  },
  "camera": {
    "shot_type": "Half-body portrait",
    "angle": "Slightly above eye level",
    "focal_length_equivalent": "26mm phone OR 50mm pro",
    "framing": "4:5, off-center composition",
    "focus": "Eyes sharp; mug slightly softer"
  },
  "lighting": {
    "source": "Soft morning daylight",
    "direction": "Front/side diffuse",
    "highlights": "Natural highlights on eyes and lips",
    "shadows": "Gentle under-chin shadow"
  },
  "mood_and_expression": {
    "tone": "Cozy, relatable, calm",
    "atmosphere": "Tactile morning quiet"
  },
  "style_and_realism": {
    "style": "Photoreal IG lifestyle",
    "imperfections": "Mild grain, slightly imperfect framing"
  },
  "technical_details": {
    "aspect_ratio": "4:5",
    "resolution": "High",
    "noise": "Mild",
    "mode_variants": {
      "amateur": "Handheld iPhone-candid tilt, slight noise, imperfect composition",
      "pro": "Cleaner exposure, crisp micro-contrast, shallow DOF"
    }
  },
  "constraints": {
    "adult_only": true,
    "single_subject_only": true,
    "no_text": true,
    "no_logos": true,
    "no_watermarks": true
  },
  "negative_prompt": [
    "identity drift", "face morphing",
    "cgi plants", "plastic skin",
    "extra fingers", "warped mug",
    "readable text", "logos", "watermark"
  ]
}
```

## Anwendung

**Thema: Preserve Exact, Face Changes** — Ideal fuer Mode-Inspiration und Outfit-Planung. Die KI gibt dir personalisierte Styling-Tipps passend zu deinem Anlass.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Beschreibe deinen Koerpertyp und Stil-Vorlieben fuer bessere Tipps
- Nenne ein konkretes Event (Bewerbungsgespraech, Date, Hochzeit)
- Frage nach Budget-freundlichen Alternativen
- Bitte um Farb-Kombinationsvorschlaege

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
