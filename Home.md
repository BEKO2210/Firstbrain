---
type: home
created: 2026-04-11
updated: 2026-04-11
tags:
  - navigation
  - home
  - hub
---

# ◢◤ Firstbrain

> Du denkst — ich organisiere. | Neural PKM Engine v3.3

---

## 🧠 Jetzt

| | |
|--|--|
| 📅 Täglich | `/daily` · [[00 - Inbox/Inbox\|Inbox öffnen]] |
| 🔄 Synchronisieren | `/scan` — Vault-Index auffrischen |
| 📋 Briefing | `/briefing` — 1-Minuten-Überblick |
| 🔍 Suchen | `/search [Begriff]` — Semantische Suche |
| ⚙️ Verarbeiten | `/process` — Inbox ausführen |

---

## 🗺️ Wissensgebiete

### Technologie
| Gebiet | Skills | Prompts |
|--------|-------:|---------|
| 💻 [[Software Entwicklung]] | 373 | [[Technik im Alltag]] (743) |
| ☁️ [[Cloud & Infrastruktur]] | 157 | — |
| 🤖 [[KI & Machine Learning]] | 129 | — |
| 🎨 [[Design & Kreativitaet]] | 75 | [[Bild & Visualisierung]] (513) · [[Kreativität & Freizeit]] (19) |

### Business & Karriere
| Gebiet | Skills | Prompts |
|--------|-------:|---------|
| 📈 [[Business & Marketing]] | 120 | [[Beruf & Karriere]] (260) |
| ✍️ [[Kommunikation & Content]] | 107 | [[Kommunikation & Beziehungen]] (150) |
| 🔒 [[Sicherheit & Datenschutz]] | 85 | — |

### Daten & Produktivität
| Gebiet | Skills | Prompts |
|--------|-------:|---------|
| 📊 [[Daten & Analyse]] | 42 | — |
| ⚡ [[Produktivitaet & Werkzeuge]] | 240 | — |

### Leben & Wachstum
| Gebiet | Skills | Prompts |
|--------|-------:|---------|
| 🌱 [[Leben & Lernen]] | 60 | [[Lernen & Wachstum]] (353) · [[Alltag & Leben]] (219) · [[Gesundheit & Wohlbefinden]] (129) · [[Spezielle Situationen]] (110) |

---

## 📚 Bibliotheken

| | Link | Inhalt |
|-|------|--------|
| 🔧 | [[Skills Uebersicht]] | 1.388 Skills in 10 Gebieten |
| 💬 | [[Prompt Sammlung]] | 2.493 Prompts in 9 Kategorien |
| 🗂️ | [[Ressourcen]] | Alle Ressourcen |
| 📄 | [[Vorlagen]] | Alle Templates |

---

## 📁 Vault-Navigation

| Bereich | Link |
|---------|------|
| Projekte | [[Projekte]] |
| Lebensbereiche | [[Lebensbereiche]] |
| Entscheidungen | [[Entscheidungen]] |
| Meetings | [[Meetings]] |
| Tools & Software | [[Tools & Software]] |
| Kontakte | [[Kontakte]] |
| Code-Snippets | [[Code & Snippets]] |
| System & KI | [[System]] |

---

## ➕ Neue Notiz erstellen

| Typ | Befehl |
|-----|--------|
| Projekt | `/create project` |
| Bereich | `/create area` |
| Zettel / Idee | `/create zettel` |
| Tool | `/create tool` |
| Entscheidung | `/create decision` |
| Person | `/create person` |
| Meeting | `/create meeting` |
| Code-Snippet | `/create snippet` |
| Ressource | `/create resource` |

---

## 📊 Status

### Aktive Projekte
```dataview
TABLE status, priority, area
FROM "01 - Projects"
WHERE status = "active"
SORT priority ASC
```

### Letzte Änderungen
```dataview
TABLE file.mtime AS "Geändert", type
FROM ""
WHERE type AND type != "home" AND type != "domain" AND type != "kategorie"
AND !contains(file.folder, ".claude")
AND !contains(file.folder, ".agents")
AND !contains(file.folder, "03 - Resources/Skills")
SORT file.mtime DESC
LIMIT 10
```

---

## ℹ️ Hilfe

- [[START HERE]] — Onboarding & Einrichtung
- [[Workflow Guide]] — Tägliche Routinen & Abläufe
- [[Cheatsheet]] — Alle Befehle auf einen Blick
- [[Tag Conventions]] — Tag-Taxonomie & Standards

---

## Connections

- **System:** [[MEMORY]], [[Workflow Guide]], [[START HERE]], [[System]]
- **Bibliotheken:** [[Skills Uebersicht]], [[Prompt Sammlung]], [[Ressourcen]]
- **Domains:** [[Software Entwicklung]], [[KI & Machine Learning]], [[Business & Marketing]], [[Leben & Lernen]]
