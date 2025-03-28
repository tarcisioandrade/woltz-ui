import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { RoundSpinner } from "../spinner";

const ButtonVariantsCva = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        md: "px-4 h-9 min-w-10 text-md",
        xs: "px-2 h-6 min-w-6 text-xs",
        sm: "px-3 h-8 min-w-8 text-sm",
        lg: "px-6 h-12 min-w-12 text-lg",
        xl: "px-8 h-14 min-w-14 text-xl",
      },
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariantsCva> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const NButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      leftIcon,
      rightIcon,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isLoading;

    return (
      <Comp
        className={cn(
          ButtonVariantsCva({ variant, size, className }),
          "relative",
          isLoading && "cursor-wait"
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <span
            className="absolute inset-0 flex items-center justify-center spinner"
            aria-label="Carregando"
          >
            <RoundSpinner />
          </span>
        )}

        <span
          className={cn(
            "flex items-center justify-center gap-2 text",
            isLoading && "invisible" // Esconde o conteúdo quando carregando
          )}
        >
          {leftIcon && !isLoading && leftIcon}
          {children}
          {rightIcon && !isLoading && rightIcon}
        </span>
      </Comp>
    );
  }
);

NButton.displayName = "NButton";

export { NButton, ButtonVariantsCva };
