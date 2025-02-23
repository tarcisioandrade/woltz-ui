/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { AlignJustify, LucideIcon } from "lucide-react";
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

const tabTriggerVariants = cva(
  "data-[state=active]:shadow-none text-muted-foreground hover:text-foreground h-8 transition-colors",
  {
    variants: {
      variant: {
        line: "relative after:absolute data-[state=active]:bg-transparent data-[state=active]:after:bg-primary data-[state=active]:text-primary",
        default:
          "data-[state=active]:bg-background data-[state=active]:text-primary",
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
  }
);

const tabListVariants = cva("gap-2 w-full justify-start", {
  variants: {
    variant: {
      line: "border-b bg-transparent text-foreground",
      default: "rounded-lg bg-secondary",
    },
    orientation: {
      horizontal: "px-1 transition-opacity duration-300 flex-wrap max-h-[42px]",
      vertical: "flex-col p-1 gap-1 w-max",
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

const tabsContainerVariants = cva("w-full", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "flex gap-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface TabItem {
  title: string;
  value: string;
  icon?: LucideIcon;
}

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
  tabs: TabItem[];
  query?: string;
  ui?: UI;
}

interface WAdaptiveTabsListProps
  extends VariantProps<typeof tabTriggerVariants> {
  tabs: TabItem[];
  selected: string;
  onSelect: (value: string) => void;
  ui?: UI;
  orientation?: WTabsProps["orientation"];
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
  orientation,
}: WAdaptiveTabsListProps) {
  const IS_VERTICAL = orientation === "vertical";
  const DEFAULT_VISIBLE_COUNT = IS_VERTICAL ? tabs.length : 0;

  const [measurements, setMeasurements] = useState<TabMeasurements>({});
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);
  const [isInitialized, setIsInitialized] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measureRef.current || !listRef.current || IS_VERTICAL) {
      setIsInitialized(true);
      return;
    }

    const measureTabs = () => {
      const tabElements = measureRef.current?.querySelectorAll(".measure-tab");
      const newMeasurements: TabMeasurements = {};

      tabElements?.forEach((tab, index) => {
        if (tabs[index]) {
          newMeasurements[tabs[index].value] =
            tab.getBoundingClientRect().width;
        }
      });

      setMeasurements(newMeasurements);

      const containerWidth = listRef.current?.offsetWidth || 0;
      const moreButtonWidth = 50;
      const availableWidth = containerWidth;
      let count = 0;
      let totalWidth = 0;

      for (const tab of tabs) {
        const tabWidth = newMeasurements[tab.value] || 0;
        const nextWidth = totalWidth + tabWidth;

        const haveSpaceForMoreTab =
          nextWidth + (count < tabs.length - 1 ? moreButtonWidth : 0) <=
          availableWidth;

        if (haveSpaceForMoreTab) {
          totalWidth = nextWidth;
          count++;
        } else {
          break;
        }
      }

      setVisibleCount(count);
      requestAnimationFrame(() => {
        setIsInitialized(true);
      });
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(measureTabs);
    }, 0);

    return () => void clearTimeout(timeoutId);
  }, [tabs, IS_VERTICAL]);

  useEffect(() => {
    if (IS_VERTICAL) return;

    const currentListRef = listRef.current;
    if (!currentListRef) return;

    const resizeObserver = new ResizeObserver(() => {
      const containerWidth = currentListRef.offsetWidth;
      const moreButtonWidth = 50;
      const availableWidth = containerWidth;
      let count = 0;
      let totalWidth = 0;

      for (const tab of tabs) {
        const tabWidth = measurements[tab.value] || 0;
        const nextWidth = totalWidth + tabWidth;

        const haveSpaceForMoreTab =
          nextWidth + (count < tabs.length - 1 ? moreButtonWidth : 0) <=
          availableWidth;

        if (haveSpaceForMoreTab) {
          totalWidth = nextWidth;
          count++;
        } else {
          break;
        }
      }
      setVisibleCount(count);
    });

    resizeObserver.observe(currentListRef);
    return () => void resizeObserver.disconnect();
  }, [measurements, tabs, IS_VERTICAL]);

  const visibleTabs = tabs.slice(0, visibleCount);
  const overflowTabs = tabs.slice(visibleCount);
  const TAB_SELECTED_IS_IN_OVERFLOW = overflowTabs.find(
    (tab) => tab.value === selected
  );

  return (
    <>
      {!IS_VERTICAL && (
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
      )}

      <TabsList
        ref={listRef}
        className={cn(
          tabListVariants({ variant, orientation }),
          ui?.triggerList,
          !isInitialized && !IS_VERTICAL && "opacity-0"
        )}
      >
        {visibleTabs.map((tab) => {
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
                className={cn(
                  "h-9 px-2 hover:bg-accent text-muted-foreground",
                  TAB_SELECTED_IS_IN_OVERFLOW && "text-primary"
                )}
              >
                <AlignJustify className="size-4" />
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
      className={cn(tabsContainerVariants({ orientation }), className)}
      orientation={orientation ?? undefined}
      {...props}
    >
      <AdaptiveTabList
        tabs={tabs}
        selected={selected}
        onSelect={handleSelected}
        variant={variant ?? undefined}
        orientation={orientation ?? undefined}
        ui={ui}
      />
      {orientation === "vertical" ? (
        <div className="grow rounded-lg border border-border text-start">
          {children}
        </div>
      ) : (
        children
      )}
    </Tabs>
  );
}

export function WTabsContent({
  children,
  ...props
}: ComponentProps<typeof TabsContent>) {
  return <TabsContent {...props}>{children}</TabsContent>;
}
