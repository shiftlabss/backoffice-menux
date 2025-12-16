import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import {
  TrendingUp,
  Target,
  DollarSign,
  Zap,
  Plus,
  ArrowDownToLine,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function UpsellOverview({ setActiveTab }) {
  // Mock Data
  const KPIs = [
    {
      label: 'Regras Ativas',
      value: '12',
      trend: '+2 essa semana',
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      action: () => setActiveTab && setActiveTab('rules')
    },
    {
      label: 'Conversão',
      value: '18.5%',
      trend: '+1.2%',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
      action: () => setActiveTab && setActiveTab('reports')
    },
    {
      label: 'Receita Incremental',
      value: 'R$ 3.850',
      trend: '+15%',
      icon: DollarSign,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      action: () => setActiveTab && setActiveTab('reports')
    },
  ];

  const topItems = [
    { name: 'Batata Frita M -> G', views: 450, conversion: '22%', revenue: 'R$ 900', type: 'Tamanho' },
    { name: 'Coca-Cola -> 500ml', views: 320, conversion: '18%', revenue: 'R$ 450', type: 'Upsell' },
    { name: 'Hambúrguer -> Combo', views: 210, conversion: '15%', revenue: 'R$ 1.200', type: 'Combo' },
    { name: 'Vinho Tinto -> + Queijo', views: 180, conversion: '12%', revenue: 'R$ 680', type: 'Cross-sell' },
    { name: 'Café -> + Petit Gateau', views: 150, conversion: '28%', revenue: 'R$ 600', type: 'Cross-sell' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. KPIs Section - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KPIs.map((kpi, index) => (
          <button
            key={index}
            onClick={kpi.action}
            className="text-left w-full group focus:outline-none"
          >
            <Card className="p-6 flex items-center justify-between hover:shadow-md transition-all border border-gray-100 group-hover:border-gray-300">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-gray-700">{kpi.label}</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-black">{kpi.value}</h3>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                  {kpi.trend}
                </span>
              </div>
              <div className={`p-4 rounded-2xl ${kpi.bg} transition-colors group-hover:bg-opacity-80`}>
                <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
              </div>
            </Card>
          </button>
        ))}
      </div>

      {/* 2. Actions & Top Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-[#0F172A] text-white border-none shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold">Ações Rápidas</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Otimize seu cardápio com estratégias de upsell inteligentes.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setActiveTab && setActiveTab('rules')}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 border-none justify-start gap-3 h-12 font-semibold"
              >
                <Plus size={18} />
                Criar Nova Regra
              </Button>
              <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800 text-white justify-start gap-3 h-12">
                <ArrowDownToLine size={18} />
                Importar Template
              </Button>
              <Button
                onClick={() => setActiveTab && setActiveTab('maestro')}
                variant="outline"
                className="w-full border-gray-700 hover:bg-gray-800 text-white justify-start gap-3 h-12 group"
              >
                <Zap size={18} className="text-yellow-400 group-hover:text-yellow-300" />
                Aplicar Sugestão Maestro
              </Button>
            </div>
          </Card>

          {/* Mini Insight */}
          <Card className="p-6 border-l-4 border-l-yellow-400 bg-yellow-50/50">
            <h4 className="font-bold text-yellow-900 flex items-center gap-2">
              <Zap size={16} className="text-yellow-600" />
              Dica do Maestro
            </h4>
            <p className="text-sm text-yellow-800 mt-2 leading-relaxed">
              Itens como <strong>Sobremesas</strong> têm <strong>40% mais conversão</strong> quando sugeridos após o prato principal ao invés do início.
            </p>
            <Button
              variant="link"
              className="text-yellow-700 hover:text-yellow-900 p-0 h-auto mt-3 text-xs font-semibold"
              onClick={() => setActiveTab && setActiveTab('maestro')}
            >
              Ver mais dicas &rarr;
            </Button>
          </Card>
        </div>

        {/* Top Performing Rules */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Itens Mais Sugeridos</h3>
                <p className="text-xs text-gray-500 mt-1">Regras com maior volume de visualizações nos últimos 7 dias</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => setActiveTab && setActiveTab('reports')}>
                  <Filter size={14} className="mr-2" /> Filtrar
                </Button>
                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50" onClick={() => setActiveTab && setActiveTab('reports')}>
                  Ver todos <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
            <div className="flex-1 p-0 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Regra</th>
                    <th className="px-6 py-4 font-semibold">Tipo</th>
                    <th className="px-6 py-4 font-semibold">Views</th>
                    <th className="px-6 py-4 font-semibold">Conversão</th>
                    <th className="px-6 py-4 font-semibold text-right">Receita</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topItems.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => setActiveTab && setActiveTab('rules')}>
                      <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{item.views}</td>
                      <td className="px-6 py-4">
                        <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-100 px-2">
                          {item.conversion}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">{item.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
