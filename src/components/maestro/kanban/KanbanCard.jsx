import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  MoreHorizontal,
  Clock,
  TrendingUp,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../../ui/DropdownMenu';

export function KanbanCard({ card, index, onAction }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card.id, data: card });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50"
      >
        <Card className="p-4 space-y-3 cursor-grab shadow-lg border-2 border-purple-200 bg-white h-[280px]" />
      </div>
    );
  }

  const isApplied = card.status === 'applied';
  const isUnderReview = card.status === 'under_review';

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      <Card className={cn(
        "group hover:border-purple-300 hover:shadow-md transition-all bg-white overflow-hidden",
        (isApplied || isUnderReview) && "opacity-80 bg-slate-50"
      )}>
        {/* Header */}
        <div className="p-4 pb-2">
          <div className="flex justify-between items-start mb-2">
            <div className={cn(
              "p-2 rounded-lg",
              isApplied ? "bg-emerald-50 text-emerald-600" :
                isUnderReview ? "bg-amber-50 text-amber-600" :
                  "bg-purple-50 text-purple-600"
            )}>
              {isApplied ? <CheckCircle2 size={16} /> :
                isUnderReview ? <Clock size={16} /> :
                  (
                    <>
                      {card.type === 'upsell' && <TrendingUp size={16} />}
                      {card.type === 'cross-sell' && <Sparkles size={16} />}
                      {card.type === 'combo' && <Zap size={16} />}
                      {card.type === 'promo' && <Target size={16} />}
                    </>
                  )
              }
            </div>
            <div className="flex gap-2">
              {(card.requires_approval || isUnderReview) && (
                <Badge variant="outline" className={cn(
                  "text-[10px]",
                  isUnderReview
                    ? "border-amber-200 bg-amber-50 text-amber-700"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                )}>
                  {isUnderReview ? "Em Aprovação" : "Requer Aprovação"}
                </Badge>
              )}
              {isApplied && (
                <Badge variant="outline" className="text-[10px] border-emerald-200 bg-emerald-50 text-emerald-700">
                  Aplicada
                </Badge>
              )}
            </div>
          </div>

          <h4 className="font-bold text-slate-900 text-sm leading-tight mb-2">
            {card.title}
          </h4>

          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] px-1.5 h-5 font-medium">
              {card.type}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] px-1.5 h-5 font-medium">
              {card.target}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] px-1.5 h-5 font-medium">
              {card.moment}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded-md">
            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
            <span className="line-clamp-1">{card.evidence_text}</span>
          </div>
        </div>

        {/* Body Metrics */}
        <div className="px-4 py-2 border-t border-slate-100 grid grid-cols-2 gap-px bg-slate-50/50">
          <div className="pr-2 border-r border-slate-100">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Impacto Est.</p>
            <p className="text-sm font-bold text-emerald-600">{card.impact_order} <span className="text-[10px] font-normal text-slate-400">/ped</span></p>
            <p className="text-[10px] text-slate-400">{card.impact_day_est} /dia</p>
          </div>
          <div className="pl-2">
            <div className="mb-2">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Confiança</p>
              <div className="flex items-center gap-1">
                <span className={cn(
                  "text-xs font-bold",
                  card.confidence_level === 'Alta' ? "text-emerald-600" :
                    card.confidence_level === 'Média' ? "text-blue-600" : "text-amber-600"
                )}>{card.confidence_level}</span>
                <span className="text-[10px] text-slate-400">({card.confidence_base} un)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between gap-2 bg-white">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
            <Clock size={12} />
            {card.execution_time} min
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onAction?.('evidence', card); }}
              className="text-[10px] font-medium text-purple-600 hover:text-purple-800 px-2 py-1 rounded hover:bg-purple-50 transition-colors"
            >
              Evidência
            </button>
            <Button
              size="sm"
              onClick={(e) => { e.stopPropagation(); onAction?.('apply', card); }}
              disabled={isApplied || isUnderReview}
              className={cn(
                "h-7 text-xs px-3 shadow-sm transition-all",
                isApplied ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" :
                  isUnderReview ? "bg-amber-100 text-amber-700 hover:bg-amber-200" :
                    "bg-slate-900 hover:bg-slate-800 text-white"
              )}
            >
              {isApplied ? "Aplicada" : isUnderReview ? "Aguardando" : "Aplicar"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
