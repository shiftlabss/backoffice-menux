import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ModuleLayout from '../components/layout/ModuleLayout';
import MaestroNavigation from '../components/maestro/MaestroNavigation';
import { intelligenceSidebarItems } from '../constants/intelligenceSidebar';

export default function IntelligenceLayout() {
  const location = useLocation();
  const currentItem = intelligenceSidebarItems.find(item =>
    location.pathname.startsWith(item.to)
  ) || intelligenceSidebarItems[0];

  return (
    <ModuleLayout
      title="Maestro"
      subtitle={currentItem?.subtitle || "Inteligência Artificial"}
      items={null} // No sidebar
    >
      <MaestroNavigation />
      <Outlet />
    </ModuleLayout>
  );
}
