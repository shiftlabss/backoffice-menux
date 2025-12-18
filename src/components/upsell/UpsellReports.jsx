import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Download, Filter, Calendar } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export default function UpsellReports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
            <Calendar size={14} /> Últimos 30 dias
          </Button>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <Button variant="ghost" size="sm" className="bg-gray-100 text-gray-900 rounded-full font-medium">Todos</Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">Upsell</Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">Cross-sell</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={14} /> Filtrar
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={14} /> Exportar
          </Button>
        </div>
      </div>

      {/* Main Metrics Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6 flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Desempenho de Receita Incremental</h3>
              <p className="text-sm text-gray-500">Comparativo diário de receita gerada por sugestões</p>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-bold text-gray-900">R$ 3.850,00</span>
              <span className="text-sm text-green-600 font-medium">+15% vs mês anterior</span>
            </div>
          </div>

          {/* Fake Chart Visualization */}
          <div className="flex items-end gap-2 h-48 w-full px-2">
            {[40, 60, 45, 80, 55, 70, 90, 60, 50, 75, 85, 95, 65, 55, 80, 70, 60, 75, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-50 hover:bg-indigo-100 rounded-t-sm relative group transition-all" style={{ height: `${h}%` }}>
                <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm transition-all group-hover:bg-indigo-600" style={{ height: `${h * 0.4}%` }}></div>
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  R$ {h * 10},00
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>01 Dez</span>
            <span>15 Dez</span>
            <span>30 Dez</span>
          </div>
        </Card>

        {/* Funnel */}
        <Card className="lg:col-span-1 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Funil de Conversão</h3>

          <div className="space-y-6 relative">
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100"></div>

            {/* Step 1 */}
            <div className="relative pl-12">
              <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-indigo-500 bg-white z-10"></div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-500">Exibidas</span>
                <span className="font-bold text-gray-900">12.450</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-12">
              <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-indigo-500 bg-white z-10"></div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-500">Clicadas</span>
                <span className="font-bold text-gray-900">4.200</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '33%' }}></div>
              </div>
              <span className="text-xs text-indigo-600 font-medium mt-1 block">33% taxa de clique</span>
            </div>

            {/* Step 3 */}
            <div className="relative pl-12">
              <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-green-500 bg-green-500 z-10"></div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-500">Aceitas/Finalizadas</span>
                <span className="font-bold text-gray-900">2.303</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '18.5%' }}></div>
              </div>
              <span className="text-xs text-green-600 font-bold mt-1 block">18.5% conversão final</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Performance por Regra</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Regra</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Aceites</th>
                <th className="px-6 py-4">Taxa Conv.</th>
                <th className="px-6 py-4 text-right">Receita Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Upgrade Batata', type: 'Tamanho', accepts: 850, conv: '22%', rev: 'R$ 1.700' },
                { name: 'Bebida no Lanche', type: 'Cross-sell', accepts: 620, conv: '15%', rev: 'R$ 3.100' },
                { name: 'Adicional Queijo', type: 'Upsell', accepts: 400, conv: '30%', rev: 'R$ 1.200' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{row.type}</span></td>
                  <td className="px-6 py-4 text-gray-600">{row.accepts}</td>
                  <td className="px-6 py-4 font-bold text-green-600">{row.conv}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{row.rev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
