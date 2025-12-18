
import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Clock, AlertTriangle } from 'lucide-react';

const BOTTLENECKS = [
  { id: 1, msg: 'Cozinha sobrecarregada', detail: '8 pedidos > 25min', priority: 'high' },
  { id: 2, msg: 'Espera na entrada', detail: 'Fila de 12 pessoas', priority: 'medium' },
];

export default function DashboardStatusBlock() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <Card className="p-3 flex-1 flex flex-col justify-center">
        <h3 className="text-xs font-bold text-foreground mb-2 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          Status de Atendimento
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">Espera Mesa</span>
            <span className="font-bold text-foreground">12 min</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">Preparo</span>
            <span className="font-bold text-foreground">24 min</span>
          </div>
          <div className="pt-1.5 border-t border-gray-100 mt-1 flex justify-between items-center text-xs">
            <span className="text-gray-500">SLA Atual</span>
            <Badge variant="success" className="h-5 px-1.5 text-[10px]">94%</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-3 flex-1 flex flex-col justify-center border-red-100 bg-red-50/50">
        <h3 className="text-xs font-bold text-red-700 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          Gargalos Críticos
        </h3>
        <div className="space-y-1.5">
          {BOTTLENECKS.map((b) => (
            <div key={b.id} className="bg-white p-1.5 rounded border border-red-100 shadow-sm flex justify-between items-center">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-foreground block truncate">{b.msg}</span>
                <span className="text-[9px] text-gray-500 block truncate">{b.detail}</span>
              </div>
              {b.priority === 'high' && <span className="text-[9px] font-bold text-white bg-red-500 px-1 rounded ml-1">ALTA</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
