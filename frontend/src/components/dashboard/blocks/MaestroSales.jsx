
import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Bot, ShoppingBag } from 'lucide-react';

export default function MaestroSales() {
  return (
    <Card className="p-5 h-full flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 text-white">
      <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2 mb-6">
        <Bot className="w-4 h-4 text-purple-400" />
        Vendas com IA
      </h3>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-1">
            <span className="text-3xl font-bold text-white">R$ 3.450</span>
            <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border-0">+18%</Badge>
          </div>
          <span className="text-xs text-gray-500">Receita influenciada diretamente</span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
          <div>
            <span className="text-lg font-bold text-white block">142</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Pedidos</span>
          </div>
          <div>
            <span className="text-lg font-bold text-white block">4.8%</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Conv. Extra</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
