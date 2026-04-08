---
name: daily
trigger: /daily
description: Create today's daily note with template and roll over open items from previous days
version: 3.0.0
---

# /daily -- Daily Note Generator

Creates today's daily note from the Daily Note template, fills date variables (yesterday, today, tomorrow navigation links), and automatically rolls over any unchecked checkboxes from the past 7 days with provenance links showing which day each task originated from.

If today's daily note already exists, opens it and merges any new rolled-over items non-destructively (no duplicates, no content loss).

## Usage

```
/daily                  # Create today's daily note
/daily 2026-03-07       # Create daily note for a specific date
```

When invoked without a date, uses today's date. When invoked with a date, creates/opens the daily note for that specific date.

## Execution Flow

Claude follows these steps when /daily is invoked:

1. **Ensure fresh indexes:** Call `ensureFreshIndexes('.')` to refresh vault indexes if stale.

2. **Determine target date:** Use today's date (or the specified date argument). Format as YYYY-MM-DD.

3. **Check if daily note exists:** Call `dailyNoteExists('.', targetDate)`.

4. **If new daily note:**
   a. Read the Daily Note template from `05 - Templates/Daily Note.md`.
   b. Compute date variables via `getDateVars(targetDate)` -- produces `{ date, yesterday, tomorrow, time }`. The `title` variable is set to the date string.
   c. Substitute all template variables via `substituteVariables(content, vars)`:
      - `{{date}}` -> `2026-03-07`
      - `{{yesterday}}` -> `2026-03-06` (creates navigation link `[[2026-03-06]]`)
      - `{{tomorrow}}` -> `2026-03-08` (creates navigation link `[[2026-03-08]]`)
      - `{{time}}` -> current time HH:mm
   d. Extract open items from previous 7 days via `extractOpenItems('.', targetDate)`.
   e. Format rollover section via `formatRolloverSection(items)`.
   f. Insert rollover section into the note content before `## Connections` (if present), otherwise append at the end.
   g. Write to `00 - Inbox/Daily Notes/{targetDate}.md`.

5. **If daily note already exists:**
   a. Read the existing daily note content.
   b. Extract open items from previous 7 days via `extractOpenItems('.', targetDate)`.
   c. Call `mergeRolloverItems(existingContent, newItems)` for non-destructive merge:
      - Deduplicates by task text (ignoring provenance suffix)
      - Appends only genuinely new items to the existing ## Rolled Over section
      - Creates a ## Rolled Over section if one does not exist
   d. Write the updated content back to the file.

6. **Re-scan:** Call `scan('.')` to update indexes with the new/modified daily note.

7. **Report to user:**
   - Whether the daily note was created or updated
   - Number of rolled-over items and their source dates
   - The file path of the daily note

## Rollover Behavior

The rollover system automatically carries forward uncompleted tasks from recent daily notes:

**What gets rolled over:**
- Lines matching `- [ ] task text` (unchecked checkboxes)
- From daily notes up to 7 days back from the target date

**What is NOT rolled over:**
- Checked items: `- [x] completed task` -- these are done
- Already-rolled items: lines containing `(from [[` -- prevents infinite rollover chains
- Items from notes older than 7 days -- intentionally dropped (if still relevant, user should create a project task)

**Provenance links:**
Each rolled-over item includes a wiki-link to its source date:
```
- [ ] Buy milk (from [[2026-03-06]])
- [ ] Review PR #42 (from [[2026-03-04]])
```

**Duplicate detection (idempotent /daily):**
Running `/daily` twice on the same day does NOT duplicate rolled-over items. The `mergeRolloverItems` function compares task text (stripping the `(from [[...]])` suffix) and only adds genuinely new items.

**Example rollover section:**
```markdown
## Rolled Over

- [ ] Buy milk (from [[2026-03-06]])
- [ ] Review PR #42 (from [[2026-03-04]])
- [ ] Call dentist (from [[2026-03-03]])
```

## Code Example

```javascript
const { ensureFreshIndexes } = require('./.agents/skills/create/create-utils.cjs');
const { getDateVars, substituteVariables, extractOpenItems,
        formatRolloverSection, dailyNoteExists, mergeRolloverItems } = require('./.agents/skills/daily/daily-utils.cjs');
const { scan } = require('./.agents/skills/scan/scanner.cjs');
const fs = require('fs');
const path = require('path');

// 1. Ensure indexes are fresh
ensureFreshIndexes('.');

// 2. Determine target date
const targetDate = '2026-03-07'; // or from argument

// 3. Check existence
const exists = dailyNoteExists('.', targetDate);

if (!exists) {
  // 4. New daily note
  const template = fs.readFileSync('05 - Templates/Daily Note.md', 'utf8');
  const vars = getDateVars(targetDate);
  vars.title = targetDate;
  let content = substituteVariables(template, vars);

  // Extract and insert rollover items
  const items = extractOpenItems('.', targetDate);
  const rolloverSection = formatRolloverSection(items);
  if (rolloverSection) {
    const connIdx = content.indexOf('## Connections');
    if (connIdx !== -1) {
      content = content.slice(0, connIdx) + rolloverSection + '\n' + content.slice(connIdx);
    } else {
      content += '\n' + rolloverSection;
    }
  }

  fs.writeFileSync(path.join('00 - Inbox', 'Daily Notes', targetDate + '.md'), content, 'utf8');
} else {
  // 5. Existing daily note -- merge rollover
  const filePath = path.join('00 - Inbox', 'Daily Notes', targetDate + '.md');
  const existing = fs.readFileSync(filePath, 'utf8');
  const items = extractOpenItems('.', targetDate);
  const updated = mergeRolloverItems(existing, items);
  fs.writeFileSync(filePath, updated, 'utf8');
}

// 6. Re-scan
scan('.');
```

## Edge Cases

- **No previous daily notes exist:** Create today's daily note without a rollover section. This is the normal first-time experience.
- **All previous items are checked:** No items to roll over. Create the daily note without a rollover section.
- **Daily note already exists with rollover section:** Merge only new items. Existing checked-off items in the rollover section are preserved (user marked them done today).
- **Skipped days:** If the user skipped 3 days, /daily still picks up open items from all daily notes within the 7-day window. Items don't get lost just because the user took a break.
- **Weekend gap:** Same as skipped days -- the 7-day window covers weekends naturally.
- **Year boundary (Jan 1):** Date arithmetic uses JavaScript Date objects with noon anchoring, correctly computing Dec 31 as yesterday for Jan 1.

## Limitations

- Does not modify previous daily notes. Open items remain in their source notes (the provenance link lets the user navigate back).
- Does not auto-check completed items in previous daily notes. If the user completed a rolled-over task, they should check it off in today's note.
- Does not support custom daily note templates. Uses the standard `05 - Templates/Daily Note.md`.
- 7-day lookback window is fixed. Items older than 7 days are not rolled over (by design -- stale tasks should become project tasks).
