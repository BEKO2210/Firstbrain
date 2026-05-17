/**
 * Firstbrain Brain Rewire v2
 *
 * Kompletter Neuaufbau aller Verbindungen:
 *
 * 1. MOCs umbenennen (kein "MOC" Suffix, bessere deutsche Namen)
 * 2. Kategorie-Seiten erstellen (Layer 1)
 * 3. Alle non-MD Dateien in Skills referenzieren
 * 4. Skill Connections komplett neu mit funktionierenden Links
 * 5. Prompt-Kategorisierung prüfen und fixen
 * 6. Home.md + alle Verweise aktualisieren
 */

const fs = require('fs');
const path = require('path');

const VAULT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(VAULT, '03 - Resources', 'Skills');
const PROMPTS_DIR = path.join(VAULT, '03 - Resources', 'Prompts');
const MOCS_DIR = path.join(VAULT, '06 - Atlas', 'MOCs');
const TODAY = '2026-04-11';

function norm(c) { return c.replace(/\r\n/g, '\n').replace(/\r/g, '\n'); }
function parseFm(content) {
  content = norm(content);
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { fm: null, body: content };
  return { fm: m[1], body: content.slice(m[0].length) };
}
function fmField(fm, f) {
  if (!fm) return '';
  const m = fm.match(new RegExp(`^${f}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

// ════════════════════════════════════════════════════════════════════════════
// TAXONOMY — Bessere Namen, kein "MOC"
// ════════════════════════════════════════════════════════════════════════════

const DOMAINS = {
  'software-development': {
    oldName: 'Software Development MOC',
    newName: 'Software Entwicklung',
    icon: '💻',
    categories: {
      'frontend': { label: 'Frontend Entwicklung', keywords: ['react','angular','vue','svelte','next','nextjs','nuxt','remix','solid','qwik','astro','gatsby','vite','webpack','css','sass','scss','tailwind','bootstrap','radix','shadcn','html','dom','spa','ssr','ssg','htmx','alpine','lit','ember','preact','threejs','webgl','canvas','svg','a11y','stitch','polaris','avalonia','tauri','electron','animejs','framer','motion','responsive','pwa','component','storybook','browser','makepad'] },
      'backend': { label: 'Backend Entwicklung', keywords: ['node','express','fastify','koa','nest','nestjs','fastapi','django','flask','spring','quarkus','rails','gin','echo','fiber','actix','axum','rest','graphql','grpc','websocket','backend','server','middleware','oauth','jwt','auth','dotnet','aspnet','blazor','laravel','symfony'] },
      'mobile': { label: 'Mobile Entwicklung', keywords: ['android','ios','flutter','dart','swift','swiftui','kotlin','jetpack','compose','react-native','expo','capacitor','ionic','mobile'] },
      'languages': { label: 'Programmiersprachen', keywords: ['python','typescript','javascript','rust','golang','java','csharp','cpp','ruby','php','scala','elixir','haskell','lua','zig','wasm','deno','bun'] },
      'testing': { label: 'Testing & Qualitaet', keywords: ['test','testing','jest','vitest','mocha','cypress','playwright','selenium','puppeteer','e2e','unit','tdd','bdd','coverage','mock','qa','lint','eslint','benchmark','evaluation','verify','validation','awt','acceptance'] },
      'architecture': { label: 'Software Architektur', keywords: ['architecture','architect','microservices','monolith','ddd','clean','hexagonal','cqrs','event-driven','patterns','solid','mvc','mvvm','modular','monorepo','api-design','domain','c4'] },
      'database': { label: 'Datenbanken', keywords: ['postgres','postgresql','mysql','mongo','mongodb','redis','elasticsearch','supabase','prisma','drizzle','typeorm','orm','sql','nosql','migration','cosmos','dynamodb','cassandra','neo4j','tables','firestore','d1','pinecone','weaviate','qdrant','chromadb','vector','embedding','sqlite'] },
      'devtools': { label: 'Entwickler-Tools', keywords: ['git','github','gitlab','cli','terminal','shell','bash','vim','vscode','debug','debugger','npm','yarn','pnpm','pip','cargo','maven','build','bundler','compiler','snippet','scaffold','generator','changelog','version','release','jq'] },
    },
  },
  'cloud-infrastructure': {
    oldName: 'Cloud & Infrastructure MOC',
    newName: 'Cloud & Infrastruktur',
    icon: '☁️',
    categories: {
      'aws': { label: 'Amazon Web Services', keywords: ['aws','lambda','s3','ec2','ecs','fargate','eks','cloudformation','cdk','sqs','sns','kinesis','dynamodb','rds','aurora','cloudfront','route53','iam','cognito','amplify','sagemaker','bedrock'] },
      'azure': { label: 'Microsoft Azure', keywords: ['azure','functions','blob','cognitive','keyvault','appconfiguration','eventgrid','eventhub','servicebus','signalr','communication','containerregistry','webpubsub','mgmt','maps','voicelive','formrecognizer','contentsafety','contentunderstanding','textanalytics','anomalydetector','identity','batch'] },
      'gcp': { label: 'Google Cloud', keywords: ['gcp','firebase','firestore','cloud-run','bigquery','pubsub','gke','vertex','google-cloud'] },
      'devops': { label: 'DevOps & Deployment', keywords: ['docker','kubernetes','k8s','helm','terraform','pulumi','ansible','ci','cd','pipeline','jenkins','actions','argocd','gitops','deploy','deployment','container','dockerfile','compose','netlify','vercel','cloudflare','workers','azd','infra','infrastructure'] },
      'monitoring': { label: 'Monitoring & Observability', keywords: ['monitoring','observability','logging','tracing','grafana','prometheus','datadog','sentry','opentelemetry','alerting','metrics','apm'] },
    },
  },
  'ai-ml': {
    oldName: 'AI & Machine Learning MOC',
    newName: 'KI & Machine Learning',
    icon: '🤖',
    categories: {
      'llm-agents': { label: 'LLM & KI-Agenten', keywords: ['llm','agent','agents','rag','embeddings','langchain','llamaindex','openai','claude','anthropic','gemini','mistral','llama','gpt','chatgpt','fine-tune','lora','orchestration','multi-agent','agentic','agentflow','tool-use','reasoning','hugging','transformers','model','ai-engineer','ai-agent','autonomous'] },
      'prompt-engineering': { label: 'Prompt Engineering', keywords: ['prompt','prompting','chain-of-thought','few-shot','zero-shot','system-prompt','meta-prompt','prompt-engineer','enhance','optimizer','rewrite'] },
      'ml-data-science': { label: 'ML & Data Science', keywords: ['ml','machine-learning','deep-learning','tensorflow','pytorch','keras','scikit','neural','cnn','rnn','classification','regression','training','dataset','mlops','pandas','numpy','scipy','matplotlib','jupyter','statistics','xgboost','plotly','seaborn','astropy'] },
      'computer-vision': { label: 'Computer Vision', keywords: ['vision','image-classification','object-detection','segmentation','ocr','face','yolo','opencv','image-analysis','recognition'] },
      'nlp': { label: 'Sprachverarbeitung (NLP)', keywords: ['nlp','text-analysis','sentiment','ner','tokenization','summarization','translation','transcription','speech-to-text','tts','stt','whisper','audio','voice'] },
    },
  },
  'design-creative': {
    oldName: 'Design & Kreativ MOC',
    newName: 'Design & Kreativitaet',
    icon: '🎨',
    categories: {
      'ui-ux': { label: 'UI & UX Design', keywords: ['figma','sketch','adobe','wireframe','prototype','design-system','ui','ux','user-experience','color','typography','material','dark-mode','theme','antigravity','stitch','iconsax'] },
      'image-generation': { label: 'Bildgenerierung & KI-Kunst', keywords: ['midjourney','dalle','stable-diffusion','sdxl','flux','comfyui','controlnet','img2img','portrait','poster','illustration','concept-art','ai-art','ai-image','studio-image','diffusion','vizcom'] },
      '3d-animation': { label: '3D & Animation', keywords: ['3d','blender','three','threejs','webgl','animation','motion','lottie','rive','opengl','shader','rendering','game','gaming','unity','unreal','godot','minecraft'] },
      'video-audio': { label: 'Video & Audio Produktion', keywords: ['video','ffmpeg','streaming','youtube','podcast','audio','music','editing','production','invideo','pptx','presentation','slides'] },
    },
  },
  'business-marketing': {
    oldName: 'Business & Marketing MOC',
    newName: 'Business & Marketing',
    icon: '📈',
    categories: {
      'marketing': { label: 'Marketing & SEO', keywords: ['marketing','seo','sem','ppc','ads','ad-creative','campaign','conversion','funnel','landing','ab-test','keyword','organic','aeo','content-marketing','growth','competitor','market-research','trend','audience','influencer','reputation','awareness','scarcity'] },
      'ecommerce': { label: 'E-Commerce & Handel', keywords: ['shopify','woocommerce','magento','stripe','paypal','checkout','payment','ecommerce','commerce','store','shop','pricing','subscription','billing','leiloeiro'] },
      'analytics': { label: 'Analytics & Tracking', keywords: ['analytics','tracking','amplitude','mixpanel','google-analytics','ga4','segment','metrics','kpi','dashboard','report','attribution','bi'] },
      'sales-crm': { label: 'Vertrieb & CRM', keywords: ['crm','hubspot','salesforce','pipedrive','lead','pipeline','prospect','outreach','sales','deal','enablement'] },
      'product-management': { label: 'Produktmanagement', keywords: ['product','roadmap','okr','agile','scrum','kanban','sprint','backlog','user-story','stakeholder','mvp','feature'] },
      'startup': { label: 'Gruendung & Startup', keywords: ['startup','pitch','fundraising','investor','venture','business-model','lean','bootstrap','entrepreneur','founder','niche','smith'] },
    },
  },
  'communication-content': {
    oldName: 'Kommunikation & Content MOC',
    newName: 'Kommunikation & Content',
    icon: '✍️',
    categories: {
      'writing': { label: 'Schreiben & Texten', keywords: ['writing','copywriting','blog','article','storytelling','narrative','creative-writing','technical-writing','ghostwriting','grammar','style','copy','advogado','loki'] },
      'social-media': { label: 'Social Media', keywords: ['twitter','instagram','tiktok','linkedin','facebook','social-media','social','post','reel','hashtag','viral','community','whatsapp','telegram','discord'] },
      'documentation': { label: 'Dokumentation & Wissen', keywords: ['docs','documentation','readme','wiki','technical','api-docs','guide','handbook','playbook','tutorial','reference','obsidian','notion','confluence','diagram'] },
      'email-comms': { label: 'E-Mail & Messaging', keywords: ['email','newsletter','mailchimp','sendgrid','activecampaign','communication','internal-comms','agentmail','agentphone','sms','drip'] },
    },
  },
  'security': {
    oldName: 'Security & Privacy MOC',
    newName: 'Sicherheit & Datenschutz',
    icon: '🔒',
    categories: {
      'app-security': { label: 'Anwendungssicherheit', keywords: ['owasp','xss','sql-injection','csrf','ssrf','authentication','authorization','rbac','encryption','hashing','ssl','tls','security','secure','hardening','007'] },
      'pentesting': { label: 'Penetration Testing', keywords: ['pentest','penetration','bug-bounty','exploit','vulnerability','cve','fuzz','fuzzing','burp','metasploit','red-team','blue-team','attack','privilege','escalation','active-directory','anti-reversing','constant-time'] },
      'compliance': { label: 'Compliance & Datenschutz', keywords: ['gdpr','hipaa','soc2','iso27001','compliance','privacy','audit','policy','data-protection','threat-model','stride','risk','trust','akf'] },
    },
  },
  'data': {
    oldName: 'Data & Analytics MOC',
    newName: 'Daten & Analyse',
    icon: '📊',
    categories: {
      'data-engineering': { label: 'Data Engineering', keywords: ['etl','elt','pipeline','airflow','kafka','spark','flink','dbt','data-warehouse','data-lake','snowflake','stream','ingestion','transform'] },
      'data-analysis': { label: 'Datenanalyse & Reporting', keywords: ['analysis','analyst','reporting','tableau','powerbi','looker','metabase','pivot','aggregation','insight','forecast','excel','csv','alpha-vantage','apify'] },
    },
  },
  'productivity': {
    oldName: 'Produktivitaet & Tools MOC',
    newName: 'Produktivitaet & Werkzeuge',
    icon: '⚡',
    categories: {
      'automation': { label: 'Automatisierung & Workflows', keywords: ['automation','zapier','make','n8n','ifttt','workflow','trigger','webhook','cron','scheduler','rpa','airtable','google-drive','asana','linear','notion','trello','jira','clickup','clipper','diary','last30days','goal','analyze','project-manager'] },
      'developer-experience': { label: 'Developer Experience', keywords: ['dx','tooling','scaffolding','code-gen','boilerplate','starter','config','setup','onboarding','refactoring','code-review','skill-creator','agents','mcp','memory','context','skill-seekers','andruia','consultant'] },
    },
  },
  'life-learning': {
    oldName: 'Leben & Lernen MOC',
    newName: 'Leben & Lernen',
    icon: '🌱',
    categories: {
      'education': { label: 'Bildung & Wissen', keywords: ['learning','education','tutorial','course','teaching','mentoring','coaching','curriculum','study','academic','math','physics','philosophy','history','research','paper','science','karpathy'] },
      'health': { label: 'Gesundheit & Wellness', keywords: ['health','medical','clinical','fitness','exercise','nutrition','diet','recipe','cooking','mental-health','wellness','mindfulness','meditation','stress','chronic','prevention'] },
      'finance': { label: 'Finanzen & Geld', keywords: ['finance','budget','investing','stock','crypto','bitcoin','tax','accounting','insurance','mortgage','savings','banking','fintech'] },
      'career': { label: 'Karriere & Beruf', keywords: ['career','resume','cv','interview','cover-letter','job','hiring','recruiter','salary','negotiation','networking','linkedin','freelance','management','leadership','indeed'] },
      'personal-growth': { label: 'Persoenliche Entwicklung', keywords: ['productivity','habits','goals','journaling','planning','time-management','focus','motivation','reading','book','creativity','innovation','brainstorm','decision','travel','hobby','algorithmic-art'] },
    },
  },
};

// Build keyword index
const kwIndex = {};
for (const [did, d] of Object.entries(DOMAINS)) {
  for (const [cid, c] of Object.entries(d.categories)) {
    for (const kw of c.keywords) {
      kwIndex[kw] = { did, cid, domainName: d.newName, catName: c.label };
    }
  }
}

function extractKeywords(name) {
  return name.replace(/[_\.]/g, '-').split('-').map(w => w.toLowerCase().trim()).filter(w => w.length > 1);
}

function classify(keywords, description) {
  const scores = {};
  for (const kw of keywords) {
    const m = kwIndex[kw];
    if (m) { const k = `${m.did}/${m.cid}`; scores[k] = (scores[k] || 0) + 3; }
  }
  if (description) {
    for (const w of description.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(w => w.length > 2)) {
      const m = kwIndex[w];
      if (m) { const k = `${m.did}/${m.cid}`; scores[k] = (scores[k] || 0) + 1; }
    }
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return { did: 'productivity', cid: 'developer-experience' };
  const [did, cid] = sorted[0][0].split('/');
  return { did, cid };
}

// ════════════════════════════════════════════════════════════════════════════
// STEP 1: Rename MOCs — Remove "MOC", use better names
// ════════════════════════════════════════════════════════════════════════════

function step1_renameMOCs() {
  console.log('1. MOCs umbenennen...');
  for (const [, d] of Object.entries(DOMAINS)) {
    const oldFile = path.join(MOCS_DIR, `${d.oldName}.md`);
    const newFile = path.join(MOCS_DIR, `${d.newName}.md`);
    if (fs.existsSync(oldFile) && oldFile !== newFile) {
      fs.renameSync(oldFile, newFile);
      console.log(`   ${d.oldName} → ${d.newName}`);
    }
  }
  // Also rename Skills MOC and Prompts MOC
  const renames = [
    ['Skills MOC.md', 'Skills Uebersicht.md'],
    ['Prompts MOC.md', 'Prompt Sammlung.md'],
    ['Code MOC.md', 'Code & Snippets.md'],
    ['Tools MOC.md', 'Tools & Software.md'],
    ['Projects MOC.md', 'Projekte.md'],
    ['Areas MOC.md', 'Lebensbereiche.md'],
    ['Resources MOC.md', 'Ressourcen.md'],
    ['Decisions MOC.md', 'Entscheidungen.md'],
    ['People MOC.md', 'Kontakte.md'],
    ['Meetings MOC.md', 'Meetings.md'],
    ['Templates MOC.md', 'Vorlagen.md'],
    ['System MOC.md', 'System.md'],
  ];
  for (const [old, neu] of renames) {
    const oldF = path.join(MOCS_DIR, old);
    const newF = path.join(MOCS_DIR, neu);
    if (fs.existsSync(oldF)) {
      fs.renameSync(oldF, newF);
      console.log(`   ${old} → ${neu}`);
    }
  }
}

// ════════════════════════════════════════════════════════════════════════════
// STEP 2: Create category pages (Layer 1)
// ════════════════════════════════════════════════════════════════════════════

function step2_createCategoryPages() {
  console.log('2. Kategorie-Seiten erstellen...');
  let created = 0;

  for (const [did, domain] of Object.entries(DOMAINS)) {
    for (const [cid, cat] of Object.entries(domain.categories)) {
      const filePath = path.join(MOCS_DIR, `${cat.label}.md`);
      // Don't overwrite if exists
      if (fs.existsSync(filePath)) continue;

      const content = `---
type: kategorie
created: ${TODAY}
updated: ${TODAY}
domain: ${did}
category: ${cid}
tags:
  - kategorie
  - ${did}
  - ${cid}
---

# ${cat.label}

> Kategorie in ${domain.icon} [[${domain.newName}]]

---

## Skills

\`\`\`dataview
TABLE description AS "Beschreibung"
FROM "03 - Resources/Skills"
WHERE category = "${cid}"
SORT file.name ASC
\`\`\`

---

## Connections

- **Domain:** [[${domain.newName}]]
- **Navigation:** [[Skills Uebersicht]], [[Home]]
`;
      fs.writeFileSync(filePath, content, 'utf-8');
      created++;
    }
  }
  console.log(`   ${created} Kategorie-Seiten erstellt.`);
}

