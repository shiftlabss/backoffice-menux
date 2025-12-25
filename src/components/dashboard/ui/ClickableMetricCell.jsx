import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../../ui/Tooltip';
import { cn } from '../../../lib/utils';

export function ClickableMetricCell({
  onClick,
  children,
  tooltip = "Ver detalhes",
  className
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          className={cn(
            "group relative w-full h-full p-4 cursor-pointer transition-all duration-160",
            "hover:bg-slate-50 outline-none focus:bg-slate-50",
            className
          )}
        >
          {/* Hover Affordance Icon */}
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ArrowUpRight size={10} className="text-slate-400" />
          </div>

          {/* Content */}
          <div className="w-full h-full flex flex-col justify-center">
            {children}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-[10px] font-medium">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
