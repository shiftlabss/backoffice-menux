import React from 'react';
import ModuleLayout from '../components/layout/ModuleLayout';
import { CheckCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 0. Context Components
import DashboardHeaderContext from '../components/dashboard/blocks/DashboardHeaderContext';
import DashboardNotifications from '../components/dashboard/blocks/DashboardNotifications';

// 1. Operation Components
import PriorityActions from '../components/dashboard/blocks/PriorityActions';
import ServiceStatus from '../components/dashboard/blocks/ServiceStatus';
import CriticalBottlenecks from '../components/dashboard/blocks/CriticalBottlenecks';
import DashboardDiningBlock from '../components/dashboard/blocks/DashboardDiningBlock';

// 2. Results Components
import DashboardKPIsBlock from '../components/dashboard/blocks/DashboardKPIsBlock';
import RevenueByShift from '../components/dashboard/blocks/RevenueByShift';

// 3. Maestro Components
import MaestroIntelligence from '../components/dashboard/blocks/MaestroIntelligence';
import MaestroSales from '../components/dashboard/blocks/MaestroSales';

// 4. Decision Components
import DashboardFunnelBlock from '../components/dashboard/blocks/DashboardFunnelBlock';
import DashboardRecommendationsBlock from '../components/dashboard/blocks/DashboardRecommendationsBlock';

// 5. Optimization Components
import UpsellCrossSellToday from '../components/dashboard/blocks/UpsellCrossSellToday';
import TopLosses from '../components/dashboard/blocks/TopLosses';
import DashboardProductsBlock from '../components/dashboard/blocks/DashboardProductsBlock';
import MenuHealth from '../components/dashboard/blocks/MenuHealth';
import OperationTime from '../components/dashboard/blocks/OperationTime';

export default function Dashboard() {
    const navigate = useNavigate();
    const [showAnalysis, setShowAnalysis] = React.useState(false);

    return (
        <ModuleLayout
            title="Dashboard"
            subtitle="Visão Geral do Negócio"
            actions={
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-border shadow-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Hoje, 17 Dez</span>
                </div>
            }
        >
            <div className="flex flex-col gap-4 lg:gap-6 animate-in fade-in pb-10">

                {/* --- LAYER 0: CONTEXT & HEADER (Order 3 - Shifted Down) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 order-4">
                    {/* Header Context Removed as per user request */}

                    <div className="lg:col-span-12 h-auto min-h-[128px]">
                        <DashboardNotifications />
                    </div>
                </div>

                {/* --- LAYER 1: OPERAÇÃO AGORA (Order 4 - Shifted Down) --- */}
                <div className="order-5">
                    <h2 className="text-lg font-bold text-foreground mb-4 pl-1">Operação Agora</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                        {/* Ações Prioritárias (Móvel: 1º) */}
                        <div className="lg:col-span-4 h-auto min-h-[350px] order-1 lg:order-1">
                            <PriorityActions />
                        </div>

                        {/* Status e Gargalos (Móvel: 2º) */}
                        <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6 h-full order-2 lg:order-2">
                            <div className="flex-1 min-h-[160px]">
                                <ServiceStatus />
                            </div>
                            <div className="flex-1 min-h-[160px]">
                                <CriticalBottlenecks />
                            </div>
                        </div>

                        {/* Mapa de Mesas (Móvel: 3º) */}
                        <div className="lg:col-span-12 xl:col-span-4 h-[400px] lg:h-full order-3 lg:order-3">
                            <DashboardDiningBlock />
                        </div>
                    </div>
                </div>

                {/* --- LAYER 3: MAESTRO INTELLIGENCE (Order 5 - Shifted Down) --- */}
                <div className="order-2">
                    <h2 className="text-lg font-bold text-foreground mb-4 pl-1 flex items-center gap-2">
                        Maestro AI <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">Beta</span>
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                        <div className="lg:col-span-8 h-auto min-h-[320px]">
                            <MaestroIntelligence />
                        </div>
                        <div className="lg:col-span-4 h-auto min-h-[320px]">
                            <MaestroSales />
                        </div>
                    </div>
                </div>

                {/* --- LAYER 2: RESULTADO DO DIA (Order 1 - Stays Top) --- */}
                <div className="order-1">
                    <h2 className="text-lg font-bold text-foreground mb-4 pl-1">Resultado do Dia</h2>
                    <div className="space-y-4 lg:space-y-6">
                        <DashboardKPIsBlock />
                        {/* RevenueByShift Removed as per user request */}
                    </div>
                </div>

                {/* --- MOVED BLOCK: PERFORMANCE DE PRODUTOS (Order 2 - New Position) --- */}
                <div className="order-3">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                        <div className="lg:col-span-12">
                            <DashboardProductsBlock />
                        </div>
                    </div>
                </div>

                {/* --- SEPARATOR FOR ANALYSIS --- */}
                <div className="order-6 my-4 lg:hidden">
                    <button
                        onClick={() => setShowAnalysis(!showAnalysis)}
                        className="w-full py-3 text-sm font-medium text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        {showAnalysis ? 'Ocultar Análises Detalhadas' : 'Ver Análise Completa de Conversão e Produtos'}
                    </button>
                </div>

                {/* --- LAYERS 4 & 5: CONVERSÃO, DECISÃO, PRODUTO (Order 7 - Collapsible on Mobile) --- */}
                <div className={`order-7 space-y-4 lg:space-y-6 ${showAnalysis ? 'block' : 'hidden lg:block'}`}>
                    {/* Layer 4 */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                        <div className="lg:col-span-6 h-auto min-h-[200px]">
                            <DashboardFunnelBlock />
                        </div>
                        <div className="lg:col-span-6 h-auto min-h-[200px]">
                            <DashboardRecommendationsBlock />
                        </div>
                    </div>

                    {/* Layer 5 */}
                    <div className="space-y-4 lg:space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                            <div className="lg:col-span-6">
                                <UpsellCrossSellToday />
                            </div>
                            <div className="lg:col-span-6">
                                <TopLosses />
                            </div>
                        </div>

                        {/* Products Block Removed from here */}

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                            <div className="lg:col-span-6">
                                <MenuHealth />
                            </div>
                            <div className="lg:col-span-6">
                                <OperationTime />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </ModuleLayout>
    );
}
