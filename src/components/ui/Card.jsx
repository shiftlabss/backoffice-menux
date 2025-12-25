
import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }) {
    return (
        <div className={cn("bg-white rounded-[20px] border border-border shadow-sm overflow-hidden", className)} {...props}>
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }) {
    return <div className={cn("px-6 py-5 border-b border-muted", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }) {
    return <h3 className={cn("text-lg font-bold text-foreground tracking-tight leading-none", className)} {...props}>{children}</h3>;
}

export function CardContent({ className, children, ...props }) {
    return <div className={cn("p-6", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }) {
    return <div className={cn("px-6 py-4 flex items-center bg-gray-50/50 border-t border-muted", className)} {...props}>{children}</div>;
}

export function CardDescription({ className, children, ...props }) {
    return <p className={cn("text-sm text-muted-foreground", className)} {...props}>{children}</p>;
}
