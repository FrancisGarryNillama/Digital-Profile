import { useCallback, useEffect, useState } from "react";

const KEY = "theme";
const META_COLOR = { dark: "#030308", light: "#eef1fa" };

const readStored = () => {
  try { return localStorage.getItem(KEY); } catch { return null; }
};
const systemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLOR[theme]);
}

/** Dark/light theme: follows the OS until the visitor picks one, then remembers it. */
export default function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || readStored() || systemTheme()
  );

  useEffect(() => { apply(theme); }, [theme]);

  // Keep every toggle instance (desktop + mobile) in sync
  useEffect(() => {
    const onSync = (e) => setTheme(e.detail);
    window.addEventListener("themechange", onSync);
    return () => window.removeEventListener("themechange", onSync);
  }, []);

  // Keep following the OS setting while the visitor hasn't chosen explicitly
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!mq) return;
    const onChange = (e) => { if (!readStored()) setTheme(e.matches ? "light" : "dark"); };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = (document.documentElement.dataset.theme || theme) === "dark" ? "light" : "dark";
    try { localStorage.setItem(KEY, next); } catch { /* private mode */ }
    apply(next);
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }, [theme]);

  return { theme, toggle };
}
