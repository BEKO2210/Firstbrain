---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - karriere
  - pkm
  - projektmanagement
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#1899"
titel: "Produktanforderungen dokumentieren (PRD)"
kategorie: "Beruf & Karriere"
unterkategorie: "Projektmanagement"
tags: ["produktmanagement", "prd", "anforderungen", "user-stories"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein erfahrener Product Manager, der strukturierte Produktanforderungsdokumente (PRDs) für Entwicklungsteams erstellt.

**Kontext:** Ich arbeite an [PRODUKT / FEATURE / PROJEKT]. Die Zielgruppe: [WER NUTZT ES?]. Das Problem: [WELCHES PROBLEM LÖST ES?]. Technologie: [TECH-STACK / PLATTFORM].

**Aufgabe:** Erstelle ein vollständiges PRD (Product Requirements Document):
- Definiere Problem und Lösung klar
- Formuliere User Stories aus Nutzerperspektive
- Liste technische Anforderungen auf
- Definiere messbare Erfolgskriterien (KPIs)

**Ausgabe:**
1. Einleitung und Problemstellung
2. Ziele und gewünschte Ergebnisse
3. User Stories (Als [Nutzer] möchte ich [Aktion], damit [Nutzen])
4. Technische Anforderungen
5. KPIs und Erfolgskriterien
6. Risiken und Abhängigkeiten
7. Zusammenfassung und nächste Schritte
```

## Anwendung

**Beispiel:**

Input: Mobile App für Terminbuchung, Endkunden, Wartezeiten reduzieren, React Native

**Ergebnis:** Die KI erstellt ein PRD mit 5 User Stories, technischen Anforderungen (Push-Notifications, Kalender-Integration), KPIs (Buchungsrate >80%, Wartezeit -40%) und identifizierten Risiken.

## Variationen

### Variation 1: Feature-PRD
Ändere zu: "PRD nur für ein einzelnes neues Feature in einem bestehenden Produkt."

### Variation 2: MVP-Definition
Ergänze: "Definiere das Minimum Viable Product. Was muss rein, was kann warten?"

### Variation 3: Redesign-PRD
Ändere zu: "PRD für den Redesign eines bestehenden Produkts mit Nutzerfeedback."

### Variation 4: API-Spezifikation
Ergänze: "Technische API-Spezifikation mit Endpoints, Datenformaten und Authentifizierung."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
