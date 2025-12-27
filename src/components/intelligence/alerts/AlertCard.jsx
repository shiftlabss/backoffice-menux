import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { AlertTriangle, Clock, MoreHorizontal, ArrowRight, PlayCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/DropdownMenu';

export function AlertCard({ alert, onAnalyze, onPlaybook, onResolve, onSnooze }) {

  return (
    <Card className="p-0 border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors group">
      <div className="p-4 flex flex-col gap-3">

        {/* ROW 1: Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={cn("font-bold", getSeverityClass(alert.severity))}>
              {alert.severity}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200 font-semibold">
              {alert.type}
            </Badge>
            {alert.status !== 'Aberto' && (
              <Badge className={cn(
                alert.status === 'Resolvido' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
              )}>{alert.status}</Badge>
            )}
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1 ml-1">
              <Clock size={12} /> {alert.time_relative}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Actions removed as requested */}
          </div>
        </div>

        {/* ROW 2: Title & Impact */}
        <div>
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
            {alert.title}
          </h4>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-1">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {alert.description}
            </p>
            {alert.impact && (
              <p className="text-sm text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded self-start">
                Impacto: {alert.impact}
              </p>
            )}
          </div>
        </div>

        {/* ROW 3: How to Resolve (Checklist Preview) */}
        {alert.checklist && (
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 border-dashed">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wide">Como resolver</p>
            <ul className="space-y-1">
              {alert.checklist.slice(0, 2).map((item, i) => (
                <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
              {alert.checklist.length > 2 && (
                <li className="text-[10px] text-slate-400 pl-3.5">+ {alert.checklist.length - 2} passos no playbook</li>
              )}
            </ul>
          </div>
        )}

        {/* ROW 4: CTAs */}
        <div className="flex items-center gap-3 pt-1">
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 w-full sm:w-auto" onClick={() => onAnalyze(alert)}>
            Analisar
            <ArrowRight size={14} className="ml-2 opacity-80" />
          </Button>



          {/* Resolver button removed from footer */}
        </div>

      </div>
    </Card>
  );
}

function getSeverityClass(sev) {
  switch (sev) {
    case 'Crítica': return "text-red-700 bg-red-50 border-red-200";
    case 'Alta': return "text-orange-700 bg-orange-50 border-orange-200";
    case 'Média': return "text-amber-700 bg-amber-50 border-amber-200";
    default: return "text-slate-600 bg-slate-100 border-slate-200";
  }
}
