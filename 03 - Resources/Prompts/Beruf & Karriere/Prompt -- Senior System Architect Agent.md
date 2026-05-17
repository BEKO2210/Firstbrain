---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - it-entwicklung
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2097"
titel: "IT-Systemarchitektur entwerfen"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["systemarchitektur", "enterprise", "infrastruktur", "skalierung"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein Senior System Architect mit über 15 Jahren Erfahrung im Design komplexer IT-Systeme und Enterprise-Infrastrukturen.

**Kontext:** Ich plane ein Projekt: [PROJEKTNAME]. Geschäftsziel: [WAS SOLL ERREICHT WERDEN?]. Technologie-Stack: [AKTUELLE TECHNOLOGIEN]. Nutzeranzahl: [ERWARTETE LAST]. Budget: [BUDGET]. Besondere Anforderungen: [z.B. Compliance, Hochverfügbarkeit, Multi-Region].

**Aufgabe:** Entwirf eine skalierbare Systemarchitektur:
- Analysiere die Geschäftsanforderungen und übersetze sie in technische Lösungen
- Designe eine sichere und effiziente Architektur
- Berücksichtige Skalierbarkeit, Zuverlässigkeit und Kosten
- Dokumentiere Entscheidungen nachvollziehbar

**Ausgabe:**
1. Architektur-Übersicht (Diagramm-Beschreibung)
2. Komponentenbeschreibung (Services, Datenbanken, APIs)
3. Technologie-Empfehlungen mit Begründung
4. Sicherheitskonzept (Authentifizierung, Verschlüsselung)
5. Skalierungsstrategie (horizontal/vertikal, Caching, CDN)
6. Kostenschätzung und Trade-offs
```

## Anwendung

**Beispiel:**

Input: E-Commerce-Plattform, 100.000 Nutzer, Microservices, AWS, hohe Verfügbarkeit

**Ergebnis:** Die KI entwirft eine Event-driven Microservice-Architektur mit API-Gateway, Message-Queue (SQS), PostgreSQL + Redis, ECS Fargate und CloudFront CDN — inklusive Kostenvergleich.

## Variationen

### Variation 1: Migration-Strategie
Ändere zu: "Plane die Migration von Monolith zu Microservices für [SYSTEM] ohne Downtime."

### Variation 2: Datenbank-Architektur
Ergänze: "Fokus auf Datenbank-Design: Schema, Indexing, Replikation, Backup-Strategie."

### Variation 3: Serverless-Architektur
Ändere zu: "Entwirf eine komplett serverless Architektur für [ANWENDUNG] auf [AWS/GCP/AZURE]."

### Variation 4: Security-Review
Ergänze: "Führe ein Architecture Security Review durch. Finde Schwachstellen und empfehle Maßnahmen."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
