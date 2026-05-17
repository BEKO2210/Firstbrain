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

## Deduplicate Queued Workflows

Use deduplication IDs to ensure only one workflow with a given ID is active in a queue at a time.

**Incorrect (duplicate workflows possible):**

```python
queue = Queue("user_tasks")

@app.post("/process/{user_id}")
def process_for_user(user_id: str):
    # Multiple requests = multiple workflows for same user!
    queue.enqueue(process_workflow, user_id)
```

**Correct (deduplicated by user):**

```python
from dbos import Queue, SetEnqueueOptions
from dbos import error as dboserror

queue = Queue("user_tasks")

@app.post("/process/{user_id}")
def process_for_user(user_id: str):
    with SetEnqueueOptions(deduplication_id=user_id):
        try:
            handle = queue.enqueue(process_workflow, user_id)
            return {"workflow_id": handle.get_workflow_id()}
        except dboserror.DBOSQueueDeduplicatedError:
            return {"status": "already processing"}
```

Deduplication behavior:
- If a workflow with the same deduplication ID is `ENQUEUED` or `PENDING`, new enqueue raises `DBOSQueueDeduplicatedError`
- Once the workflow completes, a new workflow with the same ID can be enqueued
- Deduplication is per-queue (same ID can exist in different queues)

Use cases:
- One active task per user
- Preventing duplicate job submissions
- Rate limiting by entity

Reference: [Queue Deduplication](https://docs.dbos.dev/python/tutorials/queue-tutorial#deduplication)

## Connections

- **Gehoert zu:** [[dbos-python]]
- **Pfad:** `references/queue-deduplication.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
