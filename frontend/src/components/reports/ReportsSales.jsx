import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import MaestroInsights from './MaestroInsights';
import { DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function ReportsSales() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue KPI */}
        <Card className="p-6 lg:col-span-1 bg-gray-900 text-white border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <DollarSign size={100} />
          </div>
          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Receita Total</p>
          <h2 className="text-4xl font-bold mb-4">R$ 24.580,00</h2>
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-gray-400">vs. período anterior</p>
              <span className="text-green-400 font-bold flex items-center text-sm mt-1">
                <ArrowUpRight size={14} /> +12%
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400">vs. meta</p>
              <span className="text-yellow-400 font-bold flex items-center text-sm mt-1">
                98%
              </span>
            </div>
          </div>
        </Card>

        {/* Breakdown by Shift */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Almoço</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">R$ 10.450</h3>
              </div>
              <Badge variant="secondary">42%</Badge>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Ticket Médio: <strong className="text-gray-900">R$ 55,00</strong>
            </div>
          </Card>
          <Card className="p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Jantar</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">R$ 14.130</h3>
              </div>
              <Badge variant="default" className="bg-purple-100 text-purple-700 border-none">58%</Badge>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Ticket Médio: <strong className="text-gray-900">R$ 82,00</strong>
            </div>
          </Card>
        </div>
      </div>

      <MaestroInsights insights={[
        {
          title: 'Oportunidade de Preço',
          description: 'O prato "Filé Parmegiana" tem alta demanda inelástica. Um aumento de R$ 3,00 geraria +R$ 900/mês sem perda significativa de volume.',
          action: 'Simular reajuste'
        }
      ]} />

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Receita por Categoria</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Categoria</th>
                <th className="px-6 py-3 font-medium text-right">Faturamento</th>
                <th className="px-6 py-3 font-medium text-right">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { cat: 'Pratos Principais', val: 'R$ 12.500', pct: '51%' },
                { cat: 'Bebidas', val: 'R$ 6.800', pct: '28%' },
                { cat: 'Entradas', val: 'R$ 3.200', pct: '13%' },
                { cat: 'Sobremesas', val: 'R$ 2.080', pct: '8%' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{row.cat}</td>
                  <td className="px-6 py-4 text-right text-gray-600">{row.val}</td>
                  <td className="px-6 py-4 text-right text-gray-600">{row.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Formas de Pagamento</h3>
          </div>
          {/* Placeholder for payment breakdown */}
          <div className="p-6 flex items-center justify-center h-48 text-gray-400 text-sm">
            Gráfico de Pizza (Em breve)
          </div>
        </Card>
      </div>
    </div>
  );
}
