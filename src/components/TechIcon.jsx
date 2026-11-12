import { useId } from "react";

/**
 * Lightweight inline-SVG icon set that replaces the old 3D GLB models
 * (replaced ~500 MB of models + ~900 kB of three.js with a few kB of markup).
 * All icons are drawn on a 24×24 grid with a cyan→violet gradient stroke.
 */
const ICONS = {
  brain: (
    <>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3 2 2 0 0 0 3-1V5a2 2 0 0 0-3-1z" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3 2 2 0 0 1-3-1V5a2 2 0 0 1 3-1z" />
      <path d="M7.5 9H9.5M14.5 9h2M7.5 15h2M14.5 15h2" />
    </>
  ),
  network: (
    <>
      <path d="M12 6v4.2M10.5 12.8 6.4 11M13.5 12.8l4.1-1.8M11 13.6 8.8 18.4M13 13.6l2.2 4.8M6.8 12.6l1.6 5.6M17.2 12.6l-1.6 5.6M10.2 4.6 6.4 10.6M13.8 4.6l3.8 6" />
      <circle cx="12" cy="4" r="1.8" />
      <circle cx="5" cy="11.5" r="1.8" />
      <circle cx="19" cy="11.5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="8" cy="20" r="1.8" />
      <circle cx="16" cy="20" r="1.8" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" rx=".5" />
      <path d="M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" />
    </>
  ),
  processor: (
    <>
      <path d="M12 2 20.66 7v10L12 22l-8.66-5V7z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v7M12 15v7M3.34 7l6.06 3.5M14.6 13.5 20.66 17M20.66 7 14.6 10.5M9.4 13.5 3.34 17" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1.6" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  server: (
    <>
      <rect x="3" y="3.5" width="18" height="7" rx="1.5" />
      <rect x="3" y="13.5" width="18" height="7" rx="1.5" />
      <path d="M11 7h6M11 17h6" />
      <circle cx="7" cy="7" r=".9" />
      <circle cx="7" cy="17" r=".9" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  api: (
    <>
      <path d="M8 4H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1" />
      <path d="M16 4h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1" />
      <circle cx="9.5" cy="12" r="1" />
      <circle cx="14.5" cy="12" r="1" />
      <path d="M10.5 12h3" />
    </>
  ),
  layers: <path d="M12 2 22 7l-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5" />,
  pipeline: (
    <>
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="17.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M6.5 12h3M14.5 12h3M4 9.5V6h16v3.5M18 4.5 20 6l-2 1.5" />
    </>
  ),
  orchestration: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="4.5" cy="4.5" r="2" />
      <circle cx="19.5" cy="4.5" r="2" />
      <circle cx="4.5" cy="19.5" r="2" />
      <circle cx="19.5" cy="19.5" r="2" />
      <path d="M6 6l3.8 3.8M18 6l-3.8 3.8M6 18l3.8-3.8M18 18l-3.8-3.8" />
    </>
  ),
  browser: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 9h20" />
      <circle cx="5" cy="6.5" r=".7" />
      <circle cx="7.5" cy="6.5" r=".7" />
      <path d="M11 12l6.5 2.6-2.8 1.1-1.1 2.8z" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a5 5 0 0 1-.6-9.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z" />
      <path d="M10 14.5l2-2 2 2M12 12.5V17" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9M12.5 17v-3M15.5 17v-5M18.5 17v-2" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 6-7" />
      <circle cx="20" cy="7" r="1" />
    </>
  ),
  secureDoc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <rect x="9" y="13" width="6" height="5" rx="1" />
      <path d="M10.25 13v-1.25a1.75 1.75 0 0 1 3.5 0V13" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17.5" cy="9" r="2.5" />
      <path d="M3 20a6 6 0 0 1 12 0M15.5 14.6A5 5 0 0 1 22 19.5" />
    </>
  ),
  sparkle: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 2.5v4M17 4.5h4M5 16.5v4M3 18.5h4" />
  ),
  lightbulb: (
    <>
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.45 1 1.15 1 1.9V16h5v-.2c0-.75.4-1.45 1-1.9A6 6 0 0 0 12 3z" />
      <path d="M9.5 19h5M10.5 21.5h3" />
    </>
  ),
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />,
};

export const ICON_NAMES = Object.keys(ICONS);

export function TechIcon({ name, size = 48, strokeWidth = 1.5, className = "", style, title }) {
  const gid = useId().replace(/:/g, "");
  const glyph = ICONS[name] || ICONS.atom;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={`url(#g${gid})`}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`g${gid}`} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00d4ff" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {glyph}
    </svg>
  );
}

/** Drop-in replacement for the old <MiniModelCanvas>: a glowing, gently floating icon tile. */
export function IconTile({ icon, height = 120, size, className = "" }) {
  size = size ?? (typeof height === "number" ? Math.round(Math.min(height * 0.48, 88)) : 140);
  return (
    <div
      className={`icon-tile relative flex items-center justify-center w-full ${className}`}
      style={{ height }}
      aria-hidden
    >
      <div className="icon-tile-ring" style={{ width: size * 1.7, height: size * 1.7 }} />
      <TechIcon name={icon} size={size} className="icon-float icon-glow" />
    </div>
  );
}

export default TechIcon;