// ════════════════════════════════════════════════════════════════════════════
// STEP 3: Scan non-MD files + Rewrite ALL skill connections
// ════════════════════════════════════════════════════════════════════════════

function step3_rewireSkills() {
  console.log('3. Skills komplett neu verdrahten...');

  const allDirs = [];
  // Collect all skill dirs (including nested)
  function walkSkills(dir, depth) {
    if (depth > 3) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const hasSkill = entries.some(e => e.name === 'SKILL.md');
    if (hasSkill) allDirs.push(dir);
    for (const e of entries) {
      if (e.isDirectory() && !e.name.startsWith('.')) {
        walkSkills(path.join(dir, e.name), depth + 1);
      }
    }
  }
  walkSkills(SKILLS_DIR, 0);

  let updated = 0;
  const skillIndex = {}; // cid → [skills]

  for (const skillDir of allDirs) {
    const skillFile = path.join(skillDir, 'SKILL.md');
    try {
      let content = norm(fs.readFileSync(skillFile, 'utf-8'));
      const { fm, body } = parseFm(content);
      if (!fm) continue;

      const name = fmField(fm, 'name') || path.basename(skillDir);
      const description = fmField(fm, 'description');
      const risk = fmField(fm, 'risk') || 'unknown';
      const source = fmField(fm, 'source') || 'community';
      const dateAdded = fmField(fm, 'date_added') || fmField(fm, 'created') || '2026-02-27';

      const keywords = extractKeywords(path.basename(skillDir));
      const { did, cid } = classify(keywords, description);
      const domain = DOMAINS[did];
      const cat = domain.categories[cid];

      // Collect non-MD files
      const nonMdFiles = [];
      function walkFiles(dir) {
        try {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const e of entries) {
            const fullPath = path.join(dir, e.name);
            if (e.isDirectory()) { walkFiles(fullPath); }
            else if (!e.name.endsWith('.md') && e.name !== 'metadata.json' && e.name !== '.gitkeep') {
              const relPath = path.relative(skillDir, fullPath).replace(/\\/g, '/');
              nonMdFiles.push({ name: e.name, relPath, ext: path.extname(e.name).slice(1) });
            }
          }
        } catch {}
      }
      walkFiles(skillDir);

      // Build tags
      const stopWords = new Set(['best','practices','expert','development','patterns','guide','skills','skill','tool','tools','the','and','for','with','from','pro','max','new','old','v2','py','ts','js','md','dotnet','java','advanced','basic','simple','ultimate','complete','comprehensive','custom','modern','smart','00','10','20','007']);
      const meaningful = keywords.filter(w => !stopWords.has(w) && w.length > 2);
      const tags = new Set(['skill', did, cid]);
      meaningful.slice(0, 3).forEach(w => tags.add(w));

      // New frontmatter
      const newFm = [
        '---',
        `name: "${name.replace(/"/g, '\\"')}"`,
        `description: "${(description || '').replace(/"/g, '\\"')}"`,
        `type: skill`,
        `created: ${dateAdded.replace(/'/g, '')}`,
        `domain: ${did}`,
        `category: ${cid}`,
        `risk: ${risk}`,
        `source: ${source}`,
        'tags:',
        ...[...tags].map(t => `  - ${t}`),
        '---',
      ].join('\n');

      // Clean body (remove old Connections)
      let cleanBody = body.replace(/\n## Connections[\s\S]*$/m, '').trimEnd();

      // Build Connections
      const conn = ['\n\n## Connections\n'];
      conn.push(`- **Domain:** [[${domain.newName}]]`);
      conn.push(`- **Kategorie:** [[${cat.label}]]`);

      // Non-MD files
      if (nonMdFiles.length > 0) {
        conn.push('- **Dateien:**');
        // Group by extension
        const byExt = {};
        for (const f of nonMdFiles) {
          if (!byExt[f.ext]) byExt[f.ext] = [];
          byExt[f.ext].push(f);
        }
        for (const [ext, files] of Object.entries(byExt).sort()) {
          if (files.length <= 3) {
            for (const f of files) conn.push(`  - \`${f.relPath}\``);
          } else {
            conn.push(`  - ${files.length}x .${ext} (\`${files[0].relPath}\`, ...)`);
          }
        }
      }

      conn.push('- **Navigation:** [[Skills Uebersicht]], [[Home]]');

      const newContent = newFm + cleanBody + conn.join('\n') + '\n';
      fs.writeFileSync(skillFile, newContent, 'utf-8');
      updated++;

      // Track for category index
      if (!skillIndex[cid]) skillIndex[cid] = [];
      skillIndex[cid].push({ name, description, did, cid });
    } catch (err) {
      // Skip silently
    }
  }

  console.log(`   ${updated} Skills neu verdrahtet.`);
  return skillIndex;
}

