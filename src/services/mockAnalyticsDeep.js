// Mock data for Deep Analytics Dashboard
// Context: Brazilian restaurant (Steakhouse/Premium)

export const DEEP_ANALYTICS_DATA = {
  // Row 1: Funnel & Conversion
  funnel: {
    views: 12500,
    clicks: 4800,
    adds: 1900,
    orders: 1450,
    ctr: {
      value: 38.4,
      trend: 2.1 // +2.1%
    },
    conversion: {
      value: 11.6,
      trend: -0.5 // -0.5%
    }
  },

  // Row 2: Journey
  journey: {
    avgTimeOnMenu: '4m 12s',
    itemsViewedPerSession: 8.5,
    categoryNavigation: [
      { name: 'Pratos Principais', value: 45 },
      { name: 'Entradas', value: 25 },
      { name: 'Bebidas', value: 20 },
      { name: 'Sobremesas', value: 10 }
    ],
    commonPaths: [
      { path: 'Entradas -> Pratos -> Bebidas', count: 450 },
      { path: 'Pratos -> Bebidas', count: 320 },
      { path: 'Promoções -> Pratos', count: 180 }
    ]
  },

  // Row 3: Smart Ranking & Gaps
  smartRanking: [
    { id: 1, name: 'Picanha Premium', category: 'Pratos', views: 1200, conversion: 15.5, revenue: 8500, score: 9.8, status: 'Estrela' },
    { id: 2, name: 'Gin Tônica', category: 'Bebidas', views: 800, conversion: 22.0, revenue: 4200, score: 9.5, status: 'Alta Conv.' },
    { id: 3, name: 'Batata Rústica', category: 'Entradas', views: 950, conversion: 8.5, revenue: 1200, score: 6.2, status: 'Atenção' },
    { id: 4, name: 'Petit Gateau', category: 'Sobremesas', views: 400, conversion: 18.0, revenue: 2100, score: 7.8, status: 'Oportunidade' },
    { id: 5, name: 'Risoto Funghi', category: 'Pratos', views: 600, conversion: 12.0, revenue: 3800, score: 8.0, status: 'Normal' },
  ],
  highInterestLowConv: [
    { name: 'Combo Família', views: 1500, conversion: 2.1, suggestion: 'Rever preço ou foto' },
    { name: 'Lagosta Grelhada', views: 800, conversion: 1.5, suggestion: 'Adicionar descrição detalhada' }
  ],
  highConvLowExposure: [
    { name: 'Brownie Duplo', views: 120, conversion: 25.0, suggestion: 'Mover para Destaques' },
    { name: 'Caipirinha Três Limões', views: 90, conversion: 28.0, suggestion: 'Criar banner promocional' }
  ],

  // Row 4: Financials
  ticketImpact: {
    withInteraction: 145.50,
    withoutInteraction: 89.90,
    lift: 61.8
  },
  upsellCombinations: [
    { item: 'Hambúrguer Artesanal', pair: 'Batata Rústica', frequency: 65 },
    { item: 'Picanha', pair: 'Cerveja Artesanal', frequency: 58 },
    { item: 'Parmegiana', pair: 'Coca-Cola', frequency: 82 }
  ],
  marginVolumeData: [
    { x: 10, y: 20, z: 100, name: 'Água' }, // Low Margin, High Vol
    { x: 80, y: 50, z: 200, name: 'Vinho' }, // High Margin, Med Vol
    { x: 40, y: 80, z: 400, name: 'Picanha' }, // Med Margin, High Vol
    { x: 90, y: 10, z: 50, name: 'Whisky' }, // High Margin, Low Vol
  ],

  // Row 5: Alerts & Actions
  alerts: [
    { type: 'critical', message: 'Queda brusca de conversão em Bebidas (-15%)', time: '2h atrás' },
    { type: 'warning', message: 'Tempo médio no cardápio subiu para 6m (possível confusão)', time: '4h atrás' },
  ],
  recommendedActions: [
    { action: 'Promover "Brownie Duplo" para Destaques', impact: 'Est. +R$ 1.200/mês' },
    { action: 'Adicionar fotos em 3 itens da categoria Entradas', impact: 'Est. +5% conversão' }
  ],

  // Row 6: Period Comparison
  periodHistory: [
    { name: 'Sem 1', views: 10000, orders: 1100 },
    { name: 'Sem 2', views: 11500, orders: 1250 },
    { name: 'Sem 3', views: 10800, orders: 1180 },
    { name: 'Sem 4', views: 12500, orders: 1450 },
  ]
};
