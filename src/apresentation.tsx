import {
  Bean,
  CalendarCheck2,
  Check,
  CircleUser,
  Earth,
  Ham,
  Link,
  Mail,
} from "lucide-react";
import { WTabs, TabItem, WTabsContent } from "./components/ui/wtabs-responsive";
import { useState } from "react";

export default function Apresentation() {
  const [notify, setNotify] = useState(3);

  const tabs3: TabItem[] = [
    {
      icon: Mail,
      title: "Drive",
      value: "drive",
      unSeen: notify,
    },
    {
      icon: Check,
      title: "Propostas",
      value: "proposal",
    },
    {
      icon: Bean,
      title: "Contrato",
      value: "contrato",
    },
    {
      icon: CalendarCheck2,
      title: "Timeline",
      value: "timeline",
    },
    {
      icon: CircleUser,
      title: "Comunicação",
      value: "comunicacao",
    },
    {
      icon: Earth,
      title: "Remuneração",
      value: "remuneracao",
    },
    {
      icon: Ham,
      title: "Unidades",
      value: "unidades",
    },
    {
      icon: Link,
      title: "Seleção Natural",
      value: "selection",
      unSeen: 2,
    },
  ];

  return (
    <div className="py-6 max-w-screen-md mx-auto">
      <div className="p-2 rounded-md border">
        <p className="text-xl text-primary mb-4">
          Variant: "Line" - Horizontal
        </p>
        <WTabs
          tabs={tabs3}
          query="lead"
          defaultValue="proposal"
          variant="line"
          onValueChange={(tab) => {
            if (tab === "drive") setNotify(0);
          }}
        >
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
        <p className="text-xl text-primary mb-4">Variant: "Line" - Vertical</p>
        <WTabs
          tabs={tabs3}
          query="vertical"
          orientation="vertical"
          variant="line"
          defaultValue="proposal"
        >
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
          Variant: "Default" - Horizontal
        </p>
        <WTabs
          tabs={tabs3}
          query="lead"
          defaultValue="proposal"
          ui={{
            trigger: "w-[140px]",
          }}
        >
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
          defaultValue="proposal"
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
