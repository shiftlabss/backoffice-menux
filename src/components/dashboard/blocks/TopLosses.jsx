import React from 'react';
import { Card } from '../../ui/Card';
import { TrendingDown, EyeOff, ShoppingCart, Ban } from 'lucide-react';

import { Skeleton } from '../../ui/Skeleton';

export default function TopLosses({ isLoading = false }) {

  if (isLoading) {
    return (
      <Card className="p-0 overflow-hidden border-gray-200">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 space-y-4">
              <Skeleton className="h-3 w-24 mb-3" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden border-gray-200">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            Top Perdas do Dia
          </h3>
          <p className="text-xs font-normal text-gray-500 mt-1">Onde você está deixando dinheiro na mesa hoje</p>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-gray-100 bg-gray-50/30">
        {/* Coluna 1: Views sem pedido */}
        <div className="p-4">
          <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3 flex items-center gap-2">
            <EyeOff size={14} /> Vistos s/ Pedido
          </h4>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-semibold">Picanha Nobre</span>
              <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">42 views</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-semibold">Vinho Malbec</span>
              <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">28 views</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-semibold">Petit Gateau</span>
              <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">15 views</span>
            </li>
          </ul>
        </div>

        {/* Coluna 2: Removidos do Carrinho */}
        <div className="p-4">
          <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3 flex items-center gap-2">
            <ShoppingCart size={14} /> Abandono Carrinho
          </h4>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-semibold">Combo Família</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">8x</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-semibold">Suco Natural</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">5x</span>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Queda Coversão */}
        <div className="p-4">
          <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3 flex items-center gap-2">
            <Ban size={14} /> Queda Conversão (24h)
          </h4>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-semibold">Gin Tônica</span>
              <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">-15%</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm text-gray-700 font-semibold">Entrada Fria</span>
              <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">-8%</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

