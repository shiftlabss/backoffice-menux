
import { subDays, subHours, format, addMinutes } from 'date-fns';

// --- Helpers ---
const generateSeries = (points, base, volatility) => {
  return Array.from({ length: points }, (_, i) => ({
    timestamp: subHours(new Date(), points - i).toISOString(),
    value: Math.max(0, Math.floor(base + (Math.random() - 0.5) * volatility)),
    comparison: Math.max(0, Math.floor(base * 0.9 + (Math.random() - 0.5) * volatility)),
  }));
};

// --- Mock Data ---

export const MOCK_PULSE = {
  activeSessions: {
    current: 124,
    trend: 'up',
    series: generateSeries(12, 100, 30)
  },
  ordersInProgress: {
    current: 18,
    trend: 'stable',
    series: generateSeries(12, 15, 5)
  },
  avgDecisionTime: {
    current: '2m 15s',
    trend: 'down', // good
    value: 135, // seconds
    comparison: 150
  },
  cartRate: {
    current: '28%',
    trend: 'up',
    value: 28,
    comparison: 24
  },
  checkoutRate: {
    current: '12%',
    trend: 'stable',
    value: 12,
    comparison: 11
  },
  alerts: [
    { id: 1, type: 'warning', message: 'Queda de conv. no Delivery (Chuva)', metric: '-15%' },
    { id: 2, type: 'info', message: 'Alta demanda em Bebidas', metric: '+22%' }
  ]
};

export const MOCK_KPIS = [
  {
    id: 'revenue',
    label: 'Faturamento',
    value: 'R$ 12.450',
    trend: 12.5,
    trendType: 'up', // or 'down', 'neutral'
    definition: 'Vendas brutas finalizadas no período selecionado.'
  },
  {
    id: 'orders',
    label: 'Pedidos',
    value: '185',
    trend: 5.2,
    trendType: 'up',
    definition: 'Total de pedidos concluídos.'
  },
  {
    id: 'ticket',
    label: 'Ticket Médio',
    value: 'R$ 67,30',
    trend: 2.1,
    trendType: 'up',
    definition: 'Faturamento dividido pelo número de pedidos.'
  },
  {
    id: 'conversion',
    label: 'Conv. Geral',
    value: '18.5%',
    trend: -1.2,
    trendType: 'down',
    definition: 'Sessões que resultaram em pedido.'
  },
  {
    id: 'cart_adds',
    label: 'Adições Carrinho',
    value: '450',
    trend: 8.5,
    trendType: 'up',
    definition: 'Total de itens adicionados aos carrinhos.'
  },
  {
    id: 'maestro_revenue',
    label: 'Receita IA',
    value: 'R$ 3.240',
    trend: 15.0,
    trendType: 'up',
    definition: 'Receita atribuída a sugestões do Maestro.'
  },
  {
    id: 'maestro_acceptance',
    label: 'Aceite IA',
    value: '22%',
    trend: 0.5,
    trendType: 'stable',
    definition: 'Taxa de sugestões aceitas sobre exibidas.'
  },
  {
    id: 'decision_time',
    label: 'Tempo Decisão',
    value: '4m 12s',
    trend: -5.0,
    trendType: 'up', // less time is usually good/neutral depending on context, assuming efficiency here
    definition: 'Tempo médio entre abrir cardápio e finalizar pedido.'
  }
];

export const MOCK_MAIN_CHART = {
  sessions: generateSeries(24, 200, 50).map((p, i) => ({ ...p, name: `${i}h` })),
  orders: generateSeries(24, 25, 10).map((p, i) => ({ ...p, name: `${i}h` })),
  revenue: generateSeries(24, 1500, 400).map((p, i) => ({ ...p, name: `${i}h` })),
};

export const MOCK_DIAGNOSIS = {
  bottleneck: {
    stage: 'Carrinho > Checkout',
    dropoff: '45%',
    lostRevenue: 'R$ 1.250',
    action: 'Ver Funil'
  },
  starItem: {
    name: 'Combo Família',
    metric: 'R$ 4.500',
    label: 'Maior Receita',
    action: 'Ver Item'
  },
  problemItem: {
    name: 'Salada Ceasar',
    metric: '-20%',
    label: 'Queda Conversão',
    action: 'Ver Item'
  }
};

