import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { AlertCard } from './AlertCard';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Badge } from '../../ui/Badge';

export function AlertBlock({ type, alerts, onAnalyze, onPlaybook, onResolve, onSnooze }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!alerts || alerts.length === 0) return null;

  const severityOrder = { 'Crítica': 3, 'Alta': 2, 'Média': 1, 'Baixa': 0 };
  const maxSeverity = alerts.reduce((max, curr) => severityOrder[curr.severity] > severityOrder[max] ? curr.severity : max, 'Baixa');

  const count = alerts.length;
  // Determine block header color styling based on max severity
  const headerStyles =
    maxSeverity === 'Crítica' ? "bg-red-50 text-red-900 border-red-100" :
      maxSeverity === 'Alta' ? "bg-orange-50 text-orange-900 border-orange-100" :
        "bg-white text-slate-900 border-slate-100";

  const iconColor =
    maxSeverity === 'Crítica' ? "text-red-600" :
      maxSeverity === 'Alta' ? "text-orange-500" :
        "text-slate-400";

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm mb-6">
      {/* Header Block */}
      <div
        className={cn("p-4 flex items-center justify-between cursor-pointer transition-colors hover:bg-opacity-80 border-b", headerStyles)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <AlertCircle className={iconColor} size={20} />
          <h3 className="font-bold text-lg">{type}</h3>
          <Badge className="bg-white bg-opacity-50 text-inherit border-none ml-2 shadow-none font-bold">
            {count} {count === 1 ? 'alerta' : 'alertas'}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-md hover:bg-black/5">
            {isExpanded ? <ChevronUp size={20} className="opacity-60" /> : <ChevronDown size={20} className="opacity-60" />}
          </button>
        </div>
      </div>

      {/* Body */}
      {isExpanded && (
        <div className="p-4 space-y-4 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {alerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAnalyze={onAnalyze}
                onPlaybook={onPlaybook}
                onResolve={onResolve}
                onSnooze={onSnooze}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
