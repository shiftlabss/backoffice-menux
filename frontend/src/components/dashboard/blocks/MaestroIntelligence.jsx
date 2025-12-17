
import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Sparkles, TrendingUp, Target, ArrowRight } from 'lucide-react';

export default function MaestroIntelligence() {
  return (
    <Card className="p-0 overflow-hidden h-full flex flex-col border-purple-500/20 shadow-lg shadow-purple-900/5 relative group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-violet-600/5 to-fuchsia-600/5 group-hover:from-purple-600/10 transition-colors" />

      <div className="relative p-8 lg:p-10 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-xl text-white shadow-purple-500/20 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-none">Maestro Intelligence</h3>
              <p className="text-xs text-purple-600 font-medium mt-0.5">Seu analista de performance júnior</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-6">
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-1">Previsão do dia</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-gray-900">R$ 28k</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full mb-1">
                  +12% vs. meta
                </span>
              </div>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-1">Índice de Confiança</span>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 w-[92%] rounded-full shadow-[0_0_10px_theme(colors.purple.500)]" />
                </div>
                <span className="text-sm font-bold text-purple-700">92%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-purple-100/50 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-purple-700">Insight:</span> Aumentar oferta de vinhos hoje à noite pode elevar ticket em <span className="font-bold">8%</span>.
          </p>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-purple-500/20">
            Ver Detalhes <ArrowRight className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
