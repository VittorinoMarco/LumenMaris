import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Campo "a filo": solo una linea sotto, che si accende al focus. */
export const fieldClass =
  "flex w-full border-0 border-b border-[var(--t-line)] bg-transparent px-0 py-3 text-base font-light text-[var(--t-fg)] placeholder:text-[var(--t-muted)]/70 transition-colors duration-500 focus-visible:border-[var(--t-fg)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return <input type={type} className={cn(fieldClass, "h-12", className)} ref={ref} {...props} />;
});
Input.displayName = "Input";

export { Input };
