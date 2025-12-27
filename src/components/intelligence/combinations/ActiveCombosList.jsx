import React from 'react';
import { ComboCard } from './ComboCard';
import { CheckCircle2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';

export function ActiveCombosList({ combos, onEdit, onToggleStatus, onPerformance, onDuplicate, onArchive, onNewCombo }) {
  if (!combos || combos.length === 0) {
    return (
      <div className="space-y-4 h-full">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-500" />
          Combos ativos (0)
        </h3>
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-200 rounded-xl bg-slate-50 text-center h-[300px]">
          <div className="bg-slate-100 p-3 rounded-full mb-3">
            <CheckCircle2 size={24} className="text-slate-400" />
          </div>
          <h4 className="font-bold text-slate-700 mb-1">Você ainda não tem combos ativos.</h4>
          <p className="text-sm text-slate-500 mb-4 max-w-xs">
            Crie um combo com base nos itens mais vendidos e aumente o ticket médio.
          </p>
          <Button onClick={onNewCombo} className="bg-slate-900 text-white hover:bg-slate-800">
            <Plus size={16} className="mr-2" /> Novo Combo
          </Button>
        </div>
      </div>
    );
  }

  // Sort: Highest Ticket Lift -> Highest Revenue
  const sortedCombos = [...combos].sort((a, b) => {
    const liftA = parseFloat(a.ticket_lift.replace(/[^0-9.-]/g, ''));
    const liftB = parseFloat(b.ticket_lift.replace(/[^0-9.-]/g, ''));
    if (liftB !== liftA) return liftB - liftA;

    const revA = parseFloat(a.revenue.replace(/[^0-9.-]/g, ''));
    const revB = parseFloat(b.revenue.replace(/[^0-9.-]/g, ''));
    return revB - revA;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-emerald-500" />
          Combos ativos ({combos.length})
        </h3>
        <Button onClick={onNewCombo} size="sm" className="bg-slate-900 text-white hover:bg-slate-800 h-8 text-xs gap-2">
          <Plus size={14} /> Novo Combo
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {sortedCombos.map(combo => (
          <ComboCard
            key={combo.id}
            combo={combo}
            variant="active"
            onEdit={() => onEdit(combo)}
            onToggleStatus={() => onToggleStatus(combo)}
            onPerformance={() => onPerformance(combo)}
            onDuplicate={() => onDuplicate(combo)}
            onArchive={() => onArchive(combo)}
          />
        ))}
      </div>
    </div>
  );
}
