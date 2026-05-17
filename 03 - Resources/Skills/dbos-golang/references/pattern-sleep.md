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

## Use Durable Sleep for Delayed Execution

Use `dbos.Sleep` for durable delays within workflows. The wakeup time is stored in the database, so the sleep survives restarts.

**Incorrect (non-durable sleep):**

```go
func delayedTask(ctx dbos.DBOSContext, input string) (string, error) {
	// time.Sleep is not durable - lost on restart!
	time.Sleep(60 * time.Second)
	result, err := dbos.RunAsStep(ctx, doWork, dbos.WithStepName("doWork"))
	return result, err
}
```

**Correct (durable sleep):**

```go
func delayedTask(ctx dbos.DBOSContext, input string) (string, error) {
	// Durable sleep - survives restarts
	_, err := dbos.Sleep(ctx, 60*time.Second)
	if err != nil {
		return "", err
	}
	result, err := dbos.RunAsStep(ctx, doWork, dbos.WithStepName("doWork"))
	return result, err
}
```

`dbos.Sleep` takes a `time.Duration`. It returns the remaining sleep duration (zero if completed normally).

Use cases:
- Scheduling tasks to run in the future
- Implementing retry delays
- Delays spanning hours, days, or weeks

```go
func scheduledTask(ctx dbos.DBOSContext, task string) (string, error) {
	// Sleep for one week
	dbos.Sleep(ctx, 7*24*time.Hour)
	return processTask(task)
}
```

Reference: [Durable Sleep](https://docs.dbos.dev/golang/tutorials/workflow-tutorial#durable-sleep)

## Connections

- **Gehoert zu:** [[dbos-golang]]
- **Pfad:** `references/pattern-sleep.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
