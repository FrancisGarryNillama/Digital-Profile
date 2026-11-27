// ================================================================
// PORTFOLIO CONSTANTS
// Last refreshed: November 2026 — positioned as AI Solutions Engineer
// Source of truth for facts: Resume_Nillama_2026_AI-Engineer_Oct
// ================================================================

export const hero = {
  name: "Francis Garry Nillama",
  initials: "FN",
  tagline: "AI Solutions Engineer · Agents, LLM Integrations & Automation",
  headline: ["AI Systems People", "Actually Operate"],
  description:
    "I turn business problems into working AI solutions — agentic workflows on the Claude Agent SDK, Claude and OpenAI integrations, RAG over messy real-world documents, and Python automation — then ship them end to end with Next.js, TypeScript and Supabase/PostgreSQL. Previously sole author of an agentic IT-remediation platform and primary engineer on the company HRIS at Lifewood Philippines (Jun–Oct 2026).",
  specializations: [
    "AI Agents (Claude Agent SDK)",
    "Claude / OpenAI APIs",
    "RAG & Prompt Design",
    "Python Automation",
    "Next.js / React / TypeScript",
    "Supabase / PostgreSQL",
  ],
};

// ================================================================
// TECH STACK — categorized, AI first
// (category keys map to icons in Home.jsx — keep the six names)
// ================================================================
export const skills = {
  "AI / ML": [
    "Claude Agent SDK", "Claude Code & Subagents", "Model Context Protocol",
    "Anthropic & OpenAI APIs", "Agentic Workflow & Tool Design", "Prompt & Context Design",
    "RAG (LangChain, ChromaDB, Ollama)", "pgvector", "EasyOCR / OpenCV", "Evaluation & Pilot Metrics",
  ],
  "Automation": [
    "Python Scripting & Workers", "Selenium", "Apify", "Power Automate",
    "Microsoft Graph", "Webhook Ingestion", "Dry-Run & Audit Logging",
  ],
  "Backend": [
    "Python / Django / DRF", "Node 22", "Express 5", "Fastify 5",
    "Zod → OpenAPI", "WebSockets", "JWT / OAuth / RBAC", "Supabase Edge Functions", "Asterisk 22 ARI",
  ],
  "Frontend": [
    "Next.js 14 / 15", "React 18 / 19", "TypeScript (strict)", "Tailwind CSS",
    "shadcn/ui", "Zustand", "React Hook Form", "Recharts", "Framer Motion / GSAP", "Vite",
  ],
  "Database": [
    "PostgreSQL 16", "Row-Level Security", "SQL Migrations", "Partitioning / JSONB",
    "Supabase", "Redis", "MySQL", "SQLite", "MinIO / S3",
  ],
  "DevOps": [
    "Docker / Compose", "GitHub Actions CI", "Vercel", "Railway",
    "pnpm + Turborepo", "pytest", "Vitest", "Playwright", "Pino / OpenTelemetry",
  ],
};

// Category accent colours (matches CSS classes)
export const categoryAccent = {
  "AI / ML":    "cyan",
  "Automation": "violet",
  "Backend":    "cyan",
  "Frontend":   "violet",
  "Database":   "amber",
  "DevOps":     "cyan",
};

// ================================================================
// PROJECTS — AI solutions first, framed problem → solution → outcome
// tier 1 = hero showcase | tier 2 = smaller cards
// kind = badge label ("AI Solution" / "Full-Stack Platform")
// Private repos link to the GitHub profile; NDA-covered work names the
// system and the contribution but carries no repo link.
// ================================================================
const GH = "https://github.com/FrancisGarryNillama";

