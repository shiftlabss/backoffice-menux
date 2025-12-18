import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { cn } from '../../../lib/utils';
import {
    Clock,
    TrendingUp,
    TrendingDown,
    ArrowRight,
    Sparkles,
    MoreHorizontal,
    DollarSign,
    Users,
    Receipt
} from 'lucide-react';

const FUNNEL_STEPS = [
    {
        id: 'active_tables',
        label: 'Mesa Ativa',
        count: 124,
        conversion: '95%',
        avgTime: '0m',
        trend: '+12%',
        trendUp: true,
        color: 'text-blue-600',
        bg: 'bg-blue-50'
    },
    {
        id: 'menu_view',
        label: 'Cardápio',
        count: 118,
        conversion: '72%',
        avgTime: '1m',
        trend: '+5%',
        trendUp: true,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50'
    },
    {
        id: 'item_added',
        label: 'Item Add',
        count: 86,
        conversion: '48%', // Critical
        avgTime: '3m',
        trend: '-8%',
        trendUp: false,
        color: 'text-violet-600',
        bg: 'bg-violet-50',
        isCritical: true
    },
    {
        id: 'waiter_call',
        label: 'Garçom',
        count: 42,
        conversion: '90%',
        avgTime: '2m',
        trend: '+2%',
        trendUp: true,
        color: 'text-fuchsia-600',
        bg: 'bg-fuchsia-50'
    },
    {
        id: 'order_valid',
        label: 'Pedido',
        count: 38,
        conversion: '-',
        avgTime: '45s',
        trend: '+1%',
        trendUp: true,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50'
    }
];

const METRICS = [
    { label: 'Mesas', value: '124', icon: Users },
    { label: 'Pedidos', value: '38', icon: Receipt },
    { label: 'Receita', value: 'R$ 4.712', icon: DollarSign },
    { label: 'Ticket', value: 'R$ 124', icon: TrendingUp },
];

export default function DashboardFunnelBlock() {
    const [period, setPeriod] = useState('Hoje');

    return (
        <Card className="h-full flex flex-col bg-white border-none shadow-sm ring-1 ring-gray-100 relative overflow-hidden">

            {/* Top Bar: Minimalist & Fluid */}
            <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg tracking-tight">Conversão</h3>
                    <p className="text-sm text-gray-400 font-medium">Visão em tempo real</p>
                </div>

                {/* Metrics Pill */}
                <div className="flex items-center gap-6 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                    {METRICS.map((m, i) => (
                        <div key={i} className="flex flex-col items-start min-w-[max-content]">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                                <m.icon className="w-3 h-3" />
                                {m.label}
                            </span>
                            <span className="text-lg font-bold text-gray-900 tracking-tight">{m.value}</span>
                        </div>
                    ))}
                </div>

                {/* Period Selector (Subtle) */}
                <div className="hidden md:flex bg-gray-50 rounded-full p-1 ring-1 ring-gray-100">
                    {['Hoje', 'Ontem', 'Mês'].map(p => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={cn(
                                "text-[10px] font-bold px-3 py-1 rounded-full transition-all",
                                period === p
                                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                                    : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Fluid Funnel Area */}
            <div className="flex-1 px-6 pb-2 md:pb-0 flex flex-col justify-center relative">

                {/* Connecting Line Background */}
                <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-gray-50 -translate-y-1/2 hidden md:block" />

                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-6 md:pb-0 scrollbar-none relative z-10">
                    {FUNNEL_STEPS.map((step, index) => (
                        <div key={step.id} className="flex items-center min-w-[140px] md:min-w-0 flex-1 group">

                            {/* Funnel Card */}
                            <div className={cn(
                                "w-full bg-white rounded-2xl p-4 transition-all duration-300 relative",
                                "border border-transparent hover:border-gray-100 hover:shadow-lg hover:-translate-y-1",
                                step.isCritical && "ring-1 ring-red-100 bg-red-50/10"
                            )}>
                                <div className="flex justify-between items-start mb-3">
                                    <span className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                                        step.bg, step.color
                                    )}>
                                        {index + 1}
                                    </span>
                                    <span className={cn(
                                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                                        step.trendUp ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
                                    )}>
                                        {step.trend}
                                    </span>
                                </div>

                                <div className="space-y-0.5">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{step.label}</h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-gray-900 tracking-tight">{step.count}</span>
                                    </div>
                                </div>

                                {/* Hover details */}
                                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-500">
                                        <Clock className="w-3 h-3" />
                                        {step.avgTime}
                                    </div>
                                    <div className="text-[10px] font-bold text-gray-900">
                                        {step.conversion}
                                    </div>
                                </div>
                            </div>

                            {/* Connector */}
                            {index < FUNNEL_STEPS.length - 1 && (
                                <div className="px-2 text-gray-200 hidden md:block">
                                    <ArrowRight className="w-4 h-4 opacity-50" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Integrated Maestro Insight (Floating Pill) */}
            <div className="px-6 pb-6 mt-2">
                <div className="bg-white border border-indigo-100 rounded-xl p-1.5 pr-4 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-all cursor-pointer group hover:border-indigo-200">
                    <div className="bg-indigo-50 rounded-lg p-2.5 group-hover:bg-indigo-100 transition-colors">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-8 py-2 md:py-0 w-full">
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-900 flex items-center gap-2">
                                Gargalo detectado: <span className="font-bold">Item Adicionado</span>
                                <span className="bg-red-50 text-red-600 text-[9px] px-2 py-0.5 rounded-full font-bold border border-red-100">-R$ 850</span>
                            </span>
                            <span className="text-sm text-gray-500 mt-0.5">
                                Sugestão: <span className="text-gray-700 font-medium border-b border-gray-200 border-dashed">Simplificar personalização de combos</span>
                            </span>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-100 hidden md:block">
                                +R$ 620 est.
                            </span>
                            <div className="w-px h-8 bg-gray-100 hidden md:block"></div>
                            <button className="text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors w-full md:w-auto text-center shadow-sm shadow-indigo-100">
                                Aplicar Correção
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Card>
    );
}
