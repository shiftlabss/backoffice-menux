
import React, { useState, useMemo } from 'react';
import { Card } from '../../ui/Card';
import {
  AlertTriangle,
  RotateCw,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/Tooltip';
import toast from 'react-hot-toast';
import { cn } from '../../../lib/utils';
import { BottleneckRow } from './BottleneckRow';
import { KitchenOverloadDrawer, EntranceWaitDrawer, BarIceBreakDrawer, BottleneckSummaryDrawer } from './OperationalDrawers';

export default function CriticalBottlenecks() {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // --- STATE WITH MOCK DATA ---
  const [bottlenecks, setBottlenecks] = useState([
    {
      id: 1,
      type: 'kitchen',
      title: 'Cozinha sobrecarregada',
      evidence: '8 pedidos > 25min (SLA Violado)',
      priority: 'critical',
      timeActive: '12 min',
      impact: { primary: '8 Críticos', secondary: '+15min atraso' }
    },
    {
      id: 2,
      type: 'entrance',
      title: 'Espera na entrada',
      evidence: 'Fila de 12 pessoas acumulada',
      priority: 'attention',
      timeActive: '5 min',
      impact: { primary: '12 Pessoas', secondary: 'Sala cheia' }
    },
    {
      id: 3,
      type: 'bar',
      title: 'Bar: Ruptura gelo',
      evidence: 'Estoque de gelo abaixo do mínimo',
      priority: 'critical',
      timeActive: '32 min',
      impact: { primary: 'Estoque 5%', secondary: 'Risco iminente' }
    },
  ]);

  const [mutedIds, setMutedIds] = useState([]);
  const [seenIds, setSeenIds] = useState([]);

  // --- ACTIONS ---

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      toast.success('Gargalos atualizados');
    }, 1200);
  };

  const handleMute = (id) => {
    setMutedIds(prev => [...prev, id]);
    toast('Gargalo silenciado por 20min', {
      icon: '🔇',
      action: {
        label: 'Desfazer',
        onClick: () => setMutedIds(prev => prev.filter(mutedId => mutedId !== id)),
      },
    });
  };

  const handleMarkSeen = (id) => {
    if (seenIds.includes(id)) {
      setSeenIds(prev => prev.filter(seenId => seenId !== id)); // Toggle off
    } else {
      setSeenIds(prev => [...prev, id]); // Toggle on
    }
  };

  const activeBottlenecks = useMemo(() => {
    return bottlenecks
      .filter(b => !mutedIds.includes(b.id))
      .sort((a, b) => {
        // Sort by Priority (Critical > Attention > Monitor)
        const priorityScore = { critical: 3, attention: 2, monitor: 1 };
        return priorityScore[b.priority] - priorityScore[a.priority];
      });
  }, [bottlenecks, mutedIds]);

  const activeCount = activeBottlenecks.length;

  return (
    <>
      <Card className="flex flex-col h-full bg-white border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        {/* Header - Responsividade Fixa */}
        <div className="p-4 border-b border-gray-100 bg-white z-10">
          <div className="flex flex-col gap-2">
            {/* Linha 1: Título e Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 whitespace-nowrap">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Gargalos Críticos
                </h3>
                {activeCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-red-50 text-red-700 border-red-100 animate-pulse font-bold whitespace-nowrap"
                  >
                    {activeCount} Ativos
                  </Badge>
                )}
              </div>
              {/* Desktop: Refresh fica aqui */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-[10px] text-gray-400 font-mono">
                  Atualizado às {lastUpdated}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-7 w-7 text-gray-400 hover:text-gray-900", isRefreshing && "animate-spin text-gray-900")}
                  onClick={handleRefresh}
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mobile: Subtexto + Refresh na Linha 2 */}
            <div className="flex md:hidden items-end justify-between">
              <p className="text-xs text-gray-500 font-normal max-w-[200px] leading-tight">
                O que está travando o turno agora
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 font-mono">
                  {lastUpdated}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8 -mr-2 text-gray-400 hover:text-gray-900", isRefreshing && "animate-spin text-gray-900")}
                  onClick={handleRefresh}
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Desktop: Subtexto */}
            <p className="hidden md:block text-xs text-gray-500 font-normal">
              O que está travando o turno agora
            </p>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50/50">
          {activeCount === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-sm font-medium text-gray-600">Operação Fluindo</p>
              <p className="text-xs text-gray-400">Nenhum gargalo crítico detectado.</p>
            </div>
          ) : (
            activeBottlenecks.map((bottleneck) => (
              <BottleneckRow
                key={bottleneck.id}
                bottleneck={bottleneck}
                isSeen={seenIds.includes(bottleneck.id)}
                onView={() => setActiveDrawer(bottleneck.type)}
                onMute={handleMute}
                onMarkSeen={handleMarkSeen}
              />
            ))
          )}
        </div>

        {/* Footer Actions */}
        {activeCount > 0 && (
          <div className="p-2 border-t border-gray-100 bg-white">
            <Button
              variant="ghost"
              className="w-full text-xs text-gray-500 hover:text-gray-900 justify-center h-8"
              onClick={() => setActiveDrawer('summary')}
            >
              Ver histórico de gargalos
            </Button>
          </div>
        )}
      </Card>

      {/* Drawers Integration */}
      <KitchenOverloadDrawer isOpen={activeDrawer === 'kitchen'} onClose={() => setActiveDrawer(null)} />
      <EntranceWaitDrawer isOpen={activeDrawer === 'entrance'} onClose={() => setActiveDrawer(null)} />
      <BarIceBreakDrawer isOpen={activeDrawer === 'bar'} onClose={() => setActiveDrawer(null)} />
      <BottleneckSummaryDrawer isOpen={activeDrawer === 'summary'} onClose={() => setActiveDrawer(null)} />
    </>
  );
}
