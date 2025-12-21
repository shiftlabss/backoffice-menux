import React, { useState } from 'react';
import {
  EllipsisVerticalIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CustomersTable({ customers, isLoading, onSelectCustomer }) {
  const [sortConfig, setSortConfig] = useState({ key: 'metrics.totalSpent', direction: 'desc' });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-8 bg-gray-100 rounded mb-4 w-1/4"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-50 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  const sortedCustomers = [...customers].sort((a, b) => {
    const getValue = (obj, path) => path.split('.').reduce((o, i) => o[i], obj);
    const aValue = getValue(a, sortConfig.key);
    const bValue = getValue(b, sortConfig.key);

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const formatDate = (dateStr) => format(new Date(dateStr), 'dd MMM yyyy', { locale: ptBR });

  const getRFMColor = (score) => {
    if (score >= 4.5) return 'bg-purple-100 text-purple-700 border-purple-200'; // Champion
    if (score >= 3.5) return 'bg-green-100 text-green-700 border-green-200'; // Loyal
    if (score >= 2.5) return 'bg-blue-100 text-blue-700 border-blue-200'; // Promising
    return 'bg-amber-100 text-amber-700 border-amber-200'; // At Risk/New
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="font-bold text-gray-900">Base de Clientes ({customers.length})</h3>
        <div className="flex items-center gap-2">
          <button className="text-xs font-medium text-gray-500 flex items-center gap-1 hover:text-gray-900">
            <FunnelIcon className="w-3 h-3" />
            Mais Filtros
          </button>
          <button className="text-xs font-medium text-gray-500 flex items-center gap-1 hover:text-gray-900">
            <ChevronDownIcon className="w-3 h-3" />
            Ordenar por: Maior Valor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider bg-gray-50/30">
              <th className="p-4 font-semibold">Cliente</th>
              <th className="p-4 font-semibold">Status / RFM</th>
              <th className="p-4 font-semibold">Monetário (LTV)</th>
              <th className="p-4 font-semibold">Recência</th>
              <th className="p-4 font-semibold">Frequência</th>
              <th className="p-4 font-semibold">Preferência</th>
              <th className="p-4 font-semibold">Próxima Ação</th>
              <th className="p-4 font-semibold w-10"></th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50">
            {sortedCustomers.map(customer => (
              <tr
                key={customer.id}
                onClick={() => onSelectCustomer(customer)}
                className="group hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                      {customer.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">{customer.name}</div>
                      <div className="text-xs text-gray-400">{customer.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded border text-[10px] font-semibold uppercase ${getRFMColor(customer.rfm.score)}`}>
                    {customer.rfm.classification}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{formatCurrency(customer.metrics.totalSpent)}</div>
                  <div className="text-xs text-gray-400">Ticket: {formatCurrency(customer.metrics.ticketAverage)}</div>
                </td>
                <td className="p-4">
                  <div className="text-gray-700">{formatDate(customer.metrics.lastOrderDate)}</div>
                  <div className="text-xs text-gray-400">{customer.metrics.lastOrderDaysAgo} dias atrás</div>
                </td>
                <td className="p-4">
                  <div className="text-gray-700">{customer.metrics.totalOrders} pedidos</div>
                  <div className="text-xs text-gray-400">A cada {customer.metrics.frequencyDays} dias</div>
                </td>
                <td className="p-4">
                  <div className="text-gray-700 truncate max-w-[120px]">{customer.preferences.topCategory}</div>
                  <div className="text-xs text-gray-400">{customer.preferences.channel}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-primary text-xs font-medium bg-primary/5 px-2 py-1 rounded border border-primary/10 max-w-fit">
                    <ChatBubbleLeftRightIcon className="w-3 h-3" />
                    {customer.predictions.nextBestAction}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100 flex justify-center">
        <button className="text-xs text-gray-500 hover:text-primary font-medium">Carregar mais clientes...</button>
      </div>
    </div>
  );
}
