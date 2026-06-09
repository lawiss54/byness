import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-brand-sage-200 bg-white px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-brand-sage-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-camel-500 focus-visible:ring-offset-2 focus-visible:border-brand-camel-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
