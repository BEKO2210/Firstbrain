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
id: "#2345"
titel: "IT-Automatisierung mit PowerShell"
kategorie: "Beruf & Karriere"
unterkategorie: "IT & Entwicklung"
tags: ["powershell", "automatisierung", "it-administration", "scripting", "windows"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein IT-Automatisierungsexperte, der wiederkehrende Administrationsaufgaben mit PowerShell-Scripts effizient löst.

**Kontext:** Ich möchte folgende IT-Aufgabe automatisieren: [AUFGABE BESCHREIBEN, z.B. Server-Monitoring, Backup-Prüfung, Lizenz-Inventur, Benutzer-Reporting]. Betriebssystem: [WINDOWS SERVER / WINDOWS 10/11]. Aktuell mache ich das: [MANUELL / TEILWEISE AUTOMATISIERT]. Häufigkeit: [TÄGLICH / WÖCHENTLICH / MONATLICH].

**Aufgabe:** Entwickle eine PowerShell-Automatisierungslösung:
- Analysiere die Aufgabe und identifiziere Automatisierungspotenzial
- Schreibe ein modulares, wiederverwendbares Script
- Implementiere Benachrichtigungen (E-Mail, Log, Report)
- Plane die zeitgesteuerte Ausführung

**Ausgabe:**
1. PowerShell-Script mit Kommentaren und Fehlerbehandlung
2. Konfigurationsdatei (Parameter, Schwellenwerte, Empfänger)
3. Einrichtungsanleitung (Scheduled Task / Task Scheduler)
4. Report-Format (HTML, CSV oder E-Mail-Template)
5. Troubleshooting-Guide (häufige Fehler und Lösungen)
```

## Anwendung

**Beispiel:**

Input: Tägliche Backup-Prüfung, Windows Server 2022, E-Mail-Benachrichtigung bei Fehler

**Ergebnis:** Die KI erstellt ein PowerShell-Script, das Backup-Logs prüft, Erfolg/Fehler erkennt, eine HTML-Zusammenfassung per E-Mail sendet und als täglicher Scheduled Task um 7:00 Uhr läuft — inklusive Retry-Logik und Eskalation.

## Variationen

### Variation 1: Server-Health-Check
Ändere zu: "Erstelle ein Script, das CPU, RAM, Festplatte und Dienste überwacht und bei Problemen alarmiert."

### Variation 2: Software-Inventar
Ergänze: "Inventarisiere alle installierte Software auf mehreren Servern und erstelle einen Excel-Report."

### Variation 3: Datei-Management
Ändere zu: "Automatisiere Datei-Archivierung: alte Dateien verschieben, komprimieren und bereinigen."

### Variation 4: Exchange/Microsoft-365
Ergänze: "Erstelle Automatisierungen für Exchange Online (Postfach-Reports, Berechtigungen, Archivierung)."

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[powershell-windows|powershell-windows]]
  - [[bash-scripting|bash-scripting]]
  - [[linux-shell-scripting|linux-shell-scripting]]
