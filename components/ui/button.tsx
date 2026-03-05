import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      outline: "border border-border bg-transparent hover:bg-muted text-foreground",
      ghost: "hover:bg-muted text-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-9 px-4 text-sm",
      lg: "h-11 px-7 text-base",
      icon: "h-9 w-9",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
