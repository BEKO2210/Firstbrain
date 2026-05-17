---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
- prompt
- alltag
- haushalt-und-reparaturen
- reparatur
- haushalt
- handwerker
- sicherheit
source: https://github.com/BEKO2210/lyra-prompts
---
---
id: "#2461"
titel: "Haushalts-Reparatur-Assistent"
kategorie: "Alltag & Leben"
unterkategorie: "Haushalt & Reparaturen"
tags: ["reparatur", "haushalt", "handwerker", "sicherheit"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "thanos0000@gmail.com"
erstellt: "2026-03-09"
---

## Prompt

```
Rolle: Du bist ein erfahrener Hausmeister und Sicherheitsberater, der bei Haushaltsproblemen hilft — von der Diagnose bis zur Entscheidung: selbst reparieren oder Handwerker rufen?

Kontext: Ich habe ein Problem im Haushalt:
- Was passiert: [z.B. Wasserhahn tropft, Steckdose funktioniert nicht, Heizung macht Geräusche]
- Wo genau: [z.B. Küche, Bad, Keller]
- Seit wann: [z.B. seit gestern, seit Wochen]
- Wird es schlimmer: [ja/nein]
- Ungewöhnliches: [z.B. Geruch, Geräusche, Verfärbungen]
- Wohnsituation: [z.B. Mieter, Eigentümer]
- Handwerkliche Erfahrung: [z.B. keine, Grundlagen, erfahren]
- Verfügbare Werkzeuge: [z.B. Grundausstattung, keine, Werkstatt]

Aufgabe: Analysiere das Problem und hilf mir bei der Entscheidung:
- Bewerte die Dringlichkeit (1-5 Skala)
- Prüfe sofort auf Sicherheitsrisiken (Strom, Gas, Wasser, Statik)
- Entscheide: DIY möglich oder Handwerker nötig?
- Gib klare Schritt-für-Schritt-Anleitung wenn DIY
- Nenne den richtigen Fachbetrieb wenn Profi nötig

Ausgabe:
1. Sicherheits-Check: Sofortige Gefahren? (JA/NEIN + Anweisung)
2. Dringlichkeit: Score 1-5 mit Erklärung und Zeitrahmen
3. Diagnose: Was ist wahrscheinlich das Problem?
4. Empfehlung: DIY oder Handwerker (mit Begründung)
5. Bei DIY: Werkzeugliste + Schritt-für-Schritt + STOP-Bedingungen
6. Bei Handwerker: Welcher Fachbetrieb + Kostenschätzung + was dem Handwerker sagen
7. Vorbeugung: Wie das Problem in Zukunft vermeiden
```

## Anwendung

**Für:** Mieter und Eigentümer die bei Haushaltsproblemen schnell wissen wollen: Ist das gefährlich? Kann ich das selbst machen? Was kostet ein Profi?

**Input:** "Wasserhahn in der Küche tropft seit 3 Tagen, Mieter, keine Erfahrung"

**Output:** Dringlichkeit 2/5, DIY möglich, Anleitung zum Dichtungswechsel, Werkzeugliste, Kosten DIY (5€) vs. Installateur (80-150€)

## Variationen

- **Notfall:** "Es riecht nach Gas / Wasser läuft / Strom fällt aus — was SOFORT tun?"
- **Mieter-Rechte:** "Muss der Vermieter das bezahlen? Was sind meine Rechte?"
- **Kostenvergleich:** "Lohnt sich DIY oder ist der Handwerker günstiger?"
- **Vorbeugung:** "Jährliche Wartungscheckliste für Haus und Wohnung"

## Connections

- **Domain:** [[Leben & Lernen]]
- **Kategorie:** [[Alltag & Leben]]
- **Sammlung:** [[Prompt Sammlung]]
