import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';

export function ComboPerformanceRow({ combo, isExpanded, onAnalyze }) {
  return (
    <Card
      className={cn(
        "border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-purple-200 group",
        isExpanded ? "ring-1 ring-purple-100 border-purple-200" : ""
      )}
    >
      {/* Main Row Content */}
      <div className="grid grid-cols-12 gap-4 p-5">

        {/* Col 1: Combo Context (Span 4) */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-center gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 leading-tight">
              {combo.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Combos
            </span>
            {combo.recommendations_count > 0 && (
              <Badge
                variant="secondary"
                className="bg-purple-50 text-purple-700 border-purple-100 text-[10px] font-bold px-2 py-0.5 hover:bg-purple-100 transition-colors"
              >
                {combo.recommendations_count} oportunidades
              </Badge>
            )}
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            Tag: <span className="text-slate-500">{combo.dominant_opportunity || 'Geral'}</span>
          </div>
        </div>

        {/* Col 2: Impact Metrics (Span 5) */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center px-4 md:border-l md:border-slate-50">
          <div className="flex items-baseline gap-2 mb-1">
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">
              {combo.revenue_total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded cursor-help">
                    + {combo.revenue_incremental?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Incremento atribuído ao Maestro</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-emerald-600">IA: {combo.conv_maestro}%</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Org: {combo.conv_organic}%</span>
            </div>
            <Badge className="bg-blue-50 text-blue-700 border-blue-100 text-[10px] px-1.5 py-0 h-4">
              Lift {combo.lift}
            </Badge>
          </div>

          <p className="text-[10px] text-slate-400">
            Base: {combo.base_sessions} sessões · {combo.suggestions_count} sugestões
          </p>
        </div>

        {/* Col 3: Action (Span 3) */}
        <div className="col-span-12 md:col-span-3 flex flex-col items-end justify-center gap-2 md:border-l md:border-slate-50 pl-4">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-full border-slate-200 text-slate-600 hover:text-purple-700 hover:border-purple-200 hover:bg-purple-50 justify-between group/btn"
            onClick={onAnalyze}
            aria-label={`Analisar ${combo.name}`}
          >
            <span className="text-xs font-medium">Analisar</span>
            <ArrowRight size={14} className="text-slate-300 group-hover/btn:text-purple-500 transition-colors" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
