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

> All tools, software, and services you use.

## Document New Tool

> Click on [[New Tool]], then **Ctrl+Shift+T** and select the `Tool` template.

## All Tools

```dataview
TABLE category, url
FROM #tool
SORT category ASC
```

## By Category

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
