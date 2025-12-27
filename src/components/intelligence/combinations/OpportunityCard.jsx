import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { TrendingUp, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { toast } from 'react-hot-toast';

export function OpportunityCard({
  type = 'Combo', // Combo, Harmonização, Tamanho
  impact = 'Alto', // Alto, Médio, Baixo
  title,
  description,
  metrics,
  tags,
  onApply,
  onIgnore,
  onDetails
}) {
  const impactColors = {
    Alto: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Médio: 'bg-amber-50 text-amber-700 border-amber-100',
    Baixo: 'bg-slate-50 text-slate-600 border-slate-100',
    default: 'bg-slate-50 text-slate-600 border-slate-100'
  };

  const impactColor = impactColors[impact] || impactColors.default;

  return (
    <Card className="flex flex-col h-full bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-md group">
      <div className="p-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-wider">
              {type}
            </Badge>
          </div>
          <Badge className={cn("text-[10px] font-bold px-2 py-0.5 border", impactColor)}>
            Impacto {impact}
          </Badge>
        </div>

        {/* Content */}
        <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight group-hover:text-purple-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Metrics Block */}
        <div className="mt-auto bg-slate-50 rounded-lg p-3 border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-emerald-600" />
            <span className="font-bold text-slate-900 text-sm">{metrics.projection}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">/mês estim.</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 size={12} className="text-slate-400" />
            <span className="truncate">{metrics.evidence}</span>
          </div>
        </div>

        {/* Footer Tags */}
        <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-medium uppercase tracking-wide">
          <span className="flex items-center gap-1">
            Confiança {tags.confidence}
          </span>
          <span className="flex items-center gap-1">
            Base {tags.base}
          </span>
          <span className="flex items-center gap-1">
            Tempo {tags.time}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center gap-2">
        {onApply ? (
          <Button
            className="flex-1 bg-slate-900 text-white hover:bg-slate-800 h-8 text-xs font-bold"
            onClick={onApply}
          >
            Aplicar
          </Button>
        ) : (
          <div className="flex-1 group/tooltip relative">
            <Button className="w-full bg-slate-200 text-slate-400 cursor-not-allowed h-8 text-xs font-bold">
              Aplicar
            </Button>
            {/* Tooltip fallback for simple implementation */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none whitespace-nowrap">
              Em breve
            </div>
          </div>
        )}

        <Button
          variant="outline"
          className="flex-1 border-slate-200 text-slate-600 hover:text-slate-900 h-8 text-xs font-bold"
          onClick={onDetails}
        >
          Ver detalhes
        </Button>
      </div>
    </Card>
  );
}
