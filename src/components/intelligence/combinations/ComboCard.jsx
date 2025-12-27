import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/Tooltip';
import {
  MoreHorizontal,
  Info,
  Sparkles,
  CheckCircle2,
  PauseCircle,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  Target
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/DropdownMenu';

export function ComboCard({
  combo,
  variant = 'active', // 'active' | 'suggested'
  onEdit,
  onToggleStatus,
  onPerformance,
  onReview,
  onIgnore,
  onDuplicate,
  onArchive
}) {
  const isSuggested = variant === 'suggested';

  // Status Badge Logic
  const getStatusBadge = () => {
    if (isSuggested) return <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-[10px]"><Sparkles size={10} className="mr-1" /> Sugerido</Badge>;
    if (combo.status === 'Active') return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]"><CheckCircle2 size={10} className="mr-1" /> Ativo</Badge>;
    return <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]"><PauseCircle size={10} className="mr-1" /> Pausado</Badge>;
  };

  // Helper for metrics visualization
  const MetricObj = ({ label, value, sub, tooltip }) => (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <span className="text-xs font-bold text-slate-700">{value}</span>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={10} className="text-slate-300 hover:text-slate-500" />
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <span className="text-[10px] text-slate-400">{label}</span>
      {sub && <span className="text-[10px] font-medium text-emerald-600">{sub}</span>}
    </div>
  );

  return (
    <Card className={cn(
      "flex flex-col justify-between p-5 transition-all border",
      isSuggested
        ? "bg-purple-50/20 border-purple-100 hover:border-purple-200 hover:shadow-md hover:shadow-purple-100/20"
        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
    )}>
      {/* 1. Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 leading-tight">{combo.name}</h3>
            {getStatusBadge()}
          </div>
          {/* Tags for Suggested */}
          {isSuggested && (
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[10px] font-bold border",
                combo.impact === 'Alto' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                  combo.impact === 'Médio' ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                    "bg-slate-50 text-slate-600 border-slate-100"
              )}>
                Impacto {combo.impact}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-100">
                Confiança {combo.confidence}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {combo.time_estimate}
              </span>
            </div>
          )}
        </div>

        {/* Actions Menu */}
        {!isSuggested && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100">
                <MoreHorizontal size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onDuplicate}>Duplicar</DropdownMenuItem>
              <DropdownMenuItem onClick={onPerformance}>Ver Performance</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={onArchive}>Arquivar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* 2. Composition */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-xs text-slate-600 mb-5 truncate cursor-default">
              {combo.items.join(' + ')}
            </p>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start">
            {combo.items.join(' + ')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* 3. Mini KPIs */}
      <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100/80 mb-4">
        <MetricObj
          label={isSuggested ? "Est. Receita" : "Receita (Período)"}
          value={isSuggested ? combo.estimated_revenue : combo.revenue}
          sub={!isSuggested && combo.revenue_trend}
          tooltip={isSuggested ? "Projeção mensal baseada em hist. de vendas" : "Vendas realizadas no período selecionado"}
        />
        <MetricObj
          label="Ticket Lift"
          value={combo.ticket_lift}
          tooltip="% de aumento no ticket médio quando este combo é vendido vs baseline"
        />
        <MetricObj
          label={isSuggested ? "Base Analisada" : "Pedidos"}
          value={isSuggested ? combo.base_size : combo.orders_count}
          tooltip="Volume de dados usado para esta métrica"
        />
      </div>

      {/* 4. Evidence (Suggested Only) */}
      {isSuggested && combo.evidence && (
        <div className="mb-4 text-xs text-slate-500 italic bg-purple-50/50 p-2 rounded border border-purple-100/50">
          <Sparkles size={10} className="inline text-purple-500 mr-1" />
          {combo.evidence}
        </div>
      )}


      {/* 5. CTAs */}
      <div className="flex items-center gap-2">
        {isSuggested ? (
          <>
            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-9 text-xs font-bold shadow-sm shadow-purple-200"
              onClick={onReview}
            >
              Revisar
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-9 text-xs border-slate-200 text-slate-500 hover:text-slate-700"
              onClick={onIgnore}
            >
              Ignorar (7d)
            </Button>
            <Button
              variant="ghost"
              className="h-9 w-9 p-0 text-slate-400 hover:text-purple-600"
              title="Ver evidência"
              onClick={() => { }} // Could open evidence drawer
            >
              <Target size={16} />
            </Button>
          </>
        ) : (
          <>
            <Button
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white h-9 text-xs font-bold"
              onClick={onEdit}
            >
              Editar
            </Button>
            {/* Toggle Status */}
            <div className="flex items-center gap-2 pl-2">
              {/* Custom Toggle or Button for status */}
              <button
                onClick={onToggleStatus}
                className={cn(
                  "text-xs font-bold px-3 py-2 rounded-md transition-all border",
                  combo.status === 'Active'
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                )}
              >
                {combo.status === 'Active' ? 'Ativo' : 'Pausado'}
              </button>
            </div>
            <Button
              variant="ghost"
              className="ml-auto h-9 px-2 text-xs text-slate-400 hover:text-purple-600"
              onClick={onPerformance}
            >
              Ver perf.
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
