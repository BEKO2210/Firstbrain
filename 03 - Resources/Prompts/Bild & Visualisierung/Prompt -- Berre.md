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
id: "#2330"
titel: "berre"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["berre", "reference", "face", "identity", "uploaded"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "cipeberre@gmail.com"
erstellt: "2026-03-09"
---

## Prompt

```
{
  "reference": {
    "face_identity": "${face_identity:uploaded reference image never change face and hair}",
    "identity_lock": true,
    "face_preservation": "100% identical facial structure, proportions, skin texture, eye shape, lips, nose, brows, moles, and natural expression"
  },
  "subjects": [
    {
      "type": "${subject1_type:young woman}",
      "role": "foreground subject",
      "expression": "soft confident smile",
      "gaze": "looking directly at the camera",
      "pose": {
        "position": "standing very close to the male subject",
        "interaction": "leaning slightly toward him in a casual selfie pose"
      },
      "hair": {
        "color": "dark brown",
        "style": "sleek high ponytail"
      },
      "makeup": {
        "style": "natural glam",
        "details": [
          "even glowing skin",
          "subtle contour",
          "soft blush",
          "defined brows",
          "natural pink lips"
        ]
      },
      "outfit": {
        "clothing": "black fitted short-sleeve top",
        "style": "sporty casual"
      }
    },
    {
      "type": "${subject2_type:Lionel Messi}",
      "role": "secondary subject",
      "expression": "relaxed smile",
      "gaze": "looking at the camera",
      "features": {
        "beard": "short, well-groomed full beard"
      },
      "hair": {
        "color": "brown",
        "style": "short, modern styled, slightly messy on top"
      },
      "outfit": {
        "clothing": "Inter Miami pink home football jersey",
        "details": [
          "Inter Miami heron logo visible on chest",
          "adidas logo visible",
          "sponsor logo visible",
          "athletic fit"
        ]
      }
    }
  ],
  "environment": {
    "location": "football stadium",
    "background_elements": [
      "large cheering crowd",
      "stadium seating filled with fans",
      "players and staff visible in the distance",
      "night sky with stadium floodlights"
    ]
  },
  "lighting": {
    "type": "stadium lighting",
    "characteristics": [
      "bright overhead lights",
      "even illumination on faces",
      "slight highlights on skin",
      "realistic night-time contrast"
    ]
  },
  "photography_style": {
    "style": "real-life selfie photography",
    "camera_look": "smartphone camera",
    "depth_of_field": "moderate depth of field with slightly blurred crowd",
    "mood": "excited, celebratory, candid"
  },
  "render_quality": {
    "realism": "ultra-photorealistic",
    "detail_level": "high",
    "Aspect Ratio": "4:5",
    "skin_texture": "natural and realistic",
    "resolution": "high resolution",
    "color_grading": "true-to-life colors with stadium vibrancy"
  }
}
```

## Anwendung

**Thema: Image Never, Change Face** — Ideal fuer Mode-Inspiration und Outfit-Planung. Die KI gibt dir personalisierte Styling-Tipps passend zu deinem Anlass.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Beschreibe deinen Koerpertyp und Stil-Vorlieben fuer bessere Tipps
- Nenne ein konkretes Event (Bewerbungsgespraech, Date, Hochzeit)
- Frage nach Budget-freundlichen Alternativen
- Bitte um Farb-Kombinationsvorschlaege

## Connections

- **Domain:** [[Design & Kreativitaet]]
- **Kategorie:** [[Bild & Visualisierung]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[makepad-reference|makepad-reference]]
  - [[reference-builder|reference-builder]]
  - [[hugging-face-cli|hugging-face-cli]]
