import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import {
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/Tooltip';
import { cn } from '../../../lib/utils';

export function OpportunityCard({ opportunity, onResolve, onEdit, onIgnore, isIgnored }) {
  if (isIgnored) return null;

  const getPriorityColor = (p) => {
    switch (p?.toLowerCase()) {
      case 'alta': return 'border-l-4 border-l-red-500';
      case 'média': return 'border-l-4 border-l-amber-500';
      default: return 'border-l-4 border-l-blue-500';
    }
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-200 hover:shadow-md border-slate-200 bg-white",
      getPriorityColor(opportunity.priority)
    )}>
      <div className="p-4 flex flex-col md:flex-row md:items-center gap-4">

        {/* Left: Icon & Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0 h-5 font-bold uppercase tracking-wider">
              {opportunity.entity_type === 'product' ? 'Produto' : 'Combo'}
            </Badge>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Clock size={10} /> {opportunity.time_estimate || '2 min'}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            {opportunity.title}
            {opportunity.confidence === 'Alta' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  </TooltipTrigger>
                  <TooltipContent>Confiança Alta</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </h4>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {opportunity.evidence}
          </p>
        </div>

        {/* Middle: Impact */}
        <div className="flex items-center gap-4 shrink-0 border-l border-slate-100 pl-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400">Impacto Est.</span>
            <span className="text-sm font-bold text-emerald-600">{opportunity.impact}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 md:pl-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(opportunity)}
            className="hidden md:flex text-xs text-slate-500 h-8"
          >
            Editar
          </Button>

          <Button
            size="sm"
            onClick={() => onResolve(opportunity)}
            className="bg-slate-900 text-white text-xs h-8 hover:bg-purple-700 shadow-sm whitespace-nowrap"
            disabled={!opportunity.can_apply}
            title={!opportunity.can_apply ? "Em breve" : "Resolver agora"}
          >
            {opportunity.can_apply ? 'Resolver' : 'Em breve'}
            {opportunity.can_apply && <ArrowRight size={14} className="ml-1" />}
          </Button>

          <button
            onClick={() => onIgnore(opportunity)}
            className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-50 rounded-full transition-colors ml-1"
            title="Ignorar por 7 dias"
          >
            <X size={16} />
          </button>
        </div>

      </div>
    </Card>
  );
}
