
import React from 'react';
import { AlertOctagon, ArrowRight, UserMinus } from 'lucide-react';
import { Button } from '../../ui/Button';

export function DropoffPatterns({ patterns }) {
  if (!patterns) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* List of Patterns */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-full">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <UserMinus className="text-red-500" size={20} />
          Motivos de Abandono
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Padrões de comportamento detectados automaticamente em sessões perdidas.
        </p>

        <div className="space-y-4">
          {patterns.map((p) => (
            <div key={p.id} className="p-4 bg-red-50/30 border border-red-100 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-slate-800">{p.pattern}</h4>
                <div className="px-2 py-0.5 bg-white rounded border border-red-100 text-[10px] font-bold text-red-600 uppercase">
                  Alta Prioridade
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-600 mt-2">
                <div className="flex flex-col">
                  <span className="text-slate-400 font-medium">Frequência</span>
                  <span className="font-bold text-lg">{p.count}</span>
                </div>
                <div className="w-px h-8 bg-black/5"></div>
                <div className="flex flex-col">
                  <span className="text-slate-400 font-medium">Risco Receita</span>
                  <span className="font-bold text-lg text-red-600">{p.revenueRisk}</span>
                </div>
                <div className="w-px h-8 bg-black/5"></div>
                <div className="flex flex-col">
                  <span className="text-slate-400 font-medium">Principal Canal</span>
                  <span className="font-bold">{p.topChannel}</span>
                </div>
              </div>

              <div className="mt-3 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-6 text-xs text-red-600 hover:text-red-700 p-0 hover:bg-transparent">
                  Ver Sessões Exemplo <ArrowRight size={12} className="ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pathways Visual Placeholder */}
      <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative min-h-[400px]">
        <h3 className="text-lg font-bold mb-2">Caminhos Mais Comuns</h3>
        <p className="text-slate-400 text-sm mb-6">Fluxo de navegação agregado até o checkout.</p>

        {/* Mock Sankey Visual using CSS/Divs simply */}
        <div className="relative h-[300px] flex items-center justify-between px-4">
          {/* Start Nodes */}
          <div className="flex flex-col gap-8 w-32">
            <div className="p-3 bg-slate-800 rounded-lg text-xs border border-slate-700">QR Mesa (60%)</div>
            <div className="p-3 bg-slate-800 rounded-lg text-xs border border-slate-700">Link Instagram (30%)</div>
            <div className="p-3 bg-slate-800 rounded-lg text-xs border border-slate-700">Direto (10%)</div>
          </div>

          {/* Connections (Lines) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <path d="M140 60 C 250 60, 250 150, 400 150" stroke="#a855f7" strokeWidth="2" fill="none" />
            <path d="M140 150 C 250 150, 250 150, 400 150" stroke="#a855f7" strokeWidth="2" fill="none" />
            <path d="M140 240 C 250 240, 250 150, 400 150" stroke="#a855f7" strokeWidth="2" fill="none" />
          </svg>

          {/* Middle Node */}
          <div className="w-40 z-10">
            <div className="p-4 bg-purple-600 rounded-lg text-sm font-bold text-center shadow-lg shadow-purple-900/50">
              Cardápio Aberto
              <div className="text-xs font-normal opacity-80 mt-1">100% das sessões</div>
            </div>
          </div>

          {/* End Nodes */}
          <div className="flex flex-col gap-4 w-32 items-end">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs text-right w-full">Pedido (18%)</div>
            <div className="p-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-xs text-right w-full">Abandono (82%)</div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-xs text-slate-500">
          *Visualização simplificada.
        </div>
      </div>
    </div>
  );
}
