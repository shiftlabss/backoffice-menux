import React from 'react';
import { Outlet } from 'react-router-dom';
import ModuleLayout from '../components/layout/ModuleLayout';
import {
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Package,
  AlertTriangle,
  Settings
} from 'lucide-react';

export default function IntelligenceLayout() {
  const sidebarItems = [
    {
      label: 'Visão Geral',
      to: '/intelligence/overview',
      icon: LayoutDashboard,
      exact: true
    },
    {
      label: 'Recomendações',
      to: '/intelligence/recommendations',
      icon: Sparkles
    },
    {
      label: 'Impacto nas Vendas',
      to: '/intelligence/impact',
      icon: TrendingUp
    },
    {
      label: 'Produtos e Combos',
      to: '/intelligence/products',
      icon: Package
    },
    {
      label: 'Alertas e Operação',
      to: '/intelligence/alerts',
      icon: AlertTriangle
    },
    {
      label: 'Configurações da IA',
      to: '/intelligence/settings',
      icon: Settings
    }
  ];

  return (
    <ModuleLayout
      title="Menux Intelligence"
      subtitle="Central de inteligência e automação para o seu restaurante."
      items={sidebarItems}
    >
      <Outlet />
    </ModuleLayout>
  );
}
