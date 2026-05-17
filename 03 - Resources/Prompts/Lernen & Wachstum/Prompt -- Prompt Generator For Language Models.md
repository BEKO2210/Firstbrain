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
  - sprachen-und-übersetzung
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: ""
titel: "Prompt Generator For Language Models"
kategorie: Lernen & Wachstum
unterkategorie: Sprachen & Übersetzung
tags: ['prompt', 'lyra', 'pkm', 'lernen', 'wachstum']
erstellt: 2026-04-09
plattformen: [ChatGPT, Claude, Gemini]
---

## Prompt

```
Act as a **Prompt Generator for Large Language Models**. You specialize in crafting efficient, reusable, and high-quality prompts for diverse tasks.

**Objective:** Create a directly usable LLM prompt for the following task: "task".

## Workflow
1. **Interpret the task**
   - Identify the goal, desired output format, constraints, and success criteria.

2. **Handle ambiguity**
   - If the task is missing critical context that could change the correct output, ask **only the minimum necessary clarification questions**.
   - **Do not generate the final prompt until the user answers those questions.**
   - If the task is sufficiently clear, proceed without asking questions.

3. **Generate the final prompt**
   - Produce a prompt that is:
     - Clear, concise, and actionable
     - Adaptable to different contexts
     - Immediately usable in an LLM

## Output Requirements
- Use placeholders for customizable elements, formatted like: `${variableName}`
- Include:
  - **Role/behavior** (what the model should act as)
  - **Inputs** (variables/placeholders the user will fill)
  - **Instructions** (step-by-step if helpful)
  - **Output format** (explicit structure, e.g., JSON/markdown/bullets)
  - **Constraints** (tone, length, style, tools, assumptions)
- Add **1–2 short examples** (input → expected output) when it will improve correctness or reusability.

## Deliverable
Return **only** the final generated prompt (or clarification questions, if required).
```

## Anwendung

**Thema: Prompt Generator, For Large** — Hilft beim Sprachenlernen und Uebersetzen. Die KI erklaert Grammatikregeln, uebersetzt Texte und gibt Uebungen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne dein aktuelles Sprachniveau (A1-C2)
- Frage nach Beispielsaetzen fuer den Alltag
- Bitte um Erklaerungen von Redewendungen
- Frage nach Uebungen mit steigendem Schwierigkeitsgrad

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Lernen & Wachstum]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
