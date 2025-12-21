
import React from 'react';
import { Activity, ShoppingCart, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { MOCK_PULSE } from '../../../services/mockAnalytics';

export function PulseStrip({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      {/* Active Sessions */}
      <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-sm flex items-center justify-between cursor-pointer hover:border-purple-300 transition-colors">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sessões Ativas</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">{data.activeSessions.current}</span>
            <span className="text-[10px] text-emerald-600 font-bold mb-0.5">↑ {data.activeSessions.trend === 'up' ? 'Alta' : 'Estável'}</span>
          </div>
        </div>
        <div className="h-8 w-16 bg-slate-50 rounded flex items-end justify-center pb-1 gap-0.5">
          {/* Mini sparkline mock */}
          {[4, 6, 3, 7, 5, 8, 6, 9].map((h, i) => (
            <div key={i} className="w-1 bg-emerald-400 rounded-t" style={{ height: `${h * 10}%` }}></div>
          ))}
        </div>
      </div>

      {/* Orders In Progress */}
      <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-sm flex items-center justify-between cursor-pointer hover:border-purple-300 transition-colors">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pedidos Aberto</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-slate-900 leading-none">{data.ordersInProgress.current}</span>
            <span className="text-[10px] text-slate-400 font-bold mb-0.5">-- Normal</span>
          </div>
        </div>
        <Clock className="text-slate-200" size={24} />
      </div>

      {/* Indicators */}
      <div className="lg:col-span-3 grid grid-cols-3 gap-4">
        <div className="flex flex-col justify-center px-4 border-l border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Tempo Decisão (2h)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-700">{data.avgDecisionTime.current}</span>
            <span className="text-[10px] text-emerald-600 font-bold">-10s</span>
          </div>
        </div>

        <div className="flex flex-col justify-center px-4 border-l border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Add Carrinho (2h)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-700">{data.cartRate.current}</span>
            <span className="text-[10px] text-emerald-600 font-bold">+2.5%</span>
          </div>
        </div>

        {/* Alerts */}
        <div className="flex items-center gap-2 px-4 border-l border-slate-100 bg-amber-50/50 rounded-r-lg">
          {data.alerts.length > 0 && (
            <>
              <AlertTriangle size={16} className="text-amber-500 shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-amber-800 truncate">{data.alerts[0].message}</p>
                <p className="text-[10px] text-amber-600">Impacto estimado: {data.alerts[0].metric}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
