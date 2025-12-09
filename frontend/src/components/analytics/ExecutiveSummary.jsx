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
const data = [
    { value: 400 },
    { value: 300 },
    { value: 550 },
    { value: 450 },
    { value: 650 },
    { value: 500 },
    { value: 700 },
];

const StatCard = ({ title, value, subtext, trend, icon: Icon, colorClass, chartColor }) => (
    <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorClass}`}>
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

            {/* Micro Chart Background */}
            <div className="absolute bottom-0 right-0 w-24 h-16 opacity-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <Area type="monotone" dataKey="value" stroke={chartColor} fill={chartColor} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);

export default function ExecutiveSummary() {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-wine-600 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-900">Resumo Executivo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Faturamento"
                    value={formatCurrency(12450.00)}
                    subtext="Últimos 7 dias"
                    trend={12}
                    icon={CreditCard}
                    colorClass="bg-wine-600"
                    chartColor="#8E4156"
                />
                <StatCard
                    title="Ticket Médio"
                    value={formatCurrency(145.90)}
                    subtext="vs R$ 132.00 na semana anterior"
                    trend={8.5}
                    icon={Target}
                    colorClass="bg-blue-600"
                    chartColor="#2563EB"
                />
                <StatCard
                    title="Total Pedidos"
                    value="86"
                    subtext="Taxa de conversão: 4.2%"
                    trend={-2.4}
                    icon={ShoppingBag}
                    colorClass="bg-amber-500"
                    chartColor="#F59E0B"
                />
                <StatCard
                    title="Tempo de Decisão"
                    value="4m 12s"
                    subtext="Média scan → pedido"
                    trend={5}
                    icon={Clock}
                    colorClass="bg-purple-600"
                    chartColor="#9333EA"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold mb-2">
                            <Award className="w-4 h-4" />
                            Item Estrela
                        </div>
                        <div className="text-xl font-bold mb-1">Bife Ancho Premium</div>
                        <div className="text-sm opacity-80">R$ 4.250,00 em vendas</div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <div className="text-xs text-gray-500 uppercase font-bold mb-2">Melhor Horário</div>
                    <div className="flex items-end gap-2">
                        <div className="text-2xl font-bold text-gray-900">20h - 21h</div>
                        <div className="text-sm text-green-600 font-medium mb-1">Sexta-feira</div>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-green-500 w-[85%] h-full rounded-full"></div>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <div className="text-xs text-gray-500 uppercase font-bold mb-2">Gargalo Identificado</div>
                    <div className="text-lg font-bold text-gray-900">Checkout (Pagamento)</div>
                    <p className="text-xs text-red-500 mt-1 font-medium">15% de abandono nesta etapa</p>
                </div>
            </div>
        </section>
    );
}
