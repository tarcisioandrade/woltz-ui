/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { LucideIcon, MoreHorizontal } from "lucide-react";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
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

const tabListVariants = cva("h-auto gap-2 w-full justify-start", {
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

export interface TabItem {
  title: string;
  value: string;
  icon?: LucideIcon;
}

export type WTabsItem = TabItem;

type UI = {
  triggerList?: ClassValue;
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

interface TabMeasurements {
  [key: string]: number;
}

function AdaptiveTabList({
  tabs,
  selected,
  onSelect,
  variant,
  ui,
}: {
  tabs: WTabsItem[];
  selected: string;
  onSelect: (value: string) => void;
  variant?: "line" | "default";
  ui?: UI;
}) {
  const [measurements, setMeasurements] = useState<TabMeasurements>({});
  const [visibleCount, setVisibleCount] = useState(tabs.length);
  const listRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!measureRef.current || !listRef.current) return;

    const measureTabs = () => {
      const tabElements = measureRef.current?.querySelectorAll(".measure-tab");
      const newMeasurements: TabMeasurements = {};

      tabElements?.forEach((tab, index) => {
        if (tabs[index]) {
          newMeasurements[tabs[index].value] =
            tab.getBoundingClientRect().width;
        }
      });
      initializedRef.current = true;
      setMeasurements(newMeasurements);
    };

    measureTabs();

    const resizeObserver = new ResizeObserver(() => {
      if (listRef.current) {
        updateVisibleTabs(measurements);
      }
    });
    resizeObserver.observe(listRef.current);

    return () => void resizeObserver.disconnect();
  }, [measureRef.current, listRef.current]);

  const updateVisibleTabs = (measurements: TabMeasurements) => {
    if (!listRef.current || !initializedRef.current) {
      return;
    }

    const containerWidth = listRef.current.offsetWidth;
    const moreButtonWidth = 50;
    const availableWidth = containerWidth;
    let count = 0;
    let totalWidth = 0;

    for (const tab of tabs) {
      const tabWidth = measurements[tab.value] || 0;
      const nextWidth = totalWidth + tabWidth;

      if (
        nextWidth + (count < tabs.length - 1 ? moreButtonWidth : 0) <=
        availableWidth
      ) {
        totalWidth = nextWidth;
        count++;
      } else {
        break;
      }
    }
    setVisibleCount(count);
  };

  useEffect(() => {
    if (initializedRef.current) {
      updateVisibleTabs(measurements);
    }
  }, [measurements, initializedRef.current]);

  const visibleTabs = tabs.slice(0, visibleCount);
  const overflowTabs = tabs.slice(visibleCount);

  return (
    <>
      <div
        ref={measureRef}
        className="absolute -left-full invisible"
        aria-hidden="true"
      >
        {tabs.map((tab) => (
          <div
            key={`measure-${tab.value}`}
            className="measure-tab inline-flex items-center px-4 py-2"
          >
            {tab.icon && <tab.icon className="mr-2" size={20} />}
            <span>{tab.title}</span>
          </div>
        ))}
      </div>

      <TabsList
        ref={listRef}
        className={cn(tabListVariants({ variant }), ui?.triggerList)}
      >
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(tabTriggerVariants({ variant }), ui?.trigger)}
            >
              {Icon && <Icon className="mr-2" size={20} />}
              {tab.title}
            </TabsTrigger>
          );
        })}

        {overflowTabs.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-2 hover:bg-accent"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {overflowTabs.map((tab) => {
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
        )}
      </TabsList>
    </>
  );
}

export function WTabs({
  tabs,
  children,
  onValueChange,
  query,
  defaultValue,
  className,
  variant,
  ui,
  orientation,
  ...props
}: WTabsProps) {
  const [queryValue, setQuery] = useQueryState(query ?? "");
  const [selected, setSelected] = useState<string>(
    (queryValue || defaultValue || tabs[0]?.value) ?? ""
  );

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
      value={selected}
      onValueChange={handleSelected}
      defaultValue={selected}
      className={className}
      orientation={orientation ?? undefined}
      {...props}
    >
      <AdaptiveTabList
        tabs={tabs}
        selected={selected}
        onSelect={handleSelected}
        variant={variant ?? undefined}
        ui={ui}
      />
      {children}
    </Tabs>
  );
}

export function WTabsContent({
  children,
  ...props
}: ComponentProps<typeof TabsContent>) {
  return <TabsContent {...props}>{children}</TabsContent>;
}
