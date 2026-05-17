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

# Measuring DOM nodes in Remotion

Remotion applies a `scale()` transform to the video container, which affects values from `getBoundingClientRect()`. Use `useCurrentScale()` to get correct measurements.

## Measuring element dimensions

```tsx
import { useCurrentScale } from "remotion";
import { useRef, useEffect, useState } from "react";

export const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useCurrentScale();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDimensions({
      width: rect.width / scale,
      height: rect.height / scale,
    });
  }, [scale]);

  return <div ref={ref}>Content to measure</div>;
};
```

## Connections

- **Gehoert zu:** [[remotion-best-practices]]
- **Pfad:** `rules/measuring-dom-nodes.md`
- **Domain:** [[Design & Kreativitaet]]
- **Kategorie:** [[Video & Audio Produktion]]
