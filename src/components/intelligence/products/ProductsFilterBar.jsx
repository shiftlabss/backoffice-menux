import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useAudit } from '../../../hooks/useAudit';

const FILTERS = {
  periods: [
    { label: 'Hoje', value: 'today' },
    { label: 'Ontem', value: 'yesterday' },
    { label: '7 dias', value: '7d' },
    { label: '30 dias', value: '30d' },
  ],
  shifts: [
    { label: 'Todos os Turnos', value: 'all' },
    { label: 'Almoço', value: 'lunch' },
    { label: 'Jantar', value: 'dinner' },
    { label: 'Madrugada', value: 'late' },
  ],
  entities: [
    { label: 'Todos os Itens', value: 'all' },
    { label: 'Produtos', value: 'product' },
    { label: 'Combos', value: 'combo' },
  ],
  categories: [
    { label: 'Todas as Categorias', value: 'all' },
    { label: 'Pratos', value: 'food' },
    { label: 'Bebidas', value: 'drink' },
    { label: 'Sobremesas', value: 'dessert' },
  ]
};

export function ProductsFilterBar({ onFilterChange, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { log } = useAudit();

  const filters = {
    period: searchParams.get('period') || 'today',
    shift: searchParams.get('shift') || 'all',
    entity: searchParams.get('entity') || 'all',
    category: searchParams.get('category') || 'all',
    search: searchParams.get('search') || '',
  };

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
    log('intelligence.products.filter_changed', { [key]: value });
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
    log('intelligence.products.filters_cleared');
  };

  // Sync to parent
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [searchParams]);

  const activeFiltersCount = Array.from(searchParams.keys()).filter(k => k !== 'period').length;

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-3 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        {/* Chips Group 1: Time & Context */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
            {FILTERS.periods.map((p) => (
              <button
                key={p.value}
                onClick={() => handleFilterChange('period', p.value)}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded-md transition-all
                  ${filters.period === p.value
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
                `}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />

          <select
            value={filters.shift}
            onChange={(e) => handleFilterChange('shift', e.target.value)}
            className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-purple-100 outline-none text-slate-700"
          >
            {FILTERS.shifts.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          <select
            value={filters.entity}
            onChange={(e) => handleFilterChange('entity', e.target.value)}
            className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-purple-100 outline-none text-slate-700"
          >
            {FILTERS.entities.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
          </select>
        </div>

        {/* Group 2: Search & Actions */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por item..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg w-48 focus:ring-2 focus:ring-purple-100 px-3 outline-none"
            />
          </div>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-slate-500 hover:text-red-600 text-xs gap-1"
            >
              <X size={12} />
              Limpar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
