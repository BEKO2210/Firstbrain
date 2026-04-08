/**
 * Utility module for the /daily skill.
 * Date arithmetic, open item extraction, rollover deduplication, and daily note creation.
 *
 * Re-exports getDateVars and substituteVariables from create-utils.cjs
 * so the /daily SKILL.md can reference a single module.
 *
 * Zero external dependencies -- Node.js built-ins + Phase 2/3 modules only.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { getDateVars, substituteVariables } = require('../create/create-utils.cjs');

/**
 * Format a Date object as YYYY-MM-DD string.
 * @param {Date} d
 * @returns {string}
 */
function formatDate(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Extract unchecked checkboxes from daily notes of the past 7 days.
 *
 * Rules:
 * - Only `- [ ]` (unchecked) checkboxes are extracted
 * - Items already containing `(from [[` are skipped (previously rolled-over items)
 * - Scans from 1 to 7 days back from the target date
 *
 * @param {string} vaultRoot - Path to vault root
 * @param {string} today - Target date YYYY-MM-DD
 * @returns {Array<{ text: string, source: string, formatted: string }>}
 */
function extractOpenItems(vaultRoot, today) {
  const items = [];
  const resolvedRoot = path.resolve(vaultRoot);

  for (let i = 1; i <= 7; i++) {
    const d = new Date(today + 'T12:00:00');
    d.setDate(d.getDate() - i);
    const dateStr = formatDate(d);
    const filePath = path.join(resolvedRoot, '00 - Inbox', 'Daily Notes', dateStr + '.md');

    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (const line of lines) {
      const match = line.match(/^[-*]\s+\[ \]\s+(.+)$/);
      if (match) {
        const taskText = match[1].trim();
        // Skip items that are already rollover entries (contain "(from [[")
        if (taskText.includes('(from [[')) continue;
        items.push({
          text: taskText,
          source: dateStr,
          formatted: '- [ ] ' + taskText + ' (from [[' + dateStr + ']])',
        });
      }
    }
  }

  return items;
}

/**
 * Format a ## Rolled Over section from extracted open items.
 * Returns empty string if no items to roll over.
 *
 * @param {Array<{ text: string, source: string, formatted: string }>} items
 * @returns {string} Formatted section or empty string
 */
function formatRolloverSection(items) {
  if (!items || items.length === 0) return '';

  const lines = ['## Rolled Over', ''];
  for (const item of items) {
    lines.push(item.formatted);
  }
  lines.push('');
  return lines.join('\n');
}

/**
 * Check if a daily note already exists for a given date.
 *
 * @param {string} vaultRoot - Path to vault root
 * @param {string} dateStr - Date string YYYY-MM-DD
 * @returns {boolean}
 */
function dailyNoteExists(vaultRoot, dateStr) {
  const resolvedRoot = path.resolve(vaultRoot);
  const filePath = path.join(resolvedRoot, '00 - Inbox', 'Daily Notes', dateStr + '.md');
  return fs.existsSync(filePath);
}

/**
 * Merge new rollover items into an existing daily note's content non-destructively.
 *
 * Deduplication: compares task text (stripping the `(from [[...]])` suffix)
 * to prevent double-adds when /daily is invoked twice on the same day.
 *
 * If a ## Rolled Over section exists, new unique items are appended to it.
 * If no ## Rolled Over section exists, one is inserted before ## Connections
 * (or at the end of the file if no ## Connections section).
 *
 * @param {string} existingContent - Current content of the daily note
 * @param {Array<{ text: string, source: string, formatted: string }>} newItems - Items to merge
 * @returns {string} Updated content with merged rollover items
 */
function mergeRolloverItems(existingContent, newItems) {
  if (!newItems || newItems.length === 0) return existingContent;

  // Extract existing rollover task texts for deduplication
  const existingTaskTexts = new Set();
  const lines = existingContent.split('\n');

  let inRolloverSection = false;
  for (const line of lines) {
    if (line.trim() === '## Rolled Over') {
      inRolloverSection = true;
      continue;
    }
    if (inRolloverSection && line.startsWith('## ')) {
      inRolloverSection = false;
      continue;
    }
    if (inRolloverSection) {
      // Extract task text from rollover line, strip (from [[...]]) suffix
      const match = line.match(/^[-*]\s+\[[ x]\]\s+(.+?)(?:\s+\(from \[\[.+?\]\]\))?$/);
      if (match) {
        existingTaskTexts.add(match[1].trim());
      }
    }
  }

  // Filter to only genuinely new items
  const uniqueItems = newItems.filter(item => !existingTaskTexts.has(item.text));
  if (uniqueItems.length === 0) return existingContent;

  // Check if ## Rolled Over section already exists
  const rolloverIndex = lines.findIndex(l => l.trim() === '## Rolled Over');

  if (rolloverIndex !== -1) {
    // Find end of existing rollover section (next ## heading or end of file)
    let insertAt = lines.length;
    for (let i = rolloverIndex + 1; i < lines.length; i++) {
      if (lines[i].startsWith('## ')) {
        insertAt = i;
        break;
      }
    }
    // Insert new items before the next section
    const newLines = uniqueItems.map(item => item.formatted);
    lines.splice(insertAt, 0, ...newLines);
  } else {
    // No ## Rolled Over section -- insert one
    const connectionsIndex = lines.findIndex(l => l.trim() === '## Connections');
    const rolloverLines = ['## Rolled Over', '', ...uniqueItems.map(item => item.formatted), ''];

    if (connectionsIndex !== -1) {
      // Insert before ## Connections
      lines.splice(connectionsIndex, 0, ...rolloverLines);
    } else {
      // Append at end
      lines.push('', ...rolloverLines);
    }
  }

  return lines.join('\n');
}

module.exports = {
  extractOpenItems,
  formatRolloverSection,
  dailyNoteExists,
  mergeRolloverItems,
  getDateVars,
  substituteVariables,
};
