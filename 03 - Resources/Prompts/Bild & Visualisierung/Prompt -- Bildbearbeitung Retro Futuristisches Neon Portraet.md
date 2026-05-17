---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags: []
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: '#086'
titel: Retro-Futuristisches Neon-Porträt
kategorie: Bild & Visualisierung
unterkategorie: KI-Bildgenerierung
tags:
- retro
- futurismus
- neon
- portrait
- synthwave
- cyberpunk
- prompt
- bild
- visualisierung
- ki-bildgenerierung
erstellt: 2026-02-22
plattformen:
- Midjourney
- DALL-E
- Stable Diffusion
---

## Prompt

**Rolle:** Du bist ein KI-Bildgenerierungs-Experte mit Spezialisierung auf stilistische Porträts. Du verstehst die technischen Parameter und ästhetischen Nuancen verschiedener KI-Tools.

**Kontext:** Ich möchte ein Porträt im Stil von [PERSON/BESCHREIBUNG, z.B. mich selbst / eine fiktive Figur / ein bestimmtes Gesicht] erstellen. Der gewünschte Stil ist retro-futuristisch mit Neon-Elementen – eine Mischung aus 80er-Jahre-Ästhetik und futuristischer Technologie. Das Bild soll [STIMMUNG, z.B. düster und mysteriös / hell und optimistisch / cool und distanziert] wirken. Es wird genutzt für [VERWENDUNG, z.B. Social Media Profilbild / persönliches Kunstprojekt / Buchcover / Album-Artwork].

**Aufgabe:** Erstelle einen optimierten Prompt für KI-Bildgenerierung, der:
1. Den retro-futuristischen Neon-Stil präzise beschreibt
2. Technische Parameter für beste Ergebnisse empfiehlt
3. Variationen für unterschiedliche Tools bietet
4. Nachbearbeitungstipps gibt

**Einschränkungen:**
- Prompt muss für gängige KI-Tools optimiert sein
- Stil soll einzigartig und wiedererkennbar sein
- Technische Begriffe korrekt verwenden
- Keine urheberrechtlich geschützten Elemente

**Ausgabe:**
1. **Haupt-Prompt** – Der komplette Prompt zum Kopieren
2. **Stil-Elemente** – Was macht den Look aus?
3. **Technische Parameter** – Einstellungen pro Tool
4. **Variationen** – Alternative Stilrichtungen
5. **Nachbearbeitung** – Upscalen, Editieren, Verfeinern

---

## Beispiel

**Input:**
- Person: Junge Frau, 30er Jahre, dunkle Haare, bestimmter Blick
- Stil: Retro-futuristisch, Neon, Synthwave
- Stimmung: Cool, mysteriös, selbstbewusst
- Verwendung: Social Media Profilbild

**Output:**

### Haupt-Prompt

**Für Midjourney:**
```
Portrait of a confident woman in her 30s, dark hair, intense gaze, retro-futuristic synthwave aesthetic, neon pink and cyan lighting, 1980s sci-fi movie still, vaporwave atmosphere, geometric grid background fading into digital horizon, chrome and glass reflections, holographic elements, sunset gradient sky with palm silhouettes, cinematic composition, dramatic side lighting, film grain, Kodak Vision3 500T, anamorphic lens flare, octane render, highly detailed, 8k resolution --ar 1:1 --stylize 250 --v 6
```

**Für DALL-E 3:**
```
A striking portrait of a confident woman in her 30s with dark hair and an intense, mysterious gaze. The image is styled in retro-futuristic synthwave aesthetic with vibrant neon pink and cyan lighting. The background features a geometric grid fading into a digital horizon with holographic elements. Include chrome reflections and a sunset gradient sky with subtle palm tree silhouettes. The mood is cool and cinematic, like a frame from a 1980s science fiction movie. Film grain texture, dramatic side lighting, vaporwave atmosphere.
```

**Für Stable Diffusion:**
```
retro futuristic portrait, woman, dark hair, confident expression, synthwave, neon pink cyan lighting, 1980s sci-fi aesthetic, geometric grid background, holographic elements, chrome reflections, sunset gradient, palm silhouettes, cinematic lighting, film grain, Kodak Vision3, anamorphic flare, detailed, 8k
Negative prompt: blurry, low quality, modern clothing, bright daylight, cartoon, anime
Steps: 30, CFG: 7, Sampler: DPM++ 2M Karras
```

