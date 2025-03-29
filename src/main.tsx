import "./globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { NButton } from "./components/ui/button-newsun/n-button";
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from "lucide-react";
import Apresentation from "./apresentation.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      {/* <App /> */}
      <Apresentation />
      {/* <div className="flex flex-col gap-4 w-fit justify-center items-center">
        <NButton variant="unstyled">Unstyled</NButton>
        <NButton
          rightIcon={<ArrowRightIcon />}
          leftIcon={<ArrowLeftIcon />}
          variant="default"
        >
          DefaultDefaultDefaultDefaultDefaultDefault
        </NButton>
        <NButton variant="destructive" size="xl">
          Destructive
        </NButton>
        <NButton variant="ghost">Ghost</NButton>
        <NButton variant="link">Link</NButton>
        <NButton variant="outline">Outline</NButton>
        <NButton isLoading>Loading</NButton>
        <NButton size="icon">
          <HomeIcon />
        </NButton>
      </div> */}
    </NuqsAdapter>
  </StrictMode>
);
