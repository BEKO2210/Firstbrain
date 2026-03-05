---
type: resource
created: 2024-01-01
tags:
  - guide
  - onboarding
---

# Willkommen in deinem Second Brain

Du hast gerade dein persoenliches Wissensmanagementsystem eingerichtet. Hier ist alles, was du wissen musst — ohne Fachchinesisch.

---

## Was ist das hier?

Stell dir vor, du haettest ein zweites Gehirn, das nichts vergisst. Jede Idee, jedes Projekt, jede Notiz — alles an einem Ort, alles miteinander verknuepft.

Dieses System basiert auf drei einfachen Prinzipien:

1. **PARA** — Vier Ordner, die alles abdecken: Projekte, Lebensbereiche, Wissen, Archiv
2. **Zettelkasten** — Schreib Ideen in eigenen Worten auf und verlinke sie miteinander
3. **Maps of Content** — Uebersichtsseiten, die dir den Weg zeigen

Klingt kompliziert? Ist es nicht. Lies weiter.

---

## In 5 Minuten startklar

### Schritt 1: Plugins aktivieren

Oeffne Obsidian-Einstellungen → **Community Plugins** → Installiere:

| Plugin | Warum? |
|--------|--------|
| **Dataview** | Zeigt automatisch Listen deiner Projekte, Aufgaben etc. |
| **Templater** | Fuellt Templates automatisch aus (Datum, Titel etc.) |
| **Calendar** | Kalenderansicht fuer deine Daily Notes (optional) |

> Dataview ist das einzige Plugin, das du wirklich brauchst. Der Rest ist Komfort.

### Schritt 2: Dashboard oeffnen

Geh zu [[Home]] — das ist dein Startpunkt. Von dort erreichst du alles.

### Schritt 3: Erste Notiz erstellen

Auf der [[Home]]-Seite siehst du die Tabelle **"Neue Notiz erstellen"**. Klick einfach auf den passenden Link — z.B. `Neues Projekt`. Obsidian erstellt eine leere Seite. Dann:

1. **Ctrl+Shift+T** druecken (oder Cmd+Shift+T auf Mac)
2. Das passende Template auswaehlen (z.B. `Project`)
3. Felder ausfuellen, fertig

Danach benennst du die Notiz um (F2) — z.B. von "Neues Projekt" zu "Website Relaunch".

---

## Die Ordnerstruktur

Du musst dir nur diese Ordner merken:

```
00 - Inbox/          Was reinkommt, kommt hierhin
01 - Projects/       Aktive Projekte (haben ein Ende)
02 - Areas/          Lebensbereiche (laufen immer weiter)
03 - Resources/      Wissen, Buecher, Tools, Ideen
04 - Archive/        Was fertig oder nicht mehr relevant ist
05 - Templates/      Vorlagen — nicht anfassen, nur nutzen
06 - Atlas/MOCs/     Uebersichtsseiten (Navigation)
07 - Extras/         Bilder, Anhaenge, Sonstiges
```

**Faustregel:** Weisst du nicht wohin? → `00 - Inbox`. Spaeter verschiebst du es an den richtigen Ort.

---

## Wie du taeglich damit arbeitest

### Morgens (2 Minuten)
- Oeffne [[Home]] → schau dir deine aktiven Projekte und offenen Aufgaben an
- Erstelle eine Daily Note (Ctrl+N → Template `Daily Note`)

### Untertags
- Idee? → [[Neuer Zettel]] auf [[Home]] klicken und aufschreiben
- Neues Projekt? → [[Neues Projekt]] auf [[Home]] klicken
- Alles was reinkommt → ab in die `00 - Inbox`

### Abends (5 Minuten)
- Inbox durchgehen: Was davon ist ein Projekt? Ein Zettel? Verschieben.
- Offene Aufgaben abhaken

### Woechentlich
- Weekly Review machen → Template `Weekly Review` nutzen
- Projekte pruefen: Laeuft alles? Blockiert etwas?

---

## Die wichtigsten Regeln

Es gibt nur vier:

1. **Jede Notiz braucht einen Typ** — Im Frontmatter steht immer `type: project` oder `type: zettel` etc.
2. **Jede Notiz braucht Verbindungen** — Am Ende jeder Notiz gibt es einen Abschnitt `## Verbindungen` mit Links zu verwandten Notizen
3. **Schreib in eigenen Worten** — Copy-Paste bringt dir nichts. Umformulieren = Verstehen.
4. **Lieber oft kurz als selten lang** — Eine Notiz pro Tag ist besser als ein Mammut-Dokument pro Monat

---

## Claude Code benutzen

Du kannst dieses Second Brain auch ueber das Terminal mit Claude Code verwalten. Starte Claude Code im Vault-Ordner und gib diesen Startbefehl ein:

```
Lies die CLAUDE.md und mach dich mit meinem Second Brain vertraut.
Ich moechte dass du mir hilfst, Notizen zu erstellen, zu suchen
und zu verknuepfen. Halte dich an die Templates und Konventionen.
```

Danach kannst du z.B. sagen:
- *"Erstelle ein neues Projekt: Website Relaunch"*
- *"Suche alle Notizen zum Thema Marketing"*
- *"Was sind meine offenen Aufgaben?"*
- *"Erstelle einen Zettel zur Idee XY"*
- *"Mach ein Weekly Review fuer diese Woche"*

---

## FAQ

**Muss ich alle Ordner nutzen?**
Nein. Starte mit Projekten und Zettel-Notizen. Der Rest kommt von selbst.

**Was wenn ich eine Notiz falsch einsortiert habe?**
Verschieben. Die Wiki-Links funktionieren trotzdem (Obsidian aktualisiert sie automatisch).

**Brauche ich das Archiv?**
Erst wenn du fertige Projekte hast. Am Anfang bleibt `04 - Archive` leer.

**Wie viele Tags soll eine Notiz haben?**
2-5 reichen. Weniger ist mehr. Details stehen in [[Tag Conventions]].

---

## Naechste Schritte

- [ ] Erstes Projekt anlegen → Klick auf [[Neues Projekt]] in [[Home]]
- [ ] Zwei Lebensbereiche definieren (z.B. Beruf, Gesundheit)
- [ ] Eine Idee als Zettel festhalten
- [ ] Morgen: Erste Daily Note schreiben
- [ ] In einer Woche: Erstes Weekly Review machen

---

> *Das perfekte System gibt es nicht. Das beste System ist das, das du tatsaechlich benutzt. Fang klein an.*
