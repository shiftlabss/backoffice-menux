import React from 'react';
import { Card } from '../../ui/Card';
import { DollarSign, Sun, Moon, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function RevenueByShift() {
  const navigate = useNavigate();

  const handleShiftClick = (shift) => {
    navigate('/analytics');
    toast.success(`Filtrando Analytics por turno: ${shift}`);
  };

  return (
    <Card className="p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          Receita por Turno
        </h3>
        <span className="text-xs text-gray-400">Hoje vs Ontem</span>
      </div>

      <div className="space-y-4">
        {/* Almoço */}
        <div
          className="flex items-center justify-between p-3 bg-orange-50/50 rounded-xl border border-orange-100 hover:border-orange-200 transition-colors cursor-pointer active:scale-95"
          onClick={() => handleShiftClick('Almoço')}
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
              <Sun size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Almoço</p>
              <p className="text-sm font-bold text-gray-900">R$ 4.250</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-1 justify-end">
              +12%
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5">vs R$ 3.800</p>
          </div>
        </div>

        {/* Jantar */}
        <div
          className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 hover:border-indigo-200 transition-colors cursor-pointer active:scale-95"
          onClick={() => handleShiftClick('Jantar')}
        >
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <Moon size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Jantar</p>
              <p className="text-sm font-bold text-gray-900">R$ 1.850</p>
            </div>
          </div>
          <div className="text-right">
            {/* Em andamento */}
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-1 justify-end animate-pulse">
              Ao vivo
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5">Proj: R$ 8k</p>
          </div>
        </div>

        {/* Madrugada - Vazio/Sem dados */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 opacity-60 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 p-2 rounded-lg text-gray-500">
              <Coffee size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Madrugada</p>
              <p className="text-sm text-gray-400">Aguardando início</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400">--</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
