/**
 * Ensures GLB paths used in the app exist under public/models/.
 * Vite serves public/ at the site root, so /models/Foo.glb → public/models/Foo.glb
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const modelsDir = path.join(root, "public", "models");

/** Keep in sync with src/pages/Home.jsx, src/models/Avatar.jsx, src/models/Fox.jsx */
const REQUIRED_GLBS = [
  "Futuristic_AI_Brain.glb",
  "Neural_Network_Nodes.glb",
  "Intelligent_Circuitry.glb",
  "Abstract_AI_Processor_Core.glb",
  "AI_Core.glb",
  "Ai_brain.glb",
  "Code_Brackets.glb",
  "Server_Stack.glb",
  "Database_Cylinder.glb",
  "Api_Nodes.glb",
  "Frontend_Component_Layers.glb",
  "Workflow_Pipeline.glb",
  "System_Orchestration.glb",
  "Browser_Automation.glb",
  "Cloud_Synchronization.glb",
  "Interactive_Analytics_Dashboard.glb",
  "Data_Visualization_Graphs.glb",
  "Secure_Document_Exchange.glb",
  "Professional_Emailmessage_Icon.glb",
  "Team_workflow_symbol.glb",
  "Abstract_geometric_innovation_symbol.glb",
  "Futuristic_Lightbulb.glb",
  "Avatar.glb",
  "fox.glb",
];

const strict =
  process.argv.includes("--strict") ||
  process.env.CI === "true" ||
  process.env.STRICT_MODEL_CHECK === "1";

if (process.env.SKIP_MODEL_CHECK === "1") {
  console.log("[verify-models] SKIP_MODEL_CHECK=1 — skipping.");
  process.exit(0);
}

const missing = REQUIRED_GLBS.filter((name) => !fs.existsSync(path.join(modelsDir, name)));

if (missing.length === 0) {
  console.log("[verify-models] All required GLBs present in public/models/");
  process.exit(0);
}

const msg = [
  "",
  "[verify-models] Missing GLB file(s) in public/models/:",
  ...missing.map((f) => `  - ${f}`),
  "",
  "Copy your .glb assets into:",
  `  ${modelsDir}`,
  "",
  "Filenames must match exactly (case-sensitive on Linux/Vercel).",
  "To skip this check: SKIP_MODEL_CHECK=1 npm run dev",
  "",
].join("\n");

console.warn(msg);

if (strict) {
  console.error("[verify-models] Strict mode: failing the script because models are missing.");
  process.exit(1);
}

process.exit(0);
