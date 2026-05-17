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

## List and Inspect Workflows

Use `DBOS.listWorkflows` to query workflow executions by status, name, time range, and other criteria.

**Incorrect (no monitoring of workflow state):**

```typescript
// Start workflow with no way to check on it later
await DBOS.startWorkflow(processTask)("data");
// If something goes wrong, no way to find or debug it
```

**Correct (listing and inspecting workflows):**

```typescript
// List workflows by status
const erroredWorkflows = await DBOS.listWorkflows({
  status: "ERROR",
});

for (const wf of erroredWorkflows) {
  console.log(`Workflow ${wf.workflowID}: ${wf.workflowName} - ${wf.error}`);
}
```

List workflows with multiple filters:

```typescript
const workflows = await DBOS.listWorkflows({
  workflowName: "processOrder",
  status: "SUCCESS",
  limit: 100,
  sortDesc: true,
  loadOutput: true,
});
```

List enqueued workflows:

```typescript
const queued = await DBOS.listQueuedWorkflows({
  queueName: "task_queue",
});
```

List workflow steps:

```typescript
const steps = await DBOS.listWorkflowSteps(workflowID);
if (steps) {
  for (const step of steps) {
    console.log(`Step ${step.functionID}: ${step.name}`);
    if (step.error) console.log(`  Error: ${step.error}`);
    if (step.childWorkflowID) console.log(`  Child: ${step.childWorkflowID}`);
  }
}
```

Workflow status values: `ENQUEUED`, `PENDING`, `SUCCESS`, `ERROR`, `CANCELLED`, `RETRIES_EXCEEDED`

To optimize performance, set `loadInput: false` and `loadOutput: false` when you don't need workflow inputs or outputs.

Reference: [Workflow Management](https://docs.dbos.dev/typescript/tutorials/workflow-management)

## Connections

- **Gehoert zu:** [[dbos-typescript]]
- **Pfad:** `references/workflow-introspection.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
