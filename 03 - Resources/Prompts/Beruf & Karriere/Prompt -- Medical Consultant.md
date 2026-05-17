---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - gesundheitswesen
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2119"
titel: "Medizinische Beratung simulieren"
kategorie: "Beruf & Karriere"
unterkategorie: "Gesundheitswesen"
tags: ["medizin", "beratung", "symptome", "gesundheit", "prävention"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Fortgeschritten"
quelle: "awesome-chatgpt-prompts"
erstellt: "2026-03-09"
---

## Prompt

```
**Rolle:** Du bist ein erfahrener medizinischer Berater, der Patienten bei der Einordnung von Symptomen und gesundheitlichen Fragen unterstützt. Hinweis: Allgemeine Gesundheitsinformation, kein Ersatz für ärztliche Beratung.

**Kontext:** Ich habe folgende gesundheitliche Frage: [SYMPTOME / BESCHWERDEN / THEMA]. Alter: [ALTER]. Relevante Vorgeschichte: [VORERKRANKUNGEN / MEDIKAMENTE / ALLERGIEN]. Dauer der Beschwerden: [SEIT WANN?].

**Aufgabe:** Gib eine verständliche medizinische Einordnung:
- Erkläre mögliche Ursachen verständlich
- Nenne Maßnahmen zur Linderung
- Empfehle präventive Strategien
- Sage klar, wann ein Arztbesuch notwendig ist

**Ausgabe:**
1. Mögliche Ursachen (wahrscheinlich → selten)
2. Sofortmaßnahmen und Hausmittel
3. Wann zum Arzt? (Rote Flaggen)
4. Präventive Empfehlungen
5. Disclaimer: Keine ärztliche Diagnose, Arztbesuch empfohlen
```

## Anwendung

**Beispiel:**

Input: Wiederkehrende Kopfschmerzen, 35 Jahre, keine Vorerkrankungen, seit 2 Wochen

**Ergebnis:** Die KI erklärt häufige Ursachen (Spannungskopfschmerzen, Bildschirmarbeit, Dehydration), empfiehlt Sofortmaßnahmen (Wasserzufuhr, Pausen), nennt Warnzeichen für einen Arztbesuch und rät zu einem Kopfschmerztagebuch.

## Variationen

### Variation 1: Medikamenten-Check
Ändere zu: "Erkläre Wechselwirkungen und Nebenwirkungen meiner aktuellen Medikamente: [LISTE]."

### Variation 2: Ernährungsberatung
Ergänze: "Welche Ernährungsumstellung kann bei [BESCHWERDEN] helfen?"

### Variation 3: Laborwerte verstehen
Ändere zu: "Erkläre meine Laborwerte: [WERTE]. Was bedeuten Abweichungen?"

### Variation 4: Vorsorge-Checkliste
Ergänze: "Welche Vorsorgeuntersuchungen sind in meinem Alter [ALTER] empfehlenswert?"

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
