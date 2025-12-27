import React from 'react';
import { OpportunityCard } from './OpportunityCard';
import { Utensils } from 'lucide-react';

export function MaestroSuggestionsList({ suggestions, onApply, onIgnore, onDetails }) {
  // Empty State handled implicitly or could be cleaner
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="pt-8 border-t border-slate-200 mt-8">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Utensils size={20} className="text-slate-600" />
        Sugestões do Maestro para Produtos e Combos
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {suggestions.map(suggestion => (
          <OpportunityCard
            key={suggestion.id}
            type={suggestion.type}
            impact={suggestion.impact}
            title={suggestion.title}
            description={suggestion.description}
            metrics={suggestion.metrics}
            tags={suggestion.tags}
            onApply={suggestion.canApply ? () => onApply(suggestion) : null}
            onIgnore={() => onIgnore(suggestion)}
            onDetails={() => onDetails(suggestion)}
          />
        ))}
      </div>
    </div>
  );
}
