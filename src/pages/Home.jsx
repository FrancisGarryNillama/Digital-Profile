import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Link } from "react-router-dom";

import { Avatar, FloatingModel } from "../models";
import { Footer, ErrorBoundary } from "../components";
import {
  hero,
  skills,
  projects,
  aiCapabilities,
  experiences,
  socialLinks,
  categoryAccent,
} from "../constants";

// ─────────────────────────────────────────────────────────────
// MODEL PATH MAP — GLBs served from public/models/ (URL path /models/...)
// ─────────────────────────────────────────────────────────────
const M = {
  futuristicAIBrain:       "/models/Futuristic_AI_Brain.glb",
  neuralNetworkNodes:      "/models/Neural_Network_Nodes.glb",
  intelligentCircuitry:    "/models/Intelligent_Circuitry.glb",
  abstractAIProcessor:     "/models/Abstract_AI_Processor_Core.glb",
  aiCore:                  "/models/AI_Core.glb",
  aiBrain:                 "/models/Ai_brain.glb",
  codeBrackets:            "/models/Code_Brackets.glb",
  serverStack:             "/models/Server_Stack.glb",
  databaseCylinder:        "/models/Database_Cylinder.glb",
  apiNodes:                "/models/Api_Nodes.glb",
  frontendComponentLayers: "/models/Frontend_Component_Layers.glb",
  workflowPipeline:        "/models/Workflow_Pipeline.glb",
  systemOrchestration:     "/models/System_Orchestration.glb",
  browserAutomation:       "/models/Browser_Automation.glb",
  cloudSync:               "/models/Cloud_Synchronization.glb",
  interactiveAnalytics:    "/models/Interactive_Analytics_Dashboard.glb",
  dataVizGraphs:           "/models/Data_Visualization_Graphs.glb",
  secureDoc:               "/models/Secure_Document_Exchange.glb",
  emailIcon:               "/models/Professional_Emailmessage_Icon.glb",
  teamWorkflow:            "/models/Team_workflow_symbol.glb",
  abstractInnovation:      "/models/Abstract_geometric_innovation_symbol.glb",
  futuristicLightbulb:     "/models/Futuristic_Lightbulb.glb",
};

// ─────────────────────────────────────────────────────────────
// HERO ORBIT — 8 models, AI-first ordering
// ─────────────────────────────────────────────────────────────
const ORBIT_MODELS = [
  { url: M.futuristicAIBrain,       radius: 2.8, speed: 0.28, angleOffset: 0,                   modelScale: 0.30, yAmplitude: 0.40 },
  { url: M.neuralNetworkNodes,      radius: 2.3, speed: 0.38, angleOffset: Math.PI / 4,          modelScale: 0.27, yAmplitude: 0.50 },
  { url: M.intelligentCircuitry,    radius: 3.2, speed: 0.20, angleOffset: Math.PI / 2,          modelScale: 0.26, yAmplitude: 0.35 },
  { url: M.abstractAIProcessor,     radius: 2.5, speed: 0.32, angleOffset: (Math.PI * 3) / 4,   modelScale: 0.29, yAmplitude: 0.45 },
  { url: M.workflowPipeline,        radius: 3.0, speed: 0.24, angleOffset: Math.PI,              modelScale: 0.25, yAmplitude: 0.38 },
  { url: M.databaseCylinder,        radius: 2.2, speed: 0.42, angleOffset: (Math.PI * 5) / 4,   modelScale: 0.28, yAmplitude: 0.55 },
  { url: M.serverStack,             radius: 3.4, speed: 0.18, angleOffset: (Math.PI * 3) / 2,   modelScale: 0.24, yAmplitude: 0.32 },
  { url: M.cloudSync,               radius: 2.6, speed: 0.35, angleOffset: (Math.PI * 7) / 4,   modelScale: 0.26, yAmplitude: 0.42 },
];

