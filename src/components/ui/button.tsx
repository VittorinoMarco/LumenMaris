import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-[11px] font-normal uppercase tracking-[0.22em] transition-[background-color,color,border-color,transform,box-shadow] duration-500 ease-editorial active:scale-[0.97] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--t-accent)] focus-visible:ring-offset-4 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--t-fg)] text-[var(--t-bg)] hover:bg-[var(--t-accent)] hover:text-white hover:shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--t-fg)_60%,transparent)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline:
          "border border-[color-mix(in_srgb,var(--t-fg)_32%,transparent)] bg-transparent text-[var(--t-fg)] hover:border-[var(--t-fg)] hover:bg-[var(--t-fg)] hover:text-[var(--t-bg)]",
        ghost: "hover:bg-accent/30 hover:text-accent-foreground",
        hero:
          "rounded-full border border-white/35 bg-white/12 px-10 py-3 text-[13px] font-normal uppercase tracking-[0.14em] text-white backdrop-blur-md transition-[background-color,border-color,transform] duration-300 hover:border-white/55 hover:bg-white/22 hover:text-white active:scale-[0.99]",
        pill:
          "rounded-full bg-primary px-10 py-3 text-[13px] font-normal uppercase tracking-[0.12em] text-primary-foreground shadow-sm hover:bg-primary/88",
        pillOutline:
          "rounded-full border border-primary/40 bg-transparent px-10 py-3 text-[13px] font-normal uppercase tracking-[0.12em] text-foreground hover:border-primary hover:bg-primary/[0.06]",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-10 px-5",
        lg: "h-14 px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
