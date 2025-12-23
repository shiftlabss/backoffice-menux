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

  const priorityStyles = {
    critical: {
      bg: "bg-red-50",
      border: "border-red-100",
      iconBg: "bg-white",
      iconColor: "text-red-500",
      btn: "bg-red-600 hover:bg-red-700 text-white shadow-sm border-transparent"
    },
    attention: {
      bg: "bg-orange-50",
      border: "border-orange-100",
      iconBg: "bg-white",
      iconColor: "text-orange-500",
      btn: "bg-orange-600 hover:bg-orange-700 text-white shadow-sm border-transparent"
    }
  };

  const styles = priorityStyles[priority] || priorityStyles.attention;

  return (
    <div className={cn(
      "relative rounded-xl border p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
      styles.bg,
      styles.border
    )}>
      {/* Label Principal */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 opacity-80">
          Prioridade #1
        </span>
        <div className="flex items-center gap-1 text-xs font-mono text-gray-500">
          <Clock className="w-3 h-3" />
          {timeActive}
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl shadow-sm border border-gray-100 shrink-0", styles.iconBg)}>
          <TypeIcon className={cn("w-6 h-6", styles.iconColor)} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-snug mb-2">
            {evidence}
          </p>
          <Badge variant="secondary" className="bg-white/80 border-gray-200 text-gray-700 font-bold whitespace-nowrap shadow-sm">
            {impact.primary}
          </Badge>
        </div>
      </div>

      <Button
        className={cn("w-full h-11 text-sm font-bold mt-auto", styles.btn)}
        onClick={() => onView(id)}
      >
        Resolver agora
      </Button>
    </div>
  );
};
