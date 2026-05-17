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

# Charts in Remotion

You can create bar charts in Remotion by using regular React code - HTML and SVG is allowed, as well as D3.js.

## No animations not powered by `useCurrentFrame()`

Disable all animations by third party libraries.  
They will cause flickering during rendering.  
Instead, drive all animations from `useCurrentFrame()`.

## Bar Chart Animations

See Bar Chart Example for a basic example implmentation.

### Staggered Bars

You can animate the height of the bars and stagger them like this:

```tsx
const STAGGER_DELAY = 5;
const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const bars = data.map((item, i) => {
  const delay = i * STAGGER_DELAY;
  const height = spring({
    frame,
    fps,
    delay,
    config: {damping: 200},
  });
  return <div style={{height: height * item.value}} />;
});
```

## Pie Chart Animation

Animate segments using stroke-dashoffset, starting from 12 o'clock.

```tsx
const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const progress = interpolate(frame, [0, 100], [0, 1]);

const circumference = 2 * Math.PI * radius;
const segmentLength = (value / total) * circumference;
const offset = interpolate(progress, [0, 1], [segmentLength, 0]);

<circle r={radius} cx={center} cy={center} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={`${segmentLength} ${circumference}`} strokeDashoffset={offset} transform={`rotate(-90 ${center} ${center})`} />;
```

## Connections

- **Gehoert zu:** [[remotion-best-practices]]
- **Pfad:** `rules/charts.md`
- **Domain:** [[Design & Kreativitaet]]
- **Kategorie:** [[Video & Audio Produktion]]
