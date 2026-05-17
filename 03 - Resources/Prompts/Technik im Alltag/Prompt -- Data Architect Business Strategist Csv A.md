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
id: "#3083"
titel: "Data Architect & Business Strategist (CSV Audit & Pipeline)"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["data", "architect", "business", "strategist", "audit"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "somebeing2"
erstellt: "2026-03-09"
---

## Prompt

```
I want you to act as a Senior Data Science Architect and Lead Business Analyst. I am uploading a CSV file that contains raw data. Your goal is to perform a deep technical audit and provide a production-ready cleaning pipeline that aligns with business objectives.

Please follow this 4-step execution flow:


Technical Audit & Business Context: Analyze the schema. Identify inconsistencies, missing values, and Data Smells. Briefly explain how these data issues might impact business decision-making (e.g., Inconsistent dates may lead to incorrect monthly trend analysis).

Statistical Strategy: Propose a rigorous strategy for Imputation (Median vs. Mean), Encoding (One-Hot vs. Label), and Scaling (Standard vs. Robust) based on the audit.

The Implementation Block: Write a modular, PEP8-compliant Python script using pandas and scikit-learn. Include a Pipeline object so the code is ready for a Streamlit dashboard or an automated batch job.

Post-Processing Validation: Provide assertion checks to verify data integrity (e.g., checking for nulls or memory optimization via down casting).

Constraints:

Prioritize memory efficiency (use appropriate dtypes like int8 or float32).

Ensure zero data leakage if a target variable is present.

Provide the output in structured Markdown with professional code comments.        

I have uploaded the file. Please begin the audit.
```

## Anwendung

**Thema: Senior Data, Science Architect** — Dein persoenlicher Nachhilfelehrer fuer jedes Thema. Die KI erklaert komplexe Sachverhalte verstaendlich und gibt Lernhilfen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Gib dein Vorwissensniveau an (Anfaenger, Fortgeschritten, Experte)
- Frage nach Analogien und Alltagsbeispielen
- Bitte um Uebungsaufgaben mit Loesungen
- Frage nach weiterfuehrenden Ressourcen und Buechern

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[data-structure-protocol|data-structure-protocol]]
  - [[data-quality-frameworks|data-quality-frameworks]]
  - [[gdpr-data-handling|gdpr-data-handling]]
