
import React from 'react';
import ModuleLayout from '../components/layout/ModuleLayout';
import { CheckCircle, Calendar } from 'lucide-react';

// New Block Components
import DashboardAIBlock from '../components/dashboard/blocks/DashboardAIBlock';
import DashboardKPIsBlock from '../components/dashboard/blocks/DashboardKPIsBlock';
import DashboardFunnelBlock from '../components/dashboard/blocks/DashboardFunnelBlock';
import DashboardProductsBlock from '../components/dashboard/blocks/DashboardProductsBlock';
import DashboardDiningBlock from '../components/dashboard/blocks/DashboardDiningBlock';
import DashboardForecastBlock from '../components/dashboard/blocks/DashboardForecastBlock';

export default function Dashboard() {

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

                {/* 1. KPIs do Dia - Full Width Grid */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <DashboardKPIsBlock />
                </section>

                {/* 2. Maestro - Full Width */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                    <DashboardAIBlock />
                </section>

                {/* Middle Section: Funnel & Products */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                    {/* Funnel - Takes 1 column on large screens */}
                    <div className="xl:col-span-1">
                        <DashboardFunnelBlock />
                    </div>

                    {/* Products - Takes 2 columns on large screens */}
                    <div className="xl:col-span-2">
                        <DashboardProductsBlock />
                    </div>
                </section>

                {/* Bottom Section: Dining & Forecast */}
                <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                    {/* Dining Operations */}
                    <div className="h-full">
                        <DashboardDiningBlock />
                    </div>

                    {/* Forecast Charts */}
                    <div className="h-full">
                        <DashboardForecastBlock />
                    </div>
                </section>
            </div>
        </ModuleLayout>
    );
}