### Stil-Elemente

**Farbpalette:**
- Primär: Neon-Pink (#FF00FF), Cyan (#00FFFF)
- Sekundär: Lila (#9900FF), Orange-Gradient (#FF6600)
- Akzente: Schwarz, Chrom-Silber

**Visuelle Merkmale:**
- Gitter-Horizont (perspektivische Linien)
- Sonnenuntergang mit Farbverlauf
- Palmen-Silhouetten (optional)
- Holografische Überlagerungen
- Chrom- und Glasreflexionen
- Scanlines oder Filmkorn

**Beleuchtung:**
- Dramatisches Seitenlicht
- Neon-Randbeleuchtung (Rim Light)
- Mehrfach-Schatten in verschiedenen Farben
- Lens Flare (dezent)

### Technische Parameter

**Midjourney:**
- `--ar 1:1` (für Profilbild)
- `--stylize 250` (künstlerischer Balance)
- `--v 6` (aktuellste Version)
- `--chaos 20` (für Variationen)

**DALL-E 3:**
- Format: Quadratisch (1024x1024)
- Style: Vivid (für Neon-Farben)
- Quality: HD

**Stable Diffusion:**
- Checkpoint: RealisticVision oder JuggernautXL
- LoRA: synthwavevibe oder retro aesthetic
- ControlNet: Für Gesichtskonsistenz bei mehreren Bildern

### Variationen

**Variation 1: Cyberpunk-Dystopie (dunkler, grittier)**
```
... rain-slicked streets, neon signs in Japanese characters, steam rising from vents, leather jacket with LED details, dystopian cityscape, blade runner aesthetic, moody atmosphere, high contrast, chiaroscuro lighting...
```

**Variation 2: Optimistisches Retro-Future (heller, utopisch)**
```
... bright chrome environment, clean geometric shapes, pastel neon accents, flying cars in background, optimistic expression, white and silver color scheme, space age architecture, utopian vision, 1960s retro-futurism meets 1980s...
```

**Variation 3: Vaporwave-Ästhetik (traumhafter, surreal)**
```
... marble statues, classical columns, glitch effects, Windows 95 aesthetics, Japanese text floating, purple and pink gradients, nostalgic atmosphere, surreal composition, dreamlike quality, distorted perspective...
```

**Variation 4: Industrial-Tech (mechanischer, kälter)**
```
... exposed circuitry, mechanical implants, industrial background, steel and concrete, blue and orange lighting, tech-wear fashion, HUD elements overlay, futuristic interface, cold atmosphere, cybernetic enhancements...
```

### Nachbearbeitung

**Upscalen:**
- Topaz Gigapixel AI (für Details)
- Upscayl (kostenlose Alternative)
- Midjourney Upscale (built-in)

**Editieren:**
- Photoshop: Farbkorrektur für Neon-Intensität
- Lens Distortion hinzufügen
- Film Grain Overlay
- Chromatic Aberration (dezent)

**Optimierung für Social Media:**
- Instagram: 1080x1080 oder 1080x1350
- Twitter/X: 1200x675
- LinkedIn: 1200x1200
- Kompression beachten (Neon-Farben leiden unter starker Kompression)

**Animation (optional):**
- Leuchtende Neon-Elemente pulsieren lassen
- Hintergrund-Grid bewegen
- Tools: After Effects, CapCut, oder LeiaPix

---

## Tipps für beste Ergebnisse

1. **Gesichts-Referenz:** Bei echten Personen – Gesichtsbeschreibung detailliert (Augenfarbe, Gesichtsform, markante Merkmale)

2. **Mehrere Iterationen:** Erste Ergebnisse sind selten perfekt – Variationen generieren und beste Elemente kombinieren

3. **Inpainting nutzen:** Für Details (Augen, Hände) gezielt nachbessern

4. **Konsistenz:** Für eine Serie ähnlicher Bilder – Seed behalten oder ControlNet verwenden

5. **Rechtliches:** Bei kommerzieller Nutzung – KI-Generierungs-Nutzungsrechte prüfen

## Connections

- **Domain:** [[Design & Kreativitaet]]
- **Kategorie:** [[Bild & Visualisierung]]
- **Sammlung:** [[Prompt Sammlung]]
