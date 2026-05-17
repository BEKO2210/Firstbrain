/**
 * Firstbrain Vault Cleanup
 *
 * 1. Alte/redundante MOCs löschen (Prompt-Kategorie-MOCs behalten + neu schreiben)
 * 2. Home.md aktualisieren mit neuen Domain-MOCs
 * 3. Lose Root-Dateien aufräumen
 * 4. Leere Ordner + kaputte Dateien fixen
 * 5. Alte Scripts in workspace/ aufräumen
 */

const fs = require('fs');
const path = require('path');

const VAULT = path.resolve(__dirname, '..');
const MOCS_DIR = path.join(VAULT, '06 - Atlas', 'MOCs');
const TODAY = '2026-04-11';

// ── MOCs die behalten werden ───────────────────────────────────────────────

const KEEP_MOCS = new Set([
  // Neue Domain MOCs
  'AI & Machine Learning MOC.md',
  'Business & Marketing MOC.md',
  'Cloud & Infrastructure MOC.md',
  'Data & Analytics MOC.md',
  'Design & Kreativ MOC.md',
  'Kommunikation & Content MOC.md',
  'Leben & Lernen MOC.md',
  'Produktivitaet & Tools MOC.md',
  'Security & Privacy MOC.md',
  'Software Development MOC.md',
  // System MOCs
  'Skills MOC.md',
  'Prompts MOC.md',
  'Areas MOC.md',
  'Code MOC.md',
  'Decisions MOC.md',
  'Meetings MOC.md',
  'People MOC.md',
  'Projects MOC.md',
  'Resources MOC.md',
  'System MOC.md',
  'Templates MOC.md',
  'Tools MOC.md',
  // Prompt-Kategorie MOCs (werden neu geschrieben)
  'Alltag & Leben.md',
  'Beruf & Karriere.md',
  'Bild & Visualisierung.md',
  'Gesundheit & Wohlbefinden.md',
  'Kommunikation & Beziehungen.md',
  'Kreativität & Freizeit.md',
  'Lernen & Wachstum.md',
  'Spezielle Situationen.md',
  'Technik im Alltag.md',
]);

// ── Prompt-Kategorie → Domain Mapping ──────────────────────────────────────

const PROMPT_CAT_DOMAIN = {
  'Alltag & Leben': { domain: 'Leben & Lernen MOC', icon: '🌱' },
  'Beruf & Karriere': { domain: 'Business & Marketing MOC', icon: '📈' },
  'Bild & Visualisierung': { domain: 'Design & Kreativ MOC', icon: '🎨' },
  'Gesundheit & Wohlbefinden': { domain: 'Leben & Lernen MOC', icon: '🌱' },
  'Kommunikation & Beziehungen': { domain: 'Kommunikation & Content MOC', icon: '✍️' },
  'Kreativität & Freizeit': { domain: 'Design & Kreativ MOC', icon: '🎨' },
  'Lernen & Wachstum': { domain: 'Leben & Lernen MOC', icon: '🌱' },
  'Spezielle Situationen': { domain: 'Leben & Lernen MOC', icon: '🌱' },
  'Technik im Alltag': { domain: 'Software Development MOC', icon: '💻' },
};

// ════════════════════════════════════════════════════════════════════════════

function step1_deleteOldMOCs() {
  console.log('1. Alte MOCs löschen...');
  const files = fs.readdirSync(MOCS_DIR);
  let deleted = 0;
  for (const f of files) {
    if (!KEEP_MOCS.has(f)) {
      fs.unlinkSync(path.join(MOCS_DIR, f));
      deleted++;
    }
  }
  console.log(`   ${deleted} alte MOCs gelöscht, ${KEEP_MOCS.size} behalten.`);
}

