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
  }
];
