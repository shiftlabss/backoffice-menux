import React, { useState } from 'react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import {
  LayoutDashboard,
  ListFilter,
  Scaling,
  UtensilsCrossed,
  Sparkles,
  BarChart3
} from 'lucide-react';

// Import sub-components
import UpsellOverview from '../../components/upsell/UpsellOverview';
import UpsellRules from '../../components/upsell/UpsellRules';
import UpsellSize from '../../components/upsell/UpsellSize';
import UpsellCombos from '../../components/upsell/UpsellCombos';
import UpsellMaestro from '../../components/upsell/UpsellMaestro';
import UpsellReports from '../../components/upsell/UpsellReports';

export default function UpsellPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard, onClick: () => setActiveTab('overview') },
    { id: 'rules', label: 'Regras', icon: ListFilter, onClick: () => setActiveTab('rules') },
    { id: 'size', label: 'Tamanhos', icon: Scaling, onClick: () => setActiveTab('size') },
    { id: 'combos', label: 'Combos', icon: UtensilsCrossed, onClick: () => setActiveTab('combos') },
    { id: 'maestro', label: 'Maestro', icon: Sparkles, onClick: () => setActiveTab('maestro') },
    { id: 'reports', label: 'Relatórios', icon: BarChart3, onClick: () => setActiveTab('reports') },
  ].map(item => ({ ...item, isActive: activeTab === item.id }));

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <UpsellOverview />;
      case 'rules': return <UpsellRules />;
      case 'size': return <UpsellSize />;
      case 'combos': return <UpsellCombos />;
      case 'maestro': return <UpsellMaestro />;
      case 'reports': return <UpsellReports />;
      default: return <UpsellOverview />;
    }
  };

  return (
    <ModuleLayout
      title="Upsell & Cross-sell"
      subtitle="Gerencie suas estratégias de venda e aumente o ticket médio."
      items={menuItems}
    >
      <div className="animate-in fade-in space-y-6">
        {renderContent()}
      </div>
    </ModuleLayout>
  );
}
