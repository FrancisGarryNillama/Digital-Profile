// ================================================================
// PORTFOLIO CONSTANTS
// Last refreshed: September 2026
// ================================================================

export const hero = {
  name: "Francis Garry Nillama",
  initials: "FN",
  tagline: "Full-Stack Software Engineer · AI-Integrated Systems",
  headline: ["Building Production", "Systems That Hold Up"],
  description:
    "Primary engineer on Lifewood Philippines' HRIS and property-management platform, sole author of an agentic IT-ticketing system on the Claude Agent SDK, and independently building a multi-tenant predictive dialer on Asterisk 22 ARI. Strict TypeScript, PostgreSQL row-level security, event-driven architecture — and the documentation to prove it.",
  specializations: ["TypeScript / Node", "Next.js / React", "PostgreSQL + RLS", "Agentic AI", "Telephony (ARI)"],
};

// ================================================================
// TECH STACK — categorized
// (category keys map to 3D models in Home.jsx — keep the six names)
// ================================================================
export const skills = {
  "AI / ML": [
    "Claude Agent SDK", "OpenAI / Anthropic APIs", "Prompt & Workflow Design",
    "RAG (LangChain, ChromaDB, Ollama)", "EasyOCR", "OpenCV", "pgvector",
  ],
  "Frontend": [
    "Next.js 14 / 15", "React 18 / 19", "TypeScript", "Tailwind CSS 3 / 4",
    "shadcn/ui", "Zustand", "React Hook Form", "Recharts", "Framer Motion / GSAP", "Three.js / R3F", "Vite",
  ],
  "Backend": [
    "Node 22", "Express 5", "Fastify 5", "Django / DRF", "Spring Boot",
    "Zod → OpenAPI", "WebSockets", "JWT / OAuth / RBAC", "Supabase Edge Functions",
  ],
  "Database": [
    "PostgreSQL 16", "Row-Level Security", "SQL Migrations", "Partitioning / JSONB",
    "Supabase", "Redis Streams", "MySQL", "SQLite", "MinIO / S3",
  ],
  "Automation": [
    "Asterisk 22 ARI", "PJSIP / WebRTC (JsSIP)", "Selenium", "Apify",
    "Microsoft Graph", "Power Automate", "Git Subtree / Monorepos",
  ],
  "DevOps": [
    "Docker / Compose", "GitHub Actions CI", "Vercel", "Railway", "Render",
    "pnpm + Turborepo", "Vitest", "Playwright", "Pino / OpenTelemetry", "WSL2",
  ],
};

// Category accent colours (matches CSS classes)
export const categoryAccent = {
  "AI / ML":    "cyan",
  "Frontend":   "violet",
  "Backend":    "cyan",
  "Database":   "amber",
  "Automation": "violet",
  "DevOps":     "cyan",
};

// ================================================================
// PROJECTS
// tier 1 = hero showcase | tier 2 = smaller cards
// Private repos link to the GitHub profile; NDA-covered work names the
// system and the contribution but carries no repo link.
// ================================================================
const GH = "https://github.com/FrancisGarryNillama";

