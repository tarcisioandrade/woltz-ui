import { AppWindow, Check, Mail } from "lucide-react";
import { WoltzTab, WoltzTabItem } from "./components/ui/woltz-tabs";
import { TabsContent } from "@/components/ui/tabs";
const tabs: WoltzTabItem[] = [
  {
    title: "Tab1",
    value: "tab1",
  },
  { type: "separator" },
  {
    title: "Tab2",
    value: "tab2",
  },
  { type: "separator" },
  {
    title: "Tab3",
    value: "tab3",
  },
];

const tabs2: WoltzTabItem[] = [
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

const tabs3: WoltzTabItem[] = [
  {
    icon: Check,
    title: "Tab1",
    value: "tab1",
  },
  { type: "separator" },
  {
    icon: Mail,
    title: "Tab2",
    value: "tab2",
  },
  { type: "separator" },
  {
    icon: AppWindow,
    title: "Tab3",
    value: "tab3",
  },
];

const tabs4: WoltzTabItem[] = [
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

function App() {
  return (
    <div className="py-6 container mx-auto">
      <div className="p-2 rounded-md border">
        <p className="text-xl text-primary mb-4">
          Variant: "Line" - Horizontal - com Separator
        </p>
        <WoltzTab
          tabs={tabs}
          queryName="main"
          defaultValue="tab3"
          variant="line"
        >
          <div className="bg-gray-50 rounded">
            <TabsContent value="tab1">
              <p>Conteúdo 1</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>Conteúdo 2</p>
            </TabsContent>
            <TabsContent value="tab3">
              <p>Conteúdo 3</p>
            </TabsContent>
          </div>
        </WoltzTab>
      </div>

      <div className="mt-12 p-2 rounded-md border">
        <p className="text-xl text-primary mb-4">Variant: "Line" - Vertical</p>
        <WoltzTab
          tabs={tabs2}
          queryName="main"
          defaultValue="tab3"
          variant="line"
          orientation="vertical"
        >
          <div className="bg-gray-50 rounded">
            <TabsContent value="tab1">
              <p>Conteúdo 1</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>Conteúdo 2</p>
            </TabsContent>
            <TabsContent value="tab3">
              <p>Conteúdo 3</p>
            </TabsContent>
          </div>
        </WoltzTab>
      </div>

      <div className="mt-12 p-2 rounded-md border">
        <p className="text-xl text-primary mb-4">
          Variant: "Default" - Horizontal
        </p>
        <WoltzTab tabs={tabs4} queryName="main" defaultValue="tab3">
          <div className="bg-gray-50 rounded">
            <TabsContent value="tab1">
              <p>Conteúdo 1</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>Conteúdo 2</p>
            </TabsContent>
            <TabsContent value="tab3">
              <p>Conteúdo 3</p>
            </TabsContent>
          </div>
        </WoltzTab>
      </div>

      <div className="mt-12 p-2 rounded-md border">
        <p className="text-xl text-primary mb-4">
          Variant: "Default" - Vertical - com Separator
        </p>
        <WoltzTab
          tabs={tabs3}
          queryName="main"
          defaultValue="tab3"
          orientation="vertical"
        >
          <div className="bg-gray-50">
            <TabsContent value="tab1">
              <p>Conteúdo 1</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>Conteúdo 2</p>
            </TabsContent>
            <TabsContent value="tab3">
              <p>Conteúdo 3</p>
            </TabsContent>
          </div>
        </WoltzTab>
      </div>
    </div>
  );
}

export default App;
