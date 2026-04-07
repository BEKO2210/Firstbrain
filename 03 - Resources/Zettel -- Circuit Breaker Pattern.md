---
type: zettel
created: 2026-04-06
updated: 2026-04-06
tags:
  - zettel
  - architecture
  - resilience
  - patterns
source: "Meeting mit [[Person -- Alex Chen]]"
---

# Zettel -- Circuit Breaker Pattern

## Idea

> Ein Circuit Breaker schützt ein System vor kaskadierenden Fehlern, indem er Aufrufe an einen fehlerhaften Dienst automatisch unterbricht und nach einer Wartezeit vorsichtig wieder zulässt.

## Explanation

Drei Zustände:
1. **Closed** (Normalzustand): Alle Anfragen gehen durch. Fehler werden gezählt.
2. **Open** (Schutzschalter ausgelöst): Anfragen werden sofort abgelehnt. Kein Traffic zum kaputten Service.
3. **Half-Open** (Test-Phase): Nach einem Timeout wird eine einzelne Anfrage durchgelassen. Bei Erfolg → Closed. Bei Fehler → Open.

Konfigurationsparameter:
- `failure_threshold`: Wie viele Fehler bis Open? (z.B. 5)
- `recovery_timeout`: Wie lange bleibt Open? (z.B. 30s)
- `success_threshold`: Wie viele Erfolge in Half-Open bis Closed? (z.B. 2)

## Example

```python
class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=30):
        self.state = "closed"
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.last_failure_time = None

    def call(self, func, *args):
        if self.state == "open":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "half-open"
            else:
                raise CircuitOpenError("Service unavailable")

        try:
            result = func(*args)
            if self.state == "half-open":
                self.state = "closed"
                self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()
            if self.failure_count >= self.failure_threshold:
                self.state = "open"
            raise
```

## Connections

- **Source:** [[Person -- Alex Chen]] (vorgeschlagen im [[Meeting -- Kickoff Universal AI Clothing Kit 2026-04-06]])
- **Related Ideas:** [[Zettel -- Multi-Provider KI-Architektur]]
- **Contradicts:** Simple Retry-Strategien (die bei persistenten Fehlern alles schlimmer machen)
- **Supports:** [[Decision -- Provider-Failover-Strategie]]
