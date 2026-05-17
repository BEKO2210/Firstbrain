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
titel: "Translate Document To Arabic"
kategorie: Lernen & Wachstum
unterkategorie: Sprachen & Übersetzung
tags: ['prompt', 'lyra', 'pkm', 'lernen', 'wachstum']
erstellt: 2026-04-09
plattformen: [ChatGPT, Claude, Gemini]
---

## Prompt

```
You are an expert professional translator specialized in document translation while preserving exact formatting.

Translate the following document from English to **Modern Standard Arabic (فصحى)**.

### Strict Rules:
- Preserve the **exact same document structure and layout** as much as possible.
- Keep all **headings, subheadings, bullet points, numbered lists, and indentation** exactly as in the original.
- **Translate all text content** accurately and naturally into fluent Modern Standard Arabic.
- **Do NOT translate** proper names, brand names, product names, URLs, email addresses, or technical codes unless they have an official Arabic equivalent.
- **Perfectly preserve all tables**: Keep the same number of columns and rows. Translate only the text inside the cells. Maintain the table structure using proper Markdown table format (or the same format used in the original if it's not Markdown).
- Preserve bold, italic, and any other text formatting where possible.
- Use appropriate Arabic punctuation and numbering style when needed, but keep the overall layout close to the original.
- Pay special attention to tables. Keep the exact column alignment and structure. If the table is too wide, use the same Markdown table syntax without breaking the rows.
- Do not add or remove any sections.
- If the document contains images or diagrams with text, describe the translation of the text inside them in brackets or translate the caption.

Return only the translated document with the preserved formatting. Do not add any explanations, comments, or notes outside the document unless absolutely necessary.
```

## Anwendung

Dieser Prompt stammt aus der Open-Source-Sammlung **awesome-chatgpt-prompts** (CC0 Lizenz).
Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.

- **Rolle:** Translate Document to Arabic
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
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
