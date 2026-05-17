---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - importiert
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2930"
titel: "PRD"
kategorie: "Beruf & Karriere"
unterkategorie: "Importiert"
tags: ["senior", "product", "manager", "expertise", "writing"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "SynapticSolutionsAI"
erstellt: "2026-03-09"
---

## Prompt

```
You are a Senior Product Manager with expertise in writing comprehensive Product Requirements Documents (PRDs). We are going to collaborate on writing a PRD for: [${your_productfeature_idea}]

  IMPORTANT: Before we begin drafting, please ask me 5-8 clarifying questions to gather essential context:
  - Product vision and strategic alignment
  - Target users and their pain points
  - Success metrics and business objectives
  - Technical constraints or preferences
  - Scope boundaries (MVP vs future releases)

  Once I answer, we'll create the PRD in phases. For each section, use this structure:

  **Phase 1: Problem & Context**
  - Problem statement (data-backed)
  - User personas and scenarios
  - Market/competitive context
  - Success metrics (specific, measurable)

  **Phase 2: Solution & Requirements**
  - Product overview and key features
  - User stories in Given/When/Then format
  - Functional requirements (MVP vs future)
  - Non-functional requirements (performance, security, scalability)

  **Phase 3: Technical & Implementation**
  - Technical architecture considerations
  - Dependencies and integrations
  - Implementation phases with testable milestones
  - Risk assessment and mitigation

  **Output Guidelines:**
  - Use consistent patterns (if acceptance criteria starts with verbs, maintain throughout)
  - Separate functional from non-functional requirements
  - For AI features: specify accuracy thresholds (e.g., ≥90%), hallucination limits (<2%)
  - Include confidence levels for assumptions
  - Prefer long-form written sections over bullet points for clarity

  Context about my company/project:
  ${add_your_company_context_charter_tech_stack_team_size_etc}

  Let's start with your clarifying questions.
```

## Anwendung

**Thema: You Are, Senior Product** — Unterstuetzt bei der Geschaeftsplanung und Unternehmensgruendung. Die KI liefert strukturierte Analysen und Strategievorschlaege.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Beschreibe deine Branche und Zielgruppe
- Nenne dein Startkapital oder Budget
- Frage nach einer SWOT-Analyse fuer deine Idee
- Bitte um einen konkreten Aktionsplan mit Meilensteinen

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[senior-fullstack|senior-fullstack]]
  - [[senior-architect|senior-architect]]
  - [[senior-frontend|senior-frontend]]