export const projects = [
  // ---------- TIER 1 ----------
  {
    id: 1,
    tier: 1,
    kind: "AI Solution",
    name: "Lifewood-Nexus",
    tagline: "Agentic IT remediation on the Claude Agent SDK",
    problem:
      "A small IT team, a growing number of internal systems, and a ticket queue where most items were reproducible bugs a careful agent could fix under supervision.",
    description:
      "Sole author. A Python worker on the Claude Agent SDK claims a ticket, reproduces the bug, fixes it and runs the tests on an isolated git branch; IT reviews the diff and merges. Safety sits outside the model — a PreToolUse-hook gatekeeper enforces scoped reads, an allow-listed shell and protected-path writes — and a gated Auto-Fix downgrades to manual review when it leaves its safety envelope.",
    outcome:
      "Delivered in nine phases, from the Supabase RLS schema through gated Auto-Fix, hardening checklist, operator and reviewer runbooks, and a pilot plan with go/no-go metrics (fix-acceptance rate, test-attach rate, near-misses, cost per accepted fix).",
    architecture: ["React + Vite portals over Supabase RLS", "Edge Functions: validate / route / enqueue", "Python worker pulls jobs (never pushed to)", "PreToolUse-hook gatekeeper", "Gated Auto-Fix envelope"],
    challenges: [
      "The agent never hot-edits live source — it works on a branch, the deliverable is a reviewed, test-backed commit, and undo is git revert.",
      "Model tiering by task risk keeps routine fixes cheap; crash-safe job claiming and a worker heartbeat keep the queue honest.",
    ],
    metrics: ["Sole author", "9 phases shipped", "Review-gated merges"],
    stack: ["Python", "Claude Agent SDK", "React", "Vite", "Supabase", "Edge Functions", "PostgreSQL RLS"],
    theme: "amber",
    github: null,
    live: null,
  },
  {
    id: 2,
    tier: 1,
    kind: "AI Solution",
    name: "Lifewood AI Agent (V1–V4)",
    tagline: "Expense intelligence with OCR, analytics and an LLM agent",
    problem:
      "Receipts — printed or handwritten — held expense data that staff could not categorise, analyse or ask questions about without handling each one by hand.",
    description:
      "Sole architect. Staff photograph a receipt; OCR extracts it, the system categorises it and lays the result out on an analytics dashboard, and an LLM agent answers plain-language questions about the data. A RAG pipeline makes source PDFs queryable alongside the structured data, with Excel/PDF export, admin and super-admin RBAC, and governance rules.",
    outcome:
      "Shipped across four production releases and presented to the company CEO — OCR in ~2–5 s, analytics responses in 150–300 ms in production, with written user manuals for both roles.",
    challenges: [
      "Handling noisy, inconsistent receipts while keeping the analytics path fast enough to feel instant (150–300 ms in production).",
    ],
    metrics: ["4 production releases", "OCR ~2–5 s", "Analytics 150–300 ms"],
    stack: ["Python", "Django", "React", "OpenAI / Claude APIs", "EasyOCR", "PostgreSQL", "RAG"],
    theme: "cyan",
    github: `${GH}/Lifewood_Ai-Agent-V4`,
    live: null,
  },
  {
    id: 13,
    tier: 1,
    kind: "AI Solution",
    name: "AIGC Training-Video Pipeline",
    tagline: "Script-to-master AI video production with an agent QC panel",
    problem:
      "An enterprise client needed multi-module e-learning videos produced entirely with generative AI, where every frame had to match an approved script, a strict brand system and the source material word for word, and every revision had to survive formal client review rounds.",
    description:
      "Built the production pipeline from approved script to delivery master. Scenes are generated from versioned prompt packs with locked character references; Python tools composite, track and re-pin wardrobe details across shots so characters stay consistent; voice-over is mastered separately with word-level timing that drives captions and edit points; and graphics are rendered in headless Chrome and assembled with ffmpeg into 1080p H.264 masters.",
    outcome:
      "A panel of specialised Claude Code QC subagents checks every render against the script and brand rules: brand, accessibility, audio, continuity, editing, learning design and source tracing. Client feedback is parsed into versioned approval packs, so each round's changes trace back to a specific comment.",
    architecture: ["Versioned script + prompt packs", "Locked character reference sheets", "Python compositing / optical-flow tracking", "Separate VO masters with word timings", "Headless-Chrome graphics → ffmpeg assembly", "Claude Code QC subagent panel"],
    challenges: [
      "Generated footage must never show invented legible text: documents, screens and IDs stay unreadable, and only approved on-screen copy is rendered.",
      "No lip-sync by design, so one picture serves every future language variant and only the voice-over master changes.",
    ],
    metrics: ["10+ QC subagents", "Versioned review rounds", "1080p delivery masters"],
    stack: ["Python", "ffmpeg", "Claude Code subagents", "Generative video & image", "TTS", "OpenCV", "Headless Chrome"],
    theme: "violet",
    github: null,
    live: null,
  },
  {
    id: 3,
    tier: 1,
    kind: "AI Solution",
    name: "Cred-It — Transfer-Credit Evaluation",
    tagline: "Document intelligence for scanned transcripts",
    problem:
      "Transfer-credit evaluation at the CIT-U College of Computer Studies was manual: faculty compared each Transcript of Records against the curricula line by line.",
    description:
      "Lead author on a team of five. A student uploads a transcript; EasyOCR + OpenCV extract subjects, grades and units, and a similarity matcher fuzzy-matches them against the department's curricula to propose credit — through a Request → Pending → Finalised workflow with a side-by-side transcript-versus-curriculum view for the evaluating faculty member.",
    outcome:
      "Evaluated with 39 real users: System Usability Scale 73.4 against a 68 benchmark. The evidence also showed OCR errors cost more trust than the automation saved, so extraction belongs as a decision-support step with visible confidence and easy correction — not an autonomous one.",
    challenges: [
      "Noisy, inconsistent scans — confidence is surfaced to the reviewer rather than hidden.",
    ],
    metrics: ["39-user study", "SUS 73.4 vs 68", "Human-in-the-loop"],
    stack: ["Python", "Django / DRF", "EasyOCR", "OpenCV", "PostgreSQL", "Redis", "React", "Docker"],
    theme: "violet",
    github: `${GH}/Cred-It`,
    live: null,
  },
  {
    id: 4,
    tier: 1,
    kind: "Full-Stack Platform",
    name: "LifewoodPH HRIS",
    tagline: "Company-wide human resources information system",
    problem:
      "HR ran on spreadsheets with no single source of truth for who was employed, on leave, or overdue for a punch — and a public intake form that had to feed records safely.",
    description:
      "Primary engineer (222 of 401 commits) on Lifewood Philippines' HRIS: intake → records pipeline, leave-credit accrual engine, RFID attendance monitoring, org chart, and rigid-format statutory document generation (BIR, certificate-of-employment and overtime requests). Next.js 15 + React 19, Express 5, Supabase Postgres and shared Zod contracts in a monorepo.",
    outcome:
      "Full employee lifecycle covered for the Cebu and Legazpi branches, with security hardening — anon RLS revoke, HMAC-keyed identity and service-role boot checks.",
    architecture: ["Next.js 15 App Router + Zustand", "Express 5 REST under /api/v1", "Supabase Postgres + RLS", "@hris/contract shared Zod schemas", "Railway + Vercel"],
    challenges: [
      "Leave-credit accrual engine: one shared pool with per-type yearly caps, accrual from the effective date, stopping at separation — implemented from HR's own sheet.",
    ],
    metrics: ["222 commits", "2 branches, full lifecycle", "RFID attendance"],
    stack: ["Next.js 15", "React 19", "TypeScript", "Express 5", "Supabase", "PostgreSQL", "Zod"],
    theme: "cyan",
    github: null,
    live: null,
  },
  {
    id: 5,
    tier: 1,
    kind: "Full-Stack Platform",
    name: "AngelHost & Keel",
    tagline: "Data ingestion + property management for multi-market rentals",
    problem:
      "Revenue and booking records arrived as workbooks that took days of manual handling before anyone could analyse them.",
    description:
      "Lead contributor on AngelHost (212 of 324 commits), Lifewood's PMS for a Kuala Lumpur / Manila / USA portfolio: a shared ingestion core with four transports (Power Automate, scheduled Microsoft Graph pull, local sync, manual upload) feeding per-market revenue tables behind parser gates. Keel is an independent channel-managed sibling on the Channex API.",
    outcome:
      "Unified calendar and dashboard KPIs across eight OTA channels and 30+ SQL migrations; parser gates hold a cut-over on a failed check rather than letting bad rows land.",
    challenges: [
      "Ran a read-only investigation of the legacy platform before integration and escalated a critical access-control exposure ahead of any migration decision.",
    ],
    metrics: ["212 commits (AngelHost)", "8 OTA sources", "4 ingestion transports"],
    stack: ["Next.js 14", "TypeScript", "Supabase", "Zod", "Microsoft Graph", "Power Automate", "Channex API"],
    theme: "violet",
    github: GH,
    live: null,
  },
  {
    id: 6,
    tier: 1,
    kind: "Full-Stack Platform",
    name: "Pulse Dialer",
    tagline: "Multi-tenant predictive dialer & contact-centre platform",
    problem:
      "The de-facto open-source dialer is a 2004 architecture — Perl daemons on cron, a MySQL table used as a message bus, browsers polling at 1 Hz, no tenant column anywhere.",
    description:
      "Independent project. A behaviour-level reimplementation of a predictive dialer on a 2026 stack: campaigns, lists and leads, manual / progressive / predictive dialing, a WebRTC agent workspace, a DNC and compliance engine, and supervisor tooling — event-driven end to end on Asterisk 22 ARI.",
    outcome:
      "128 commits, ten specs before code, 50+ integration/parity/drift tests, tenant_id under RLS on every table; every item reviewed by a fresh-context read-only agent.",
    architecture: ["Asterisk 22 ARI (Stasis)", "Fastify 5 + Zod → OpenAPI", "PostgreSQL 16 with RLS on every table", "Redis Streams for hot state", "Next.js 15 agent UI + JsSIP softphone"],
    challenges: [
      "Event-driven end to end — ARI WebSocket in, our own WebSocket out; no database polling, and the database is never a message bus.",
    ],
    metrics: ["128 commits", "50+ tests", "RLS on every table"],
    stack: ["TypeScript", "Node 22", "Fastify 5", "PostgreSQL 16", "Redis", "Asterisk 22 ARI", "Next.js 15"],
    theme: "cyan",
    github: GH,
    live: null,
  },

  // ---------- TIER 2 ----------
  {
    id: 7,
    tier: 2,
    name: "Expense AI Monorepo",
    description: "Fully local RAG over private documents (LangChain, ChromaDB, Ollama — no third-party inference) behind a Django API and Next.js dashboard, with a sanitising layer so retrieved text cannot smuggle instructions into the prompt.",
    stack: ["Django", "Next.js", "LangChain", "ChromaDB", "Ollama"],
    theme: "violet",
    github: `${GH}/AppliedAI_AIChatbot`,
    live: null,
  },
  {
    id: 8,
    tier: 2,
    name: "Pearl27 Automation",
    description: "LLM-driven browser automation with guard rails: HTTP-first scraping with Selenium fallback, fuzzy keyword detection, controlled prompt templates, multi-platform posting, Google Sheets audit log and a dry-run mode.",
    stack: ["Python", "Selenium", "LLM Integration"],
    theme: "cyan",
    github: `${GH}/Pearl-Drumming-Bot`,
    live: null,
  },
  {
    id: 9,
    tier: 2,
    name: "OLTEK Contract Extraction",
    description: "Built for a company hackathon. Layered extraction — deterministic → layout graph → AI fallback — with per-field confidence scoring, table detection for PDFs and scans, and CSV/Excel export.",
    stack: ["Python", "Django", "AI Pipelines"],
    theme: "violet",
    github: `${GH}/OLTEK-Hackathon`,
    live: null,
  },
  {
    id: 10,
    tier: 2,
    name: "Lifewood Corporate Website",
    description: "SSR Next.js frontend with TTFB optimisation, applicant submission and admin review workflows on a Django backend, Framer Motion / GSAP animation, deployed on Vercel.",
    stack: ["Next.js", "TypeScript", "Django"],
    theme: "cyan",
    github: `${GH}/lifewood_website`,
    live: null,
  },
  {
    id: 11,
    tier: 2,
    name: "LifeReach & TaskFlow LW",
    description: "LifeReach: monorepo restructure with a shared TypeScript contract. TaskFlow: led the production data-loss incident remediation — traced it to an unapplied permissions migration, fixed destructive cascades, wrote the incident record.",
    stack: ["TypeScript", "React", "Supabase", "npm Workspaces"],
    theme: "violet",
    github: null,
    live: null,
  },
  {
    id: 12,
    tier: 2,
    name: "Student Clearance System",
    description: "Role-based university clearance workflows (Student / Dept Head / Registrar) with Google OAuth, JWT sessions, approval REST APIs, notifications and real-time dashboards.",
    stack: ["React", "Spring Boot", "MySQL"],
    theme: "cyan",
    github: `${GH}/it342-Student-Clearance-System`,
    live: null,
  },
];

