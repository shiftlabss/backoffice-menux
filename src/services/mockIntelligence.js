export const MOCK_FORECAST = {
  prediction_today: 4520.50,
  confidence_pct: 92,
  projected_final: 5100.00,
  vs_forecast_pct: 12
};

export const MOCK_INSIGHT = {
  id: 'insight-123',
  is_new: true,
  title: 'Oportunidade de Venda Cruzada',
  description: 'Clientes que pedem Hamburguer Artesanal tendem a pedir Refrigerante 50% das vezes.',
  full_description: 'Analisando os últimos 1000 pedidos, identificamos uma forte correlação entre o Hamburguer Artesanal e bebidas não alcoólicas. Promover essa combinação pode aumentar o ticket médio.',
  order_volume: 150,
  conversion_increase: 15,
  conversion_rate: 15, // Added to match likely schema
  impact_estimate: 'R$ 450,00 extra/mês' // Added to match likely schema
};

export const MOCK_KPIS = {
  ai_revenue: 1250.00,
  ai_revenue_pct: 25,
  ai_orders: 45,
  conversion_rate: 18.5,
  previous_period_comparison: {
    ai_revenue: '+12%',
    ai_orders: '+5%',
    conversion_rate: '+2.1%'
  }
};

export const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    type: 'Upsell',
    title: 'Sugerir Batata Frita Grande',
    entity: 'Hamburguer Artesanal',
    timestamp: new Date().toISOString(),
    status: 'Pendente',
    impact_estimate: '+ R$ 2,50 por pedido',
    context: 'Alta aceitação em dias chuvosos.'
  },
  {
    id: 2,
    type: 'Preço',
    title: 'Ajustar Preço de Pizza Média',
    entity: 'Pizza Calabresa',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'Aplicada',
    impact_estimate: '+ R$ 150,00 projetado',
    context: 'Preço abaixo da concorrência local.'
  },
  {
    id: 3,
    type: 'Estoque',
    title: 'Alerta de Estoque Baixo',
    entity: 'Cerveja Artesanal',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'Ignorada',
    impact_estimate: 'Risco de ruptura',
    context: 'Vendas acima da média hoje.'
  },
  {
    id: 4,
    type: 'Cross-sell',
    title: 'Sugerir Bebida',
    entity: 'Pizza Calabresa',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: 'Pendente',
    impact_estimate: '+ R$ 8,00 por pedido',
    context: 'Clientes compram juntos em 40% das vezes.'
  },
  {
    id: 5,
    type: 'Preço',
    title: 'Ajustar Preço',
    entity: 'Hamburguer Duplo',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    status: 'Aplicada',
    impact_estimate: '+ R$ 300,00 projetado',
    context: 'Margem de lucro baixa identificada.'
  }
];

export const MOCK_ALERTS = [
  {
    id: 1,
    type: 'Estoque Crítico',
    description: 'Bacon fatiado acabando',
    full_description: 'O estoque de Bacon Fatiado atingiu o nível crítico (10%). Previsão de acabar em 4 horas baseado no ritmo atual.',
    severity: 'Alta',
    status: 'Aberto',
    created_at: new Date().toISOString(),
    recommendation: 'Solicitar reposição emergencial ou pausar vendas de itens com Bacon.'
  },
  {
    id: 2,
    type: 'Demora na Cozinha',
    description: 'Tempo médio acima de 45min',
    full_description: 'O tempo médio de preparo subiu para 48 minutos na última hora. O padrão é 30 minutos.',
    severity: 'Média',
    status: 'Aberto',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    recommendation: 'Verificar estação de grelhas. Considerar pausar novos pedidos por 15min.'
  },
  {
    id: 3,
    type: 'Falha de Integração',
    description: 'Erro no iFood',
    full_description: 'Falha na sincronização de pedidos com iFood nos últimos 10 minutos.',
    severity: 'Alta',
    status: 'Resolvido',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    recommendation: 'Tentar reconexão manual no painel de integrações.'
  }
];

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Hamburguer Artesanal',
    category: 'Lanches',
    recommendations_count: 12,
    revenue_attributed: 4500.00,
    conversion_rate: 18.5
  },
  {
    id: 2,
    name: 'Batata Frita G',
    category: 'Acompanhamentos',
    recommendations_count: 8,
    revenue_attributed: 2100.50,
    conversion_rate: 22.1
  },
  {
    id: 3,
    name: 'Coca-Cola 2L',
    category: 'Bebidas',
    recommendations_count: 5,
    revenue_attributed: 1200.00,
    conversion_rate: 15.0
  },
  {
    id: 4,
    name: 'Pizza Calabresa',
    category: 'Pizzas',
    recommendations_count: 15,
    revenue_attributed: 8900.00,
    conversion_rate: 12.5
  },
  {
    id: 5,
    name: 'Combo Família',
    category: 'Combos',
    recommendations_count: 3,
    revenue_attributed: 3500.00,
    conversion_rate: 25.0
  }
];

