/**
 * Firstbrain Knowledge Graph Builder
 *
 * Professionelle 3-Layer Taxonomie:
 *   Layer 0: Domains (10 Hauptbereiche)
 *   Layer 1: Categories (~50 Unterkategorien)
 *   Layer 2: Items (Skills + Prompts)
 *
 * Jedes Item bekommt:
 *   - domain + category Tags (hierarchisch)
 *   - Cross-Links zu verwandten Items
 *   - MOC-Zuordnung
 *   - Einheitliches Frontmatter
 */

const fs = require('fs');
const path = require('path');

const VAULT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(VAULT, '03 - Resources', 'Skills');
const PROMPTS_DIR = path.join(VAULT, '03 - Resources', 'Prompts');
const MOCS_DIR = path.join(VAULT, '06 - Atlas', 'MOCs');
const TODAY = '2026-04-11';

// ════════════════════════════════════════════════════════════════════════════
// TAXONOMY DEFINITION — Das Herzstück des Knowledge Graphs
// ════════════════════════════════════════════════════════════════════════════

const TAXONOMY = {
  'software-development': {
    label: 'Software Development',
    icon: '💻',
    categories: {
      'frontend': {
        label: 'Frontend',
        keywords: ['react', 'angular', 'vue', 'svelte', 'next', 'nextjs', 'nuxt', 'remix',
          'solid', 'qwik', 'astro', 'gatsby', 'vite', 'webpack', 'rollup', 'parcel',
          'css', 'sass', 'scss', 'less', 'tailwind', 'bootstrap', 'radix', 'shadcn',
          'html', 'dom', 'spa', 'ssr', 'ssg', 'hydration', 'component', 'storybook',
          'frontend', 'web', 'browser', 'pwa', 'responsive', 'layout', 'grid', 'flex',
          'htmx', 'alpine', 'lit', 'stimulus', 'turbo', 'hotwire', 'ember', 'polymer',
          'preact', 'inferno', 'mithril', 'marko', 'animejs', 'framer', 'motion',
          'threejs', 'webgl', 'canvas', 'svg', 'accessibility', 'a11y', 'aria',
          'stitch', 'polaris', 'avalonia', 'zafiro', 'makepad', 'tauri', 'electron'],
      },
      'backend': {
        label: 'Backend',
        keywords: ['node', 'express', 'fastify', 'koa', 'hapi', 'nest', 'nestjs',
          'fastapi', 'django', 'flask', 'tornado', 'aiohttp', 'starlette',
          'spring', 'quarkus', 'micronaut', 'vert', 'jersey',
          'rails', 'sinatra', 'gin', 'echo', 'fiber', 'chi',
          'actix', 'axum', 'warp', 'rocket',
          'rest', 'graphql', 'grpc', 'websocket', 'socket',
          'backend', 'server', 'middleware', 'cors', 'rate',
          'oauth', 'jwt', 'session', 'auth', 'authentication',
          'dotnet', 'aspnet', 'blazor', 'maui',
          'laravel', 'symfony', 'slim', 'lumen'],
      },
      'mobile': {
        label: 'Mobile',
        keywords: ['android', 'ios', 'flutter', 'dart', 'swift', 'swiftui', 'uikit',
          'kotlin', 'jetpack', 'compose', 'react-native', 'expo', 'capacitor',
          'ionic', 'cordova', 'xamarin', 'maui', 'mobile', 'app-store',
          'play-store', 'push-notification', 'deep-link'],
      },
      'languages': {
        label: 'Programmiersprachen',
        keywords: ['python', 'typescript', 'javascript', 'rust', 'golang',
          'java', 'csharp', 'cpp', 'ruby', 'php', 'scala', 'elixir',
          'erlang', 'haskell', 'clojure', 'lua', 'perl', 'zig',
          'assembly', 'wasm', 'webassembly', 'deno', 'bun'],
      },
      'testing': {
        label: 'Testing & QA',
        keywords: ['test', 'testing', 'jest', 'vitest', 'mocha', 'cypress', 'playwright',
          'selenium', 'puppeteer', 'e2e', 'unit', 'integration', 'tdd', 'bdd',
          'coverage', 'snapshot', 'mock', 'stub', 'fixture', 'assertion',
          'qa', 'quality', 'lint', 'eslint', 'prettier', 'sonar',
          'benchmark', 'load-test', 'stress', 'acceptance', 'regression',
          'evaluation', 'verify', 'validation', 'awt'],
      },
      'architecture': {
        label: 'Architektur',
        keywords: ['architecture', 'architect', 'microservices', 'monolith', 'serverless',
          'ddd', 'clean', 'hexagonal', 'cqrs', 'event-driven', 'event-sourcing',
          'saga', 'patterns', 'solid', 'design-patterns', 'mvc', 'mvvm',
          'repository', 'factory', 'observer', 'strategy', 'decorator',
          'modular', 'monorepo', 'turborepo', 'nx', 'lerna',
          'api-design', 'domain', 'boundary', 'aggregate', 'c4'],
      },
      'database': {
        label: 'Datenbanken',
        keywords: ['postgres', 'postgresql', 'mysql', 'mariadb', 'sqlite',
          'mongo', 'mongodb', 'redis', 'memcached', 'elasticsearch',
          'supabase', 'prisma', 'drizzle', 'typeorm', 'sequelize', 'knex',
          'orm', 'sql', 'nosql', 'migration', 'schema', 'index',
          'cosmos', 'dynamodb', 'cassandra', 'couchdb', 'neo4j',
          'tables', 'firestore', 'd1', 'planetscale', 'neon',
          'timescale', 'clickhouse', 'duckdb', 'pinecone', 'weaviate',
          'qdrant', 'chromadb', 'vector', 'embedding'],
      },
      'devtools': {
        label: 'Dev Tools',
        keywords: ['git', 'github', 'gitlab', 'bitbucket', 'cli', 'terminal',
          'shell', 'bash', 'zsh', 'powershell', 'vim', 'neovim',
          'vscode', 'ide', 'debug', 'debugger', 'profiler',
          'package', 'npm', 'yarn', 'pnpm', 'pip', 'cargo', 'maven', 'gradle',
          'build', 'bundler', 'compiler', 'transpiler',
          'snippet', 'boilerplate', 'scaffold', 'generator', 'template',
          'changelog', 'version', 'semver', 'release', 'jq'],
      },
    },
  },

  'cloud-infrastructure': {
    label: 'Cloud & Infrastructure',
    icon: '☁️',
    categories: {
      'aws': {
        label: 'AWS',
        keywords: ['aws', 'lambda', 's3', 'ec2', 'ecs', 'fargate', 'eks',
          'cloudformation', 'cdk', 'sqs', 'sns', 'kinesis', 'dynamodb',
          'rds', 'aurora', 'cloudfront', 'route53', 'iam', 'cognito',
          'amplify', 'sagemaker', 'bedrock', 'stepfunctions',
          'eventbridge', 'appsync', 'elasticache'],
      },
      'azure': {
        label: 'Azure',
        keywords: ['azure', 'functions', 'blob', 'cognitive', 'devops',
          'active-directory', 'entra', 'keyvault', 'appconfiguration',
          'eventgrid', 'eventhub', 'servicebus', 'signalr',
          'communication', 'containerregistry', 'webpubsub',
          'mgmt', 'maps', 'voicelive', 'formrecognizer',
          'contentsafety', 'contentunderstanding', 'textanalytics',
          'anomalydetector', 'identity', 'batch'],
      },
      'gcp': {
        label: 'Google Cloud',
        keywords: ['gcp', 'firebase', 'firestore', 'cloud-run', 'cloud-functions',
          'bigquery', 'pubsub', 'gke', 'vertex', 'google-cloud',
          'app-engine', 'cloud-storage', 'spanner'],
      },
      'devops': {
        label: 'DevOps & CI/CD',
        keywords: ['docker', 'kubernetes', 'k8s', 'helm', 'istio',
          'terraform', 'pulumi', 'ansible', 'chef', 'puppet',
          'ci', 'cd', 'pipeline', 'jenkins', 'actions', 'circleci',
          'argocd', 'flux', 'gitops', 'deploy', 'deployment',
          'container', 'registry', 'image', 'dockerfile',
          'compose', 'swarm', 'nomad', 'vagrant',
          'netlify', 'vercel', 'cloudflare', 'workers', 'pages',
          'azd', 'appdeploy', 'infra', 'infrastructure'],
      },
      'monitoring': {
        label: 'Monitoring & Observability',
        keywords: ['monitoring', 'observability', 'logging', 'tracing',
          'grafana', 'prometheus', 'datadog', 'newrelic', 'sentry',
          'elk', 'kibana', 'logstash', 'fluentd', 'opentelemetry',
          'alerting', 'metrics', 'apm', 'uptime', 'healthcheck'],
      },
    },
  },

  'ai-ml': {
    label: 'AI & Machine Learning',
    icon: '🤖',
    categories: {
      'llm-agents': {
        label: 'LLM & Agents',
        keywords: ['llm', 'agent', 'agents', 'rag', 'embeddings',
          'langchain', 'llamaindex', 'openai', 'claude', 'anthropic',
          'gemini', 'mistral', 'llama', 'gpt', 'chatgpt',
          'fine-tune', 'lora', 'qlora', 'peft',
          'orchestration', 'multi-agent', 'agentic', 'agentflow',
          'tool-use', 'function-calling', 'reasoning',
          'context', 'token', 'inference', 'serving',
          'hugging', 'transformers', 'model', 'foundation',
          'ai-engineer', 'ai-agent', 'autonomous'],
      },
      'prompt-engineering': {
        label: 'Prompt Engineering',
        keywords: ['prompt', 'prompting', 'chain-of-thought', 'cot',
          'few-shot', 'zero-shot', 'template', 'system-prompt',
          'instruction', 'meta-prompt', 'prompt-engineer',
          'prompt-injection', 'jailbreak', 'guardrail',
          'enhance', 'optimizer', 'rewrite'],
      },
      'ml-data-science': {
        label: 'ML & Data Science',
        keywords: ['ml', 'machine-learning', 'deep-learning',
          'tensorflow', 'pytorch', 'keras', 'scikit',
          'neural', 'cnn', 'rnn', 'transformer', 'attention',
          'classification', 'regression', 'clustering',
          'training', 'dataset', 'feature', 'preprocessing',
          'mlops', 'experiment', 'hyperparameter',
          'pandas', 'numpy', 'scipy', 'matplotlib',
          'jupyter', 'notebook', 'colab', 'kaggle',
          'statistics', 'probability', 'bayesian',
          'xgboost', 'random-forest', 'gradient',
          'plotly', 'seaborn', 'visualization', 'astropy'],
      },
      'computer-vision': {
        label: 'Computer Vision',
        keywords: ['vision', 'image-classification', 'object-detection',
          'segmentation', 'ocr', 'face', 'yolo', 'opencv',
          'image-analysis', 'visual', 'recognition'],
      },
      'nlp': {
        label: 'NLP & Text',
        keywords: ['nlp', 'text-analysis', 'sentiment', 'ner',
          'tokenization', 'classification', 'summarization',
          'translation', 'transcription', 'speech-to-text',
          'text-to-speech', 'tts', 'stt', 'whisper',
          'audio', 'voice', 'voicelive'],
      },
    },
  },

  'design-creative': {
    label: 'Design & Kreativ',
    icon: '🎨',
    categories: {
      'ui-ux': {
        label: 'UI/UX Design',
        keywords: ['figma', 'sketch', 'adobe', 'xd', 'invision',
          'wireframe', 'prototype', 'mockup', 'design-system',
          'ui', 'ux', 'user-experience', 'usability',
          'color', 'typography', 'spacing', 'layout',
          'material', 'fluent', 'human-interface',
          'dark-mode', 'theme', 'responsive',
          'antigravity', 'stitch'],
      },
      'image-generation': {
        label: 'Bildgenerierung',
        keywords: ['midjourney', 'dalle', 'stable-diffusion', 'sdxl',
          'flux', 'comfyui', 'automatic1111', 'controlnet',
          'img2img', 'txt2img', 'inpaint', 'outpaint',
          'portrait', 'poster', 'illustration', 'concept-art',
          'style-transfer', 'image-gen', 'ai-art', 'ai-image',
          'studio-image', 'diffusion'],
      },
      '3d-animation': {
        label: '3D & Animation',
        keywords: ['3d', 'blender', 'three', 'threejs', 'webgl',
          'animation', 'motion', 'lottie', 'rive', 'spine',
          'opengl', 'vulkan', 'shader', 'rendering',
          'model', 'mesh', 'texture', 'lighting',
          'game-engine', 'unity', 'unreal', 'godot'],
      },
      'video-audio': {
        label: 'Video & Audio',
        keywords: ['video', 'ffmpeg', 'streaming', 'hls', 'rtmp',
          'youtube', 'podcast', 'audio', 'music',
          'editing', 'production', 'recording',
          'invideo', 'pptx', 'presentation', 'slides'],
      },
    },
  },

  'business-marketing': {
    label: 'Business & Marketing',
    icon: '📈',
    categories: {
      'marketing': {
        label: 'Marketing & SEO',
        keywords: ['marketing', 'seo', 'sem', 'ppc', 'ads', 'ad-creative',
          'google-ads', 'facebook-ads', 'meta-ads', 'campaign',
          'conversion', 'funnel', 'landing', 'ab-test',
          'keyword', 'search', 'organic', 'paid',
          'aeo', 'content-marketing', 'inbound',
          'growth', 'acquisition', 'retention',
          'competitor', 'market-research', 'trend',
          'audience', 'influencer', 'reputation',
          'awareness', 'scarcity', 'urgency'],
      },
      'ecommerce': {
        label: 'E-Commerce',
        keywords: ['shopify', 'woocommerce', 'magento', 'bigcommerce',
          'stripe', 'paypal', 'checkout', 'cart', 'payment',
          'ecommerce', 'commerce', 'store', 'shop',
          'product-catalog', 'inventory', 'shipping',
          'pricing', 'subscription', 'billing',
          'leiloeiro'],
      },
      'analytics': {
        label: 'Analytics & Tracking',
        keywords: ['analytics', 'tracking', 'amplitude', 'mixpanel',
          'google-analytics', 'ga4', 'segment', 'plausible',
          'metrics', 'kpi', 'dashboard', 'report',
          'attribution', 'cohort', 'retention',
          'data-driven', 'insight', 'bi'],
      },
      'sales-crm': {
        label: 'Sales & CRM',
        keywords: ['crm', 'hubspot', 'salesforce', 'pipedrive',
          'lead', 'pipeline', 'prospect', 'outreach',
          'sales', 'deal', 'quote', 'proposal',
          'customer', 'account', 'contact',
          'enablement', 'vertrieb', 'verkauf'],
      },
      'product-management': {
        label: 'Produktmanagement',
        keywords: ['product', 'roadmap', 'okr', 'kpi',
          'agile', 'scrum', 'kanban', 'sprint',
          'backlog', 'user-story', 'epic',
          'stakeholder', 'prioritization',
          'discovery', 'ideation', 'mvp',
          'feature', 'release', 'launch'],
      },
      'startup': {
        label: 'Startup & Entrepreneurship',
        keywords: ['startup', 'mvp', 'pitch', 'fundraising',
          'investor', 'venture', 'seed', 'series',
          'business-model', 'lean', 'bootstrap',
          'entrepreneur', 'founder', 'co-founder',
          'market-fit', 'traction', 'scale',
          'niche', 'smith'],
      },
    },
  },

  'communication-content': {
    label: 'Kommunikation & Content',
    icon: '✍️',
    categories: {
      'writing': {
        label: 'Schreiben & Texte',
        keywords: ['writing', 'copywriting', 'blog', 'article',
          'storytelling', 'narrative', 'creative-writing',
          'technical-writing', 'ghostwriting', 'editing',
          'grammar', 'style', 'tone', 'voice',
          'headline', 'hook', 'cta', 'copy',
          'seo-writing', 'long-form', 'short-form',
          'advogado', 'loki'],
      },
      'social-media': {
        label: 'Social Media',
        keywords: ['twitter', 'instagram', 'tiktok', 'linkedin',
          'facebook', 'threads', 'bluesky', 'mastodon',
          'social-media', 'social', 'post', 'reel',
          'hashtag', 'engagement', 'follower', 'viral',
          'community', 'ugc', 'creator',
          'whatsapp', 'telegram', 'discord'],
      },
      'documentation': {
        label: 'Dokumentation',
        keywords: ['docs', 'documentation', 'readme', 'wiki',
          'technical', 'api-docs', 'specification',
          'guide', 'handbook', 'playbook', 'runbook',
          'tutorial', 'reference', 'glossary',
          'diagram', 'flowchart', 'sequence',
          'obsidian', 'notion', 'confluence'],
      },
      'email-comms': {
        label: 'E-Mail & Kommunikation',
        keywords: ['email', 'newsletter', 'mailchimp', 'sendgrid',
          'activecampaign', 'drip', 'campaign-monitor',
          'communication', 'internal-comms', 'memo',
          'template', 'sequence', 'automation',
          'agentmail', 'agentphone', 'sms'],
      },
    },
  },

  'security': {
    label: 'Security & Privacy',
    icon: '🔒',
    categories: {
      'app-security': {
        label: 'Application Security',
        keywords: ['owasp', 'xss', 'sql-injection', 'csrf', 'ssrf',
          'authentication', 'authorization', 'rbac', 'abac',
          'oauth', 'oidc', 'saml', 'sso',
          'encryption', 'hashing', 'bcrypt', 'argon',
          'ssl', 'tls', 'certificate', 'https',
          'sanitize', 'validate', 'escape',
          'security', 'secure', 'hardening', '007'],
      },
      'pentesting': {
        label: 'Penetration Testing',
        keywords: ['pentest', 'penetration', 'bug-bounty', 'exploit',
          'vulnerability', 'cve', 'payload', 'injection',
          'reverse', 'decompile', 'fuzz', 'fuzzing',
          'burp', 'metasploit', 'nmap', 'wireshark',
          'red-team', 'blue-team', 'purple-team',
          'attack', 'privilege', 'escalation',
          'active-directory', 'lateral', 'persistence',
          'anti-reversing', 'constant-time'],
      },
      'compliance': {
        label: 'Compliance & Privacy',
        keywords: ['gdpr', 'hipaa', 'soc2', 'iso27001', 'pci',
          'compliance', 'privacy', 'audit', 'policy',
          'data-protection', 'consent', 'retention',
          'incident-response', 'forensics',
          'threat-model', 'stride', 'pasta', 'risk',
          'trust', 'metadata', 'akf'],
      },
    },
  },

  'data': {
    label: 'Data & Analytics',
    icon: '📊',
    categories: {
      'data-engineering': {
        label: 'Data Engineering',
        keywords: ['etl', 'elt', 'pipeline', 'airflow', 'kafka',
          'spark', 'flink', 'beam', 'dbt', 'fivetran',
          'data-warehouse', 'data-lake', 'lakehouse',
          'snowflake', 'redshift', 'synapse',
          'stream', 'batch', 'ingestion', 'transform'],
      },
      'data-analysis': {
        label: 'Datenanalyse',
        keywords: ['analysis', 'analyst', 'reporting', 'dashboard',
          'tableau', 'powerbi', 'looker', 'metabase',
          'pivot', 'aggregation', 'query',
          'insight', 'trend', 'forecast',
          'excel', 'spreadsheet', 'csv',
          'alpha-vantage', 'apify'],
      },
    },
  },

  'productivity': {
    label: 'Produktivitaet & Tools',
    icon: '⚡',
    categories: {
      'automation': {
        label: 'Automatisierung',
        keywords: ['automation', 'zapier', 'make', 'n8n', 'ifttt',
          'workflow', 'trigger', 'action', 'webhook',
          'cron', 'scheduler', 'batch', 'queue',
          'robotic', 'rpa', 'macro',
          'airtable', 'google-drive', 'google-sheets',
          'asana', 'linear', 'notion', 'trello',
          'jira', 'clickup', 'monday',
          'clipper', 'diary', 'last30days', 'goal',
          'analyze', 'project-manager'],
      },
      'developer-experience': {
        label: 'Developer Experience',
        keywords: ['dx', 'tooling', 'scaffolding', 'code-gen',
          'boilerplate', 'starter', 'template',
          'config', 'setup', 'init', 'onboarding',
          'refactoring', 'migration', 'upgrade',
          'code-review', 'pair', 'mob',
          'skill-creator', 'agents', 'mcp',
          'memory', 'context', 'skill-seekers',
          'andruia', 'consultant'],
      },
    },
  },

  'life-learning': {
    label: 'Leben & Lernen',
    icon: '🌱',
    categories: {
      'education': {
        label: 'Bildung & Lernen',
        keywords: ['learning', 'education', 'tutorial', 'course',
          'teaching', 'mentoring', 'coaching',
          'curriculum', 'lesson', 'quiz', 'exam',
          'study', 'academic', 'university',
          'math', 'physics', 'chemistry', 'biology',
          'philosophy', 'history', 'literature',
          'research', 'paper', 'thesis', 'citation',
          'science', 'karpathy', 'evaluation'],
      },
      'health': {
        label: 'Gesundheit & Wellness',
        keywords: ['health', 'medical', 'clinical', 'patient',
          'diagnosis', 'treatment', 'therapy',
          'fitness', 'exercise', 'workout',
          'nutrition', 'diet', 'recipe', 'cooking',
          'mental-health', 'wellness', 'mindfulness',
          'meditation', 'stress', 'anxiety', 'sleep',
          'chronic', 'disease', 'prevention'],
      },
      'finance': {
        label: 'Finanzen',
        keywords: ['finance', 'budget', 'investing', 'stock',
          'crypto', 'bitcoin', 'ethereum', 'defi',
          'tax', 'accounting', 'bookkeeping',
          'insurance', 'mortgage', 'loan', 'credit',
          'retirement', 'savings', 'portfolio',
          'banking', 'fintech', 'payment'],
      },
      'career': {
        label: 'Karriere',
        keywords: ['career', 'resume', 'cv', 'interview', 'cover-letter',
          'job', 'hiring', 'recruiter', 'recruiting',
          'salary', 'negotiation', 'offer',
          'networking', 'linkedin', 'personal-brand',
          'freelance', 'contractor', 'remote',
          'management', 'leadership', 'team-lead',
          'indeed', 'job-search'],
      },
      'personal-growth': {
        label: 'Persoenliche Entwicklung',
        keywords: ['productivity', 'habits', 'goals', 'journaling',
          'planning', 'time-management', 'focus',
          'motivation', 'discipline', 'routine',
          'reading', 'book', 'summary',
          'creativity', 'innovation', 'brainstorm',
          'decision', 'critical-thinking', 'problem-solving',
          'travel', 'hobby', 'game', 'gaming',
          'minecraft', 'algorithmic-art'],
      },
    },
  },
};

