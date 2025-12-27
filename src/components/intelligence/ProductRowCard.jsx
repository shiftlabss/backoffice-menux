import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  Eye,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  DollarSign,
  Info
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';

export function ProductRowCard({ product, isExpanded, onToggleExpand, onAnalyze }) {
  return (
    <Card
      className={cn(
        "border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-purple-200 group",
        isExpanded ? "ring-1 ring-purple-100 border-purple-200" : ""
      )}
    >
      {/* Main Row Content */}
      <div
        className="grid grid-cols-12 gap-4 p-5 cursor-pointer"
        onClick={onToggleExpand}
      >
        {/* Col 1: Product Context (Span 4) */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-center gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 leading-tight">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {product.category}
            </span>
            {product.recommendations_count > 0 && (
              <Badge
                variant="secondary"
                className="bg-purple-50 text-purple-700 border-purple-100 text-[10px] font-bold px-2 py-0.5 hover:bg-purple-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // In a real app, this would filter specific opps
                }}
              >
                {product.recommendations_count} oportunidades
              </Badge>
            )}
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            Tag: <span className="text-slate-500">{product.dominant_opportunity}</span>
          </div>
        </div>

        {/* Col 2: Impact Metrics (Span 5) */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center px-4 md:border-l md:border-slate-50">
          <div className="flex items-baseline gap-2 mb-1">
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">
              R$ {product.revenue_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded cursor-help">
                    + R$ {product.revenue_incremental?.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Receita Incremental (Atribuída à IA)</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-emerald-600">IA: {product.conv_maestro}%</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Org: {product.conv_organic}%</span>
            </div>
            <Badge className="bg-blue-50 text-blue-700 border-blue-100 text-[10px] px-1.5 py-0 h-4">
              Lift {product.lift}
            </Badge>
          </div>

          <p className="text-[10px] text-slate-400">
            Base: {product.base_sessions} sessões · {product.recommendations_count * 12} sugestões
          </p>
        </div>

        {/* Col 3: Action (Span 3) */}
        <div className="col-span-12 md:col-span-3 flex flex-col items-end justify-center gap-2 md:border-l md:border-slate-50 pl-4">
          {/* Contextual CTA */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-purple-700 bg-purple-50 px-2.5 py-1.5 rounded-lg border border-purple-100/50 mb-1">
            <Sparkles size={12} className="text-purple-500" />
            {product.next_step}
          </div>

          {/* Primary Action */}
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-full border-slate-200 text-slate-600 hover:text-purple-700 hover:border-purple-200 hover:bg-purple-50 justify-between group/btn"
            onClick={(e) => {
              e.stopPropagation();
              onAnalyze();
            }}
            aria-label={`Analisar ${product.name}`}
          >
            <span className="text-xs font-medium">Analisar</span>
            <ArrowRight size={14} className="text-slate-300 group-hover/btn:text-purple-500 transition-colors" />
          </Button>
        </div>
      </div>

      {/* Expanded Details Panel */}
      {isExpanded && (
        <div className="bg-slate-50/50 border-t border-slate-100 px-5 py-4 animate-in slide-in-from-top-1 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mock Expanded Content 1: Top Opps */}
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Oportunidades</h5>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs bg-white p-2 rounded border border-slate-100 shadow-sm">
                  <span className="text-slate-700 font-medium">Cross-sell: Bebidas</span>
                  <span className="text-emerald-600 font-bold">+R$ 450</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-white p-2 rounded border border-slate-100 shadow-sm">
                  <span className="text-slate-700 font-medium">Upsell: Batata G</span>
                  <span className="text-emerald-600 font-bold">+R$ 120</span>
                </div>
              </div>
            </div>

            {/* Mock Content 2: Funnel Insight */}
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perda no Funil</h5>
              <div className="bg-white p-3 rounded border border-slate-100 h-full flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-50 rounded text-red-500"><Target size={14} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Visualizou → Clicou</p>
                    <p className="text-[10px] text-slate-500">Maior ponto de atrito</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-red-500">-64%</span>
              </div>
            </div>

            {/* Mock Content 3: Top Trigger */}
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gatilho de Sucesso</h5>
              <div className="bg-white p-3 rounded border border-slate-100 h-full flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-50 rounded text-emerald-500"><Sparkles size={14} /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Checkout Sugerido</p>
                    <p className="text-[10px] text-slate-500">Melhor performance</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-600">42%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
