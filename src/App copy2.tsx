import { Clock, File, Folder, Mail } from "lucide-react";
import { WTabs, TabItem, WTabsContent } from "./components/ui/wtabs-responsive";

const tabs: TabItem[] = [
  {
    title: "Contrato",
    value: "contrato",
    icon: File,
  },
  {
    title: "Propostas",
    value: "propostas",
    icon: File,
  },
  {
    title: "Timeline",
    value: "timeline",
    icon: Clock,
  },
  {
    title: "Comunicação",
    value: "comunicacao",
    icon: Mail,
  },
  {
    title: "Drive",
    value: "drive",
    icon: Folder,
  },
  {
    title: "Lead",
    value: "lead",
    icon: Folder,
  },
  {
    title: "Modelo de Negocio",
    value: "modelo de Negocio",
    icon: Folder,
  },
  {
    title: "Alguma Coisa",
    value: "alguma coisa",
    icon: Folder,
  },
  {
    title: "Perfil",
    value: "perfil",
    icon: Folder,
  },
  {
    title: "Alterar Senha",
    value: "alterar Senha",
    icon: Folder,
  },
  {
    title: "Configurações",
    value: "configurações",
    icon: Folder,
  },
  {
    title: "Comunicação",
    value: "comunicação",
    icon: Folder,
  },
  {
    title: "Workflow",
    value: "workflow",
    icon: Folder,
  },
  {
    title: "Onboarding",
    value: "onboarding",
    icon: Folder,
  },
];

function App() {
  return (
    <section className="grid grid-cols-[250px_1fr]">
      <aside className="h-screen bg-accent">
        <header className="p-4 bg-primary text-white text-lg uppercase font-bold h-14">
          Logo
        </header>
        <div className="p-4">
          <ul className="space-y-6">
            <li>Home</li>
            <li>CRM</li>
            <li>Lead</li>
            <li>Sobre</li>
          </ul>
        </div>
      </aside>

      <div>
        <header className="bg-accent h-14	w-full flex items-center px-4">
          <div className="flex items-center gap-4">
            <p>Home {">"}</p>
            <p>Sobre {">"}</p>
          </div>
        </header>
        <div className="p-4">
          <h1 className="text-3xl">Main Page</h1>
          <div className="bg-accent rounded-lg flex gap-2 w-full">
            <div className="bg-blue-200 w-96 h-[calc(100vh-56px-64px-16px)]">
              <ul className="space-y-6">
                <li>Home</li>
                <li>CRM</li>
                <li>Lead</li>
                <li>Sobre</li>
              </ul>
            </div>
            <WTabs
              tabs={tabs}
              query="main"
              defaultValue="contrato"
              variant="line"
            >
              <WTabsContent value="contrato">
                <h1>Contrato</h1>
              </WTabsContent>
              <WTabsContent value="propostas">
                <h1>Propostas</h1>
              </WTabsContent>
              <WTabsContent value="timeline">
                <h1>Timeline</h1>
              </WTabsContent>
              <WTabsContent value="comunicacao">
                <h1>Comunicação</h1>
              </WTabsContent>
              <WTabsContent value="drive">
                <h1>Drive</h1>
              </WTabsContent>
            </WTabs>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
