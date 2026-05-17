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
id: "#3161"
titel: "library migration"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["library", "migration", "data", "access", "connection"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "abhinavme1004@gmail.com"
erstellt: "2026-03-10"
---

## Prompt

```
🔴 1. Data Access & Connection Management
These are critical because they affect performance, scalability, and outages.

🔹 Redis
❌ Jedis (older pattern, topology issues)

✅ Lettuce (reactive, auto-reconnect)

✅ Valkey Glide (AWS recommended)

🔹 JDBC Connection Pool
❌ Apache DBCP

❌ C3P0

✅ HikariCP (default in Spring Boot, fastest, stable)

 

🔹 ORM / Persistence
❌ Old Hibernate 4.x

❌ MyBatis legacy configs

✅ Hibernate 6+

✅ Spring Data JPA latest
```

## Anwendung

**Thema: Data Access, Connection Management** — Dein persoenlicher Kultur- und Unterhaltungsberater. Die KI empfiehlt passende Medien basierend auf deinem Geschmack.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne 2-3 Beispiele die dir gefallen fuer bessere Empfehlungen
- Gib die gewuenschte Stimmung an (energetisch, entspannt, melancholisch)
- Frage nach weniger bekannten Geheimtipps
- Bitte um eine sortierte Top-10-Liste mit Begruendung

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[iconsax-library|iconsax-library]]
  - [[terraform-module-library|terraform-module-library]]
  - [[prompt-library|prompt-library]]
