---
type: referenz
created: 2026-04-11
parent-skill: "dbos-typescript"
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

```typescript
async function processTaskFn(task: string) {
  // ...
}
const processTask = DBOS.registerWorkflow(processTaskFn);

// Starting many workflows without control - could overwhelm resources
for (const task of tasks) {
  await DBOS.startWorkflow(processTask)(task);
}
```

**Correct (using a queue):**

```typescript
import { DBOS, WorkflowQueue } from "@dbos-inc/dbos-sdk";

const queue = new WorkflowQueue("task_queue");

async function processTaskFn(task: string) {
  // ...
}
const processTask = DBOS.registerWorkflow(processTaskFn);

async function processAllTasksFn(tasks: string[]) {
  const handles = [];
  for (const task of tasks) {
    // Enqueue by passing queueName to startWorkflow
    const handle = await DBOS.startWorkflow(processTask, {
      queueName: queue.name,
    })(task);
    handles.push(handle);
  }
  // Wait for all tasks
  const results = [];
  for (const h of handles) {
    results.push(await h.getResult());
  }
  return results;
}
const processAllTasks = DBOS.registerWorkflow(processAllTasksFn);
```

Queues process workflows in FIFO order. All queues should be created before `DBOS.launch()`.

Reference: [DBOS Queues](https://docs.dbos.dev/typescript/tutorials/queue-tutorial)

## Connections

- **Gehoert zu:** [[dbos-typescript]]
- **Pfad:** `references/queue-basics.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
