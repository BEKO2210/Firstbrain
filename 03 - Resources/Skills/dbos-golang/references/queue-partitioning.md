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

## Partition Queues for Per-Entity Limits

Partitioned queues apply flow control limits per partition key instead of the entire queue. Each partition acts as a dynamic "subqueue".

**Incorrect (global concurrency for per-user limits):**

```go
// Global concurrency=1 blocks ALL users, not per-user
queue := dbos.NewWorkflowQueue(ctx, "tasks",
	dbos.WithGlobalConcurrency(1),
)
```

**Correct (partitioned queue):**

```go
queue := dbos.NewWorkflowQueue(ctx, "tasks",
	dbos.WithPartitionQueue(),
	dbos.WithGlobalConcurrency(1),
)

func onUserTask(ctx dbos.DBOSContext, userID, task string) error {
	// Each user gets their own partition - at most 1 task per user
	// but tasks from different users can run concurrently
	_, err := dbos.RunWorkflow(ctx, processTask, task,
		dbos.WithQueue(queue.Name),
		dbos.WithQueuePartitionKey(userID),
	)
	return err
}
```

When a queue has `WithPartitionQueue()` enabled, you **must** provide a `WithQueuePartitionKey()` when enqueuing. Partition keys and deduplication IDs cannot be used together.

Reference: [Partitioning Queues](https://docs.dbos.dev/golang/tutorials/queue-tutorial#partitioning-queues)

## Connections

- **Gehoert zu:** [[dbos-golang]]
- **Pfad:** `references/queue-partitioning.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
