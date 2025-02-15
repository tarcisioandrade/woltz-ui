import { AppWindow, Check, Mail } from "lucide-react";
import { WoltzTab, WoltzTabItem } from "./components/ui/woltz-tabs";
import { TabsContent } from "@/components/ui/tabs";
const tabs: WoltzTabItem[] = [
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
function App() {
  return (
    <div className=" p-4 container">
      <WoltzTab tabs={tabs} queryName="main" defaultValue="tab3" variant="line">
        <div className="bg-gray-50 rounded">
          <TabsContent value="tab1">
            <p>Salve1</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Salve2</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Salve3</p>
          </TabsContent>
        </div>
      </WoltzTab>

      <div className="mt-12">
        <WoltzTab
          tabs={tabs2}
          queryName="main"
          defaultValue="tab3"
          variant="line"
          orientation="vertical"
        >
          <div className="bg-gray-50 rounded">
            <TabsContent value="tab1">
              <p>Salve1</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>Salve2</p>
            </TabsContent>
            <TabsContent value="tab3">
              <p>Salve3</p>
            </TabsContent>
          </div>
        </WoltzTab>
      </div>

      <div className="mt-12">
        <WoltzTab
          tabs={tabs3}
          queryName="main"
          defaultValue="tab3"
          variant="default"
          orientation="vertical"
        >
          <div className="bg-gray-50 rounded">
            <TabsContent value="tab1">
              <p>Salve1</p>
            </TabsContent>
            <TabsContent value="tab2">
              <p>Salve2</p>
            </TabsContent>
            <TabsContent value="tab3">
              <p>Salve3</p>
            </TabsContent>
          </div>
        </WoltzTab>
      </div>
    </div>
  );
}

export default App;
