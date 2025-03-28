/* eslint-disable react-hooks/exhaustive-deps */
import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  "data-[state=active]:shadow-none text-muted-foreground hover:text-foreground h-8 transition-colors relative px-3 py-1.5",
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

const tabListVariants = cva(
  "flex gap-2 w-full justify-start p-0.5 text-muted-foreground/70 h-fit",
  {
    variants: {
      variant: {
        line: "border-b bg-transparent text-foreground rounded-none",
        default: "rounded-md bg-secondary",
      },
      orientation: {
        horizontal: "transition-opacity duration-300 flex-wrap max-h-[42px]",
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
        className: "border-b-0 border-l p-0",
      },
      {
        variant: "line",
        orientation: "horizontal",
        className: "px-0 py-1",
      },
      {
        variant: "default",
        orientation: "horizontal",
        className: "p-1",
      },
    ],
  }
);

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

const DEFAULT_GAP = 8; // gap-2;
const DEFAULT_PADDING_X = 8; // px-1;
const DEFAULT_MORE_BUTTON_WIDTH = 50;

export interface TabItem {
  title: string;
  value: string;
  icon?: LucideIcon;
  unSeen?: number;
}

type TabsUI = {
  triggerList?: ClassValue;
  trigger?: ClassValue;
  unSeenBadge?: ClassValue;
  dropdown?: {
    trigger?: ClassValue;
    content?: ClassValue;
    item?: ClassValue;
  };
};

interface TabsProps
  extends Omit<ComponentProps<typeof ShadcnTabs>, "onChange" | "orientation">,
    VariantProps<typeof tabTriggerVariants> {
  tabs: TabItem[];
  query?: string;
  ui?: TabsUI;
}

interface AdaptiveTabsListProps
  extends VariantProps<typeof tabTriggerVariants> {
  tabs: TabItem[];
  selected: string;
  onSelect: (value: string) => void;
  ui?: TabsUI;
  orientation?: TabsProps["orientation"];
}

interface TabMeasurements {
  [key: string]: number;
}

interface CalculateVisibleTabsProps {
  measure: TabMeasurements;
  containerWidth: number;
  tabs: TabItem[];
  gap?: number;
  paddingX?: number;
  moreButtonWidth?: number;
}

function calculateVisibleTabs({
  measure,
  containerWidth,
  tabs,
  gap = DEFAULT_GAP,
  paddingX = DEFAULT_PADDING_X,
  moreButtonWidth = DEFAULT_MORE_BUTTON_WIDTH,
}: CalculateVisibleTabsProps) {
  const availableWidth = (containerWidth - paddingX) * 0.98;
  let count = 0;
  let totalWidth = 0;

  for (const tab of tabs) {
    const tabWidth = measure[tab.value] || 0;
    const nextWidth = totalWidth + tabWidth;
    const isLastTab = count < tabs.length - 1;

    const moreButtonWidthOrZero = isLastTab ? moreButtonWidth : 0;
    const moreGapWidthOrZero = isLastTab ? gap : 0;
    const totalSpaceNeeded =
      nextWidth + moreGapWidthOrZero + moreButtonWidthOrZero;

    if (totalSpaceNeeded <= availableWidth) {
      totalWidth = nextWidth;
      count++;
    } else {
      break;
    }
  }
  return count;
}

function getComputedListStyle(element: HTMLDivElement) {
  const computedStyle = window.getComputedStyle(element);
  const gap = Number.parseInt(computedStyle.gap) || DEFAULT_GAP;
  const paddingLeft =
    Number.parseInt(computedStyle.paddingLeft) || DEFAULT_PADDING_X / 2;
  const paddingRight =
    Number.parseInt(computedStyle.paddingRight) || DEFAULT_PADDING_X / 2;
  const paddingX = paddingLeft + paddingRight;

  return {
    paddingX,
    gap,
  };
}

function AdaptiveTabList({
  tabs,
  selected,
  onSelect,
  variant,
  ui,
  orientation,
}: AdaptiveTabsListProps) {
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

      const containerWidth = measureRef.current?.offsetWidth || 0;

      if (!measureRef.current) {
        console.error("ERROR: 'ListRef.current' not found");
      }

      const { gap, paddingX } = getComputedListStyle(
        listRef.current as HTMLDivElement
      );

      const count = calculateVisibleTabs({
        tabs,
        measure: newMeasurements,
        containerWidth,
        gap,
        paddingX,
      });

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

    const currentListRef = measureRef.current;
    if (!currentListRef) return;

    const resizeObserver = new ResizeObserver(() => {
      const { gap, paddingX } = getComputedListStyle(currentListRef);
      const containerWidth = currentListRef.offsetWidth;

      const count = calculateVisibleTabs({
        tabs,
        measure: measurements,
        containerWidth,
        gap,
        paddingX,
      });

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
        <TabsList
          ref={measureRef}
          className={cn(
            tabListVariants({ variant, orientation }),
            "invisible h-0 pointer-events-none",
            ui?.triggerList
          )}
          aria-hidden="true"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "measure-tab",
                  tabTriggerVariants({ variant, orientation }),
                  ui?.trigger
                )}
              >
                {Icon && <Icon className="me-2 shrink-0" size={14} />}
                {tab.title}
                {tab.unSeen ? (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center whitespace-nowrap shrink-0 font-medium w-fit bg-primary text-white rounded-full ms-2 min-w-5 px-1 text-xs size-5",
                      ui?.unSeenBadge
                    )}
                  >
                    {tab.unSeen}
                  </span>
                ) : null}
              </TabsTrigger>
            );
          })}
        </TabsList>
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
              {Icon && <Icon className="me-2 shrink-0" size={14} />}
              {tab.title}
              {tab.unSeen ? (
                <span
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap shrink-0 font-medium w-fit bg-primary text-white rounded-full ms-2 min-w-5 px-1 text-xs size-5",
                    ui?.unSeenBadge
                  )}
                >
                  {tab.unSeen}
                </span>
              ) : null}
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
                  "h-8 px-2 hover:text-foreground hover:bg-transparent text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-primary",
                  ui?.dropdown?.trigger
                )}
                data-state={TAB_SELECTED_IS_IN_OVERFLOW ? "active" : "inactive"}
              >
                <AlignJustify className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={cn("w-48", ui?.dropdown?.content)}
            >
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
                    {tab.unSeen ? (
                      <span
                        className={cn(
                          "inline-flex items-center justify-center whitespace-nowrap shrink-0 font-medium w-fit bg-primary text-white rounded-full ms-2 min-w-5 px-1 text-xs",
                          ui?.unSeenBadge
                        )}
                      >
                        {tab.unSeen}
                      </span>
                    ) : null}
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

export function Tabs({
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
}: TabsProps) {
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
    if (selected) setQuery(selected);
  }, []);

  if (!tabs.length) return null;

  return (
    <ShadcnTabs
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
        variant={variant}
        orientation={orientation}
        ui={ui}
      />
      {orientation === "vertical" ? (
        <div className="grow rounded-lg border border-border text-start">
          {children}
        </div>
      ) : (
        children
      )}
    </ShadcnTabs>
  );
}

export function TabsContent({
  children,
  ...props
}: ComponentProps<typeof ShadcnTabsContent>) {
  return <ShadcnTabsContent {...props}>{children}</ShadcnTabsContent>;
}
