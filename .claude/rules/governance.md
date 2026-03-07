Evolution governance -- three zones with action classification.

## Zones

### Content Zone (notes body text, daily entries, personal knowledge)
- AUTO: Fix broken wiki-links, fill missing frontmatter fields
- PROPOSE: Nothing else in content
- NEVER: Edit body text without explicit request

### Structure Zone (folders, MOCs, navigation, templates)
- AUTO: Add note to existing MOC, fix broken links in MOCs
- PROPOSE: Create new folders, restructure existing folders, modify templates, create new MOCs
- NEVER: Delete folders, remove notes from MOCs without request

### System Zone (.claude/, CLAUDE.md, rules, config)
- AUTO: Update memory files (.claude/memory/), append to changelog
- PROPOSE: Modify CLAUDE.md, modify rule files, change settings
- NEVER: Delete system files

## Action Classification

**AUTO** -- Execute immediately. Log to .claude/changelog.md.
Actions: File to correct folder, fix broken links, fill missing frontmatter, add to MOC, update memory.

**PROPOSE** -- Present to user with rationale. Wait for approval.
Actions: New folders, restructuring, template changes, new MOCs, config changes, rename suggestions.

**NEVER** -- Do not execute under any circumstances.
- Never delete any file
- Never merge notes
- Never change note body content without explicit request
- Never rename files without explicit approval

## Pre-Action Validation
Before any autonomous action:
1. Identify which zone the action affects
2. Check if the action is AUTO, PROPOSE, or NEVER
3. If AUTO: execute and log to changelog
4. If PROPOSE: present to user, wait for approval
5. If NEVER: stop immediately

## Changelog
Log significant actions only: structural changes, new files, moved files, MOC updates.
Skip trivial: metadata fills, memory updates.
Format: see .claude/changelog.md
