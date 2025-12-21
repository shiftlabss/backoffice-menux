
import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Table, Search, Download, BarChart2, PlusCircle, Settings2 } from 'lucide-react';

export function DataExplorer() {
  const [metric, setMetric] = useState('revenue');
  const [dimension, setDimension] = useState('channel');

  return (
    <div className="space-y-6">

      {/* Builder Controls */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-end">

          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Métrica Principal</label>
            <select
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-purple-100 outline-none"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
            >
              <option value="revenue">Faturamento Total</option>
              <option value="orders">Quantidade de Pedidos</option>
              <option value="conversion">Taxa de Conversão</option>
              <option value="ticket">Ticket Médio</option>
            </select>
          </div>

          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Agrupar por (Dimensão)</label>
            <select
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-purple-100 outline-none"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
            >
              <option value="channel">Canal de Venda</option>
              <option value="shift">Turno</option>
              <option value="category">Categoria</option>
              <option value="dow">Dia da Semana</option>
              <option value="hour">Hora do Dia</option>
            </select>
          </div>

          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Filtros Opcionais</label>
            <Button variant="outline" className="w-full justify-between text-slate-500 border-dashed">
              <span>Adicionar Filtro</span>
              <PlusCircle size={16} />
            </Button>
          </div>

          <Button className="bg-slate-900 text-white min-w-[120px] h-10.5 hover:bg-slate-800">
            Gerar Relatório
          </Button>

        </div>
      </div>

      {/* Results Placeholder */}
      <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 min-h-[300px] flex flex-col items-center justify-center text-slate-400 gap-4">
        <div className="p-4 bg-white rounded-full shadow-sm">
          <BarChart2 size={32} className="text-purple-200" />
        </div>
        <div className="text-center">
          <p className="font-bold text-slate-500">Nenhum relatório gerado</p>
          <p className="text-sm">Configure as métricas acima para explorar seus dados.</p>
        </div>
      </div>

    </div>
  );
}
