---
type: zettel
created: 2026-04-06
updated: 2026-04-06
tags:
  - zettel
  - ai
  - architecture
  - multi-provider
  - vendor-lock-in
source: Universal AI Clothing Kit Projekt-Analyse
---

# Zettel -- Multi-Provider KI-Architektur

## Idea

> Ein einziges Interface, das mehrere KI-Provider abstrahiert -- der Nutzer wählt den Provider, die Anwendung übersetzt. Kein Vendor Lock-in, maximale Flexibilität.

## Explanation

Das Problem: Jeder KI-Provider hat sein eigenes SDK, eigene API-Formate, eigene Rate Limits. Wer Claude nutzt, kann nicht einfach zu Gemini wechseln ohne Code-Änderungen.

Die Lösung: Eine **Abstraktionsschicht**, die:

1. **Unified API:** Einheitliches Request/Response Format unabhängig vom Provider
2. **Provider Registry:** Dynamisches Hinzufügen/Entfernen von Providern
3. **Fallback Chain:** Wenn Provider A ausfällt, automatisch Provider B nutzen
4. **Cost Optimization:** Einfache Aufgaben an günstige/lokale Modelle, komplexe an stärkere

Das [[Universal AI Clothing Kit]] implementiert dies mit:
- 5 Provider-Backends (Claude, Gemini, Kimi, LM Studio, Ollama)
- Einheitliches Chat-Interface mit Provider-Switching
- 207 Commands + 184 Tools über alle Provider hinweg nutzbar

### Provider-Vergleich

| Eigenschaft | Cloud (Claude/Gemini) | Lokal (LM Studio/Ollama) |
|-------------|----------------------|--------------------------|
| Qualität | Höher (größere Modelle) | Variabel (Modellabhängig) |
| Latenz | Netzwerkabhängig | Minimal (lokal) |
| Kosten | Pay-per-Token | Nur Hardware (Strom) |
| Privacy | Daten gehen an Provider | 100% lokal |
| Offline | Nein | Ja |

## Example

```
User → Universal AI Clothing Kit → Provider Abstraction Layer
                                        ├── Claude API
                                        ├── Gemini API
                                        ├── Kimi API
                                        ├── LM Studio (localhost:1234)
                                        └── Ollama (localhost:11434)
```

## Connections

- **Source:** [[Universal AI Clothing Kit]]
- **Related Ideas:** [[Zettel -- Local-First Software]]
- **Supports:** [[Tool -- Claude]], [[Tool -- LM Studio]], [[Tool -- Ollama]]
