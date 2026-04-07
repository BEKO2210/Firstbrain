---
type: decision
status: pending
date: 2026-04-06
impact: high
tags:
  - decision
  - architecture
  - ki
related-project: "[[Universal AI Clothing Kit]]"
---

# Decision -- Provider-Failover-Strategie

## Context

> Das Universal AI Clothing Kit nutzt mehrere KI-Provider (Claude, Gemini, LM Studio, Ollama). Was passiert wenn ein Provider ausfällt oder rate-limited wird? Wir brauchen eine robuste Failover-Strategie.

## Options

### Option A: Simple Round-Robin
- Pro: Einfach zu implementieren, verteilt Last gleichmäßig
- Contra: Keine Berücksichtigung von Provider-Qualität oder -Status

### Option B: Circuit Breaker Pattern
- Pro: Erkennt Ausfälle automatisch, schaltet auf Alternative um, Self-Healing
- Contra: Komplexer zu implementieren, braucht Health-Check-Endpoints

### Option C: Priority-Based mit Fallback-Chain
- Pro: Bester Provider wird bevorzugt, kaskadiert bei Ausfall, konfigurierbar
- Contra: Braucht Qualitäts-Metriken pro Provider, initiale Konfiguration aufwändig

## Decision

> **Chosen:** -- noch offen --

## Rationale

Alex Chen hat Circuit Breaker vorgeschlagen (Option B). Ich tendiere zu Option C, da es Provider-Qualität berücksichtigt. Möglicherweise eine Kombination: Priority-Based Routing mit Circuit Breaker pro Provider.

## Consequences

- Architektur-Entscheidung beeinflusst das gesamte Backend-Design
- Muss vor v0.2 Release entschieden werden
- Braucht Provider-Health-Monitoring als Voraussetzung

## Review Date

- 2026-04-13 (nächste Woche)

## Connections

- **Project:** [[Universal AI Clothing Kit]]
- **Impacts:** [[Zettel -- Multi-Provider KI-Architektur]], [[Snippet -- Flask Multi-Provider Backend]]
