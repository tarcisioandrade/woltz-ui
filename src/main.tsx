import "./globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { NButton } from "./components/ui/button-newsun/n-button";
import { Button } from "./components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
// import Apresentation from "./apresentation.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      {/* <App /> */}
      {/* <Apresentation /> */}
      <div className="flex gap-4">
        <NButton leftIcon={<ArrowLeftIcon />} rightIcon={<ArrowRightIcon />}>
          NButton
        </NButton>
        <Button>Shad Button</Button>
      </div>
    </NuqsAdapter>
  </StrictMode>
);
