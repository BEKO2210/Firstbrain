---
type: referenz
created: 2026-04-11
parent-skill: "ddd-context-mapping"
domain: software-development
category: architecture
tags:
  - skill-referenz
  - software-development
  - architecture
---
# Context Mapping Patterns

## Common relationship patterns

- Partnership
- Shared Kernel
- Customer-Supplier
- Conformist
- Anti-Corruption Layer
- Open Host Service
- Published Language

## Mapping template

| Upstream context | Downstream context | Pattern | Contract owner | Translation needed |
| --- | --- | --- | --- | --- |
| Billing | Checkout | Customer-Supplier | Billing | Yes |
| Identity | Checkout | Conformist | Identity | No |

## ACL checklist

- Define canonical domain model for receiving context.
- Translate external terms into local ubiquitous language.
- Keep ACL code at boundary, not inside domain core.
- Add contract tests for mapped behavior.

## Connections

- **Gehoert zu:** [[ddd-context-mapping]]
- **Pfad:** `references/context-map-patterns.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Software Architektur]]
