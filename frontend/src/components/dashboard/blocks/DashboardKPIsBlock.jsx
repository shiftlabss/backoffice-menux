import React from 'react';
import { Card } from '../../ui/Card';
import { DollarSign, ShoppingBag, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, Sparkles, Activity } from 'lucide-react';

export default function DashboardKPIsBlock() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-stretch">

            {/* CARD 1: RECEITA DO DIA (HERO) - MOVED TO FIRST */}
            <Card className="relative overflow-hidden border border-emerald-100 shadow-sm group lg:col-span-1 bg-emerald-50/50">
                <div className="relative p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white rounded-lg border border-emerald-100 shadow-sm">
                            <DollarSign className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-white px-2 py-1 rounded-full border border-emerald-100 shadow-sm">
                            <ArrowUpRight className="w-3 h-3" /> +12%
                        </span>
                    </div>

                    <div className="space-y-1 mb-6">
                        <span className="text-sm font-medium text-emerald-900">Receita do Dia</span>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold tracking-tight text-gray-900">R$ 14.250</h3>
                        </div>
                    </div>

                    <div className="space-y-3 mt-auto">
                        {/* Sparkline for Revenue */}
                        <div className="h-8 w-full flex items-end gap-1 opacity-50">
                            {/* Mock bars */}
                            <div className="w-full bg-emerald-200 h-[40%] rounded-t-sm" />
                            <div className="w-full bg-emerald-300 h-[60%] rounded-t-sm" />
                            <div className="w-full bg-emerald-400 h-[30%] rounded-t-sm" />
                            <div className="w-full bg-emerald-500 h-[80%] rounded-t-sm" />
                            <div className="w-full bg-emerald-600 h-[50%] rounded-t-sm" />
                            <div className="w-full bg-emerald-600 h-[90%] rounded-t-sm" />
                            <div className="w-full bg-emerald-700 h-[70%] rounded-t-sm" />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-end text-xs">
                                <span className="text-emerald-800/70 font-medium">Meta do dia</span>
                                <span className="text-emerald-900 font-bold">78%</span>
                            </div>
                            <div className="h-1.5 w-full bg-emerald-200/50 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full w-[78%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* CARD 2: TEMPO DE DECISÃO */}
            <Card className="p-6 flex flex-col justify-between bg-white border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <Clock className="w-5 h-5 text-gray-500" />
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                        <ArrowDownRight className="w-3 h-3" /> -18s
                    </span>
                </div>

                <div className="flex-1 flex flex-col justify-center mb-2">
                    <span className="text-xs font-medium text-gray-500 block mb-1">Tempo Decisão</span>
                    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">4m 12s</h3>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400">vs. Ontem</span>
                    <span className="text-xs font-medium text-gray-600">4m 30s</span>
                </div>
            </Card>

            {/* CARD 3: PEDIDOS TOTAIS */}
            <Card className="p-6 flex flex-col justify-between bg-white border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <ShoppingBag className="w-5 h-5 text-gray-500" />
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                        <ArrowUpRight className="w-3 h-3" /> +5%
                    </span>
                </div>

                <div className="flex-1 flex flex-col justify-center mb-2">
                    <span className="text-xs font-medium text-gray-500 block mb-1">Pedidos Totais</span>
                    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">342</h3>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-2">
                    <Activity className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">Pico: 12h - 13h</span>
                </div>
            </Card>

            {/* CARD 4: TICKET MÉDIO */}
            <Card className="p-6 flex flex-col justify-between bg-white border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <TrendingUp className="w-5 h-5 text-gray-500" />
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-full border border-gray-200">
                        <Sparkles className="w-2.5 h-2.5" /> IA
                    </span>
                </div>

                <div className="flex-1 flex flex-col justify-center mb-2">
                    <span className="text-xs font-medium text-gray-500 block mb-1">Ticket Médio</span>
                    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">R$ 84,50</h3>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Sugestão aceita</span>
                        <span className="text-gray-900 font-bold">48%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-900 w-[48%] opacity-20" />
                    </div>
                </div>
            </Card>

        </div>
    );
}
