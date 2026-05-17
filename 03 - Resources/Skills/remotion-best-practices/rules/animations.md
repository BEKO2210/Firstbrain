---
type: regel
created: 2026-04-11
parent-skill: "remotion-best-practices"
domain: design-creative
category: video-audio
tags:
  - skill-referenz
  - design-creative
  - video-audio
---

All animations MUST be driven by the `useCurrentFrame()` hook.  
Write animations in seconds and multiply them by the `fps` value from `useVideoConfig()`.

```tsx
import { useCurrentFrame } from "remotion";

export const FadeIn = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: 'clamp',
  });
 
  return (
    <div style={{ opacity }}>Hello World!</div>
  );
};
```

CSS transitions or animations are FORBIDDEN - they will not render correctly.  
Tailwind animation class names are FORBIDDEN - they will not render correctly.

## Connections

- **Gehoert zu:** [[remotion-best-practices]]
- **Pfad:** `rules/animations.md`
- **Domain:** [[Design & Kreativitaet]]
- **Kategorie:** [[Video & Audio Produktion]]
