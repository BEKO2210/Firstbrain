# Firstbrain — Obsidian Starter Vault

Ein vorkonfiguriertes Obsidian-Vault fuer alle, die ihre Notizen, Projekte und Ideen endlich an einem Ort haben wollen. Kein Chaos mehr, keine vergessenen Zettel — einfach ein System, das mitwächst.

## Warum?

Ich hab jahrelang Notizen in verschiedenen Apps verstreut gehabt. Google Docs hier, Apple Notes da, Slack-Nachrichten an mich selbst, und irgendwo eine Textdatei mit "WICHTIG" im Namen. Irgendwann war's genug. Ich wollte **ein** System, das alles abdeckt — und das hab ich mir gebaut.

Das hier ist das Ergebnis. Es basiert auf drei bewaehrten Methoden, die ich so zusammengesteckt hab, dass sie fuer den Alltag taugen:

- **PARA** — Vier Ordner statt zwanzig: Projekte, Bereiche, Wissen, Archiv. Fertig.
- **Zettelkasten** — Jede Idee in eigenen Worten aufschreiben und mit anderen Ideen verlinken. Klingt simpel, funktioniert aber erstaunlich gut.
- **Maps of Content** — Uebersichtsseiten statt endloser Ordner-Verschachtelung.

## Was steckt drin?

```
00 - Inbox/          Alles Neue kommt erstmal hier rein
01 - Projects/       Projekte mit Anfang und Ende
02 - Areas/          Lebensbereiche (Beruf, Familie, Hobbys...)
03 - Resources/      Wissen: Buecher, Tools, Ideen, Kontakte
04 - Archive/        Fertiges und Abgelegtes
05 - Templates/      12 Vorlagen fuer verschiedene Notiztypen
06 - Atlas/MOCs/     8 Uebersichtsseiten zur Navigation
07 - Extras/         Bilder und Anhaenge
```

Dazu: vorkonfigurierte Obsidian-Settings (Graph-Farben, Daily Notes, Attachment-Ordner) und ein Dashboard als Startseite.

## Loslegen

**1.** Repo klonen oder als ZIP runterladen:
```bash
git clone https://github.com/BEKO2210/Firstbrain.git
```

**2.** In Obsidian als Vault oeffnen ("Open folder as vault").

**3.** Community Plugin **Dataview** installieren (Einstellungen → Community Plugins → Durchsuchen). Ohne Dataview funktionieren die automatischen Listen auf den MOC-Seiten nicht.

**4.** `Home.md` oeffnen. Von dort erreichst du alles — inklusive Ein-Klick-Links zum Erstellen neuer Notizen.

Fuer eine ausfuehrliche Anleitung: Oeffne `START HERE.md` im Vault.

## Templates

Es gibt 12 Vorlagen, die du per Ctrl+Shift+T einfuegen kannst:

| Vorlage | Wofuer |
|---------|--------|
| Project | Aktive Projekte mit Tasks und Deadline |
| Area | Lebensbereiche und Verantwortungen |
| Resource | Buecher, Kurse, Artikel |
| Tool | Software und Dienste |
| Zettel | Eigene Gedanken und Ideen (atomar) |
| Decision | Entscheidungen mit Pro/Contra |
| Person | Kontakte und Netzwerk |
| Meeting | Meeting-Protokolle |
| Code Snippet | Code-Schnipsel mit Kontext |
| Daily Note | Tagesnotizen |
| Weekly Review | Wochenrueckblick |
| Monthly Review | Monatsrueckblick |

Jede Vorlage hat korrektes Frontmatter, eine saubere Struktur und einen Verbindungen-Abschnitt fuer Wiki-Links.

## Navigation im Vault

Die `Home.md` ist dein Startpunkt. Dort gibt es:

- **Ein-Klick-Erstellung** — Tabelle mit Links zum sofortigen Anlegen neuer Notizen
- **Aktive Projekte** — Automatische Liste aller laufenden Projekte
- **Offene Aufgaben** — Alle unerledigten Tasks auf einen Blick
- **Letzte Aenderungen** — Was wurde zuletzt bearbeitet?

Die 8 MOCs (Maps of Content) bieten Uebersicht nach Thema: Projekte, Bereiche, Ressourcen, Tools, Kontakte, Code, Meetings, Entscheidungen.

## Claude Code

Das Vault hat eine `CLAUDE.md`, die Claude Code beim Start automatisch liest. Damit kennt er die Ordnerstruktur, alle Templates und die Konventionen. Einfach `claude` im Vault-Ordner starten und z.B. sagen:

- *"Erstelle ein neues Projekt: Kueche renovieren"*
- *"Was sind meine offenen Aufgaben?"*
- *"Schreib einen Zettel zur Idee XY"*

Funktioniert aber genauso gut ohne Claude Code — ist ein normaler Obsidian Vault.

## Empfohlene Plugins

| Plugin | Warum | Pflicht? |
|--------|-------|----------|
| [Dataview](https://github.com/blacksmithgu/obsidian-dataview) | Automatische Listen und Tabellen | Ja |
| [Templater](https://github.com/SilentVoid13/Templater) | Erweiterte Template-Variablen | Nein |
| [Calendar](https://github.com/liamcain/obsidian-calendar-plugin) | Kalender fuer Daily Notes | Nein |

## Mitmachen

Ideen, Bugs oder neue Templates? Gerne — schau in die [CONTRIBUTING.md](CONTRIBUTING.md).

## Lizenz

MIT — Nimm's, benutz's, pass es an.

---

[![Star History Chart](https://api.star-history.com/svg?repos=BEKO2210/Firstbrain&type=Date)](https://star-history.com/#BEKO2210/Firstbrain&Date)
