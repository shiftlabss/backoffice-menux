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
      useWindowScroll={true}
      actions={null}
    >
      <div className="mb-6">
        <MaestroTabs />
      </div>
      <Outlet context={{ dateRange }} />
    </ModuleLayout>
  );
}
