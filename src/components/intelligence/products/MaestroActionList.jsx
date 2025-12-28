import React from 'react';
import { OpportunityCard } from './OpportunityCard';
import { Sparkles } from 'lucide-react';

export function MaestroActionList({ opportunities, onResolve, onEdit, onIgnore }) {
  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
        <Sparkles size={24} className="mx-auto text-slate-300 mb-2" />
        <h3 className="text-sm font-bold text-slate-600">Tudo limpo por aqui!</h3>
        <p className="text-xs text-slate-400">Nenhuma oportunidade de ação imediata encontrada para estes filtros.</p>
      </div>
    );
  }

  const highPriority = opportunities.filter(o => o.priority?.toLowerCase() === 'alta');
  const mediumPriority = opportunities.filter(o => o.priority?.toLowerCase() === 'média');
  const lowPriority = opportunities.filter(o => !['alta', 'média'].includes(o.priority?.toLowerCase()));

  const renderSection = (title, items) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-3 mb-6 animate-in slide-in-from-bottom-2 duration-300">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">{title} ({items.length})</h3>
        <div className="space-y-3">
          {items.map(opp => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onResolve={onResolve}
              onEdit={onEdit}
              onIgnore={onIgnore}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-purple-600" />
        <h2 className="text-lg font-bold text-slate-900">Ações do Maestro <span className="text-slate-400 font-normal text-sm ml-2">Sugestões para executar agora</span></h2>
      </div>

      {renderSection('Prioridade Alta', highPriority)}
      {renderSection('Prioridade Média', mediumPriority)}
      {renderSection('Prioridade Baixa', lowPriority)}
    </div>
  );
}
