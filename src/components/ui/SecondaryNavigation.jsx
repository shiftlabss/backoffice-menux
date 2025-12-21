import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

/**
 * @typedef {Object} NavigationItem
 * @property {string} label - Display label
 * @property {string} to - Target route path
 * @property {import('lucide-react').LucideIcon} [icon] - Optional icon
 * @property {string} [subtitle] - Optional subtitle (not visible in this compact view but useful for data)
 */

/**
 * Generic pill-shaped navigation tabs component.
 * @param {Object} props
 * @param {NavigationItem[]} props.items - Array of navigation items
 * @param {string} [props.className] - Additional classes
 */
export function SecondaryNavigation({ items, className }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={cn("flex items-center p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-xl border border-gray-200/50 w-full md:w-fit overflow-x-auto no-scrollbar shadow-inner", className)}>
      {items.map((item) => {
        // Support manual active state or auto-detect based on route
        const isActive = item.isActive !== undefined
          ? item.isActive
          : (item.to ? location.pathname.startsWith(item.to) : false);

        const Icon = item.icon;

        return (
          <button
            key={item.label || item.to}
            onClick={() => {
              if (item.onClick) item.onClick();
              if (item.to) navigate(item.to);
            }}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ease-out whitespace-nowrap outline-none focus:ring-2 focus:ring-purple-500/20 group",
              isActive
                ? "bg-white text-gray-900 shadow-sm shadow-gray-200 ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
            )}
          >
            {Icon && (
              <Icon
                size={16}
                className={cn(
                  "transition-colors duration-300",
                  isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"
                )}
              />
            )}

            {item.label}

            {isActive && (
              <span className="flex h-1.5 w-1.5 rounded-full bg-purple-500 ml-1.5 animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
}
