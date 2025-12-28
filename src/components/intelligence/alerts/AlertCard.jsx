import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Clock, MoreHorizontal, ArrowRight, CheckCircle2, BellOff, PlayCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/DropdownMenu';

export function AlertCard({ alert, onAnalyze, onResolve, onSnooze }) {

  return (
    <Card className="p-0 border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors group bg-white">
      <div className="p-4 flex flex-col gap-3">

        {/* ROW 1: Metadata & Quick Actions */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={cn("font-bold text-[10px] px-1.5 h-5", getSeverityClass(alert.severity))}>
              {alert.severity}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200 font-semibold text-[10px] px-1.5 h-5">
              {alert.type}
            </Badge>
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 ml-1">
              <Clock size={10} /> {alert.time_relative}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <MoreHorizontal size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onResolve(alert)}>
                <CheckCircle2 size={14} className="mr-2" /> Marcar Resolvido
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSnooze(alert)}>
                <BellOff size={14} className="mr-2" /> Silenciar (2h)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { }}>
                <PlayCircle size={14} className="mr-2" /> Em andamento
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* ROW 2: Title & Impact */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 line-clamp-1" title={alert.title}>
            {alert.title}
          </h4>
          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {/* Use description as subtitle, or fallback */}
            {alert.subtitle || alert.description}
          </p>

          {/* Impact Row */}
          {alert.impact && (
            <div className="mt-2 flex items-center gap-2">
              <p className="text-xs font-bold text-red-600 bg-red-50/50 px-1.5 py-0.5 rounded border border-red-100/50 inline-block">
                Impacto: {alert.impact}
              </p>
              {/* Optional Micro-signals */}
              {alert.playbook_available && (
                <span className="text-[10px] text-slate-400 bg-slate-50 px-1 rounded border border-slate-100">
                  Playbook
                </span>
              )}
            </div>
          )}
        </div>

        {/* ROW 3: Primary Action */}
        <div className="pt-1">
          <Button
            size="sm"
            className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 shadow-sm text-xs h-8 justify-between group/btn transition-all"
            onClick={() => onAnalyze(alert)}
          >
            <span className="font-semibold">Analisar</span>
            <ArrowRight size={14} className="text-slate-300 group-hover/btn:text-indigo-500 transition-colors" />
          </Button>
        </div>

      </div>
    </Card>
  );
}

function getSeverityClass(sev) {
  switch (sev?.toLowerCase()) {
    case 'crítica': case 'critica': return "text-red-700 bg-red-50 border-red-200";
    case 'alta': return "text-orange-700 bg-orange-50 border-orange-200";
    case 'média': case 'media': return "text-amber-700 bg-amber-50 border-amber-200";
    default: return "text-slate-600 bg-slate-100 border-slate-200";
  }
}
