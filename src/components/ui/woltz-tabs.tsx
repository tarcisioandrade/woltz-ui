/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { LucideIcon } from "lucide-react";
import { ComponentProps, useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";

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
}

export type WoltzTabItem = TabItem | Separator;

type UI = {
  list?: ClassValue;
  trigger?: ClassValue;
};

interface WoltzTabProps
  extends Omit<ComponentProps<typeof Tabs>, "onChange" | "orientation">,
    VariantProps<typeof tabTriggerVariants> {
  tabs: WoltzTabItem[];
  activeColor?: string;
  queryName?: string;
  ui?: UI;
}

export function WoltzTab({
  tabs,
  children,
  onValueChange,
  queryName,
  defaultValue,
  className,
  orientation = "horizontal",
  variant,
  ui,
  ...props
}: WoltzTabProps) {
  const [query, setQuery] = useQueryState(queryName ?? "");
  const [selected, setSelected] = useState<string | null>(
    (query || defaultValue) ?? null
  );

  function handleSelected(value: string) {
    setSelected(value);
    if (queryName) setQuery(value);
    onValueChange?.(value);
  }

  useEffect(function setDefaultQueryName() {
    if (query) setQuery(query);
  }, []);

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
    <Tabs
      onValueChange={handleSelected}
      defaultValue={selected ?? defaultValue}
      className={cn(tabsContainerVariants({ orientation }), className)}
      orientation={orientation ?? undefined}
      {...props}
    >
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

type WoltzTabContentProps = ComponentProps<typeof TabsContent>;

export function WoltzTabContent({ children, ...props }: WoltzTabContentProps) {
  return <TabsContent {...props}>{children}</TabsContent>;
}
