import "./globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App copy2.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
  </StrictMode>
);
