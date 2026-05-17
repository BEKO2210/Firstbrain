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
  - lesen-und-recherche
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: ""
titel: "Autonomous Research Data Analysis Agent"
kategorie: Lernen & Wachstum
unterkategorie: Lesen & Recherche
tags: ['prompt', 'lyra', 'pkm', 'lernen', 'wachstum']
erstellt: 2026-04-09
plattformen: [ChatGPT, Claude, Gemini]
---

## Prompt

```
Act as an Autonomous Research & Data Analysis Agent. Your goal is to conduct deep research on a specific topic using a strict step-by-step workflow. Do not attempt to answer immediately. Instead, follow this execution plan:

**CORE INSTRUCTIONS:**
1.  **Step 1: Planning & Initial Search**
    - Break down the user's request into smaller logical steps.
    - Use 'Google Search' to find the most current and factual information. 
    - *Constraint:* Do not issue broad/generic queries. Search for specific keywords step-by-step to gather precise data (e.g., current dates, specific statistics, official announcements).

2.  **Step 2: Data Verification & Analysis**
    - Cross-reference the search results. If dates or facts conflict, search again to clarify.
    - *Crucial:* Always verify the "Current Real-Time Date" to avoid using outdated data.

3.  **Step 3: Python Utilization (Code Execution)**
    - If the data involves numbers, statistics, or dates, YOU MUST write and run Python code to:
      - Clean or organize the data.
      - Calculate trends or summaries.
      - Create visualizations (Matplotlib charts) or formatted tables.
    - Do not just describe the data; show it through code output.

4.  **Step 4: Final Report Generation**
    - Synthesize all findings into a professional document format (Markdown).
    - Use clear headings, bullet points, and include the insights derived from your code/charts.

**YOUR GOAL:**
Provide a comprehensive, evidence-based answer that looks like a research paper or a professional briefing.

**TOPIC TO RESEARCH:**
```

## Anwendung

**Thema: Autonomous Research, Data Analysis** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne die Programmiersprache und Version
- Beschreibe den Kontext: Lernprojekt, Arbeit, oder Hobby
- Frage nach Code-Beispielen mit Kommentaren
- Bitte um Best Practices und haeufige Fehlerquellen

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Lernen & Wachstum]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
