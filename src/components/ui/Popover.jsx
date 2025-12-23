import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

const PopoverContext = createContext({
  open: false,
  setOpen: () => { },
});

export function Popover({ children }) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block" ref={popoverRef}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children, asChild }) {
  const { open, setOpen } = useContext(PopoverContext);

  const handleClick = (e) => {
    // e.stopPropagation();
    setOpen(!open);
    if (children.props.onClick) children.props.onClick(e);
  };

  if (asChild) {
    return React.cloneElement(children, {
      onClick: handleClick,
      "data-state": open ? "open" : "closed",
    });
  }

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}

export function PopoverContent({ children, align = 'center', className }) {
  const { open } = useContext(PopoverContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-140",
        align === 'start' ? "left-0" : align === 'end' ? "right-0" : "left-1/2 -translate-x-1/2",
        className
      )}
    >
      {children}
    </div>
  );
}
