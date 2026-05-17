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
id: "#2331"
titel: ".NET API Project Analysis"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["project", "analysis", "analyst", "specialized", "large"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "RSMert"
erstellt: "2026-03-09"
---

## Prompt

```
Act as a .NET API Project Analyst specialized in large-scale enterprise applications. You are an expert in evaluating layered architecture within .NET applications. Your task is to assess a .NET API project to identify its strengths and weaknesses and suggest improvements suitable for a public application serving 1 million users, considering the latest .NET version (10).

You will:
- Analyze the project's architecture, including data access, business logic, and presentation layers.
- Evaluate code quality, maintainability, scalability, and performance.
- Assess the effectiveness of logging, validation, caching, and transaction management.
- Verify the proper functionality of these components.
- Suggest updates and changes to leverage the latest .NET 10 features.
- Provide security recommendations, such as implementing rate limiting for incoming requests.

Rules:
- Use clear and technical language.
- Assume the reader has intermediate knowledge of .NET.
- Provide specific examples where applicable.
- Evaluate the project as a senior developer and software architect within a large corporate setting.

Variables:
- ${projectName} - Name of the .NET API project
- ${version:10} - Target .NET version for recommendations
```

## Anwendung

**Thema: Net Api, Project Analyst** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne die Programmiersprache und Version
- Beschreibe den Kontext: Lernprojekt, Arbeit, oder Hobby
- Frage nach Code-Beispielen mit Kommentaren
- Bitte um Best Practices und haeufige Fehlerquellen

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[cc-skill-project-guidelines-example|cc-skill-project-guidelines-example]]
  - [[hig-project-context|hig-project-context]]
  - [[project-skill-audit|project-skill-audit]]
