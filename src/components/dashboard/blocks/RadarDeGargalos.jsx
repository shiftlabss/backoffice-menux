import React, { useState, useMemo } from 'react';
import { Card } from '../../ui/Card';
import { AlertTriangle, RotateCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Form';
import toast from 'react-hot-toast';
import { cn } from '../../../lib/utils';
import { RadarPriorityItem } from './RadarPriorityItem';
import { RadarNextItem } from './RadarNextItem';
import { KitchenOverloadDrawer, EntranceWaitDrawer, BarIceBreakDrawer, BottleneckSummaryDrawer } from './OperationalDrawers';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/Tooltip';

export default function RadarDeGargalos() {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

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
    // Map ID to drawer type (mock logic)
    const mapping = { 1: 'kitchen', 2: 'entrance', 3: 'bar' };
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
            {activeCount > 0 && (
              <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-100 font-bold whitespace-nowrap">
                {activeCount} Ativos
              </Badge>
            )}
          </div>


        </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 bg-gray-50/30 overflow-y-auto">
          {activeCount === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-6">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm font-medium text-gray-600">Operação estável no momento</p>
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

                <Button variant="link" className="w-full text-xs text-gray-500 hover:text-gray-900 justify-between px-2 mt-auto h-auto py-2 group">
                  Ver histórico de gargalos
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

            </div>
          )}
        </div>
      </Card>

      {/* DRAWERS (Reused from operational system) */}
      <KitchenOverloadDrawer isOpen={activeDrawer === 'kitchen'} onClose={() => setActiveDrawer(null)} />
      <EntranceWaitDrawer isOpen={activeDrawer === 'entrance'} onClose={() => setActiveDrawer(null)} />
      <BarIceBreakDrawer isOpen={activeDrawer === 'bar'} onClose={() => setActiveDrawer(null)} />
      <BottleneckSummaryDrawer isOpen={activeDrawer === 'summary'} onClose={() => setActiveDrawer(null)} />
    </>
  );
}
