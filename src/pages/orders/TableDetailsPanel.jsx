import React from 'react';
import { Clock, Info, Utensils } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function TableDetailsPanel({ table }) {
  if (!table) return null;
  const orders = table.orders || [];

  // Group items by category (Mock categorization based on names)
  const groupedItems = {
    drinks: [],
    starters: [],
    mains: [],
    desserts: []
  };

  orders.forEach(order => {
    order.items?.forEach(item => {
      const name = item.name.toLowerCase();
      const itemWithStatus = { ...item, orderStatus: order.status, orderTime: order.created_at };

      if (name.includes('coca') || name.includes('suco') || name.includes('água') || name.includes('vinho') || name.includes('cerveja') || name.includes('drink')) {
        groupedItems.drinks.push(itemWithStatus);
      } else if (name.includes('entrada') || name.includes('batata') || name.includes('salada')) {
        groupedItems.starters.push(itemWithStatus);
      } else if (name.includes('sobremesa') || name.includes('gâteau') || name.includes('pudim') || name.includes('café')) {
        groupedItems.desserts.push(itemWithStatus);
      } else {
        groupedItems.mains.push(itemWithStatus);
      }
    });
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'preparing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ready': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const statusTranslations = {
    pending: 'Pendente',
    preparing: 'Preparando',
    ready: 'Pronto',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  };

  const SubHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-3 mt-6 pb-2 border-b border-gray-100">
      <Icon size={14} className="text-gray-400" />
      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h4>
    </div>
  );

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-white rounded shadow-sm text-gray-500"><Utensils size={14} /></div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Detalhes Operacionais - {table.name}</h4>
        </div>
        <div className="text-sm font-bold text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
          Total: R$ {table.totalValue?.toFixed(2)}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna 1: KPIs e Timeline */}
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="text-[10px] text-gray-500 font-medium block mb-1 uppercase">Último Pedido</span>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-gray-400" />
                <span className="text-xs font-semibold text-gray-900">
                  {orders.length > 0 ? formatDistanceToNow(new Date(orders[0].created_at), { addSuffix: true, locale: ptBR }) : 'N/A'}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="text-[10px] text-gray-500 font-medium block mb-1 uppercase">Tickets</span>
              <div className="flex items-center gap-1.5">
                <Info size={12} className="text-gray-400" />
                <span className="text-xs font-semibold text-gray-900">{orders.length} pedidos</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <SubHeader icon={Clock} title="Timeline de Pedidos" />
            <div className="space-y-3 relative pl-4 border-l border-gray-200 ml-1">
              {orders.map((order) => (
                <div key={order.id} className="relative">
                  <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ${order.status === 'pending' ? 'bg-amber-400' : 'bg-green-400'}`} />
                  <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-gray-900">Pedido #{order.id}</span>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded border", getStatusColor(order.status))}>
                        {statusTranslations[order.status] || order.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {formatDistanceToNow(new Date(order.created_at), { addSuffix: true, locale: ptBR })}
                    </div>
                    <div className="text-xs text-gray-700 font-medium">
                      {order.items?.length || 0} itens • R$ {order.total_amount?.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-xs text-gray-400 italic">Nenhum pedido realizado.</p>
              )}
            </div>
          </div>
        </div>

        {/* Coluna 2: Itens Agrupados */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <SubHeader icon={Utensils} title="Itens na Mesa" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Helper for categories */}
              {Object.entries(groupedItems).map(([key, items]) => {
                if (items.length === 0) return null;
                const labels = { drinks: 'Bebidas', starters: 'Entradas', mains: 'Principais', desserts: 'Sobremesas' };

                return (
                  <div key={key} className="bg-gray-50/30 p-4 rounded-xl border border-gray-100">
                    <h5 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-100 pb-2">{labels[key]}</h5>
                    <div className="space-y-2">
                      {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">{item.quantity}x</span>
                            <span className="text-gray-700 font-medium">{item.name}</span>
                          </div>
                          <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium", getStatusColor(item.orderStatus))}>
                            {statusTranslations[item.orderStatus] || item.orderStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
              {orders.length === 0 && <p className="text-sm text-gray-500">Nenhum item encontrado.</p>}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
