import React, { useEffect } from 'react';
import { Button } from '../../ui/Button';
import { Popover, PopoverTrigger, PopoverContent } from '../../ui/Popover';
import { Badge } from '../../ui/Badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '../../ui/Tooltip';
import { Zap, Loader2, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useRecommendation, useApplyRecommendation } from '../../../hooks/useItemActions';
import { cn } from '../../../lib/utils';

export function OptimizeButton({ itemId, eligibleForOptimization = true, canOptimize = true, onOpenDetail }) {
  const { data, isLoading, fetchRecommendation } = useRecommendation(itemId);
  const { apply, isApplying } = useApplyRecommendation();

  const isDisabled = !eligibleForOptimization || !canOptimize;
  const disabledReason = !canOptimize ? "Permissão necessária: Otimizar" : "Item não elegível para otimização";

  const handleApply = async (e) => {
    e.stopPropagation();
    if (data) {
      await apply(data.id, itemId);
    }
  };

  const confidenceStyles = {
    high: "bg-emerald-50 text-emerald-700 border-emerald-100",
    medium: "bg-amber-50 text-amber-700 border-amber-100",
    low: "bg-red-50 text-red-700 border-red-100"
  };

  const confidenceLabels = {
    high: "Alta",
    medium: "Média",
    low: "Baixa"
  };

  if (isDisabled) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <div className="cursor-not-allowed opacity-50">
            <Button variant="outlineSuccess" size="sm" disabled className="pointer-events-none">
              <Zap size={14} className="mr-1.5" />
              Otimizar
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>{disabledReason}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outlineSuccess"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            fetchRecommendation();
          }}
          className="h-8 px-3 gap-1.5 transition-all hover:shadow-md"
        >
          <Zap size={14} className="fill-current" />
          Otimizar
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-0 overflow-hidden border-emerald-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-140">
        <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-600" />
            <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">Maestro Intelligence</span>
          </div>
          {data && (
            <Badge variant="outline" className={cn("text-[9px] font-bold uppercase py-0", confidenceStyles[data.confidenceLevel])}>
              Confiança {confidenceLabels[data.confidenceLevel]}
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-4">
          {isLoading ? (
            <div className="py-6 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Analizando performance...</p>
            </div>
          ) : data ? (
            <>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  {data.evidence}
                </p>
                <div className="flex items-center gap-1 text-emerald-600 font-extrabold text-[11px]">
                  <TrendingUp size={12} className="inline" /> Impacto estimado: {data.impact}
                </div>
              </div>

              <div className="flex gap-2 pt-1 border-t border-slate-50 mt-4">
                <Button
                  className="flex-1 h-9 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  {isApplying ? <Loader2 size={14} className="animate-spin" /> : 'Aplicar agora'}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-500 text-center py-4">Não foi possível carregar a recomendação.</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TrendingUp({ size, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
