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
      subtitle: 'Resumo da operação',
      to: '/intelligence/overview',
      icon: LayoutDashboard,
      exact: true
    },
    {
      label: 'Recomendações',
      subtitle: 'Oportunidades de melhoria',
      to: '/intelligence/recommendations',
      icon: Sparkles
    },
    {
      label: 'Impacto nas Vendas',
      subtitle: 'Análise de conversão',
      to: '/intelligence/impact',
      icon: TrendingUp
    },
    {
      label: 'Produtos e Combos',
      subtitle: 'Performance do cardápio',
      to: '/intelligence/products',
      icon: Package
    },
    {
      label: 'Alertas e Operação',
      subtitle: 'Monitoramento em tempo real',
      to: '/intelligence/alerts',
      icon: AlertTriangle
    },
    {
      label: 'Configurações da IA',
      subtitle: 'Personalize seu assistente',
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
