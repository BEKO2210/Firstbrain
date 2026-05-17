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

## Use Partial Indexes for Filtered Queries

Partial indexes only include rows matching a WHERE condition, making them smaller and faster when queries consistently filter on the same condition.

**Incorrect (full index includes irrelevant rows):**

```sql
-- Index includes all rows, even soft-deleted ones
create index users_email_idx on users (email);

-- Query always filters active users
select * from users where email = 'user@example.com' and deleted_at is null;
```

**Correct (partial index matches query filter):**

```sql
-- Index only includes active users
create index users_active_email_idx on users (email)
where deleted_at is null;

-- Query uses the smaller, faster index
select * from users where email = 'user@example.com' and deleted_at is null;
```

Common use cases for partial indexes:

```sql
-- Only pending orders (status rarely changes once completed)
create index orders_pending_idx on orders (created_at)
where status = 'pending';

-- Only non-null values
create index products_sku_idx on products (sku)
where sku is not null;
```

Reference: [Partial Indexes](https://www.postgresql.org/docs/current/indexes-partial.html)

## Connections

- **Gehoert zu:** [[postgres-best-practices]]
- **Pfad:** `rules/query-partial-indexes.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Datenbanken]]
