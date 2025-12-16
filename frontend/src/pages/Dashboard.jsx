
import React from 'react';
import ModuleLayout from '../components/layout/ModuleLayout';
import { CheckCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// New Block Components
import DashboardAIBlock from '../components/dashboard/blocks/DashboardAIBlock';
import DashboardKPIsBlock from '../components/dashboard/blocks/DashboardKPIsBlock';
import DashboardFunnelBlock from '../components/dashboard/blocks/DashboardFunnelBlock';
import DashboardProductsBlock from '../components/dashboard/blocks/DashboardProductsBlock';
import DashboardDiningBlock from '../components/dashboard/blocks/DashboardDiningBlock';
import DashboardForecastBlock from '../components/dashboard/blocks/DashboardForecastBlock';

// Newly Created Blocks
import PriorityActions from '../components/dashboard/blocks/PriorityActions';
import RevenueByShift from '../components/dashboard/blocks/RevenueByShift';
import TopLosses from '../components/dashboard/blocks/TopLosses';
import MenuHealth from '../components/dashboard/blocks/MenuHealth';
import UpsellCrossSellToday from '../components/dashboard/blocks/UpsellCrossSellToday';
import OperationTime from '../components/dashboard/blocks/OperationTime';

// Legacy/Existing Imports
import AdvancedOperations from '../components/dashboard/AdvancedOperations';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <ModuleLayout
            title="Dashboard"
            subtitle="Visão Geral do Negócio"
            actions={
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-border shadow-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Hoje, 08 Dez</span>
                </div>
            }
        >
            <div className="space-y-6 animate-in fade-in pb-10">

                {/* 1. KPIs do Dia - Full Width */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <DashboardKPIsBlock />
                </section>

                {/* 2. Ações Prioritárias (Novo) */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
                    <PriorityActions />
                </section>

                {/* 3. Maestro AI - Full Width */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                    <DashboardAIBlock />
                </section>

                {/* 4. Financial & Funnel Row */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                    {/* Col 1: Receita por Turno (Novo) */}
                    <div className="xl:col-span-1">
                        <RevenueByShift />
                    </div>
                    {/* Col 2: Funil de Vendas (Existente) */}
                    <div className="xl:col-span-1">
                        <DashboardFunnelBlock />
                    </div>
                    {/* Col 3: Upsell Hoje (Novo) */}
                    <div className="xl:col-span-1">
                        <UpsellCrossSellToday />
                    </div>
                </section>

                {/* 5. Top Perdas (Novo) */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                    <TopLosses />
                </section>

                {/* 6. Products & Menu Health Row */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                    {/* Saúde do Cardápio (Novo) */}
                    <div className="xl:col-span-1">
                        <MenuHealth />
                    </div>
                    {/* Products Perf (Existente) */}
                    <div className="xl:col-span-2">
                        <DashboardProductsBlock />
                    </div>
                </section>

                {/* 7. Bottom Section: Operational & Timing */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
                    {/* Dining/Table Map (Existente) */}
                    <div className="xl:col-span-2 h-full">
                        <DashboardDiningBlock />
                    </div>
                    {/* Timing de Mesas (Novo) */}
                    <div className="xl:col-span-1 h-full">
                        <OperationTime />
                    </div>
                </section>

                {/* 8. Advanced Ops Summary */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700">
                    <AdvancedOperations />
                </section>

            </div>
        </ModuleLayout>
    );
}
