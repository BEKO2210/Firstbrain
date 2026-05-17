---
type: regel
created: 2026-04-11
parent-skill: "react-best-practices"
domain: software-development
category: frontend
tags:
  - skill-referenz
  - software-development
  - frontend
---

## Per-Request Deduplication with React.cache()

Use `React.cache()` for server-side request deduplication. Authentication and database queries benefit most.

**Usage:**

```typescript
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null
  return await db.user.findUnique({
    where: { id: session.user.id }
  })
})
```

Within a single request, multiple calls to `getCurrentUser()` execute the query only once.

## Connections

- **Gehoert zu:** [[react-best-practices]]
- **Pfad:** `rules/server-cache-react.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Frontend Entwicklung]]
