
import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Clock, Users, Flame } from 'lucide-react';

export default function ServiceStatus() {
  return (
    <Card className="p-4 h-full flex flex-col justify-between">
      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-purple-600" />
        Status de Atendimento
      </h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <Users className="w-3 h-3" /> Espera Mesa
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">12</span>
            <span className="text-xs font-medium text-muted-foreground">min</span>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <Flame className="w-3 h-3" /> Tempo Preparo
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">24</span>
            <span className="text-xs font-medium text-muted-foreground">min</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-600">SLA Geral</span>
            <Badge variant="success" className="h-5 px-2 text-[10px]">94%</Badge>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94%' }} />
          </div>
        </div>
      </div>
    </Card>
  );
}
