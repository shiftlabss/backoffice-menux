import React from 'react';
import { Card } from '../../ui/Card';
import { ArrowUpRight, Target, ShoppingBag, Zap } from 'lucide-react';

export default function MaestroSales() {
   return (
      <Card className="h-full p-5 lg:p-6 bg-white border-gray-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
         {/* Background Decor */}
         <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-bl-full opacity-60 pointer-events-none transition-opacity group-hover:opacity-80" />

         <div className="flex-none">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-gray-100 rounded-lg border border-gray-200">
                  <Target className="w-4 h-4 text-gray-900" />
               </div>
               <div>
                  <h3 className="text-base font-bold text-gray-900">Impacto Real</h3>
                  <p className="text-[10px] text-gray-500 font-medium">Performance assistida por IA</p>
               </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
               <span className="text-4xl font-extrabold text-gray-900 tracking-tight">R$ 3.450</span>
               <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
                  +18%
               </span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Receita Adicional Hoje</p>
         </div>

         <div className="flex-1 flex flex-col justify-end space-y-3 mt-4">
            {/* Stat 1 */}
            <div className="flex justify-between items-center p-3 bg-gray-50/80 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-500">
                     <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-gray-900">142</span>
                     <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wide">Pedidos influenciados</span>
                  </div>
               </div>
               <div className="h-8 w-16 flex items-end justify-end gap-0.5 opacity-40">
                  <div className="w-1 bg-emerald-500 h-[30%] rounded-t-sm" />
                  <div className="w-1 bg-emerald-500 h-[50%] rounded-t-sm" />
                  <div className="w-1 bg-emerald-500 h-[80%] rounded-t-sm" />
                  <div className="w-1 bg-emerald-500 h-[60%] rounded-t-sm" />
                  <div className="w-1 bg-emerald-500 h-[100%] rounded-t-sm" />
               </div>
            </div>

            {/* Stat 2 */}
            <div className="flex justify-between items-center p-3 bg-gray-50/80 rounded-xl border border-gray-100 hover:border-gray-300 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white rounded-lg border border-gray-200 shadow-sm text-amber-500">
                     <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-gray-900">4,8%</span>
                     <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wide">Conversão extra</span>
                  </div>
               </div>
               <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-lg border border-gray-200 shadow-sm">
                  <ArrowUpRight className="w-3 h-3" /> 0.8%
               </span>
            </div>

            {/* AI Participation Bar */}
            <div className="pt-2 px-1">
               <div className="flex justify-between text-[10px] font-semibold text-gray-500 mb-1.5">
                  <span>Participação da IA</span>
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
