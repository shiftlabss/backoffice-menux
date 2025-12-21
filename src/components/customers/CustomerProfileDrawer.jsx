import React, { useState, useEffect } from 'react';
import {
  XMarkIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { generateCustomerHistory } from '../../services/mockCustomers';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CustomerProfileDrawer({ customer, onClose }) {
  const [activeTab, setActiveTab] = useState('resumo');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (customer) {
      // Load history on open
      setHistory(generateCustomerHistory(customer.id));
      setActiveTab('resumo');
    }
  }, [customer]);

  if (!customer) return null;

  const tabs = [
    { id: 'resumo', label: 'Resumo' },
    { id: 'historico', label: 'Histórico de Pedidos' },
    { id: 'preferencias', label: 'Preferências' },
    { id: 'previsoes', label: 'Previsões AI' },
  ];

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const formatDate = (dateStr) => format(new Date(dateStr), 'dd MMM yyyy, HH:mm', { locale: ptBR });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-2xl transform transition-transform bg-white shadow-2xl">

          {/* Header */}
          <div className="px-6 py-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xl font-bold text-gray-600">
                {customer.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">{customer.email}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {customer.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-600 font-medium">
                      {tag}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                    {customer.rfm.classification}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-200px)]">
            {activeTab === 'resumo' && (
              <div className="space-y-6">
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Gasto</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(customer.metrics.totalSpent)}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ticket Médio</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(customer.metrics.ticketAverage)}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Último Pedido</div>
                    <div className="text-lg font-bold text-gray-900">{customer.metrics.lastOrderDaysAgo} dias atrás</div>
                    <div className="text-xs text-gray-400">{formatDate(customer.metrics.lastOrderDate)}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">LTV Estimado</div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(customer.metrics.ltv)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><SparklesIcon className="w-5 h-5 text-amber-400" /> Score RFM</h4>
                    <div className="flex items-center gap-4 text-sm mt-3">
                      <div className="text-center bg-gray-50 p-2 rounded w-1/3">
                        <div className="text-xl font-bold text-gray-900">{customer.rfm.r}</div>
                        <div className="text-xs text-gray-500 uppercase">Recência</div>
                      </div>
                      <div className="text-center bg-gray-50 p-2 rounded w-1/3">
                        <div className="text-xl font-bold text-gray-900">{customer.rfm.f}</div>
                        <div className="text-xs text-gray-500 uppercase">Frequência</div>
                      </div>
                      <div className="text-center bg-gray-50 p-2 rounded w-1/3">
                        <div className="text-xl font-bold text-gray-900">{customer.rfm.m}</div>
                        <div className="text-xs text-gray-500 uppercase">Monetário</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'historico' && (
              <div className="space-y-4">
                {history.map(order => (
                  <div key={order.id} className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{order.id}</span>
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">{order.status}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        {formatDate(order.date)}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {order.items.join(', ')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{formatCurrency(order.value)}</div>
                      <div className="text-xs text-gray-500">{order.channel}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'preferencias' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <h4 className="font-semibold mb-4 text-gray-900">Itens Mais Pedidos</h4>
                  <ul className="space-y-3">
                    {customer.preferences.topItems.map((item, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{item}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${100 - (i * 20)}%` }}></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Canal Favorito</h4>
                    <div className="text-lg font-bold text-gray-900">{customer.preferences.channel}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Momento</h4>
                    <div className="text-lg font-bold text-gray-900">{customer.preferences.shift}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'previsoes' && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg">
                  <div className="flex items-start gap-4">
                    <SparklesIcon className="w-8 h-8 opacity-80" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">Próxima Melhor Ação</h4>
                      <p className="text-indigo-100 mb-4">{customer.predictions.nextBestAction}</p>
                      <button className="px-4 py-2 bg-white text-indigo-700 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
                        Executar Ação
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Probabilidade de Compra</h4>
                    <div className="text-3xl font-bold text-green-600">{customer.predictions.nextPurchaseProbability}%</div>
                    <p className="text-xs text-gray-500 mt-1">Alta probabilidade para os próximos 7 dias</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Risco de Churn</h4>
                    <div className={`text-3xl font-bold ${customer.risk.churnRisk === 'Alto' ? 'text-red-500' : 'text-green-600'}`}>{customer.risk.churnRisk}</div>
                    <p className="text-xs text-gray-500 mt-1">{customer.risk.churnProbability}% de chance de abandono</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
              Adicionar Nota
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 shadow-sm">
              Falar com Cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
