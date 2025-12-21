import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import ModuleLayout from '../components/layout/ModuleLayout';
import { MaestroTabs } from '../components/maestro/MaestroNavigation';
import { intelligenceSidebarItems } from '../constants/intelligenceSidebar';

export default function IntelligenceLayout() {
  const location = useLocation();
  const currentItem = intelligenceSidebarItems.find(item =>
    location.pathname.startsWith(item.to)
  ) || intelligenceSidebarItems[0];

  const [dateRange, setDateRange] = React.useState('today');

  return (
    <ModuleLayout
      title={currentItem.label}
      subtitle={currentItem.subtitle}
      items={null} // No sidebar
      actions={
        <div className="flex bg-gray-100/50 p-1 rounded-lg border border-gray-200/50">
          {['Hoje', 'Ontem', '7 dias', '30 dias'].map((label, index) => {
            const id = ['today', 'yesterday', '7d', '30d'][index];
            return (
              <button
                key={id}
                onClick={() => setDateRange(id)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                  dateRange === id
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      }
    >
      <div className="mb-6">
        <MaestroTabs />
      </div>
      <Outlet context={{ dateRange }} />
    </ModuleLayout>
  );
}
