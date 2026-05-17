---
type: skill-dokument
created: 2026-04-11
parent-skill: "avalonia-zafiro-development"
domain: software-development
category: frontend
tags:
  - skill-referenz
  - software-development
  - frontend
---
# Naming & Coding Standards

## General Standards

- **Explicit Names**: Favor clarity over cleverness.
- **Async Suffix**: Do **NOT** use the `Async` suffix in method names, even if they return `Task`.
- **Private Fields**: Do **NOT** use the `_` prefix for private fields.
- **Static State**: Avoid static state unless explicitly justified and documented.
- **Method Design**: Keep methods small, expressive, and with low cyclomatic complexity.

## Error Handling

- **Result & Maybe**: Use types from **CSharpFunctionalExtensions** for flow control and error handling.
- **Exceptions**: Reserved strictly for truly exceptional, unrecoverable situations.
- **Boundaries**: Never allow exceptions to leak across architectural boundaries.

## Connections

- **Gehoert zu:** [[avalonia-zafiro-development]]
- **Pfad:** `naming-standards.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Frontend Entwicklung]]
