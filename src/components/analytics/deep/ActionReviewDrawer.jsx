import React, { useState } from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import {
  Lightbulb, CheckCircle2, TrendingUp, AlertCircle,
  ArrowRight, Clock, ChevronRight
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { toast } from 'react-hot-toast';

export function ActionReviewDrawer({
  isOpen,
  onClose,
  action,
  onApply,
  onEdit,
  onMarkSeen
}) {
  const [isApplying, setIsApplying] = useState(false);

  if (!action) return null;

  // Mock extended data if missing from simple action object
  const details = {
    reason: action.reason || "O algoritmo identificou uma oportunidade de maximizar a margem de contribuição com base no comportamento recente de vendas.",
    type: action.type || "Destaque",
    confidence: action.confidence || "Alta",
    base_metric: action.base_metric || "Conversão atual: 2.1%",
    projected_metric: action.projected_metric || "Projeção: 3.5%",
    checklist: action.checklist || [
      "Verificar disponibilidade de estoque",
      "Confirmar qualidade da foto do item",
      "Posicionar como 1º destaque da categoria"
    ],
    diff_before: action.diff_before || "Item na 14ª posição",
    diff_after: action.diff_after || "Item em 1º Destaque"
  };

  const handleApply = () => {
    setIsApplying(true);
    // Simulate async operation
    setTimeout(() => {
      setIsApplying(false);
      onApply(action);
    }, 800);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Revisar Ação Recomendada"
      size="lg"
    >
      <div className="space-y-8 pb-24">

        {/* Header Section */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-bold text-slate-900 text-lg leading-snug">
                {action.action}
              </h3>
              <Badge variant="secondary" className="bg-white text-indigo-700 shadow-sm border-indigo-100 shrink-0">
                {details.confidence} Confiança
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1">
              <BadgeWrapper icon={Lightbulb}>{details.type}</BadgeWrapper>
              <BadgeWrapper icon={TrendingUp} className="text-emerald-700 bg-emerald-50 border-emerald-200">
                {action.impact} ref. mês
              </BadgeWrapper>
            </div>
          </div>
        </div>

        {/* Section 1: Reason */}
        <div>
          <SectionHeader title="Por que esta sugestão?" icon={AlertCircle} />
          <p className="text-slate-600 leading-relaxed text-sm pl-1">
            {details.reason}
          </p>
        </div>

        {/* Section 2: Evidence */}
        <div>
          <SectionHeader title="Evidência e Impacto" icon={TrendingUp} />
          <div className="grid grid-cols-2 gap-4 mt-2">
            <MetricCard label="Base Atual" value={details.base_metric} />
            <MetricCard label="Projeção" value={details.projected_metric} highlight />
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <AlertCircle size={10} /> Estimativa baseada em itens similares nos últimos 30 dias.
          </p>
        </div>

        {/* Section 3: Visual Diff */}
        <div>
          <SectionHeader title="O que vai mudar" icon={Clock} />
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 mt-2">
            <div className="flex-1 text-center opacity-70">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Antes</p>
              <p className="text-sm font-medium text-slate-700">{details.diff_before}</p>
            </div>
            <ArrowRight className="text-slate-300" />
            <div className="flex-1 text-center">
              <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Depois</p>
              <p className="text-sm font-bold text-slate-900">{details.diff_after}</p>
            </div>
          </div>
        </div>

        {/* Section 4: Action Plan */}
        <div>
          <SectionHeader title="Plano de Execução" icon={CheckCircle2} />
          <div className="space-y-3 mt-2">
            {details.checklist.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Actions - Fixed Bottom or Inline? Drawer handles placement usually, but we'll append. */}
      {/* Assuming Drawer doesn't auto-handle footer, we place it at bottom of scroll or container. 
          For consistency with other drawers, using a sticky bottom section if possible, 
          but usually simplistic is safer. Vertical stack as requested. 
      */}
      <div className="pt-6 border-t border-slate-200 flex flex-col gap-3 mt-auto">
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 h-12 text-base"
          onClick={handleApply}
          disabled={isApplying}
        >
          {isApplying ? "Aplicando..." : "Aplicar agora"}
        </Button>
      </div>
    </Drawer>
  );
}

// Helpers
function SectionHeader({ title, icon: Icon }) {
  return (
    <h4 className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3 mt-6">
      <Icon size={16} className="text-indigo-600" />
      {title}
    </h4>
  );
}

function BadgeWrapper({ children, icon: Icon, className }) {
  return (
    <Badge variant="outline" className={cn("bg-slate-50 border-slate-200 text-slate-600 flex items-center gap-1.5", className)}>
      {Icon && <Icon size={10} />}
      {children}
    </Badge>
  );
}

function MetricCard({ label, value, highlight }) {
  return (
    <div className={cn(
      "p-3 rounded-lg border text-center",
      highlight ? "bg-indigo-50 border-indigo-100" : "bg-white border-slate-100"
    )}>
      <p className="text-[10px] uppercase tracking-wide text-slate-500 font-bold mb-1">{label}</p>
      <p className={cn("text-sm font-bold", highlight ? "text-indigo-700" : "text-slate-700")}>{value}</p>
    </div>
  );
}
