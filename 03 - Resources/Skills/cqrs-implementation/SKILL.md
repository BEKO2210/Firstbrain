---
name: "cqrs-implementation"
description: "Implement Command Query Responsibility Segregation for scalable architectures. Use when separating read and write models, optimizing query performance, or building event-sourced systems."
type: skill
created: 2026-02-27
domain: software-development
category: architecture
risk: unknown
source: community
tags:
  - skill
  - software-development
  - architecture
  - cqrs
  - implementation
---

# CQRS Implementation

Comprehensive guide to implementing CQRS (Command Query Responsibility Segregation) patterns.

## Use this skill when

- Separating read and write concerns
- Scaling reads independently from writes
- Building event-sourced systems
- Optimizing complex query scenarios
- Different read/write data models are needed
- High-performance reporting is required

## Do not use this skill when

- The domain is simple and CRUD is sufficient
- You cannot operate separate read/write models
- Strong immediate consistency is required everywhere

## Instructions

- Identify read/write workloads and consistency needs.
- Define command and query models with clear boundaries.
- Implement read model projections and synchronization.
- Validate performance, recovery, and failure modes.
- If detailed patterns are required, open `resources/implementation-playbook.md`.

## Resources

- `resources/implementation-playbook.md` for detailed CQRS patterns and templates.

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Software Architektur]]
- **Navigation:** [[Skills Uebersicht]], [[Home]]
