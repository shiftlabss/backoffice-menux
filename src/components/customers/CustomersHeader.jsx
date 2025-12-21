import React from 'react';
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/outline';

const FilterChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${active
        ? 'bg-primary text-white'
        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
      }`}
  >
    {label}
  </button>
);

const Metric = ({ label, value, status }) => (
  <div className="flex flex-col">
    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
    <span className={`text-xs font-semibold ${status === 'good' ? 'text-green-600' :
        status === 'warning' ? 'text-amber-500' :
          'text-gray-700'
      }`}>
      {value}
    </span>
  </div>
);

export default function CustomersHeader({
  periodFilter,
  setPeriodFilter,
  channelFilter,
  setChannelFilter,
  searchQuery,
  setSearchQuery
}) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
      {/* Top Bar: Title & Primary Actions */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-500">Raio-X, segmentação e fidelização</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Integrity Metrics (Desktop only) */}
          <div className="hidden lg:flex items-center gap-6 mr-6 border-r border-gray-100 pr-6">
            <Metric label="Última Atualização" value="Hoje, 14:30" />
            <Metric label="Cobertura ID" value="94.2% Identificado" status="good" />
            <Metric label="Coletor" value="Operacional" status="good" />
          </div>

          <button className="btn-secondary flex items-center gap-2">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Exportar
          </button>
          <button className="btn-primary flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Novo Segmento
          </button>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="px-6 pb-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

        {/* Search */}
        <div className="relative w-full lg:w-96">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone, ID ou tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Filters Wrapper */}
        <div className="flex items-center gap-4 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">

          {/* Period Filters */}
          <div className="flex items-center gap-2 pl-1 pr-4 border-r border-gray-100">
            <span className="text-xs text-gray-400 mr-1">Período:</span>
            {['7 dias', '30 dias', '90 dias', '12 meses'].map(p => (
              <FilterChip
                key={p}
                label={p}
                active={periodFilter === p}
                onClick={() => setPeriodFilter(p)}
              />
            ))}
          </div>

          {/* Channel Filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 mr-1">Canal:</span>
            {['Todos', 'Salão', 'Delivery'].map(c => (
              <FilterChip
                key={c}
                label={c}
                active={channelFilter === c}
                onClick={() => setChannelFilter(c)}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
