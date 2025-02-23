import { AppWindow, Check, Mail } from "lucide-react";
import { WTabs, TabItem, WTabsContent } from "./components/ui/wtabs-responsive";

const tabs: TabItem[] = [
  {
    title: "Tab1",
    value: "tab1",
  },
  {
    title: "Tab2",
    value: "tab2",
  },
  {
    title: "Tab3",
    value: "tab3",
  },
];

const tabs2: TabItem[] = [
  {
    icon: Check,
    title: "Tab1",
    value: "tab1",
  },
  {
    icon: Mail,
    title: "Tab2",
    value: "tab2",
  },
  {
    icon: AppWindow,
    title: "Tab3",
    value: "tab3",
  },
];

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

export default function Apresentation() {
  return (
    <div className="py-6 container mx-auto">
      <div className="p-2 rounded-md border">
        <p className="text-xl text-primary mb-4">
          Variant: "Line" - Horizontal
        </p>
        <WTabs tabs={tabs} query="main" defaultValue="tab3" variant="line">
          <WTabsContent value="tab1">
            <p>Conteúdo 1</p>
          </WTabsContent>
          <WTabsContent value="tab2">
            <p>Conteúdo 2</p>
          </WTabsContent>
          <WTabsContent value="tab3">
            <p>Conteúdo 3</p>
          </WTabsContent>
        </WTabs>
      </div>

      <div className="mt-12 p-2 rounded-md border">
        <p className="text-xl text-primary mb-4">Variant: "Line" - Vertical</p>
        <WTabs
          tabs={tabs2}
          query="vertical"
          defaultValue="tab3"
          variant="line"
          orientation="vertical"
        >
          <div className="bg-gray-50 rounded">
            <WTabsContent value="tab1">
              <p>Conteúdo 1</p>
            </WTabsContent>
            <WTabsContent value="tab2">
              <p>Conteúdo 2</p>
            </WTabsContent>
            <WTabsContent value="tab3">
              <p>Conteúdo 3</p>
            </WTabsContent>
          </div>
        </WTabs>
      </div>

      <div className="mt-12 p-2 rounded-md border">
        <p className="text-xl text-primary mb-4">
          Variant: "Default" - Horizontal
        </p>
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
            <WTabsContent value="selection">
              <p>selection</p>
            </WTabsContent>
          </div>
        </WTabs>
      </div>

      <div className="mt-12 p-2 rounded-md border">
        <p className="text-xl text-primary mb-4">
          Variant: "Default" - Vertical
        </p>
        <WTabs
          tabs={tabs3}
          query="lead"
          defaultValue="drive"
          orientation="vertical"
        >
          <div className="bg-gray-50">
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
  );
}
