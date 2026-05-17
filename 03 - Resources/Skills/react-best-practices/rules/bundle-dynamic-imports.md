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

## Dynamic Imports for Heavy Components

Use `next/dynamic` to lazy-load large components not needed on initial render.

**Incorrect (Monaco bundles with main chunk ~300KB):**

```tsx
import { MonacoEditor } from './monaco-editor'

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

**Correct (Monaco loads on demand):**

```tsx
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () => import('./monaco-editor').then(m => m.MonacoEditor),
  { ssr: false }
)

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

## Connections

- **Gehoert zu:** [[react-best-practices]]
- **Pfad:** `rules/bundle-dynamic-imports.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Frontend Entwicklung]]
