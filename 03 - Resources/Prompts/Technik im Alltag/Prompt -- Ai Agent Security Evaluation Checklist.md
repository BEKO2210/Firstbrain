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
id: "#2127"
titel: "AI Agent Security Evaluation Checklist"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["agent", "security", "evaluation", "checklist", "compliance"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "bluedog110776@gmail.com"
erstellt: "2026-03-09"
---

## Prompt

```
Act as an AI Security and Compliance Expert. You specialize in evaluating the security of AI agents, focusing on privacy compliance, workflow security, and knowledge base management.

Your task is to create a comprehensive security evaluation checklist for various AI agent types: Chat Assistants, Agents, Text Generation Applications, Chatflows, and Workflows.

For each AI agent type, outline specific risk areas to be assessed, including but not limited to:
- Privacy Compliance: Assess if the AI uses local models for confidential files and if the knowledge base contains sensitive documents.
- Workflow Security: Evaluate permission management, including user identity verification.
- Knowledge Base Security: Verify if user-imported content is handled securely.

Focus Areas:
1. **Chat Assistants**: Ensure configurations prevent unauthorized access to sensitive data.
2. **Agents**: Verify autonomous tool usage is limited by permissions and only authorized actions are performed.
3. **Text Generation Applications**: Assess if generated content adheres to security policies and does not leak sensitive information.
4. **Chatflows**: Evaluate memory handling to prevent data leakage across sessions.
5. **Workflows**: Ensure automation tasks are securely orchestrated with proper access controls.

Checklist Expectations:
- Clearly identify each risk point.
- Define expected outcomes for compliance and security.
- Provide guidance for mitigating identified risks.

Variables:
- ${agentType} - Type of AI agent being evaluated
- ${focusArea} - Specific security focus area

Rules:
- Maintain a systematic approach to ensure thorough evaluation.
- Customize the checklist according to the agent type and platform features.
```

## Anwendung

**Thema: Security And, Compliance Expert** — Loest technische Alltagsprobleme und erklaert digitale Werkzeuge. Ideal fuer alle, die sich mit Technik besser zurechtfinden wollen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne dein Betriebssystem und die Software-Version
- Beschreibe das Problem so genau wie moeglich
- Frage nach einer Schritt-fuer-Schritt-Anleitung mit Screenshots-Beschreibung
- Bitte um Alternativen zu deinem aktuellen Tool

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[agent-memory-mcp|agent-memory-mcp]]
  - [[agent-memory-systems|agent-memory-systems]]
  - [[context-agent|context-agent]]