// Preload hero models
ORBIT_MODELS.forEach((m) => useGLTF.preload(m.url));
useGLTF.preload("/models/Avatar.glb");

// Preload section models (lazy but early)
[
  M.codeBrackets, M.apiNodes, M.frontendComponentLayers,
  M.browserAutomation, M.systemOrchestration,
  M.interactiveAnalytics, M.dataVizGraphs, M.secureDoc,
  M.emailIcon, M.teamWorkflow,
  M.abstractInnovation, M.futuristicLightbulb,
  M.aiCore, M.aiBrain,
].forEach((url) => useGLTF.preload(url));

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────
function FloatingIconSlot(props) {
  return (
    <ErrorBoundary
      fallback={<ModelFallback scale={0.12} color="#00d4ff" />}
      onError={(err) => {
        if (import.meta.env.DEV) {
          console.warn("[3D] Orbit model failed to load:", props.url, err?.message ?? err);
        }
      }}
    >
      <Suspense fallback={<ModelFallback scale={0.12} color="#00d4ff" />}>
        <FloatingModel {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

function ModelFallback({ position = [0, 0, 0], scale = 0.35, color = "#ff00ff" }) {
  return (
    <mesh position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial wireframe color={color} />
    </mesh>
  );
}

/** Placeholder while mini canvas is off-screen (avoids white “broken” GL areas). */
function MiniCanvasSlot() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(145deg, rgba(3,3,12,0.92) 0%, rgba(15,15,35,0.75) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      aria-hidden
    />
  );
}

/** Tiny inline 3-D mesh — clone so the same GLB can render in many WebGL contexts safely. */
function MiniModel({ url, scale = 1.2 }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  return <primitive object={cloned} scale={[scale, scale, scale]} />;
}

/**
 * Each instance gets its own WebGL context — browsers cap ~8–16. Mount only when near the viewport
 * so we do not exhaust contexts (which shows as solid white / broken rendering).
 */
function MiniModelCanvas({ url, height = 120, scale = 1.2, className = "", lazy = true }) {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { root: null, rootMargin: "120px", threshold: 0.02 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [lazy]);

  return (
    <ErrorBoundary fallback={<MiniCanvasSlot />}>
      <div ref={wrapRef} style={{ height, width: "100%" }} className={`relative ${className}`}>
        {active ? (
          <Canvas
            className="absolute inset-0 touch-none bg-transparent"
            camera={{ position: [0, 0, 3.5], fov: 45 }}
            dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1)]}
            gl={{ alpha: true, antialias: true, stencil: false, depth: true }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <ambientLight intensity={0.85} color="#a8b4ff" />
            <directionalLight position={[2, 3, 3]} intensity={2.2} />
            <directionalLight position={[-2, -1, -2]} intensity={0.5} color="#4c1d95" />
            <pointLight position={[-2, 1, 1]} intensity={1.2} color="#00d4ff" />
            <Suspense fallback={<ModelFallback scale={0.4} color="#7c3aed" />}>
              <MiniModel url={url} scale={scale} />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={3}
            />
          </Canvas>
        ) : (
          <MiniCanvasSlot />
        )}
      </div>
    </ErrorBoundary>
  );
}

// Scroll-reveal hook
function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const THEME = {
  cyan:   { border: "var(--border-cyan)",   badge: "badge",        glow: "rgba(0,212,255,0.12)" },
  violet: { border: "var(--border-violet)", badge: "badge-violet", glow: "rgba(124,58,237,0.12)" },
  amber:  { border: "rgba(240,165,0,0.2)",  badge: "badge-amber",  glow: "rgba(240,165,0,0.10)" },
};
const ACCENT = { cyan: "#00d4ff", violet: "#a78bfa", amber: "#fbbf24" };

