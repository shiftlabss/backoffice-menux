import React from 'react';
import { Card } from '../../ui/Card';
import { Clock, Wine, Utensils, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function OperationTime() {
  const navigate = useNavigate();

  const handleTableClick = (tableId) => {
    navigate('/orders');
    toast(`Filtrando Mesa ${tableId}`, { icon: '🍽️' });
  };

  return (
    <Card className="p-5 h-full">
      <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-orange-500" />
        Timing de Mesas
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => toast('Abrindo detalhes de bebidas...', { icon: '🍷' })}>
          <Wine className="w-5 h-5 text-purple-500 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Média 2ª Bebida</p>
          <p className="text-lg font-bold text-gray-900">18 min</p>
        </div>
        <div className="text-center p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => toast('Abrindo detalhes de sobremesas...', { icon: '🍰' })}>
          <Utensils className="w-5 h-5 text-orange-500 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Conv. Sobremesa</p>
          <p className="text-lg font-bold text-gray-900">12%</p>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-1">
          <AlertTriangle size={12} className="text-orange-500" /> Oportunidades Abertas
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 rounded bg-orange-50 border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors" onClick={() => handleTableClick(12)}>
            <span className="text-sm font-bold text-orange-800">Mesa 12</span>
            <span className="text-xs text-orange-700">35min sem pedir</span>
            <Button size="icon" className="w-6 h-6 rounded-full bg-white text-orange-600 shadow-sm hover:bg-orange-100">
              <ArrowRight size={12} />
            </Button>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-orange-50 border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors" onClick={() => handleTableClick(5)}>
            <span className="text-sm font-bold text-orange-800">Mesa 05</span>
            <span className="text-xs text-orange-700">Terminou prato há 15min</span>
            <Button size="icon" className="w-6 h-6 rounded-full bg-white text-orange-600 shadow-sm hover:bg-orange-100">
              <ArrowRight size={12} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
