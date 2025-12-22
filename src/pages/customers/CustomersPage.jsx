import React, { useState, useEffect } from 'react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import ExecutiveKPIs from '../../components/customers/ExecutiveKPIs';
import AnalyticalDiagnosis from '../../components/customers/AnalyticalDiagnosis';
import SegmentsSection from '../../components/customers/SegmentsSection';
import CustomersTable from '../../components/customers/CustomersTable';
import CustomerProfileDrawer from '../../components/customers/CustomerProfileDrawer';
import { generateMockCustomers } from '../../services/mockCustomers';
import {
  UsersIcon,
  ChartBarIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

export default function CustomersPage() {
  // State
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState('30 dias');
  const [channelFilter, setChannelFilter] = useState('Todos');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('analytics');

  // Initial Data Load
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const data = generateMockCustomers();
      setCustomers(data);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = channelFilter === 'Todos' || c.preferences.channel === channelFilter;
    return matchesSearch && matchesChannel;
  });

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'list', label: 'Lista de Clientes', icon: ListBulletIcon },
  ];

  return (
    <ModuleLayout
      title="Clientes"
      subtitle="Raio-X, segmentação e fidelização"
      actions={
        <div className="flex bg-gray-100/50 p-1 rounded-lg border border-gray-200/50">
          {['7 dias', '30 dias', '90 dias', '12 meses'].map((label) => (
            <button
              key={label}
              onClick={() => setPeriodFilter(label)}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                periodFilter === label
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search & Toolbar */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          {/* Tabs (Secondary Nav) */}
          <div className="flex items-center p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-xl border border-gray-200/50 w-full md:w-fit overflow-x-auto no-scrollbar shadow-inner order-2 xl:order-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-out whitespace-nowrap outline-none focus:ring-2 focus:ring-purple-500/20 group",
                    isActive
                      ? "bg-white text-gray-900 shadow-sm shadow-gray-200 ring-1 ring-black/5"
                      : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors duration-300",
                      isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />
                  {tab.label}
                  {isActive && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-purple-500 ml-1.5 animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto order-1 xl:order-2">
            <div className="relative w-full md:w-64">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none btn-secondary flex items-center justify-center gap-2">
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span className="hidden md:inline">Exportar</span>
              </button>
              <button className="flex-1 md:flex-none btn-primary flex items-center justify-center gap-2">
                <PlusIcon className="w-4 h-4" />
                <span className="hidden md:inline">Novo Segmento</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[500px]">
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* 1. Executive KPIs */}
              <ExecutiveKPIs customers={customers} period={periodFilter} />

              {/* 2. Analytical Diagnosis */}
              <div className="space-y-6">
                <AnalyticalDiagnosis customers={customers} />
                {/* 3. Segments & Tags */}
                <SegmentsSection customers={customers} />
              </div>
            </div>
          )}

          {activeTab === 'list' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* 4. Main Table */}
              <CustomersTable
                customers={filteredCustomers}
                isLoading={isLoading}
                onSelectCustomer={setSelectedCustomer}
              />
            </div>
          )}
        </div>
      </div>

      {/* 5. Profile Drawer */}
      <CustomerProfileDrawer
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </ModuleLayout>
  );
}
