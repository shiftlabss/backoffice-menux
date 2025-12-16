import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { BarChart3, TrendingUp, DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function UpsellReports() {
  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Receita Upsell</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">R$ 3.850</h3>
            <span className="text-xs font-bold text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded">
              <ArrowUpRight size={12} className="mr-0.5" /> +12%
            </span>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Taxa de Aceite</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">18.5%</h3>
            <span className="text-xs font-bold text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded">
              <ArrowUpRight size={12} className="mr-0.5" /> +0.5%
            </span>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ticket Médio +</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">R$ 4,50</h3>
            <span className="text-xs font-bold text-gray-400 flex items-center">
              por pedido afetado
            </span>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Impressões</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">12.450</h3>
            <span className="text-xs font-bold text-blue-600 flex items-center bg-blue-50 px-1.5 py-0.5 rounded">
              Total/mês
            </span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Performance por Dia</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div> Pedidos
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Receita
              </div>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-1 group relative">
                <div className="w-full bg-green-400/20 rounded-t-sm" style={{ height: `${h * 0.4}%` }}></div>
                <div className="w-full bg-purple-600 rounded-t-md hover:opacity-80 transition-opacity" style={{ height: `${h}%` }}></div>
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  R$ {h * 12},00
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
            <span>01 Dez</span>
            <span>08 Dez</span>
            <span>15 Dez</span>
            <span>22 Dez</span>
          </div>
        </Card>

        {/* Low Performance Rules */}
        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-4">Oportunidades de Melhoria</h3>
          <p className="text-sm text-gray-500 mb-4">Estas regras estão com conversão abaixo de 5%. Considere ajustar a mensagem ou o preço.</p>

          <div className="space-y-4">
            {[
              { name: 'Água s/ gás -> c/ gás', conv: '2.1%', views: 1450 },
              { name: 'Sobremesa Almoço Executive', conv: '3.4%', views: 890 },
              { name: 'Adicional Bacon', conv: '4.8%', views: 2100 },
            ].map((rule, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{rule.name}</h4>
                  <div className="flex gap-3 text-xs text-gray-500 mt-1">
                    <span>{rule.views} exibições</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-red-600 font-bold bg-white px-2 py-1 rounded border border-red-100 shadow-sm">{rule.conv}</span>
                  <Button variant="outline" size="sm" className="bg-white hover:bg-red-100 border-red-200 text-red-600 text-xs h-8">
                    Ajustar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
