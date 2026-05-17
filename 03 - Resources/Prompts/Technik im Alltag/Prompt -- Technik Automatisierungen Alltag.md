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
id: "#299"
titel: "Automatisierungen für den Alltag"
kategorie: Technik & Alltag
unterkategorie: Produktivität
tags: [automation, produktivität, technik, workflow, effizienz]
erstellt: 2026-02-22
plattformen: [ChatGPT, Claude, Gemini]
---

## Prompt

**Rolle:** Du bist ein Produktivitäts- und Automatisierungsexperte. Du hilfst Menschen, repetitive Aufgaben zu automatisieren, damit sie Zeit für wichtigere Dinge haben – ohne dafür Programmierer sein zu müssen.

**Kontext:** Ich wiederhole regelmäßig [AUFGABEN, z.B. E-Mails sortieren / Rechnungen bezahlen / Social Media posten / Daten sichern / Termine koordinieren]. Diese Aufgaben kosten mich etwa [ZEIT] pro Woche. Ich nutze [GERÄTE/PLATTFORMEN, z.B. iPhone + Mac / Android + Windows / gemischt]. Mein Technik-Level ist [LEVEL, z.B. Anfänger / fortgeschritten / sehr erfahren]. Ich bin bereit, [BUDGET/ZEIT INVESTITION] in die Einrichtung zu investieren.

**Aufgabe:** Identifiziere Automatisierungsmöglichkeiten in meinem Alltag und erstelle einen Umsetzungsplan, der:
1. Konkrete wiederkehrende Aufgaben identifiziert
2. Passende Tools und Dienste empfiehlt
3. Schritt-für-Schritt Einrichtung erklärt
4. Zeitersparnis quantifiziert

**Einschränkungen:**
- Keine Programmierkenntnisse nötig (No-Code/Low-Code)
- Datenschutz beachten
- Zuverlässigkeit vor Komplexität
- Nachvollziehbare Lösungen

**Ausgabe:**
1. **Automatisierungs-Analyse** – Was lohnt sich?
2. **Tool-Stack** – Die richtigen Werkzeuge
3. **Quick Wins** – Sofort umsetzbare Automationen
4. **Fortgeschrittene Workflows** – Für komplexere Aufgaben
5. **Einrichtungs-Guide** – Schritt-für-Schritt
6. **Wartung & Troubleshooting** – Wenn was schiefgeht

---

## Beispiel

**Input:**
- Aufgaben: E-Mails sortieren, Rechnungen bezahlen, Social Media für Side-Business, wöchentliche Backups
- Zeit: ca. 5 Stunden pro Woche
- Geräte: iPhone + MacBook
- Level: Fortgeschritten (kenne mich mit Technik aus)
- Investition: Bis zu 50€/Monat für Tools

**Output:**

### Automatisierungs-Analyse

**Hoher Impact, geringer Aufwand:**
- E-Mail-Sortierung mit Regeln
- Rechnungserinnerungen
- Social Media Cross-Posting

**Hoher Impact, höherer Aufwand:**
- Backup-Automatisierung
- Erweiterte Social Media Planung

**Nicht automatisieren:**
- Persönliche Antworten auf E-Mails
- Kreative Social-Media-Inhalte

### Tool-Stack

**Kostenlos:**
- **Apple Shortcuts:** iOS/macOS-Automationen
- **Notion:** Datenbanken und Workflows
- **Gmail/Apple Mail Regeln:** E-Mail-Sortierung

**Kostenpflichtig (empfohlen):**
- **Zapier oder Make:** Verbindung verschiedener Dienste (20€/Monat)
- **Buffer oder Later:** Social Media Scheduling (15€/Monat)
- **1Password:** Passwort-Automatisierung (3€/Monat)

**Gesamt:** ca. 38€/Monat

### Quick Wins (sofort umsetzbar)

**1. E-Mail-Automatisierung (30 Min. Einrichtung)**

*Gmail/Apple Mail Regeln:*
- Newsletter → Ordner "Newsletter" (nicht Posteingang)
- Rechnungen mit "Rechnung" im Betreff → Ordner "Rechnungen" + markieren
- Interne Mails (von @firma.de) → Ordner "Intern"
- Ergebnis: Posteingang nur für wichtige Mails

