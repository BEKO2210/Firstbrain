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
# Indexing Principles

> When and how to create indexes effectively.

## When to Create Indexes

```
Index these:
├── Columns in WHERE clauses
├── Columns in JOIN conditions
├── Columns in ORDER BY
├── Foreign key columns
└── Unique constraints

Don't over-index:
├── Write-heavy tables (slower inserts)
├── Low-cardinality columns
├── Columns rarely queried
```

## Index Type Selection

| Type | Use For |
|------|---------|
| **B-tree** | General purpose, equality & range |
| **Hash** | Equality only, faster |
| **GIN** | JSONB, arrays, full-text |
| **GiST** | Geometric, range types |
| **HNSW/IVFFlat** | Vector similarity (pgvector) |

## Composite Index Principles

```
Order matters for composite indexes:
├── Equality columns first
├── Range columns last
├── Most selective first
└── Match query pattern
```

## Connections

- **Gehoert zu:** [[database-design]]
- **Pfad:** `indexing.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Datenbanken]]
