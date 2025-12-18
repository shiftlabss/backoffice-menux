import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Sparkles, TrendingUp, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function MaestroIntelligence() {
  return (
    <Card className="relative overflow-hidden h-full flex flex-col border border-gray-200 shadow-sm group rounded-xl bg-white">
      <div className="relative p-6 lg:p-8 flex flex-col justify-between h-full gap-6">

        {/* HEADER & ZONE 1: Executive Forecast */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
              <Sparkles className="w-5 h-5 text-gray-900" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">Maestro Intelligence</h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Análise operacional em tempo real</p>
            </div>
          </div>

          <div className="mt-2">
            <span className="text-sm font-medium text-gray-400 block mb-3 uppercase tracking-wider text-[10px]">Previsão de Fechamento</span>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tighter">R$ 28k</span>
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1.5 shadow-sm transform translate-y-[-4px]">
                <TrendingUp className="w-3.5 h-3.5" /> +12% meta
              </span>
            </div>
          </div>
        </div>

        {/* ZONE 2: Reliability */}
        <div className="space-y-3 py-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-semibold text-gray-500">Confiabilidade da previsão</span>
            <span className="text-sm font-bold text-gray-900">92%</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 w-[92%] rounded-full relative overflow-hidden" />
          </div>
          <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Alta confiança nos dados
          </p>
        </div>

        {/* ZONE 3: Opportunity */}
        <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100/50 relative overflow-hidden group-hover:border-amber-200 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-700 mb-2">
              <div className="p-1 bg-amber-100 rounded-full">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Oportunidade Detectada</span>
            </div>
            <p className="text-lg text-gray-900 font-medium leading-relaxed">
              Ofertar <span className="font-bold underline decoration-amber-300 underline-offset-4">Vinhos Tintos</span> no jantar de hoje.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-1 rounded-md border border-emerald-100 shadow-sm">
                +R$ 1.200 receita
              </span>
            </div>
          </div>
        </div>

        {/* ZONE 4: Action */}
        <div className="flex items-center gap-4 mt-auto pt-2">
          <Button className="flex-1 bg-gray-900 hover:bg-black text-white font-bold text-sm h-11 shadow-md transition-all rounded-xl">
            Aplicar Estratégia
          </Button>
          <Button variant="outline" className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-gray-200 font-bold text-sm h-11 rounded-xl">
            Ignorar
          </Button>
        </div>

      </div>
    </Card>
  );
}
