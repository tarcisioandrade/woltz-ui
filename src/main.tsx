import "./globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import Apresentation from "./apresentation.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      {/* <App /> */}
      <Apresentation />
    </NuqsAdapter>
  </StrictMode>
);
