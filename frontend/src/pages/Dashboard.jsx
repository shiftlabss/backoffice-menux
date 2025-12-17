import React, { useState } from 'react';
import ModuleLayout from '../components/layout/ModuleLayout';
import { Search, Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/Form";

// 0. Overview Components
import DashboardHeaderContext from '../components/dashboard/blocks/DashboardHeaderContext';

// 1. Operation Components
import PriorityActions from '../components/dashboard/blocks/PriorityActions';
import ServiceStatus from '../components/dashboard/blocks/ServiceStatus';
import CriticalBottlenecks from '../components/dashboard/blocks/CriticalBottlenecks';
import DashboardDiningBlock from '../components/dashboard/blocks/DashboardDiningBlock';

// 2. Intelligence & Results
import MaestroIntelligence from '../components/dashboard/blocks/MaestroIntelligence';
import MaestroSales from '../components/dashboard/blocks/MaestroSales';
import DashboardKPIsBlock from '../components/dashboard/blocks/DashboardKPIsBlock';

// 3. Performance & Analysis
import DashboardProductsBlock from '../components/dashboard/blocks/DashboardProductsBlock';
import DashboardFunnelBlock from '../components/dashboard/blocks/DashboardFunnelBlock';
import DashboardRecommendationsBlock from '../components/dashboard/blocks/DashboardRecommendationsBlock';
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

                {/* --- SEÇÃO 1: VISÃO GERAL (Contexto) --- */}
                <section>
                    <DashboardHeaderContext />
                </section>

                {/* --- SEÇÃO 2: OPERAÇÃO AGORA (Critical Layout) --- */}
                <section>
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="text-lg font-bold text-gray-900">Operação Agora</h2>
                        <span className="h-[1px] flex-1 bg-gray-200 ml-4 max-w-[100px] hidden sm:block" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* 2.1 Ações Prioritárias (Hero List) - 4 cols */}
                        <div className="lg:col-span-4 h-full min-h-[380px]">
                            <PriorityActions />
                        </div>

                        {/* 2.2 Status & Gargalos - 4 cols */}
                        <div className="lg:col-span-4 flex flex-col gap-6 h-full min-h-[380px]">
                            <div className="flex-1">
                                <ServiceStatus />
                            </div>
                            <div className="flex-1">
                                <CriticalBottlenecks />
                            </div>
                        </div>

                        {/* 2.3 Mapa de Mesas - 4 cols */}
                        <div className="lg:col-span-4 h-full min-h-[380px]">
                            <DashboardDiningBlock />
                        </div>
                    </div>
                </section>

                {/* --- SEÇÃO 3: MAESTRO & RESULTADOS (Intelligence Layer) --- */}
                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        {/* Maestro AI - 8 cols */}
                        <div className="lg:col-span-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 px-1 flex items-center gap-2">
                                Maestro AI
                                <span className="text-[10px] uppercase font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">Beta</span>
                            </h2>
                            <div className="h-[340px]">
                                <MaestroIntelligence />
                            </div>
                        </div>

                        {/* Impacto Real - 4 cols */}
                        <div className="lg:col-span-4 flex flex-col justify-end">
                            <div className="h-[340px]">
                                <MaestroSales />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- SEÇÃO 4: KPI & PRODUCTS showcase --- */}
                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">Resultado do Dia</h2>
                    <div className="space-y-6">
                        <DashboardKPIsBlock />

                        {/* Products Block (Bento Showcase) */}
                        <DashboardProductsBlock />
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
                    {/* Funnel & Recs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-[280px]">
                            <DashboardFunnelBlock />
                        </div>
                        <div className="h-[280px]">
                            <DashboardRecommendationsBlock />
                        </div>
                    </div>

                    {/* Secondary Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-2">
                            <UpsellCrossSellToday />
                        </div>
                        <TopLosses />
                        <div className="md:col-span-2 lg:col-span-1">
                            <MenuHealth />
                        </div>
                        {/* OperationTime / Others can be fitted largely here */}
                        <div className="md:col-span-2 lg:col-span-4">
                            <OperationTime />
                        </div>
                    </div>
                </div>

            </div>
        </ModuleLayout>
    );
}
