---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - beruf
  - importiert
  - karriere
  - pkm
  - prompt
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2982"
titel: "ATS Resume Scanner Simulator"
kategorie: "Beruf & Karriere"
unterkategorie: "Importiert"
tags: ["resume", "scanner", "simulator", "hardened", "mercy"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "thanos0000@gmail.com"
erstellt: "2026-03-09"
---

## Prompt

```
## ATS Resume Scanner Simulator (Hardened v1.4 - "No Mercy" Edition)
**Author:** Scott M
**Last Updated:** 2026-03-05

## GOAL
Simulate a high-accuracy, legacy ATS scanner (Taleo/Workday style). Focus: **Maximum Parseability.** If a bot can't read it, it doesn't exist.

---

## EXECUTION STEPS

### Step 1: Strategic JD Extraction
- Identify 15–25 high-importance keywords (Hard Skills > Certs > Soft Skills).
- Identify required years of experience and education levels.

### Step 2: Zero-Friction Formatting Audit (RED FLAG ZONE)
Scan for "Scanner Sinkers" and flag as **RED FLAG**:
- **Naked Acronyms:** Using "PMP," "AWS," or "ROI" without spelling them out first. (High Risk).
- **Contact Isolation:** Info trapped in Header/Footer (many systems ignore these).
- **Table/Column Traps:** Multi-column layouts that scramble reading order.
- **Graphic Reliance:** Skills shown as "progress bars," icons, or images.
- **Fancy Bullets:** Non-standard icons/symbols (must be simple dots/dashes).
- **Non-Standard Headings:** Headings like "My Path" instead of "Experience."
- **Date Complexity:** Non-standard formats (Use MM/YYYY for best results).

### Step 3: Keyword & Logic Match
- **Exact Match:** Highest weight. 
- **Acronym Check:** Cross-reference acronyms against their full-text versions.
- **Hierarchy:** Check Job Titles → Skills → Bullets.

### Step 4: Scoring Model (0–100%)
- **Keyword Coverage (40%)**
- **Skills/Quals Alignment (25%)**
- **Experience Relevance (15%)**
- **Acronym Compliance (10%):** Deduct -2 points for every "Naked Acronym."
- **Parseability Integrity (10%):** - Deduct: Tables (-3), Headers/Footers (-2), Fancy Graphics (-3), Columns (-2).

### Step 5: Output Format (MANDATORY)
- **ATS Match Score:** XX%
- **Analysis Confidence:** XX% 
- **Top Matched Keywords:** (List 8–10)
- **Missing/Weak Keywords:** (List 8–12 with reasoning)
- **PARSEABILITY AUDIT:** - List every **RED FLAG** detected. 
  - Specifically call out "Naked Acronyms" found.
- **Optimization Recommendations:** (4–6 steps to hit 80%+)
- **Plain Text Preview:** Show a 5-line snippet of how a legacy ATS "sees" your resume text.

---

## USER VARIABLES
- **TARGET JOB DESCRIPTION:** [Paste text or URL]
- **RESUME CONTENT:** [Paste text or File]
```

## Anwendung

**Thema: Ats Resume, Scanner Simulator** — Unterstuetzt dich bei der Jobsuche und Karriereplanung. Die KI erstellt professionelle Bewerbungsunterlagen und Vorbereitungen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne die konkrete Stellenausschreibung oder Branche
- Beschreibe deine bisherige Erfahrung in Stichpunkten
- Frage nach branchenspezifischen Keywords fuer den Lebenslauf
- Bitte um Uebungsfragen fuers Vorstellungsgespraech

## Connections

- **Domain:** [[Business & Marketing]]
- **Kategorie:** [[Beruf & Karriere]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[vulnerability-scanner|vulnerability-scanner]]
  - [[skill-scanner|skill-scanner]]
  - [[enhance-prompt|enhance-prompt]]
