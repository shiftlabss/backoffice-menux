import React from 'react';
import { Card } from '../../ui/Card';
import { Clock, Wine, Utensils, AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/Form';

export default function OperationTime() {
  return (
    <Card className="p-5 h-full">
      <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-orange-500" />
        Timing de Mesas
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 rounded-xl border border-gray-100 bg-gray-50">
          <Wine className="w-5 h-5 text-purple-500 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Média 2ª Bebida</p>
          <p className="text-lg font-bold text-gray-900">18 min</p>
        </div>
        <div className="text-center p-3 rounded-xl border border-gray-100 bg-gray-50">
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
          <div className="flex justify-between items-center p-2 rounded bg-orange-50 border border-orange-100">
            <span className="text-sm font-bold text-orange-800">Mesa 12</span>
            <span className="text-xs text-orange-700">35min sem pedir</span>
            <Button size="icon" className="w-6 h-6 rounded-full bg-white text-orange-600 shadow-sm hover:bg-orange-100">
              <ArrowRight size={12} />
            </Button>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-orange-50 border border-orange-100">
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

import { ArrowRight } from 'lucide-react';
