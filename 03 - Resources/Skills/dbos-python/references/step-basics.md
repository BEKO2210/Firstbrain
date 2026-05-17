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

## Use Steps for External Operations

Any function that performs complex operations, accesses external APIs, or has side effects should be a step. Step results are checkpointed, enabling workflow recovery.

**Incorrect (external call in workflow):**

```python
import requests

@DBOS.workflow()
def my_workflow():
    # External API call directly in workflow - not checkpointed!
    response = requests.get("https://api.example.com/data")
    return response.json()
```

**Correct (external call in step):**

```python
import requests

@DBOS.step()
def fetch_data():
    response = requests.get("https://api.example.com/data")
    return response.json()

@DBOS.workflow()
def my_workflow():
    # Step result is checkpointed for recovery
    data = fetch_data()
    return data
```

Step requirements:
- Inputs and outputs must be serializable
- Should not modify global state
- Can be retried on failure (configurable)

When to use steps:
- API calls to external services
- File system operations
- Random number generation
- Getting current time
- Any non-deterministic operation

Reference: [DBOS Steps](https://docs.dbos.dev/python/tutorials/step-tutorial)

## Connections

- **Gehoert zu:** [[dbos-python]]
- **Pfad:** `references/step-basics.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Programmiersprachen]]