export const MOCK_FUNNEL = [
  { step: 'Sessão Iniciada', value: 2500, passRate: '100%', dropoff: 0, avgTime: '0s' },
  { step: 'Cardápio Aberto', value: 2450, passRate: '98%', dropoff: '2%', avgTime: '2s' },
  { step: 'Item Visto', value: 2100, passRate: '85%', dropoff: '15%', avgTime: '45s' },
  { step: 'Item Engajado', value: 1600, passRate: '76%', dropoff: '24%', avgTime: '1m 20s' },
  { step: 'Add ao Carrinho', value: 950, passRate: '59%', dropoff: '41%', avgTime: '2m 10s' },
  { step: 'Checkout Iniciado', value: 600, passRate: '63%', dropoff: '37%', avgTime: '3m 45s' },
  { step: 'Pedido Finalizado', value: 520, passRate: '86%', dropoff: '14%', avgTime: '4m 30s' },
];

export const MOCK_DROPOFF_PATTERNS = [
  { id: 1, pattern: 'Muitos itens vistos, nenhum engajamento', count: 150, revenueRisk: 'R$ 800', topChannel: 'Salão' },
  { id: 2, pattern: 'Abandono no pagamento (Pix)', count: 45, revenueRisk: 'R$ 1.200', topChannel: 'Delivery' }
];

export const MOCK_CATEGORIES = [
  { id: 1, name: 'Lanches', sessions: 1200, itemsViewed: 3500, cartAdds: 450, orders: 380, conversion: '31%', revenue: 'R$ 12.500' },
  { id: 2, name: 'Bebidas', sessions: 1800, itemsViewed: 2200, cartAdds: 900, orders: 850, conversion: '47%', revenue: 'R$ 6.200' },
  { id: 3, name: 'Sobremesas', sessions: 600, itemsViewed: 900, cartAdds: 150, orders: 120, conversion: '20%', revenue: 'R$ 2.400' },
];

export const MOCK_ITEMS = [
  { id: 101, name: 'X-Burger Clássico', category: 'Lanches', impressions: 1500, views: 800, engagements: 600, cartAdds: 300, orders: 250, conversion: '31%', revenue: 'R$ 7.500', status: 'Ativo' },
  { id: 102, name: 'Coca-Cola Lata', category: 'Bebidas', impressions: 2000, views: 500, engagements: 450, cartAdds: 400, orders: 380, conversion: '76%', revenue: 'R$ 2.200', status: 'Ativo' },
  { id: 103, name: 'Pudim', category: 'Sobremesas', impressions: 500, views: 200, engagements: 100, cartAdds: 50, orders: 40, conversion: '20%', revenue: 'R$ 600', status: 'Baixo Estoque' },
];

export const MOCK_MAESTRO_RULES = [
  { id: 1, name: 'Upsell Batata Grande', type: 'Upsell', trigger: 'Add X-Burger', status: 'Active', performance: '+15% Ticket', channel: 'Todos' },
  { id: 2, name: 'Cross-sell Bebida', type: 'Cross-sell', trigger: 'Checkout sem bebida', status: 'Active', performance: '+8% Conv.', channel: 'Delivery' },
  { id: 3, name: 'Happy Hour Preços', type: 'Preço', trigger: 'Horário 18h-20h', status: 'Paused', performance: '-', channel: 'Salão' },
];

export const analyticsService = {
  getOverview: async () => {
    await new Promise(r => setTimeout(r, 600)); // Simulate latency
    return {
      pulse: MOCK_PULSE,
      kpis: MOCK_KPIS,
      chart: MOCK_MAIN_CHART,
      diagnosis: MOCK_DIAGNOSIS
    };
  },
  getFunnel: async () => {
    await new Promise(r => setTimeout(r, 500));
    return {
      stages: MOCK_FUNNEL,
      patterns: MOCK_DROPOFF_PATTERNS
    };
  },
  getItems: async () => {
    await new Promise(r => setTimeout(r, 500));
    return {
      categories: MOCK_CATEGORIES,
      items: MOCK_ITEMS
    };
  },
  getMaestro: async () => {
    await new Promise(r => setTimeout(r, 400));
    return {
      rules: MOCK_MAESTRO_RULES
    };
  }
};
