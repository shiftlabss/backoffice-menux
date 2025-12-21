import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  UtensilsCrossed,
  Layers,
  HelpCircle,
  Info,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/DropdownMenu';
import { Switch } from '../ui/Switch';
import { Modal } from '../ui/Modal';
import { cn } from '../../lib/utils';

export function ImpactFilters({ onFilterChange, className }) {
  const [period, setPeriod] = useState('7d');
  const [shift, setShift] = useState('all');
  const [channel, setChannel] = useState('all');
  const [segment, setSegment] = useState('all');
  const [compare, setCompare] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const handleFilterChange = (key, value) => {
    const setters = {
      period: setPeriod,
      shift: setShift,
      channel: setChannel,
      segment: setSegment,
      compare: setCompare
    };
    setters[key](value);
    onFilterChange && onFilterChange({ period, shift, channel, segment, compare, [key]: value });
  };

  const FilterButton = ({ icon: Icon, label, active, onClick }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn(
        "h-8 border-dashed text-slate-600 hover:text-purple-600 hover:border-purple-200",
        active && "bg-purple-50 border-purple-200 text-purple-700 border-solid font-medium"
      )}
    >
      <Icon size={14} className="mr-2" />
      {label}
      <ChevronDown size={12} className="ml-2 opacity-50" />
    </Button>
  );

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">

        {/* Left: Filters Group */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Period Selector */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {[
              { id: 'today', label: 'Hoje' },
              { id: 'yesterday', label: 'Ontem' },
              { id: '7d', label: '7 dias' },
              { id: '30d', label: '30 dias' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => handleFilterChange('period', p.id)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  period === p.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />

          {/* Detailed Filters */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className={cn("text-slate-600", shift !== 'all' && "text-purple-600 bg-purple-50")}>
                <Clock size={14} className="mr-2" />
                {shift === 'all' ? 'Todos os Turnos' : shift}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleFilterChange('shift', 'all')}>Todos os Turnos</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange('shift', 'Almoço')}>Almoço</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange('shift', 'Jantar')}>Jantar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className={cn("text-slate-600", channel !== 'all' && "text-purple-600 bg-purple-50")}>
                <UtensilsCrossed size={14} className="mr-2" />
                {channel === 'all' ? 'Todos Canais' : channel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleFilterChange('channel', 'all')}>Todos Canais</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange('channel', 'Mesa')}>Mesa</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange('channel', 'Balcão')}>Balcão</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange('channel', 'Delivery')}>Delivery</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className={cn("text-slate-600", segment !== 'all' && "text-purple-600 bg-purple-50")}>
                <Layers size={14} className="mr-2" />
                {segment === 'all' ? 'Todos Segmentos' : segment}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleFilterChange('segment', 'all')}>Todos Segmentos</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange('segment', 'Bebidas')}>Bebidas</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange('segment', 'Pratos')}>Pratos</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange('segment', 'Sobremesas')}>Sobremesas</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

        {/* Right: Compare & Help */}
        <div className="flex items-center gap-4 w-full xl:w-auto xl:justify-end border-t xl:border-t-0 pt-3 xl:pt-0 border-slate-100">

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleFilterChange('compare', !compare)}>
            <Switch checked={compare} onCheckedChange={(c) => handleFilterChange('compare', c)} />
            <span className="text-sm text-slate-600 font-medium">Comparar período</span>
          </div>

          <div className="w-px h-6 bg-slate-200 mx-1" />

          <Button
            variant="ghost"
            size="sm"
            className="text-purple-600 hover:bg-purple-50"
            onClick={() => setShowHelp(true)}
          >
            <HelpCircle size={16} className="mr-2" />
            Como calculamos?
          </Button>
        </div>
      </div>

      {/* Explanation Modal */}
      {showHelp && (
        <Modal
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
          title="Entendendo a Atribuição do Maestro"
          className="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex gap-3">
              <Info className="text-purple-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">Nosso modelo de atribuição</h4>
                <p className="text-sm text-purple-800 leading-relaxed">
                  O Maestro utiliza um modelo de janela de conversão de 30 minutos.
                  Se um cliente visualiza uma sugestão e adiciona aquele item (ou um correlato) ao pedido dentro desse tempo,
                  consideramos uma <strong>Venda Atribuída</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-slate-50">
                <h5 className="font-semibold text-slate-800 mb-2">1. Observado</h5>
                <p className="text-xs text-slate-600">
                  Vendas totais que passaram pelo sistema enquanto o Maestro estava ativo.
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-emerald-50 border-emerald-100">
                <h5 className="font-semibold text-emerald-800 mb-2">2. Atribuído</h5>
                <p className="text-xs text-emerald-700">
                  Vendas diretas geradas após uma sugestão ser exibida e clicada/aceita.
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-100">
                <h5 className="font-semibold text-blue-800 mb-2">3. Incremental</h5>
                <p className="text-xs text-blue-700">
                  Cálculo estatístico de quanto "a mais" foi vendido comparado a períodos sem IA.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-900 mb-2">Fórmula de Confiança</h4>
              <p className="text-sm text-slate-600">
                A confiança é baseada na estabilidade da conexão com o PDV e na consistência dos dados de tracking.
                Atualmente sua confiança é de <strong className="text-emerald-600">94% (Alta)</strong>.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setShowHelp(false)}>Entendi</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
