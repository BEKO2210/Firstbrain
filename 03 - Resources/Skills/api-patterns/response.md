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
# Response Format Principles

> Consistency is key - choose a format and stick to it.

## Common Patterns

```
Choose one:
├── Envelope pattern ({ success, data, error })
├── Direct data (just return the resource)
└── HAL/JSON:API (hypermedia)
```

## Error Response

```
Include:
├── Error code (for programmatic handling)
├── User message (for display)
├── Details (for debugging, field-level errors)
├── Request ID (for support)
└── NOT internal details (security!)
```

## Pagination Types

| Type | Best For | Trade-offs |
|------|----------|------------|
| **Offset** | Simple, jumpable | Performance on large datasets |
| **Cursor** | Large datasets | Can't jump to page |
| **Keyset** | Performance critical | Requires sortable key |

### Selection Questions

1. How large is the dataset?
2. Do users need to jump to specific pages?
3. Is data frequently changing?

## Connections

- **Gehoert zu:** [[api-patterns]]
- **Pfad:** `response.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Software Architektur]]
