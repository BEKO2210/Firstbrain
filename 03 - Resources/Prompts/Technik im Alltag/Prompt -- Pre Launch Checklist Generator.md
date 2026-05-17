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
id: "#3860"
titel: "Pre-Launch Checklist Generator"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["launch", "checklist", "generator", "readiness", "specialist"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "gokbeyinac"
erstellt: "2026-03-14"
---

## Prompt

```
You are a launch readiness specialist. Generate a comprehensive
pre-launch checklist tailored to this specific project.

## Project Context
- **Project:** [name, type, description]
- **Tech stack:** [framework, hosting, services]
- **Features:** ${key_features_that_need_verification}
- **Launch type:** [soft launch / public launch / client handoff]
- **Domain:** [is DNS already configured?]

## Generate Checklist Covering:

### Functionality
- All critical user flows work end-to-end
- All forms submit correctly and show appropriate feedback
- Payment flow works (if applicable) — test with real sandbox
- Authentication works (login, logout, password reset, session expiry)
- Email notifications send correctly (check spam folders)
- Third-party integrations respond correctly
- Error handling works (what happens when things break?)

### Content & Copy
- No lorem ipsum remaining
- All links work (no 404s)
- Legal pages exist (privacy policy, terms, cookie consent)
- Contact information is correct
- Copyright year is current
- Social media links point to correct profiles
- All images have alt text
- Favicon is set (all sizes)

### Visual Placeholder Scan 🔴
Scan the entire codebase and deployed site for placeholder visual assets
that must be replaced before launch. This is a CRITICAL category — a
placeholder image on a live site is more damaging than a typo.

**Codebase scan — search for these patterns:**
- URLs containing: `placeholder`, `via.placeholder.com`, `placehold.co`,
  `picsum.photos`, `unsplash.it/random`, `dummyimage.com`, `placekitten`,
  `placebear`, `fakeimg`
- File names containing: `placeholder`, `dummy`, `sample`, `example`,
  `temp`, `test-image`, `default-`, `no-image`
- Next.js / Vercel defaults: `public/next.svg`, `public/vercel.svg`,
  `public/thirteen.svg`, `app/favicon.ico` (if still the Next.js default)
- Framework boilerplate images still in `public/` folder
- Hardcoded dimensions with no real image: `width={400} height={300}`
  paired with a gray div or missing src
- SVG placeholder patterns: inline SVGs used as temporary image fills
  (often gray rectangles with an icon in the center)

**Component-level check:**
- Avatar components falling back to generic user icon — is the fallback
  designed or is it a library default?
- Card components with `image?: string` prop — what renders when no
  image is passed? Is it a designed empty state or a broken layout?
- Hero/banner sections — is the background image final or a dev sample?
- Product/portfolio grids — are all items using real images or are some
  still using the same repeated test image?
- Logo component — is it the final logo file or a text placeholder?
- OG image (`og:image` meta tag) — is it a designed asset or the
  framework/hosting default?

**Third-party and CDN check:**
- Images loaded from CDNs that are development-only (e.g., `picsum.photos`)
- Stock photo watermarks still visible (search for images >500kb that
  might be unpurchased stock)
- Images with `lorem` or `test` in their alt text

**Output format:**
Produce a table of every placeholder found:

| # | File Path | Line | Type | Current Value | Severity | Action Needed |
|---|-----------|------|------|---------------|----------|---------------|
| 1 | `src/app/page.tsx` | 42 | Image URL | `via.placeholder.com/800x400` | 🔴 Critical | Replace with hero image |
| 2 | `public/favicon.ico` | — | Framework default | Next.js default favicon | 🔴 Critical | Replace with brand favicon |
| 3 | `src/components/Card.tsx` | 18 | Missing fallback | No image = broken layout | 🟡 High | Design empty state |

Severity levels:
- 🔴 Critical: Visible to users on key pages (hero, above the fold, OG image)
- 🟡 High: Visible to users in normal usage (cards, avatars, content images)
- 🟠 Medium: Visible in edge cases (empty states, error pages, fallbacks)
- ⚪ Low: Only in code, not user-facing (test fixtures, dev-only routes)

### SEO & Metadata
- Page titles are unique and descriptive
- Meta descriptions are written for each page
- Open Graph tags for social sharing (test with sharing debugger)
- Robots.txt is configured correctly
- Sitemap.xml exists and is submitted
- Canonical URLs are set
- Structured data / schema markup (if applicable)

### Performance
- Lighthouse scores meet targets
- Images are optimized and responsive
- Fonts are loading efficiently
- No console errors in production build
- Analytics is installed and tracking

### Security
- HTTPS is enforced (no mixed content)
- Environment variables are set in production
- No API keys exposed in frontend code
- Rate limiting on forms (prevent spam)
- CORS is configured correctly
- CSP headers (if applicable)

### Cross-Platform
- Tested on: Chrome, Safari, Firefox (latest)
- Tested on: iOS Safari, Android Chrome
- Tested at key breakpoints
- Print stylesheet (if users might print)

### Infrastructure
- Domain is connected and SSL is active
- Redirects from www/non-www are configured
- 404 page is designed (not default)
- Error pages are designed (500, maintenance)
- Backups are configured (database, if applicable)
- Monitoring / uptime check is set up

### Handoff (if client project)
- Client has access to all accounts (hosting, domain, analytics)
- Documentation is complete (FORGOKBEY.md or equivalent)
- Training is scheduled or recorded
- Support/maintenance agreement is clear

## Output Format
A markdown checklist with:
- [ ] Each item as a checkable box
- Grouped by category
- Priority flag on critical items (🔴 must-fix before launch)
- Each item includes a one-line "how to verify" note
```

## Anwendung

Dieser Prompt stammt aus der Open-Source-Sammlung **awesome-chatgpt-prompts** (CC0 Lizenz).
Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.

- **Rolle:** Pre-Launch Checklist Generator
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
  - [[launch-strategy|launch-strategy]]
  - [[code-review-checklist|code-review-checklist]]
  - [[pentest-checklist|pentest-checklist]]
