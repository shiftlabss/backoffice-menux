import React from 'react';
import { Card } from '../../ui/Card';
import { TrendingUp, TrendingDown, Minus, Clock, Activity, ArrowRight } from 'lucide-react';
import { Skeleton } from '../../ui/Skeleton';
import { cn } from '../../../lib/utils';
import { Badge } from '../../ui/Badge';

export default function OperationalTrendBlock({ isLoading = false }) {
  if (isLoading) {
    return (
      <Card className="h-full bg-white border-gray-200 shadow-sm p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </Card>
    );
  }

  // Mock Data for "Improving" State
  const trendData = {
    status: 'Melhorando',
    statusColor: 'bg-emerald-500',
    indicators: [
      {
        id: 1,
        label: 'Tempo de Preparo',
        value: '18 min',
        trend: 'down',
        diff: '-2m',
        isGood: true
      },
      {
        id: 2,
        label: 'Mesas em Risco',
        value: '3',
        trend: 'up',
        diff: '+1',
        isGood: false
      },
      {
        id: 3,
        label: 'Pedidos em Atraso',
        value: '2',
        trend: 'down',
        diff: '-4',
        isGood: true
      },
      {
        id: 4,
        label: 'Ticket Médio (30m)',
        value: 'R$ 84',
        trend: 'up',
        diff: '+5%',
        isGood: true
      }
    ],
    summaryTitle: 'Resumo do sistema',
    insight: 'Cozinha estabilizando, mas atenção para mesas 4 e 12 que demandam atendimento.'
  };

  return (
    <Card className="h-full flex flex-col bg-white border-gray-200 shadow-sm overflow-hidden relative group">
      {/* Status Accent Line */}
      <div className={cn("absolute top-0 left-0 w-full h-1", trendData.statusColor)} />

      {/* Header */}
      <div className="px-5 pt-5 pb-2 flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-base font-bold text-gray-900 leading-tight">Tendência do Turno</h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Últimos 30 min</p>
        </div>
        <Badge variant="outline" className={cn("text-xs font-bold border-0 px-2.5 py-1 rounded-full uppercase tracking-wide",
          trendData.status === 'Melhorando' ? 'bg-emerald-100/80 text-emerald-800' :
            trendData.status === 'Piorando' ? 'bg-red-100/80 text-red-800' : 'bg-gray-100 text-gray-700'
        )}>
          {trendData.status}
        </Badge>
      </div>

      {/* Indicators Grid */}
      <div className="flex-1 px-5 py-4 grid grid-cols-2 gap-3">
        {trendData.indicators.map((item) => (
          <div key={item.id} className="flex flex-col p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">{item.label}</span>
            <div className="flex items-baseline gap-2 mt-auto">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">{item.value}</span>
              <span className={cn("text-xs font-bold flex items-center gap-0.5",
                item.isGood ? 'text-emerald-600' : 'text-red-600'
              )}>
                {item.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.diff}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="px-5 pb-5">
        <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100/50 flex items-start gap-3">
          <div className="bg-blue-100 p-1.5 rounded-full mt-0.5 shrink-0">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block mb-1 opacity-80">{trendData.summaryTitle}</span>
            <p className="text-xs text-blue-900 font-medium leading-relaxed">
              {trendData.insight}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
