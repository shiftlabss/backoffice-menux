import React from 'react';
import { AlertCard } from './AlertCard';
import { cn } from '../../../lib/utils';
import { Badge } from '../../ui/Badge';

export function AlertKanbanBoard({ alerts, onAnalyze, onPlaybook, onResolve, onSnooze }) {

  // Group by Severity Categories for Columns
  const columns = {
    critical: {
      label: 'Crítico',
      color: 'red',
      items: alerts.filter(a => a.severity === 'Crítica')
    },
    high: {
      label: 'Alta Prioridade',
      color: 'orange',
      items: alerts.filter(a => a.severity === 'Alta')
    },
    medium_low: {
      label: 'Média / Baixa',
      color: 'slate',
      items: alerts.filter(a => a.severity === 'Média' || a.severity === 'Baixa')
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start h-full">
      <KanbanColumn
        title={columns.critical.label}
        count={columns.critical.items.length}
        color={columns.critical.color}
        items={columns.critical.items}
        actions={{ onAnalyze, onPlaybook, onResolve, onSnooze }}
      />
      <KanbanColumn
        title={columns.high.label}
        count={columns.high.items.length}
        color={columns.high.color}
        items={columns.high.items}
        actions={{ onAnalyze, onPlaybook, onResolve, onSnooze }}
      />
      <KanbanColumn
        title={columns.medium_low.label}
        count={columns.medium_low.items.length}
        color={columns.medium_low.color}
        items={columns.medium_low.items}
        actions={{ onAnalyze, onPlaybook, onResolve, onSnooze }}
      />
    </div>
  );
}

function KanbanColumn({ title, count, color, items, actions }) {
  const headerColors = {
    red: "bg-red-50 border-red-100 text-red-900",
    orange: "bg-orange-50 border-orange-100 text-orange-900",
    slate: "bg-slate-50 border-slate-100 text-slate-900"
  };

  const countColors = {
    red: "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
    slate: "bg-white text-slate-600 border border-slate-200"
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
      {/* Header */}
      <div className={cn("p-4 rounded-t-xl border-b flex items-center justify-between", headerColors[color])}>
        <h3 className="font-bold text-sm uppercase tracking-wide">{title}</h3>
        <Badge className={cn("border-none shadow-none font-bold", countColors[color])}>
          {count}
        </Badge>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-4 min-h-[200px]">
        {items.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            <p className="text-sm font-medium text-slate-400">Nenhum alerta</p>
          </div>
        ) : (
          items.map(alert => (
            <AlertCard
              key={alert.id}
              alert={alert}
              isKanbanMode={true} // Hint to Card to show Type prominently
              {...actions}
            />
          ))
        )}
      </div>
    </div>
  )
}
