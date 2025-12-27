import React from 'react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function AlertsFilterBar({ filters, onFilterChange }) {
  const activeCount = Object.values(filters).filter(v => v !== 'all' && v !== '' && v !== 'now').length;

  const handleClear = () => {
    onFilterChange('reset', null);
  };

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">

        {/* Left: Search & Basic Filters */}
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar">
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Buscar por mesa, item ou alerta..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              value={filters.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1 shrink-0 hidden lg:block" />

          <FilterSelect
            label="Período"
            value={filters.period}
            onChange={(v) => onFilterChange('period', v)}
            options={[
              { value: 'now', label: 'Agora (Realtime)' },
              { value: 'today', label: 'Hoje' },
              { value: 'yesterday', label: 'Ontem' },
              { value: '7days', label: '7 dias' }
            ]}
          />

          <FilterSelect
            label="Turno"
            value={filters.shift}
            onChange={(v) => onFilterChange('shift', v)}
            options={[
              { value: 'all', label: 'Todos os Turnos' },
              { value: 'lunch', label: 'Almoço' },
              { value: 'dinner', label: 'Jantar' }
            ]}
          />

          <FilterSelect
            label="Área"
            value={filters.area}
            onChange={(v) => onFilterChange('area', v)}
            options={[
              { value: 'all', label: 'Todas as Áreas' },
              { value: 'kitchen', label: 'Cozinha' },
              { value: 'hall', label: 'Salão' },
              { value: 'bar', label: 'Bar' },
              { value: 'stock', label: 'Estoque' }
            ]}
          />
        </div>

        {/* Right: Status & Severity */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <FilterSelect
            label="Severidade"
            value={filters.severity}
            onChange={(v) => onFilterChange('severity', v)}
            options={[
              { value: 'all', label: 'Todas' },
              { value: 'critical', label: 'Crítica' },
              { value: 'high', label: 'Alta' },
              { value: 'medium', label: 'Média' },
              { value: 'low', label: 'Baixa' }
            ]}
          />
          <FilterSelect
            label="Status"
            value={filters.status}
            onChange={(v) => onFilterChange('status', v)}
            options={[
              { value: 'all', label: 'Todos os Status' },
              { value: 'open', label: 'Abertos' },
              { value: 'in_progress', label: 'Em Andamento' },
              { value: 'resolved', label: 'Resolvidos' }
            ]}
          />
        </div>
      </div>

      {/* Active Chips & Clear */}
      {activeCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Filtros Ativos:</span>
          {Object.entries(filters).map(([key, value]) => {
            if (value === 'all' || value === '' || key === 'search' || (key === 'period' && value === 'now')) return null;
            return (
              <Badge key={key} variant="secondary" className="gap-1 pl-2 pr-1 py-0.5 bg-slate-100 text-slate-600 border-slate-200">
                <span className="capitalize">{translatedKey(key)}: {formatValue(value)}</span>
                <button onClick={() => onFilterChange(key, 'all')} className="hover:bg-slate-200 rounded p-0.5"><X size={12} /></button>
              </Badge>
            )
          })}
          <Button variant="ghost" size="sm" onClick={handleClear} className="h-6 text-xs text-slate-400 hover:text-slate-600">
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}

// Internal Helper Components
const FilterSelect = ({ label, value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-transparent text-sm font-medium text-slate-600 hover:text-slate-900 border-none outline-none focus:ring-0 cursor-pointer py-1 pr-8"
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

const translatedKey = (k) => {
  const map = { period: 'Período', shift: 'Turno', area: 'Área', severity: 'Severidade', status: 'Status' };
  return map[k] || k;
}

const formatValue = (v) => {
  const map = {
    today: 'Hoje', yesterday: 'Ontem', '7days': '7 Dias',
    lunch: 'Almoço', dinner: 'Jantar',
    kitchen: 'Cozinha', hall: 'Salão', bar: 'Bar', stock: 'Estoque',
    critical: 'Crítica', high: 'Alta', medium: 'Média', low: 'Baixa',
    open: 'Aberto', in_progress: 'Em Andamento', resolved: 'Resolvido'
  };
  return map[v] || v;
}
