import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { hero } from "../constants";

const NAV_ITEMS = [
  { label: "About",      id: "about"      },
  { label: "Tech Stack", id: "stack"      },
  { label: "Projects",   id: "projects"   },
  { label: "AI Systems", id: "ai"         },
  { label: "Experience", id: "experience" },
];

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeId,    setActiveId]    = useState("");
  const location  = useLocation();
  const navigate  = useNavigate();

  // Track scroll for background + active section highlight
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine which section is in view
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= 120 && bottom >= 120) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation, then scroll
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const scrollTop = () => {
    if (location.pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* ── Logo ── */}
        <button onClick={scrollTop} className="flex items-center gap-3 group z-10">
          <div
            style={{
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              boxShadow: scrolled ? "0 0 20px rgba(0,212,255,0.4)" : "none",
            }}
            className="w-9 h-9 rounded-lg flex items-center justify-center font-oxanium font-bold text-white text-sm transition-all duration-300 group-hover:scale-110"
          >
            {hero.initials}
          </div>
          <span className="font-oxanium font-semibold text-white text-sm hidden sm:block tracking-wide">
            {hero.name.split(" ")[0]}
            <span className="gradient-text">
              {hero.name.includes(" ") ? " " + hero.name.split(" ").slice(1).join(" ") : ""}
            </span>
          </span>
        </button>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-7 z-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative text-sm font-medium transition-colors duration-200 group"
              style={{ color: activeId === item.id ? "var(--cyan)" : "var(--text-secondary)" }}
            >
              {item.label}
              <span
                className="absolute -bottom-1 left-0 h-px bg-brand-cyan transition-all duration-300 group-hover:w-full"
                style={{ width: activeId === item.id ? "100%" : "0%" }}
              />
            </button>
          ))}

          <button
            onClick={() => scrollTo("contact")}
            className="btn-primary text-xs px-5 py-2.5 ml-2"
          >
            <span>Let's Talk</span>
          </button>
        </nav>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 z-10"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-0.5 transition-all duration-300"
              style={{
                background: "var(--cyan)",
                opacity:    i === 1 && mobileOpen ? 0 : 1,
                transform:
                  i === 0 && mobileOpen ? "rotate(45deg) translateY(7px)" :
                  i === 2 && mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              }}
            />
          ))}
        </button>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className="fixed inset-0 z-[150] flex flex-col md:hidden transition-all duration-300"
        style={{
          pointerEvents: mobileOpen ? "auto" : "none",
          opacity:       mobileOpen ? 1 : 0,
          background:    "rgba(3,3,8,0.96)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-oxanium text-2xl font-semibold transition-colors duration-200"
              style={{
                color: activeId === item.id ? "var(--cyan)" : "var(--text-primary)",
                animationDelay: `${i * 60}ms`,
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => scrollTo("contact")}
            className="btn-primary mt-4 text-sm px-10 py-3"
          >
            <span>Let's Talk</span>
          </button>
        </div>

        {/* Close X */}
        <button
          className="absolute top-5 right-6 text-slate-400 hover:text-white text-2xl font-light"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
      </div>
    </>
  );
};

export default Navbar;