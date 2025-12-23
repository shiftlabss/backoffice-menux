import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 shadow-sm shadow-black/10",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95 shadow-sm",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-95 shadow-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-95",
        outlineSuccess: "border border-emerald-200 bg-emerald-50/10 hover:bg-emerald-50 text-emerald-700 font-bold active:scale-95"
    };

    const sizes = {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10 p-0",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";