function step2_rewritePromptCategoryMOCs() {
  console.log('2. Prompt-Kategorie-MOCs neu schreiben...');
  const PROMPTS_DIR = path.join(VAULT, '03 - Resources', 'Prompts');

  for (const [cat, info] of Object.entries(PROMPT_CAT_DOMAIN)) {
    const catDir = path.join(PROMPTS_DIR, cat);
    if (!fs.existsSync(catDir)) continue;

    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
    const promptNames = files.map(f => f.replace(/\.md$/, '')).sort();

    const lines = [
      '---',
      'type: moc',
      `created: ${TODAY}`,
      `updated: ${TODAY}`,
      'tags:',
      '  - moc',
      '  - prompts',
      `  - ${cat.toLowerCase().replace(/[&\s]+/g, '-').replace(/-+/g, '-')}`,
      '---',
      '',
      `# ${cat}`,
      '',
      `> **${files.length} Prompts** | Domain: ${info.icon} [[${info.domain}|${info.domain.replace(' MOC', '')}]]`,
      '',
      '---',
      '',
      '## Prompts',
      '',
    ];

    // Group by first letter
    const groups = {};
    for (const name of promptNames) {
      const cleanName = name.replace(/^Prompt -- /, '');
      const letter = cleanName[0]?.toUpperCase() || '?';
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(name);
    }

    for (const [letter, names] of Object.entries(groups).sort()) {
      lines.push(`### ${letter}`);
      lines.push('');
      for (const n of names.slice(0, 50)) { // Cap per letter to avoid huge MOCs
        lines.push(`- [[${n}]]`);
      }
      if (names.length > 50) {
        lines.push(`- *... und ${names.length - 50} weitere*`);
      }
      lines.push('');
    }

    lines.push('---');
    lines.push('');
    lines.push('## Connections');
    lines.push('');
    lines.push(`- **Domain:** [[${info.domain}]]`);
    lines.push('- **Navigation:** [[Prompts MOC]], [[Skills MOC]], [[Home]]');
    lines.push('');

    fs.writeFileSync(path.join(MOCS_DIR, `${cat}.md`), lines.join('\n'), 'utf-8');
    console.log(`   ${cat}: ${files.length} Prompts`);
  }
}

