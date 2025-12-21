import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { formatCurrency } from '../../lib/utils';
import {
    TrendingUp,
    ShoppingBag,
    CreditCard,
    Target,
    Clock,
    Award
} from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';

// Micro chart data mock
// Micro chart data mock
const data = [
    { value: 400 },
    { value: 300 },
    { value: 550 },
    { value: 450 },
    { value: 650 },
    { value: 500 },
    { value: 700 },
];

const MOCK_DATA = {
    'Hoje': { revenue: 1240.50, ticket: 112.00, orders: 12, time: '2m 30s', trend: 0.5, prevRevenue: 'Ontem' },
    'Últimos 7 dias': { revenue: 12450.00, ticket: 145.90, orders: 86, time: '4m 12s', trend: 12, prevRevenue: 'Semana anterior' },
    'Últimos 15 dias': { revenue: 28900.00, ticket: 138.50, orders: 208, time: '4m 05s', trend: 8.2, prevRevenue: '15 dias anteriores' },
    'Últimos 30 dias': { revenue: 56200.00, ticket: 142.10, orders: 395, time: '3m 55s', trend: 15.5, prevRevenue: 'Mês anterior' },
};

const StatCard = ({ title, value, subtext, trend, icon: Icon, colorClass, chartColor }) => (
    <Card className="border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${colorClass}`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {trend > 0 ? '+' : ''}{trend}%
                        <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
                    </div>
                )}
            </div>

            <div className="space-y-1 relative z-10">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
            </div>
        </CardContent>
    </Card>
);

export default function ExecutiveSummary({ dateRange = 'Últimos 7 dias' }) {
    // Fallback if dateRange is somehow undefined or not in keys (though controlled by parent)
    const stats = MOCK_DATA[dateRange] || MOCK_DATA['Últimos 7 dias'];

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-wine-600 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-900">Resumo Executivo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Faturamento"
                    value={formatCurrency(stats.revenue)}
                    subtext={`vs ${stats.prevRevenue}`}
                    trend={stats.trend}
                    icon={CreditCard}
                    colorClass="bg-rose-600"
                    chartColor="#8E4156"
                />
                <StatCard
                    title="Ticket Médio"
                    value={formatCurrency(stats.ticket)}
                    subtext="vs Período anterior"
                    trend={stats.trend > 10 ? stats.trend - 2 : stats.trend + 1}
                    icon={Target}
                    colorClass="bg-primary"
                    chartColor="#171717"
                />
                <StatCard
                    title="Total Pedidos"
                    value={stats.orders}
                    subtext="Taxa de conversão: 4.2%"
                    trend={-2.4}
                    icon={ShoppingBag}
                    colorClass="bg-amber-500"
                    chartColor="#F59E0B"
                />
                <StatCard
                    title="Tempo de Decisão"
                    value={stats.time}
                    subtext="Média scan → pedido"
                    trend={5}
                    icon={Clock}
                    colorClass="bg-purple-600"
                    chartColor="#9333EA"
                />
            </div>


        </section>
    );
}
