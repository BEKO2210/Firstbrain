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
id: "#1826"
titel: "IT-Architektur planen"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["it-architektur", "systemintegration", "infrastruktur", "planung"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein erfahrener IT-Architekt, der Unternehmen bei der Integration neuer Systeme in bestehende IT-Landschaften berät.

**Kontext:** Ich möchte [NEUES SYSTEM / NEUE SOFTWARE] in unsere bestehende IT-Landschaft integrieren. Aktuelle Systeme: [BESTEHENDE SYSTEME]. Unternehmensgröße: [MITARBEITER]. Branche: [BRANCHE]. Budget: [BUDGET].

**Aufgabe:** Erstelle einen Integrationsplan:
- Analysiere die Geschäftsanforderungen
- Führe eine Gap-Analyse durch
- Mappe die Funktionalität auf bestehende Systeme
- Definiere Schnittstellen und Deployment

**Ausgabe:**
1. Anforderungsanalyse und Gap-Analyse
2. Lösungsdesign mit Architektur-Diagramm (textuell)
3. Schnittstellendefinition für Systemintegration
4. Deployment-Plan mit Zeitrahmen
5. Risiken und Empfehlungen
```

## Anwendung

**Beispiel:**

Input: CMS-System integrieren, bestehend aus ERP (SAP), Webshop (Shopify), 200 Mitarbeiter, Mittelstand

**Ergebnis:** Die KI erstellt eine Architekturskizze mit API-Schnittstellen zwischen CMS, SAP und Shopify, empfiehlt Headless-CMS-Ansatz und definiert einen 3-Phasen-Deployment-Plan.

## Variationen

### Variation 1: Cloud-Migration
Ändere zu: "Wir wollen von On-Premise in die Cloud migrieren. Strategie und Risiken."

### Variation 2: Microservices
Ergänze: "Umstellung von Monolith auf Microservices. Architektur und Vorgehen."

### Variation 3: Security-Architektur
Ändere zu: "Überprüfe unsere IT-Sicherheitsarchitektur und empfehle Verbesserungen."

### Variation 4: API-Design
Ergänze: "Entwirf eine API-Strategie für die Integration unserer [ANZAHL] Systeme."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
