
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { intelligenceSidebarItems } from '../../constants/intelligenceSidebar';

export default function MaestroNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Find current active item for breadcrumb
  const currentItem = intelligenceSidebarItems.find(item =>
    location.pathname.startsWith(item.to)
  ) || intelligenceSidebarItems[0];

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Breadcrumb - More premium styling */}
      <div className="flex items-center text-xs font-medium text-muted-foreground/80 tracking-wide uppercase">
        <span className="hover:text-foreground/80 transition-colors cursor-default">Maestro</span>
        <span className="mx-2 text-border">/</span>
        <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100/50">{currentItem?.label || 'Visão Geral'}</span>
      </div>

      {/* Tabs - Premium Segmented Control / Floating Tabs Style */}
      <div className="flex items-center p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-xl border border-gray-200/50 w-full md:w-fit overflow-x-auto no-scrollbar shadow-inner">
        {intelligenceSidebarItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          const Icon = item.icon;

          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ease-out whitespace-nowrap outline-none focus:ring-2 focus:ring-purple-500/20 group",
                isActive
                  ? "bg-white text-gray-900 shadow-sm shadow-gray-200 ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
              )}
            >
              {/* Icon with animated color transition */}
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

              {/* Verified badge for active state (optional deluxe touch) */}
              {isActive && (
                <span className="flex h-1.5 w-1.5 rounded-full bg-purple-500 ml-1.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
