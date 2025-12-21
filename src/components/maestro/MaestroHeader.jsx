import React from 'react';
import {
  Calendar,
  Clock,
  UtensilsCrossed,
  Filter,
  Download,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/DropdownMenu';
import { cn } from '../../lib/utils';

export function MaestroHeader({
  title,
  subtitle,
  filters = {},
  onFilterChange,
  onOpenAdvancedFilters,
  onExport
}) {
  const periods = [
    { id: 'today', label: 'Hoje' },
    { id: 'yesterday', label: 'Ontem' },
    { id: '7d', label: '7 dias' },
    { id: '30d', label: '30 dias' },
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Top Row: Title & Main Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onExport} className="hidden md:flex">
              <Download size={16} className="mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Bottom Row: Filters & Summary */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Period Selector */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {periods.map(p => (
              <button
                key={p.id}
                onClick={() => onFilterChange('period', p.id)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  filters.period === p.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-slate-200 hidden md:block" />

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 border-dashed text-slate-600 font-normal",
                    filters.shift && filters.shift !== 'all' && "bg-purple-50 text-purple-700 border-purple-200 border-solid font-medium"
                  )}
                >
                  <Clock size={14} className="mr-2" />
                  {filters.shift === 'all' || !filters.shift ? 'Todos os Turnos' : filters.shift}
                  <ChevronDown size={12} className="ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => onFilterChange('shift', 'all')}>Todos os Turnos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterChange('shift', 'Almoço')}>Almoço</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterChange('shift', 'Jantar')}>Jantar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 border-dashed text-slate-600 font-normal",
                    filters.channel && filters.channel !== 'all' && "bg-purple-50 text-purple-700 border-purple-200 border-solid font-medium"
                  )}
                >
                  <UtensilsCrossed size={14} className="mr-2" />
                  {filters.channel === 'all' || !filters.channel ? 'Todos Canais' : filters.channel}
                  <ChevronDown size={12} className="ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => onFilterChange('channel', 'all')}>Todos Canais</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterChange('channel', 'Mesa')}>Mesa</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterChange('channel', 'Balcão')}>Balcão</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterChange('channel', 'Delivery')}>Delivery</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenAdvancedFilters}
              className="text-slate-500 hover:text-purple-600"
            >
              <Filter size={16} className="mr-2" />
              Filtros Avançados
            </Button>
          </div>

        </div>

        {/* Micro-text status (Optional, based on requirements) */}


      </div>
    </div>
  );
}
