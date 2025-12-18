
import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Calendar, Building2, AlertTriangle, Activity } from 'lucide-react';
import { Badge } from '../../ui/Badge';

export default function DashboardHeaderContext() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 h-full items-stretch">

      {/* CARD 1: CONTEXTO (5 cols) */}
      <Card className="md:col-span-1 lg:col-span-5 p-5 flex flex-col justify-between border-gray-200 shadow-sm bg-white relative overflow-hidden group">
        <div className="flex justify-between items-start z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-sm font-normal text-gray-500">Unidade Principal</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 leading-tight">Coco Bambu - Filial SP</h1>
          </div>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 flex items-center gap-1.5 px-2.5 py-1 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium uppercase tracking-wide">Operação Online</span>
          </Badge>
        </div>

        <div className="flex items-end justify-between mt-4 lg:mt-6 z-10 gap-2">
          <div className="flex items-center gap-4 text-sm shrink-0">
            <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-2 lg:px-3 py-1.5 rounded-lg border border-gray-100 whitespace-nowrap">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-normal text-gray-700">17 Dez, 2024</span>
            </div>
          </div>

          {/* Mock Sparkline for "Day Trend" */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Tendência do Dia</span>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-300" />
              <div className="h-6 w-16 lg:w-24 flex items-end gap-0.5 opacity-50">
                <div className="w-1 bg-gray-200 h-[40%] rounded-t-sm" />
                <div className="w-1 bg-gray-200 h-[60%] rounded-t-sm" />
                <div className="w-1 bg-gray-200 h-[45%] rounded-t-sm" />
                <div className="w-1 bg-gray-200 h-[70%] rounded-t-sm" />
                <div className="w-1 bg-gray-300 h-[85%] rounded-t-sm" />
                <div className="w-1 bg-gray-300 h-[65%] rounded-t-sm" />
                <div className="w-1 bg-gray-400 h-[90%] rounded-t-sm" />
                <div className="w-1 bg-gray-900 h-[100%] rounded-t-sm" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* CARD 2: ALERTAS CRÍTICOS (4 cols) */}
      <Card className="md:col-span-1 lg:col-span-4 p-5 flex flex-col justify-between border-gray-200 shadow-sm bg-white relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2.5">
            <div className="bg-red-50 p-2 rounded-lg border border-red-100">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Alertas Críticos</span>
              <span className="text-xs font-normal text-gray-400">Requer atenção imediata</span>
            </div>
          </div>
          <span className="text-2xl md:text-[28px] font-bold text-red-600 tabular-nums">3</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500 font-medium truncate">
            Cozinha, Bar, Entrada...
          </span>
          <Button size="sm" variant="ghost" className="h-8 text-[10px] lg:text-xs font-bold text-red-700 hover:text-red-800 hover:bg-red-50 px-2 lg:px-3 transition-colors whitespace-nowrap shrink-0">
            Resolver Agora
          </Button>
        </div>
      </Card>

      {/* CARD 3: RESUMO DO TURNO (3 cols) */}
      <Card
        className="md:col-span-2 lg:col-span-3 p-4 flex flex-col justify-between border-gray-200 shadow-sm bg-white relative overflow-hidden cursor-pointer hover:border-gray-300 transition-colors group"
        onClick={() => window.location.href = '/reports?shift=almoco'}
      >
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Resumo do Turno</span>
          <div className="flex flex-wrap items-center justify-between mt-1 gap-1">
            <span className="text-lg font-semibold text-gray-900">Almoço</span>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] px-1.5 h-5 flex items-center gap-1 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Normal
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <div className="space-y-1">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-medium text-gray-500 whitespace-nowrap">Meta do turno</span>
              <span className="text-[10px] font-bold text-gray-900">68%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-[68%]" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-2 border-t border-gray-50">
            <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Pico:</span>
            <span className="text-xs font-bold text-gray-700 whitespace-nowrap">12h - 13h</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
