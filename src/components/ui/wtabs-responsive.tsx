/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { ChevronDown, LucideIcon } from "lucide-react";
import { ComponentProps, useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { useIsMobile } from "@/hooks/use-media-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";

const tabTriggerVariants = cva("data-[state=active]:shadow-none", {
  variants: {
    variant: {
      line: "relative after:absolute hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:after:bg-primary data-[state=active]:text-primary text-muted-foreground",
      default: "data-[state=active]:bg-muted data-[state=active]:text-primary",
    },
    orientation: {
      horizontal:
        "after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5",
      vertical: "w-full justify-start",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
  compoundVariants: [
    {
      variant: "line",
      orientation: "vertical",
      className:
        "after:inset-y-0 after:right-0 after:-mr-1 after:w-0.5 after:h-auto after:start-0 rounded-none w-full justify-start",
    },
  ],
});

const tabListVariants = cva("h-auto gap-2", {
  variants: {
    variant: {
      line: "border-b border-border border-b-text-bl bg-transparent px-0 py-1 text-foreground",
      default: "rounded-none bg-transparent px-0 py-1",
    },
    orientation: {
      horizontal: "rounded-none",
      vertical: "flex-col py-0 gap-1 bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
  compoundVariants: [
    {
      variant: "line",
      orientation: "vertical",
      className: "border-b-0",
    },
  ],
});

const tabsContainerVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "flex w-full gap-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const dropdownTriggerVariants = cva("flex items-center justify-between w-fit", {
  variants: {
    variant: {
      line: "border-b border-border py-2",
      default: "bg-background",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TabItem {
  title: string;
  value: string;
  icon?: LucideIcon;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  value?: never;
}

export type WTabsItem = TabItem | Separator;

type UI = {
  list?: ClassValue;
  trigger?: ClassValue;
  dropdown?: {
    trigger?: ClassValue;
    content?: ClassValue;
    item?: ClassValue;
  };
};

interface WTabsProps
  extends Omit<ComponentProps<typeof Tabs>, "onChange" | "orientation">,
    VariantProps<typeof tabTriggerVariants> {
  tabs: WTabsItem[];
  query?: string;
  ui?: UI;
}

interface MobileDropdownWTabsProps
  extends VariantProps<typeof dropdownTriggerVariants> {
  tabs: WTabsItem[];
  selected: string;
  onSelect: (value: string) => void;
  variant?: "line" | "default" | null;
  ui?: UI;
}

function MobileDropdownWTabs({
  tabs,
  selected,
  onSelect,
  variant,
  ui,
}: MobileDropdownWTabsProps) {
  const selectedTab = tabs.find(
    (tab): tab is TabItem => !tab.type && tab.value === selected
  );

  if (!selectedTab) return null;

  const SelectedIcon = selectedTab.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            dropdownTriggerVariants({ variant }),
            ui?.dropdown?.trigger
          )}
        >
          <span className="flex items-center gap-2">
            {SelectedIcon && <SelectedIcon size={20} />}
            <span>{selectedTab.title}</span>
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-full min-w-[200px]", ui?.dropdown?.content)}
      >
        {tabs.map((tab, index) => {
          if (tab.type === "separator") {
            return <div key={index} className="h-px bg-border my-1" />;
          }

          const Icon = tab.icon;
          return (
            <DropdownMenuItem
              key={tab.value}
              onClick={() => onSelect(tab.value)}
              className={cn(
                "flex items-center gap-2",
                tab.value === selected && "bg-accent",
                ui?.dropdown?.item
              )}
            >
              {Icon && <Icon size={20} />}
              {tab.title}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DesktopWTabs({
  tabs,
  variant,
  orientation,
  ui,
}: {
  tabs: WTabsItem[];
  selected: string;
  onSelect: (value: string) => void;
  variant?: "line" | "default" | null;
  orientation?: "horizontal" | "vertical" | null;
  ui?: UI;
}) {
  const Separator = () => (
    <div
      className={cn(
        "mx-1 bg-border",
        orientation === "vertical" ? "h-[1.1px] w-full" : "h-[24px] w-[1.1px]"
      )}
      aria-hidden="true"
    />
  );

  return (
    <TabsList
      className={cn(tabListVariants({ variant, orientation }), ui?.list)}
    >
      {tabs.map((tab, i) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${i}`} />;
        }

        const Icon = tab.icon;
        return (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              tabTriggerVariants({ variant, orientation }),
              ui?.trigger
            )}
          >
            {Icon && <Icon className="mr-1" size={20} />}
            {tab.title}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}

export function WTabs({
  tabs,
  children,
  onValueChange,
  query,
  defaultValue,
  className,
  orientation = "horizontal",
  variant,
  ui,
  ...props
}: WTabsProps) {
  const [queryValue, setQuery] = useQueryState(query ?? "");
  const [selected, setSelected] = useState<string>(
    (queryValue || defaultValue || tabs[0]?.value) ?? ""
  );
  const isMobile = useIsMobile();

  function handleSelected(value: string) {
    setSelected(value);
    if (query) setQuery(value);
    onValueChange?.(value);
  }

  useEffect(function setDefaultQueryName() {
    if (queryValue) setQuery(queryValue);
  }, []);

  if (!tabs.length) return null;

  return (
    <Tabs
      onValueChange={handleSelected}
      value={selected}
      defaultValue={selected}
      className={cn(
        tabsContainerVariants({ orientation }),
        isMobile && "flex-col",
        className
      )}
      orientation={orientation ?? undefined}
      {...props}
    >
      {isMobile ? (
        <MobileDropdownWTabs
          tabs={tabs}
          selected={selected}
          onSelect={handleSelected}
          variant={variant}
          ui={ui}
        />
      ) : (
        <DesktopWTabs
          tabs={tabs}
          selected={selected}
          onSelect={handleSelected}
          variant={variant}
          orientation={orientation}
          ui={ui}
        />
      )}

      {orientation === "vertical" && !isMobile ? (
        <div className="grow rounded-lg border border-border text-start">
          {children}
        </div>
      ) : (
        children
      )}
    </Tabs>
  );
}

type WTabsContentProps = ComponentProps<typeof TabsContent>;

export function WTabsContent({ children, ...props }: WTabsContentProps) {
  return <TabsContent {...props}>{children}</TabsContent>;
}
