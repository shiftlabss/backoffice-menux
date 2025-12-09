
import React from 'react';
import { cn } from '../../lib/utils';

export function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-[#E5E5E5]", className)}
            {...props}
        />
    );
}
