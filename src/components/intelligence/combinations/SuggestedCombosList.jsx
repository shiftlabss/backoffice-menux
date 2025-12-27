import React from 'react';
import { ComboCard } from './ComboCard';
import { Sparkles, RotateCw } from 'lucide-react';
import { Button } from '../../ui/Button';

export function SuggestedCombosList({ combos, onReview, onIgnore, onRefresh }) {
  if (!combos || combos.length === 0) {
    return (
      <div className="space-y-4 h-full">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles size={20} className="text-purple-500" />
          Sugestões de combos (0)
        </h3>
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-purple-100 rounded-xl bg-purple-50/20 text-center h-[300px]">
          <div className="bg-purple-100 p-3 rounded-full mb-3">
            <Sparkles size={24} className="text-purple-400" />
          </div>
          <h4 className="font-bold text-slate-700 mb-1">Sem sugestões agora.</h4>
          <p className="text-sm text-slate-500 mb-4 max-w-xs">
            Tente mudar o período de análise ou aguarde mais dados de vendas.
          </p>
          <Button onClick={onRefresh} variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <RotateCw size={16} className="mr-2" /> Atualizar sugestões
          </Button>
        </div>
      </div>
    );
  }

  // Sort: Impact (Alto > Médio > Baixo) -> Confidence -> Base
  const impactScore = { 'Alto': 3, 'Médio': 2, 'Baixo': 1 };
  const sortedCombos = [...combos].sort((a, b) => {
    const scoreA = impactScore[a.impact] || 0;
    const scoreB = impactScore[b.impact] || 0;
    if (scoreB !== scoreA) return scoreB - scoreA;
    // Secondary sort could be implemented here
    return 0;
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
        <Sparkles size={20} className="text-purple-500" />
        Sugestões de combos ({combos.length})
      </h3>
      <div className="flex flex-col gap-4">
        {sortedCombos.map(combo => (
          <ComboCard
            key={combo.id}
            combo={combo}
            variant="suggested"
            onReview={() => onReview(combo)}
            onIgnore={() => onIgnore(combo)}
          />
        ))}
      </div>
    </div>
  );
}
