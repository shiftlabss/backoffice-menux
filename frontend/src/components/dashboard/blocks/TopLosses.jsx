import React from 'react';
import { Card } from '../../ui/Card';
import { TrendingDown, EyeOff, ShoppingCart, Ban } from 'lucide-react';
import { Button } from '../../ui/Form';

export default function TopLosses() {
  return (
    <Card className="p-0 overflow-hidden border-gray-200">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            Top Perdas do Dia
          </h3>
          <p className="text-xs text-gray-500 mt-1">Onde você está deixando dinheiro na mesa hoje</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-gray-50/30">
        {/* Coluna 1: Views sem pedido */}
        <div className="p-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
            <EyeOff size={14} /> Vistos s/ Pedido
          </h4>
          <ul className="space-y-3">
            <li className="flex justify-between items-center group cursor-pointer">
              <span className="text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors">Picanha Nobre</span>
              <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">42 views</span>
            </li>
            <li className="flex justify-between items-center group cursor-pointer">
              <span className="text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors">Vinho Malbec</span>
              <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">28 views</span>
            </li>
            <li className="flex justify-between items-center group cursor-pointer">
              <span className="text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors">Petit Gateau</span>
              <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">15 views</span>
            </li>
          </ul>
          <Button variant="ghost" size="sm" className="w-full mt-3 text-xs h-7 text-gray-400 hover:text-gray-900">Ver detalhes</Button>
        </div>

        {/* Coluna 2: Removidos do Carrinho */}
        <div className="p-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
            <ShoppingCart size={14} /> Abandono Carrinho
          </h4>
          <ul className="space-y-3">
            <li className="flex justify-between items-center group cursor-pointer">
              <span className="text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors">Combo Família</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">8x</span>
            </li>
            <li className="flex justify-between items-center group cursor-pointer">
              <span className="text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors">Suco Natural</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">5x</span>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Queda Coversão */}
        <div className="p-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
            <Ban size={14} /> Queda Conversão (24h)
          </h4>
          <ul className="space-y-3">
            <li className="flex justify-between items-center group cursor-pointer">
              <span className="text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors">Gin Tônica</span>
              <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">-15%</span>
            </li>
            <li className="flex justify-between items-center group cursor-pointer">
              <span className="text-sm text-gray-700 font-medium group-hover:text-red-600 transition-colors">Entrada Fria</span>
              <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">-8%</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
