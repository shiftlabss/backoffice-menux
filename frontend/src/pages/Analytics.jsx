
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
    const [dateRange, setDateRange] = React.useState('Últimos 7 dias');
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
                <div className="relative">
                    <button
                        onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-border shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{dateRange}</span>
                    </button>

                    {isDateDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsDateDropdownOpen(false)}></div>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-border p-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                                {['Hoje', 'Últimos 7 dias', 'Últimos 15 dias', 'Últimos 30 dias'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleDateRangeChange(option)}
                                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${dateRange === option
                                            ? 'bg-gray-100 text-foreground font-medium'
                                            : 'text-muted-foreground hover:bg-gray-50 hover:text-foreground'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
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
                        <MenuxIA onAction={handleIAAction} dateRange={dateRange} />
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
