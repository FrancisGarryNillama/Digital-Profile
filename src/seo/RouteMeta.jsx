import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SITE_URL = "https://digital-profile-rouge.vercel.app";

const DEFAULT = {
  title: "Francis Garry Nillama | Full-Stack Software Engineer · AI Systems",
  description:
    "Portfolio of Francis Garry Nillama, a full-stack software engineer in Cebu, Philippines. TypeScript, Next.js, React, Node and PostgreSQL with RLS, plus AI integration: Claude Agent SDK, OCR/LLM pipelines and RAG.",
};

const ROUTES = {
  "/": DEFAULT,
  "/projects": {
    title: "Projects | Francis Garry Nillama",
    description:
      "Engineering showcase: a multi-tenant predictive dialer, a company HRIS, agentic IT ticketing on the Claude Agent SDK, property management and document-intelligence pipelines.",
  },
  "/contact": {
    title: "Contact | Francis Garry Nillama",
    description:
      "Get in touch with Francis Garry Nillama about full-stack, AI-engineering or technical-support roles. Open to remote work, onsite work and relocation.",
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
