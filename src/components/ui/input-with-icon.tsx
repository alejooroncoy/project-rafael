import * as React from "react";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "./input";
import { LucideIcon } from "lucide-react";

interface InputWithIconProps extends InputProps {
  icon: LucideIcon;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  state?: "default" | "error" | "success";
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon: Icon, iconPosition = "left", iconClassName, state, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <div 
          className={cn(
            "absolute inset-y-0 flex items-center pointer-events-none",
            iconPosition === "left" ? "left-0 pl-3.5" : "right-0 pr-3.5"
          )}
        >
          <Icon 
            className={cn(
              "h-5 w-5",
              {
                "text-gray-400": state === "default" || !state,
                "text-danger": state === "error",
                "text-success": state === "success",
              },
              iconClassName
            )} 
          />
        </div>
        <Input 
          className={cn(
            iconPosition === "left" ? "pl-10" : "pr-10",
            className
          )}
          state={state}
          ref={ref}
          {...props} 
        />
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
export type { InputWithIconProps };