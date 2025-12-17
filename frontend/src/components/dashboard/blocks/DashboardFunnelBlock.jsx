import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { cn } from '../../../lib/utils';
import { Link } from 'react-router-dom';
import { Clock, XCircle } from 'lucide-react';

// Mock Funnel Data
const FUNNEL_DATA = [
    { id: 1, label: 'Iniciados', value: 450, percent: '100%', color: 'bg-gray-900' },
    { id: 2, label: 'Adic. Carrinho', value: 312, percent: '69%', color: 'bg-gray-400' },
    { id: 3, label: 'Pagamento', value: 245, percent: '54%', color: 'bg-emerald-500' },
];

export default function DashboardFunnelBlock() {
    const [period, setPeriod] = useState('Hoje');

    return (
        <Card className="h-full p-6 flex flex-col bg-white border-gray-200 shadow-sm relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-gray-900">Funil de Pedidos</h3>
                    <p className="text-xs text-gray-500">Conversão de mesa para pedido</p>
                </div>
                <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
                    {['Hoje', 'Ontem'].map(p => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-md transition-all",
                                period === p ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Funnel Visual */}
            <div className="flex-1 flex flex-col justify-center space-y-3">
                {FUNNEL_DATA.map((step, idx) => (
                    <div key={step.id} className="relative">
                        <div className="flex justify-between items-end mb-1 text-xs">
                            <span className="font-bold text-gray-700">{step.label}</span>
                            <span className="font-mono font-bold text-gray-900">{step.value}</span>
                        </div>
                        {/* Bar */}
                        <div className="h-2.5 w-full bg-gray-50 rounded-full overflow-hidden flex items-center">
                            <div
                                className={cn("h-full rounded-full transition-all duration-1000", step.color)}
                                style={{ width: step.percent }}
                            />
                        </div>
                        {/* Dropoff connector (not for last item) */}
                        {idx < FUNNEL_DATA.length - 1 && (
                            <div className="absolute right-0 top-6 text-[9px] font-medium text-red-400 flex items-center gap-0.5">
                                <XCircle className="w-2.5 h-2.5" /> -31%
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-50 rounded-md border border-red-100">
                        <XCircle className="w-3.5 h-3.5 text-red-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Abandono</span>
                        <span className="text-xs font-bold text-gray-900">24%</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
                    <div className="p-1.5 bg-blue-50 rounded-md border border-blue-100">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Tempo médio</span>
                        <span className="text-xs font-bold text-gray-900">4m 12s</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
