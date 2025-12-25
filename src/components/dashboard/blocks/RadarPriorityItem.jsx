import React from 'react';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { Clock, Utensils, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';

export const RadarPriorityItem = ({ bottleneck, onView }) => {
  const { id, title, evidence, impact, type, priority, timeActive } = bottleneck;

  const TypeIcon = {
    kitchen: Utensils,
    entrance: Users,
    bar: TrendingUp
  }[type] || AlertTriangle;

  // New design system logic
  const isCritical = priority === 'critical';

  const containerStyles = isCritical
    ? "bg-white border-l-4 border-l-red-500 border-y border-r border-slate-200 shadow-sm"
    : "bg-white border-l-4 border-l-orange-400 border-y border-r border-slate-200 shadow-sm";

  const iconStyles = isCritical
    ? "bg-red-50 text-red-600"
    : "bg-orange-50 text-orange-600";

  return (
    <div className={cn(
      "relative rounded-xl p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
      containerStyles
    )}>
      {/* 1. Header: Prioridade e Tempo */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={cn(
          "text-[10px] uppercase font-bold tracking-wider border-none px-0",
          isCritical ? "text-red-600" : "text-orange-600"
        )}>
          Prioridade #{id}
        </Badge>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          há {timeActive.replace(' min', 'm')}
        </div>
      </div>

      {/* 2. Corpo Principal */}
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-2xl shrink-0", iconStyles)}>
          <TypeIcon className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="text-lg font-bold text-slate-900 leading-tight">
            {title}
          </h3>
          {/* Limpeza do texto de evidência conforme solicitado */}
          <p className="text-sm text-slate-500 leading-snug">
            {evidence.replace(' (SLA Violado)', '')}
          </p>

          {/* 3. Métrica de Impacto (Simplificada) */}
          <div className="pt-2 mt-1">
            <span className="text-xs font-medium text-slate-600">
              ⚠️ Impacto: <span className="font-bold text-slate-800">{impact.primary}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4. CTA (Neutro e Acionável) */}
      <Button
        variant="outline"
        className={cn(
          "w-full h-10 text-sm font-semibold mt-auto border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors",
          isCritical ? "text-red-700 hover:border-red-200 hover:bg-red-50" : "text-orange-700 hover:border-orange-200 hover:bg-orange-50"
        )}
        onClick={() => onView(id)}
      >
        Resolver gargalo
      </Button>
    </div>
  );
};
