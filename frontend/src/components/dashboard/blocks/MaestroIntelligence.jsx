import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Sparkles, TrendingUp, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function MaestroIntelligence() {
  return (
    <Card className="relative overflow-hidden h-full flex flex-col border border-gray-200 shadow-sm group rounded-xl bg-white">
      <div className="relative p-6 lg:p-8 flex flex-col justify-between h-full">

        {/* HEADER & ZONE 1: Executive Forecast */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg border border-gray-200">
              <Sparkles className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">Maestro Intelligence</h3>
              <p className="text-xs text-gray-500 font-medium">Análise operacional</p>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-500 block mb-2">Hoje você deve fechar</span>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-extrabold text-gray-900 tracking-tight">R$ 28.000</span>
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12% acima da meta
              </span>
            </div>
          </div>
        </div>

        {/* ZONE 2: Reliability */}
        <div className="space-y-2 py-6">
          <div className="flex justify-between items-end">
            <span className="text-xs font-semibold text-gray-500">Confiabilidade da previsão</span>
            <span className="text-xs font-bold text-gray-900">92%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 w-[92%] rounded-full relative overflow-hidden" />
          </div>
          <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" /> Alta confiança
          </p>
        </div>

        {/* ZONE 3: Opportunity */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1 h-full bg-amber-400" />
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-700 mb-1">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wide">Oportunidade</span>
            </div>
            <p className="text-base text-gray-900 font-medium leading-relaxed">
              Aumentar oferta de <span className="font-bold text-gray-900 underline decoration-gray-300 underline-offset-2">vinhos</span> no jantar
            </p>
            <p className="text-sm text-gray-500">
              Impacto estimado: <span className="font-bold text-emerald-600">+8% no ticket</span>
            </p>
          </div>
        </div>

        {/* ZONE 4: Action */}
        <div className="flex items-center gap-3 pt-2">
          <Button className="flex-1 bg-gray-900 hover:bg-black text-white font-semibold text-sm h-10 shadow-sm transition-all">
            Aplicar agora
          </Button>
          <Button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-medium text-sm h-10">
            Ver detalhes
          </Button>
        </div>

      </div>
    </Card>
  );
}
