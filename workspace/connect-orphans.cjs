/**
 * Connect Orphan Files
 *
 * Findet alle .md Dateien in Skill-Ordnern die NICHT SKILL.md heißen
 * und gibt ihnen:
 *   1. Vault-konformes Frontmatter (type, created, tags)
 *   2. ## Connections Section mit Link zur Parent SKILL.md
 *   3. Link zur Domain + Kategorie
 */

const fs = require('fs');
const path = require('path');

const VAULT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(VAULT, '03 - Resources', 'Skills');
const TODAY = '2026-04-11';

function norm(c) { return c.replace(/\r\n/g, '\n').replace(/\r/g, '\n'); }

function parseFm(content) {
  content = norm(content);
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { fm: null, body: content, hasFm: false };
  return { fm: m[1], body: content.slice(m[0].length), hasFm: true };
}

function fmField(fm, f) {
  if (!fm) return '';
  const m = fm.match(new RegExp(`^${f}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

function getParentSkillInfo(filePath) {
  // Walk up to find SKILL.md
  let dir = path.dirname(filePath);
  while (dir.length > SKILLS_DIR.length) {
    const skillFile = path.join(dir, 'SKILL.md');
    if (fs.existsSync(skillFile)) {
      const content = norm(fs.readFileSync(skillFile, 'utf-8'));
      const { fm } = parseFm(content);
      return {
        name: fmField(fm, 'name') || path.basename(dir),
        domain: fmField(fm, 'domain') || '',
        category: fmField(fm, 'category') || '',
        dir: dir,
      };
    }
    dir = path.dirname(dir);
  }
  return null;
}

// Domain ID → readable name mapping
const DOMAIN_NAMES = {
  'software-development': 'Software Entwicklung',
  'cloud-infrastructure': 'Cloud & Infrastruktur',
  'ai-ml': 'KI & Machine Learning',
  'design-creative': 'Design & Kreativitaet',
  'business-marketing': 'Business & Marketing',
  'communication-content': 'Kommunikation & Content',
  'security': 'Sicherheit & Datenschutz',
  'data': 'Daten & Analyse',
  'productivity': 'Produktivitaet & Werkzeuge',
  'life-learning': 'Leben & Lernen',
};

const CATEGORY_NAMES = {
  'frontend': 'Frontend Entwicklung', 'backend': 'Backend Entwicklung',
  'mobile': 'Mobile Entwicklung', 'languages': 'Programmiersprachen',
  'testing': 'Testing & Qualitaet', 'architecture': 'Software Architektur',
  'database': 'Datenbanken', 'devtools': 'Entwickler-Tools',
  'aws': 'Amazon Web Services', 'azure': 'Microsoft Azure',
  'gcp': 'Google Cloud', 'devops': 'DevOps & Deployment',
  'monitoring': 'Monitoring & Observability',
  'llm-agents': 'LLM & KI-Agenten', 'prompt-engineering': 'Prompt Engineering',
  'ml-data-science': 'ML & Data Science', 'computer-vision': 'Computer Vision',
  'nlp': 'Sprachverarbeitung (NLP)',
  'ui-ux': 'UI & UX Design', 'image-generation': 'Bildgenerierung & KI-Kunst',
  '3d-animation': '3D & Animation', 'video-audio': 'Video & Audio Produktion',
  'marketing': 'Marketing & SEO', 'ecommerce': 'E-Commerce & Handel',
  'analytics': 'Analytics & Tracking', 'sales-crm': 'Vertrieb & CRM',
  'product-management': 'Produktmanagement', 'startup': 'Gruendung & Startup',
  'writing': 'Schreiben & Texten', 'social-media': 'Social Media',
  'documentation': 'Dokumentation & Wissen', 'email-comms': 'E-Mail & Messaging',
  'app-security': 'Anwendungssicherheit', 'pentesting': 'Penetration Testing',
  'compliance': 'Compliance & Datenschutz',
  'data-engineering': 'Data Engineering', 'data-analysis': 'Datenanalyse & Reporting',
  'automation': 'Automatisierung & Workflows', 'developer-experience': 'Developer Experience',
  'education': 'Bildung & Wissen', 'health': 'Gesundheit & Wellness',
  'finance': 'Finanzen & Geld', 'career': 'Karriere & Beruf',
  'personal-growth': 'Persoenliche Entwicklung',
};

function guessFileType(filePath, content) {
  const name = path.basename(filePath).toLowerCase();
  const dir = path.basename(path.dirname(filePath)).toLowerCase();

  if (dir === 'references' || dir === 'reference') return 'referenz';
  if (dir === 'rules' || dir === 'rule') return 'regel';
  if (dir === 'examples' || dir === 'example') return 'beispiel';
  if (dir === 'scripts') return 'script';
  if (dir === 'resources') return 'ressource';
  if (dir === 'docs' || dir === 'documentation') return 'dokumentation';
  if (dir === 'templates') return 'vorlage';
  if (dir === 'assets') return 'asset';

  if (name.includes('changelog')) return 'changelog';
  if (name.includes('api')) return 'api-referenz';
  if (name.includes('guide') || name.includes('setup')) return 'anleitung';
  if (name.includes('pattern') || name.includes('best-practice')) return 'pattern';
  if (name.includes('example') || name.includes('demo')) return 'beispiel';
  if (name.includes('test')) return 'test';

  return 'skill-dokument';
}

// ════════════════════════════════════════════════════════════════════════════

function main() {
  console.log('══════════════════════════════════════════');
  console.log('  ORPHAN CONNECTOR');
  console.log('══════════════════════════════════════════\n');

  // Find all orphan .md files
  const orphans = [];
  function walk(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory() && !e.name.startsWith('.')) {
          walk(full);
        } else if (e.isFile() && e.name.endsWith('.md') && e.name !== 'SKILL.md') {
          orphans.push(full);
        }
      }
    } catch {}
  }
  walk(SKILLS_DIR);

  console.log(`${orphans.length} Orphan-Dateien gefunden.\n`);

  let connected = 0, skipped = 0;

  for (const filePath of orphans) {
    try {
      let content = norm(fs.readFileSync(filePath, 'utf-8'));
      const { fm, body, hasFm } = parseFm(content);

      // Get parent skill info
      const parent = getParentSkillInfo(filePath);
      if (!parent) { skipped++; continue; }

      const domainName = DOMAIN_NAMES[parent.domain] || 'Produktivitaet & Werkzeuge';
      const catName = CATEGORY_NAMES[parent.category] || 'Developer Experience';
      const fileType = guessFileType(filePath, content);
      const fileName = path.basename(filePath, '.md');
      const relPath = path.relative(parent.dir, filePath).replace(/\\/g, '/');

      // Build tags from parent + file context
      const tags = ['skill-referenz', parent.domain, parent.category].filter(Boolean);

      // Remove existing Connections if present
      let cleanBody = body.replace(/\n## Connections[\s\S]*$/m, '').trimEnd();

      // Build new frontmatter
      const newFm = [
        '---',
        `type: ${fileType}`,
        `created: ${TODAY}`,
        `parent-skill: "${parent.name}"`,
        `domain: ${parent.domain}`,
        `category: ${parent.category}`,
        'tags:',
        ...tags.map(t => `  - ${t}`),
        '---',
      ].join('\n');

      // Build connections
      const conn = [
        '\n\n## Connections\n',
        `- **Gehoert zu:** [[${parent.name}]]`,
        `- **Pfad:** \`${relPath}\``,
        `- **Domain:** [[${domainName}]]`,
        `- **Kategorie:** [[${catName}]]`,
      ];

      // If original had frontmatter, keep body. If not, keep everything as body.
      let finalBody;
      if (hasFm) {
        finalBody = cleanBody;
      } else {
        // Original had no frontmatter — entire content is the body
        finalBody = '\n' + content.replace(/\n## Connections[\s\S]*$/m, '').trimEnd();
      }

      const newContent = newFm + finalBody + conn.join('\n') + '\n';
      fs.writeFileSync(filePath, newContent, 'utf-8');
      connected++;
    } catch (err) {
      skipped++;
    }
  }

  console.log(`${connected} Dateien verbunden.`);
  console.log(`${skipped} uebersprungen.`);

  // Stats by type
  const typeCounts = {};
  for (const filePath of orphans) {
    try {
      const content = norm(fs.readFileSync(filePath, 'utf-8'));
      const { fm } = parseFm(content);
      const t = fmField(fm, 'type') || 'unknown';
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    } catch {}
  }

  console.log('\nNach Typ:');
  for (const [t, c] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${t}: ${c}`);
  }
}

main();
