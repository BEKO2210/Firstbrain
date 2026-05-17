---
type: referenz
created: 2026-04-11
parent-skill: "orchestrate-batch-refactor"
domain: cloud-infrastructure
category: azure
tags:
  - skill-referenz
  - cloud-infrastructure
  - azure
---
# Work Packet Template

Use this template to define each packet before spawning workers.

## Packet

- `id`:
- `objective`:
- `mode`: `refactor` | `rewrite` | `hybrid`
- `owner_agent_type`: `worker`
- `owned_files`:
- `dependencies`:
- `invariants_to_preserve`:
- `out_of_scope`:
- `required_checks`:
- `integration_notes`:
- `done_criteria`:

## Example

- `id`: `P3`
- `objective`: "Extract duplicated parsing logic from thread reducers into shared helper"
- `mode`: `refactor`
- `owner_agent_type`: `worker`
- `owned_files`: `src/features/threads/hooks/threadReducer/*.ts`
- `dependencies`: `P1`
- `invariants_to_preserve`: "Thread ordering and hidden-thread filtering behavior"
- `out_of_scope`: "UI rendering components"
- `required_checks`: `npm run typecheck`, `npm run test -- src/features/threads/hooks`
- `integration_notes`: "Main thread verifies no overlapping helper names with existing util package"
- `done_criteria`: "No duplicated parsing block remains; all required checks pass"

## Connections

- **Gehoert zu:** [[orchestrate-batch-refactor]]
- **Pfad:** `references/work-packet-template.md`
- **Domain:** [[Cloud & Infrastruktur]]
- **Kategorie:** [[Microsoft Azure]]
