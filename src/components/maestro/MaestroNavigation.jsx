
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
  ) || intelligenceSidebarItems[0]; // Default to first if none matches (e.g. root)

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-muted-foreground">
        <span>Maestro</span>
        <span className="mx-1">/</span>
        <span className="font-medium text-foreground">{currentItem?.label || 'Visão Geral'}</span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto no-scrollbar">
        {intelligenceSidebarItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-200"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