export const projects = [
  // ---------- TIER 1 ----------
  {
    id: 1,
    tier: 1,
    name: "Pulse Dialer",
    tagline: "Multi-tenant predictive dialer & contact-centre platform",
    description:
      "A clean-room, behaviour-level reimplementation of VICIdial's capability set on a 2026 stack: campaigns, lists and leads, manual / progressive / predictive dialing, a WebRTC agent workspace, dispositions with behaviour flags, a DNC and compliance engine, bridge recording to object storage, and supervisor tooling. Independent project, 128 commits, CI-green.",
    problem:
      "The de-facto open-source dialer is a 2004 architecture — Perl daemons on cron, a MySQL table used as a message bus, browsers polling at 1 Hz, no tenant column anywhere.",
    architecture: ["Asterisk 22 ARI (Stasis)", "Fastify 5 + Zod → OpenAPI", "PostgreSQL 16 with RLS on every table", "Redis Streams for hot state", "Next.js 15 agent UI + JsSIP softphone"],
    challenges: [
      "Event-driven end to end — ARI WebSocket in, our own WebSocket out; no database polling, and the database is never a message bus.",
      "A single transition writer for agent state, with lifecycle tests proving state writes never decide a call's fate.",
    ],
    metrics: ["tenant_id + RLS everywhere", "Compliance gate on every originate", "Phase 3 complete, 4.1 in progress"],
    stack: ["TypeScript", "Node 22", "Fastify 5", "PostgreSQL 16", "Redis", "Asterisk 22 ARI", "Next.js 15", "Vitest", "Playwright", "Docker"],
    modelUrl: "/models/System_Orchestration.glb",
    theme: "cyan",
    github: GH,
    live: null,
  },
  {
    id: 2,
    tier: 1,
    name: "LifewoodPH HRIS",
    tagline: "Company-wide human resources information system",
    description:
      "Primary engineer (219 of 330 commits) on Lifewood Philippines' HRIS covering the full employee lifecycle for the Cebu and Legazpi branches — pre-employment intake, onboarding, RFID attendance, leave / COE / BIR / overtime requests, evaluations, promotions, disciplinary records and separation. Next.js 15 + React 19 frontend, Express 5 API, Supabase Postgres, shared Zod contract in an npm-workspace monorepo.",
    problem:
      "HR ran on spreadsheets with no single source of truth for who was employed, on leave, or overdue for a punch — and a public intake form that had to feed records safely.",
    architecture: ["Next.js 15 App Router + Zustand", "Express 5 REST under /api/v1", "Supabase Postgres + RLS", "@hris/contract shared Zod schemas", "Railway + Vercel"],
    challenges: [
      "Leave-credit accrual engine: one shared pool with per-type yearly caps, accrual from the effective date, stopping at separation — implemented from HR's own sheet.",
      "Security hardening: revoked anon RLS access, HMAC-keyed identity fingerprints on a dedicated secret, and service-role checks that fail at boot instead of silently degrading.",
    ],
    metrics: ["219 commits", "2 branches, full lifecycle", "RFID attendance + absence monitoring"],
    stack: ["Next.js 15", "React 19", "TypeScript", "Express 5", "Supabase", "PostgreSQL", "Zod", "Zustand"],
    modelUrl: "/models/Team_workflow_symbol.glb",
    theme: "violet",
    github: null,
    live: null,
  },
  {
    id: 3,
    tier: 1,
    name: "Lifewood-Nexus",
    tagline: "IT ticketing with agentic auto-remediation",
    description:
      "Sole author. Employees file tickets; a Python worker on the Claude Agent SDK reproduces, fixes and tests the bug on an isolated git branch; IT reviews the diff and approves a merge — or a per-tool gated Auto-Fix applies it inside a safety envelope. Undo is git revert. Nine delivery phases from Supabase RLS schema to hardening, runbooks and pilot plan.",
    problem:
      "Small IT team, growing internal system count, and a ticket queue where most items were reproducible bugs a careful agent could fix under supervision.",
    architecture: ["React + Vite portals over Supabase RLS", "Edge Functions: validate / route / enqueue", "Python worker pulls jobs (never pushed to)", "PreToolUse-hook gatekeeper", "Gated Auto-Fix envelope"],
    challenges: [
      "The agent never hot-edits live source — it works on a branch, and the deliverable is a reviewed, test-backed commit.",
      "Gatekeeper enforces scoped reads, allow-listed bash and protected-path writes; model tiering keeps routine fixes cheap.",
    ],
    metrics: ["9 phases shipped", "Crash-safe job claiming", "Rate limiting + worker health"],
    stack: ["Python", "Claude Agent SDK", "React", "Vite", "Supabase", "Edge Functions", "PostgreSQL RLS"],
    modelUrl: "/models/AI_Core.glb",
    theme: "amber",
    github: null,
    live: null,
  },
  {
    id: 4,
    tier: 1,
    name: "AngelHost & Keel",
    tagline: "Property management for multi-market rental portfolios",
    description:
      "AngelHost (lead contributor, 144 of 227 commits) is Lifewood's PMS for a Kuala Lumpur / Manila / USA short-term-rental portfolio; Keel is my independent channel-managed sibling built on the Channex API. Both: Next.js on Supabase, unified calendar, guest-communication playbook, dashboard KPIs, and finance that never sums across currencies.",
    problem:
      "Bookings from eight OTAs arrived as spreadsheets and inbox threads; no one view of occupancy, revenue or sync freshness per market.",
    architecture: ["Next.js 14 RSC + Server Actions", "Supabase Postgres + RLS", "Shared ingestion core with 4 transports", "Channex webhooks + ARI push (Keel)", "30+ SQL migrations"],
    challenges: [
      "Ingestion core with four transports — Power Automate webhook, scheduled Microsoft Graph pull, local sync, manual upload — feeding per-market revenue tables behind parser gates, with every cut-over verified live, not assumed.",
      "Unified market / unit / platform filters carried across every page, and a sync-freshness panel that separates data age from check time.",
    ],
    metrics: ["144 commits (AngelHost)", "8 OTA sources", "3 markets, 2 currencies"],
    stack: ["Next.js 14", "React Server Components", "TypeScript", "Supabase", "Channex API", "Zod", "Tailwind", "Microsoft Graph"],
    modelUrl: "/models/Interactive_Analytics_Dashboard.glb",
    theme: "cyan",
    github: GH,
    live: null,
  },

  // ---------- TIER 2 ----------
  {
    id: 5,
    tier: 2,
    name: "Lifewood AI Agent (V1–V4)",
    description: "AI expense-intelligence platform across four releases: receipt OCR and categorisation, LLM analytics, conversational querying, Excel/PDF exports. OCR ~2–5 s, analytics ~150–300 ms.",
    stack: ["Python", "Django", "React", "OpenAI / Claude", "EasyOCR"],
    modelUrl: "/models/Secure_Document_Exchange.glb",
    theme: "cyan",
    github: `${GH}/Lifewood_Ai-Agent-V4`,
    live: null,
  },
  {
    id: 6,
    tier: 2,
    name: "OLTEK Contract Extraction",
    description: "Hackathon winner. Layered extraction — deterministic → layout graph → AI fallback — with per-field confidence scoring, table detection for PDFs and scans, CSV/Excel export.",
    stack: ["Python", "Django", "AI Pipelines"],
    modelUrl: "/models/Secure_Document_Exchange.glb",
    theme: "violet",
    github: `${GH}/OLTEK-Hackathon`,
    live: null,
  },
  {
    id: 7,
    tier: 2,
    name: "LifeReach & TaskFlow LW",
    description: "LifeReach: monorepo restructure with a shared TypeScript contract, Vercel build fixes, rebrand. TaskFlow: led a production data-loss incident remediation — safe user deletion, destructive-cascade fixes, OCR-proxy auth.",
    stack: ["TypeScript", "React", "Supabase", "npm Workspaces"],
    modelUrl: "/models/Workflow_Pipeline.glb",
    theme: "cyan",
    github: null,
    live: null,
  },
  {
    id: 8,
    tier: 2,
    name: "Cred-It — Transferee Accreditation",
    description: "Capstone for the CIT-U CCS department. OCR of Transcripts of Records, fuzzy-matched against curricula to automate subject-credit evaluation for transferees; handles noisy, inconsistent scans.",
    stack: ["Python", "EasyOCR", "JavaScript", "Docker"],
    modelUrl: "/models/Data_Visualization_Graphs.glb",
    theme: "violet",
    github: `${GH}/Cred-It`,
    live: null,
  },
  {
    id: 9,
    tier: 2,
    name: "Pearl27 Automation",
    description: "Production browser automation: HTTP-first scraping with Selenium fallback, LLM-generated responses with platform-aware prompts, multi-platform posting via page objects, Google Sheets audit log, retries and dry-run mode.",
    stack: ["Python", "Selenium", "LLM Integration"],
    modelUrl: "/models/Browser_Automation.glb",
    theme: "cyan",
    github: `${GH}/Pearl-Drumming-Bot`,
    live: null,
  },
  {
    id: 10,
    tier: 2,
    name: "Expense AI Monorepo",
    description: "Django API + Next.js dashboard for expense tracking and analytics with an optional local RAG pipeline (LangChain, ChromaDB, Ollama) and a security module for input validation and content sanitising.",
    stack: ["Django", "Next.js", "LangChain"],
    modelUrl: "/models/Database_Cylinder.glb",
    theme: "violet",
    github: `${GH}/AppliedAI_AIChatbot`,
    live: null,
  },
  {
    id: 11,
    tier: 2,
    name: "Lifewood Corporate Website",
    description: "SSR Next.js frontend with TTFB optimisation, applicant submission and admin review workflows on a Django backend, Framer Motion / GSAP animation, deployed on Vercel.",
    stack: ["Next.js", "TypeScript", "Django"],
    modelUrl: "/models/Frontend_Component_Layers.glb",
    theme: "cyan",
    github: `${GH}/lifewood_website`,
    live: null,
  },
  {
    id: 12,
    tier: 2,
    name: "Student Clearance System",
    description: "Role-based university clearance workflows (Student / Dept Head / Registrar) with Google OAuth, JWT sessions, approval REST APIs, notifications and real-time dashboards.",
    stack: ["React", "Spring Boot", "MySQL"],
    modelUrl: "/models/Api_Nodes.glb",
    theme: "violet",
    github: `${GH}/it342-Student-Clearance-System`,
    live: null,
  },
];

