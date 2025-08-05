import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Actualizados para usar las clases de color directamente
        default: "bg-primary text-white hover:bg-primary-hover active:translate-y-0.5 shadow-sm",
        destructive: "bg-danger text-white hover:opacity-90 active:translate-y-0.5 shadow-sm",
        outline: "border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 active:translate-y-0.5",
        secondary: "bg-secondary text-white hover:bg-secondary-hover active:translate-y-0.5 shadow-sm",
        ghost: "text-gray-700 hover:bg-gray-100",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-white hover:bg-accent-hover active:translate-y-0.5 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
      width: {
        default: "",
        full: "w-full",
        auto: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    width,
    asChild = false, 
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Si el botón está cargando, deshabilítalo
    const isDisabled = isLoading || disabled;
    
    return (
      <Comp
        className={cn(buttonVariants({ 
          variant, 
          size, 
          width,
          className 
        }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }