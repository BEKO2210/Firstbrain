---
type: resource
created: 2024-01-01
tags:
  - guide
  - onboarding
---

# Welcome to Your Second Brain

You have just set up your personal knowledge management system. Here is everything you need to know — no jargon.

---

## What Is This?

Imagine you had a second brain that never forgets. Every idea, every project, every note — all in one place, all interconnected.

This system is based on three simple principles:

1. **PARA** — Four folders that cover everything: Projects, Areas, Resources, Archive
2. **Zettelkasten** — Write down ideas in your own words and link them together
3. **Maps of Content** — Overview pages that show you the way

Sounds complicated? It is not. Read on.

---

## Ready in 5 Minutes

### Step 1: Activate Plugins

Open Obsidian Settings → **Community Plugins** → Install:

| Plugin | Why? |
|--------|------|
| **Dataview** | Automatically displays lists of your projects, tasks, etc. |
| **Templater** | Fills in templates automatically (date, title, etc.) |
| **Calendar** | Calendar view for your Daily Notes (optional) |

> Dataview is the only plugin you truly need. The rest is convenience.

### Step 2: Open the Dashboard

Go to [[Home]] — this is your starting point. You can reach everything from there.

### Step 3: Create Your First Note

On the [[Home]] page you will see the **"Create a New Note"** table. Simply click the appropriate link — e.g. `New Project`. Obsidian creates a blank page. Then:

1. Press **Ctrl+Shift+T** (or Cmd+Shift+T on Mac)
2. Select the matching template (e.g. `Project`)
3. Fill in the fields — done

Afterwards, rename the note (F2) — e.g. from "New Project" to "Website Relaunch".

---

## The Folder Structure

You only need to remember these folders:

```
00 - Inbox/          New stuff goes here
01 - Projects/       Active projects (have an end date)
02 - Areas/          Life areas (ongoing)
03 - Resources/      Knowledge, books, tools, ideas
04 - Archive/        Completed or no longer relevant
05 - Templates/      Templates — do not modify, just use
06 - Atlas/MOCs/     Overview pages (navigation)
07 - Extras/         Images, attachments, miscellaneous
```

**Rule of thumb:** Not sure where something goes? → `00 - Inbox`. Move it to the right place later.

---

## How to Use It Daily

### Morning (2 minutes)
- Open [[Home]] → check your active projects and open tasks
- Create a Daily Note (Ctrl+N → Template `Daily Note`)

### During the Day
- Got an idea? → Click [[New Zettel]] on [[Home]] and write it down
- New project? → Click [[New Project]] on [[Home]]
- Anything that comes in → goes to `00 - Inbox`

### Evening (5 minutes)
- Go through the Inbox: Is this a project? A zettel? Move it.
- Check off completed tasks

### Weekly
- Do a Weekly Review → use the `Weekly Review` template
- Review projects: Is everything on track? Anything blocked?

---

## The Key Rules

There are only four:

1. **Every note needs a type** — The frontmatter always contains `type: project` or `type: zettel` etc.
2. **Every note needs connections** — At the end of each note there is a `## Connections` section with links to related notes
3. **Write in your own words** — Copy-paste does you no good. Rephrasing = understanding.
4. **Short and often beats long and rare** — One note per day is better than one mammoth document per month

---

## Using Claude Code

The fastest way to start is the **one-click launcher**:

```bash
./start.sh          # Linux/macOS
start.bat            # Windows (double-click)
```

The launcher checks your system, starts Claude Code, and Claude greets you with a guided setup (language, name, first project).

Or start manually:

```bash
cd Firstbrain
claude
```

Claude reads `CLAUDE.md` on startup and knows all 13 skills. Try:

```
/scan                → Build vault indexes
/briefing            → Daily summary
/create              → Create a note from template
/daily               → Today's daily note
/search              → Find notes by meaning
/health              → Find broken links
/process             → Execute action files from Inbox
/watch               → Auto-monitor Inbox for new actions
```

### Execution Engine (v2.0)

Firstbrain is not just a note vault -- it is a **command center**. Drop an action file in your Inbox:

```markdown
ACTION: Create a Flask REST API with user authentication.
Push to GitHub as my-app.
```

Claude reads it, creates the project in `workspace/`, writes code, commits, pushes, and logs everything as markdown in your vault. Use `/watch` to have Claude auto-detect new action files.

---

## FAQ

**Do I have to use all the folders?**
No. Start with projects and zettel notes. The rest will come naturally.

**What if I put a note in the wrong folder?**
Move it. The wiki-links still work (Obsidian updates them automatically).

**Do I need the archive?**
Only once you have completed projects. At the start, `04 - Archive` stays empty.

**How many tags should a note have?**
2-5 is enough. Less is more. Details are in [[Tag Conventions]].

---

## Next Steps

- [ ] Create your first project → Click [[New Project]] in [[Home]]
- [ ] Define two life areas (e.g. career, health)
- [ ] Capture an idea as a zettel
- [ ] Tomorrow: Write your first Daily Note
- [ ] In one week: Do your first Weekly Review

---

> *The perfect system does not exist. The best system is the one you actually use. Start small.*
