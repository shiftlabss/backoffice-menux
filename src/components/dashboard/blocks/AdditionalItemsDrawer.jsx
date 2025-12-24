import React from 'react';
import { Drawer } from '../../ui/Drawer';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import {
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Coffee,
  Utensils,
  IceCream,
  PlusCircle,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useAudit } from '../../../hooks/useAudit';

/**
 * Drawer para detalhamento da KPI "Itens Adicionais por Pedido"
 */
export function AdditionalItemsDrawer({ isOpen, onClose }) {
  const { log } = useAudit();

  // MOCK DATA - Em produção viria de uma prop ou hook
  const kpiData = {
    value: 0.42,
    variation: { value: 6.1, trend: 'up' },
    breakdown: {
      channels: [
        { name: 'Salão', value: 0.55, trend: 'up' },
        { name: 'Delivery', value: 0.32, trend: 'down' },
        { name: 'Takeaway', value: 0.28, trend: 'stable' }
      ],
      categories: [
        { name: 'Bebidas', volume: 450, share: '52%', icon: Coffee, color: 'text-blue-500 bg-blue-50 border-blue-100' },
        { name: 'Entradas', volume: 210, share: '24%', icon: Utensils, color: 'text-orange-500 bg-orange-50 border-orange-100' },
        { name: 'Sobremesas', volume: 145, share: '16%', icon: IceCream, color: 'text-pink-500 bg-pink-50 border-pink-100' },
        { name: 'Adicionais', volume: 70, share: '8%', icon: PlusCircle, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' }
      ]
    },
    recommendations: [
      {
        text: 'Sugerir bebida p/ mesas com >15min sem pedido',
        impact: 'Alto',
        type: 'automacao'
      },
      {
        text: 'Criar combo "Entrada + Principal" no Delivery',
        impact: 'Médio',
        type: 'cardapio'
      }
    ]
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Itens Adicionais"
      subtitle="Análise de Cross-Selling e Composição do Pedido"
      size="md"
    >
      <div className="space-y-8 pb-8">

        {/* 1. HERO METRIC */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Média Atual</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-gray-900">{kpiData.value}</span>
              <span className="text-sm font-medium text-gray-500">itens/pedido</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold mb-1">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +{kpiData.variation.value}%
            </Badge>
            <span className="text-[10px] text-gray-400">vs. período anterior</span>
          </div>
        </div>

        {/* 2. CHART PLACEHOLDER (Simulando Série Temporal) */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-gray-900">Evolução no Período</h4>
          <div className="h-40 w-full bg-white border border-dashed border-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

            {/* Fake Sparkline Visual */}
            <div className="flex items-end gap-1 h-24 w-3/4 opacity-80">
              {[40, 45, 30, 50, 65, 55, 60, 75, 50, 60, 80, 70].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-emerald-500 rounded-t-sm hover:bg-emerald-600 transition-colors" />
              ))}
            </div>
          </div>
        </div>

        {/* 3. BREAKDOWN POR CANAL */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-900">Performance por Canal</h4>
          <div className="grid grid-cols-3 gap-3">
            {kpiData.breakdown.channels.map((channel) => (
              <div key={channel.name} className="p-3 bg-white border border-gray-200 rounded-xl flex flex-col items-center text-center shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{channel.name}</span>
                <span className="text-lg font-extrabold text-gray-900">{channel.value}</span>
                <span className={cn(
                  "text-[10px] font-bold flex items-center mt-1",
                  channel.trend === 'up' ? "text-emerald-500" : channel.trend === 'down' ? "text-red-500" : "text-gray-400"
                )}>
                  {channel.trend === 'up' ? '▲ Alta' : channel.trend === 'down' ? '▼ Baixa' : 'Estável'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CATEGORIAS (O que mais sai) */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-900">Top Adicionais</h4>
          <div className="space-y-2">
            {kpiData.breakdown.categories.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group cursor-default">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg border", cat.color)}>
                    <cat.icon size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-700">{cat.name}</span>
                    <span className="text-[10px] text-gray-400">{cat.volume} itens vendidos</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{cat.share}</span>
                  <div className="h-1 w-12 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-gray-400" style={{ width: cat.share }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. RECOMENDAÇÕES MAESTRO */}
        <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h4 className="text-xs font-extrabold text-amber-800 uppercase tracking-widest">Maestro Insights</h4>
          </div>
          <ul className="space-y-3">
            {kpiData.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-amber-900/80">
                <i className="block w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{rec.text} <span className="font-bold border-b border-amber-300 border-dashed cursor-help" title="Impacto Estimado">({rec.impact})</span></span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Drawer>
  );
}