// ════════════════════════════════════════════════════════════════════════════
// PROMPT CATEGORY → DOMAIN MAPPING
// ════════════════════════════════════════════════════════════════════════════

const PROMPT_CAT_TO_DOMAIN = {
  'Technik im Alltag': 'software-development',
  'Bild & Visualisierung': 'design-creative',
  'Beruf & Karriere': 'business-marketing',
  'Kommunikation & Beziehungen': 'communication-content',
  'Lernen & Wachstum': 'life-learning',
  'Kreativität & Freizeit': 'design-creative',
  'Alltag & Leben': 'life-learning',
  'Gesundheit & Wohlbefinden': 'life-learning',
  'Spezielle Situationen': 'life-learning',
};

// ════════════════════════════════════════════════════════════════════════════
// BUILD KEYWORD → TAXONOMY INDEX (for fast lookups)
// ════════════════════════════════════════════════════════════════════════════

const keywordIndex = {}; // keyword → { domain, category }

for (const [domainId, domain] of Object.entries(TAXONOMY)) {
  for (const [catId, cat] of Object.entries(domain.categories)) {
    for (const kw of cat.keywords) {
      keywordIndex[kw] = { domain: domainId, category: catId, domainLabel: domain.label, categoryLabel: cat.label };
    }
  }
}

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════

