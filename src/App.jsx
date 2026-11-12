import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Projects, Contact } from "./pages";
import RouteMeta from "./seo/RouteMeta";

// Title, description, canonical and favicon are set statically in index.html
// (so crawlers see them without running JS) and updated per route by <RouteMeta />.
const App = () => {
  return (
    <div className="relative w-full">
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
          <RouteMeta />
          <Navbar />
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/projects"  element={<Projects />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
