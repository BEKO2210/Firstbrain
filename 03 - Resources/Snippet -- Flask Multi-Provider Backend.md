---
type: code-snippet
language: python
created: 2026-04-06
tags:
  - code
  - snippet
  - python
  - flask
  - ai
  - multi-provider
project: "[[Universal AI Clothing Kit]]"
---

# Snippet -- Flask Multi-Provider Backend

## Description

> Grundstruktur des Flask-Backends aus dem Universal AI Clothing Kit -- zeigt wie 16 API-Endpoints fünf KI-Provider über ein einheitliches Interface bedienen.

## Code

```python
from flask import Flask, request, jsonify, render_template
import os

app = Flask(__name__)

# Provider Configuration (from .env)
PROVIDERS = {
    'claude': {
        'url': 'https://api.anthropic.com/v1/messages',
        'key_env': 'ANTHROPIC_API_KEY',
    },
    'gemini': {
        'url': 'https://generativelanguage.googleapis.com/v1/models',
        'key_env': 'GOOGLE_API_KEY',
    },
    'kimi': {
        'url': 'https://api.moonshot.cn/v1/chat/completions',
        'key_env': 'KIMI_API_KEY',
    },
    'lmstudio': {
        'url': 'http://localhost:1234/v1/chat/completions',
        'key_env': None,  # No key needed for local
    },
    'ollama': {
        'url': 'http://localhost:11434/api/chat',
        'key_env': None,  # No key needed for local
    },
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    provider = data.get('provider', 'claude')
    message = data.get('message', '')
    
    # Route to correct provider backend
    config = PROVIDERS.get(provider)
    if not config:
        return jsonify({'error': f'Unknown provider: {provider}'}), 400
    
    # Provider-specific API call logic here...
    return jsonify({'response': '...', 'provider': provider})

@app.route('/api/providers', methods=['GET'])
def list_providers():
    """List available providers and their status."""
    available = {}
    for name, config in PROVIDERS.items():
        key_env = config.get('key_env')
        available[name] = {
            'configured': key_env is None or os.getenv(key_env) is not None,
            'type': 'local' if key_env is None else 'cloud',
        }
    return jsonify(available)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
```

## Usage

```bash
# Server starten
python3 gui.py

# Chat API aufrufen
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"provider": "ollama", "message": "Hello!"}'

# Provider Status prüfen
curl http://localhost:5000/api/providers
```

## Dependencies

- Flask (`pip install flask`)
- Python 3.10+
- Optional: python-dotenv für .env Laden

## Connections

- **Project:** [[Universal AI Clothing Kit]]
- **Documentation:** [[Tool -- Flask]]
- **Related:** [[Zettel -- Multi-Provider KI-Architektur]], [[Tool -- Ollama]], [[Tool -- LM Studio]]
