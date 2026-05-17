---
type: referenz
created: 2026-04-11
parent-skill: "instagram"
domain: communication-content
category: social-media
tags:
  - skill-referenz
  - communication-content
  - social-media
---
# Schema do Banco SQLite — instagram.db

Localização: `C:\Users\renat\skills\instagram\data\instagram.db`
Modo: WAL (Write-Ahead Logging) com foreign keys habilitadas.

## Diagrama ER

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   accounts   │       │    posts     │       │  templates   │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │──┐    │ id (PK)      │    ┌──│ id (PK)      │
│ ig_user_id   │  │    │ account_id(FK)│◄───┤  │ name (UNIQUE)│
│ username     │  │    │ media_type   │    │  │ caption_tpl  │
│ account_type │  │    │ media_url    │    │  │ hashtag_set  │
│ access_token │  │    │ local_path   │    │  │ default_time │
│ token_exp    │  │    │ caption      │    │  │ created_at   │
│ fb_page_id   │  │    │ hashtags     │    │  └──────────────┘
│ app_id       │  │    │ template_id(FK)│◄──┘
│ app_secret   │  │    │ status       │
│ is_active    │  │    │ scheduled_at │
│ created_at   │  │    │ published_at │
└──────────────┘  │    │ ig_media_id  │
                  │    │ ig_container │
                  │    │ permalink    │
                  │    │ error_msg    │
                  │    │ created_at   │
                  │    └──────────────┘
                  │
                  │    ┌──────────────┐
                  ├───►│  comments    │
                  │    ├──────────────┤
                  │    │ id (PK)      │
                  │    │ account_id(FK)│
                  │    │ ig_comment_id│
                  │    │ ig_media_id  │
                  │    │ username     │
                  │    │ text         │
                  │    │ timestamp    │
                  │    │ replied      │
                  │    │ reply_text   │
                  │    │ hidden       │
                  │    └──────────────┘
                  │
                  │    ┌──────────────┐
                  ├───►│  insights    │
                  │    ├──────────────┤
                  │    │ id (PK)      │
                  │    │ account_id(FK)│
                  │    │ ig_media_id  │
                  │    │ metric_name  │
                  │    │ metric_value │
                  │    │ period       │
                  │    │ fetched_at   │
                  │    │ raw_json     │
                  │    └──────────────┘
                  │
                  │    ┌──────────────────┐
                  ├───►│  user_insights   │
                  │    ├──────────────────┤
                  │    │ id (PK)          │
                  │    │ account_id (FK)  │
                  │    │ metric_name      │
                  │    │ metric_value     │
                  │    │ period           │
                  │    │ end_time         │
                  │    │ fetched_at       │
                  │    └──────────────────┘
                  │
                  │    ┌──────────────────┐
                  ├───►│ hashtag_searches │
                  │    ├──────────────────┤
                  │    │ id (PK)          │
                  │    │ account_id (FK)  │
                  │    │ hashtag          │
                  │    │ ig_hashtag_id    │
                  │    │ searched_at      │
                  │    └──────────────────┘
                  │
                  │    ┌──────────────┐
                  └───►│ action_log   │
                       ├──────────────┤
                       │ id (PK)      │
                       │ account_id   │
                       │ action       │
                       │ params (JSON)│
                       │ result (JSON)│
                       │ confirmed    │
                       │ rate_remain  │
                       │ created_at   │
                       └──────────────┘