function step3_updateHome() {
  console.log('3. Home.md aktualisieren...');
  const homeContent = `---
type: home
tags:
  - navigation
  - home
---

# Firstbrain -- KI-Wissens-Zentrum

> Du denkst -- ich organisiere.

---

## Schnell-Aktionen

| Ziel | Erstellen | Template |
|------|-----------|----------|
| Projekt starten | [[New Project]] | Project |
| Bereich anlegen | [[New Area]] | Area |
| Wissen sichern | [[New Resource]] | Resource |
| Tool dokumentieren | [[New Tool]] | Tool |
| Idee festhalten | [[New Zettel]] | Zettel |
| Entscheidung loggen | [[New Decision]] | Decision |
| Kontakt pflegen | [[New Person]] | Person |
| Meeting erfassen | [[New Meeting]] | Meeting |
| Code-Snippet | [[New Snippet]] | Code Snippet |

---

## Knowledge Graph -- Domains

| Domain | MOC | Beschreibung |
|--------|-----|-------------|
| Software Development | [[Software Development MOC]] | Frontend, Backend, Mobile, Sprachen, Testing, Architektur, DB, DevTools |
| Cloud & Infrastructure | [[Cloud & Infrastructure MOC]] | AWS, Azure, GCP, DevOps, Monitoring |
| AI & Machine Learning | [[AI & Machine Learning MOC]] | LLM/Agents, Prompt Engineering, ML, Vision, NLP |
| Design & Kreativ | [[Design & Kreativ MOC]] | UI/UX, Bildgenerierung, 3D, Video/Audio |
| Business & Marketing | [[Business & Marketing MOC]] | Marketing, E-Commerce, Analytics, Sales, Produkt, Startup |
| Kommunikation & Content | [[Kommunikation & Content MOC]] | Schreiben, Social Media, Doku, E-Mail |
| Security & Privacy | [[Security & Privacy MOC]] | AppSec, Pentesting, Compliance |
| Data & Analytics | [[Data & Analytics MOC]] | Data Engineering, Datenanalyse |
| Produktivitaet & Tools | [[Produktivitaet & Tools MOC]] | Automatisierung, Developer Experience |
| Leben & Lernen | [[Leben & Lernen MOC]] | Bildung, Gesundheit, Finanzen, Karriere |

---

## Prompt-Sammlungen

| Kategorie | MOC |
|-----------|-----|
| Technik im Alltag | [[Technik im Alltag]] |
| Bild & Visualisierung | [[Bild & Visualisierung]] |
| Lernen & Wachstum | [[Lernen & Wachstum]] |
| Beruf & Karriere | [[Beruf & Karriere]] |
| Alltag & Leben | [[Alltag & Leben]] |
| Kommunikation & Beziehungen | [[Kommunikation & Beziehungen]] |
| Gesundheit & Wohlbefinden | [[Gesundheit & Wohlbefinden]] |
| Spezielle Situationen | [[Spezielle Situationen]] |
| Kreativitaet & Freizeit | [[Kreativität & Freizeit]] |

---

## Vault-Navigation

| Bereich | Link |
|---------|------|
| Projekte | [[Projects MOC]] |
| Bereiche | [[Areas MOC]] |
| Ressourcen | [[Resources MOC]] |
| Entscheidungen | [[Decisions MOC]] |
| Tools | [[Tools MOC]] |
| People | [[People MOC]] |
| Templates | [[Templates MOC]] |
| Skills | [[Skills MOC]] |
| Prompts | [[Prompts MOC]] |
| System | [[System MOC]] |

---

## Aktueller Status

### Aktive Projekte
\`\`\`dataview
TABLE status, priority, area
FROM "01 - Projects"
WHERE status = "active"
SORT priority ASC
\`\`\`

### Offene Aufgaben
\`\`\`dataview
TASK
FROM "01 - Projects" OR "00 - Inbox"
WHERE !completed
LIMIT 10
\`\`\`

### Letzte Aenderungen
\`\`\`dataview
TABLE file.mtime AS "Geaendert", type
FROM ""
WHERE type AND type != "home" AND type != "moc"
SORT file.mtime DESC
LIMIT 8
\`\`\`

---

## System & Hilfe

- [[START HERE]] -- Onboarding-Guide
- [[Workflow Guide]] -- Taegliche Routinen
- [[Cheatsheet]] -- Befehls-Uebersicht
- [[MEMORY]] -- Claudes Arbeitsstand
- [[Tag Conventions]] -- Tag-Taxonomie

*Graph-Ansicht: Ctrl+G*
`;
  fs.writeFileSync(path.join(VAULT, 'Home.md'), homeContent, 'utf-8');
  console.log('   Home.md neu geschrieben.');
}

function step4_cleanRootFiles() {
  console.log('4. Root-Dateien aufräumen...');

  // Dateien die in workspace/ gehören
  const moveToWorkspace = ['index.js', 'update_prompts.py'];
  for (const f of moveToWorkspace) {
    const src = path.join(VAULT, f);
    const dst = path.join(VAULT, 'workspace', f);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dst);
      console.log(`   ${f} → workspace/`);
    }
  }

  // Leere Canvas-Dateien löschen
  const deleteFiles = ['Unbenannt 1.canvas', 'Unbenannt.canvas'];
  for (const f of deleteFiles) {
    const fp = path.join(VAULT, f);
    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
      console.log(`   ${f} gelöscht`);
    }
  }

  // Inbox aufräumen
  const inboxFile = path.join(VAULT, '00 - Inbox', 'technik-alltag.md');
  if (fs.existsSync(inboxFile)) {
    const content = fs.readFileSync(inboxFile, 'utf-8');
    if (content.trim().length < 50) {
      fs.unlinkSync(inboxFile);
      console.log('   technik-alltag.md (leer) aus Inbox gelöscht');
    }
  }
}

