import React, { useState, useMemo } from 'react';
import { useAudit } from '../../../hooks/useAudit';
import { Card } from '../../ui/Card';
import { AlertTriangle, RotateCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Form';
import toast from 'react-hot-toast';
import { cn } from '../../../lib/utils';
import { RadarPriorityItem } from './RadarPriorityItem';
import { RadarNextItem } from './RadarNextItem';
import { KitchenOverloadDrawer, SlowDecisionDrawer, BarIceBreakDrawer, BottleneckSummaryDrawer } from './OperationalDrawers';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/Tooltip';

export default function RadarDeGargalos({ isLoading = false }) {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const { log } = useAudit();

  // --- MOCK DATA ---
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
      type: 'decision_slow',
      title: 'Decisão lenta no cardápio',
      evidence: '9 mesas > 10 min sem pedido',
      priority: 'attention',
      timeActive: '14 min',
      impact: { primary: '9 Mesas', secondary: '~12min média' }
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

  // --- ACTIONS ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      toast.success('Radar atualizado');
    }, 1200);
  };

  const handleOpenDrawer = (id) => {
    log('dashboard.radar.open', { bottleneckId: id });
    // Map ID to drawer type (mock logic)
    const mapping = { 1: 'kitchen', 2: 'decision_slow', 3: 'bar' };
    setActiveDrawer(mapping[id] || 'summary');
  };

  // Logic: Sort by Priority -> Pick Top 1 as Hero -> Rest as List
  const { priorityItem, nextItems, activeCount } = useMemo(() => {
    const priorityScore = { critical: 3, attention: 2, monitor: 1 };

    // Sort descending by priority score
    const sorted = [...bottlenecks].sort((a, b) =>
      priorityScore[b.priority] - priorityScore[a.priority]
    );

    return {
      priorityItem: sorted[0] || null,
      nextItems: sorted.slice(1),
      activeCount: sorted.length
    };
  }, [bottlenecks]);


  return (
    <>
      <Card className="flex flex-col h-full bg-white border-gray-200 shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-base font-bold text-gray-900 whitespace-nowrap">
                Gargalos no turno
              </h3>
            </div>
            {!isLoading && activeCount > 0 && (
              <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-100 font-bold whitespace-nowrap">
                {activeCount} Ativos
              </Badge>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 bg-gray-50/30 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 animate-pulse">
                <div className="flex justify-between mb-3">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-3 w-48 bg-gray-100 rounded mb-4"></div>
                <div className="h-8 w-full bg-gray-100 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-16 w-full bg-white rounded-lg border border-gray-100 animate-pulse"></div>
                <div className="h-16 w-full bg-white rounded-lg border border-gray-100 animate-pulse"></div>
              </div>
            </div>
          ) : activeCount === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-6 px-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-sm border border-emerald-100">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Operação fluindo bem!</h4>
              <p className="text-xs text-gray-500 max-w-[200px]">
                Nenhum gargalo de cozinha, bar ou atendimento detectado no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 h-full">

              {/* COL 1: PRIORITY HERO */}
              <div className="flex flex-col">
                <RadarPriorityItem bottleneck={priorityItem} onView={handleOpenDrawer} />
              </div>

              {/* COL 2: NEXT ITEMS LIST */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Próximos na fila
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  {nextItems.map(item => (
                    <RadarNextItem key={item.id} bottleneck={item} onView={handleOpenDrawer} />
                  ))}

                  {nextItems.length === 0 && (
                    <p className="text-xs text-gray-400 italic px-2 py-4 text-center border border-dashed border-gray-200 rounded-lg">
                      Nenhum outro gargalo crítico.
                    </p>
                  )}
                </div>


              </div>

            </div>
          )}
        </div>
      </Card>

      {/* DRAWERS (Reused from operational system) */}
      <KitchenOverloadDrawer isOpen={activeDrawer === 'kitchen'} onClose={() => setActiveDrawer(null)} />
      <SlowDecisionDrawer isOpen={activeDrawer === 'decision_slow'} onClose={() => setActiveDrawer(null)} />
      <BarIceBreakDrawer isOpen={activeDrawer === 'bar'} onClose={() => setActiveDrawer(null)} />
      <BottleneckSummaryDrawer isOpen={activeDrawer === 'summary'} onClose={() => setActiveDrawer(null)} />
    </>
  );
}
