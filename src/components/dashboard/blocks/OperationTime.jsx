import React from 'react';
import { Card } from '../../ui/Card';
import { Clock, Wine, Utensils, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function OperationTime() {
  const navigate = useNavigate();

  const handleTableClick = (tableId) => {
    navigate('/orders');
    toast(`Filtrando Mesa ${tableId}`, { icon: '🍽️' });
  };

  return (
    <Card className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-orange-500" />
          Timing de Mesas
        </h3>
        <Badge variant="outline" className="text-xs font-medium h-5">Tempo Real</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => toast('Abrindo detalhes de bebidas...', { icon: '🍷' })}>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-0.5">Média 2ª Bebida</p>
          <div className="flex items-center justify-center gap-1.5">
            <Wine className="w-3.5 h-3.5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-900">18m</p>
          </div>
        </div>
        <div className="text-center p-2 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => toast('Abrindo detalhes de sobremesas...', { icon: '🍰' })}>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-0.5">Conv. Sobremesa</p>
          <div className="flex items-center justify-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-orange-500" />
            <p className="text-lg font-semibold text-gray-900">12%</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-2 flex items-center gap-1">
          <AlertTriangle size={10} className="text-orange-500" /> Oportunidades Abertas
        </h4>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center p-1.5 rounded bg-orange-50/50 border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors" onClick={() => handleTableClick(12)}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-800 bg-white px-1.5 rounded border border-orange-200">12</span>
              <span className="text-[10px] text-orange-700">35min s/ pedir</span>
            </div>
            <ArrowRight size={10} className="text-orange-400" />
          </div>
          <div className="flex justify-between items-center p-1.5 rounded bg-orange-50/50 border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors" onClick={() => handleTableClick(5)}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-800 bg-white px-1.5 rounded border border-orange-200">05</span>
              <span className="text-[10px] text-orange-700">Prato finalizado</span>
            </div>
            <ArrowRight size={10} className="text-orange-400" />
          </div>
        </div>
      </div>
    </Card>
  );
}
