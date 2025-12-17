import React from 'react';
import { Card } from '../../ui/Card';
import { ArrowUpRight, Target, ShoppingBag, Zap } from 'lucide-react';

export default function MaestroSales() {
  return (
    <Card className="h-full p-6 bg-white border-gray-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-gray-100 rounded-md border border-gray-200">
            <Target className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-sm font-bold text-gray-900">Impacto Real</span>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">R$ 3.450</span>
          <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            +18%
          </span>
        </div>
        <p className="text-xs text-gray-500 font-medium">Receita adicional gerada pela IA hoje</p>
      </div>

      <div className="space-y-4 mt-6">
        {/* Stat 1 */}
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">142</span>
              <span className="text-[10px] text-gray-500">Pedidos influenciados</span>
            </div>
          </div>
          <div className="h-8 w-16 flex items-end justify-end gap-0.5 opacity-30">
            <div className="w-1 bg-emerald-500 h-[30%]" />
            <div className="w-1 bg-emerald-500 h-[50%]" />
            <div className="w-1 bg-emerald-500 h-[80%]" />
            <div className="w-1 bg-emerald-500 h-[60%]" />
            <div className="w-1 bg-emerald-500 h-[100%]" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-amber-500" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">4,8%</span>
              <span className="text-[10px] text-gray-500">Conversão extra</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 0.8%
          </span>
        </div>

        {/* AI Participation Bar */}
        <div className="pt-2">
          <div className="flex justify-between text-[10px] font-medium text-gray-500 mb-1.5">
            <span>Participação da IA no total</span>
            <span className="text-gray-900 font-bold">24%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 w-[24%]" />
          </div>
        </div>
      </div>
    </Card>
  );
}
