
import React from 'react';
import { Card, CardContent } from '../ui/Card';
import {
    ShoppingBag, CheckCircle, MousePointer2, DollarSign,
    Clock, ChefHat, Users, AlertOctagon, TrendingUp, TrendingDown
} from 'lucide-react';

const KPIItem = ({ label, value, change, trend, icon: Icon, color }) => (
    <Card className="hover:shadow-md transition-all duration-300 border-border">
        <CardContent className="p-5">
            <div className="flex justify-between items-start mb-2">
                <div className={`p-2.5 rounded-xl ${color}`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                {change && (
                    <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-50 text-green-700' :
                            trend === 'down' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {change}
                    </div>
                )}
            </div>
            <div className="mt-3">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
            </div>
        </CardContent>
    </Card>
);

export default function AdvancedKPIs() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            <KPIItem
                label="Pedidos Iniciados"
                value="215"
                change="+12%"
                trend="up"
                icon={ShoppingBag}
                color="bg-blue-500"
            />
            <KPIItem
                label="Pedidos Finalizados"
                value="189"
                change="+8%"
                trend="up"
                icon={CheckCircle}
                color="bg-green-500"
            />
            <KPIItem
                label="Conversão Menu"
                value="42%"
                change="+2%"
                trend="up"
                icon={MousePointer2}
                color="bg-purple-500"
            />
            <KPIItem
                label="Ticket Médio"
                value="R$ 92"
                change="-1.5%"
                trend="down"
                icon={DollarSign}
                color="bg-emerald-500"
            />
            <KPIItem
                label="Tempo Decisão"
                value="4m"
                change="-30s"
                trend="up"
                icon={Clock}
                color="bg-orange-500"
            />
            <KPIItem
                label="Tempo Preparo"
                value="18m"
                change="+2m"
                trend="down"
                icon={ChefHat}
                color="bg-rose-500"
            />
            <KPIItem
                label="Mesas Ativas"
                value="24"
                change="85%"
                trend="neutral"
                icon={Users}
                color="bg-indigo-500"
            />
            <KPIItem
                label="Risco Atraso"
                value="3"
                change="High"
                trend="down"
                icon={AlertOctagon}
                color="bg-red-500"
            />
        </div>
    );
}
