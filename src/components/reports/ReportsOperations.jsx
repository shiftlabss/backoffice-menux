import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import MaestroInsights from './MaestroInsights';
import { Clock, Users, AlertTriangle } from 'lucide-react';

export default function ReportsOperations() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase">Mesas Atendidas</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">108</h3>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase">Tempo Médio Permanência</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">1h 15m</h3>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-gray-500 font-bold uppercase">Mesas em Risco (&gt;20m sem pedido)</p>
          <h3 className="text-2xl font-bold text-red-600 mt-2">3</h3>
        </Card>
      </div>

      <MaestroInsights insights={[
        {
          title: 'Giro de Mesa Lento',
          description: 'Mesas na varanda estão ficando 20min a mais que o ideal no almoço, sem consumo adicional. Sugerir a conta ou café pode agilizar.',
          action: 'Ver mesas varanda'
        }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-4">Ocupação por Hora</h3>
          <div className="h-48 flex items-end justify-between gap-1">
            {[10, 20, 40, 80, 100, 90, 60, 40, 20, 10].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-100 rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>12h</span>
            <span>17h</span>
            <span>23h</span>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-4">Mesas com maior Ticket Hoje</h3>
          <div className="space-y-3">
            {[
              { mesa: 'Mesa 12', val: 'R$ 450,00', status: 'Finalizada' },
              { mesa: 'Mesa 05', val: 'R$ 380,00', status: 'Ocupada' },
              { mesa: 'Mesa 08', val: 'R$ 310,00', status: 'Finalizada' },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg">
                <div>
                  <span className="font-bold text-gray-900">{row.mesa}</span>
                  <span className="text-xs text-gray-500 block">{row.status}</span>
                </div>
                <span className="font-bold text-green-700">{row.val}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
