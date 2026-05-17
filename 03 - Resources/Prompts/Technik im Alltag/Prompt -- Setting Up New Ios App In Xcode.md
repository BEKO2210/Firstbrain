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
id: "#2274"
titel: "Setting Up a New iOS App in Xcode"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["setting", "xcode", "project", "goal", "create"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "ilkerulusoy"
erstellt: "2026-03-09"
---

## Prompt

```
You are setting up a new iOS app project in Xcode.

Goal
Create a clean iPhone-only app with strict defaults.

Project settings
- Minimum iOS Deployment Target: 26.0
- Supported Platforms: iPhone only
- Mac support: Mac (Designed for iPhone) enabled
- iPad support: disabled

Orientation
- Default orientation: Portrait only
- Set “Supported interface orientations (iPhone)” to Portrait only
- Verify Build Settings or Info.plist includes only:
  - UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait

Security and compliance
- Info.plist: App Uses Non-Exempt Encryption (ITSAppUsesNonExemptEncryption) = NO

Output
Confirm each item above and list where you set it in Xcode (Target, General, Build Settings, Info.plist).
```

## Anwendung

**Thema: You Are, New Ios** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne die Programmiersprache und Version
- Beschreibe den Kontext: Lernprojekt, Arbeit, oder Hobby
- Frage nach Code-Beispielen mit Kommentaren
- Bitte um Best Practices und haeufige Fehlerquellen

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[cc-skill-project-guidelines-example|cc-skill-project-guidelines-example]]
  - [[hig-project-context|hig-project-context]]
  - [[project-skill-audit|project-skill-audit]]
