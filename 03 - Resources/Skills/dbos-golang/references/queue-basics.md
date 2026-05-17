---
type: referenz
created: 2026-04-11
parent-skill: "dbos-golang"
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

```go
// Starting many workflows without control - could overwhelm resources
for _, task := range tasks {
	dbos.RunWorkflow(ctx, processTask, task)
}
```

**Correct (using a queue):**

```go
// Create queue before Launch()
queue := dbos.NewWorkflowQueue(ctx, "task_queue")

func processAllTasks(ctx dbos.DBOSContext, tasks []string) ([]string, error) {
	var handles []dbos.WorkflowHandle[string]
	for _, task := range tasks {
		handle, err := dbos.RunWorkflow(ctx, processTask, task,
			dbos.WithQueue(queue.Name),
		)
		if err != nil {
			return nil, err
		}
		handles = append(handles, handle)
	}
	// Wait for all tasks
	var results []string
	for _, h := range handles {
		result, err := h.GetResult()
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}
	return results, nil
}
```

Queues process workflows in FIFO order. All queues must be created with `dbos.NewWorkflowQueue` before `Launch()`.

Reference: [DBOS Queues](https://docs.dbos.dev/golang/tutorials/queue-tutorial)

## Connections

- **Gehoert zu:** [[dbos-golang]]
- **Pfad:** `references/queue-basics.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
