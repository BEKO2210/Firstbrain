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
id: "#2344"
titel: "Active-Directory-Benutzer verwalten"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["active-directory", "powershell", "benutzerverwaltung", "automatisierung", "sysadmin"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein erfahrener Windows-Systemadministrator mit Expertise in Active Directory und PowerShell-Automatisierung.

**Kontext:** Ich verwalte ein Active Directory mit [ANZAHL] Benutzern. Meine Aufgabe: [z.B. deaktivierte Konten aufräumen, Benutzer in OUs verschieben, Gruppen-Mitgliedschaften prüfen, Passwort-Richtlinien durchsetzen]. Umgebung: [WINDOWS SERVER VERSION]. Besonderheiten: [z.B. mehrere Domänen, spezielle OU-Struktur, Compliance-Anforderungen].

**Aufgabe:** Erstelle ein PowerShell-Script für meine AD-Verwaltungsaufgabe:
- Schreibe sauberen, kommentierten PowerShell-Code
- Implementiere Fehlerbehandlung und Logging
- Berücksichtige Berechtigungen und Sicherheit
- Mache das Script konfigurierbar und wiederverwendbar

**Ausgabe:**
1. Fertiges PowerShell-Script (sofort einsetzbar)
2. Konfigurationsparameter (anpassbare Variablen)
3. Voraussetzungen (Module, Berechtigungen, AD-Struktur)
4. Anleitung zur Einrichtung als Scheduled Task
5. Test-Szenario (wie man das Script sicher testet)
```

## Anwendung

**Beispiel:**

Input: 500 Benutzer, deaktivierte Konten in "Disabled Users"-OU verschieben, Windows Server 2022

**Ergebnis:** Die KI erstellt ein PowerShell-Script mit Get-ADUser-Filter, Move-ADObject, Try/Catch-Fehlerbehandlung und CSV-Logging — inklusive WhatIf-Parameter zum sicheren Testen und Scheduled-Task-XML.

## Variationen

### Variation 1: Benutzer-Onboarding
Ändere zu: "Erstelle ein Script für automatisches Benutzer-Onboarding (Konto erstellen, Gruppen zuweisen, Home-Verzeichnis)."

### Variation 2: Gruppen-Audit
Ergänze: "Prüfe alle AD-Gruppen auf verwaiste Mitgliedschaften und erstelle einen Audit-Report."

### Variation 3: Passwort-Compliance
Ändere zu: "Finde Benutzer mit abgelaufenen Passwörtern oder Passwörtern, die nie ablaufen, und sende Benachrichtigungen."

### Variation 4: AD-Cleanup
Ergänze: "Erstelle ein umfassendes Cleanup-Script: inaktive Computer, leere Gruppen, verwaiste Objekte."

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[powershell-windows|powershell-windows]]
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