**2. Rechnungserinnerungen (15 Min. Einrichtung)**

*Apple Shortcuts + Erinnerungen:*
- Shortcut: "Rechnung eingegangen"
- Fragt nach Betrag und Fälligkeitsdatum
- Erstellt Erinnerung 3 Tage vor Fälligkeit
- Optional: Fügt zur Notion-Datenbank hinzu

**3. Wöchentliches Backup (20 Min. Einrichtung)**

*Time Machine (Mac) + iCloud:*
- Time Machine auf externe Festplatte (automatisch)
- iCloud Fotos: Automatischer Upload
- Monatlich: Check, ob Backup funktioniert

### Fortgeschrittene Workflows

**Social Media Automation (1h Einrichtung):**

*Workflow mit Buffer:*
- Sonntag: Content für die Woche planen
- Buffer postet automatisch zu festen Zeiten
- Stories müssen manuell (authentischer)

*Cross-Posting mit Zapier:*
- Instagram-Post → automatisch Twitter-Thread
- Blog-Artikel → LinkedIn-Post
- YouTube-Video → Instagram Reel (nur Ankündigung)

**Eingangs-Verarbeitung (45 Min. Einrichtung):**

*Zapier-Workflow:*
- E-Mail mit Anhang "Rechnung" → Google Drive speichern
- Google Sheets aktualisieren (Übersicht Rechnungen)
- Slack-Benachrichtigung: "Neue Rechnung eingegangen"

### Einrichtungs-Guide

**Woche 1: Grundlagen**
- Tag 1: E-Mail-Regeln einrichten
- Tag 2: Apple Shortcuts Basics lernen (30 Min. Tutorial)
- Tag 3: Ersten Shortcut erstellen (Rechnungserinnerung)

**Woche 2: Social Media**
- Tag 1: Buffer-Account erstellen
- Tag 2: Accounts verbinden
- Tag 3: Erste Woche planen

**Woche 3: Erweitert**
- Tag 1: Zapier-Account erstellen
- Tag 2: Ersten Zap erstellen (E-Mail → Drive)
- Tag 3: Testen und Feinschliff

### Wartung & Troubleshooting

**Monatlicher Check (15 Min.):**
- Funktionieren die Automationen noch?
- Backups überprüfen
- Neue repetitive Aufgaben identifizieren?

**Wenn was schiefgeht:**
- Nicht panisch alle Automationen abschalten
- Einzelne Komponente isolieren
- Logging aktivieren (Zapier/Make haben History)
- Fallback: Manuelle Alternative kennen

**Sicherheit:**
- 2FA überall aktivieren
- API-Keys sicher speichern (1Password)
- Regelmäßig Berechtigungen prüfen

### Zeitersparnis

**Vorher:** 5 Stunden/Woche
**Nachher:** ca. 2 Stunden/Woche
**Ersparnis:** 3 Stunden/Woche = 12 Stunden/Monat

**Kosten:** 38€/Monat
**"Stundenlohn":** ca. 3€/Stunde gesparte Zeit
→ Nach 3 Monaten amortisiert

---

## Variationen

**Variation 1: Android + Windows (andere Ökosysteme)**
Google Assistant Routines, Microsoft Power Automate, Tasker für Android, Google Drive statt iCloud, andere Shortcuts-Apps.

**Variation 2: Selbstständige/Kleine Unternehmen (Kunden, Rechnungen, Buchhaltung)**
Rechnungsautomatisierung, Mahnwesen, Kunden-Onboarding, Terminbuchungssysteme, E-Mail-Marketing-Automation, CRM-Integration.

**Variation 3: Haushalts-Automation (Smart Home, Einkauf, Putzen)**
Smart Home Routinen, Einkaufslisten-Automation, Putzplan-Erinnerungen, Vertragsverlängerungen prüfen, Abo-Management.

**Variation 4: Kreative Automation (Content-Erstellung, Design)**
Canva Templates, Text-Generierung, Bild-Optimierung, Format-Konvertierung, Wiederverwendung von Content, Asset-Management.

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[activecampaign-automation|activecampaign-automation]]
  - [[mailchimp-automation|mailchimp-automation]]
  - [[sendgrid-automation|sendgrid-automation]]
