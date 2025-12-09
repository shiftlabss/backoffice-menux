
import React from 'react';
import { Card } from '../ui/Card';
import { ShoppingBag, CheckCircle, MousePointer2, AlertCircle, DollarSign, Layers, TrendingUp, TrendingDown } from 'lucide-react';

const KPIItem = ({ label, value, subValue, trend, icon: Icon, color, isNegative }) => (
    <div className="bg-white p-4 rounded-xl border border-border flex flex-col justify-between h-full min-h-[100px] shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-default">
        <div className="flex justify-between items-start mb-2">
            <div className={`p-1.5 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
                <Icon className={`w-4 h-4 ${color.replace('bg-', 'text-').replace('text-opacity-100', '')}`} />
            </div>
            {trend && (
                <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${(trend > 0 && !isNegative) || (trend < 0 && isNegative) ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                    {trend > 0 ? '+' : ''}{trend}%
                    {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                </div>
            )}
        </div>
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-0.5">{value}</h3>
            <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">{label}</p>
                {subValue && <span className="text-[10px] text-gray-500 font-medium">{subValue}</span>}
            </div>
        </div>
    </div>
);

export default function CommercialPerformance() {
    return (
        <Card className="border-none shadow-none bg-transparent">
            {/* 2.1 Funnel Block */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-gray-900 rounded-full"></span>
                    Funil de Pedidos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                    <KPIItem label="Iniciados" value="215" trend={8} icon={ShoppingBag} color="bg-blue-500" />
                    <KPIItem label="Finalizados" value="189" trend={2.4} icon={CheckCircle} color="bg-green-500" />
                    <KPIItem label="Conversão" value="42%" trend={-1.2} isNegative={true} icon={MousePointer2} color="bg-purple-500" />
                    <KPIItem label="Abandono" value="15%" trend={-1.5} isNegative={true} icon={AlertCircle} color="bg-red-500" />
                </div>
            </div>

            {/* 2.2 Ticket Block */}
            <div>
                <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-gray-900 rounded-full"></span>
                    Ticket & Mix
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <KPIItem label="Ticket Médio" value="R$ 92,00" trend={-1.5} icon={DollarSign} color="bg-emerald-500" />
                    <KPIItem label="TM Categoria" value="R$ 45,00" subValue="Bebidas" icon={Layers} color="bg-teal-500" />
                </div>
            </div>
        </Card>
    );
}
