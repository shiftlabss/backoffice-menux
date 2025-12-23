
import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { KitchenOverloadDrawer, EntranceWaitDrawer, BarIceBreakDrawer, BottleneckSummaryDrawer } from './OperationalDrawers';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/Tooltip';
import toast from 'react-hot-toast';
import { cn } from '../../../lib/utils';

const BottleneckCard = ({ item, onClick, onResolve }) => {
  const [isResolved, setIsResolved] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "p-2.5 rounded-lg border shadow-sm flex items-center justify-between group cursor-pointer transition-all duration-300 active:scale-[0.98]",
              isResolved
                ? "bg-gray-50 border-gray-100 opacity-60"
                : "bg-gray-50 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-md"
            )}
            onClick={() => {
              if (isResolved) return;
              onClick();
            }}
            role="button"
            tabIndex={0}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={cn("text-xs font-bold truncate transition-colors", isResolved ? "text-gray-500 line-through" : "text-gray-900")}>
                  {item.msg}
                </span>
                {!isResolved && item.priority === 'high' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />}
                {isResolved && <CheckCircle2 className="w-3 h-3 text-green-500" />}
              </div>
              <span className="text-[10px] text-gray-500 block truncate">{item.detail}</span>
            </div>
            {!isResolved && <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gray-500 transition-colors" />}
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{isResolved ? "Resolvido" : "Ver detalhes e ações"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default function CriticalBottlenecks() {
  const [activeDrawer, setActiveDrawer] = useState(null); // 'kitchen', 'entrance', 'bar', 'summary'

  const [bottlenecks, setBottlenecks] = useState([
    { id: 1, type: 'kitchen', msg: 'Cozinha sobrecarregada', detail: '8 pedidos > 25min', priority: 'high' },
    { id: 2, type: 'entrance', msg: 'Espera na entrada', detail: 'Fila de 12 pessoas', priority: 'medium' },
    { id: 3, type: 'bar', msg: 'Bar: Ruptura gelo', detail: 'Estoque crítico', priority: 'high' },
  ]);

  const activeCount = bottlenecks.length;

  const handleOpenDrawer = (type) => {
    setActiveDrawer(type);
  };

  const closeDrawer = () => setActiveDrawer(null);

  return (
    <>
      <Card className="p-4 h-full flex flex-col border-gray-200 shadow-sm bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Gargalos Críticos
          </h3>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className="h-5 px-1.5 text-[10px] border-red-200 text-red-700 bg-red-50 cursor-pointer hover:bg-red-100 transition-colors"
                  onClick={() => setActiveDrawer('summary')}
                >
                  {activeCount} Ativos
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{activeCount} gargalos críticos ativos no momento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {activeCount === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-xs">
            <CheckCircle2 className="w-6 h-6 mb-2 text-green-500 opacity-50" />
            <p>Nenhum gargalo crítico</p>
          </div>
        ) : (
          <div className="space-y-2 flex-1 overflow-y-auto pr-1">
            {bottlenecks.map((b) => (
              <BottleneckCard
                key={b.id}
                item={b}
                onClick={() => handleOpenDrawer(b.type)}
              />
            ))}
          </div>
        )}
      </Card>

      {/* Drawers */}
      <KitchenOverloadDrawer isOpen={activeDrawer === 'kitchen'} onClose={closeDrawer} />
      <EntranceWaitDrawer isOpen={activeDrawer === 'entrance'} onClose={closeDrawer} />
      <BarIceBreakDrawer isOpen={activeDrawer === 'bar'} onClose={closeDrawer} />
      <BottleneckSummaryDrawer isOpen={activeDrawer === 'summary'} onClose={closeDrawer} />
    </>
  );
}
