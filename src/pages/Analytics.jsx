
import React from 'react';
import { Calendar } from 'lucide-react';
import ModuleLayout from '../components/layout/ModuleLayout';
import ExecutiveSummary from '../components/analytics/ExecutiveSummary';
import ConsumptionDynamics from '../components/analytics/ConsumptionDynamics';
import MenuPerformance from '../components/analytics/MenuPerformance';
import MaestroHighlights from '../components/analytics/MaestroHighlights';
import HighlightsPerformance from '../components/analytics/HighlightsPerformance';
import { Button } from '../components/ui/Form';

import { toast } from 'react-hot-toast';

export default function Analytics() {
    const [dateRange, setDateRange] = React.useState('Hoje');
    const [isDateDropdownOpen, setIsDateDropdownOpen] = React.useState(false);

    const handleDateRangeChange = (range) => {
        setDateRange(range);
        setIsDateDropdownOpen(false);
        toast.success(`Filtro atualizado: ${range}`, { icon: '📅' });
        // Here you would trigger a data refresh based on the range
    };

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
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex bg-gray-100/50 p-1 rounded-lg border border-gray-200/50">
                        {['Hoje', 'Ontem', '7 dias', '30 dias'].map((option) => (
                            <button
                                key={option}
                                onClick={() => handleDateRangeChange(option)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${dateRange === option
                                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            }
        >
            <div className="space-y-8 animate-fadeIn pb-12">
                {/* 1. Executive Summary */}
                <ExecutiveSummary dateRange={dateRange} />

                {/* 2 & 3. Middle Section: Dynamics & AI */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2">
                        <ConsumptionDynamics dateRange={dateRange} />
                    </div>
                    <div className="xl:col-span-1 space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-6 w-1 bg-[#8E4156] rounded-full"></div>
                            <h2 className="text-lg font-bold text-foreground">Insights IA</h2>
                        </div>
                        <MaestroHighlights onAction={handleIAAction} dateRange={dateRange} />
                    </div>
                </div>

                {/* 3.5 Highlights Performance */}
                <HighlightsPerformance dateRange={dateRange} />

                {/* 4. Menu Performance Table */}
                <MenuPerformance dateRange={dateRange} />
            </div>
        </ModuleLayout>
    );
}
