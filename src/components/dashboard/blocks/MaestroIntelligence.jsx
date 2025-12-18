import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import {
  Sparkles,
  Zap,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Target,
  ShieldCheck,
  BookOpen,
  PlayCircle,
  MoreHorizontal
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { cn } from '../../../lib/utils';
import toast from 'react-hot-toast';

// --- MOCK DATA ---
const SUMMARY_KPIS = [
  { label: 'Oportunidades', value: '3', icon: Zap, color: 'text-amber-500 bg-amber-50 border-amber-100' },
  { label: 'Receita Est.', value: 'R$ 1.850', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  { label: 'Confiabilidade', value: '94%', icon: ShieldCheck, color: 'text-blue-600 bg-blue-50 border-blue-100' },
];

const ACTIONS = [
  {
    id: 1,
    title: 'Ativar Combo Família',
    reason: 'Alta demanda prevista para 12h30',
    priority: 'Alta',
    impact: 'R$ 450',
    type: 'upsell'
  },
  {
    id: 2,
    title: 'Repor Estoque Coca-Cola',
    reason: 'Estoque projetado acabar < 1h',
    priority: 'Alta',
    impact: 'Risco',
    type: 'stock'
  },
  {
    id: 3,
    title: 'Oferta Relâmpago Sobremesa',
    reason: 'Conversão abaixo da média (8%)',
    priority: 'Média',
    impact: 'R$ 220',
    type: 'promo'
  }
];

const IMPACT_PROOF = [
  { label: 'Receita Influenciada', value: 'R$ 3.450' },
  { label: 'Pedidos', value: '42' },
  { label: 'Conversão Extra', value: '+4.2%' },
  { label: 'Partic. IA', value: '28%' },
];

export default function MaestroIntelligence() {
  const [activeActionId, setActiveActionId] = useState(null);

  const handleApply = (id) => {
    setActiveActionId(id);
    setTimeout(() => {
      setActiveActionId(null);
      toast.success('Ação aplicada com sucesso!');
    }, 1500);
  };

  const handleIgnore = () => {
    toast('Sugestão ignorada', { icon: '🙈' });
  };

  return (
    <Card className="flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden relative group">

      {/* 1. HEADER */}
      <div className="px-5 py-4 border-b border-gray-100 bg-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 p-1.5 rounded-lg shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 leading-none">Maestro</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
              <span className="text-xs text-gray-400 font-normal flex items-center gap-0.5">
                <Clock className="w-3 h-3" />
                {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-xs font-medium text-gray-600 bg-gray-50 border-gray-200 px-2.5 py-0.5">
          Hoje
        </Badge>
      </div>

      {/* 2. EXECUTIVE SUMMARY */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100 bg-gray-50/30">
        {SUMMARY_KPIS.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="p-3 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400 mb-1 flex items-center gap-1">
                {kpi.label}
              </span>
              <div className="flex items-center gap-2">
                <span className={cn("text-base font-bold text-gray-900")}>{kpi.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-0">

        {/* 3. PRIORITY ACTIONS */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Ações Prioritárias
            </h4>
            <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-1.5 rounded border border-gray-100">Top 3</span>
          </div>

          {ACTIONS.map((action) => (
            <div key={action.id} className="group relative bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:border-gray-300 transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-1">
                <div className="flex gap-2 items-start">
                  <Badge className={cn(
                    "text-[10px] font-bold px-1.5 py-0 rounded h-5 mt-0.5",
                    action.priority === 'Alta' ? "bg-red-50 text-red-700 border-red-100" : "bg-amber-50 text-amber-700 border-amber-100"
                  )}>
                    {action.priority}
                  </Badge>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 leading-tight">{action.title}</h5>
                    <p className="text-xs font-normal text-gray-500 mt-0.5">{action.reason}</p>
                  </div>
                </div>
                {/* Impact Badge */}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 shadow-sm shrink-0">
                  {action.impact.includes('R$') ? '+' : ''}{action.impact}
                </span>
              </div>

              {/* Actions Overlay/Row */}
              <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleIgnore}
                  className="h-7 text-xs text-gray-400 hover:text-gray-600 font-medium px-2"
                >
                  Ignorar
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleApply(action.id)}
                  disabled={activeActionId === action.id}
                  className={cn(
                    "h-7 text-xs font-bold gap-1 transition-all",
                    activeActionId === action.id ? "w-24 bg-gray-100 text-gray-400" : "bg-gray-900 text-white hover:bg-black w-auto px-3"
                  )}
                >
                  {activeActionId === action.id ? 'Aplicando...' : (
                    <>
                      Aplicar <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. IMPACT PROOF */}
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-3.5 h-3.5 text-gray-400" />
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Impacto Real (Hoje)</h4>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              {IMPACT_PROOF.map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-200/50 pb-1 last:border-0 [&:nth-child(3)]:border-0">
                  <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                  <span className="text-xs font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. FOOTER PLAYBOOKS */}
      <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs font-medium text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 justify-start gap-2">
          <BookOpen className="w-3.5 h-3.5 text-gray-400" />
          Playbooks
        </Button>
        <div className="w-px h-4 bg-gray-200"></div>
        <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs font-medium text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 justify-start gap-2">
          <PlayCircle className="w-3.5 h-3.5 text-gray-400" />
          Revisão Turno
        </Button>
      </div>

    </Card>
  );
}
