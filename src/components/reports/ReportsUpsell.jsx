import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import MaestroInsights from './MaestroInsights';
import { TrendingUp, MousePointer, PlusCircle, DollarSign } from 'lucide-react';

export default function ReportsUpsell() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Sugestões Vistas</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">12.450</h3>
            <div className="p-2 bg-purple-50 rounded-full text-purple-600"><TrendingUp size={16} /></div>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Taxa Clique</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">22%</h3>
            <div className="p-2 bg-blue-50 rounded-full text-blue-600"><MousePointer size={16} /></div>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Conversão Final</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">18.5%</h3>
            <div className="p-2 bg-green-50 rounded-full text-green-600"><PlusCircle size={16} /></div>
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Receita Extra</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">R$ 3.850</h3>
            <div className="p-2 bg-yellow-50 rounded-full text-yellow-600"><DollarSign size={16} /></div>
          </div>
        </Card>
      </div>

      <MaestroInsights insights={[
        {
          title: 'Cross-sell de Sobremesa',
          description: 'A regra "Sugerir Pudim no Jantar" está performando 40% acima da média. Considere expandir para o almoço nos finais de semana.',
          action: 'Duplicar regra'
        }
      ]} />

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Performance por Regra</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Regra</th>
              <th className="px-6 py-3 font-medium">Tipo</th>
              <th className="px-6 py-3 font-medium text-right">Views</th>
              <th className="px-6 py-3 font-medium text-right">Conv.</th>
              <th className="px-6 py-3 font-medium text-right">Receita</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: 'Batata Frita M -> G', type: 'Upsell', views: 450, conv: '22%', rev: 'R$ 900' },
              { name: 'Coca-Cola -> 500ml', type: 'Upsell', views: 320, conv: '18%', rev: 'R$ 450' },
              { name: 'Hambúrguer -> Combo', type: 'Cross-sell', views: 210, conv: '15%', rev: 'R$ 1.200' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                <td className="px-6 py-4"><Badge variant="outline">{row.type}</Badge></td>
                <td className="px-6 py-4 text-right text-gray-600">{row.views}</td>
                <td className="px-6 py-4 text-right text-green-600 font-bold">{row.conv}</td>
                <td className="px-6 py-4 text-right text-gray-900 font-bold">{row.rev}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
