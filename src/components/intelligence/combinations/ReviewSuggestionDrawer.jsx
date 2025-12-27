import React from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Sparkles, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';

export function ReviewSuggestionDrawer({ isOpen, onClose, suggestion, onApply, onEditBefore }) {
  if (!suggestion) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Revisar Sugestão"
      size="lg"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-8 overflow-y-auto px-1 py-1">

          {/* Header Context */}
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-full text-purple-600 mt-1">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-purple-900 text-lg">{suggestion.name}</h3>
                <p className="text-purple-700 text-sm mt-1 mb-3">
                  Sugerimos agrupar estes itens pois eles aparecem juntos em <strong>{suggestion.affinity_score || '35%'}</strong> dos pedidos recentes.
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-purple-200 text-purple-800 border-purple-300">Impacto {suggestion.impact}</Badge>
                  <Badge className="bg-white text-slate-600 border-slate-200">Confiança {suggestion.confidence}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Evidence */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-[10px]">Evidência</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-lg">
                <div className="text-slate-500 text-xs mb-1">Base Analisada</div>
                <div className="text-xl font-bold text-slate-900">{suggestion.base_size}</div>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-lg">
                <div className="text-slate-500 text-xs mb-1">Frequência Conjunta</div>
                <div className="text-xl font-bold text-emerald-600">High</div>
              </div>
            </div>
          </div>

          {/* 2. What Changes (Diff) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-[10px]">O que vai mudar</h4>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex-1 p-3 bg-white rounded border border-slate-200 opacity-60">
                  <div className="font-bold text-slate-500">Separados</div>
                  <div className="text-slate-400 mt-1">{suggestion.items.join(' + ')}</div>
                </div>
                <ArrowRight size={20} className="text-slate-400" />
                <div className="flex-1 p-3 bg-white rounded border border-emerald-200 shadow-sm ring-1 ring-emerald-50">
                  <div className="font-bold text-emerald-700">Combo Sugerido</div>
                  <div className="text-emerald-900 mt-1">{suggestion.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Impact Simulation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-[10px]">Simulação de Impacto</h4>
            <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
              <TrendingUp size={24} className="text-emerald-600" />
              <div>
                <div className="font-bold text-emerald-900 text-lg">{suggestion.estimated_revenue}</div>
                <div className="text-emerald-700 text-xs">Receita incremental estimada por mês</div>
              </div>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-slate-100 mt-auto bg-white">
          <Button variant="outline" className="text-slate-500" onClick={onClose}>Cancelar</Button>
          <div className="flex-1 flex gap-3 justify-end">
            <Button variant="outline" onClick={onEditBefore}>Editar antes</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white min-w-[120px]" onClick={onApply}>
              <Sparkles size={16} className="mr-2" /> Aplicar
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
