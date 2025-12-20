import React from 'react';
import { Card } from '../../ui/Card';
import { Users, Clock, Activity } from 'lucide-react';

export default function ServiceStatus() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
      {/* CARD 1: ESPERA */}
      <Card className="p-3 flex flex-col justify-between bg-white border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500 flex items-center gap-1">
          <Users className="w-3 h-3" /> Espera
        </span>
        <div className="mt-1">
          <span className="text-2xl md:text-[28px] font-bold text-gray-900 block leading-none">12</span>
          <span className="text-xs text-gray-500 font-normal ml-0.5">filas</span>
        </div>
        <div className="w-full bg-gray-100 h-1 rounded-full mt-2 overflow-hidden">
          <div className="bg-amber-400 h-full w-[40%]" />
        </div>
      </Card>

      {/* CARD 2: PREPARO */}
      <Card className="p-3 flex flex-col justify-between bg-white border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Prep
        </span>
        <div className="mt-1">
          <span className="text-2xl md:text-[28px] font-bold text-gray-900 block leading-none">18<span className="text-lg font-semibold text-gray-400">m</span></span>
        </div>
        {/* Mini Sparkline Mock */}
        <div className="flex items-end gap-0.5 h-3 mt-2 opacity-30">
          <div className="w-1 bg-gray-900 h-full" />
          <div className="w-1 bg-gray-900 h-[80%]" />
          <div className="w-1 bg-gray-900 h-[40%]" />
          <div className="w-1 bg-gray-900 h-[60%]" />
          <div className="w-1 bg-gray-900 h-[90%]" />
        </div>
      </Card>

      {/* CARD 3: SLA GERAL */}
      <Card className="p-3 flex flex-col justify-between bg-white border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500 flex items-center gap-1">
          <Activity className="w-3 h-3" /> SLA
        </span>
        <div className="mt-1">
          <span className="text-2xl md:text-[28px] font-bold text-emerald-600 block leading-none">98%</span>
        </div>
        <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1 py-0.5 rounded-full w-fit mt-2 text-center leading-tight">
          Dentro da meta
        </span>
      </Card>
    </div>
  );
}
