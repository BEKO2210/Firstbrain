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

## Configure and Launch DBOS Properly

Every DBOS application must create a context, register workflows and queues, then launch before running any workflows.

**Incorrect (missing configuration or launch):**

```go
// No context or launch!
func myWorkflow(ctx dbos.DBOSContext, input string) (string, error) {
	return input, nil
}

func main() {
	// This will fail - DBOS is not initialized or launched
	dbos.RegisterWorkflow(nil, myWorkflow) // panic: ctx cannot be nil
}
```

**Correct (create context, register, launch):**

```go
func myWorkflow(ctx dbos.DBOSContext, input string) (string, error) {
	return input, nil
}

func main() {
	ctx, err := dbos.NewDBOSContext(context.Background(), dbos.Config{
		AppName:     "my-app",
		DatabaseURL: os.Getenv("DBOS_SYSTEM_DATABASE_URL"),
	})
	if err != nil {
		log.Fatal(err)
	}
	defer dbos.Shutdown(ctx, 30*time.Second)

	dbos.RegisterWorkflow(ctx, myWorkflow)

	if err := dbos.Launch(ctx); err != nil {
		log.Fatal(err)
	}

	handle, err := dbos.RunWorkflow(ctx, myWorkflow, "hello")
	if err != nil {
		log.Fatal(err)
	}
	result, err := handle.GetResult()
	fmt.Println(result) // "hello"
}
```

Config fields:
- `AppName` (required): Application identifier
- `DatabaseURL` (required unless `SystemDBPool` is set): PostgreSQL connection string
- `SystemDBPool`: Custom `*pgxpool.Pool` (takes precedence over `DatabaseURL`)
- `DatabaseSchema`: Schema name (default: `"dbos"`)
- `Logger`: Custom `*slog.Logger` (defaults to stdout)
- `AdminServer`: Enable HTTP admin server (default: `false`)
- `AdminServerPort`: Admin server port (default: `3001`)
- `ApplicationVersion`: App version (auto-computed from binary hash if not set)
- `ExecutorID`: Executor identifier (default: `"local"`)
- `EnablePatching`: Enable code patching system (default: `false`)

Reference: [Integrating DBOS](https://docs.dbos.dev/golang/integrating-dbos)

## Connections

- **Gehoert zu:** [[dbos-golang]]
- **Pfad:** `references/lifecycle-config.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