// Models mapped to skill categories (shown as section eye-candy)
const CATEGORY_MODELS = {
  "AI / ML":    { url: M.abstractAIProcessor, scale: 1.1 },
  "Frontend":   { url: M.frontendComponentLayers, scale: 1.0 },
  "Backend":    { url: M.apiNodes, scale: 1.1 },
  "Database":   { url: M.databaseCylinder, scale: 1.1 },
  "Automation": { url: M.workflowPipeline, scale: 1.0 },
  "DevOps":     { url: M.cloudSync, scale: 1.0 },
};

// Models mapped to AI capabilities
const AI_CAP_MODELS = [
  M.aiCore,
  M.secureDoc,
  M.browserAutomation,
  M.systemOrchestration,
  M.interactiveAnalytics,
  M.dataVizGraphs,
];

// ═══════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Bottom divider */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px z-0"
        style={{ background: "linear-gradient(90deg, transparent, var(--cyan), transparent)", opacity: 0.3 }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-8 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4 w-full min-h-[calc(100vh-80px)]">

          {/* ── TEXT ── */}
          <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 pb-10 lg:pb-0 w-full">
            <div
              className="section-label mb-4 sm:mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all .7s ease" }}
            >
              {hero.tagline}
            </div>

            <h1
              className="hero-title mb-4 sm:mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(30px)", transition: "all .7s ease .1s" }}
            >
              {hero.headline[0]}
              <br />
              <span className="gradient-text">{hero.headline[1]}</span>
            </h1>

            <p
              className="section-subtitle mb-6 sm:mb-8 max-w-xl"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all .7s ease .2s" }}
            >
              {hero.description}
            </p>

            <div
              className="flex flex-wrap gap-2 mb-8 sm:mb-10"
              style={{ opacity: mounted ? 1 : 0, transition: "all .7s ease .3s" }}
            >
              {hero.specializations.map((s) => (
                <span key={s} className="skill-tag text-xs sm:text-sm">{s}</span>
              ))}
            </div>

            <div
              className="flex flex-wrap gap-3 sm:gap-4"
              style={{ opacity: mounted ? 1 : 0, transition: "all .7s ease .4s" }}
            >
              <button
                className="btn-primary text-xs sm:text-sm px-6 sm:px-8 py-3"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>View Projects</span>
              </button>
              <button
                className="btn-outline text-xs sm:text-sm px-6 sm:px-8 py-3"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Let's Collaborate
              </button>
            </div>
          </div>

          {/* ── 3-D CANVAS ── */}
          <div
            className="order-1 lg:order-2 w-full lg:flex-1 relative"
            style={{
              height: "clamp(320px, 48vw, 680px)",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease .5s",
            }}
          >
            {/* Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              {[500, 380, 260].map((size, i) => (
                <div
                  key={size}
                  className="absolute rounded-full"
                  style={{
                    width: size, height: size,
                    border: `1px dashed ${i % 2 === 0 ? "rgba(0,212,255,0.13)" : "rgba(124,58,237,0.10)"}`,
                    animation: `spin ${25 + i * 8}s linear ${i % 2 === 0 ? "" : "reverse"} infinite`,
                  }}
                />
              ))}
              <div className="absolute rounded-full" style={{ width: 520, height: 520, background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)" }} />
            </div>

            <Canvas
              className="absolute inset-0 z-10 h-full w-full bg-transparent"
              shadows
              camera={{ position: [0, 0, 6.5], fov: 55 }}
              dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1)]}
              gl={{ alpha: true, antialias: true, stencil: false, depth: true }}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
              }}
            >
              <ambientLight intensity={0.6} color="#8090ff" />
              <directionalLight position={[3, 5, 4]} intensity={1.8} />
              <pointLight position={[-4, 2, 1]} intensity={1.5} color="#00d4ff" />
              <pointLight position={[4, -2, -1]} intensity={1.0} color="#7c3aed" />
              <ErrorBoundary
                fallback={<ModelFallback scale={1.2} color="#00d4ff" />}
                onError={(err) => {
                  if (import.meta.env.DEV) {
                    console.warn("[3D] Avatar failed to load (/models/Avatar.glb):", err?.message ?? err);
                  }
                }}
              >
                <Suspense fallback={<ModelFallback scale={1.2} color="#00d4ff" />}>
                  <Avatar scale={[2, 2, 2]} position={[0, -1.2, 0]} rotation={[0, -0.5, 0]} />
                </Suspense>
              </ErrorBoundary>
              {ORBIT_MODELS.map((m, i) => (
                <FloatingIconSlot key={i} {...m} />
              ))}
            </Canvas>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: mounted ? 0.5 : 0, transition: "opacity 1s ease 1.5s" }}
        >
          <span className="text-xs font-oxanium tracking-widest" style={{ color: "var(--text-muted)" }}>SCROLL</span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, var(--cyan), transparent)" }} />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2 — ABOUT
// ═══════════════════════════════════════════════════════════════
function AboutSection() {
  const [ref, visible] = useFadeIn(0.08);

  const highlights = [
    { value: "4+",  label: "AI Projects Built"        },
    { value: "8+",  label: "Platforms Automated"       },
    { value: "95%", label: "OCR Extraction Accuracy"   },
    { value: "2–5s", label: "Document Processing Time" },
  ];

  return (
    <section id="about" ref={ref} className="relative w-full">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all .8s ease" }}>
            <p className="section-label">Who I Am</p>
            <h2 className="section-title">
              Engineering at the<br />
              <span className="gradient-text">Intersection of AI</span><br />
              and Full-Stack
            </h2>
            <p className="section-subtitle mb-6">
              AI Systems Developer & Full-Stack Engineer with hands-on experience building OCR pipelines, LLM-powered agents, and enterprise automation workflows.
            </p>
            <p className="section-subtitle mb-8" style={{ color: "var(--text-muted)" }}>
              My background spans a Lifewood AI Systems internship — shipping real production AI tooling — and BPO communication experience that sharpened systematic problem-solving.
            </p>
            <div className="flex flex-wrap gap-2">
              {["AI Systems","OCR Automation","LLM Integration","Enterprise Workflows","Full-Stack Architecture","Browser Orchestration"].map((s) => (
                <span key={s} className="skill-tag text-xs">{s}</span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            className="grid grid-cols-2 gap-3 sm:gap-4"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all .8s ease .15s" }}
          >
            {highlights.map((h) => (
              <div key={h.label} className="glass-card p-4 sm:p-6 text-center hover:border-brand-cyan transition-all duration-300">
                <div className="font-oxanium font-bold mb-1 gradient-text" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)" }}>
                  {h.value}
                </div>
                <div className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>{h.label}</div>
              </div>
            ))}

            {/* 3-D model eye-candy */}
            <div className="glass-card col-span-2 overflow-hidden" style={{ borderLeft: "3px solid var(--cyan)" }}>
              <div className="flex flex-col sm:flex-row items-center gap-0">
                <div className="w-full sm:w-40 shrink-0">
                  <MiniModelCanvas url={M.aiBrain} height={130} scale={1.0} />
                </div>
                <div className="p-5">
                  <p className="font-oxanium text-sm mb-2" style={{ color: "var(--cyan)" }}>Engineering Philosophy</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    "Don't just automate tasks — build systems that think. Every pipeline I design is architected to be observable, recoverable, and intelligent at every layer."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — TECH STACK (with per-category 3D models)
