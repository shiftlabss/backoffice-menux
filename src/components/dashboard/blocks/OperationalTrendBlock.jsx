import React from 'react';
import { Card } from '../../ui/Card';
import { TrendingUp, TrendingDown, Minus, Clock, Users, AlertTriangle, ChefHat } from 'lucide-react';
import { Skeleton } from '../../ui/Skeleton';
import { cn } from '../../../lib/utils';

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
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    indicators: [
      {
        id: 1,
        label: 'Tempo de Preparo',
        value: '18 min',
        trend: 'down', // down is good for time
        diff: '-2m',
        icon: ChefHat
      },
      {
        id: 2,
        label: 'Mesas em Risco',
        value: '3',
        trend: 'up', // up is bad for risk
        diff: '+1',
        icon: AlertTriangle
      },
      {
        id: 3,
        label: 'Pedidos em Atraso',
        value: '2',
        trend: 'down', // down is good
        diff: '-4',
        icon: Clock
      },
      {
        id: 4,
        label: 'Ticket Médio (30m)',
        value: 'R$ 84',
        trend: 'up', // up is good for money
        diff: '+5%',
        icon: TrendingUp
      }
    ],
    insight: 'Cozinha estabilizando operações, mas atenção para mesas 4 e 12 que demandam atendimento.'
  };

  const getTrendIcon = (trend, metricLabel) => {
    // Simplification: We could have complex logic here, but for now:
    // If it's a "bad" metric (Risk, Late), UP is bad (Red).
    // If it's a "good" metric (Ticket), UP is good (Green).
    // If it's time, DOWN is usually good (Green).

    // Let's just use generic logic for the UI example:
    // We will pass specific colors in the render loop or styling.
    return trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };

  const getTrendColor = (label, trend) => {
    const badMetrics = ['Tempo de Preparo', 'Mesas em Risco', 'Pedidos em Atraso'];
    const isBadMetric = badMetrics.some(m => label.includes(m));

    if (isBadMetric) {
      // If bad metric goes UP -> Red. Goes DOWN -> Green.
      return trend === 'up' ? 'text-red-600' : 'text-emerald-600';
    } else {
      // Good metric (Ticket, Revenue) goes UP -> Green. Goes DOWN -> Red.
      return trend === 'up' ? 'text-emerald-600' : 'text-red-600';
    }
  };


  return (
    <Card className="h-full flex flex-col bg-white border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Tendência do Turno</h3>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Últimos 30 minutos
          </p>
        </div>
        <div className={cn("px-2.5 py-1 rounded-full text-xs font-bold border", trendData.statusColor)}>
          {trendData.status}
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="flex-1 p-5 grid grid-cols-2 gap-y-6 gap-x-4">
        {trendData.indicators.map((item) => (
          <div key={item.id} className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium mb-1 truncate">{item.label}</span>
            <div className="flex items-end gap-2">
              <span className="text-lg font-bold text-gray-900 leading-none">{item.value}</span>
              <span className={cn("text-xs font-bold flex items-center mb-0.5", getTrendColor(item.label, item.trend))}>
                {getTrendIcon(item.trend)} {item.diff}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Insight Footer */}
      <div className="p-4 bg-gray-50/80 border-t border-gray-100">
        <div className="flex gap-3 items-start p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
          <div className="bg-blue-100 p-1 rounded-full mt-0.5">
            <TrendingUp className="w-3 h-3 text-blue-600" />
          </div>
          <p className="text-xs text-blue-900 leading-relaxed font-medium">
            {trendData.insight}
          </p>
        </div>
      </div>
    </Card>
  );
}
