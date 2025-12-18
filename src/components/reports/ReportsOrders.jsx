import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import MaestroInsights from './MaestroInsights';
import { ShoppingBag, Clock, AlertTriangle } from 'lucide-react';

export default function ReportsOrders() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-blue-500">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pedidos Totais</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">342</h3>
        </Card>
        <Card className="p-5 border-l-4 border-l-green-500">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Concluídos</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">338</h3>
        </Card>
        <Card className="p-5 border-l-4 border-l-red-500">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Cancelados</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">4</h3>
        </Card>
        <Card className="p-5 border-l-4 border-l-yellow-500">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tempo Médio</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">28m</h3>
        </Card>
      </div>

      <MaestroInsights insights={[
        {
          title: 'Gargalo na Cozinha',
          description: 'Entre 20h e 21h, o tempo médio de preparo sobe de 15m para 35m. Identificamos 12 pedidos atrasados neste horário ontem.',
          action: 'Ver escala cozinha'
        }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Demora por Item</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Item</th>
                <th className="px-6 py-3 font-medium">Média Tempo</th>
                <th className="px-6 py-3 font-medium">Desvio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Risoto de Camarão', time: '38m', var: '+12m' },
                { name: 'Picanha', time: '32m', var: '+8m' },
                { name: 'Lasanha', time: '28m', var: '+5m' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600">{row.time}</td>
                  <td className="px-6 py-4 text-red-600 font-bold">{row.var}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Funil de Pedidos</h3>
          </div>
          {/* Simple Funnel Representation */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-gray-600 text-right">Menu Aberto</span>
              <div className="flex-1 h-8 bg-gray-100 rounded-r-lg relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-blue-500 w-full flex items-center px-3 text-white text-xs font-bold">1.250</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-gray-600 text-right">Adicionou Item</span>
              <div className="flex-1 h-8 bg-gray-100 rounded-r-lg relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-blue-500 w-[60%] flex items-center px-3 text-white text-xs font-bold">750 (60%)</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-gray-600 text-right">Pedido Feito</span>
              <div className="flex-1 h-8 bg-gray-100 rounded-r-lg relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-green-500 w-[27%] flex items-center px-3 text-white text-xs font-bold">342 (27%)</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
