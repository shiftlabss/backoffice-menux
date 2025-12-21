
import React from 'react';
import { AlertOctagon, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Button';

export function QuickDiagnosis({ diagnosis }) {
  if (!diagnosis) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Bottleneck Card */}
      <div className="bg-red-50/50 rounded-xl p-5 border border-red-100 group hover:border-red-200 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <AlertOctagon size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-900">Gargalo do Dia</h4>
            <div className="flex items-center gap-1.5 text-xs text-red-700/80">
              <span className="font-semibold">{diagnosis.bottleneck.stage}</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-700">{diagnosis.bottleneck.dropoff}</span>
            <span className="text-xs font-semibold text-red-500 uppercase">Perda</span>
          </div>
          <p className="text-xs text-red-600 mt-1">Est. {diagnosis.bottleneck.lostRevenue} em vendas perdidas.</p>
        </div>
        <Button variant="ghost" size="sm" className="w-full bg-white/50 hover:bg-white text-red-700 text-xs font-bold justify-between group-hover:bg-white">
          Ver Detalhes do Funil
          <ArrowRight size={14} />
        </Button>
      </div>

      {/* Star Item Card */}
      <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100 group hover:border-emerald-200 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900">Item Estrela</h4>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700/80">
              <span>{diagnosis.starItem.name}</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-700">{diagnosis.starItem.metric}</span>
          </div>
          <p className="text-xs text-emerald-600 mt-1">{diagnosis.starItem.label}.</p>
        </div>
        <Button variant="ghost" size="sm" className="w-full bg-white/50 hover:bg-white text-emerald-700 text-xs font-bold justify-between group-hover:bg-white">
          Ver Performance
          <ArrowRight size={14} />
        </Button>
      </div>

      {/* Problem Item Card */}
      <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100 group hover:border-amber-200 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">Atenção Necessária</h4>
            <div className="flex items-center gap-1.5 text-xs text-amber-700/80">
              <span>{diagnosis.problemItem.name}</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-700">{diagnosis.problemItem.metric}</span>
          </div>
          <p className="text-xs text-amber-600 mt-1">{diagnosis.problemItem.label}.</p>
        </div>
        <Button variant="ghost" size="sm" className="w-full bg-white/50 hover:bg-white text-amber-700 text-xs font-bold justify-between group-hover:bg-white">
          Investigar Item
          <ArrowRight size={14} />
        </Button>
      </div>

    </div>
  );
}
