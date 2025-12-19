import {
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Package,
  AlertTriangle
} from 'lucide-react';

export const intelligenceSidebarItems = [
  {
    label: 'Visão Geral',
    subtitle: 'Resumo da operação',
    to: '/intelligence/overview',
    icon: LayoutDashboard,
    exact: true
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
    label: 'Recomendações',
    subtitle: 'Oportunidades de melhoria',
    to: '/intelligence/recommendations',
    icon: Sparkles
  },
  {
    label: 'Alertas e Operação',
    subtitle: 'Monitoramento em tempo real',
    to: '/intelligence/alerts',
    icon: AlertTriangle
  }
];
