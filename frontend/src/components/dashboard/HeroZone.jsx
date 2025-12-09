import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, DollarSign, CalendarCheck, Zap, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Form';

const KPICard = ({ title, value, sub, subValue, trend, trendValue, icon: Icon, color, onAction, actionLabel }) => (
    <Card className="flex flex-col justify-between p-5 border-border shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer h-full bg-white">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
            </div>
            {trend && (
                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'text-green-700 bg-green-50 border border-green-100' : 'text-red-700 bg-red-50 border border-red-100'
                    }`}>
                    {trend === 'up' ? '+' : '-'}{trendValue}%
                    {trend === 'up' ? <TrendingUp className="w-3 h-3 ml-1" /> : <TrendingDown className="w-3 h-3 ml-1" />}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{value}</h3>
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-3">{title}</p>
            {sub && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500">{sub}</span>
                    <span className="text-sm font-bold text-gray-800">{subValue}</span>
                </div>
            )}
            {onAction && (
                <Button variant="ghost" size="sm" onClick={onAction} className="w-full mt-3 h-7 text-xs border border-border">
                    {actionLabel} <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
            )}
        </div>
    </Card>
);

export default function HeroZone({ onAction }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            <KPICard
                title="Previsão Hoje (IA)"
                value="R$ 12.450"
                sub="Confiança"
                subValue="94%"
                trend="up"
                trendValue={12}
                icon={Zap}
                color="bg-purple-500"
            />
            <KPICard
                title="Receita Real"
                value="R$ 3.200"
                sub="Meta: R$ 12k"
                subValue="26%"
                icon={DollarSign}
                color="bg-green-500"
            />
            <KPICard
                title="Projeção Final"
                value="R$ 13.100"
                sub="vs Previsão"
                subValue="+5%"
                trend="up"
                trendValue={5.2}
                icon={CalendarCheck}
                color="bg-blue-500"
            />
            <Card className="bg-gradient-to-br from-[#121212] to-[#262626] text-white p-4 flex flex-col justify-center relative overflow-hidden shadow-lg border-none hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer group">
                <div className="absolute top-0 right-0 p-8 bg-white/5 rounded-full -mr-4 -mt-4 blur-xl group-hover:bg-white/10 transition-colors"></div>

                <div className="flex items-center gap-2 mb-2 relative z-10">
                    <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Insight do Dia</span>
                </div>

                <p className="text-sm font-medium leading-tight mb-3 relative z-10">
                    "O movimento de almoço está 15% acima do esperado. Prepare a equipe para o jantar."
                </p>

                <Button
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white border-none text-xs h-7 w-fit relative z-10"
                    onClick={() => onAction('view-insight')}
                >
                    Ver Detalhes
                </Button>
            </Card>
        </div>
    );
}
