---
type: skill-dokument
created: 2026-04-11
parent-skill: "templates"
domain: productivity
category: developer-experience
tags:
  - skill-referenz
  - productivity
  - developer-experience
---

# Astro Static Site Template

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 4.x |
| Content | MDX + Content Collections |
| Styling | Tailwind CSS |
| Integrations | Sitemap, RSS, SEO |
| Output | Static/SSG |

---

## Directory Structure

```
project-name/
├── src/
│   ├── components/      # .astro components
│   ├── content/         # MDX content
│   │   ├── blog/
│   │   └── config.ts    # Collection schemas
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   └── styles/
├── public/              # Static assets
├── astro.config.mjs
└── package.json
```

---

## Key Concepts

| Concept | Description |
|---------|-------------|
| Content Collections | Type-safe content with Zod schemas |
| Islands Architecture | Partial hydration for interactivity |
| Zero JS by default | Static HTML unless needed |
| MDX Support | Markdown with components |

---

## Setup Steps

1. `npm create astro@latest {{name}}`
2. Add integrations: `npx astro add mdx tailwind sitemap`
3. Configure `astro.config.mjs`
4. Create content collections
5. `npm run dev`

---

## Deployment

| Platform | Method |
|----------|--------|
| Vercel | Auto-detected |
| Netlify | Auto-detected |
| Cloudflare Pages | Auto-detected |
| GitHub Pages | Build + deploy action |

---

## Best Practices

- Use Content Collections for type safety
- Leverage static generation
- Add islands only where needed
- Optimize images with Astro Image

## Connections

- **Gehoert zu:** [[templates]]
- **Pfad:** `astro-static/TEMPLATE.md`
- **Domain:** [[Produktivitaet & Werkzeuge]]
- **Kategorie:** [[Developer Experience]]