```

## Tabelas Detalhadas

### accounts
Armazena contas Instagram configuradas. Multi-conta pronta desde o dia 1.

| Campo | Tipo | Constraint | Descrição |
|-------|------|------------|-----------|
| id | INTEGER | PK | Auto-increment |
| ig_user_id | TEXT | UNIQUE NOT NULL | ID do usuário IG na Graph API |
| username | TEXT | | @username |
| account_type | TEXT | | BUSINESS, MEDIA_CREATOR |
| access_token | TEXT | NOT NULL | Token longo (60 dias) |
| token_expires_at | TEXT | | ISO 8601 datetime |
| facebook_page_id | TEXT | | ID da Facebook Page vinculada |
| app_id | TEXT | | Meta App ID |
| app_secret | TEXT | | Meta App Secret |
| is_active | INTEGER | DEFAULT 1 | Conta ativa (1) ou desativada (0) |
| created_at | TEXT | DEFAULT now | Timestamp de criação |

### posts
Pipeline de conteúdo com status machine.

| Campo | Tipo | Constraint | Descrição |
|-------|------|------------|-----------|
| id | INTEGER | PK | Auto-increment |
| account_id | INTEGER | FK → accounts | Conta associada |
| media_type | TEXT | | PHOTO, VIDEO, CAROUSEL, REEL, STORY |
| media_url | TEXT | | URL pública (após upload Imgur) |
| local_path | TEXT | | Caminho local original |
| caption | TEXT | | Texto do post |
| hashtags | TEXT | | JSON array de hashtags |
| template_id | INTEGER | FK → templates | Template usado (opcional) |
| status | TEXT | DEFAULT 'draft' | draft, approved, scheduled, container_created, published, failed |
| scheduled_at | TEXT | | Datetime agendado (ISO 8601) |
| published_at | TEXT | | Datetime efetivo de publicação |
| ig_media_id | TEXT | | ID retornado pela API após publicar |
| ig_container_id | TEXT | | Container ID para recovery do 2-step |
| permalink | TEXT | | URL do post no Instagram |
| error_msg | TEXT | | Mensagem de erro se failed |
| created_at | TEXT | DEFAULT now | Timestamp de criação |

**Índices:** `idx_posts_status`, `idx_posts_account`, `idx_posts_ig_media`

### comments
Comentários dos posts, com tracking de respostas.

| Campo | Tipo | Constraint | Descrição |
|-------|------|------------|-----------|
| id | INTEGER | PK | Auto-increment |
| account_id | INTEGER | FK → accounts | Conta associada |
| ig_comment_id | TEXT | UNIQUE | ID do comentário na Graph API |
| ig_media_id | TEXT | | ID da mídia relacionada |
| username | TEXT | | @username do autor |
| text | TEXT | | Conteúdo do comentário |
| timestamp | TEXT | | Datetime ISO 8601 |
| replied | INTEGER | DEFAULT 0 | Se já foi respondido (0/1) |
| reply_text | TEXT | | Texto da resposta dada |
| hidden | INTEGER | DEFAULT 0 | Se está oculto (0/1) |

### insights
Métricas individuais de cada mídia.

| Campo | Tipo | Constraint | Descrição |
|-------|------|------------|-----------|
| id | INTEGER | PK | Auto-increment |
| account_id | INTEGER | FK → accounts | Conta associada |
| ig_media_id | TEXT | | ID da mídia |
| metric_name | TEXT | | impressions, reach, engagement, saved, video_views |
| metric_value | REAL | | Valor numérico da métrica |
| period | TEXT | | lifetime, day, week, days_28 |
| fetched_at | TEXT | DEFAULT now | Quando foi buscado |
| raw_json | TEXT | | Resposta completa da API (preservada) |

**Índice:** `idx_insights_media`

### user_insights
Métricas agregadas da conta (não por mídia).

| Campo | Tipo | Constraint | Descrição |
|-------|------|------------|-----------|
| id | INTEGER | PK | Auto-increment |
| account_id | INTEGER | FK → accounts | Conta associada |
| metric_name | TEXT | | follower_count, reach, impressions, profile_views |
| metric_value | REAL | | Valor numérico |
| period | TEXT | | day, week, days_28 |
| end_time | TEXT | | Fim do período ISO 8601 |
| fetched_at | TEXT | DEFAULT now | Quando foi buscado |

### templates
Templates reutilizáveis para captions e hashtags.

| Campo | Tipo | Constraint | Descrição |
|-------|------|------------|-----------|
| id | INTEGER | PK | Auto-increment |
| name | TEXT | UNIQUE NOT NULL | Nome do template (ex: "promo") |
| caption_template | TEXT | | Template com {variáveis} |
| hashtag_set | TEXT | | JSON array de hashtags |
| default_schedule_time | TEXT | | Horário padrão (HH:MM) |
| created_at | TEXT | DEFAULT now | Timestamp de criação |

### hashtag_searches
Tracking de buscas de hashtag (para respeitar limite de 30/semana).

| Campo | Tipo | Constraint | Descrição |
|-------|------|------------|-----------|
| id | INTEGER | PK | Auto-increment |
| account_id | INTEGER | FK → accounts | Conta associada |
| hashtag | TEXT | | Hashtag pesquisada |
| ig_hashtag_id | TEXT | | ID retornado pela API |
| searched_at | TEXT | DEFAULT now | Timestamp da pesquisa |

### action_log
Audit log de todas as ações que modificam dados.

| Campo | Tipo | Constraint | Descrição |
|-------|------|------------|-----------|
| id | INTEGER | PK | Auto-increment |
| account_id | INTEGER | | Conta associada (pode ser NULL) |
| action | TEXT | NOT NULL | Nome da ação (publish_photo, delete_comment, etc.) |
| params | TEXT | | JSON com parâmetros da ação |
| result | TEXT | | JSON com resultado |
| confirmed | INTEGER | | Se foi confirmado pelo usuário (0/1/NULL) |
| rate_remaining | TEXT | | JSON com rate limits restantes |
| created_at | TEXT | DEFAULT now | Timestamp da ação |

**Índice:** `idx_action_log_created`

## Queries Comuns

### Contar publicações hoje
```sql
SELECT COUNT(*) FROM action_log
WHERE action LIKE 'publish_%' AND created_at >= date('now')
```

### Posts não publicados prontos para processar
```sql
SELECT * FROM posts
WHERE status IN ('approved', 'scheduled', 'container_created')
AND (scheduled_at IS NULL OR scheduled_at <= datetime('now'))
ORDER BY created_at
```

### Engajamento médio por tipo de mídia
```sql
SELECT p.media_type,
       AVG(i.metric_value) as avg_engagement
FROM posts p
JOIN insights i ON i.ig_media_id = p.ig_media_id
WHERE i.metric_name = 'engagement'
GROUP BY p.media_type
```

### Comentários não respondidos
```sql
SELECT c.*, p.permalink
FROM comments c
JOIN posts p ON p.ig_media_id = c.ig_media_id
WHERE c.replied = 0
ORDER BY c.timestamp DESC
```

### Hashtags usadas esta semana
```sql
SELECT DISTINCT hashtag, COUNT(*) as searches
FROM hashtag_searches
WHERE searched_at >= datetime('now', '-7 days')
GROUP BY hashtag
ORDER BY searches DESC
```

## Connections

- **Gehoert zu:** [[instagram]]
- **Pfad:** `references/schema.md`
- **Domain:** [[Kommunikation & Content]]
- **Kategorie:** [[Social Media]]
