import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight, Check } from 'lucide-react';

const DropdownMenuContext = createContext({
  open: false,
  setOpen: () => { },
});

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left" ref={menuRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = ({ children, asChild, className }) => {
  const { open, setOpen } = useContext(DropdownMenuContext);

  const handleClick = (e) => {
    // e.stopPropagation();
    setOpen(!open);
    if (children.props.onClick) children.props.onClick(e);
  };

  if (asChild) {
    return React.cloneElement(children, {
      onClick: handleClick,
      "data-state": open ? "open" : "closed",
      className: cn(children.props.className, className)
    });
  }

  return (
    <button
      onClick={handleClick}
      className={cn("inline-flex justify-center w-full", className)}
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({ children, align = 'center', className }) => {
  const { open } = useContext(DropdownMenuContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-100",
        align === 'start' ? "left-0" : align === 'end' ? "right-0" : "left-1/2 -translate-x-1/2",
        className
      )}
    >
      <div className="py-1" role="menu" aria-orientation="vertical">
        {children}
      </div>
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick, className }) => {
  const { setOpen } = useContext(DropdownMenuContext);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    setOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer",
        className
      )}
      role="menuitem"
    >
      {children}
    </button>
  );
};

export const DropdownMenuLabel = ({ children, className }) => (
  <div className={cn("px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider", className)}>
    {children}
  </div>
);

export const DropdownMenuSeparator = ({ className }) => (
  <div className={cn("h-px bg-slate-200 my-1", className)} />
);

export const DropdownMenuCheckboxItem = ({ children, checked, onCheckedChange, className }) => {
  const { setOpen } = useContext(DropdownMenuContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (onCheckedChange) onCheckedChange(!checked);
    // Do not close on checkbox click usually, but can toggle behavior
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <div className={cn("opacity-0 transition-opacity", checked && "opacity-100")}>
          <Check className="h-4 w-4" />
        </div>
      </span>
      {children}
    </div>
  );
}

export default DropdownMenu;
