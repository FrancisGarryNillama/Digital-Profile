import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SITE_URL = "https://digital-profile-rouge.vercel.app";

const DEFAULT = {
  title: "Francis Garry Nillama | AI Solutions Engineer · Agents, LLMs & Automation",
  description:
    "Francis Garry Nillama, AI Solutions Engineer in Cebu, Philippines: AI agents on the Claude Agent SDK, Claude/OpenAI integrations, RAG and Python automation, shipped end to end with Next.js, TypeScript and Supabase/PostgreSQL.",
};

const ROUTES = {
  "/": DEFAULT,
  "/projects": {
    title: "Projects | Francis Garry Nillama",
    description:
      "AI solutions showcase: agentic IT remediation on the Claude Agent SDK, an LLM expense-intelligence agent, OCR document intelligence, plus the full-stack platforms (HRIS, property management, a predictive dialer) that ship them.",
  },
  "/contact": {
    title: "Contact | Francis Garry Nillama",
    description:
      "Get in touch with Francis Garry Nillama about AI solutions engineering, LLM integration, automation or full-stack roles. Open to remote work, onsite work and relocation.",
  },
};

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Keeps <title>, description, canonical and OG tags in sync with the current route. */
export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const meta = ROUTES[path];
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = meta ? meta.title : `Page not found | Francis Garry Nillama`;
    upsertMeta("name", "description", (meta || DEFAULT).description);
    upsertMeta("name", "robots", meta ? "index, follow, max-image-preview:large" : "noindex, follow");
    upsertMeta("property", "og:title", (meta || DEFAULT).title);
    upsertMeta("property", "og:description", (meta || DEFAULT).description);
    upsertMeta("property", "og:url", url);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  return null;
}
