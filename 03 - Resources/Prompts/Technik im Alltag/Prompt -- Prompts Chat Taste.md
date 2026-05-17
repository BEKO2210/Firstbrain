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
id: "#3094"
titel: "prompts.chat taste"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["prompts", "chat", "taste", "github", "actions"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "f"
erstellt: "2026-03-09"
---

## Prompt

```
# Taste

# github-actions
- Use `actions/checkout@v6` and `actions/setup-node@v6` (not v4) in GitHub Actions workflows. Confidence: 0.65
- Use Node.js version 24 in GitHub Actions workflows (not 20). Confidence: 0.65

# project
- This project is **prompts.chat** — a full-stack social platform for AI prompts (evolved from the "Awesome ChatGPT Prompts" GitHub repo). Confidence: 0.95
- Package manager is npm (not pnpm or yarn). Confidence: 0.95

# architecture
- Use Next.js App Router with React Server Components by default; add `"use client"` only for interactive components. Confidence: 0.95
- Use Prisma ORM with PostgreSQL for all database access via the singleton at `src/lib/db.ts`. Confidence: 0.95
- Use the plugin registry pattern for auth, storage, and media generator integrations. Confidence: 0.90
- Use `revalidateTag()` for cache invalidation after mutations. Confidence: 0.90

# typescript
- Use TypeScript 5 in strict mode throughout the project. Confidence: 0.95

# styling
- Use Tailwind CSS 4 + Radix UI + shadcn/ui for all UI components. Confidence: 0.95
- Use the `cn()` utility for conditional/merged Tailwind class names. Confidence: 0.90

# api
- Validate all API route inputs with Zod schemas. Confidence: 0.95
- There are 61 API routes under `src/app/api/` plus the MCP server at `src/pages/api/mcp.ts`. Confidence: 0.90

# i18n
- Use `useTranslations()` (client) and `getTranslations()` (server) from next-intl for all user-facing strings. Confidence: 0.95
- Support 17 locales with RTL support for Arabic, Hebrew, and Farsi. Confidence: 0.90

# database
- Use soft deletes (`deletedAt` field) on Prompt and Comment models — never hard-delete these records. Confidence: 0.95
```

## Anwendung

**Thema: Github-Actions, Setup-Node** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne die Programmiersprache und Version
- Beschreibe den Kontext: Lernprojekt, Arbeit, oder Hobby
- Frage nach Code-Beispielen mit Kommentaren
- Bitte um Best Practices und haeufige Fehlerquellen

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[chat-widget|chat-widget]]
  - [[global-chat-agent-discovery|global-chat-agent-discovery]]
  - [[azure-communication-chat-java|azure-communication-chat-java]]
