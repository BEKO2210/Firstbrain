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
id: "#2343"
titel: "Form Validation Rules for Leave Requests"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["form", "validation", "rules", "leave", "requests"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "muhtesemozgur9"
erstellt: "2026-03-09"
---

## Prompt

```
{
  "rules": [
    {
      "leaveType": "Evlilik İzni",
      "validity": "Personelin evlenmesi halinde 3 iş günü şeklinde kullandırılır.",
      "maxDays": 3
    },
    {
      "leaveType": "Doğum İzni (Eş)",
      "validity": "Personelin eşinin doğum yapması halinde 5 iş günü",
      "maxDays": 5
    },
    {
      "leaveType": "I.Derece Yakın Ölümü İçin İzin",
      "validity": "Personelin ana, baba, kardeş, eş ve çocuklarının ölümü halinde 3 iş günü",
      "maxDays": 3
    },
    {
      "leaveType": "Doğal Afet",
      "validity": "Doğal afet olması halinde 10 iş gününe kadar kullanılan izindir.",
      "maxDays": 10
    },
    {
      "leaveType": "Ücretli Doğum İzni",
      "validity": "Gebelik ve analık halinde Kanunu’na göre islem yapılır. Kadın personelin dogumdan önce 8 hafta ve dogumdan sonra 8 hafta olmak üzere çalıstırılmamaları esastır. Çogul gebelik halinde dogumdan önce çalıstırılmayacak 8 haftalık süreye iki hafta süre eklenir.",
      "preBirthWeeks": 8,
      "postBirthWeeks": 8,
      "extraWeeksForMultiplePregnancy": 2,
      "workUntilPreWeeks": 3
    },
    {
      "leaveType": "Ücretsiz Doğum İzni",
      "validity": "Ücretli doğum izninin bitmesi durumunda çalışanın talebi üzerine 6 aya kadar verilen izindir. Parçalar halinde kullanılamaz.",
      "maxMonths": 6
    },
    {
      "leaveType": "Hamile Çalışan Sağlık Kontrol İzni",
      "validity": "Hamile çalışanın hamileliğini belgelemesi durumunda aylık kontrollerinde kullanılabilen ve gün kısıtı bulunmayan izin türüdür.",
      "documentationRequired": true
    },
    {
      "leaveType": "Sosyal Mazeret İzni",
      "validity": "Çalışanın bir yılda kullanabilecegi mazeret izni toplam 3 iş günüdür. 3 günü aşan izinler yıllık izinden düşürülür.",
      "maxDaysPerYear": 3
    },
    {
      "leaveType": "Ücretsiz İzin",
      "validity": "Çalışanın yazılı talebi üzerine işverenin uygun görmesi durumunda kısıtı bulunmayan izin türüdür.",
      "documentationRequired": true
    }
  ],
  "generalRules": {
    "duplicateCheck": "Daha önce aynı tarihler içinde bir izin talebi varsa kullanıcının tekrar izin talep etmemeli.",
    "applicableFormId": 1
  }
}
```

## Anwendung

**Thema: Personelin Evlenmesi, Personelin Ana** — Perfekt fuer kreative Schreibprojekte und Inspiration. Die KI generiert Texte in verschiedenen Genres und Stilen.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Gib Genre und Stimmung an (lustig, dunkel, romantisch)
- Nenne eine gewuenschte Wortanzahl
- Frage nach alternativen Enden oder Perspektiven
- Bitte die KI, im Stil eines bestimmten Autors zu schreiben

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[form-cro|form-cro]]
  - [[deployment-validation-config-validate|deployment-validation-config-validate]]
  - [[monte-carlo-validation-notebook|monte-carlo-validation-notebook]]
