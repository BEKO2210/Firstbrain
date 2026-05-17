---
type: skill-dokument
created: 2026-04-11
parent-skill: "api-patterns"
domain: software-development
category: architecture
tags:
  - skill-referenz
  - software-development
  - architecture
---
# Versioning Strategies

> Plan for API evolution from day one.

## Decision Factors

| Strategy | Implementation | Trade-offs |
|----------|---------------|------------|
| **URI** | /v1/users | Clear, easy caching |
| **Header** | Accept-Version: 1 | Cleaner URLs, harder discovery |
| **Query** | ?version=1 | Easy to add, messy |
| **None** | Evolve carefully | Best for internal, risky for public |

## Versioning Philosophy

```
Consider:
├── Public API? → Version in URI
├── Internal only? → May not need versioning
├── GraphQL? → Typically no versions (evolve schema)
├── tRPC? → Types enforce compatibility
```

## Connections

- **Gehoert zu:** [[api-patterns]]
- **Pfad:** `versioning.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Software Architektur]]
