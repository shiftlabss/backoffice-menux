
import React from 'react';
import { Card } from '../../ui/Card';
import { Calendar, Building2, Clock } from 'lucide-react';

export default function DashboardHeaderContext() {
  return (
    <Card className="p-8 h-full flex flex-col justify-center bg-zinc-900 border-zinc-800">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Restaurante</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Coco Bambu - Filial SP</h1>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              17 de Dezembro, 2024
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Turno: <span className="text-white font-medium">Jantar</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold uppercase tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Operação Saudável
          </span>
          <p className="text-[10px] text-zinc-500 mt-2 text-right max-w-[150px]">
            Todos os sistemas operando normalmente.
          </p>
        </div>
      </div>
    </Card>
  );
}
