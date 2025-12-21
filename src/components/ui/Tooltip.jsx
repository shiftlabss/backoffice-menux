
import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils'; // Adjust path if needed

const TooltipContext = createContext({});

export function TooltipProvider({ children }) {
  return <>{children}</>;
}

export function Tooltip({ children, delayDuration = 200 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const show = () => {
    const id = setTimeout(() => setIsVisible(true), delayDuration);
    setTimeoutId(id);
  };

  const hide = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <TooltipContext.Provider value={{ isVisible, show, hide }}>
      <div className="relative inline-block" onMouseEnter={show} onMouseLeave={hide}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children, asChild }) {
  // Simple pass-through since the wrapper handles events, 
  // or we can attach events here if we want more control.
  // For simplicity, the Tooltip wrapper handles hover.
  return <>{children}</>;
}

export function TooltipContent({ children, className, side = 'top' }) {
  const { isVisible } = useContext(TooltipContext);

  if (!isVisible) return null;

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className={cn(
      "absolute z-50 overflow-hidden rounded-md border bg-slate-900 px-3 py-1.5 text-xs text-slate-50 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 whitespace-nowrap",
      positions[side] || positions.top,
      className
    )}>
      {children}
    </div>
  );
}
