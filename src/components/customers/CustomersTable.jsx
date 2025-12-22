import React, { useState, useMemo } from 'react';
import {
  EllipsisVerticalIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhoneIcon,
  IdentificationIcon,
  UserIcon,
  UserCircleIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../../lib/utils';

const ITEMS_PER_PAGE = 50;

export default function CustomersTable({ customers, isLoading, onSelectCustomer }) {
  const [sortConfig, setSortConfig] = useState({ key: 'metrics.totalSpent', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'registered', 'anonymous'

  // Calculate counts for tabs
  const counts = useMemo(() => {
    return {
      all: customers.length,
      registered: customers.filter(c => c.customer_type === 'registered').length,
      anonymous: customers.filter(c => c.customer_type === 'anonymous').length
    };
  }, [customers]);

  // Filter customers based on active tab
  const filteredCustomers = useMemo(() => {
    if (typeFilter === 'all') return customers;
    return customers.filter(c => c.customer_type === typeFilter);
  }, [customers, typeFilter]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-8 bg-gray-100 rounded mb-4 w-1/4"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-24 bg-gray-50 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const getValue = (obj, path) => path.split('.').reduce((o, i) => o[i], obj);
    const aValue = getValue(a, sortConfig.key);
    const bValue = getValue(b, sortConfig.key);

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const formatDate = (dateStr) => format(new Date(dateStr), 'dd MMM yyyy', { locale: ptBR });

  const getRFMColor = (score) => {
    if (score >= 4.5) return 'bg-purple-100 text-purple-700 border-purple-200';
    if (score >= 3.5) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 2.5) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-amber-100 text-amber-700 border-amber-200';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs de Tipo de Cliente */}
      <div className="flex items-center gap-1 border-b border-gray-200 w-full px-1">
        {[
          { id: 'all', label: 'Todos', count: counts.all },
          { id: 'registered', label: 'Cadastrados', count: counts.registered },
          { id: 'anonymous', label: 'Anônimos', count: counts.anonymous }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setTypeFilter(tab.id); setCurrentPage(1); }}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-all duration-200 outline-none flex items-center gap-2",
              typeFilter === tab.id
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg"
            )}
          >
            {tab.label}
            <span className={cn(
              "px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-colors",
              typeFilter === tab.id ? "bg-gray-100 text-gray-900" : "bg-gray-50 text-gray-400"
            )}>
              {tab.count}
            </span>
            {typeFilter === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-in fade-in zoom-in-95 duration-200" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        {/* Table Header Controls */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Base de Clientes</h3>
          <div className="flex items-center gap-2">
            <button className="text-xs font-medium text-gray-500 flex items-center gap-1 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-200/50 transition-colors">
              <FunnelIcon className="w-3.5 h-3.5" />
              Mais Filtros
            </button>
            <button className="text-xs font-medium text-gray-500 flex items-center gap-1 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-200/50 transition-colors">
              <ChevronDownIcon className="w-3.5 h-3.5" />
              Ordenar por: Maior Valor
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider bg-gray-50/30">
                <th className="px-6 py-4 font-semibold w-full min-w-[360px] max-w-[520px]">Cliente</th>
                <th className="px-6 py-4 font-semibold w-[120px]">RFM</th>
                <th className="px-6 py-4 font-semibold w-[140px]">Monetário</th>
                <th className="px-6 py-4 font-semibold w-[140px]">Recência</th>
                <th className="px-6 py-4 font-semibold w-[120px]">Frequência</th>
                <th className="px-6 py-4 font-semibold w-[160px]">Preferência</th>
                <th className="px-6 py-4 font-semibold w-[180px]">Próxima Ação</th>
                <th className="px-4 py-4 font-semibold w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedCustomers.map(customer => {
                const isRegistered = customer.customer_type === 'registered';
                return (
                  <tr
                    key={customer.id}
                    onClick={() => onSelectCustomer(customer)}
                    className="group hover:bg-gray-50/80 transition-all duration-150 cursor-pointer"
                  >
                    {/* Client Column (Dominant) */}
                    <td className="px-6 py-5 align-middle">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className={cn(
                          "w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold border transition-colors relative overflow-hidden",
                          isRegistered
                            ? "bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-700"
                            : "bg-gray-50 border-gray-200 border-dashed text-gray-400"
                        )}>
                          {isRegistered ? (
                            customer.name.substring(0, 2).toUpperCase()
                          ) : (
                            <UserCircleIcon className="w-6 h-6" />
                          )}
                        </div>

                        <div className="min-w-0 flex flex-col gap-1.5">
                          {/* Name */}
                          <div
                            className={cn(
                              "font-bold text-base line-clamp-2 leading-tight",
                              isRegistered ? "text-gray-900 group-hover:text-primary transition-colors" : "text-gray-500 italic"
                            )}
                            title={customer.name}
                          >
                            {customer.name}
                          </div>

                          {/* ID / Contact Microtext */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                            {isRegistered ? (
                              <>
                                <div className="flex items-center gap-1 group/item hover:text-gray-900 transition-colors" title="Copiar telefone">
                                  <PhoneIcon className="w-3 h-3 text-gray-400 group-hover/item:text-gray-600" />
                                  {customer.phone}
                                </div>
                                <span className="hidden sm:inline w-0.5 h-0.5 rounded-full bg-gray-300"></span>
                                <div className="flex items-center gap-1 group/item hover:text-gray-900 transition-colors" title={customer.email}>
                                  <span>{customer.email}</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center gap-1 font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded" title="Anonymous ID">
                                  <IdentificationIcon className="w-3 h-3" />
                                  {customer.anon_id}
                                </div>
                                {customer.origin && (
                                  <>
                                    <span className="hidden sm:inline w-0.5 h-0.5 rounded-full bg-gray-300"></span>
                                    <div className="flex items-center gap-1 text-gray-500">
                                      <QrCodeIcon className="w-3 h-3" />
                                      {customer.origin}
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </div>

                          {/* Mandatory Status Badge */}
                          <div className="flex flex-wrap items-center gap-2 mt-0.5">
                            <div className={cn(
                              "flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                              isRegistered
                                ? "bg-green-50 text-green-700 border-green-100"
                                : "bg-gray-100 text-gray-500 border-gray-200"
                            )} title={isRegistered ? "Cliente com cadastro completo" : "Visitante anônimo sem cadastro"}>
                              <UserIcon className="w-3 h-3" />
                              {isRegistered ? 'Cadastrado' : 'Anônimo'}
                            </div>

                            {/* Optional Tags */}
                            {customer.tags.filter(t => t !== 'Anônimo').slice(0, 2).map(tag => (
                              <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-50 text-gray-500 border border-gray-100">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* RFM Status */}
                    <td className="px-6 py-5 align-middle">
                      <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wide ${getRFMColor(customer.rfm.score)}`}>
                        {customer.rfm.classification}
                      </span>
                    </td>

                    {/* Monetary */}
                    <td className="px-6 py-5 align-middle">
                      <div className="font-bold text-gray-900 text-sm">{formatCurrency(customer.metrics.totalSpent)}</div>
                      <div className="text-[11px] text-gray-400 uppercase tracking-wide mt-0.5">LTV Est.</div>
                    </td>

                    {/* Recency */}
                    <td className="px-6 py-5 align-middle">
                      <div className="text-gray-900 font-medium text-sm">{formatDate(customer.metrics.lastOrderDate)}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{customer.metrics.lastOrderDaysAgo} dias atrás</div>
                    </td>

                    {/* Frequency */}
                    <td className="px-6 py-5 align-middle">
                      <div className="text-gray-900 font-medium text-sm">{customer.metrics.totalOrders} pedidos</div>
                      <div className="text-xs text-gray-400 mt-0.5">~{customer.metrics.frequencyDays} dias</div>
                    </td>

                    {/* Preference */}
                    <td className="px-6 py-5 align-middle">
                      <div className="text-gray-900 font-medium text-sm truncate max-w-[140px]" title={customer.preferences.topCategory}>
                        {customer.preferences.topCategory}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium border border-gray-200">
                          {customer.preferences.channel}
                        </span>
                      </div>
                    </td>

                    {/* Next Action */}
                    <td className="px-6 py-5 align-middle">
                      <div
                        className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold bg-primary/5 pl-2 pr-3 py-1.5 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors w-fit max-w-full"
                        title={customer.predictions.nextBestAction}
                      >
                        <ChatBubbleLeftRightIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{customer.predictions.nextBestAction}</span>
                      </div>
                    </td>

                    {/* Row Actions */}
                    <td className="px-4 py-5 align-middle text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <span className="text-xs text-gray-500">
            Mostrando <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> a <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, sortedCustomers.length)}</span> de <span className="font-medium">{sortedCustomers.length}</span> resultados
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${currentPage === page
                  ? 'bg-primary text-white shadow-sm border border-primary'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