// ════════════════════════════════════════════════════════════════════════════
// STEP 4: Check + fix prompt categorization
// ════════════════════════════════════════════════════════════════════════════

const PROMPT_CAT_KEYWORDS = {
  'Technik im Alltag': ['code','programming','software','app','web','api','developer','tech','computer','server','database','cloud','ai','robot','automation','script','html','css','javascript','python','algorithm','debug','deploy','framework','library','sdk','terminal','linux','windows','network','cyber','hack','blockchain','crypto','token','nft','smart-contract','machine-learning','data','analytics'],
  'Bild & Visualisierung': ['image','photo','picture','visual','design','art','draw','paint','illustration','graphic','poster','portrait','comic','anime','style','aesthetic','render','3d','animation','video','camera','photography','midjourney','dalle','stable-diffusion','sdxl','prompt','wallpaper','logo','icon','banner','thumbnail'],
  'Beruf & Karriere': ['job','career','work','business','company','employee','manager','leadership','resume','cv','interview','salary','office','meeting','presentation','strategy','marketing','sales','customer','client','project','team','hr','recruit','professional','consulting','freelance','startup','entrepreneur','investor','pitch','negotiation'],
  'Kommunikation & Beziehungen': ['communication','relationship','conversation','talk','speak','write','letter','email','message','social','friend','family','partner','love','conflict','feedback','empathy','listen','persuade','argue','debate','apologize','compliment','network','team','collaborate'],
  'Lernen & Wachstum': ['learn','study','education','school','university','course','book','read','research','science','math','language','translate','teach','tutor','exam','quiz','knowledge','skill','practice','memory','brain','think','analyze','understand','explain','summarize','essay','paper','thesis'],
  'Gesundheit & Wohlbefinden': ['health','medical','doctor','hospital','symptom','disease','therapy','mental','stress','anxiety','depression','fitness','exercise','workout','yoga','meditation','nutrition','diet','food','recipe','cook','meal','sleep','weight','body','wellness','mindfulness','self-care'],
  'Alltag & Leben': ['daily','routine','home','house','clean','organize','plan','budget','money','finance','tax','insurance','travel','trip','car','shopping','garden','pet','child','parent','family','birthday','wedding','holiday','weather','move','repair','diy'],
  'Kreativität & Freizeit': ['creative','story','poem','song','music','game','play','hobby','craft','fiction','novel','character','world-building','fantasy','adventure','mystery','horror','romance','comedy','drama','brainstorm','idea','inspiration','fun','entertainment','puzzle','riddle'],
  'Spezielle Situationen': ['emergency','crisis','conflict','legal','law','court','police','accident','death','grief','divorce','abuse','bully','discrimination','refugee','disability','addiction','trauma','poverty','homeless','disaster','war','protest'],
};

