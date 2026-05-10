import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Link } from "react-router-dom";

import { Avatar, FloatingModel } from "../models";
import { Footer } from "../components";
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
// 3D HERO CONFIG  — 6 models orbiting the avatar
// ─────────────────────────────────────────────────────────────
const ORBIT_MODELS = [
  { url: "/src/assets/3d models/Neural_Network.glb",     radius: 2.5, speed: 0.30, angleOffset: 0,                     modelScale: 0.32, yAmplitude: 0.45 },
  { url: "/src/assets/3d models/Circuit_Microchip.glb",  radius: 3.1, speed: 0.22, angleOffset: Math.PI / 3,            modelScale: 0.28, yAmplitude: 0.35 },
  { url: "/src/assets/3d models/Server_Stack.glb",       radius: 2.3, speed: 0.38, angleOffset: (Math.PI * 2) / 3,     modelScale: 0.26, yAmplitude: 0.55 },
  { url: "/src/assets/3d models/Database.glb",           radius: 3.3, speed: 0.18, angleOffset: Math.PI,                modelScale: 0.30, yAmplitude: 0.40 },
  { url: "/src/assets/3d models/Data_Flow_Pipeline.glb", radius: 2.7, speed: 0.28, angleOffset: (Math.PI * 4) / 3,     modelScale: 0.24, yAmplitude: 0.30 },
  { url: "/src/assets/3d models/Energy_Core.glb",        radius: 2.1, speed: 0.42, angleOffset: (Math.PI * 5) / 3,     modelScale: 0.34, yAmplitude: 0.50 },
];

// Preload to reduce jank
ORBIT_MODELS.forEach((m) => useGLTF.preload(m.url));
useGLTF.preload("/src/assets/3d models/avatar.glb");

// Suspense-isolated slot so one bad GLB doesn't kill the scene
function FloatingIconSlot(props) {
  return (
    <Suspense fallback={null}>
      <FloatingModel {...props} />
    </Suspense>
  );
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
const THEME = {
  cyan:   { border: "var(--border-cyan)",          badgeClass: "badge",        glow: "rgba(0,212,255,0.12)"  },
  violet: { border: "var(--border-violet)",        badgeClass: "badge-violet", glow: "rgba(124,58,237,0.12)" },
  amber:  { border: "rgba(240,165,0,0.2)",         badgeClass: "badge-amber",  glow: "rgba(240,165,0,0.10)"  },
};

const ACCENT_COLOR = {
  cyan:   "#00d4ff",
  violet: "#a78bfa",
  amber:  "#fbbf24",
};

// Scroll-reveal hook
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════
function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Decorative grid lines */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--cyan), transparent)", opacity: 0.3 }}
        />
      </div>

      <div className="section-container !pt-32 !pb-0 w-full z-10">
        <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-8 min-h-[calc(100vh-80px)]">

          {/* ── Left: Text Content ── */}
          <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 pb-12 lg:pb-0">
            {/* Label */}
            <div
              className="section-label mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}
            >
              {hero.tagline}
            </div>

            {/* Headline */}
            <h1
              className="hero-title mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(30px)", transition: "all 0.7s ease 0.1s" }}
            >
              {hero.headline[0]}
              <br />
              <span className="gradient-text">{hero.headline[1]}</span>
            </h1>

            {/* Description */}
            <p
              className="section-subtitle mb-8"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.2s" }}
            >
              {hero.description}
            </p>

            {/* Specialization pills */}
            <div
              className="flex flex-wrap gap-2 mb-10"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.7s ease 0.3s" }}
            >
              {hero.specializations.map((s) => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4"
              style={{ opacity: mounted ? 1 : 0, transition: "all 0.7s ease 0.4s" }}
            >
              <button
                className="btn-primary"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>View Projects</span>
              </button>
              <button
                className="btn-outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Let's Collaborate
              </button>
            </div>
          </div>

          {/* ── Right: 3D Canvas ── */}
          <div
            className="flex-1 order-1 lg:order-2 w-full"
            style={{
              height: "clamp(400px, 55vh, 650px)",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
              position: "relative",
            }}
          >
            {/* Glow rings behind canvas */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <div
                style={{
                  width: 380, height: 380,
                  borderRadius: "50%",
                  border: "1px dashed rgba(0,212,255,0.15)",
                  animation: "spin 40s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 260, height: 260,
                  borderRadius: "50%",
                  border: "1px dashed rgba(124,58,237,0.12)",
                  animation: "spin 25s linear infinite reverse",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 500, height: 500,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
                }}
              />
            </div>

            <Canvas
              camera={{ position: [0, 0, 6.5], fov: 55 }}
              style={{ position: "relative", zIndex: 1 }}
            >
              {/* Lighting */}
              <ambientLight intensity={0.6} color="#8090ff" />
              <directionalLight position={[3, 5, 4]} intensity={1.8} color="#ffffff" />
              <pointLight position={[-4, 2, 1]}   intensity={1.5} color="#00d4ff" />
              <pointLight position={[4,  -2, -1]} intensity={1.0} color="#7c3aed" />
              <pointLight position={[0,  -3, 3]}  intensity={0.6} color="#ffffff" />

              {/* Avatar */}
              <Suspense fallback={null}>
                <Avatar 
                  scale={[2, 2, 2]} 
                  position={[0, -1.2, 0]} 
                  rotation={[0, -0.5, 0]} 
                />
              </Suspense>

              {/* Orbiting icons */}
              {ORBIT_MODELS.map((m, i) => (
                <FloatingIconSlot key={i} {...m} />
              ))}
            </Canvas>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: mounted ? 0.5 : 0, transition: "opacity 1s ease 1.5s" }}
        >
          <span className="text-xs font-oxanium tracking-widest" style={{ color: "var(--text-muted)" }}>
            SCROLL
          </span>
          <div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, var(--cyan), transparent)", animation: "fadeIn 2s ease infinite" }}
          />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2 — ABOUT
