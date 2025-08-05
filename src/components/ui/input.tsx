import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: "default" | "error" | "success";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, state = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border px-4 py-2 text-base shadow-sm transition-all",
          "bg-white text-gray-900 placeholder:text-gray-400",
          {
            "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20": 
              state === "default",
            "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20": 
              state === "error",
            "border-success focus:border-success focus:ring-2 focus:ring-success/20": 
              state === "success",
          },
          "focus:outline-none focus:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };