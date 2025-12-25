import React from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Info
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/Tooltip';

export function WeatherSuggestionCard({
  suggestion,
  onApply,
  onViewEvidence,
  onEdit
}) {
  const {
    id,
    timing,
    confidence, // 'high', 'medium', 'low'
    title,
    insight,
    actions,
    impact,
    history
  } = suggestion;

  // Visual helpers based on confidence
  const confidenceConfig = {
    high: { color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle2, label: 'Confiança Alta' },
    medium: { color: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertTriangle, label: 'Confiança Média' },
    low: { color: 'text-slate-600 bg-slate-50 border-slate-200', icon: Info, label: 'Confiança Baixa' }
  };

  const confInfo = confidenceConfig[confidence] || confidenceConfig.medium;
  const ConfIcon = confInfo.icon;

  return (
    <Card className="flex flex-col border-l-4 border-l-purple-500 hover:shadow-md transition-shadow group">

      {/* Header: Timing & Confidence */}
      <CardHeader className="pb-3 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100 flex items-center gap-1.5 px-2.5">
            <Clock size={12} />
            {timing}
          </Badge>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("text-[10px] font-medium px-2 py-1 rounded-full border flex items-center gap-1 cursor-help", confInfo.color)}>
                  <ConfIcon size={12} />
                  {confInfo.label}
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[220px]">
                <p>Baseado em {history?.sessions || 'histórico'} sessões em dias com clima similar ({history?.days || '14 dias'}).</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-2 flex-grow">
        {/* Title */}
        <h3 className="font-bold text-slate-900 text-lg mb-3 leading-tight">
          {title}
        </h3>

        {/* Why Now */}
        <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Por que aplicar agora?</p>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            {insight}
          </p>
        </div>

        {/* What Will Be Applied */}
        <div className="mb-4 space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase">O que será aplicado:</p>
          <ul className="space-y-1.5">
            {actions.map((action, idx) => (
              <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                {action}
              </li>
            ))}
          </ul>
        </div>

        {/* Impact */}
        <div className="flex items-center gap-3 p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg">
          <div className="p-1.5 bg-emerald-100 rounded text-emerald-700">
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-800 uppercase">Impacto Estimado</p>
            <p className="text-sm font-bold text-emerald-700">{impact}</p>
          </div>
        </div>

        {/* Trust Metadata */}
        <div className="mt-3 text-[10px] text-slate-400 text-right">
          Base: {history?.sessions || '1.2k'} sessões analisadas
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center gap-2">
        <Button
          size="sm"
          onClick={() => onApply(suggestion)}
          className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm flex-1"
        >
          Aplicar agora
        </Button>


      </CardFooter>
    </Card>
  );
}
