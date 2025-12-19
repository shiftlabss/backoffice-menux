import React, { useState } from 'react';
import ModuleLayout from '../components/layout/ModuleLayout';
import { Search, Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/Form";



// 1. Operation Components
import PriorityActions from '../components/dashboard/blocks/PriorityActions';
import ServiceStatus from '../components/dashboard/blocks/ServiceStatus';
import CriticalBottlenecks from '../components/dashboard/blocks/CriticalBottlenecks';
import DashboardDiningBlock from '../components/dashboard/blocks/DashboardDiningBlock';

// 2. Intelligence & Results
import MaestroSection from '../components/dashboard/blocks/MaestroSection';
import DashboardKPIsBlock from '../components/dashboard/blocks/DashboardKPIsBlock';

// 3. Performance & Analysis
import DashboardProductsBlock from '../components/dashboard/blocks/DashboardProductsBlock';

import UpsellCrossSellToday from '../components/dashboard/blocks/UpsellCrossSellToday';
import TopLosses from '../components/dashboard/blocks/TopLosses';
import MenuHealth from '../components/dashboard/blocks/MenuHealth';
import OperationTime from '../components/dashboard/blocks/OperationTime';

const PERIOD_CHIPS = ['Hoje', '7 dias', '30 dias', '3 meses'];

export default function Dashboard() {
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState('Hoje');
    const [showAnalysis, setShowAnalysis] = useState(false);

    // Global Actions (Chips + Search)
    const HeaderActions = (
        <div className="flex items-center gap-4">
            {/* Period Chips */}
            <div className="hidden md:flex bg-gray-100/50 p-1 rounded-lg border border-gray-200/50">
                {PERIOD_CHIPS.map((p) => (
                    <button
                        key={p}
                        onClick={() => setSelectedPeriod(p)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${selectedPeriod === p
                            ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Micro Search */}
            <div className="hidden lg:flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 w-48 transition-colors focus-within:border-gray-300">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar mesa, produto..."
                    className="bg-transparent border-none outline-none text-xs font-medium placeholder:text-gray-400 w-full"
                />
            </div>

            {/* Notifications Shortcut */}
            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-900 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </Button>
        </div>
    );

    return (
        <ModuleLayout
            title="Dashboard"
            subtitle="Visão Geral do Negócio"
            actions={HeaderActions}
            className="bg-[#FAFAFA]"
        >
            <div className="flex flex-col gap-6 animate-in fade-in pb-12 max-w-[1600px] mx-auto">



                {/* --- SEÇÃO 2: KPI & PRODUCTS showcase (Resultado do Dia) --- */}
                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">Resultado do Dia</h2>
                    <div className="space-y-6">
                        <DashboardKPIsBlock />

                        {/* Products Block (Bento Showcase) */}
                        <DashboardProductsBlock />
                    </div>
                </section>

                {/* --- SEÇÃO 3: MAESTRO & RESULTADOS (Intelligence Layer) --- */}
                <MaestroSection />

                {/* --- SEÇÃO 4: OPERAÇÃO AGORA (Critical Layout) --- */}
                <section>
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="text-lg font-bold text-gray-900">Operação Agora</h2>
                        <span className="h-[1px] flex-1 bg-gray-200 ml-4 max-w-[100px] hidden sm:block" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-start">
                        {/* 2.1 Ações Prioritárias (Hero List) - 4 cols */}
                        <div className="md:col-span-1 xl:col-span-4 h-full min-h-[380px]">
                            <PriorityActions />
                        </div>

                        {/* 2.2 Status & Gargalos - 4 cols */}
                        <div className="md:col-span-1 xl:col-span-4 flex flex-col gap-6 h-full min-h-[380px]">
                            <div className="flex-1">
                                <ServiceStatus />
                            </div>
                            <div className="flex-1">
                                <CriticalBottlenecks />
                            </div>
                        </div>

                        {/* 2.3 Mapa de Mesas - 4 cols */}
                        <div className="md:col-span-2 xl:col-span-4 h-full min-h-[380px]">
                            <DashboardDiningBlock />
                        </div>
                    </div>
                </section>

                {/* --- SEÇÃO 5: ANÁLISES & EXTENSÃO (Collapsible on Mobile) --- */}
                <div className="lg:hidden my-4">
                    <Button
                        variant="outline"
                        className="w-full justify-center bg-gray-50 border-dashed text-gray-500 hover:text-gray-900"
                        onClick={() => setShowAnalysis(!showAnalysis)}
                    >
                        {showAnalysis ? 'Ocultar Análises Detalhadas' : 'Ver Todas as Métricas'}
                    </Button>
                </div>

                <div className={`space-y-6 ${showAnalysis ? 'block' : 'hidden lg:block'}`}>


                    {/* Secondary Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <div className="md:col-span-2 xl:col-span-2">
                            <UpsellCrossSellToday />
                        </div>
                        <div className="md:col-span-1 xl:col-span-1 h-full">
                            <TopLosses />
                        </div>
                        <div className="md:col-span-1 xl:col-span-1">
                            <MenuHealth />
                        </div>
                        {/* OperationTime / Others can be fitted largely here */}
                        <div className="md:col-span-2 xl:col-span-4">
                            <OperationTime />
                        </div>
                    </div>
                </div>

            </div>
        </ModuleLayout>
    );
}
