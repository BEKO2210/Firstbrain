---
type: zettel
created: 2026-04-06
updated: 2026-04-06
tags:
  - zettel
  - local-first
  - privacy
  - architecture
source: Universal AI Clothing Kit Projekt-Analyse
---

# Zettel -- Local-First Software

## Idea

> Software, die primär lokal auf dem Gerät des Nutzers läuft und funktioniert -- Cloud-Dienste sind optional, nicht erforderlich. Daten gehören dem Nutzer, nicht dem Anbieter.

## Explanation

Local-First ist ein Architektur-Prinzip, das drei Kernversprechen macht:

1. **Offline-fähig:** Die Software funktioniert ohne Internetverbindung vollständig
2. **Daten-Souveränität:** Alle Daten liegen auf dem lokalen Gerät, nicht in fremden Clouds
3. **Geschwindigkeit:** Keine Netzwerk-Latenz für Kernfunktionen

Im Kontext von KI-Anwendungen bedeutet das:
- API-Keys werden nur lokal in `.env` gespeichert, nie übertragen
- Lokale Modelle (via [[Tool -- LM Studio]] oder [[Tool -- Ollama]]) ermöglichen vollständig offline KI
- Cloud-APIs (Claude, Gemini) sind **optional** für erweiterte Capabilities

Das [[Universal AI Clothing Kit]] implementiert dieses Prinzip konsequent:
- Flask-Server läuft nur auf `localhost:5000`
- Kein Tracking, keine Telemetrie
- Hybrides Modell: lokal + Cloud nach Wahl

## Example

```python
# .env Datei -- bleibt lokal, ist gitignored
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...
# Keine Keys für LM Studio/Ollama nötig (lokal)
```

## Connections

- **Source:** [[Universal AI Clothing Kit]]
- **Related Ideas:** [[Zettel -- Multi-Provider KI-Architektur]]
- **Supports:** [[Tool -- LM Studio]], [[Tool -- Ollama]]
