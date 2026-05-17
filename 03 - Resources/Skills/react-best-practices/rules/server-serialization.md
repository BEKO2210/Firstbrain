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

## Minimize Serialization at RSC Boundaries

The React Server/Client boundary serializes all object properties into strings and embeds them in the HTML response and subsequent RSC requests. This serialized data directly impacts page weight and load time, so **size matters a lot**. Only pass fields that the client actually uses.

**Incorrect (serializes all 50 fields):**

```tsx
async function Page() {
  const user = await fetchUser()  // 50 fields
  return <Profile user={user} />
}

'use client'
function Profile({ user }: { user: User }) {
  return <div>{user.name}</div>  // uses 1 field
}
```

**Correct (serializes only 1 field):**

```tsx
async function Page() {
  const user = await fetchUser()
  return <Profile name={user.name} />
}

'use client'
function Profile({ name }: { name: string }) {
  return <div>{name}</div>
}
```

## Connections

- **Gehoert zu:** [[react-best-practices]]
- **Pfad:** `rules/server-serialization.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Frontend Entwicklung]]
