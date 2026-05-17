---
type: resource
created: 2026-04-08
updated: 2026-04-09
tags:
  - prompt
  - lernen
  - wachstum
  - lyra
  - pkm
  - lernmethoden
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: ""
titel: "Explain It Like I Built It Technical Doc"
kategorie: Lernen & Wachstum
unterkategorie: Lernmethoden
tags: ['prompt', 'lyra', 'pkm', 'lernen', 'wachstum']
erstellt: 2026-04-09
plattformen: [ChatGPT, Claude, Gemini]
-----------|------------------|-------------|---------------|

### 6. Environment & Configuration
Explain the setup without assuming technical knowledge:
- What environment variables exist and what each one controls (in plain language)
- How different environments work (development vs staging vs production)
- "If you need to change [X], you'd update [Y] — but be careful because [Z]"
- Any secrets/keys and which services they connect to (NOT the actual values)

### 7. Lessons Learned — The War Stories
This is the most valuable section. Document:

**Bugs & Fixes:**
- Major bugs encountered during development
- What caused them (explained simply)
- How they were fixed
- How to avoid similar issues in the future

**Pitfalls & Landmines:**
- Things that look simple but are secretly complicated
- "If you ever need to change [X], be careful because it also affects [Y] and [Z]"
- Known technical debt and why it exists

**Discoveries:**
- New technologies or techniques explored
- What worked well and what didn't
- "If I were starting over, I would..."

**Engineering Wisdom:**
- Best practices that emerged from this project
- Patterns that proved reliable
- How experienced engineers think about these problems

### 8. Quick Reference Card
A cheat sheet at the end:
- How to run the project locally (step by step, assume zero setup)
- Key URLs (production, staging, admin panels, dashboards)
- Who/where to go when something breaks
- Most commonly needed commands

## Writing Rules — NON-NEGOTIABLE

1. **No unexplained jargon.** Every technical term gets an immediate
   plain-language explanation or analogy on first use. You can use
   the technical term afterward, but the reader must understand it first.

2. **Use analogies aggressively.** Compare systems to restaurants,
   post offices, libraries, factories, orchestras — whatever makes
   the concept click. The analogy should be CONSISTENT within a section
   (don't switch from restaurant to hospital mid-explanation).

3. **Tell the story of WHY.** Don't just document what exists.
   Explain why decisions were made, what alternatives were considered,
   and what trade-offs were accepted. "We went with X because Y,
   even though it means we can't easily do Z later."

4. **Be engaging.** Use conversational tone, rhetorical questions,
   light humor where appropriate. This document should be something
   someone actually WANTS to read, not something they're forced to.
   If a section is boring, rewrite it until it isn't.

5. **Be honest about problems.** Flag technical debt, known issues,
   and "we did this because of time pressure" decisions. This document
   is more useful when it's truthful than when it's polished.

6. **Include "what could go wrong" for every major system.**
   Not to scare, but to prepare. "If the payment service goes down,
   here's what happens and here's what to do."

7. **Use progressive disclosure.** Start each section with the
   simple version, then go deeper. A reader should be able to stop
   at any point and still have a useful understanding.

8. **Format for scannability.** Use headers, bold key terms, short
   paragraphs, and bullet points for lists. But use prose (not bullets)
   for explanations and narratives.

## Example Tone

WRONG — dry and jargon-heavy:
"The application implements server-side rendering with incremental
static regeneration, utilizing Next.js App Router with React Server
Components for optimal TTFB."

RIGHT — clear and engaging:
"When someone visits our site, the server pre-builds the page before
sending it — like a restaurant that preps your meal before you arrive
instead of starting from scratch when you sit down. This is called
'server-side rendering' and it's why pages load fast. We use Next.js
App Router for this, which is like the kitchen's workflow system that
decides what gets prepped ahead and what gets cooked to order."

WRONG — listing without context:
"Dependencies: React 18, Next.js 14, Tailwind CSS, Supabase, Stripe"

RIGHT — explaining the team:
"Think of our tech stack as a crew, each member with a specialty:
- **React** is the set designer — it builds everything you see on screen
- **Next.js** is the stage manager — it orchestrates when and how things appear
- **Tailwind** is the costume department — it handles all the visual styling
- **Supabase** is the filing clerk — it stores and retrieves all our data
- **Stripe** is the cashier — it handles all money stuff securely"
```

## Anwendung

Dieser Prompt stammt aus der Open-Source-Sammlung **awesome-chatgpt-prompts** (CC0 Lizenz).
Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.

- **Rolle:** "Explain It Like I Built It"  Technical Documentation for Non-Technical Founders
- **Schwierigkeit:** Anfaenger — einfach kopieren und nutzen
- **Tipp:** Passe den Prompt an deine Beduerfnisse an, indem du spezifische Details hinzufuegst

## Variationen

- Aendere die Sprache: Fuege "Antworte auf Deutsch" am Ende hinzu
- Mache es spezifischer: Ersetze allgemeine Begriffe durch deine konkreten Details
- Kombiniere mit anderen Prompts: Nutze mehrere Rollen in einem Gespraech
- Erstelle eine Serie: Baue auf den Ergebnissen auf und verfeinere iterativ

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Lernen & Wachstum]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
