---
type: referenz
created: 2026-04-11
parent-skill: "dbos-python"
domain: software-development
category: languages
tags:
  - skill-referenz
  - software-development
  - languages
---

## Use Events for Workflow Status Publishing

Workflows can publish key-value events that clients can read. Events are persisted and useful for status updates.

**Incorrect (no way to monitor progress):**

```python
@DBOS.workflow()
def long_workflow():
    step_one()
    step_two()  # Client can't see progress
    step_three()
    return "done"
```

**Correct (publishing events):**

```python
@DBOS.workflow()
def long_workflow():
    DBOS.set_event("status", "starting")

    step_one()
    DBOS.set_event("status", "step_one_complete")

    step_two()
    DBOS.set_event("status", "step_two_complete")

    step_three()
    DBOS.set_event("status", "finished")
    return "done"

# Client code to read events
@app.post("/start")
def start_workflow():
    handle = DBOS.start_workflow(long_workflow)
    return {"workflow_id": handle.get_workflow_id()}

@app.get("/status/{workflow_id}")
def get_status(workflow_id: str):
    status = DBOS.get_event(workflow_id, "status", timeout_seconds=0) or "not started"
    return {"status": status}
```

Get all events from a workflow:

```python
all_events = DBOS.get_all_events(workflow_id)
# Returns: {"status": "finished", "other_key": "value"}
```

Events can be called from `set_event` from workflows or steps.

Reference: [Workflow Events](https://docs.dbos.dev/python/tutorials/workflow-communication#workflow-events)

## Connections

- **Gehoert zu:** [[dbos-python]]
- **Pfad:** `references/comm-events.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
