/**
 * Level 1 parser: metadata extraction from vault .md files.
 * Extracts frontmatter, wiki-links, headings, and inline tags.
 * Zero external dependencies -- Node.js built-ins only.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { hashContent } = require('./utils.cjs');

/**
 * Extract YAML frontmatter from markdown content.
 * Hand-rolled parser for flat key-value + array format.
 *
 * Handles:
 *   - Simple key-value: type: project
 *   - YAML list arrays: tags:\n  - foo\n  - bar
 *   - Inline arrays: tags: [foo, bar]
 *   - Empty values: tags: or tags: []
 *   - Quoted values: type: "project"
 *   - Tags with leading #: - #project -> "project"
 *
 * @param {string} content - Full file content
 * @returns {{ type: string|null, tags: string[], frontmatter: object }}
 */
function extractFrontmatter(content) {
  const defaultResult = { type: null, tags: [], frontmatter: {} };

  try {
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) return defaultResult;

    const yamlStr = fmMatch[1];
    const lines = yamlStr.split('\n');
    const result = {};
    let currentKey = null;
    let currentArray = null;

    for (const line of lines) {
      // Check for key-value pair
      const kvMatch = line.match(/^([\w][\w-]*)\s*:\s*(.*)$/);
      if (kvMatch) {
        // Flush any pending array
        if (currentArray !== null && currentKey) {
          result[currentKey] = currentArray;
          currentArray = null;
        }

        currentKey = kvMatch[1];
        const val = kvMatch[2].trim();

        if (val === '' || val === '[]') {
          // Empty value or empty inline array -- start collecting array items
          currentArray = [];
        } else if (val.startsWith('[') && val.endsWith(']')) {
          // Inline array: [foo, bar, baz]
          const inner = val.slice(1, -1);
          if (inner.trim() === '') {
            result[currentKey] = [];
          } else {
            result[currentKey] = inner
              .split(',')
              .map(item => item.trim().replace(/^['"]|['"]$/g, '').replace(/^#/, ''));
          }
          currentKey = null;
          currentArray = null;
        } else {
          // Simple key-value
          result[currentKey] = val.replace(/^['"]|['"]$/g, '');
          currentKey = null;
          currentArray = null;
        }
      } else if (currentArray !== null) {
        // Check for array item: - value
        const arrMatch = line.match(/^\s+-\s+(.+)$/);
        if (arrMatch) {
          const item = arrMatch[1].trim().replace(/^['"]|['"]$/g, '').replace(/^#/, '');
          currentArray.push(item);
        }
      }
    }

    // Flush final pending array
    if (currentArray !== null && currentKey) {
      result[currentKey] = currentArray;
    }

    return {
      type: result.type || null,
      tags: Array.isArray(result.tags) ? result.tags : (result.tags ? [result.tags] : []),
      frontmatter: result,
    };
  } catch {
    return defaultResult;
  }
}

/**
 * Extract all wiki-links from markdown content.
 * Strips code blocks and inline code before extraction.
 * Handles aliases (|), heading references (#), and Obsidian escaped pipes (\|).
 * Excludes embeds (![[...]]).
 *
 * @param {string} content - Full file content
 * @returns {{ target: string, alias: string|null, heading: string|null }[]}
 */
function extractWikiLinks(content) {
  try {
    // Strip fenced code blocks
    let clean = content.replace(/```[\s\S]*?```/g, '');
    // Strip inline code
    clean = clean.replace(/`[^`]+`/g, '');

    const wikiLinkRegex = /(?<!!)\[\[([^\]]+?)\]\]/g;
    const links = [];
    let match;

    while ((match = wikiLinkRegex.exec(clean)) !== null) {
      const fullLink = match[1];
      if (!fullLink.trim()) continue; // Skip empty [[]]

      // Handle pipe separator for aliases.
      // Obsidian uses \| (escaped pipe) inside markdown tables to avoid
      // breaking table formatting. Both | and \| serve as target|alias delimiters.
      // For \|, strip the backslash from the target portion.
      let targetPart, alias;

      // Check for escaped pipe first: \|
      const escapedPipeIdx = fullLink.indexOf('\\|');
      // Check for regular pipe
      const regularPipeIdx = fullLink.indexOf('|');

      if (escapedPipeIdx !== -1 && (regularPipeIdx === -1 || escapedPipeIdx < regularPipeIdx)) {
        // Escaped pipe: [[target\|alias]]
        targetPart = fullLink.substring(0, escapedPipeIdx);
        alias = fullLink.substring(escapedPipeIdx + 2).trim();
      } else if (regularPipeIdx !== -1) {
        // Regular pipe: [[target|alias]]
        targetPart = fullLink.substring(0, regularPipeIdx);
        alias = fullLink.substring(regularPipeIdx + 1).trim();
      } else {
        targetPart = fullLink;
        alias = null;
      }

      // Split heading reference on #
      const hashIdx = targetPart.indexOf('#');
      let target = targetPart.trim();
      let heading = null;
      if (hashIdx !== -1) {
        heading = targetPart.substring(hashIdx + 1).trim();
        target = targetPart.substring(0, hashIdx).trim();
      }

      if (target || heading) {
        links.push({ target, alias: alias || null, heading: heading || null });
      }
    }

    return links;
  } catch {
    return [];
  }
}

/**
 * Extract all markdown headings from body content (after frontmatter).
 * Strips fenced code blocks before extraction.
 *
 * @param {string} content - Full file content
 * @returns {{ level: number, text: string }[]}
 */
function extractHeadings(content) {
  try {
    // Remove frontmatter block
    const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
    // Strip fenced code blocks
    const clean = body.replace(/```[\s\S]*?```/g, '');

    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(clean)) !== null) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
      });
    }

    return headings;
  } catch {
    return [];
  }
}

/**
 * Extract inline #tags from body text.
 * Removes frontmatter, code blocks, and inline code before extraction.
 * Excludes headings (lines starting with # followed by space).
 * Returns deduplicated array of tag strings without # prefix.
 *
 * @param {string} content - Full file content
 * @returns {string[]}
 */
function extractInlineTags(content) {
  try {
    // Remove frontmatter block
    let body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
    // Strip fenced code blocks
    body = body.replace(/```[\s\S]*?```/g, '');
    // Strip inline code
    body = body.replace(/`[^`]+`/g, '');

    const tagRegex = /(?:^|[\s>])#([\w][\w/-]*)/g;
    const tags = new Set();
    let match;

    while ((match = tagRegex.exec(body)) !== null) {
      const tag = match[1];
      // Exclude false positives: heading-style lines are already handled
      // by the regex requiring whitespace or > before #
      // But we still need to skip if this is a heading line (# Heading)
      // The regex [\s>]# already excludes start-of-line # (headings use ^#)
      // However, if a line starts with # and a space, it's a heading not a tag
      // Our regex requires whitespace BEFORE the #, so ^# won't match -- good.
      tags.add(tag);
    }

    return [...tags];
  } catch {
    return [];
  }
}

/**
 * Parse a single vault .md file and extract all Level 1 metadata.
 *
 * @param {string} vaultRoot - Path to vault root
 * @param {string} relativePath - Vault-relative path to .md file
 * @returns {object} Parsed metadata object
 */
function parseFile(vaultRoot, relativePath) {
  const normalizedPath = relativePath.replace(/\\/g, '/');
  const fullPath = path.join(vaultRoot, relativePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const stat = fs.statSync(fullPath);

  const { type, tags, frontmatter } = extractFrontmatter(content);
  const links = extractWikiLinks(content);
  const headings = extractHeadings(content);
  const inlineTags = extractInlineTags(content);

  // Merge frontmatter tags and inline tags (deduplicated)
  const allTagsSet = new Set([...tags, ...inlineTags]);
  const allTags = [...allTagsSet];

  // Determine if this is a template file
  const isTemplate = normalizedPath.startsWith('05 - Templates/');

  return {
    path: normalizedPath,
    name: path.basename(relativePath, '.md'),
    type,
    tags,
    inlineTags,
    allTags,
    links,
    headings,
    frontmatter,
    hash: hashContent(content),
    mtime: stat.mtimeMs,
    scanned: Date.now(),
    isTemplate,
  };
}

module.exports = {
  parseFile,
  extractFrontmatter,
  extractWikiLinks,
  extractHeadings,
  extractInlineTags,
};
