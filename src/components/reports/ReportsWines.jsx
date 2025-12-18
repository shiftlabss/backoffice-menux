import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import MaestroInsights from './MaestroInsights';
import { Wine, DollarSign, Award } from 'lucide-react';

export default function ReportsWines() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-purple-50 border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <Wine className="text-purple-600" />
            <span className="font-bold text-purple-900">Vendas de Vinho</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">R$ 5.200</h3>
          <p className="text-xs text-gray-500 mt-1">21% do faturamento total</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase">Ticket Médio (c/ Vinho)</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">R$ 145,00</h3>
          <Badge variant="success" className="mt-2 text-xs">+80% vs sem vinho</Badge>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase">Garrafas Vendidas</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">42</h3>
        </Card>
      </div>

      <MaestroInsights insights={[
        {
          title: 'Harmonização Oportuna',
          description: 'O prato "Risoto de Cogumelos" tem alta saída mas baixa conversão de vinho. Sugerir um Pinot Noir aumentaria o ticket em R$ 80,00.',
          action: 'Criar sugestão'
        }
      ]} />

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Top Rótulos</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Rótulo</th>
              <th className="px-6 py-3 font-medium text-right">Garrafas</th>
              <th className="px-6 py-3 font-medium text-right">Receita</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: 'Catena Malbec', qtd: 12, rev: 'R$ 1.800' },
              { name: 'Casillero del Diablo Cab', qtd: 10, rev: 'R$ 950' },
              { name: 'Periquita Reserva', qtd: 8, rev: 'R$ 880' },
              { name: 'Garzon Tannat', qtd: 5, rev: 'R$ 750' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-2">
                  {i === 0 && <Award size={14} className="text-yellow-500" />}
                  <span className="font-medium text-gray-900">{row.name}</span>
                </td>
                <td className="px-6 py-4 text-right text-gray-600">{row.qtd}</td>
                <td className="px-6 py-4 text-right text-gray-900 font-bold">{row.rev}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
