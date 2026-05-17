---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - prompt
  - lyra
  - pkm
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#339"
titel: "API-Dokumentation lesen"
kategorie: Technik
unterkategorie: Softwareentwicklung
tags: [api, dokumentation, integration, entwicklung]
erstellt: 2026-02-23
plattformen: [ChatGPT, Claude]
---

# API-Dokumentation lesen

## Prompt
```
Rolle: API-Integrationsspezialist und Entwickler-Advokat
Kontext: Ich muss die API [API-NAME] für [USE CASE] integrieren
Verfügbare Dokumentation: [DOCS URL/OAS SPEC]
Mein Tech-Stack: [SPRACHEN, FRAMEWORKS]
Mein Erfahrungslevel mit APIs: [ANFÄNGER/FORTGESCHRITTEN]
Aufgabe: Extrahiere die wesentlichen Informationen aus der API-Doku
Einschränkungen:
- Fokus auf meinen Use Case, nicht alle Endpunkte
- Authentifizierung und Rate-Limits priorisieren
- Fehlerfälle und Edge Cases identifizieren
Ausgabe: Relevante Endpunkte für meinen Use Case, Authentifizierungs-Flow, Request/Response Beispiele, Rate Limits, Fehlercodes, SDK/Client-Bibliotheken, Quickstart-Code
```

## Anwendung
**Input:**
- API: Stripe Payment API
- Use Case: Einmalzahlung implementieren
- Stack: Node.js, Express
- Level: Fortgeschritten

**Output:** AI filtert: /v1/charges vs /v1/payment_intents (SCA), Auth via Secret Key, Code-Beispiel Node.js, Webhook für Bestätigung, Test-Modus, häufige Fehler (card_declined)

## Variationen
- Für Legacy-APIs: "Deprecation-Plan und Migrationspfad"
- Für GraphQL: "Query-Optimierung und Fragmente"
- Für Webhooks: "Security-Validierung und Retry-Logik"

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[moodle-external-api-development|moodle-external-api-development]]
  - [[api-endpoint-builder|api-endpoint-builder]]
  - [[api-security-best-practices|api-security-best-practices]]
