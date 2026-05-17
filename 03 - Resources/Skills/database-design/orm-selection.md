---
type: skill-dokument
created: 2026-04-11
parent-skill: "database-design"
domain: software-development
category: database
tags:
  - skill-referenz
  - software-development
  - database
---
# ORM Selection (2025)

> Choose ORM based on deployment and DX needs.

## Decision Tree

```
What's the context?
│
├── Edge deployment / Bundle size matters
│   └── Drizzle (smallest, SQL-like)
│
├── Best DX / Schema-first
│   └── Prisma (migrations, studio)
│
├── Maximum control
│   └── Raw SQL with query builder
│
└── Python ecosystem
    └── SQLAlchemy 2.0 (async support)
```

## Comparison

| ORM | Best For | Trade-offs |
|-----|----------|------------|
| **Drizzle** | Edge, TypeScript | Newer, less examples |
| **Prisma** | DX, schema management | Heavier, not edge-ready |
| **Kysely** | Type-safe SQL builder | Manual migrations |
| **Raw SQL** | Complex queries, control | Manual type safety |

## Connections

- **Gehoert zu:** [[database-design]]
- **Pfad:** `orm-selection.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Datenbanken]]
