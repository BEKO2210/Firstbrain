---
type: inbox
tags:
  - inbox
  - navigation
---

# Inbox

> Hier landen alle neuen Gedanken, Ideen und Notizen.
> Regelmaessig durchgehen und in die richtige Kategorie verschieben.

## Neue Eintraege

<!-- Schreibe neue schnelle Notizen hier -->

-

## Regeln fuer die Inbox

1. **Capture** - Alles sofort notieren, nicht filtern
2. **Clarify** - Was bedeutet das? Ist es actionable?
3. **Organize** - In den richtigen Ordner verschieben:
   - Actionable + Projekt? -> `01 - Projects`
   - Verantwortungsbereich? -> `02 - Areas`
   - Referenzmaterial? -> `03 - Resources`
   - Nicht mehr relevant? -> `04 - Archive`
4. **Review** - Woechentlich die Inbox leeren ([[Weekly Review]])

## Unverarbeitete Notizen

```dataview
LIST
FROM "00 - Inbox"
WHERE file.name != "Inbox"
SORT file.ctime DESC
```

---

[[Home]] | [[Projects MOC]]
