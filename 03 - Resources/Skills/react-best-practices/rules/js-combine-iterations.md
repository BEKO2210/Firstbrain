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

## Combine Multiple Array Iterations

Multiple `.filter()` or `.map()` calls iterate the array multiple times. Combine into one loop.

**Incorrect (3 iterations):**

```typescript
const admins = users.filter(u => u.isAdmin)
const testers = users.filter(u => u.isTester)
const inactive = users.filter(u => !u.isActive)
```

**Correct (1 iteration):**

```typescript
const admins: User[] = []
const testers: User[] = []
const inactive: User[] = []

for (const user of users) {
  if (user.isAdmin) admins.push(user)
  if (user.isTester) testers.push(user)
  if (!user.isActive) inactive.push(user)
}
```

## Connections

- **Gehoert zu:** [[react-best-practices]]
- **Pfad:** `rules/js-combine-iterations.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Frontend Entwicklung]]
