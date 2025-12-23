import React, { useState, useEffect } from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Form';
import { Skeleton } from '../../ui/Skeleton';
import {
  TrendingUp,
  BarChart3,
  Target,
  AlertTriangle,
  ArrowRight,
  Check,
  Calendar,
  Clock,
  Loader2
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import toast from 'react-hot-toast';

// Mock Data Generator for Evidence
const getMockEvidence = (suggestionId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate randomization for demo purposes
      if (Math.random() > 0.95) {
        reject(new Error("Failed to fetch evidence"));
        return;
      }

      resolve({
        id: suggestionId,
        type: 'pricing_optimization',
        stats: {
          current_conversion: '12.5%',
          projected_conversion: '15.8%',
          uplift: '+26%',
          base_orders: 1450,
          period: 'Últimos 30 dias'
        },
        insight: {
          main: "Tivemos 1450 pedidos deste item nos últimos 30 dias. A elasticidade de preço indica que um aumento de R$ 2,00 não afetará a conversão negativa.",
          secondary: "Itens similares na região estão com preço médio 15% acima do seu."
        },
        segments: {
          top: "Famílias (Jantar)",
          bottom: "Almoço individual"
        },
        chartData: [45, 48, 42, 55, 59, 65] // simple trend
      });
    }, 1200); // 1.2s delay for realism
  });
};

export function SuggestionEvidenceDrawer({ isOpen, onClose, suggestion, onApply, onRefuse }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  // Fetch logic
  useEffect(() => {
    if (isOpen && suggestion?.id) {
      setLoading(true);
      setError(null);
      getMockEvidence(suggestion.id)
        .then(data => {
          setData(data);
          setLoading(false);
          // Audit Log
          console.log(`[AUDIT] actionId: maestro.suggestion.evidence.open | suggestionId: ${suggestion.id}`);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else if (!isOpen) {
      // Reset on close
      setData(null);
      setLoading(true);
    }
  }, [isOpen, suggestion]);

  const handleApply = async () => {
    setIsApplying(true);
    // Audit Log handled by parent or here? Spec says "maestro.suggestion.apply.single"
    // We'll trust parent `onApply` to handle the actual logic which triggers the toast/state update
    await onApply(suggestion.id);
    setIsApplying(false);
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Evidência da Sugestão"
      size="md"
      className="z-[60]" // Higher Z-Index than Modal (50)
      footer={
        <div className="flex w-full gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Fechar
          </Button>
          {!suggestion?.isApplied && (
            <Button
              className="flex-[2] bg-slate-900 hover:bg-black text-white"
              onClick={handleApply}
              disabled={loading || error || isApplying}
            >
              {isApplying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Aplicando...
                </>
              ) : (
                "Aplicar agora"
              )}
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-8">

        {/* Header Section */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                  {data?.type?.replace('_', ' ') || 'Oportunidade'}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 flex items-center gap-1">
                  <TrendingUp size={12} /> {suggestion?.impact}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  {suggestion?.confidence}% Confiança
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                {suggestion?.title}
              </h3>
            </>
          )}
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex flex-col items-center text-center gap-2">
            <AlertTriangle className="text-red-500 h-8 w-8" />
            <p className="text-sm text-red-700 font-medium">Não foi possível carregar a evidência.</p>
            <Button variant="outline" size="sm" onClick={() => getMockEvidence(suggestion.id)} className="mt-2">
              Tentar novamente
            </Button>
          </div>
        )}

        {/* Main Evidence Content */}
        {!loading && !error && data && (
          <>
            {/* Section 2: Objective Evidence */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Target size={14} /> Por que sugerimos isso?
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {data.insight.main}
              </p>
              <p className="text-xs text-slate-500 mt-2 pl-3 border-l-2 border-slate-200">
                {data.insight.secondary}
              </p>
            </div>

            {/* Section 3: Comparative */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart3 size={14} /> Comparativo ({data.stats.period})
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-slate-100 bg-white shadow-sm">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Atual</span>
                  <div className="text-2xl font-bold text-slate-700 mt-1">{data.stats.current_conversion}</div>
                  <span className="text-xs text-slate-500">Conversão de vendas</span>
                </div>
                <div className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/30 relative overflow-hidden">
                  <div className="absolute right-0 top-0 p-1 bg-emerald-100 rounded-bl-lg">
                    <ArrowRight className="w-3 h-3 text-emerald-600 -rotate-45" />
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Projetado</span>
                  <div className="text-2xl font-bold text-emerald-700 mt-1">{data.stats.projected_conversion}</div>
                  <span className="text-xs text-emerald-600 font-medium">Uplift de {data.stats.uplift}</span>
                </div>
              </div>
            </div>

            {/* Section 4: Context Data */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="block text-xs text-slate-400 mb-1">Funciona melhor com</span>
                <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-500" />
                  {data.segments.top}
                </div>
              </div>
              <div>
                <span className="block text-xs text-slate-400 mb-1">Base de análise</span>
                <div className="text-sm font-semibold text-slate-800">
                  {data.stats.base_orders} pedidos
                </div>
              </div>
            </div>
          </>
        )}

        {/* Loading Skeleton for Content */}
        {loading && (
          <div className="space-y-6">
            <Skeleton className="h-32 w-full rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        )}

      </div>
    </Drawer>
  );
}
