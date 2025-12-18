import React, { useState } from 'react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import ReportsFilterBar from '../../components/reports/ReportsFilterBar';
import MaestroInsights from '../../components/reports/MaestroInsights';
import {
  LayoutDashboard,
  DollarSign,
  ShoppingBag,
  Package,
  TrendingUp,
  Wine,
  Clock,
  Download
} from 'lucide-react';

// Import Tabs (will be lazy loaded or imported from index later)
import {
  ReportsOverview,
  ReportsSales,
  ReportsOrders,
  ReportsProducts,
  ReportsUpsell,
  ReportsWines,
  ReportsOperations,
  ReportsExports
} from '../../components/reports/ReportsTabs';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'sales', label: 'Vendas', icon: DollarSign },
    { id: 'orders', label: 'Pedidos', icon: ShoppingBag },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'upsell', label: 'Upsell', icon: TrendingUp },
    { id: 'wines', label: 'Vinhos', icon: Wine },
    { id: 'operations', label: 'Operação', icon: Clock },
    { id: 'exports', label: 'Exportações', icon: Download },
  ].map(item => ({
    ...item,
    onClick: () => setActiveTab(item.id),
    isActive: activeTab === item.id
  }));

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <ReportsOverview />;
      case 'sales': return <ReportsSales />;
      case 'orders': return <ReportsOrders />;
      case 'products': return <ReportsProducts />;
      case 'upsell': return <ReportsUpsell />;
      case 'wines': return <ReportsWines />;
      case 'operations': return <ReportsOperations />;
      case 'exports': return <ReportsExports />;
      default: return <ReportsOverview />;
    }
  }

  return (
    <ModuleLayout
      title="Relatórios" // Fixed: Was "Relatórios", now matches standard header
      subtitle={`Última atualização: Hoje, 10:45`} // Moved subtitle here
      items={tabs}
    >
      <div className="space-y-6 animate-in fade-in">
        <ReportsFilterBar />

        {/* Global Maestro Insights for the current context can be passed here or inside tabs */}
        {/* renderContent will typically include context-specific Maestro Blocks */}

        {renderContent()}
      </div>
    </ModuleLayout>
  );
}