// ================================================================
// AI & AUTOMATION CAPABILITIES
// ================================================================
export const aiCapabilities = [
  {
    icon: "🧠",
    title: "Agentic Systems",
    description:
      "Workers built on the Claude Agent SDK that reproduce, fix and test bugs on isolated branches — behind hook-based gatekeepers, model tiering and a human review step. Undo is git revert.",
    tags: ["Claude Agent SDK", "PreToolUse Hooks", "Model Tiering", "Review-Gated Merge"],
  },
  {
    icon: "👁️",
    title: "Document Intelligence",
    description:
      "OCR and LLM pipelines from raw scans to structured, queryable data — receipts, contracts, transcripts — with per-field confidence scoring and deterministic-first fallbacks.",
    tags: ["EasyOCR", "OpenCV", "Confidence Scoring", "Layered Extraction"],
  },
  {
    icon: "📞",
    title: "Real-Time Telephony",
    description:
      "Asterisk 22 ARI call control over WebSocket, conference-parked agents, a predictive pacer steered on the ready-agent differential, and a compliance gate no originate can bypass.",
    tags: ["Asterisk ARI", "WebRTC / JsSIP", "Redis Streams", "Compliance Gating"],
  },
  {
    icon: "⚡",
    title: "Data Ingestion Pipelines",
    description:
      "Shared ingestion cores with multiple transports — webhooks, scheduled Microsoft Graph pulls, local sync, manual upload — feeding gated per-market tables with verified cut-overs.",
    tags: ["Microsoft Graph", "Power Automate", "Parser Gates", "SQL Migrations"],
  },
  {
    icon: "🔐",
    title: "Multi-Tenant Data Security",
    description:
      "Postgres row-level security on every table, tenant_id as a non-retrofittable invariant, anon-access revocation, HMAC-keyed identities and boot-time secret checks.",
    tags: ["PostgreSQL RLS", "Supabase Auth", "RBAC", "Secrets Hygiene"],
  },
  {
    icon: "🤖",
    title: "Browser & Workflow Automation",
    description:
      "HTTP-first retrieval with Selenium fallback, Apify actors for social signals, LLM-drafted responses with guardrails, and audit logging that makes every run reviewable.",
    tags: ["Selenium", "Apify", "Page Object Model", "Dry-Run Mode"],
  },
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
    date: "Jun 2026 — Present",
    points: [
      "Primary engineer on LifewoodPH HRIS (219 of 330 commits): intake → records, leave-credit accrual engine, overtime/COE/BIR requests, RFID attendance monitoring, org chart, security hardening.",
      "Lead contributor on AngelHost PMS (144 of 227 commits): multi-transport ingestion core, per-market revenue tables, dashboard KPIs with unified filters, 30+ SQL migrations.",
      "Sole author of Lifewood-Nexus — IT ticketing with agentic auto-remediation on the Claude Agent SDK, delivered in nine phases.",
      "Monorepo restructure for LifeReach; led TaskFlow LW's data-loss incident remediation; PHLifeTerm OJT-app features; LifeVault automated org-wide backups.",
      "Received system handovers, managed company accounts and tooling, proposed the adopted documentation standards, and designed and graded activities for intern batches 9–10.",
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
      "Architected the Lifewood AI Agent across four releases — receipt OCR, LLM analytics, conversational querying, Excel/PDF reporting (OCR ~2–5 s, analytics ~150–300 ms).",
      "Built the Lifewood corporate website (Next.js SSR + Django) with applicant and admin review workflows.",
      "Won the company hackathon with OLTEK, a contract-extraction suite with per-field confidence scoring.",
      "Developed Pearl27, a production browser-automation system with LLM-generated responses and audit logging.",
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
      "Two years of high-volume client interaction under strict process adherence and data-accuracy requirements.",
      "Built the structured communication and QA discipline now applied to engineering work.",
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