function step5_cleanWorkspace() {
  console.log('5. Workspace aufräumen...');
  const wsDir = path.join(VAULT, 'workspace');

  // Alte Python-Scripts die nicht mehr gebraucht werden
  const oldScripts = [
    'categorize_prompts.py',
    'fix_prompts.py',
    'process_prompts.py',
    'repair_prompts.py',
    'subcategories.txt',
  ];
  for (const f of oldScripts) {
    const fp = path.join(wsDir, f);
    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
      console.log(`   workspace/${f} gelöscht`);
    }
  }

  // vault-linker.cjs kann auch weg (ersetzt durch knowledge-graph.cjs)
  const oldLinker = path.join(wsDir, 'vault-linker.cjs');
  if (fs.existsSync(oldLinker)) {
    fs.unlinkSync(oldLinker);
    console.log('   workspace/vault-linker.cjs gelöscht (ersetzt durch knowledge-graph.cjs)');
  }
}

function step6_cleanEmptySkillDirs() {
  console.log('6. Leere/kaputte Skill-Ordner aufräumen...');
  const SKILLS_DIR = path.join(VAULT, '03 - Resources', 'Skills');
  const problemDirs = ['docs', 'libreoffice', 'security'];
  let cleaned = 0;

  for (const d of problemDirs) {
    const dirPath = path.join(SKILLS_DIR, d);
    if (fs.existsSync(dirPath)) {
      // Check if it has meaningful content
      const files = fs.readdirSync(dirPath);
      const hasSKILL = files.includes('SKILL.md');
      if (!hasSKILL) {
        // Remove directory recursively
        fs.rmSync(dirPath, { recursive: true, force: true });
        console.log(`   Skills/${d}/ gelöscht (kein SKILL.md)`);
        cleaned++;
      }
    }
  }
  console.log(`   ${cleaned} kaputte Ordner entfernt.`);
}

function step7_updateSystemMOC() {
  console.log('7. System MOC aktualisieren...');
  const content = `---
type: moc
created: 2026-04-09
updated: ${TODAY}
tags:
  - moc
  - system
  - navigation
---

# System MOC

Technische Infrastruktur und Konfiguration des Firstbrain Vaults.

---

## Konfiguration

| Datei | Beschreibung |
|-------|-------------|
| [[CLAUDE.md]] | Haupt-Konfiguration des KI-Assistenten |
| [[Home]] | Vault-Dashboard |
| [[MEMORY]] | Claudes Arbeitsgedaechtnis |

## Regeln

| Regel | Bereich |
|-------|---------|
| [[Frontmatter]] | YAML-Standards fuer alle Notizen |
| [[Governance]] | AUTO/PROPOSE/NEVER Zonen |
| [[Linking]] | Wiki-Link Konventionen |
| [[Naming]] | Dateinamen-Konventionen |
| [[Process]] | Inbox-Verarbeitung |
| [[Templates]] | Template-Regeln |

## Guides

| Guide | Beschreibung |
|-------|-------------|
| [[START HERE]] | Onboarding fuer neue Nutzer |
| [[Workflow Guide]] | Taegliche Routinen |
| [[Tag Conventions]] | Tag-Taxonomie |
| [[Cheatsheet]] | Befehls-Uebersicht |

## Knowledge Graph

| Layer | Beschreibung |
|-------|-------------|
| Layer 0: Domains | 10 Hauptbereiche |
| Layer 1: Categories | ~50 Unterkategorien |
| Layer 2: Items | Skills + Prompts |

Siehe [[Skills MOC]] fuer die vollstaendige Taxonomie.

---

## Connections

- **Navigation:** [[Home]], [[Skills MOC]], [[Prompts MOC]]
- **Verwandt:** [[Resources MOC]], [[Templates MOC]]
`;

  fs.writeFileSync(path.join(MOCS_DIR, 'System MOC.md'), content, 'utf-8');
  console.log('   System MOC aktualisiert.');
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════════════

console.log('══════════════════════════════════════════');
console.log('  FIRSTBRAIN CLEANUP');
console.log('══════════════════════════════════════════\n');

step1_deleteOldMOCs();
step2_rewritePromptCategoryMOCs();
step3_updateHome();
step4_cleanRootFiles();
step5_cleanWorkspace();
step6_cleanEmptySkillDirs();
step7_updateSystemMOC();

console.log('\n══════════════════════════════════════════');
console.log('  CLEANUP FERTIG');
console.log('══════════════════════════════════════════');
