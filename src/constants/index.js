// ================================================================
// PORTFOLIO CONSTANTS
// Replace placeholder values (marked with TODO) with your real data
// ================================================================

export const hero = {
  name: "Francis Garry Nillama",
  initials: "FN",
  tagline: "AI-Integrated Full-Stack Engineer",
  headline: ["Building Intelligent", "Systems That Scale"],
  description:
    "Specializing in LLM integration, OCR automation, browser orchestration, and enterprise workflow engineering. I turn complex problems into clean, intelligent software.",
  specializations: ["AI Systems", "OCR Automation", "LLM Integration", "Full-Stack Arch", "Workflow Pipelines"],
};

// ================================================================
// TECH STACK — categorized
// ================================================================
export const skills = {
  "AI / ML": [
    "Python", "LangChain", "OpenCV", "Tesseract OCR",
    "Gemini AI", "GPT Integration", "Prompt Engineering", "LLM Fine-tuning",
  ],
  "Frontend": [
    "React.js", "Next.js", "TypeScript", "Tailwind CSS",
    "JavaScript", "Three.js", "HTML / CSS",
  ],
  "Backend": [
    "FastAPI", "Node.js", "Express.js", "Python Flask",
    "REST APIs", "WebSockets",
  ],
  "Database": [
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase",
  ],
  "Automation": [
    "Selenium", "Playwright", "Browser Automation",
    "Workflow Orchestration", "HTTP Scraping",
  ],
  "DevOps": [
    "Git & GitHub", "Docker", "Vercel", "Linux / Bash", "CI/CD",
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
// ================================================================
export const projects = [
  // ---------- TIER 1 ----------
  {
    id: 1,
    tier: 1,
    name: "Lifewood AI Agent",
    tagline: "Enterprise AI-powered document intelligence",
    description:
      "An enterprise-grade AI agent that automates data extraction, document processing, and intelligent workflow management across multiple data sources at scale.",
    problem:
      "Manual data processing bottlenecks across diverse document types were slowing down operations and introducing human error.",
    architecture: ["FastAPI backend", "LangChain orchestration", "MongoDB storage", "Gemini AI reasoning", "React dashboard"],
    challenges: [
      "Built custom chunking pipeline for variable-length legal documents.",
      "Designed multi-model routing to balance cost vs. accuracy per document class.",
    ],
    metrics: ["Processing: 2–5s / doc", "8+ document types", "95%+ accuracy"],
    stack: ["Python", "LangChain", "FastAPI", "MongoDB", "Gemini AI"],
    modelUrl: "/src/assets/3d models/Neural_Network.glb",
    theme: "cyan",
    github: "https://github.com/FrancisGarryNillama",
    live: "https://ai-agent-demo.vercel.app",
  },
  {
    id: 2,
    tier: 1,
    name: "Pearl27 Automation",
    tagline: "Multi-platform browser orchestration pipeline",
    description:
      "Full-stack automation pipeline for multi-platform browser orchestration using an HTTP-first retrieval strategy with intelligent Selenium/Playwright fallback architecture.",
    problem:
      "Scaling reliable data collection across 8+ platforms with varying structures, rate limits, and anti-bot measures.",
    architecture: ["HTTP-first layer", "Playwright fallback", "Task queue", "FastAPI orchestrator", "PostgreSQL store"],
    challenges: [
      "Implemented smart retry logic with exponential back-off and proxy rotation.",
      "Built a diff engine to detect and flag structural changes across target platforms.",
    ],
    metrics: ["8+ platforms", "99% uptime SLA", "HTTP-first fallback"],
    stack: ["Python", "Selenium", "Playwright", "FastAPI", "PostgreSQL"],
    modelUrl: "/src/assets/3d models/Data_Flow_Pipeline.glb",
    theme: "violet",
    github: "https://github.com/francis-dev",
    live: "https://automation-pipeline.vercel.app",
  },
  {
    id: 3,
    tier: 1,
    name: "OLTEK Contract Extraction",
    tagline: "Intelligent OCR + LLM document parsing",
    description:
      "AI-powered system using OCR and LLM integration to extract structured, queryable data from unstructured legal contracts with enterprise-grade precision.",
    problem:
      "Manual contract review was taking hours per document, with key field extraction errors causing downstream compliance issues.",
    architecture: ["OpenCV pre-processing", "Tesseract OCR", "GPT extraction layer", "React review UI", "REST API"],
    challenges: [
      "Handled skewed, low-DPI scans via adaptive thresholding and deskew pre-processing.",
      "Built a confidence-scoring layer to flag low-certainty extractions for human review.",
    ],
    metrics: ["OCR pipeline: 2–5s", "Legal doc support", "95%+ field accuracy"],
    stack: ["Python", "Tesseract", "OpenCV", "GPT-4", "React"],
    modelUrl: "/src/assets/3d models/Glowing_Document.glb",
    theme: "amber",
    github: "https://github.com/francis-dev",
    live: null,
  },
  {
    id: 4,
    tier: 1,
    name: "TOR OCR Evaluation System",
    tagline: "Benchmark framework for OCR model comparison",
    description:
      "A comprehensive evaluation framework for benchmarking multiple OCR engines across document types, measuring accuracy, processing speed, and reliability at scale.",
    problem:
      "No standardised way to compare OCR engines across different document layouts, scan qualities, and language variants.",
    architecture: ["Python test runner", "Multi-model adapters", "FastAPI analytics API", "React dashboard", "PostgreSQL"],
    challenges: [
      "Normalised evaluation metrics across engines with fundamentally different output formats.",
      "Built async parallel test runner to process 500+ document test cases in under 60s.",
    ],
    metrics: ["Analytics: 150–300ms", "Multi-model support", "Automated benchmarks"],
    stack: ["Python", "OpenCV", "Pandas", "FastAPI", "React"],
    modelUrl: "/src/assets/3d models/Dashboard.glb",
    theme: "cyan",
    github: "https://github.com/francis-dev",
    live: null,
  },

  // ---------- TIER 2 ----------
  {
    id: 5,
    tier: 2,
    name: "SCS Platform",
    description: "Student collaboration system with real-time data, role-based access control, and integrated file sharing.",
    stack: ["React", "Node.js", "MongoDB"],
    modelUrl: "/src/assets/3d models/Layered_Glass_Squares.glb",
    theme: "violet",
    github: "https://github.com/francis-dev",
    live: null,
  },
  {
    id: 6,
    tier: 2,
    name: "Sleeping Pod Booking",
    description: "Full-stack booking platform with real-time availability management and payment flow integration.",
    stack: ["React", "Express", "MySQL"],
    modelUrl: "/src/assets/3d models/Database.glb",
    theme: "cyan",
    github: "https://github.com/francis-dev",
    live: null,
  },
  {
    id: 7,
    tier: 2,
    name: "Data Visualization Dashboard",
    description: "Interactive analytics dashboard with live data feeds, customisable charts, and advanced filtering.",
    stack: ["React", "D3.js", "Python", "FastAPI"],
    modelUrl: "/src/assets/3d models/Data_Vis.glb",
    theme: "amber",
    github: "https://github.com/francis-dev",
    live: null,
  },
  {
    id: 8,
    tier: 2,
    name: "Horror Puzzle System",
    description: "Game logic engine with procedural puzzle generation, narrative branching, and WebSocket multiplayer.",
    stack: ["Python", "React", "WebSockets"],
    modelUrl: "/src/assets/3d models/HexaCore_Crystal.glb",
    theme: "violet",
    github: "https://github.com/francis-dev",
    live: null,
  },
];

// ================================================================
// AI & AUTOMATION CAPABILITIES
// ================================================================
export const aiCapabilities = [
  {
    icon: "🧠",
    title: "LLM Integration",
    description:
      "Connecting Gemini AI, GPT-4, and open-source LLMs into production workflows with advanced prompt engineering and structured output parsing.",
    tags: ["LangChain", "Gemini AI", "GPT-4", "Prompt Engineering"],
  },
  {
    icon: "👁️",
    title: "OCR & Computer Vision",
    description:
      "Building document extraction pipelines with Tesseract and OpenCV — from raw scans to structured, queryable data with confidence scoring.",
    tags: ["Tesseract", "OpenCV", "PDF Parsing", "Image Pre-processing"],
  },
  {
    icon: "🤖",
    title: "Browser Automation",
    description:
      "Multi-platform orchestration using HTTP-first retrieval with intelligent Selenium/Playwright fallback, proxy rotation, and anti-detection.",
    tags: ["Selenium", "Playwright", "HTTP Scraping", "Proxy Rotation"],
  },
  {
    icon: "⚡",
    title: "Workflow Orchestration",
    description:
      "Designing automation pipelines that wire AI models, APIs, queues, and databases into reliable, observable production systems.",
    tags: ["FastAPI", "Task Queues", "Pipeline Design", "Observability"],
  },
  {
    icon: "📊",
    title: "AI Evaluation Frameworks",
    description:
      "Building benchmark systems to measure model performance — accuracy, latency, cost — with automated regression detection.",
    tags: ["Benchmarking", "Metrics", "Regression Testing", "Analytics"],
  },
  {
    icon: "🔄",
    title: "Data Processing Pipelines",
    description:
      "End-to-end ETL from raw documents to structured intelligence: ingestion, transformation, validation, and storage.",
    tags: ["ETL", "MongoDB", "PostgreSQL", "Data Modelling"],
  },
];

// ================================================================
// WORK EXPERIENCE
// ================================================================
export const experiences = [
  {
    title: "AI Systems Developer — Intern",
    company: "Lifewood",
    iconBg: "rgba(0, 212, 255, 0.12)",
    iconColor: "#00d4ff",
    iconEmoji: "🤖",
    date: "Feb 2026 — Present",
    points: [
      "Built AI-powered document processing pipelines using OCR, LLMs, and computer vision.",
      "Developed multi-platform browser automation systems handling 8+ target websites at scale.",
      "Integrated Gemini AI and GPT-4 into enterprise workflows with custom prompt engineering.",
      "Architected FastAPI backends with MongoDB for intelligent data ingestion and orchestration.",
    ],
  },
  {
    title: "Customer Communication Specialist",
    company: "BPO Industry",
    iconBg: "rgba(124, 58, 237, 0.12)",
    iconColor: "#a78bfa",
    iconEmoji: "📞",
    date: "June 2022 — Dec 2023",
    points: [
      "Managed complex, high-stakes client interactions — sharpening structured communication under pressure.",
      "Identified workflow bottlenecks and introduced process improvements adopted team-wide.",
      "Built systematic problem-solving frameworks later applied directly to software engineering practice.",
      "Transitioned domain expertise and discipline into motivation for enterprise automation tooling.",
    ],
  },
];

// ================================================================
// SOCIAL / CONTACT
// ================================================================
export const socialLinks = [
  { name: "GitHub",   url: "https://github.com/FrancisGarryNillama",             icon: "GH" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/francis-garry-nillama-b869a1333/",   icon: "LI" },
  { name: "Email",    url: "mailto:paenggwapokaayo123@gmail.com",                 icon: "@"  },
];