// ═══════════════════════════════════════════════════════════════
function AboutSection() {
  const [ref, visible] = useFadeIn(0.1);

  const highlights = [
    { value: "4+",  label: "AI Projects Built"         },
    { value: "8+",  label: "Platforms Automated"        },
    { value: "95%", label: "OCR Extraction Accuracy"    },
    { value: "2–5s", label: "Document Processing Time" },
  ];

  return (
    <section id="about" ref={ref} className="relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
            <p className="section-label">Who I Am</p>
            <h2 className="section-title">
              Engineering at the<br />
              <span className="gradient-text">Intersection of AI</span><br />
              and Full-Stack
            </h2>
            <p className="section-subtitle mb-6">
              I'm an AI Systems Developer and Full-Stack Engineer with hands-on experience building
              OCR pipelines, LLM-powered agents, and enterprise automation workflows.
            </p>
            <p className="section-subtitle mb-8" style={{ color: "var(--text-muted)" }}>
              My background spans a Lifewood AI Systems internship — where I shipped real production
              AI tooling — and BPO communication experience that sharpened my systematic approach
              to complex problem-solving.
            </p>

            {/* Specialization pills */}
            <div className="flex flex-wrap gap-2">
              {["AI Systems", "OCR Automation", "LLM Integration", "Enterprise Workflows", "Full-Stack Architecture", "Browser Orchestration"].map((s) => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>

          {/* Right: stats */}
          <div
            className="grid grid-cols-2 gap-4"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease 0.15s" }}
          >
            {highlights.map((h) => (
              <div key={h.label} className="glass-card p-6 text-center hover:border-brand-cyan transition-all duration-300">
                <div
                  className="font-oxanium font-bold mb-2 gradient-text"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                >
                  {h.value}
                </div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {h.label}
                </div>
              </div>
            ))}

            {/* Philosophy card */}
            <div
              className="glass-card-violet p-6 col-span-2"
              style={{ borderLeft: "3px solid var(--violet)" }}
            >
              <p className="font-oxanium text-sm mb-2" style={{ color: "#a78bfa" }}>
                Engineering Philosophy
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                "Don't just automate tasks — build systems that think. Every pipeline I design
                is architected to be observable, recoverable, and intelligent at every layer."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — TECH STACK
// ═══════════════════════════════════════════════════════════════
function TechStackSection() {
  const [ref, visible] = useFadeIn(0.1);
  const categories = Object.entries(skills);

  return (
    <section id="stack" ref={ref} className="relative">
      {/* Divider */}
      <div className="h-px mx-auto max-w-5xl" style={{ background: "linear-gradient(90deg, transparent, var(--border-cyan), transparent)" }} />

      <div className="section-container">
        <div className="text-center mb-14" style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease" }}>
          <p className="section-label justify-center">Technical Depth</p>
          <h2 className="section-title">
            Full-Spectrum <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            From AI model orchestration to production deployments — a complete engineering toolkit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(([cat, techList], ci) => {
            const accent = categoryAccent[cat] || "cyan";
            const color  = ACCENT_COLOR[accent];
            return (
              <div
                key={cat}
                className="tech-card"
                style={{
                  opacity:   visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(24px)",
                  transition: `all 0.7s ease ${ci * 0.08}s`,
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                  />
                  <span
                    className="font-oxanium font-semibold text-sm tracking-wide"
                    style={{ color }}
                  >
                    {cat}
                  </span>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech) => (
                    <span
                      key={tech}
                      className={`skill-tag${accent === "violet" ? " skill-tag-violet" : accent === "amber" ? " skill-tag-amber" : ""}`}
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
  const [ref, visible] = useFadeIn(0.08);
  const tier1 = projects.filter((p) => p.tier === 1);
  const tier2 = projects.filter((p) => p.tier === 2);

  return (
    <section id="projects" ref={ref} className="relative">
      <div className="h-px mx-auto max-w-5xl" style={{ background: "linear-gradient(90deg, transparent, var(--border-cyan), transparent)" }} />

      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
          style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease" }}
        >
          <div>
            <p className="section-label">Engineering Showcase</p>
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="btn-outline text-sm self-start sm:self-auto whitespace-nowrap"
          >
            All Projects →
          </Link>
        </div>

        {/* Tier 1 — Hero cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {tier1.map((p, i) => {
            const theme = THEME[p.theme] || THEME.cyan;
            const color = ACCENT_COLOR[p.theme];
            return (
              <div
                key={p.id}
                className="project-card"
                style={{
                  border: `1px solid ${theme.border}`,
                  opacity:   visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(30px)",
                  transition: `all 0.8s ease ${i * 0.1}s`,
                }}
              >
                {/* Header bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />

                <div className="p-7">
                  {/* Project name */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className={`${theme.badgeClass} text-xs mb-2 inline-block`}>
                        Tier 1 · Featured
                      </span>
                      <h3 className="font-oxanium font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                        {p.name}
                      </h3>
                      <p className="text-xs mt-1" style={{ color }}>{p.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm mb-5" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {p.description}
                  </p>

                  {/* Metrics */}
                  {p.metrics && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.metrics.map((m) => (
                        <span
                          key={m}
                          className="text-xs px-3 py-1 rounded-full font-oxanium"
                          style={{
                            background: `rgba(${p.theme === "violet" ? "124,58,237" : p.theme === "amber" ? "240,165,0" : "0,212,255"},0.08)`,
                            border: `1px solid ${theme.border}`,
                            color,
                          }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Engineering challenge (first one) */}
                  {p.challenges?.[0] && (
                    <div
                      className="p-3 rounded-lg mb-5 text-xs"
                      style={{ background: "rgba(255,255,255,0.03)", borderLeft: `2px solid ${color}`, color: "var(--text-secondary)" }}
                    >
                      <span className="font-oxanium font-semibold" style={{ color }}>Challenge: </span>
                      {p.challenges[0]}
                    </div>
                  )}

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.stack.map((s) => (
                      <span key={s} className={theme.badgeClass}>{s}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-xs px-4 py-2"
                    >
                      GitHub →
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs px-4 py-2"
                      >
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier 2 — Compact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tier2.map((p, i) => {
            const theme = THEME[p.theme] || THEME.cyan;
            const color = ACCENT_COLOR[p.theme];
            return (
              <div
                key={p.id}
                className="project-card-sm"
                style={{
                  border: `1px solid ${theme.border}`,
                  opacity:   visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(20px)",
                  transition: `all 0.7s ease ${0.4 + i * 0.07}s`,
                }}
              >
                <div className="h-0.5 w-8 rounded-full mb-4" style={{ background: color }} />
                <h4 className="font-oxanium font-semibold text-sm mb-2">{p.name}</h4>
                <p className="text-xs mb-4" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.stack.map((s) => (
                    <span key={s} className={`${theme.badgeClass} text-xs`}>{s}</span>
                  ))}
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-oxanium font-semibold hover:opacity-80 transition-opacity"
                  style={{ color }}
                >
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
// SECTION 5 — AI & AUTOMATION
// ═══════════════════════════════════════════════════════════════
function AISection() {
  const [ref, visible] = useFadeIn(0.08);

  return (
    <section id="ai" ref={ref} className="relative">
      <div className="h-px mx-auto max-w-5xl" style={{ background: "linear-gradient(90deg, transparent, var(--border-violet), transparent)" }} />

      <div className="section-container">
        <div
          className="text-center mb-14"
          style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease" }}
        >
          <p className="section-label justify-center" style={{ color: "#a78bfa" }}>
            What Sets Me Apart
          </p>
          <h2 className="section-title">
            AI & Automation <span style={{ background: "linear-gradient(135deg, #7c3aed, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Capabilities</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Most developers build apps. I build intelligent systems that automate, reason, and scale.
          </p>
        </div>

        {/* Architecture diagram hint */}
        <div
          className="glass-card-violet rounded-xl p-6 mb-10 flex items-center gap-4 overflow-x-auto"
          style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.1s" }}
        >
          {[
            { label: "Raw Docs / Web",   color: "#475569" },
            { label: "OCR / Scraper",    color: "#00d4ff" },
            { label: "LLM Extraction",   color: "#7c3aed" },
            { label: "FastAPI Pipeline", color: "#00d4ff" },
            { label: "DB / Dashboard",   color: "#f0a500" },
          ].map((node, i, arr) => (
            <div key={node.label} className="flex items-center gap-3 shrink-0">
              <div
                className="px-3 py-2 rounded-lg text-xs font-oxanium font-semibold whitespace-nowrap"
                style={{
                  background: `rgba(${node.color === "#00d4ff" ? "0,212,255" : node.color === "#7c3aed" ? "124,58,237" : node.color === "#f0a500" ? "240,165,0" : "71,85,105"},0.12)`,
                  border: `1px solid ${node.color}30`,
                  color: node.color,
                }}
              >
                {node.label}
              </div>
              {i < arr.length - 1 && (
                <span className="text-slate-600 text-lg">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiCapabilities.map((cap, i) => (
            <div
              key={cap.title}
              className="ai-card"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                transition: `all 0.7s ease ${0.15 + i * 0.08}s`,
              }}
            >
              <div className="text-3xl mb-4">{cap.icon}</div>
              <h3 className="font-oxanium font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                {cap.title}
              </h3>
              <p className="text-sm mb-5" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {cap.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {cap.tags.map((t) => (
                  <span key={t} className="skill-tag skill-tag-violet text-xs">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6 — EXPERIENCE TIMELINE
// ═══════════════════════════════════════════════════════════════
function ExperienceSection() {
  const [ref, visible] = useFadeIn(0.08);

  return (
    <section id="experience" ref={ref} className="relative">
      <div className="h-px mx-auto max-w-5xl" style={{ background: "linear-gradient(90deg, transparent, var(--border-cyan), transparent)" }} />

      <div className="section-container">
        <div
          className="text-center mb-14"
          style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease" }}
        >
          <p className="section-label justify-center">Career Journey</p>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.1s" }}>
          <VerticalTimeline lineColor="rgba(0,212,255,0.15)">
            {experiences.map((exp, i) => (
              <VerticalTimelineElement
                key={exp.company}
                date={exp.date}
                iconStyle={{
                  background: exp.iconBg,
                  border: `1px solid ${exp.iconColor}40`,
                  boxShadow: `0 0 20px ${exp.iconColor}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                }}
                icon={<span>{exp.iconEmoji}</span>}
              >
                <div>
                  <h3
                    className="font-oxanium font-semibold text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {exp.title}
                  </h3>
                  <p
                    className="text-sm mb-4 mt-1"
                    style={{ color: exp.iconColor, fontFamily: "'Oxanium', monospace" }}
                  >
                    {exp.company}
                  </p>
                  <ul className="space-y-2">
                    {exp.points.map((point, pi) => (
                      <li
                        key={pi}
                        className="text-sm flex items-start gap-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
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
// SECTION 7 — RESUME & LINKS
// ═══════════════════════════════════════════════════════════════
function ResumeSection() {
  const [ref, visible] = useFadeIn(0.1);

  const links = [
    {
      icon: "📄",
      title: "Download Resume",
      subtitle: "PDF · Updated 2025",
      href: "/resume.pdf",         // TODO: replace with your resume path
      accent: "cyan",
    },
    {
      icon: "⌨️",
      title: "GitHub Profile",
      subtitle: "github.com/FrancisGarryNillama",
      href: socialLinks.find((s) => s.name === "GitHub")?.url || "#",
      accent: "cyan",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      subtitle: "Connect professionally",
      href: socialLinks.find((s) => s.name === "LinkedIn")?.url || "#",
      accent: "violet",
    },
  ];

  return (
    <section id="resume" className="relative">
      <div className="h-px mx-auto max-w-5xl" style={{ background: "linear-gradient(90deg, transparent, var(--border-cyan), transparent)" }} />

      <div className="section-container !py-16" ref={ref}>
        <div className="text-center mb-10" style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease" }}>
          <p className="section-label justify-center">Downloads & Links</p>
          <h2 className="section-title">
            Resume & <span className="gradient-text">Profiles</span>
          </h2>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          style={{ opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.1s" }}
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
              <span className="text-3xl mb-2">{l.icon}</span>
              <span className="font-oxanium font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                {l.title}
              </span>
              <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {l.subtitle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 8 — CONTACT CTA
// ═══════════════════════════════════════════════════════════════
function ContactSection() {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <section id="contact" ref={ref} className="relative">
      <div className="h-px mx-auto max-w-5xl" style={{ background: "linear-gradient(90deg, transparent, var(--border-violet), transparent)" }} />

      <div className="section-container !pb-0">
        <div
          className="glass-card-violet rounded-2xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "none" : "translateY(30px)",
            transition: "all 0.9s ease",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 120%, rgba(124,58,237,0.15) 0%, transparent 65%)",
            }}
          />

          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="scan-line" style={{ opacity: 0.3 }} />
          </div>

          <p className="section-label justify-center mb-4" style={{ color: "#a78bfa" }}>
            Open to Opportunities
          </p>

          <h2 className="section-title mb-4">
            Interested in <span className="gradient-text">AI Systems</span>,<br />
            Automation, or Scalable Engineering?
          </h2>

          <p className="section-subtitle mx-auto text-center mb-10">
            Let's connect and build something intelligent together —
            whether it's a production AI pipeline, enterprise automation,
            or a full-stack platform that needs to scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${socialLinks.find((s) => s.name === "Email")?.url?.replace("mailto:", "") || "your@email.com"}`}
              className="btn-primary px-10 py-4 text-sm"
            >
              <span>Send a Message</span>
            </a>
            <Link to="/contact" className="btn-outline px-10 py-4 text-sm">
              Full Contact Page
            </Link>
          </div>

          {/* Social row */}
          <div className="flex items-center justify-center gap-5 mt-10">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-oxanium text-xs font-semibold transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--text-muted)" }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN HOME  — assembles all sections
// ═══════════════════════════════════════════════════════════════
const Home = () => (
  <main>
    <HeroSection />
    <AboutSection />
    <TechStackSection />
    <ProjectsSection />
    <AISection />
    <ExperienceSection />
    <ResumeSection />
    <ContactSection />
    <Footer />
  </main>
);

export default Home;