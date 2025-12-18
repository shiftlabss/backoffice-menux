import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Sparkles, ArrowRight, TrendingUp, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function UpsellMaestro() {
  const suggestions = [
    {
      id: 1,
      type: 'Combo',
      title: 'Combo de Almoço Executivo',
      description: 'Seus pratos executivos têm alta saída entre 11h e 14h, mas baixo ticket médio. Crie um combo com bebida e sobremesa "mini" para aumentar o ticket em 25%.',
      impact: 'Alto Impacto',
      projectedRevenue: '+ R$ 2.400/mês',
      tags: ['Aumentar Ticket', 'Almoço'],
      color: 'purple'
    },
    {
      id: 2,
      type: 'Harmonização',
      title: 'Vinhos para Carnes',
      description: 'A "Picanha na Brasa" é seu item mais vendido. Sugira o vinho "Malbec Argentino" automaticamente quando ela for adicionada ao carrinho.',
      impact: 'Médio Impacto',
      projectedRevenue: '+ R$ 1.800/mês',
      tags: ['Cross-sell', 'Vinhos'],
      color: 'red'
    },
    {
      id: 3,
      type: 'Tamanho',
      title: 'Upsell de Sucos',
      description: '80% dos clientes pedem suco de 300ml. A margem no de 500ml é 40% maior. Ative a sugestão de upgrade por +R$ 4,00.',
      impact: 'Alto Impacto',
      projectedRevenue: '+ R$ 900/mês',
      tags: ['Margem', 'Bebidas'],
      color: 'green'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Sparkles className="text-yellow-400 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Maestro AI</h2>
          </div>
          <p className="text-purple-100 text-lg leading-relaxed mb-8">
            Analisei seus dados de vendas dos últimos 30 dias. Encontrei 3 oportunidades que podem gerar
            <strong className="text-white"> R$ 5.100 extras</strong> em receita mensal com otimizações simples.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-purple-900 hover:bg-gray-100 border-none font-bold px-6">
              Aplicar Todas as Sugestões
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Ver Relatório Completo
            </Button>
          </div>
        </div>
      </div>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {suggestions.map((card, i) => (
          <Card key={card.id} className="flex flex-col h-full border-t-4 hover:shadow-lg transition-shadow" style={{ borderTopColor: card.color === 'purple' ? '#9333ea' : card.color === 'red' ? '#dc2626' : '#16a34a' }}>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                  {card.type}
                </Badge>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${card.impact === 'Alto Impacto' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {card.impact}
                </span>
              </div>

              <h3 className="font-bold text-xl text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {card.description}
              </p>

              <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <TrendingUp size={18} className="text-green-600" />
                <span className="font-bold text-gray-900">{card.projectedRevenue}</span>
                <span className="text-xs text-gray-500">projecão</span>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-2">
              <Button className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600 shadow-sm" size="sm">
                <XCircle size={16} className="mr-2" /> Ignorar
              </Button>
              <Button className="flex-1 bg-gray-900 text-white hover:bg-black shadow-sm" size="sm">
                <CheckCircle2 size={16} className="mr-2" /> Aplicar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* History */}
      <div className="pt-8 border-t border-gray-200">
        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="text-gray-400" /> Histórico de Sugestões
        </h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Sugestão</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4 text-gray-500">12 Dez</td>
                <td className="px-6 py-4 font-medium">Adicionar "Bebida" ao Comprar Lanche</td>
                <td className="px-6 py-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold">Aplicada</span></td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">+ R$ 450,00</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-500">05 Dez</td>
                <td className="px-6 py-4 font-medium">Combo Família no Domingo</td>
                <td className="px-6 py-4"><span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs font-bold">Ignorada</span></td>
                <td className="px-6 py-4 text-right text-gray-400">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
