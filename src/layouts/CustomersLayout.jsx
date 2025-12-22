import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ModuleLayout from '../components/layout/ModuleLayout';
import { generateMockCustomers } from '../services/mockCustomers';
import {
  ChartBarIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

const TABS = [
  { id: 'list', path: '/customers/list', label: 'Lista de Clientes', icon: ListBulletIcon },
  { id: 'analytics', path: '/customers/analytics', label: 'Analytics', icon: ChartBarIcon },
];

export default function CustomersLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // State
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState('30 dias');

  // Initial Data Load
  useEffect(() => {
    setTimeout(() => {
      const data = generateMockCustomers();
      setCustomers(data);
      setIsLoading(false);
    }, 800);
  }, []);

  // Determine active tab from URL
  const activeTab = TABS.find(tab => location.pathname.startsWith(tab.path))?.id || 'analytics';

  return (
    <ModuleLayout
      title="Clientes"
      subtitle="Raio-X, segmentação e fidelização"
    >
      <div className="space-y-6">
        {/* Search & Toolbar */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          {/* Tabs (Secondary Nav) */}
          <div className="flex items-center p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-xl border border-gray-200/50 w-full md:w-fit overflow-x-auto no-scrollbar shadow-inner order-2 xl:order-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
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
          </div>
        </div>

        {/* Nested Route Content */}
        <div className="min-h-[500px]">
          <Outlet context={{ customers, isLoading, searchQuery, periodFilter }} />
        </div>
      </div>
    </ModuleLayout>
  );
}