// ================================================================
// AI SOLUTIONS CAPABILITIES
// ================================================================
export const aiCapabilities = [
  {
    icon: "🧠",
    title: "AI Agents & Tool Use",
    description:
      "Agents on the Claude Agent SDK that claim work, use tools and run multi-step tasks — with safety outside the model: PreToolUse-hook gatekeepers, allow-listed shells, model tiering by risk and a human review step.",
    tags: ["Claude Agent SDK", "PreToolUse Hooks", "Model Tiering", "MCP"],
  },
  {
    icon: "💬",
    title: "LLM Integration & RAG",
    description:
      "Claude and OpenAI APIs wired into real products: conversational querying over business data, retrieval over private documents (LangChain, ChromaDB, Ollama, pgvector), and prompt and context design with input sanitising.",
    tags: ["Anthropic / OpenAI APIs", "RAG", "pgvector", "Prompt Design"],
  },
  {
    icon: "👁️",
    title: "Document Intelligence",
    description:
      "OCR and LLM pipelines from raw scans to structured, queryable data — receipts, contracts, transcripts — with per-field confidence scoring, fuzzy matching and confidence surfaced to the reviewer.",
    tags: ["EasyOCR", "OpenCV", "Confidence Scoring", "Layered Extraction"],
  },
  {
    icon: "⚡",
    title: "Workflow Automation",
    description:
      "Python workers and automations that remove manual handling: multi-transport data ingestion (Power Automate, Microsoft Graph, webhooks), browser automation with LLM-drafted responses, dry-run modes and audit logs.",
    tags: ["Python", "Power Automate", "Microsoft Graph", "Selenium"],
  },
  {
    icon: "📏",
    title: "Evaluation Before Scale",
    description:
      "Measure before widening: a 39-user usability study for Cred-It, pilot go/no-go metrics for Nexus (fix-acceptance, test-attach, near-misses, cost per accepted fix), and predictions stated before the test runs.",
    tags: ["Usability Studies", "Pilot Metrics", "Go / No-Go Gates"],
  },
  {
    icon: "🔐",
    title: "Guard Rails & Adoption",
    description:
      "Row-level security on every tenant table, protected-path writes, permission allow-lists, and the runbooks, user manuals and specs that make non-developers willing to trust an AI system.",
    tags: ["PostgreSQL RLS", "Audit Logging", "Runbooks", "User Manuals"],
  },
];

