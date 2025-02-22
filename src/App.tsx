import { AppWindow, Check, Mail } from "lucide-react";
import {
  WTabs,
  WTabsItem,
  WTabsContent,
} from "./components/ui/wtabs-responsive";

const tabs: WTabsItem[] = [
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

const tabs2: WTabsItem[] = [
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

const tabs3: WTabsItem[] = [
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
  {
    icon: AppWindow,
    title: "Tab4",
    value: "tab4",
  },
  {
    icon: AppWindow,
    title: "Tab5",
    value: "tab5",
  },
  {
    icon: AppWindow,
    title: "Tab6",
    value: "tab6",
  },
  {
    icon: AppWindow,
    title: "Tab7",
    value: "tab7",
  },
  {
    icon: AppWindow,
    title: "Tab8",
    value: "tab8",
  },
];

const tabs4: WTabsItem[] = [
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
        <WTabs tabs={tabs} query="main" defaultValue="tab3" variant="line">
          <WTabsContent className="bg-red-500" value="tab1">
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
        <WTabs tabs={tabs4} query="main" defaultValue="tab3">
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
          Variant: "Default" - Vertical - com Separator
        </p>
        <WTabs
          tabs={tabs3}
          query="main"
          defaultValue="tab3"
          orientation="vertical"
        >
          <div className="bg-gray-50">
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
    </div>
  );
}

export default App;
