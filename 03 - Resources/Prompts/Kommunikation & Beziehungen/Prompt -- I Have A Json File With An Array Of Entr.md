---
type: resource
created: 2026-04-08
updated: 2026-04-09
tags:
  - prompt
  - kommunikation
  - beziehungen
source: https://github.com/BEKO2210/lyra-prompts
---
---
id: '#3963'
titel: I have a json file with an array of entries that look like this
kategorie: Kommunikation & Beziehungen
unterkategorie: Importiert
tags:
- json
- file
- array
- entries
- look
plattformen:
- ChatGPT
- Claude
- Gemini
schwierigkeit: Anfänger
quelle: openrlhf-UltraFeedback
erstellt: '2026-03-18'
---


## Prompt

```
I have a json file with an array of entries that look like this:

```
{
 "formatted\_number": "+49 123 1234567",
 "duration": "108",
 "subscription\_id": "894921002718983222FF",
 "photo\_id": "0",
 "post\_dial\_digits": "",
 "number": "+491231234567",
 "countryiso": "DE",
 "geocoded\_location": "Deutschland",
 "block\_reason": "0",
 "subscription\_component\_name": "com.android.phone/com.android.services.telephony.TelephonyConnectionService",
 "add\_for\_all\_users": "1",
 "numbertype": "2",
 "features": "0",
 "last\_modified": "1675171583824",
 "\_id": "1119",
 "new": "1",
 "date": "1675171468367",
 "name": "Vorname Nachname",
 "type": "1",
 "presentation": "1",
 "via\_number": "",
 "normalized\_number": "+491231234567",
 "phone\_account\_address": "",
 "phone\_account\_hidden": "0",
 "lookup\_uri": "content://com.android.contacts/contacts/lookup/4073r119-2A52504634464C5242503240504656/119",
 "matched\_number": "+49 162 1751853",
 "transcription\_state": "0",
 "display\_name": "Autoforum Teltow"
 },
```

I want to do the following:
- filter for a list of phone numbers
- generate a table displaying name, telephone number, date, duration, and if this an incoming or outgoing call

Please write a nodejs program that does this
```

## Anwendung

**Thema: Json File, Json** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne die Programmiersprache und Version
- Beschreibe den Kontext: Lernprojekt, Arbeit, oder Hobby
- Frage nach Code-Beispielen mit Kommentaren
- Bitte um Best Practices und haeufige Fehlerquellen

## Connections

- **Domain:** [[Kommunikation & Content]]
- **Kategorie:** [[Kommunikation & Beziehungen]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
