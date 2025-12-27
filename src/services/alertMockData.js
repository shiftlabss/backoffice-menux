
// Helper to generate rich alert data for the new UI
// Covers the 10 required categories
export function generateMockAlerts() {
  return [
    {
      id: 'a1',
      type: 'Estoque e Ruptura',
      title: 'Risco de Ruptura: Filé Mignon',
      description: 'Estoque projetado para acabar em 2h baseado no ritmo atual.',
      impact: 'R$ 1.800 em vendas',
      severity: 'Crítica',
      area: 'Estoque',
      status: 'Aberto',
      time_relative: 'há 10 min',
      automatable: true,
      checklist: ['Verificar estoque físico da câmara fria', 'Pausar venda no app se confirmado', 'Acionar fornecedor de emergência'],
      meta: '10kg',
      current_value: '2.5kg'
    },
    {
      id: 'a2',
      type: 'Estoque e Ruptura',
      title: 'Baixa Rotatividade: Cerveja Artesanal X',
      description: 'Lote próximo do vencimento sem saída há 5 dias.',
      impact: 'Perda de estoque',
      severity: 'Média',
      area: 'Bar',
      status: 'Aberto',
      time_relative: 'há 2h',
      automatable: false,
      checklist: ['Criar promoção relâmpago', 'Oferecer como sugestão de harmonização', 'Bonificar equipe por venda']
    },
    {
      id: 'a3',
      type: 'Cozinha e Produção',
      title: 'Gargalo na Grelha',
      description: 'Tempo de espera excedeu 25min para pratos com carne.',
      impact: 'Atraso em 12 mesas',
      severity: 'Alta',
      area: 'Cozinha',
      status: 'Aberto',
      time_relative: 'há 5 min',
      automatable: false,
      checklist: ['Alocar auxiliar para grelha', 'Redistribuir pedidos para chapa', 'Oferecer entrada cortesia para mesas atrasadas']
    },
    {
      id: 'a4',
      type: 'Salão e Mesas',
      title: 'Mesa 12 sem consumo',
      description: 'Mesa ocupada há 45min sem novos pedidos após entrada.',
      impact: 'Giro de mesa travado',
      severity: 'Média',
      area: 'Salão',
      status: 'Aberto',
      time_relative: 'há 15 min',
      automatable: true,
      checklist: ['Oferecer carta de sobremesas', 'Verificar se clientes aguardam algo', 'Oferecer café de cortesia']
    },
    {
      id: 'a5',
      type: 'Salão e Mesas',
      title: '3 Mesas aguardando conta',
      description: 'Tempo médio de fechamento acima de 8min.',
      impact: 'Experiência negativa',
      severity: 'Alta',
      area: 'Salão',
      status: 'Em andamento',
      time_relative: 'há 8 min',
      automatable: false,
      checklist: ['Deslocar gerente para fechar contas', 'Levar maquininhas para área externa']
    },
    {
      id: 'a6',
      type: 'Pagamento e Caixa',
      title: 'Erro Integração TEF',
      description: 'Falha intermitente em pagamentos via cartão.',
      impact: 'Risco de não recebimento',
      severity: 'Crítica',
      area: 'Caixa',
      status: 'Aberto',
      time_relative: 'há 2 min',
      automatable: false,
      checklist: ['Reiniciar modem de internet', 'Testar conexão 4G de backup', 'Aceitar PIX/Dinheiro temporariamente']
    },
    {
      id: 'a7',
      type: 'Cardápio e Disponibilidade',
      title: 'Item sem foto: Promoção Dia',
      description: 'Novo combo ativado sem imagem cadastrada.',
      impact: '-40% na conversão',
      severity: 'Baixa',
      area: 'Sistema',
      status: 'Aberto',
      time_relative: 'há 1h',
      automatable: true,
      checklist: ['Tirar foto rápida ou usar banco de imagens', 'Desativar destaque até corrigir']
    },
    {
      id: 'a8',
      type: 'Experiência do Cliente',
      title: 'Reclamação de demora',
      description: 'Cliente na Mesa 05 reclamou de prato frio.',
      impact: 'Risco de detrator',
      severity: 'Alta',
      area: 'Salão',
      status: 'Aberto',
      time_relative: 'há 3 min',
      automatable: true, // e.g. send apologies coupon
      checklist: ['Ir à mesa imediatamente', 'Trocar prato sem custo', 'Oferecer voucher de retorno']
    },
    {
      id: 'a9',
      type: 'Segurança e Compliance',
      title: 'Cancelamento excessivo',
      description: 'Garçom João realizou 5 cancelamentos em 30min.',
      impact: 'Possível fraude',
      severity: 'Crítica',
      area: 'Caixa',
      status: 'Aberto',
      time_relative: 'há 30 min',
      automatable: false,
      checklist: ['Auditar cancelamentos no sistema', 'Conversar com colaborador', 'Conferir estoque de itens cancelados']
    },
    {
      id: 'a10',
      type: 'Atendimento e Fila',
      title: 'Fila de espera (12 grupos)',
      description: 'Tempo estimado subiu para 45min.',
      impact: 'Desistência de clientes',
      severity: 'Média',
      area: 'Hostess',
      status: 'Aberto',
      time_relative: 'há 20 min',
      automatable: true,
      checklist: ['Servir bebidas na fila', 'Abrir mesas na área de eventos', 'Estimular pedidos no balcão']
    },
    {
      id: 'a11',
      type: 'Bar e Bebidas',
      title: 'Chopp Quente',
      description: 'Temperatura do barril acima de 4°C.',
      impact: 'Qualidade do produto',
      severity: 'Alta',
      area: 'Bar',
      status: 'Aberto',
      time_relative: 'há 5 min',
      automatable: false,
      checklist: ['Verificar refrigeração da chopeira', 'Testar extração', 'Pausar venda de chopp']
    },
    {
      id: 'a12',
      type: 'Sistema e Integrações',
      title: 'Delivery Offline',
      description: 'Integração iFood não respondendo.',
      impact: 'Perda de pedidos externos',
      severity: 'Crítica',
      area: 'Sistema',
      status: 'Resolvido',
      time_relative: 'há 3h',
      automatable: true,
      checklist: ['Verificar status do iFood', 'Reiniciar integrador']
    }
  ];
}
