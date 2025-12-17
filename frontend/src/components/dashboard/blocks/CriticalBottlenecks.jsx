
import React from 'react';
import { Card } from '../../ui/Card';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { Badge } from '../../ui/Badge';

const BOTTLENECKS = [
  { id: 1, msg: 'Cozinha sobrecarregada', detail: '8 pedidos > 25min', priority: 'high' },
  { id: 2, msg: 'Espera na entrada', detail: 'Fila de 12 pessoas', priority: 'medium' },
  { id: 3, msg: 'Bar: Ruptura gelo', detail: 'Estoque crítico', priority: 'high' },
];

export default function CriticalBottlenecks() {
  return (
    <Card className="p-4 h-full flex flex-col border-red-100 bg-red-50/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-red-700 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Gargalos Críticos
        </h3>
        <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">3 Ativos</Badge>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {BOTTLENECKS.map((b) => (
          <div key={b.id} className="bg-white p-2.5 rounded-lg border border-red-100 shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-gray-900 truncate">{b.msg}</span>
                {b.priority === 'high' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />}
              </div>
              <span className="text-[10px] text-gray-500 block truncate">{b.detail}</span>
            </div>
            <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-red-500 transition-colors" />
          </div>
        ))}
      </div>
    </Card>
  );
}
