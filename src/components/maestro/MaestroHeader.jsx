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
import { MaestroTabs } from './MaestroNavigation';

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
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">

        {/* Top Row: Title & Main Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
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

          {onExport && (
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onExport} className="hidden md:flex">
                <Download size={16} className="mr-2" />
                Exportar
              </Button>
            </div>
          )}

        </div>
      </div>

      {/* Navigation Tabs (Moved here) */}
      <div className="px-4 sm:px-6 lg:px-8 pb-4">
        <MaestroTabs />
      </div>

    </div>
  );
}
