import React from 'react';
import { Drawer } from '../../ui/Drawer';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import {
  Check,
  X,
  TrendingUp,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  MousePointer2
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useAudit } from '../../../hooks/useAudit';
import { useState } from 'react';
import { SuggestionEvidenceDrawer } from './SuggestionEvidenceDrawer';
import { MaestroRuleWizard } from './MaestroRuleWizard';

/**
 * Drawer para detalhamento da KPI "Aceitação do Maestro"
 */
export function MaestroAcceptanceDrawer({ isOpen, onClose, item }) {
  const { log } = useAudit();
  const [showEvidence, setShowEvidence] = useState(false);
  const [showRuleWizard, setShowRuleWizard] = useState(false);

  // MOCK DATA - Em produção viria do item ou hook
  const acceptanceData = {
    rate: item?.maestro?.acceptance?.rate || 0,
    accepted: item?.maestro?.acceptance?.accepted || 0,
    shown: item?.maestro?.acceptance?.base || 0,
    trend: item?.maestro?.acceptance?.trend || 'stable',
    delta: item?.maestro?.acceptance?.delta || 0,

    breakdown: {
      channels: [
        { name: 'Salão', rate: 28.5, volume: 84 },
        { name: 'Delivery', rate: 14.2, volume: 42 },
        { name: 'Takeaway', rate: 18.0, volume: 16 }
      ],
      shifts: [
        { name: 'Almoço', rate: 22.1 },
        { name: 'Jantar', rate: 35.4 }
      ]
    },
    triggers: [
      { name: 'Ociosidade (>15min)', success: 42, count: 120 },
      { name: 'Harmonização (Bebida)', success: 35, count: 85 },
      { name: 'Upsell de Tamanho', success: 18, count: 210 }
    ],
    rejection_reasons: [
      { reason: 'Cliente fechou o modal', count: 45, percent: 41 },
      { reason: 'Timeout (ignorou)', count: 38, percent: 34 },
      { reason: 'Navegou para outro item', count: 27, percent: 25 }
    ]
  };

  if (!item) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Aceitação do Maestro"
      subtitle={`Análise de performance das sugestões para ${item.name}`}
      size="lg"
    >
      <div className="space-y-8 pb-8">

        {/* 1. HERO METRIC */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Aceitação Geral</span>
                </div>
                <Badge variant="outline" className="bg-white text-emerald-700 border-emerald-200 font-bold text-[10px] h-5 px-1.5">
                  {acceptanceData.trend === 'up' ? '+' : ''}{acceptanceData.delta}%
                </Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-gray-900">{acceptanceData.rate}%</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-emerald-800/70">
              <strong>{acceptanceData.accepted}</strong> aceitas de <strong>{acceptanceData.shown}</strong> exibidas
            </div>
          </div>

          <div className="col-span-2 p-4 bg-white rounded-2xl border border-gray-100 flex flex-col">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Funil de Sugestões</h4>
            <div className="flex items-center justify-between gap-2 h-full">
              {/* Funnel Visualization */}
              <div className="flex-1 flex flex-col items-center">
                <div className="text-lg font-bold text-gray-900">{acceptanceData.shown}</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Exibidas</div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-2" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
              <div className="flex-1 flex flex-col items-center">
                <div className="text-lg font-bold text-gray-900">{Math.round(acceptanceData.shown * 0.6)}</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Visualizadas</div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-blue-400 w-[60%]" />
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
              <div className="flex-1 flex flex-col items-center">
                <div className="text-lg font-bold text-emerald-600">{acceptanceData.accepted}</div>
                <div className="text-[10px] text-emerald-600 uppercase font-bold">Aceitas</div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[22%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CHART PLACEHOLDER (Time Series) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-gray-900">Evolução Diária</h4>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1 text-gray-500"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Aceitas</span>
              <span className="flex items-center gap-1 text-gray-500"><div className="w-2 h-2 rounded-full bg-gray-300" /> Exibidas</span>
            </div>
          </div>
          <div className="h-40 w-full bg-white border border-dashed border-gray-200 rounded-xl flex items-end justify-between px-4 pb-2 pt-8 relative gap-2">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group cursor-pointer">
                <div style={{ height: `${h}%` }} className="w-full bg-gray-100 rounded-t-sm relative">
                  <div style={{ height: `${h * (0.2 + (i % 3) * 0.1)}%` }} className="w-full bg-emerald-400 absolute bottom-0 rounded-t-sm group-hover:bg-emerald-500 transition-colors" />
                </div>
                <span className="text-[9px] text-center text-gray-300 hidden group-hover:block absolute bottom-1 w-full left-0">{i + 1}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. BREAKDOWNS */}
        <div className="grid grid-cols-2 gap-8">
          {/* Triggers com maior sucesso */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Gatilhos de Sucesso
            </h4>
            <div className="space-y-3">
              {acceptanceData.triggers.map((trigger, i) => (
                <div key={i} className="flex items-center justify-between pb-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs font-bold text-gray-700">{trigger.name}</p>
                    <p className="text-[10px] text-gray-400">{trigger.count} exibições</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600">{trigger.success}%</span>
                    <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${trigger.success}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivos de Rejeição */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <ThumbsDown className="w-4 h-4 text-red-400" /> Motivos de Rejeição
            </h4>
            <div className="space-y-3">
              {acceptanceData.rejection_reasons.map((reason, i) => (
                <div key={i} className="flex items-center justify-between pb-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs font-medium text-gray-600">{reason.reason}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-900">{reason.percent}%</span>
                    <p className="text-[10px] text-gray-400">{reason.count} oc.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. ACTIONS */}


      </div>

      {/* Secondary Drawers */}
      <SuggestionEvidenceDrawer
        isOpen={showEvidence}
        onClose={() => setShowEvidence(false)}
        suggestion={item}
      />

      {/* Rule Wizard removed as per request */}

    </Drawer>
  );
}
