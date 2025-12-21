
import React from 'react';
import { Calendar, Clock, RefreshCw, CheckCircle2, ChevronDown, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { toast } from 'react-hot-toast';

export function AnalyticsHeader({ filters, onFilterChange }) {
  const periods = ['Hoje', 'Ontem', '7 dias', '30 dias', 'Personalizado'];
  const shifts = ['Todos', 'Almoço', 'Jantar', 'Madrugada'];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-4 shadow-sm">
      <div className="flex flex-col gap-4">

        {/* Top Row: Title + Integrity */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics</h1>
            <p className="text-slate-500 text-sm mt-1">
              Comportamento do cliente e performance do cardápio.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Integrity Status */}
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 cursor-help group relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-medium text-emerald-700">Tracking Ativo</span>
              <span className="text-slate-300">|</span>
              <span>99.8% Cobertura</span>

              {/* Tooltip */}
              <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800 text-white p-3 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <p className="font-bold mb-1">Status do Coletor: Saudável</p>
                <p className="text-slate-300">Último evento recebido há 2s.</p>
                <p className="text-slate-300 mt-1">Diagnóstico completo disponível no menu.</p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="text-slate-600">
              <RefreshCw size={14} className="mr-2" />
              Atualizado há 1 min
            </Button>

            <Button className="bg-slate-900 text-white hover:bg-slate-800">
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Bottom Row: Filters */}
        <div className="flex items-center flex-wrap gap-3 pt-2">

          {/* Period Filter */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {periods.map(period => (
              <button
                key={period}
                onClick={() => onFilterChange('period', period)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${filters.period === period
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 mx-2"></div>

          {/* Comparativo */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Comparar com:</span>
            <Button variant="outline" size="sm" className="h-8 text-xs border-dashed text-slate-600">
              Período Anterior <ChevronDown size={14} className="ml-1 opacity-50" />
            </Button>
          </div>

          <div className="h-6 w-px bg-slate-200 mx-2"></div>

          {/* Turno */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Turno:</span>
            <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-0.5">
              {shifts.map(shift => (
                <button
                  key={shift}
                  onClick={() => onFilterChange('shift', shift)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase rounded transition-colors ${filters.shift === shift
                      ? 'bg-white text-purple-700 shadow-sm border border-slate-100'
                      : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {shift}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1"></div>

          {/* Advanced Filters Trigger */}
          <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50 text-xs font-bold">
            <Filter size={14} className="mr-2" />
            + Filtros Avançados
          </Button>

        </div>
      </div>
    </div>
  );
}
