---
type: tool
category: automation
url: https://n8n.io
created: 2026-03-05
tags:
  - tool
  - automation
  - nocode
  - workflow
---

# Tool — n8n

## Was ist das?

> Open-Source Workflow-Automatisierungsplattform — wie Zapier/Make, aber self-hosted und mit voller Kontrolle ueber die Daten. Perfekt fuer DSGVO-konforme Automatisierungen.

## Wofuer nutze ich es?

- Automatisierte Workflows fuer Kunden bauen
- Familienorganisation automatisieren (Meal-Prep, Einkaufslisten)
- APIs verbinden ohne kompletten Code schreiben zu muessen
- Kern-Tool fuer mein Freelance-Angebot

## Setup

```bash
# Docker (empfohlen fuer Produktion)
docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n

# Oder lokal mit npm
npx n8n start
```

## Wichtige Befehle / Features

| Befehl/Feature | Beschreibung |
|----------------|--------------|
| HTTP Request Node | APIs anbinden (Claude, WhatsApp, etc.) |
| Webhook Node | Externe Trigger empfangen |
| Code Node | Custom JavaScript/Python ausfuehren |
| Credentials | Sichere API-Key Verwaltung |
| Workflow Templates | Vorgefertigte Automationen |
| Self-Hosting | Volle Datenkontrolle (DSGVO!) |

## Tipps & Tricks

- Immer self-hosted betreiben fuer Kundenprojekte (DSGVO)
- Code Node fuer komplexe Logik nutzen — mein Developer-Vorteil
- Workflows exportieren und als Templates fuer aehnliche Kunden wiederverwenden
- Community Nodes pruefen bevor man alles selbst baut

## Verbindungen

- **Projekte:** [[KI-Automatisierung Freelance aufbauen]], [[KI-Workflow fuer Familienorganisation]]
- **Alternativen:** [[Tool — Claude Code]]
- **Docs:** [[YouTube — AI Automation Agency Modell]]
