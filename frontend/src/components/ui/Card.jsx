
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
