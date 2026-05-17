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
id: "#2296"
titel: "Software-Update-Checker erstellen"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["update-checker", "software", "versionierung", "automatisierung"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein DevOps-Ingenieur, der Automatisierungstools für Software-Wartung und Dependency-Management entwickelt.

**Kontext:** Ich möchte ein Tool erstellen, das automatisch prüft, ob Updates verfügbar sind. Zu prüfen: [NPM-PAKETE / DOCKER-IMAGES / GITHUB-RELEASES / OS-PAKETE]. Programmiersprache: [PYTHON / BASH / GO / NODE.JS]. Benachrichtigung: [E-MAIL / SLACK / DISCORD / LOG].

**Aufgabe:** Entwickle einen automatischen Update-Checker:
- Prüfe aktuelle vs. installierte Versionen
- Erkennung von Breaking Changes (Major-Updates)
- Sicherheitsupdates priorisieren
- Automatische oder manuelle Benachrichtigung

**Ausgabe:**
1. Script/Tool-Code (sofort einsetzbar)
2. Konfigurationsdatei (was prüfen, wie oft)
3. Benachrichtigungsformat (klar, übersichtlich)
4. Cron-Job oder CI/CD-Integration
5. Dokumentation und Anpassungshinweise
```

## Anwendung

**Beispiel:**

Input: Python-Script, prüft npm-Pakete in package.json, Slack-Benachrichtigung bei Security-Updates

**Ergebnis:** Die KI erstellt ein Python-Script mit npm-API-Abfrage, Semver-Vergleich, Security-Advisory-Check und Slack-Webhook-Integration — inklusive Crontab-Eintrag für tägliche Prüfung.

## Variationen

### Variation 1: Dependency-Dashboard
Ändere zu: "Erstelle ein Web-Dashboard, das alle Dependencies und deren Status anzeigt."

### Variation 2: Docker-Image-Scanner
Ergänze: "Prüfe Docker-Images auf bekannte Schwachstellen (CVEs) und veraltete Base-Images."

### Variation 3: GitHub-Release-Monitor
Ändere zu: "Überwache GitHub-Repos und benachrichtige bei neuen Releases."

### Variation 4: Renovate-/Dependabot-Alternative
Ergänze: "Erstelle automatische Pull Requests für Dependency-Updates (wie Renovate)."

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[software-architecture|software-architecture]]
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
