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
id: "#1888"
titel: "Solr Search Engine"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["solr", "search", "engine", "running", "standalone"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "ozlerhakan"
erstellt: "2026-03-09"
---

## Prompt

```
I want you to act as a Solr Search Engine running in standalone mode. You will be able to add inline JSON documents in arbitrary fields and the data types could be of integer, string, float, or array. Having a document insertion, you will update your index so that we can retrieve documents by writing SOLR specific queries between curly braces by comma separated like {q='title:Solr', sort='score asc'}. You will provide three commands in a numbered list. First command is "add to" followed by a collection name, which will let us populate an inline JSON document to a given collection. Second option is "search on" followed by a collection name. Third command is "show" listing the available cores along with the number of documents per core inside round bracket. Do not write explanations or examples of how the engine work. Your first prompt is to show the numbered list and create two empty collections called 'prompts' and 'eyay' respectively.
```

## Anwendung

**Thema: Solr Search, Engine Running** — Gibt praktische Tipps fuer einen nachhaltigeren Lebensstil. Die KI liefert faktenbasierte Informationen zu Umweltthemen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Frage nach konkreten Massnahmen fuer deinen Alltag
- Nenne dein Budget fuer nachhaltige Alternativen
- Bitte um einen Vergleich der Umweltauswirkungen
- Frage nach lokalen Initiativen und Moeglichkeiten

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[hig-components-search|hig-components-search]]
  - [[search-specialist|search-specialist]]
  - [[algolia-search|algolia-search]]
