import React from 'react';
import { Clock, Eye, ShoppingBag } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function OrdersKanban({ orders, onViewOrder }) {
  const columns = [
    { id: 'pending', label: 'Pendente', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'preparing', label: 'Em Preparo', color: 'bg-gray-50 text-gray-900 border-gray-200' },
    { id: 'ready', label: 'Pronto', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];

  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)] overflow-hidden">
      {columns.map((column) => (
        <div key={column.id} className="flex flex-col h-full rounded-2xl bg-gray-50/50 border border-gray-100">
          {/* Column Header */}
          <div className={`p-4 border-b ${column.color} bg-opacity-4 rounded-t-2xl flex items-center justify-between`}>
            <div className={`flex items-center gap-2 font-semibold ${column.color.split(' ')[1]}`}>
              <div className={`w-2 h-2 rounded-full ${column.color.split(' ')[1].replace('text', 'bg')}`} />
              {column.label}
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-white/50 rounded-full text-gray-600">
              {getOrdersByStatus(column.id).length}
            </span>
          </div>

          {/* Cards Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {getOrdersByStatus(column.id).map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                      <ShoppingBag size={16} />
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900">{order.id}</span>
                      <span className="text-xs text-gray-500">{order.table}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 gap-1 bg-gray-50 px-2 py-1 rounded-md">
                    <Clock size={12} />
                    {order.time}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="text-gray-600">
                    {order.items} itens
                  </div>
                  <div className="font-semibold text-gray-900">
                    {order.total}
                  </div>
                </div>

                {/* Hover Action */}
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="text-xs font-medium text-primary flex items-center gap-1 hover:underline"
                  >
                    Ver detalhes <Eye size={12} />
                  </button>
                </div>
              </div>
            ))}

            {getOrdersByStatus(column.id).length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                <ShoppingBag size={24} className="mb-2 opacity-20" />
                Sem pedidos
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
