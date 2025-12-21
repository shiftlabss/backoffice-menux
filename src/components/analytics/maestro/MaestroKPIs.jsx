
import React from 'react';
import { Card } from '../../ui/Card';
import { Zap, HelpCircle, ArrowUp } from 'lucide-react';

export function MaestroKPIs({ kpis }) {
  // Assuming KPI structure compatible with what we defined in overview but filtered for Maestro specific
  // For demo, I'll create a hardcoded or derived set if not explicitly passed, 
  // but let's assume parent passes relevant KPIs or we mock them here for the component visualization

  const maestroMetrics = [
    { label: 'Sugestões Exibidas', value: '15,403', trend: '+12%', sub: 'Alcance' },
    { label: 'Taxa de Clique', value: '8.5%', trend: '+0.5%', sub: 'Engajamento' },
    { label: 'Taxa de Aceitação', value: '22%', trend: 'Stable', sub: 'Conversão' },
    { label: 'Receita Atribuída', value: 'R$ 3.240', trend: '+15%', sub: 'Impacto' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {maestroMetrics.map((m, i) => (
        <div key={i} className="bg-white rounded-xl p-5 border border-purple-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <Zap size={64} className="text-purple-600" />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{m.label}</span>
              <div className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                {m.trend}
              </div>
            </div>

            <div className="text-2xl font-bold text-slate-900 mb-1">{m.value}</div>
            <div className="text-xs text-slate-400">{m.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