function step4_checkPrompts() {
  console.log('4. Prompt-Kategorisierung pruefen...');
  let correct = 0, moved = 0, checked = 0;

  const categories = fs.readdirSync(PROMPTS_DIR).filter(f => {
    try { return fs.statSync(path.join(PROMPTS_DIR, f)).isDirectory(); } catch { return false; }
  });

  for (const cat of categories) {
    const catDir = path.join(PROMPTS_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));

    for (const file of files) {
      checked++;
      const filePath = path.join(catDir, file);
      try {
        const content = norm(fs.readFileSync(filePath, 'utf-8'));

        // Extract prompt text (after ## Prompt or after second ---)
        const promptMatch = content.match(/## Prompt\s*\n([\s\S]*?)(?:\n## |$)/);
        const promptText = promptMatch ? promptMatch[1].toLowerCase() : content.toLowerCase();

        // Score against each category
        const scores = {};
        for (const [testCat, keywords] of Object.entries(PROMPT_CAT_KEYWORDS)) {
          let score = 0;
          for (const kw of keywords) {
            if (promptText.includes(kw)) score++;
          }
          scores[testCat] = score;
        }

        // Find best match
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const bestCat = sorted[0][0];
        const bestScore = sorted[0][1];
        const currentScore = scores[cat] || 0;

        // Only move if best score is significantly higher AND current score is very low
        if (bestCat !== cat && bestScore > 3 && currentScore < 2 && bestScore > currentScore * 3) {
          const newDir = path.join(PROMPTS_DIR, bestCat);
          const newPath = path.join(newDir, file);
          if (!fs.existsSync(newPath)) {
            fs.renameSync(filePath, newPath);
            moved++;
          }
        } else {
          correct++;
        }
      } catch {}
    }
  }

  console.log(`   ${checked} geprueft, ${correct} korrekt, ${moved} verschoben.`);
}

