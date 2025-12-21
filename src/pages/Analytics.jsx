import React from 'react';
import { Calendar } from 'lucide-react';
import ModuleLayout from '../components/layout/ModuleLayout';
import ExecutiveSummary from '../components/analytics/ExecutiveSummary';
import ConsumptionDynamics from '../components/analytics/ConsumptionDynamics';
import MenuPerformance from '../components/analytics/MenuPerformance';
import MaestroHighlights from '../components/analytics/MaestroHighlights';
import HighlightsPerformance from '../components/analytics/HighlightsPerformance';
import Row1_FunnelMetrics from '../components/analytics/deep/Row1_FunnelMetrics';
import Row2_JourneyExplorer from '../components/analytics/deep/Row2_JourneyExplorer';
import Row3_SmartRanking from '../components/analytics/deep/Row3_SmartRanking';
import Row4_FinancialImpact from '../components/analytics/deep/Row4_FinancialImpact';
import Row5_Actionable from '../components/analytics/deep/Row5_Actionable';
import Row6_PeriodComparison from '../components/analytics/deep/Row6_PeriodComparison';
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
                {/* 1. Highlights Performance */}
                <HighlightsPerformance dateRange={dateRange} />

                {/* 2. Menu Performance Table */}
                {/* 2. Menu Performance Table */}
                <MenuPerformance dateRange={dateRange} />

                {/* 3. Deep Analytics - Row 1: Funnel & Metrics */}
                <Row1_FunnelMetrics />

                {/* 4. Deep Analytics - Row 2: Journey */}
                <Row2_JourneyExplorer />

                {/* 5. Deep Analytics - Row 3: Smart Ranking */}
                <Row3_SmartRanking />

                {/* 6. Deep Analytics - Row 4: Financial Impact */}
                <Row4_FinancialImpact />

                {/* 7. Deep Analytics - Row 5: Actionable */}
                <Row5_Actionable />

                {/* 8. Deep Analytics - Row 6: Comparison */}
                <Row6_PeriodComparison />
            </div>
        </ModuleLayout>
    );
}
