import React from 'react';
import { Search, ChevronDown, Plus, RotateCw } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';

export function CombosSectionHeader({
  onNewCombo,
  onRefreshSuggestions,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">Combos</h2>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden md:flex gap-2 text-slate-600 border-slate-200"
            onClick={onRefreshSuggestions}
          >
            <RotateCw size={16} />
            Atualizar sugestões
          </Button>
          <Button
            className="bg-slate-900 text-white hover:bg-slate-800 gap-2 shadow-sm"
            onClick={onNewCombo}
          >
            <Plus size={18} />
            Novo combo
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Buscar combo por nome ou item"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Ordenar por:</span>
          <select
            className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="impact">Impacto estimado</option>
            <option value="revenue">Receita no período</option>
            <option value="lift">Ticket médio lift</option>
            <option value="recent">Mais recente</option>
          </select>
        </div>
      </div>
    </div>
  );
}
