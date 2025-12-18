import React from 'react';
import { Card } from '../../ui/Card';
import { TrendingUp, MousePointer2, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function UpsellCrossSellToday() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/menu/upsell');
    toast.loading('Carregando módulo Upsell...', { duration: 1000 });
  };

  return (
    <Card className="p-0 overflow-hidden relative border-l-4 border-l-green-500 h-full flex flex-col">
      <div className="p-5 pb-3 flex-1">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-green-600" />
          Upsell e Cross sell Hoje
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-3 rounded-xl border border-green-100">
            <p className="text-xs text-green-800 font-medium mb-1">Receita Extra</p>
            <p className="text-lg font-bold text-green-700">+ R$ 320,00</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-500 font-medium mb-1">Taxa Conversão</p>
            <p className="text-lg font-bold text-gray-900">18.5%</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase">Top Regras do Dia</h4>
          {[
            { name: 'Batata M -> G', conv: '22%', val: 'R$ 120' },
            { name: 'Adic. Bebida', conv: '15%', val: 'R$ 80' }
          ].map((rule, i) => (
            <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0 hover:bg-gray-50 cursor-pointer p-1 rounded transition-colors" onClick={handleNavigate}>
              <span className="font-medium text-gray-700">{rule.name}</span>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs h-5 px-1">{rule.conv}</Badge>
                <span className="font-bold text-gray-900">{rule.val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-3 border-t border-gray-100 mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs text-green-700 hover:text-green-800 hover:bg-green-50 justify-between"
          onClick={handleNavigate}
        >
          Ver módulo Upsell <ArrowRight size={14} />
        </Button>
      </div>
    </Card>
  );
}
