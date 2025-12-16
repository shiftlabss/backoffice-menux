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
  ArrowRight
} from 'lucide-react';

export default function UpsellOverview() {
  // Mock Data
  const KPIs = [
    { label: 'Regras Ativas', value: '12', trend: '+2 this week', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Conversão', value: '18.5%', trend: '+1.2%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Receita Incremental', value: 'R$ 3.850', trend: '+15%', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const topItems = [
    { name: 'Batata Frita M -> G', views: 450, conversion: '22%', revenue: 'R$ 900' },
    { name: 'Coca-Cola -> 500ml', views: 320, conversion: '18%', revenue: 'R$ 450' },
    { name: 'Hambúrguer -> Combo', views: 210, conversion: '15%', revenue: 'R$ 1.200' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KPIs.map((kpi, index) => (
          <Card key={index} className="p-6 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{kpi.label}</p>
              <h3 className="text-3xl font-bold text-gray-900">{kpi.value}</h3>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                {kpi.trend}
              </span>
            </div>
            <div className={`p-4 rounded-2xl ${kpi.bg}`}>
              <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* 2. Actions & Top Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-none">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold">Ações Rápidas</h3>
            </div>
            <p className="text-purple-100 text-sm mb-6">
              Otimize seu cardápio com estratégias de upsell inteligentes.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-white text-purple-900 hover:bg-gray-100 border-none justify-start gap-3">
                <Plus size={18} />
                Criar Nova Regra
              </Button>
              <Button variant="outline" className="w-full border-purple-700 hover:bg-purple-800 text-white justify-start gap-3">
                <ArrowDownToLine size={18} />
                Importar Template
              </Button>
              <Button variant="outline" className="w-full border-purple-700 hover:bg-purple-800 text-white justify-start gap-3">
                <Zap size={18} />
                Aplicar Sugestão Maestro
              </Button>
            </div>
          </Card>

          {/* Mini Insight */}
          <Card className="p-6 border-l-4 border-l-yellow-400 bg-yellow-50">
            <h4 className="font-bold text-yellow-800 flex items-center gap-2">
              <Zap size={16} />
              Dica do Maestro
            </h4>
            <p className="text-sm text-yellow-700 mt-2">
              Itens como "Sobremesas" têm 40% mais conversão quando sugeridos após o prato principal.
            </p>
          </Card>
        </div>

        {/* Top Performing Rules */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Itens Mais Sugeridos</h3>
              <Button variant="ghost" size="sm" className="text-purple-600">
                Ver todos <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
            <div className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Regra</th>
                    <th className="px-6 py-4">Visualizações</th>
                    <th className="px-6 py-4">Conversão</th>
                    <th className="px-6 py-4 text-right">Receita</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topItems.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 text-gray-500">{item.views}</td>
                      <td className="px-6 py-4">
                        <Badge variant="success" className="bg-green-100 text-green-700 border-none">
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
