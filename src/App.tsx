import { AppWindow, Mail } from "lucide-react";
import { WTabs, TabItem, WTabsContent } from "./components/ui/wtabs-responsive";

const tabs3: TabItem[] = [
  {
    icon: Mail,
    title: "Drive",
    value: "drive",
  },
  {
    icon: AppWindow,
    title: "Propostas",
    value: "proposal",
  },
  {
    icon: AppWindow,
    title: "Contrato",
    value: "contrato",
  },
  {
    icon: AppWindow,
    title: "Timeline",
    value: "timeline",
  },
  {
    icon: AppWindow,
    title: "Comunicação",
    value: "comunicacao",
  },
  {
    icon: AppWindow,
    title: "Remuneração",
    value: "remuneracao",
  },
  {
    icon: AppWindow,
    title: "Unidades",
    value: "unidades",
  },
  {
    icon: AppWindow,
    title: "Seleção Natural",
    value: "selection",
  },
];

function App() {
  return (
    <div className="py-6 container mx-auto">
      <div className="grid grid-cols-[394px_1fr]">
        <div className="bg-blue-200 h-screen" />
        <div className="p-2 rounded-md border w-full">
          <WTabs tabs={tabs3} query="lead" defaultValue="tab3">
            <div className="bg-gray-50 rounded">
              <WTabsContent value="proposal">
                <p>Conteúdo 1</p>
              </WTabsContent>
              <WTabsContent value="drive">
                <p>Conteúdo 2</p>
              </WTabsContent>
              <WTabsContent value="remuneracao">
                <p>remuneracao</p>
              </WTabsContent>
              <WTabsContent value="unidades">
                <p>unidades</p>
              </WTabsContent>
              <WTabsContent value="timeline">
                <p>timeline</p>
              </WTabsContent>
              <WTabsContent value="contrato">
                <p>contrato</p>
              </WTabsContent>
              <WTabsContent value="comunicacao">
                <p>comunicacao</p>
              </WTabsContent>
            </div>
          </WTabs>
        </div>
      </div>
    </div>
  );
}

export default App;
