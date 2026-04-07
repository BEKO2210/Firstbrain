---
updated: 2026-04-07
---

# Project Context

Detailed per-project state, decisions, and context. Updated when projects change status.

## Universal AI Clothing Kit

- **Status:** active | **Priority:** high
- **GitHub:** BEKO2210/Universal-AI-Clothing-Kit
- **Area:** [[Softwareentwicklung]], [[KI und Machine Learning]]
- **Team:** [[Person -- Alex Chen]] (Backend), [[Person -- Sarah Mueller]] (UX)
- **Tech Stack:** Flask, HTML/CSS/JS, Ollama, LM Studio, Claude API
- **Key Decision:** [[Decision -- Provider-Failover-Strategie]] (pending, deadline 2026-04-13)
- **Next Actions:**
  - Alex: Provider-Abstraktion implementieren (bis 2026-04-13)
  - Sarah: Wireframes liefern (bis 2026-04-14)
  - Ich: Frontend-Mockups + Docker-Setup (bis 2026-04-12)
- **Blockers:** Failover-Strategie muss entschieden werden bevor Backend-Architektur finalisiert
- **Notes:** MVP fokussiert auf 3 Provider (Claude, Ollama, LM Studio). Gemini/Kimi ab v0.3.

## Firstbrain Vault

- **Status:** active | **Priority:** high
- **GitHub:** BEKO2210/Firstbrain
- **Area:** [[Softwareentwicklung]]
- **Current Version:** v1.2 (Command Processor shipped)
- **Next Actions:**
  - README SVGs reparieren (skills.svg Cache-Issue)
  - Vault-Stresstest abschließen (2 Tage Simulation)
  - v2.0 Features planen (Knowledge Graph, Connection Intelligence)
- **Blockers:** Keine
- **Notes:** 12 Skills, 12 Templates, 9 MOCs, 4-Layer Memory. Zero-dependency core.
