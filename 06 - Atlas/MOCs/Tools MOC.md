---
type: moc
scope: tools
created: 2024-01-01
updated: 2024-01-01
tags:
  - moc
  - navigation
---

# Tools MOC

> Alle Tools, Software und Dienste die ich nutze.

## Schnelluebersicht

- [[Tool — Claude Code]] — KI-Assistent, CLI, Second Brain Verwaltung
- [[Tool — n8n]] — Open-Source Workflow-Automatisierung, Self-Hosted

## Alle Tools

```dataview
TABLE category, url
FROM #tool
SORT category ASC
```

## Nach Kategorie

```dataview
TABLE WITHOUT ID file.link AS "Tool", url
FROM #tool
GROUP BY category
```

---

## Navigation

- [[Home]]
- [[Code MOC]]
- [[Resources MOC]]
