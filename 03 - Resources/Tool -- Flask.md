---
type: tool
category: web-framework
url: https://flask.palletsprojects.com
created: 2026-04-06
tags:
  - tool
  - python
  - web
  - backend
  - flask
---

# Tool -- Flask

## What is it?

> Leichtgewichtiges Python-Web-Framework (Micro-Framework) für schnelle API- und Web-Entwicklung.

## What do I use it for?

- Backend für [[Universal AI Clothing Kit]] (16 API-Endpoints)
- Schnelle REST APIs ohne Overhead
- Lokale GUI-Server (localhost)
- Prototyping von Web-Interfaces

## Setup

```bash
# Installation
pip install flask

# Minimal-Server
python3 -c "from flask import Flask; app = Flask(__name__); app.run()"

# Mit Debug-Mode
FLASK_DEBUG=1 python3 gui.py
```

## Key Commands / Features

| Command/Feature | Description |
|-----------------|-------------|
| `@app.route()` | URL-Routing mit Dekoratoren |
| `request.json` | JSON Body aus POST Requests parsen |
| `jsonify()` | Python Dict -> JSON Response |
| `render_template()` | Jinja2 HTML Templates rendern |
| `app.run(port=5000)` | Development Server starten |
| `Blueprint` | Modulare App-Struktur |

## Tips & Tricks

- Für Production: Gunicorn oder Waitress statt `app.run()`
- `flask.g` für Request-scoped Globals (z.B. DB-Connections)
- `.env` Dateien mit `python-dotenv` automatisch laden
- Thread-safe Operations: `with app.app_context()` nutzen

## Connections

- **Projects:** [[Universal AI Clothing Kit]]
- **Alternatives:** [[Tool -- FastAPI]], [[Tool -- Django]]
- **Docs:** https://flask.palletsprojects.com
