---
type: regel
created: 2026-04-11
parent-skill: "postgres-best-practices"
domain: software-development
category: database
tags:
  - skill-referenz
  - software-development
  - database
---

## [Rule Title]

[1-2 sentence explanation of the problem and why it matters. Focus on performance impact.]

**Incorrect (describe the problem):**

```sql
-- Comment explaining what makes this slow/problematic
CREATE INDEX users_email_idx ON users(email);

SELECT * FROM users WHERE email = 'user@example.com' AND deleted_at IS NULL;
-- This scans deleted records unnecessarily
```

**Correct (describe the solution):**

```sql
-- Comment explaining why this is better
CREATE INDEX users_active_email_idx ON users(email) WHERE deleted_at IS NULL;

SELECT * FROM users WHERE email = 'user@example.com' AND deleted_at IS NULL;
-- Only indexes active users, 10x smaller index, faster queries
```

[Optional: Additional context, edge cases, or trade-offs]

Reference: [Postgres Docs](https://www.postgresql.org/docs/current/)

## Connections

- **Gehoert zu:** [[postgres-best-practices]]
- **Pfad:** `rules/_template.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Datenbanken]]
