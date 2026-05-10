import { hero, socialLinks } from "../constants";

const Footer = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{ borderTop: "1px solid var(--border-cyan)" }}
      className="relative"
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--cyan), transparent)" }}
      />

      <div className="section-container !py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
              className="w-8 h-8 rounded-lg flex items-center justify-center font-oxanium font-bold text-white text-xs"
            >
              {hero.initials}
            </div>
            <span className="font-oxanium text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
              {hero.name}
              <span
                className="block text-xs font-normal tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                {hero.tagline}
              </span>
            </span>
          </div>

          {/* Quick links */}
          <nav className="flex items-center gap-6">
            {["about", "stack", "projects", "ai", "experience", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="footer-link capitalize"
              >
                {id}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center font-oxanium text-xs font-bold transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid var(--border-cyan)",
                  color: "var(--cyan)",
                }}
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{ borderTop: "1px solid rgba(0,212,255,0.08)", color: "var(--text-muted)" }}
        >
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "var(--cyan)" }}>{hero.name}</span>. All rights reserved.
          &nbsp;·&nbsp; Built with React, Three.js & Tailwind CSS
        </div>
      </div>
    </footer>
  );
};

export default Footer;