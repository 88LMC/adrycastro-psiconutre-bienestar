import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initGA, initMetaPixel } from "./lib/analytics";

// Cargar GA y Pixel ANTES de montar React: los useEffect de las paginas
// (p. ej. begin_checkout en /checkout) corren antes que el de App.
initGA();
initMetaPixel();

createRoot(document.getElementById("root")!).render(<App />);
