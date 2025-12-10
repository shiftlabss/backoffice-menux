
import React from 'react';
import { Card, CardContent } from '../ui/Card';
import {
    ShoppingBag, CheckCircle, MousePointer2, AlertCircle, DollarSign,
    Layers, Clock, ChefHat, Target, Users, AlertOctagon, TrendingUp, TrendingDown
} from 'lucide-react';

const KPIItem = ({ label, value, subValue, trend, icon: Icon, color, isNegative }) => (
    <div className="bg-white p-4 rounded-2xl border border-border hover:shadow-md hover:border-[#D4D4D4] transition-all duration-300 flex flex-col justify-between min-h-[110px]">
        <div className="flex justify-between items-start">
            <div className={`p-2 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
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
            <h3 className="text-xl font-bold text-foreground mt-2">{value}</h3>
            <div className="flex justify-between items-end">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
                {subValue && <span className="text-[10px] text-muted-foreground">{subValue}</span>}
            </div>
        </div>
    </div>
);

export default function MainKPIs() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 mb-8">
            <KPIItem label="Iniciados" value="215" trend={12} icon={ShoppingBag} color="bg-primary" />
            <KPIItem label="Finalizados" value="189" trend={8} icon={CheckCircle} color="bg-green-500" />
            <KPIItem label="Conversão" value="42%" trend={2.4} icon={MousePointer2} color="bg-purple-500" />
            <KPIItem label="Abandono" value="15%" trend={-1.2} isNegative={true} icon={AlertCircle} color="bg-red-500" />

            <KPIItem label="Ticket Médio" value="R$ 92" trend={-1.5} icon={DollarSign} color="bg-emerald-500" />
            <KPIItem label="TM Categoria" value="R$ 45" subValue="Bebidas" icon={Layers} color="bg-primary" />

            <KPIItem label="T. Decisão" value="4m 12s" trend={-5} isNegative={true} icon={Clock} color="bg-orange-500" />
            <KPIItem label="T. Preparo" value="18m" trend={2} icon={ChefHat} color="bg-rose-500" />

            <KPIItem label="SLA Meta" value="98%" subValue="95% Alvo" icon={Target} color="bg-primary" />
            <KPIItem label="Mesas Ativas" value="24" trend={10} icon={Users} color="bg-primary" />
            <KPIItem label="Em Risco" value="3" trend={-1} isNegative={true} icon={AlertOctagon} color="bg-amber-500" />
        </div>
    );
}
