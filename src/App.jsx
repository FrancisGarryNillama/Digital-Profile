import { useEffect, useRef } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Navbar } from "./components";
import { Home, Projects, Contact, ModelTest } from "./pages";
import { hero } from "./constants";

const App = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Update the browser tab title
    document.title = `${hero.name} | Portfolio`;

    // Generate a dynamic SVG favicon using initials "FN"
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="20" fill="url(#grad)" />
        <text 
          x="50%" 
          y="50%" 
          dominant-baseline="central" 
          text-anchor="middle" 
          fill="white" 
          font-family="system-ui, sans-serif" 
          font-weight="bold" 
          font-size="50"
        >
          ${hero.initials}
        </text>
      </svg>
    `.trim();

    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    document.head.appendChild(link);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative z-10">
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/projects"  element={<Projects />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="/modeltest" element={<ModelTest />} />
          </Routes>
        </Router>
      </div>

      {/* Single Global Canvas for the entire application */}
      <Canvas
        eventSource={containerRef}
        className="pointer-events-none fixed inset-0 z-[5]"
        shadows
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <View.Port />
      </Canvas>
    </div>
  );
};

export default App;