function norm(content) {
  return content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function extractKeywords(name) {
  return name.replace(/[_\.]/g, '-').split('-')
    .map(w => w.toLowerCase().trim())
    .filter(w => w.length > 1);
}

function parseFrontmatter(content) {
  content = norm(content);
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { fm: null, body: content };
  return { fm: match[1], body: content.slice(match[0].length) };
}

function fmField(fm, field) {
  if (!fm) return '';
  const m = fm.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  if (!m) return '';
  return m[1].trim().replace(/^['"]|['"]$/g, '');
}

function fmTags(fm) {
  if (!fm) return [];
  const inline = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  if (inline) return inline[1].split(',').map(t => t.trim().replace(/^['"]|['"]$/g, '').toLowerCase()).filter(Boolean);
  const list = fm.match(/^tags:\s*\n((?:\s+-\s+.+\n?)*)/m);
  if (list) return list[1].split('\n').map(l => l.replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, '').toLowerCase()).filter(Boolean);
  return [];
}

// ════════════════════════════════════════════════════════════════════════════
// CLASSIFIER — Ordnet ein Item der Taxonomie zu
// ════════════════════════════════════════════════════════════════════════════

function classify(keywords, description) {
  const scores = {}; // "domain/category" → score

  // Score from name keywords (weight: 3)
  for (const kw of keywords) {
    const match = keywordIndex[kw];
    if (match) {
      const key = `${match.domain}/${match.category}`;
      scores[key] = (scores[key] || 0) + 3;
    }
  }

  // Score from description keywords (weight: 1)
  if (description) {
    const descWords = description.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2);
    for (const w of descWords) {
      const match = keywordIndex[w];
      if (match) {
        const key = `${match.domain}/${match.category}`;
        scores[key] = (scores[key] || 0) + 1;
      }
    }
  }

  // Sort by score, return top match
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null;

  const [topKey, topScore] = sorted[0];
  const [domain, category] = topKey.split('/');

  // Also collect secondary categories (for cross-links)
  const secondary = sorted.slice(1, 3)
    .filter(([, s]) => s >= topScore * 0.5) // At least 50% of top score
    .map(([k]) => {
      const [d, c] = k.split('/');
      return { domain: d, category: c };
    });

  return { domain, category, score: topScore, secondary };
}

// ════════════════════════════════════════════════════════════════════════════
// PROCESS SKILLS
// ════════════════════════════════════════════════════════════════════════════

function processSkills() {
  console.log('Klassifiziere Skills...');
  const results = []; // { dir, name, description, domain, category, secondary, tags }
  const dirs = fs.readdirSync(SKILLS_DIR).filter(f => {
    try { return fs.statSync(path.join(SKILLS_DIR, f)).isDirectory(); } catch { return false; }
  });

  let classified = 0, unclassified = 0;

  for (const dir of dirs) {
    const file = path.join(SKILLS_DIR, dir, 'SKILL.md');
    if (!fs.existsSync(file)) continue;

    try {
      const content = norm(fs.readFileSync(file, 'utf-8'));
      const { fm, body } = parseFrontmatter(content);
      if (!fm) { unclassified++; continue; }

      const name = fmField(fm, 'name') || dir;
      const description = fmField(fm, 'description');
      const risk = fmField(fm, 'risk') || 'unknown';
      const source = fmField(fm, 'source') || 'community';
      const dateAdded = fmField(fm, 'date_added') || '2026-02-27';

      const keywords = extractKeywords(dir);
      const result = classify(keywords, description);

      if (!result) {
        // Fallback: productivity/developer-experience
        const r = { domain: 'productivity', category: 'developer-experience', score: 0, secondary: [] };
        results.push({ dir, name, description, ...r, keywords });
        unclassified++;
        continue;
      }

      results.push({ dir, name, description, risk, source, dateAdded, ...result, keywords });
      classified++;
    } catch (err) {
      console.error(`  Fehler bei ${dir}: ${err.message}`);
      unclassified++;
    }
  }

  console.log(`  ${classified} klassifiziert, ${unclassified} Fallback.`);
  return { results, dirs };
}

function writeSkills(skillResults) {
  console.log('Schreibe Skills...');
  let written = 0;

  // Build lookup: category → [skill names] for cross-linking
  const catIndex = {};
  for (const s of skillResults) {
    const key = `${s.domain}/${s.category}`;
    if (!catIndex[key]) catIndex[key] = [];
    catIndex[key].push(s);
  }

  for (const s of skillResults) {
    const file = path.join(SKILLS_DIR, s.dir, 'SKILL.md');
    try {
      const content = norm(fs.readFileSync(file, 'utf-8'));
      const { body } = parseFrontmatter(content);

      const domainInfo = TAXONOMY[s.domain];
      const catInfo = domainInfo.categories[s.category];

      // Build tags: domain, category, + top keywords
      const tags = new Set(['skill', s.domain, s.category]);
      const stopWords = new Set(['best', 'practices', 'expert', 'development', 'patterns', 'guide',
        'skills', 'skill', 'tool', 'tools', 'the', 'and', 'for', 'with', 'from', 'pro', 'max',
        'new', 'old', 'v2', 'py', 'ts', 'js', 'md', 'dotnet', 'java', 'advanced', 'basic',
        'simple', 'ultimate', 'complete', 'comprehensive', 'custom', 'modern', 'smart',
        '00', '10', '20', '007']);
      const meaningful = (s.keywords || []).filter(w => !stopWords.has(w) && w.length > 2);
      meaningful.slice(0, 3).forEach(w => tags.add(w));

      // Frontmatter
      const newFm = [
        '---',
        `name: "${(s.name || '').replace(/"/g, '\\"')}"`,
        `description: "${(s.description || '').replace(/"/g, '\\"')}"`,
        `type: skill`,
        `created: ${(s.dateAdded || '2026-02-27').replace(/'/g, '')}`,
        `domain: ${s.domain}`,
        `category: ${s.category}`,
        `risk: ${s.risk || 'unknown'}`,
        `source: ${s.source || 'community'}`,
        'tags:',
        ...[...tags].map(t => `  - ${t}`),
        '---',
      ].join('\n');

      // Clean body
      let cleanBody = body.replace(/\n## Connections[\s\S]*$/m, '').trimEnd();

      // Connections
      const conn = ['\n\n## Connections\n'];
      conn.push(`- **Domain:** [[${domainInfo.label}]]`);
      conn.push(`- **Kategorie:** [[${catInfo.label}]]`);

      // MOC links
      const mocName = `${domainInfo.label} MOC`;
      conn.push(`- **MOC:** [[${mocName}]]`);

      // Cross-domain links
      if (s.secondary && s.secondary.length > 0) {
        const crossLinks = s.secondary.map(sec => {
          const secDomain = TAXONOMY[sec.domain];
          const secCat = secDomain.categories[sec.category];
          return `[[${secCat.label}]]`;
        });
        conn.push(`- **Auch relevant:** ${crossLinks.join(', ')}`);
      }

      // Related skills (same category, max 3)
      const sameCategory = (catIndex[`${s.domain}/${s.category}`] || [])
        .filter(r => r.dir !== s.dir)
        .slice(0, 3);
      if (sameCategory.length > 0) {
        conn.push('- **Verwandte Skills:**');
        for (const rel of sameCategory) {
          conn.push(`  - [[${rel.name}]]`);
        }
      }

      const newContent = newFm + cleanBody + conn.join('\n') + '\n';
      fs.writeFileSync(file, newContent, 'utf-8');
      written++;
    } catch {}
  }

  console.log(`  ${written} Skills geschrieben.`);
}

// ════════════════════════════════════════════════════════════════════════════
// PROCESS PROMPTS
// ════════════════════════════════════════════════════════════════════════════

function processPrompts(skillResults) {
  console.log('Klassifiziere und verlinke Prompts...');

  // Build keyword → skills index
  const kwToSkills = {};
  for (const s of skillResults) {
    for (const kw of (s.keywords || [])) {
      if (!kwToSkills[kw]) kwToSkills[kw] = [];
      if (kwToSkills[kw].length < 5) kwToSkills[kw].push(s);
    }
  }

  const categories = fs.readdirSync(PROMPTS_DIR).filter(f => {
    try { return fs.statSync(path.join(PROMPTS_DIR, f)).isDirectory(); } catch { return false; }
  });

  let updated = 0;
  const promptStats = {}; // category → count

  for (const cat of categories) {
    const catDir = path.join(PROMPTS_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'));
    promptStats[cat] = files.length;

    const domainId = PROMPT_CAT_TO_DOMAIN[cat] || 'life-learning';
    const domainInfo = TAXONOMY[domainId];

    for (const file of files) {
      const filePath = path.join(catDir, file);
      try {
        let content = norm(fs.readFileSync(filePath, 'utf-8'));
        const { fm } = parseFrontmatter(content);
        const promptTags = fmTags(fm);

        // Get inner block tags too
        const secondBlock = content.match(/---\n[\s\S]*?---\n---\n([\s\S]*?)---/);
        let innerTags = [];
        if (secondBlock) innerTags = fmTags(secondBlock[1]);
        const allTags = [...new Set([...promptTags, ...innerTags])];

        // Find matching skills
        const matchedSkills = new Set();
        for (const tag of allTags) {
          const kw = tag.toLowerCase().replace(/\s+/g, '-');
          if (kwToSkills[kw]) {
            for (const s of kwToSkills[kw]) matchedSkills.add(s);
          }
        }

        // Remove old Connections, build new
        content = content.replace(/\n## Connections[\s\S]*$/m, '').trimEnd();

        const conn = ['\n\n## Connections\n'];
        conn.push(`- **Domain:** [[${domainInfo.label}]]`);
        conn.push(`- **Kategorie:** [[${cat}]]`);
        conn.push(`- **MOC:** [[Prompts MOC]]`);

        const skills = [...matchedSkills].slice(0, 4);
        if (skills.length > 0) {
          conn.push('- **Verwandte Skills:**');
          for (const s of skills) conn.push(`  - [[${s.name}]]`);
        }

        content += conn.join('\n') + '\n';
        fs.writeFileSync(filePath, content, 'utf-8');
        updated++;
      } catch {}
    }
  }

  console.log(`  ${updated} Prompts verlinkt.`);
  return promptStats;
}

// ════════════════════════════════════════════════════════════════════════════
// GENERATE DOMAIN MOCs
// ════════════════════════════════════════════════════════════════════════════

function generateMOCs(skillResults, promptStats) {
  console.log('Generiere Domain-MOCs...');

  // Group skills by domain/category
  const tree = {};
  for (const s of skillResults) {
    if (!tree[s.domain]) tree[s.domain] = {};
    if (!tree[s.domain][s.category]) tree[s.domain][s.category] = [];
    tree[s.domain][s.category].push(s);
  }

  // Generate one MOC per domain
  for (const [domainId, domain] of Object.entries(TAXONOMY)) {
    const cats = tree[domainId] || {};
    let totalSkills = 0;
    for (const skills of Object.values(cats)) totalSkills += skills.length;
    if (totalSkills === 0) continue;

    const mocName = `${domain.label} MOC`;
    const lines = [
      '---',
      'type: moc',
      `created: ${TODAY}`,
      `updated: ${TODAY}`,
      'tags:',
      '  - moc',
      `  - ${domainId}`,
      '  - navigation',
      '---',
      '',
      `# ${domain.icon} ${domain.label}`,
      '',
      `> **${totalSkills} Skills** in ${Object.keys(cats).length} Kategorien`,
      '',
      '---',
      '',
    ];

    for (const [catId, catDef] of Object.entries(domain.categories)) {
      const skills = cats[catId] || [];
      if (skills.length === 0) continue;

      lines.push(`## ${catDef.label}`);
      lines.push('');
      lines.push(`> ${skills.length} Skills`);
      lines.push('');
      lines.push('| Skill | Beschreibung |');
      lines.push('|-------|-------------|');

      skills.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      for (const s of skills) {
        const desc = (s.description || '').length > 80
          ? s.description.slice(0, 77) + '...'
          : (s.description || '');
        lines.push(`| [[${s.name}]] | ${desc.replace(/\|/g, '/')} |`);
      }
      lines.push('');
    }

    lines.push('---');
    lines.push('');
    lines.push('## Connections');
    lines.push('');
    lines.push('- **Navigation:** [[Home]], [[Skills MOC]], [[Prompts MOC]]');

    // Cross-domain links
    const otherDomains = Object.entries(TAXONOMY)
      .filter(([id]) => id !== domainId && tree[id] && Object.keys(tree[id]).length > 0)
      .map(([, d]) => `[[${d.label} MOC]]`);
    if (otherDomains.length > 0) {
      lines.push(`- **Andere Domains:** ${otherDomains.join(', ')}`);
    }
    lines.push('');

    fs.writeFileSync(path.join(MOCS_DIR, `${mocName}.md`), lines.join('\n'), 'utf-8');
    console.log(`  ${mocName}: ${totalSkills} Skills`);
  }

  // ── Master Skills MOC (Übersicht aller Domains) ──────────────────────

  const masterLines = [
    '---',
    'type: moc',
    `created: 2026-04-09`,
    `updated: ${TODAY}`,
    'tags:',
    '  - moc',
    '  - skills',
    '  - navigation',
    '  - knowledge-graph',
    '---',
    '',
    '# Skills MOC — Knowledge Graph',
    '',
    `> **${skillResults.length} Skills** in ${Object.keys(tree).length} Domains, organisiert als 3-Layer Knowledge Graph.`,
    '',
    '---',
    '',
    '## Domains',
    '',
    '| Domain | Skills | Kategorien | MOC |',
    '|--------|--------|------------|-----|',
  ];

  for (const [domainId, domain] of Object.entries(TAXONOMY)) {
    const cats = tree[domainId] || {};
    let total = 0;
    for (const s of Object.values(cats)) total += s.length;
    if (total === 0) continue;
    masterLines.push(`| ${domain.icon} ${domain.label} | ${total} | ${Object.keys(cats).length} | [[${domain.label} MOC]] |`);
  }

  masterLines.push('');
  masterLines.push('---');
  masterLines.push('');
  masterLines.push('## Prompt-Kategorien');
  masterLines.push('');
  masterLines.push('| Kategorie | Prompts | Domain |');
  masterLines.push('|-----------|---------|--------|');
  for (const [cat, count] of Object.entries(promptStats)) {
    const domainId = PROMPT_CAT_TO_DOMAIN[cat] || 'life-learning';
    const domain = TAXONOMY[domainId];
    masterLines.push(`| [[${cat}]] | ${count} | ${domain.icon} ${domain.label} |`);
  }

  masterLines.push('');
  masterLines.push('---');
  masterLines.push('');
  masterLines.push('## Taxonomie');
  masterLines.push('');
  masterLines.push('```');
  masterLines.push('Layer 0: Domains        (Hauptbereiche)');
  masterLines.push('Layer 1: Categories     (Unterkategorien)');
  masterLines.push('Layer 2: Items          (Skills + Prompts)');
  masterLines.push('```');
  masterLines.push('');
  masterLines.push('Jedes Item hat:');
  masterLines.push('- `domain` + `category` Tags (hierarchisch)');
  masterLines.push('- Cross-Links zu verwandten Items in anderen Domains');
  masterLines.push('- MOC-Zuordnung zur Navigation');
  masterLines.push('');
  masterLines.push('## Connections');
  masterLines.push('');
  masterLines.push('- **Navigation:** [[Home]], [[Prompts MOC]], [[Resources MOC]]');
  masterLines.push('- **System:** [[CLAUDE.md]]');
  masterLines.push('');

  fs.writeFileSync(path.join(MOCS_DIR, 'Skills MOC.md'), masterLines.join('\n'), 'utf-8');
  console.log('  Skills MOC (Master) geschrieben.');

  // ── Update Prompts MOC ───────────────────────────────────────────────

  const promptLines = [
    '---',
    'type: moc',
    `created: 2026-04-09`,
    `updated: ${TODAY}`,
    'tags:',
    '  - moc',
    '  - prompts',
    '  - navigation',
    '---',
    '',
    '# Prompts MOC',
    '',
    `> **${Object.values(promptStats).reduce((a, b) => a + b, 0)} Prompts** in ${Object.keys(promptStats).length} Kategorien`,
    '',
    '---',
    '',
    '## Kategorien',
    '',
    '| Kategorie | Anzahl | Domain |',
    '|-----------|--------|--------|',
  ];

  for (const [cat, count] of Object.entries(promptStats).sort((a, b) => b[1] - a[1])) {
    const domainId = PROMPT_CAT_TO_DOMAIN[cat] || 'life-learning';
    const domain = TAXONOMY[domainId];
    promptLines.push(`| [[${cat}]] | ${count} | ${domain.icon} [[${domain.label} MOC]] |`);
  }

  promptLines.push('');
  promptLines.push('---');
  promptLines.push('');
  promptLines.push('## Connections');
  promptLines.push('');
  promptLines.push('- **Navigation:** [[Home]], [[Skills MOC]], [[Resources MOC]]');
  promptLines.push('- **System:** [[CLAUDE.md]]');
  promptLines.push('');

  fs.writeFileSync(path.join(MOCS_DIR, 'Prompts MOC.md'), promptLines.join('\n'), 'utf-8');
  console.log('  Prompts MOC aktualisiert.');
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════════════════

function main() {
  console.log('══════════════════════════════════════════');
  console.log('  FIRSTBRAIN KNOWLEDGE GRAPH BUILDER');
  console.log('  3-Layer Taxonomie | ' + TODAY);
  console.log('══════════════════════════════════════════\n');

  // Phase 1: Classify skills
  const { results: skillResults } = processSkills();

  // Phase 2: Write updated skill files
  writeSkills(skillResults);

  // Phase 3: Classify and link prompts
  const promptStats = processPrompts(skillResults);

  // Phase 4: Generate MOCs
  generateMOCs(skillResults, promptStats);

  // Summary
  const domainCounts = {};
  for (const s of skillResults) {
    const label = TAXONOMY[s.domain]?.label || s.domain;
    domainCounts[label] = (domainCounts[label] || 0) + 1;
  }

  console.log('\n══════════════════════════════════════════');
  console.log('  ERGEBNIS');
  console.log('══════════════════════════════════════════\n');
  console.log('Skills pro Domain:');
  for (const [label, count] of Object.entries(domainCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${label}: ${count}`);
  }
  console.log(`\nPrompts: ${Object.values(promptStats).reduce((a, b) => a + b, 0)}`);
  console.log(`MOCs generiert: ${Object.keys(domainCounts).length + 2}`);
  console.log('\nFertig!');
}

main();