export const getImpactData = (period = '30d') => {
  const is30d = period === '30d';
  const multiplier = is30d ? 1 : 0.25;
  const days = is30d ? 30 : 7;

  // Generate daily chart data
  const chartData = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return {
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      value: Math.floor(200 + Math.random() * 300) * (is30d ? 10 : 3) // Scale values based on period
    };
  });

  return {
    revenue_generated: 15420.50 * multiplier,
    revenue_pct: 18.5,
    ticket_with_ai: 85.50,
    ticket_without_ai: 72.10,
    chart_data: chartData,
    conversion_lift: 12.5
  };
};

export const getForecastData = () => {
  return { ...MOCK_FORECAST };
};

export const getInsightData = () => {
  return { ...MOCK_INSIGHT };
};

export const getKPIData = (period = '7d') => {
  const multiplier = period === '30d' ? 4 : period === 'today' ? 0.15 : 1;
  return {
    ai_revenue: MOCK_KPIS.ai_revenue * multiplier,
    ai_revenue_pct: MOCK_KPIS.ai_revenue_pct,
    ai_orders: Math.floor(MOCK_KPIS.ai_orders * multiplier),
    conversion_rate: MOCK_KPIS.conversion_rate,
    previous_period_comparison: MOCK_KPIS.previous_period_comparison
  };
};

export const getRecommendationsData = (filters = {}) => {
  let recs = [...MOCK_RECOMMENDATIONS];

  if (filters.status && filters.status !== 'all') {
    recs = recs.filter(r => r.status === filters.status);
  }

  if (filters.type && filters.type !== 'all') {
    recs = recs.filter(r => r.type === filters.type);
  }

  return recs;
};

export const getProductsData = () => {
  return [...MOCK_PRODUCTS];
};

export const getAlertsData = () => {
  return [...MOCK_ALERTS];
};

export const MOCK_KANBAN_DATA = {
  high: [
    {
      id: 'rec-k1',
      title: 'Sugerir Batata Frita Grande',
      type: 'upsell',
      target: 'Hamburguer Artesanal',
      moment: 'Pedido',
      channel: 'App',
      impact_order: '+ R$ 2,50',
      impact_day_est: '+ R$ 150,00',
      confidence_level: 'Alta',
      confidence_base: 450,
      execution_time: 2,
      evidence_text: '30% dos clientes aceitam quando ofertado.',
      requires_approval: false,
      priority: 'high'
    },
    {
      id: 'rec-k2',
      title: 'Sugerir Bebida',
      type: 'cross-sell',
      target: 'Pizza Calabresa',
      moment: 'Carrinho',
      channel: 'Site',
      impact_order: '+ R$ 8,00',
      impact_day_est: '+ R$ 320,00',
      confidence_level: 'Alta',
      confidence_base: 1200,
      execution_time: 5,
      evidence_text: 'Aumenta ticket médio em 15%.',
      requires_approval: true,
      priority: 'high'
    }
  ],
  medium: [
    {
      id: 'rec-k3',
      title: 'Combo Família',
      type: 'combo',
      target: 'Geral',
      moment: 'Cardápio',
      channel: 'Todos',
      impact_order: '+ R$ 15,00',
      impact_day_est: '+ R$ 450,00',
      confidence_level: 'Média',
      confidence_base: 120,
      execution_time: 10,
      evidence_text: 'Boa aceitação nos fins de semana.',
      requires_approval: false,
      priority: 'medium'
    },
    {
      id: 'rec-k4',
      title: 'Adicional de Bacon',
      type: 'upsell',
      target: 'X-Salada',
      moment: 'Pedido',
      channel: 'App',
      impact_order: '+ R$ 4,00',
      impact_day_est: '+ R$ 80,00',
      confidence_level: 'Média',
      confidence_base: 80,
      execution_time: 1,
      evidence_text: 'Item de alta margem.',
      requires_approval: false,
      priority: 'medium'
    }
  ],
  low: [
    {
      id: 'rec-k5',
      title: 'Promoção de Sobremesa',
      type: 'promo',
      target: 'Almoço',
      moment: 'Checkout',
      channel: 'Loja',
      impact_order: '+ R$ 12,00',
      impact_day_est: '+ R$ 60,00',
      confidence_level: 'Baixa',
      confidence_base: 30,
      execution_time: 15,
      evidence_text: 'Teste inicial em loja física.',
      requires_approval: true,
      priority: 'low'
    }
  ]
};
