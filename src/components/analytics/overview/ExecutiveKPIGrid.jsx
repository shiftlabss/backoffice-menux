
import React from 'react';
import { Card } from '../../ui/Card';
import { ArrowUp, ArrowDown, HelpCircle, ChevronRight, Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/Tooltip'; // Assuming Tooltip exists or using standard title for now if not
import { cn } from '../../../lib/utils';

export function ExecutiveKPIGrid({ kpis, onKpiClick }) {
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          onClick={() => onKpiClick && onKpiClick(kpi)}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group relative overflow-hidden"
        >
          {/* Highlight for Maestro Metrics */}
          {kpi.id.includes('maestro') && (
            <div className="absolute top-0 right-0 p-1.5 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-xl">
              <Zap size={12} className="text-purple-600" />
            </div>
          )}

          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
              <div className="relative group/tooltip">
                <HelpCircle size={12} className="text-slate-300 hover:text-slate-500 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-slate-800 text-white text-[10px] rounded w-40 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity z-50">
                  {kpi.definition}
                </div>
              </div>
            </div>

            {/* Trend Badge */}
            <div className={cn("flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold",
              kpi.trendType === 'up' ? "bg-emerald-50 text-emerald-700" :
                kpi.trendType === 'down' ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"
            )}>
              {kpi.trendType === 'up' ? <ArrowUp size={10} className="mr-0.5" /> :
                kpi.trendType === 'down' ? <ArrowDown size={10} className="mr-0.5" /> : null}
              {Math.abs(kpi.trend)}%
            </div>
          </div>

          <div className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
            {kpi.value}
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-slate-400">vs. período anterior</span>
            <div className="h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={14} className="text-slate-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