// ═══════════════════════════════════════════════════════════════
function TechStackSection() {
  const [ref, visible] = useFadeIn(0.08);
  const categories = Object.entries(skills);

  return (
    <section id="stack" ref={ref} className="relative w-full">
      <div className="h-px w-full max-w-5xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--border-cyan), transparent)" }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="text-center mb-12 sm:mb-16" style={{ opacity: visible ? 1 : 0, transition: "all .8s ease" }}>
          <p className="section-label justify-center">Technical Depth</p>
          <h2 className="section-title">Full-Spectrum <span className="gradient-text">Tech Stack</span></h2>
          <p className="section-subtitle mx-auto text-center">
            From AI model orchestration to production deployments — a complete engineering toolkit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {categories.map(([cat, techList], ci) => {
            const accent = categoryAccent[cat] || "cyan";
            const color  = ACCENT[accent];
            const catModel = CATEGORY_MODELS[cat];
            return (
              <div
                key={cat}
                className="tech-card flex flex-col"
                style={{
                  opacity:   visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(24px)",
                  transition: `all .7s ease ${ci * 0.08}s`,
                }}
              >
                {/* Mini model viewer */}
                {catModel && (
                  <div className="rounded-xl overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <MiniModelCanvas url={catModel.url} height={110} scale={catModel.scale} />
                  </div>
                )}

                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                  <span className="font-oxanium font-semibold text-sm tracking-wide" style={{ color }}>{cat}</span>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech) => (
                    <span
                      key={tech}
                      className={`skill-tag text-xs${accent === "violet" ? " skill-tag-violet" : accent === "amber" ? " skill-tag-amber" : ""}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4 — PROJECTS
// ═══════════════════════════════════════════════════════════════
function ProjectsSection() {
  const [ref, visible] = useFadeIn(0.06);
  const tier1 = projects.filter((p) => p.tier === 1);
  const tier2 = projects.filter((p) => p.tier === 2);

  return (
    <section id="projects" ref={ref} className="relative w-full">
      <div className="h-px w-full max-w-5xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--border-cyan), transparent)" }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16"
          style={{ opacity: visible ? 1 : 0, transition: "all .8s ease" }}
        >
          <div>
            <p className="section-label">Engineering Showcase</p>
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          </div>
          <Link to="/projects" className="btn-outline text-xs sm:text-sm self-start sm:self-auto whitespace-nowrap px-5 py-2.5">
            All Projects →
          </Link>
        </div>

        {/* Tier 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {tier1.map((p, i) => {
            const theme = THEME[p.theme] || THEME.cyan;
            const color = ACCENT[p.theme];
            return (
              <div
                key={p.id}
                className="project-card"
                style={{
                  border: `1px solid ${theme.border}`,
                  opacity:   visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(30px)",
                  transition: `all .8s ease ${i * 0.1}s`,
                }}
              >
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div className="p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className={`${theme.badge} text-xs mb-2 inline-block`}>Tier 1 · Featured</span>
                      <h3 className="font-oxanium font-bold text-lg sm:text-xl" style={{ color: "var(--text-primary)" }}>{p.name}</h3>
                      <p className="text-xs mt-1" style={{ color }}>{p.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm mb-5" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{p.description}</p>

                  {p.metrics && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.metrics.map((m) => (
                        <span key={m} className="text-xs px-3 py-1 rounded-full font-oxanium"
                          style={{
                            background: `rgba(${p.theme === "violet" ? "124,58,237" : p.theme === "amber" ? "240,165,0" : "0,212,255"},0.08)`,
                            border: `1px solid ${theme.border}`,
                            color,
                          }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  {p.challenges?.[0] && (
                    <div className="p-3 rounded-lg mb-5 text-xs"
                      style={{ background: "rgba(255,255,255,0.03)", borderLeft: `2px solid ${color}`, color: "var(--text-secondary)" }}>
                      <span className="font-oxanium font-semibold" style={{ color }}>Challenge: </span>
                      {p.challenges[0]}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.stack.map((s) => <span key={s} className={theme.badge}>{s}</span>)}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs px-4 py-2">GitHub →</a>
                    {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs px-4 py-2"><span>Live Demo</span></a>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tier2.map((p, i) => {
            const theme = THEME[p.theme] || THEME.cyan;
            const color = ACCENT[p.theme];
            return (
              <div
                key={p.id}
                className="project-card-sm"
                style={{
                  border: `1px solid ${theme.border}`,
                  opacity:   visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(20px)",
                  transition: `all .7s ease ${0.4 + i * 0.07}s`,
                }}
              >
                <div className="h-0.5 w-8 rounded-full mb-4" style={{ background: color }} />
                <h4 className="font-oxanium font-semibold text-sm mb-2">{p.name}</h4>
                <p className="text-xs mb-4" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.stack.map((s) => <span key={s} className={`${theme.badge} text-xs`}>{s}</span>)}
                </div>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-oxanium font-semibold hover:opacity-80 transition-opacity" style={{ color }}>
                  GitHub →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5 — AI & AUTOMATION (each card has a 3D model)
// ═══════════════════════════════════════════════════════════════
function AISection() {
  const [ref, visible] = useFadeIn(0.06);

  const pipelineNodes = [
    { label: "Raw Docs / Web",   color: "#475569" },
    { label: "OCR / Scraper",    color: "#00d4ff" },
    { label: "LLM Extraction",   color: "#7c3aed" },
    { label: "FastAPI Pipeline", color: "#00d4ff" },
    { label: "DB / Dashboard",   color: "#f0a500" },
  ];

  return (
    <section id="ai" ref={ref} className="relative w-full">
      <div className="h-px w-full max-w-5xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--border-violet), transparent)" }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="text-center mb-12 sm:mb-14" style={{ opacity: visible ? 1 : 0, transition: "all .8s ease" }}>
          <p className="section-label justify-center" style={{ color: "#a78bfa" }}>What Sets Me Apart</p>
          <h2 className="section-title">
            AI & Automation{" "}
            <span style={{ background: "linear-gradient(135deg, #7c3aed, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Capabilities
            </span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Most developers build apps. I build intelligent systems that automate, reason, and scale.
          </p>
        </div>

        {/* Architecture pipeline — scrolls horizontally on small screens */}
        <div
          className="glass-card-violet rounded-xl p-4 sm:p-6 mb-10 overflow-x-auto"
          style={{ opacity: visible ? 1 : 0, transition: "all .8s ease .1s" }}
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {pipelineNodes.map((node, i, arr) => (
              <div key={node.label} className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div
                  className="px-2 sm:px-3 py-2 rounded-lg text-xs font-oxanium font-semibold whitespace-nowrap"
                  style={{
                    background: `rgba(${node.color === "#00d4ff" ? "0,212,255" : node.color === "#7c3aed" ? "124,58,237" : node.color === "#f0a500" ? "240,165,0" : "71,85,105"},0.12)`,
                    border: `1px solid ${node.color}30`,
                    color: node.color,
                  }}
                >
                  {node.label}
                </div>
                {i < arr.length - 1 && <span className="text-slate-600 text-base sm:text-lg">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Capability cards — each has a 3D model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {aiCapabilities.map((cap, i) => (
            <div
              key={cap.title}
              className="ai-card flex flex-col"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                transition: `all .7s ease ${0.15 + i * 0.08}s`,
              }}
            >
              {/* 3D model per capability */}
              <div className="rounded-xl overflow-hidden mb-4" style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.12)" }}>
                <MiniModelCanvas url={AI_CAP_MODELS[i] || M.aiCore} height={130} scale={1.1} />
              </div>

              <div className="text-2xl sm:text-3xl mb-3">{cap.icon}</div>
              <h3 className="font-oxanium font-semibold text-sm sm:text-base mb-3" style={{ color: "var(--text-primary)" }}>
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm mb-5" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{cap.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {cap.tags.map((t) => <span key={t} className="skill-tag skill-tag-violet text-xs">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6 — EXPERIENCE
// ═══════════════════════════════════════════════════════════════
function ExperienceSection() {
  const [ref, visible] = useFadeIn(0.06);

  return (
    <section id="experience" ref={ref} className="relative w-full">
      <div className="h-px w-full max-w-5xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--border-cyan), transparent)" }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="text-center mb-12 sm:mb-14" style={{ opacity: visible ? 1 : 0, transition: "all .8s ease" }}>
          <p className="section-label justify-center">Career Journey</p>
          <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transition: "all .8s ease .1s" }}>
          <VerticalTimeline lineColor="rgba(0,212,255,0.15)">
            {experiences.map((exp) => (
              <VerticalTimelineElement
                key={exp.company}
                date={exp.date}
                iconStyle={{
                  background: exp.iconBg,
                  border: `1px solid ${exp.iconColor}40`,
                  boxShadow: `0 0 20px ${exp.iconColor}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem",
                }}
                icon={<span>{exp.iconEmoji}</span>}
              >
                <div>
                  <h3 className="font-oxanium font-semibold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm mb-4 mt-1" style={{ color: exp.iconColor, fontFamily: "'Oxanium', monospace" }}>
                    {exp.company}
                  </p>
                  <ul className="space-y-2">
                    {exp.points.map((point, pi) => (
                      <li key={pi} className="text-xs sm:text-sm flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: exp.iconColor, marginTop: 2, flexShrink: 0 }}>▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 7 — INNOVATION SHOWCASE (new 3D model display)
// ═══════════════════════════════════════════════════════════════
function InnovationSection() {
  const [ref, visible] = useFadeIn(0.1);

  const innovationItems = [
    {
      url: M.abstractInnovation,
      label: "Abstract Innovation",
      desc: "Conceptual problem-solving with geometric precision",
      color: "cyan",
    },
    {
      url: M.futuristicLightbulb,
      label: "Futuristic Thinking",
      desc: "Forward-looking design with modern AI principles",
      color: "violet",
    },
    {
      url: M.teamWorkflow,
      label: "Collaborative Systems",
      desc: "Building tools that amplify team productivity",
      color: "amber",
    },
    {
      url: M.emailIcon,
      label: "Communication Layer",
      desc: "Intelligent messaging and notification pipelines",
      color: "cyan",
    },
  ];

  return (
    <section id="innovation" ref={ref} className="relative w-full">
      <div className="h-px w-full max-w-5xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--border-violet), transparent)" }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-28">
        <div className="text-center mb-12" style={{ opacity: visible ? 1 : 0, transition: "all .8s ease" }}>
          <p className="section-label justify-center">Design & Vision</p>
          <h2 className="section-title">
            Innovation <span className="gradient-text">Philosophy</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            The principles behind every system I architect — intelligent, collaborative, and human-centred.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          style={{ opacity: visible ? 1 : 0, transition: "all .8s ease .1s" }}>
          {innovationItems.map((item, i) => {
            const color = ACCENT[item.color];
            return (
              <div
                key={item.label}
                className="glass-card flex flex-col overflow-hidden"
                style={{
                  transition: `all .7s ease ${i * 0.09}s`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(24px)",
                }}
              >
                <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div style={{ background: "rgba(255,255,255,0.02)" }}>
                  <MiniModelCanvas url={item.url} height={140} scale={1.1} />
                </div>
                <div className="p-5">
                  <p className="font-oxanium font-semibold text-sm mb-2" style={{ color }}>{item.label}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 8 — RESUME & LINKS
// ═══════════════════════════════════════════════════════════════
function ResumeSection() {
  const [ref, visible] = useFadeIn(0.1);

  const links = [
    { icon: "📄", title: "Download Resume", subtitle: "Updated May 2026", href: "C:\\Users\\genpr\\Documents\\Professional Documents\\Resume_Nillama_2026.pdf", accent: "cyan" },
    { icon: "⌨️", title: "GitHub Profile",  subtitle: "github.com/FrancisGarryNillama", href: socialLinks.find((s) => s.name === "GitHub")?.url || "#", accent: "cyan" },
    { icon: "💼", title: "LinkedIn",         subtitle: "Connect professionally", href: socialLinks.find((s) => s.name === "LinkedIn")?.url || "#", accent: "violet" },
  ];

  return (
    <section id="resume" className="relative w-full">
      <div className="h-px w-full max-w-5xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--border-cyan), transparent)" }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20" ref={ref}>
        <div className="text-center mb-10" style={{ opacity: visible ? 1 : 0, transition: "all .8s ease" }}>
          <p className="section-label justify-center">Downloads & Links</p>
          <h2 className="section-title">Resume & <span className="gradient-text">Profiles</span></h2>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          style={{ opacity: visible ? 1 : 0, transition: "all .8s ease .1s" }}
        >
          {links.map((l) => (
            <a
              key={l.title}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="download-card flex-col text-center"
              style={{ justifyContent: "center" }}
            >
              <span className="text-2xl sm:text-3xl mb-2">{l.icon}</span>
              <span className="font-oxanium font-semibold text-xs sm:text-sm" style={{ color: "var(--text-primary)" }}>{l.title}</span>
              <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{l.subtitle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 9 — CONTACT CTA (with 3D email/team models)
// ═══════════════════════════════════════════════════════════════
function ContactSection() {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <section id="contact" ref={ref} className="relative w-full">
      <div className="h-px w-full max-w-5xl mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--border-violet), transparent)" }} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pb-0 pt-8 sm:pt-12">
        <div
          className="glass-card-violet rounded-2xl relative overflow-hidden"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "none" : "translateY(30px)",
            transition: "all .9s ease",
          }}
        >
          {/* Glow backdrop */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(124,58,237,0.15) 0%, transparent 65%)" }} />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="scan-line" style={{ opacity: 0.25 }} />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left model */}
            <div className="hidden lg:flex items-center justify-center overflow-hidden min-h-0"
              style={{ background: "rgba(0,212,255,0.03)", borderRight: "1px solid var(--border-cyan)" }}>
              <MiniModelCanvas url={M.emailIcon} height={220} scale={1.2} />
            </div>

            {/* Center text */}
            <div className="p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center justify-center">
              <p className="section-label justify-center mb-4" style={{ color: "#a78bfa" }}>Open to Opportunities</p>
              <h2 className="section-title mb-4">
                Interested in <span className="gradient-text">AI Systems</span>,<br />
                Automation, or Scalable Engineering?
              </h2>
              <p className="section-subtitle mx-auto text-center mb-8">
                Let's connect and build something intelligent together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <a
                  href={`mailto:${socialLinks.find((s) => s.name === "Email")?.url?.replace("mailto:", "") || "your@email.com"}`}
                  className="btn-primary px-8 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm w-full sm:w-auto"
                >
                  <span>Send a Message</span>
                </a>
                <Link to="/contact" className="btn-outline px-8 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm w-full sm:w-auto">
                  Full Contact Page
                </Link>
              </div>
              <div className="flex items-center justify-center gap-5 mt-8">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="font-oxanium text-xs font-semibold transition-colors duration-200 hover:opacity-80"
                    style={{ color: "var(--text-muted)" }}>
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right model */}
            <div className="hidden lg:flex items-center justify-center overflow-hidden min-h-0"
              style={{ background: "rgba(124,58,237,0.03)", borderLeft: "1px solid var(--border-violet)" }}>
              <MiniModelCanvas url={M.teamWorkflow} height={220} scale={1.2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN HOME
// ═══════════════════════════════════════════════════════════════
const Home = () => (
  <main className="w-full overflow-x-hidden">
    <HeroSection />
    <AboutSection />
    <TechStackSection />
    <ProjectsSection />
    <AISection />
    <ExperienceSection />
    <InnovationSection />
    <ResumeSection />
    <ContactSection />
    <Footer />
  </main>
);

export default Home;
