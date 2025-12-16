import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import MaestroInsights from './MaestroInsights';
import { DollarSign, ShoppingBag, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

export default function ReportsOverview() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Faturamento Total</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">R$ 24.580,00</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-1">
              <TrendingUp size={12} /> +12%
            </span>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total de Pedidos</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">342</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-1">
              <TrendingUp size={12} /> +5%
            </span>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ticket Médio</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">R$ 71,80</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-1">
              <TrendingUp size={12} /> +2%
            </span>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tempo Médio Decisão</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">4m 30s</h3>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center gap-1">
              <TrendingUp size={12} className="rotate-180" /> +15s
            </span>
          </div>
        </Card>
      </div>

      {/* Maestro Insights Block */}
      <MaestroInsights insights={[
        {
          title: 'Queda no ticket médio do almoço',
          description: 'O ticket médio do almoço caiu 5% comparado à semana anterior, principalmente por queda na venda de bebidas.',
          action: 'Ver detalhe bebidas'
        },
        {
          title: 'Pico de demanda previsto',
          description: 'Baseado no histórico, esperamos um movimento 20% maior nesta sexta-feira à noite.',
          action: 'Ajustar escala'
        }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Top Produtos (Receita)</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Picanha na Chapa', value: 'R$ 4.200', percent: 70 },
              { name: 'Escondidinho de Carne Seca', value: 'R$ 2.800', percent: 50 },
              { name: 'Combo Família', value: 'R$ 1.950', percent: 35 },
              { name: 'Petit Gateau', value: 'R$ 1.200', percent: 20 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="font-bold text-gray-900">{item.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Alertas de Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
              <AlertTriangle className="text-red-500 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-red-800">Coca-Cola Zero em falta?</h4>
                <p className="text-xs text-red-700 mt-1">Houve 15 buscas sem conversão nas últimas 2h.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
              <Clock className="text-yellow-600 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-yellow-800">Tempo de preparo elevando</h4>
                <p className="text-xs text-yellow-700 mt-1">Média subiu para 25min na última hora.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
