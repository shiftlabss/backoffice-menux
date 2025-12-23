import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Checkbox = React.forwardRef(({ className, checked, disabled, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        className="peer h-4 w-4 opacity-0 absolute inset-0 cursor-pointer disabled:cursor-not-allowed"
        ref={ref}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <div className={cn(
        "h-4 w-4 rounded border border-slate-300 bg-white flex items-center justify-center transition-all",
        "peer-focus:ring-2 peer-focus:ring-slate-900 peer-focus:ring-offset-2",
        "peer-checked:bg-slate-900 peer-checked:border-slate-900",
        "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
        className
      )}>
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";
