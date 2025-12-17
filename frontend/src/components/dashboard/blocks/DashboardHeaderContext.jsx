
import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Calendar, Building2, AlertTriangle, User, ChevronRight, Activity } from 'lucide-react';
import { Badge } from '../../ui/Badge';

export default function DashboardHeaderContext() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 h-full items-stretch">

      {/* CARD 1: CONTEXTO (6 cols) */}
      <Card className="lg:col-span-6 p-5 flex flex-col justify-between border-gray-200 shadow-sm bg-white relative overflow-hidden group">
        <div className="flex justify-between items-start z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Unidade Principal</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Coco Bambu - Filial SP</h1>
          </div>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 flex items-center gap-1.5 px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase">Operação Online</span>
          </Badge>
        </div>

        <div className="flex items-end justify-between mt-6 z-10">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-700">17 Dez, 2024</span>
            </div>
          </div>

          {/* Mock Sparkline for "Day Trend" */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-medium text-gray-400 uppercase">Tendência do Dia</span>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-300" />
              <div className="h-6 w-24 flex items-end gap-0.5 opacity-50">
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
      <Card className="lg:col-span-4 p-5 flex flex-col justify-between border-gray-200 shadow-sm bg-white relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2.5">
            <div className="bg-red-50 p-2 rounded-lg border border-red-100">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Alertas Críticos</span>
              <span className="text-[10px] text-gray-500">Requer atenção imediata</span>
            </div>
          </div>
          <span className="text-2xl font-bold text-red-600 tabular-nums">3</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium truncate max-w-[140px]">
            Cozinha, Bar, Entrada...
          </span>
          <Button size="sm" variant="ghost" className="h-8 text-xs font-bold text-red-700 hover:text-red-800 hover:bg-red-50 px-3 transition-colors">
            Resolver Agora
          </Button>
        </div>
      </Card>

      {/* CARD 3: PERFIL (2 cols) */}
      <Card className="lg:col-span-2 p-0 border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-gray-300 transition-colors">
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center gap-2 p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white shadow-sm">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900">Admin</span>
            <span className="text-[10px] text-gray-500">Gerente</span>
          </div>
        </div>
        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0" />
      </Card>
    </div>
  );
}
