import React, { useState } from 'react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import {
  LayoutDashboard,
  ListFilter,
  Scaling,
  UtensilsCrossed,
  Sparkles,
  BarChart3,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Form';
import { SecondaryNavigation } from '../../components/ui/SecondaryNavigation';


// Import sub-components
import UpsellOverview from '../../components/upsell/UpsellOverview';
import UpsellRules from '../../components/upsell/UpsellRules';
import UpsellCombos from '../../components/upsell/UpsellCombos';
import UpsellMaestro from '../../components/upsell/UpsellMaestro';

export default function UpsellPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Define sidebar items
  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard, onClick: () => setActiveTab('overview'), isActive: activeTab === 'overview' },
    { id: 'maestro', label: 'Maestro', icon: Sparkles, onClick: () => setActiveTab('maestro'), isActive: activeTab === 'maestro' },
    { id: 'rules', label: 'Regras', icon: ListFilter, onClick: () => setActiveTab('rules'), isActive: activeTab === 'rules' },

    { id: 'combos', label: 'Combos', icon: UtensilsCrossed, onClick: () => setActiveTab('combos'), isActive: activeTab === 'combos' },
  ];


  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <UpsellOverview setActiveTab={setActiveTab} />;
      case 'rules': return <UpsellRules />;

      case 'combos': return <UpsellCombos />;
      case 'maestro': return <UpsellMaestro />;
      default: return <UpsellOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <ModuleLayout
      title="Upsell"
      subtitle="Maximize o ticket médio com sugestões inteligentes."
      actions={null}
    >
      <div className="mb-6">
        <SecondaryNavigation items={menuItems} />
      </div>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Content Area */}
        <div className="min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </ModuleLayout>
  );
}