// ════════════════════════════════════════════════════════════════════════════
// STEP 5: Rewrite Prompts connections with new names
// ════════════════════════════════════════════════════════════════════════════

function step5_rewirePrompts(skillIndex) {
  console.log('5. Prompt-Connections aktualisieren...');
  let updated = 0;

  // Build keyword → skills for linking
  const kwToSkills = {};
  for (const [cid, skills] of Object.entries(skillIndex)) {
    for (const s of skills) {
      const kws = extractKeywords(s.name);
      for (const kw of kws) {
        if (!kwToSkills[kw]) kwToSkills[kw] = [];
        if (kwToSkills[kw].length < 5) kwToSkills[kw].push(s);
      }
    }
  }

  const PROMPT_CAT_DOMAIN = {
    'Alltag & Leben': 'Leben & Lernen',
    'Beruf & Karriere': 'Business & Marketing',
    'Bild & Visualisierung': 'Design & Kreativitaet',
    'Gesundheit & Wohlbefinden': 'Leben & Lernen',
    'Kommunikation & Beziehungen': 'Kommunikation & Content',
    'Kreativität & Freizeit': 'Design & Kreativitaet',
    'Lernen & Wachstum': 'Leben & Lernen',
    'Spezielle Situationen': 'Leben & Lernen',
    'Technik im Alltag': 'Software Entwicklung',
  };

  const categories = fs.readdirSync(PROMPTS_DIR).filter(f => {
    try { return fs.statSync(path.join(PROMPTS_DIR, f)).isDirectory(); } catch { return false; }
  });

  for (const cat of categories) {
    const catDir = path.join(PROMPTS_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
    const domainName = PROMPT_CAT_DOMAIN[cat] || 'Leben & Lernen';

    for (const file of files) {
      const filePath = path.join(catDir, file);
      try {
        let content = norm(fs.readFileSync(filePath, 'utf-8'));
        const { fm } = parseFm(content);
        const tags = [];
        // Extract tags from both YAML blocks
        const tagMatches = content.matchAll(/tags:\s*\[([^\]]*)\]/g);
        for (const m of tagMatches) {
          tags.push(...m[1].split(',').map(t => t.trim().replace(/^['"]|['"]$/g, '').toLowerCase()).filter(Boolean));
        }
        const tagList = content.matchAll(/tags:\s*\n((?:\s+-\s+.+\n?)*)/g);
        for (const m of tagList) {
          tags.push(...m[1].split('\n').map(l => l.replace(/^\s*-\s*/, '').trim().toLowerCase()).filter(Boolean));
        }

        // Find matching skills
        const matched = new Set();
        for (const t of [...new Set(tags)]) {
          const kw = t.replace(/\s+/g, '-');
          if (kwToSkills[kw]) {
            for (const s of kwToSkills[kw]) matched.add(JSON.stringify({ name: s.name }));
          }
        }

        // Remove old connections
        content = content.replace(/\n## Connections[\s\S]*$/m, '').trimEnd();

        // New connections
        const conn = ['\n\n## Connections\n'];
        conn.push(`- **Domain:** [[${domainName}]]`);
        conn.push(`- **Kategorie:** [[${cat}]]`);
        conn.push(`- **Sammlung:** [[Prompt Sammlung]]`);

        const skills = [...matched].slice(0, 3).map(s => JSON.parse(s));
        if (skills.length > 0) {
          conn.push('- **Passende Skills:**');
          for (const s of skills) conn.push(`  - [[${s.name}|${s.name}]]`);
        }

        content += conn.join('\n') + '\n';
        fs.writeFileSync(filePath, content, 'utf-8');
        updated++;
      } catch {}
    }
  }

  console.log(`   ${updated} Prompts aktualisiert.`);
}

// ════════════════════════════════════════════════════════════════════════════
// STEP 6: Rewrite domain pages with new names
// ════════════════════════════════════════════════════════════════════════════

function step6_rewriteDomainPages(skillIndex) {
  console.log('6. Domain-Seiten neu schreiben...');

  for (const [did, domain] of Object.entries(DOMAINS)) {
    const filePath = path.join(MOCS_DIR, `${domain.newName}.md`);
    let totalSkills = 0;
    const catCounts = {};

    for (const [cid, cat] of Object.entries(domain.categories)) {
      const count = (skillIndex[cid] || []).length;
      catCounts[cid] = count;
      totalSkills += count;
    }

    const lines = [
      '---',
      'type: domain',
      `created: ${TODAY}`,
      `updated: ${TODAY}`,
      'tags:',
      '  - domain',
      `  - ${did}`,
      '  - navigation',
      '---',
      '',
      `# ${domain.icon} ${domain.newName}`,
      '',
      `> **${totalSkills} Skills** in ${Object.keys(domain.categories).length} Kategorien`,
      '',
      '---',
      '',
      '## Kategorien',
      '',
      '| Kategorie | Skills | Beschreibung |',
      '|-----------|--------|-------------|',
    ];

    for (const [cid, cat] of Object.entries(domain.categories)) {
      lines.push(`| [[${cat.label}]] | ${catCounts[cid] || 0} | ${cat.keywords.slice(0, 5).join(', ')} |`);
    }

    lines.push('');
    lines.push('---');
    lines.push('');

    // List skills per category
    for (const [cid, cat] of Object.entries(domain.categories)) {
      const skills = skillIndex[cid] || [];
      if (skills.length === 0) continue;

      lines.push(`## ${cat.label}`);
      lines.push('');

      skills.sort((a, b) => a.name.localeCompare(b.name));
      for (const s of skills) {
        const desc = (s.description || '').length > 70 ? s.description.slice(0, 67) + '...' : (s.description || '');
        lines.push(`- **${s.name}** — ${desc}`);
      }
      lines.push('');
    }

    lines.push('---');
    lines.push('');
    lines.push('## Connections');
    lines.push('');
    lines.push('- **Navigation:** [[Skills Uebersicht]], [[Home]]');

    const otherDomains = Object.entries(DOMAINS)
      .filter(([id]) => id !== did)
      .map(([, d]) => `[[${d.newName}]]`);
    lines.push(`- **Andere Domains:** ${otherDomains.join(', ')}`);
    lines.push('');

    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  }
  console.log('   10 Domain-Seiten geschrieben.');
}

// ════════════════════════════════════════════════════════════════════════════
// STEP 7: Rewrite master pages
// ════════════════════════════════════════════════════════════════════════════

function step7_rewriteMasterPages(skillIndex) {
  console.log('7. Master-Seiten aktualisieren...');

  let totalSkills = 0;
  for (const skills of Object.values(skillIndex)) totalSkills += skills.length;

  // Skills Uebersicht
  const skillLines = [
    '---',
    'type: uebersicht',
    `created: 2026-04-09`,
    `updated: ${TODAY}`,
    'tags:',
    '  - uebersicht',
    '  - skills',
    '  - navigation',
    '  - knowledge-graph',
    '---',
    '',
    '# Skills Uebersicht',
    '',
    `> **${totalSkills} Skills** in 10 Wissensgebieten`,
    '',
    '---',
    '',
    '## Wissensgebiete',
    '',
    '| Gebiet | Skills | Kategorien |',
    '|--------|--------|------------|',
  ];

  for (const [did, domain] of Object.entries(DOMAINS)) {
    let count = 0;
    for (const cid of Object.keys(domain.categories)) {
      count += (skillIndex[cid] || []).length;
    }
    if (count === 0) continue;
    skillLines.push(`| ${domain.icon} [[${domain.newName}]] | ${count} | ${Object.keys(domain.categories).length} |`);
  }

  skillLines.push('');
  skillLines.push('---');
  skillLines.push('');
  skillLines.push('## Taxonomie');
  skillLines.push('');
  skillLines.push('```');
  skillLines.push('Wissensgebiet  →  Kategorie  →  Skill');
  skillLines.push('   (10)             (~50)        (1377)');
  skillLines.push('```');
  skillLines.push('');
  skillLines.push('## Connections');
  skillLines.push('');
  skillLines.push('- **Navigation:** [[Home]], [[Prompt Sammlung]], [[Ressourcen]]');
  skillLines.push('');

  fs.writeFileSync(path.join(MOCS_DIR, 'Skills Uebersicht.md'), skillLines.join('\n'), 'utf-8');

  // Prompt-Kategorie MOCs aktualisieren mit neuen Domain-Namen
  const PROMPT_CAT_DOMAIN = {
    'Alltag & Leben': 'Leben & Lernen',
    'Beruf & Karriere': 'Business & Marketing',
    'Bild & Visualisierung': 'Design & Kreativitaet',
    'Gesundheit & Wohlbefinden': 'Leben & Lernen',
    'Kommunikation & Beziehungen': 'Kommunikation & Content',
    'Kreativität & Freizeit': 'Design & Kreativitaet',
    'Lernen & Wachstum': 'Leben & Lernen',
    'Spezielle Situationen': 'Leben & Lernen',
    'Technik im Alltag': 'Software Entwicklung',
  };

  for (const [cat, domainName] of Object.entries(PROMPT_CAT_DOMAIN)) {
    const catFile = path.join(MOCS_DIR, `${cat}.md`);
    if (!fs.existsSync(catFile)) continue;
    let content = norm(fs.readFileSync(catFile, 'utf-8'));
    // Fix domain reference
    content = content.replace(/\[\[.*?MOC\|/g, `[[${domainName}|`);
    content = content.replace(/\[\[.*?MOC\]\]/g, `[[${domainName}]]`);
    content = content.replace(/\[\[Prompts MOC\]\]/g, '[[Prompt Sammlung]]');
    content = content.replace(/\[\[Skills MOC\]\]/g, '[[Skills Uebersicht]]');
    fs.writeFileSync(catFile, content, 'utf-8');
  }

  // Prompt Sammlung
  const promptStats = {};
  const cats = fs.readdirSync(PROMPTS_DIR).filter(f => {
    try { return fs.statSync(path.join(PROMPTS_DIR, f)).isDirectory(); } catch { return false; }
  });
  for (const c of cats) {
    promptStats[c] = fs.readdirSync(path.join(PROMPTS_DIR, c)).filter(f => f.endsWith('.md')).length;
  }
  const totalPrompts = Object.values(promptStats).reduce((a, b) => a + b, 0);

  const pLines = [
    '---',
    'type: uebersicht',
    `created: 2026-04-09`,
    `updated: ${TODAY}`,
    'tags:',
    '  - uebersicht',
    '  - prompts',
    '  - navigation',
    '---',
    '',
    '# Prompt Sammlung',
    '',
    `> **${totalPrompts} Prompts** in ${cats.length} Kategorien`,
    '',
    '---',
    '',
    '## Kategorien',
    '',
    '| Kategorie | Anzahl | Wissensgebiet |',
    '|-----------|--------|---------------|',
  ];
  for (const [c, count] of Object.entries(promptStats).sort((a, b) => b[1] - a[1])) {
    const dn = PROMPT_CAT_DOMAIN[c] || 'Leben & Lernen';
    pLines.push(`| [[${c}]] | ${count} | [[${dn}]] |`);
  }
  pLines.push('');
  pLines.push('## Connections');
  pLines.push('');
  pLines.push('- **Navigation:** [[Home]], [[Skills Uebersicht]], [[Ressourcen]]');
  pLines.push('');

  fs.writeFileSync(path.join(MOCS_DIR, 'Prompt Sammlung.md'), pLines.join('\n'), 'utf-8');
  console.log('   Skills Uebersicht + Prompt Sammlung geschrieben.');
}

// ════════════════════════════════════════════════════════════════════════════
// STEP 8: Rewrite Home.md
// ════════════════════════════════════════════════════════════════════════════

function step8_rewriteHome() {
  console.log('8. Home.md aktualisieren...');
  const content = `---
type: home
tags:
  - navigation
  - home
---

# Firstbrain

> Du denkst — ich organisiere.

---

## Wissensgebiete

| Gebiet | Beschreibung |
|--------|-------------|
| [[Software Entwicklung]] | Frontend, Backend, Mobile, Sprachen, Testing, Architektur, Datenbanken |
| [[Cloud & Infrastruktur]] | AWS, Azure, Google Cloud, DevOps, Monitoring |
| [[KI & Machine Learning]] | LLM, KI-Agenten, Prompt Engineering, ML, Computer Vision, NLP |
| [[Design & Kreativitaet]] | UI/UX, Bildgenerierung, 3D & Animation, Video & Audio |
| [[Business & Marketing]] | Marketing, E-Commerce, Analytics, Vertrieb, Produktmanagement |
| [[Kommunikation & Content]] | Schreiben, Social Media, Dokumentation, E-Mail |
| [[Sicherheit & Datenschutz]] | Anwendungssicherheit, Penetration Testing, Compliance |
| [[Daten & Analyse]] | Data Engineering, Datenanalyse & Reporting |
| [[Produktivitaet & Werkzeuge]] | Automatisierung, Developer Experience |
| [[Leben & Lernen]] | Bildung, Gesundheit, Finanzen, Karriere, Persoenliche Entwicklung |

---

## Prompt-Sammlungen

| Kategorie | Link |
|-----------|------|
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

## Schnell-Aktionen

| Ziel | Link |
|------|------|
| Projekt starten | [[New Project]] |
| Bereich anlegen | [[New Area]] |
| Wissen sichern | [[New Resource]] |
| Tool dokumentieren | [[New Tool]] |
| Idee festhalten | [[New Zettel]] |
| Entscheidung loggen | [[New Decision]] |
| Kontakt pflegen | [[New Person]] |
| Meeting erfassen | [[New Meeting]] |
| Code-Snippet | [[New Snippet]] |

---

## Vault

| Bereich | Link |
|---------|------|
| Skills | [[Skills Uebersicht]] |
| Prompts | [[Prompt Sammlung]] |
| Projekte | [[Projekte]] |
| Lebensbereiche | [[Lebensbereiche]] |
| Ressourcen | [[Ressourcen]] |
| Entscheidungen | [[Entscheidungen]] |
| Tools | [[Tools & Software]] |
| Kontakte | [[Kontakte]] |
| Code | [[Code & Snippets]] |
| Vorlagen | [[Vorlagen]] |
| System | [[System]] |

---

## Status

### Aktive Projekte
\`\`\`dataview
TABLE status, priority, area
FROM "01 - Projects"
WHERE status = "active"
SORT priority ASC
\`\`\`

### Letzte Aenderungen
\`\`\`dataview
TABLE file.mtime AS "Geaendert", type
FROM ""
WHERE type AND type != "home" AND type != "domain" AND type != "kategorie"
SORT file.mtime DESC
LIMIT 8
\`\`\`

---

## Hilfe

- [[START HERE]] — Onboarding
- [[Workflow Guide]] — Routinen
- [[Cheatsheet]] — Befehle
- [[Tag Conventions]] — Tags
`;
  fs.writeFileSync(path.join(VAULT, 'Home.md'), content, 'utf-8');
  console.log('   Home.md geschrieben.');
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════════════

console.log('══════════════════════════════════════════');
console.log('  BRAIN REWIRE v2');
console.log('══════════════════════════════════════════\n');

step1_renameMOCs();
step2_createCategoryPages();
const skillIndex = step3_rewireSkills();
step4_checkPrompts();
step5_rewirePrompts(skillIndex);
step6_rewriteDomainPages(skillIndex);
step7_rewriteMasterPages(skillIndex);
step8_rewriteHome();

console.log('\n══════════════════════════════════════════');
console.log('  FERTIG');
console.log('══════════════════════════════════════════');
