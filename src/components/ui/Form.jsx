import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
    return (
        <div className="space-y-1.5 w-full">
            {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
            <input
                className={cn(
                    "flex h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
                    error && "border-red-500 focus-visible:ring-red-500",
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && <p className="text-xs text-error">{error}</p>}
        </div>
    );
});
Input.displayName = "Input";

export const Button = React.forwardRef(({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
        primary: "bg-primary text-white hover:bg-[#262626] active:scale-95 shadow-sm shadow-black/10",
        secondary: "bg-white text-foreground border border-border hover:bg-muted active:scale-95 shadow-sm",
        ghost: "bg-transparent text-foreground hover:bg-muted active:scale-95",
        destructive: "bg-red-500 text-white hover:bg-red-600 active:scale-95 shadow-sm",
        outline: "border border-border bg-transparent hover:bg-background text-foreground active:scale-95"
    };

    const sizes = {
        default: "h-10 px-7 py-3.5", // 14px 28px padding approx
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10 p-0",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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

export const Label = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn(
                "text-sm font-medium text-text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className
            )}
            {...props}
        />
    );
});
Label.displayName = "Label";

export const Textarea = React.forwardRef(({ className, label, error, ...props }, ref) => {
    return (
        <div className="space-y-1.5 w-full">
            {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-xl border border-border bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                    error && "border-red-500 focus-visible:ring-red-500",
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && <p className="text-xs text-error">{error}</p>}
        </div>
    );
});
Textarea.displayName = "Textarea";

export const Select = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <select
            className={cn(
                "flex h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer",
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </select>
    );
});
Select.displayName = "Select";
