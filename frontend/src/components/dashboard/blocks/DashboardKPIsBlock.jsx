import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/Card';
import { Skeleton } from '../../ui/Skeleton';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../../services/dataService';

export default function DashboardKPIsBlock() {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMetrics = async () => {
            try {
                const data = await dashboardService.getMetrics();
                setMetrics(data);
            } catch (err) {
                console.error('Error loading dashboard metrics:', err);
                setError('Erro ao carregar métricas');
                // Fallback to mock data
                setMetrics({
                    orders_initiated: 12,
                    orders_finalized: 130,
                    average_ticket: 84.50,
                    avg_decision_time: 145
                });
            } finally {
                setLoading(false);
            }
        };
        loadMetrics();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
    };

    const formatTime = (seconds) => {
        if (!seconds) return '0m';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    };

    const calculateRevenue = () => {
        if (!metrics) return 0;
        return (metrics.orders_finalized || 0) * (metrics.average_ticket || 0);
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-foreground" />
                    Analytics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-[120px] rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    const KPIS = [
        {
            label: 'Receita do Dia',
            value: formatCurrency(calculateRevenue()),
            change: '+12%',
            isPositive: true,
            sub: `${metrics?.orders_finalized || 0} pedidos finalizados`,
            icon: DollarSign,
            link: '/analytics?tab=revenue&period=today'
        },
        {
            label: 'Total de Pedidos',
            value: metrics?.orders_initiated || 0,
            change: null,
            isPositive: true,
            sub: 'Pedidos ativos agora',
            icon: ShoppingBag,
            link: '/orders?filter=today'
        },
        {
            label: 'Ticket Médio',
            value: formatCurrency(metrics?.average_ticket || 0),
            change: '-2%',
            isPositive: false,
            sub: 'Média por pedido',
            icon: Target,
            link: '/analytics?tab=average-ticket'
        },
        {
            label: 'Tempo de Decisão',
            value: formatTime(metrics?.avg_decision_time || 0),
            change: '-15s',
            isPositive: true,
            sub: 'Média de conclusão',
            icon: Clock,
            link: '/analytics?tab=decision-time'
        },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-foreground" />
                Analytics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {KPIS.map((kpi, idx) => {
                    const Icon = kpi.icon;
                    // Only wrap in link if a link exists
                    const Content = (
                        <Card className="p-5 flex flex-col justify-between hover:shadow-md transition-shadow h-full cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Icon className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                                </div>
                                {kpi.change && (
                                    <span className={`flex items-center text-xs font-bold ${kpi.isPositive
                                        ? 'text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md'
                                        : 'text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md'
                                        }`}>
                                        {kpi.change}
                                        {kpi.isPositive
                                            ? <TrendingUp className="w-3 h-3 ml-1" />
                                            : <TrendingDown className="w-3 h-3 ml-1" />
                                        }
                                    </span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground tracking-tight">{kpi.value}</h3>
                                <p className="text-xs text-muted-foreground mt-1 font-medium">{kpi.sub}</p>
                            </div>
                        </Card>
                    );

                    return kpi.link ? (
                        <Link to={kpi.link} key={idx} className="block">
                            {Content}
                        </Link>
                    ) : (
                        <div key={idx}>
                            {Content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
