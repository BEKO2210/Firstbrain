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

## Use Queues for Concurrent Workflows

Queues run many workflows concurrently with managed flow control. Use them when you need to control how many workflows run at once.

**Incorrect (uncontrolled concurrency):**

```python
@DBOS.workflow()
def process_task(task):
    pass

# Starting many workflows without control
for task in tasks:
    DBOS.start_workflow(process_task, task)  # Could overwhelm resources
```

**Correct (using queue):**

```python
from dbos import Queue

queue = Queue("task_queue")

@DBOS.workflow()
def process_task(task):
    pass

@DBOS.workflow()
def process_all_tasks(tasks):
    handles = []
    for task in tasks:
        # Queue manages concurrency
        handle = queue.enqueue(process_task, task)
        handles.append(handle)
    # Wait for all tasks
    return [h.get_result() for h in handles]
```

Queues process workflows in FIFO order. You can enqueue both workflows and steps.

```python
queue = Queue("example_queue")

@DBOS.step()
def my_step(data):
    return process(data)

# Enqueue a step
handle = queue.enqueue(my_step, data)
result = handle.get_result()
```

Reference: [DBOS Queues](https://docs.dbos.dev/python/tutorials/queue-tutorial)

## Connections

- **Gehoert zu:** [[dbos-python]]
- **Pfad:** `references/queue-basics.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