// ================================================================
// CERTIFICATIONS
// ================================================================
export const certifications = [
  { name: "AI Prompting for Automation (Level 3, TESDA-aligned)", issuer: "StackTrek", date: "May 2026" },
  { name: "Utilize Generative AI", issuer: null, date: null },
  { name: "AI Automation Techniques", issuer: null, date: null },
  { name: "Data Privacy & Ethics", issuer: null, date: null },
  { name: "AWS (60 hours)", issuer: "Accenture Academy", date: "Jan 2026" },
];

// ================================================================
// WORK EXPERIENCE
// ================================================================
export const experiences = [
  {
    title: "Software Engineer / IT Executive Assistant / OJT Mentor",
    company: "Lifewood Philippines",
    iconBg: "rgba(0, 212, 255, 0.12)",
    iconColor: "#00d4ff",
    iconEmoji: "🛠️",
    date: "Jun 2026 — Oct 2026",
    points: [
      "Sole author of Lifewood-Nexus — agentic IT remediation on the Claude Agent SDK, delivered in nine phases from RLS schema to gated Auto-Fix, runbooks and pilot plan.",
      "Designed and graded the AI-agent curriculum for two intern cohorts (pass criteria: measurable productivity impact and genuine agentic capability, not a chat wrapper) and onboarded them to Claude Code and agent tooling.",
      "Primary engineer on LifewoodPH HRIS (222 of 401 commits): intake → records, leave-credit accrual engine, RFID attendance monitoring, statutory document generation, security hardening.",
      "Lead contributor on AngelHost PMS (212 of 324 commits): four-transport ingestion core, per-market revenue tables behind parser gates, dashboard KPIs, 30+ SQL migrations.",
      "Led TaskFlow LW's data-loss incident remediation; built LifeVault automated backups; proposed the documentation and system-design standard adopted company-wide.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Lifewood Data Technology",
    iconBg: "rgba(124, 58, 237, 0.12)",
    iconColor: "#a78bfa",
    iconEmoji: "🤖",
    date: "Feb 2026 — May 2026",
    points: [
      "Architected the Lifewood AI Agent across four releases — receipt OCR, LLM analytics, conversational querying and governance rules — and presented it to the CEO (OCR ~2–5 s, analytics ~150–300 ms).",
      "Built Pearl27, LLM-driven browser automation with guard rails: fuzzy keyword detection, controlled prompt templates, audit logging and a dry-run mode.",
      "Built OLTEK for the company hackathon — layered contract extraction with per-field confidence scoring.",
      "Built the Lifewood corporate website (Next.js SSR + Django) with applicant and admin review workflows.",
    ],
  },
  {
    title: "Business Process Outsourcing Agent",
    company: "BPO Industry",
    iconBg: "rgba(245, 158, 11, 0.12)",
    iconColor: "#f59e0b",
    iconEmoji: "📞",
    date: "2022 — 2024",
    points: [
      "Two years of SLA-bound client work in English under strict process adherence and data-accuracy requirements.",
      "Built the written-communication discipline that now shows up in runbooks, user manuals, review reports and handoff documents — and in explaining technical decisions to non-developers.",
    ],
  },
];

// ================================================================
// SOCIAL / CONTACT
// ================================================================
export const socialLinks = [
  { name: "GitHub",   url: "https://github.com/FrancisGarryNillama",                          icon: "GH" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/francis-garry-nillama-b869a1333/",   icon: "LI" },
  { name: "CV",       url: "https://cv-nillama-2026.vercel.app",                              icon: "CV" },
  { name: "Email",    url: "mailto:paenggwapokaayo123@gmail.com",                             icon: "@"  },
];
