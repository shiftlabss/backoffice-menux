
import React from 'react';
import { Calendar } from 'lucide-react';
import ModuleLayout from '../components/layout/ModuleLayout';
import ExecutiveSummary from '../components/analytics/ExecutiveSummary';
import ConsumptionDynamics from '../components/analytics/ConsumptionDynamics';
import MenuPerformance from '../components/analytics/MenuPerformance';
import MenuxIA from '../components/analytics/MenuxIA';
import HighlightsPerformance from '../components/analytics/HighlightsPerformance';
import { Button } from '../components/ui/Form';

import { toast } from 'react-hot-toast';

export default function Analytics() {
    const handleIAAction = (action) => {
        switch (action) {
            case 'apply_price_adjustment':
                // In a real app, this would verify first or make an API call
                toast.success("Ajuste de preço aplicado com sucesso!", { icon: '💰' });
                break;
            case 'view_item_details':
                toast("Abrindo detalhes do item...", { icon: '🔍' });
                // Future: navigate to item details
                break;
            case 'resolve_missing_photos':
                toast("Redirecionando para upload de fotos...", { icon: '📸' });
                break;
            default:
                console.log("IA Action:", action);
        }
    };

    return (
        <ModuleLayout
            title="Analytics"
            subtitle="Visão estratégica do seu negócio em tempo real."
            actions={
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-border shadow-sm cursor-pointer hover:bg-background transition-colors">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Últimos 7 dias</span>
                </div>
            }
        >
            <div className="space-y-8 animate-fadeIn pb-12">
                {/* 1. Executive Summary */}
                <ExecutiveSummary />

                {/* 2 & 3. Middle Section: Dynamics & AI */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2">
                        <ConsumptionDynamics />
                    </div>
                    <div className="xl:col-span-1 space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-6 w-1 bg-[#8E4156] rounded-full"></div>
                            <h2 className="text-lg font-bold text-foreground">Insights IA</h2>
                        </div>
                        <MenuxIA onAction={handleIAAction} />
                    </div>
                </div>

                {/* 3.5 Highlights Performance */}
                <HighlightsPerformance />

                {/* 4. Menu Performance Table */}
                <MenuPerformance />
            </div>
        </ModuleLayout>
    );
}
