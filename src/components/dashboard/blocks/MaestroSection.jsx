import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import {
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  Zap,
  AlertTriangle,
  Users,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Calculator
} from 'lucide-react';
import { cn } from '../../../lib/utils';

// --- SUB-COMPONENTS ---

/* CARD 1: IMPACTO REAL */
function ImpactoRealCard() {
  return (
    <Card className="h-full p-5 flex flex-col justify-between bg-white border-gray-200 shadow-sm relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-bl-full opacity-60 pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-gray-100 rounded-lg border border-gray-200">
            <Target className="w-4 h-4 text-gray-900" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 leading-tight">Impacto Real</h3>
            <p className="text-xs text-gray-500 font-normal">Performance assistida pelo Maestro</p>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-gray-900 tracking-tight">R$ 3.450</span>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18%
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-1">Receita Adicional Hoje</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-center">
          <span className="text-lg font-bold text-gray-900">142</span>
          <span className="text-[10px] uppercase font-medium text-gray-500 tracking-wide mt-0.5">Pedidos Influenciados</span>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-gray-900">+4.8%</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">+0.8%</span>
          </div>
          <span className="text-[10px] uppercase font-medium text-gray-500 tracking-wide mt-0.5">Conversão Extra</span>
        </div>
      </div>

      {/* Footer / AI Share */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center text-xs mb-1.5">
          <span className="font-medium text-gray-500">Participação do Maestro</span>
          <span className="font-bold text-gray-900">28%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gray-900 w-[28%]" />
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="ghost" size="sm" className="w-full h-8 text-xs font-medium text-gray-500 hover:text-gray-900 border border-transparent hover:border-gray-200">
            Ver detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* CARD 2: PROJEÇÃO DO DIA */
function ProjecaoCard() {
  return (
    <Card className="h-full p-5 flex flex-col justify-between bg-white border-gray-200 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-gray-900">Projeção do Dia</h3>
          <Badge variant="outline" className="text-[10px] font-bold text-purple-600 bg-purple-50 border-purple-100 px-2 py-0.5">
            IA Beta
          </Badge>
        </div>
        <p className="text-xs text-gray-500 font-normal">Previsão e gap para meta</p>
      </div>

      {/* Main Projections */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400 block mb-1">Receita Projetada</span>
          <span className="text-[24px] font-bold text-gray-900 tabular-nums">R$ 28.4k</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-medium text-red-500 flex items-center justify-end gap-1 mb-1">
            Faltam <span className="font-bold">R$ 1.2k</span>
          </span>
          <div className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded inline-block">
            Probabilidade: 82%
          </div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="flex-1 bg-amber-50/50 rounded-xl p-3 border border-amber-100/50 mb-4 transition-colors hover:border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Melhor Aceleração: 12h - 13h</span>
        </div>
        <ul className="space-y-2">
          <li className="flex justify-between items-start text-xs border-b border-amber-100/50 pb-2 last:border-0 last:pb-0">
            <span className="text-gray-700 font-medium leading-tight">Ativar <span className="font-bold text-amber-800">Combo Família</span> no jantar</span>
            <span className="font-bold text-emerald-600 ml-2 whitespace-nowrap">+R$ 450</span>
          </li>
          <li className="flex justify-between items-start text-xs">
            <span className="text-gray-700 font-medium leading-tight">Sugerir <span className="font-bold text-amber-800">2ª bebida</span> (mesas {'>'} 14min)</span>
            <span className="font-bold text-emerald-600 ml-2 whitespace-nowrap">+R$ 320</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <Button className="flex-1 h-8 text-xs font-bold bg-gray-900 text-white hover:bg-black">
          Aplicar Sugestões
        </Button>
        <Button variant="outline" className="h-8 px-3 text-gray-500 border-gray-200 hover:bg-gray-50">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

/* CARD 3: DRIVERS DE RECEITA */
function DriversCard() {
  return (
    <Card className="h-full p-5 flex flex-col bg-white border-gray-200 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Drivers de Receita</h3>
          <p className="text-xs text-gray-500 font-normal">O que está puxando o resultado</p>
        </div>
        <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
          <Calculator className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Drivers List */}
      <div className="flex-1 space-y-4">
        {/* Driver 1: Mesas */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-700">Mesas Ativas</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded">+12%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%]" />
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">Acima do esperado (42 mesas)</span>
          </div>
        </div>

        {/* Driver 2: Conversão */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-700">Conversão</span>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 rounded">-4.2%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-[45%]" />
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">Atenção: Queda em Adicionais</span>
          </div>
        </div>

        {/* Driver 3: Ticket */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-700">Ticket Médio</span>
              <span className="text-xs font-bold text-gray-600 bg-gray-100 px-1.5 rounded">0%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gray-400 w-[60%]" />
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">Estável (R$ 142,00)</span>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-500">
          Principal alavanca: <span className="font-bold text-gray-900">Conversão</span>
        </span>
        <Button variant="link" size="sm" className="h-auto p-0 text-xs font-bold text-primary">
          Ver análise
        </Button>
      </div>
    </Card>
  );
}

// --- MAIN WRAPPER ---
export default function MaestroSection() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4 px-1">
        <Sparkles className="w-4 h-4 text-gray-900" />
        <h2 className="text-lg font-bold text-gray-900">Maestro</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {/* Card 1: Impacto Real (Always first) */}
        <div className="lg:col-span-1 h-[340px]">
          <ImpactoRealCard />
        </div>

        {/* Card 2: Projeção (Second slot) */}
        <div className="lg:col-span-1 h-[340px]">
          <ProjecaoCard />
        </div>

        {/* Card 3: Drivers (Spans 2 cols on tablet to fill row, normal on desktop) */}
        <div className="md:col-span-2 lg:col-span-1 h-[340px]">
          <DriversCard />
        </div>
      </div>
    </section>
  );
}
