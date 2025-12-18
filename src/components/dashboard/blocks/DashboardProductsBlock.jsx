import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { ShoppingBag, TrendingUp, TrendingDown, Eye, ArrowRight, Loader2, ImageOff, MousePointer2, ShoppingCart, Receipt, MoreVertical, Star, Edit2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Badge } from '../../ui/Badge';

// --- MOCK DATA FOR RICH RANKING ---
const RICH_PRODUCTS_DATA = {
    'Hoje': [
        {
            id: 1,
            name: 'Burger Clássico',
            cat: 'Frios',
            subcat: 'Artesanal',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=150&auto=format&fit=crop',
            funnel: { views: 1240, clicks: 450, cart: 180, orders: 142 },
            conversion: { rate: 18, delta: 2, trend: 'up' },
            financial: { revenue: 4970, ticket: 35.00 },
            margin: { percent: 45, level: 'high' }
        },
        {
            id: 2,
            name: 'Combo Família',
            cat: 'Combos',
            subcat: 'Especial',
            image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=150&auto=format&fit=crop',
            funnel: { views: 890, clicks: 220, cart: 95, orders: 82 },
            conversion: { rate: 12, delta: -3, trend: 'down' },
            financial: { revenue: 7380, ticket: 90.00 },
            margin: { percent: 32, level: 'medium' }
        },
        {
            id: 3,
            name: 'Coca-Cola Zero',
            cat: 'Bebidas',
            subcat: 'Refrig.',
            image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=150&auto=format&fit=crop',
            funnel: { views: 3200, clicks: 1540, cart: 1200, orders: 1150 },
            conversion: { rate: 45, delta: 5, trend: 'up' },
            financial: { revenue: 9200, ticket: 8.00 },
            margin: { percent: 85, level: 'high' }
        },
        {
            id: 4,
            name: 'Batata Frita G',
            cat: 'Entradas',
            subcat: 'Porções',
            image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=150&auto=format&fit=crop',
            funnel: { views: 650, clicks: 210, cart: 110, orders: 98 },
            conversion: { rate: 22, delta: 0, trend: 'neutral' },
            financial: { revenue: 3136, ticket: 32.00 },
            margin: { percent: 60, level: 'high' }
        },
        {
            id: 5,
            name: 'Brownie Duplo',
            cat: 'Sobremesas',
            subcat: 'Doces',
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?q=80&w=150&auto=format&fit=crop',
            funnel: { views: 420, clicks: 80, cart: 30, orders: 15 },
            conversion: { rate: 4, delta: -1, trend: 'down' },
            financial: { revenue: 450, ticket: 30.00 },
            margin: { percent: 25, level: 'low' }
        },
    ]
};

// --- HELPER COMPONENTS ---

function TrendBadge({ value, trend, isPercent = true }) {
    const isPositive = trend === 'up';
    const isNeutral = trend === 'neutral';

    // Style config based on trend
    let colors = 'bg-gray-100 text-gray-600';
    let Icon = Sparkles; // Default

    if (isPositive) {
        colors = 'bg-emerald-50 text-emerald-700 border-emerald-100';
        Icon = TrendingUp;
    } else if (!isNeutral) {
        colors = 'bg-red-50 text-red-700 border-red-100';
        Icon = TrendingDown;
    }

    return (
        <Badge variant="outline" className={`flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold border ${colors}`}>
            {value > 0 && '+'}{value}{isPercent && '%'}
            {!isNeutral && <Icon className="w-3 h-3" />}
        </Badge>
    );
}

function FunnelMetric({ icon: Icon, label, value, colorClass = "text-gray-400" }) {
    return (
        <div className="flex flex-col items-center gap-0.5" title={label}>
            <div className="flex items-center gap-1">
                <Icon className={`w-3 h-3 ${colorClass}`} />
                <span className="text-[10px] font-medium text-gray-500">{value}</span>
            </div>
            {/* Optional mini label for tooltip/clarity */}
        </div>
    );
}

function ProductRow({ item, index }) {
    return (
        <div className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 p-4 rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50/50 hover:shadow-sm transition-all duration-200">

            {/* COL 1: PRODUCT INFO */}
            <div className="w-full md:col-span-5 lg:col-span-4 flex items-center gap-3">
                <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm group-hover:scale-105 transition-transform">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                    <div className="hidden absolute inset-0 items-center justify-center bg-gray-50 text-gray-300">
                        <ImageIcon className="w-4 h-4" />
                    </div>

                    {/* Rank Badge */}
                    <div className="absolute top-0 left-0 bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-md">
                        #{index + 1}
                    </div>
                </div>

                <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 truncate group-hover:text-primary transition-colors">{item.name}</h4>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-normal">{item.cat}</span>
                        {item.margin.level === 'high' && (
                            <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 rounded-full border border-emerald-100">
                                Alta Margem
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* COL 2: FUNNEL METRICS (Hidden on Tablet & Mobile) */}
            <div className="hidden lg:flex col-span-3 items-center justify-between px-2 border-l border-r border-gray-100/50">
                <FunnelMetric icon={Eye} value={item.funnel.views} label="Visualizações" />
                <div className="w-px h-6 bg-gray-100" />
                <FunnelMetric icon={MousePointer2} value={item.funnel.clicks} label="Cliques" />
                <div className="w-px h-6 bg-gray-100" />
                <FunnelMetric icon={ShoppingCart} value={item.funnel.cart} label="Carrinho" />
                <div className="w-px h-6 bg-gray-100" />
                <FunnelMetric icon={Receipt} value={item.funnel.orders} label="Pedidos" colorClass="text-emerald-500" />
            </div>

            {/* MOBILE / TABLET STATS ROW */}
            <div className="flex items-center justify-between md:contents">

                {/* COL 3: CONVERSION & TREND */}
                <div className="md:col-span-3 lg:col-span-2 flex flex-col justify-center items-start pl-0 md:pl-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{item.conversion.rate}%</span>
                        <TrendBadge value={item.conversion.delta} trend={item.conversion.trend} />
                    </div>
                    <span className="text-xs text-gray-400 font-normal mt-0.5">Conversão</span>
                </div>

                {/* COL 4: REVENUE */}
                <div className="md:col-span-3 lg:col-span-2 flex flex-col justify-center items-end pr-0 md:pr-2">
                    <span className="text-sm font-semibold text-gray-900">
                        R$ {item.financial.revenue.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-gray-400 font-normal mt-0.5">
                        Ticket: R$ {item.financial.ticket.toLocaleString('pt-BR')}
                    </span>
                </div>
            </div>

            {/* COL 5: ACTIONS (Hover only on desktop) */}
            <div className="hidden md:flex col-span-1 items-center justify-end">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>

            {/* Mobile Actions Hint */}
            <div className="md:hidden absolute right-2 top-2">
                <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-300">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );

}

export default function DashboardProductsBlock() {
    const [period, setPeriod] = useState('Hoje');
    const [segment, setSegment] = useState('Todos');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Use mock data, fallback to today if specific period data missing in mock
    const products = RICH_PRODUCTS_DATA[period] || RICH_PRODUCTS_DATA['Hoje'];

    const handlePeriodChange = (e) => {
        setIsLoading(true);
        setPeriod(e.target.value);
        setTimeout(() => setIsLoading(false), 600);
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-base font-semibold text-gray-900">Top Vendas e Conversão</h3>
                    <p className="text-xs font-normal text-gray-500 mt-1">Ranking dos itens com melhor performance</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Period Selector */}
                    <select
                        value={period}
                        onChange={handlePeriodChange}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg px-3 py-2 cursor-pointer outline-none focus:ring-2 focus:ring-primary/20 hover:bg-gray-100 transition-colors"
                    >
                        <option value="Hoje">Hoje</option>
                        <option value="7 dias">7 dias</option>
                        <option value="30 dias">30 dias</option>
                    </select>

                    {/* CTA */}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="hidden sm:flex text-primary hover:bg-primary/5 hover:text-primary font-semibold text-xs gap-1"
                        onClick={() => navigate('/analytics/products')}
                    >
                        Relatório
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>

            {/* CONTENT */}
            {isLoading ? (
                <div className="flex-1 flex items-center justify-center min-h-[300px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {/* Column Headers (Desktop Only) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        <div className="col-span-4">Produto / Categoria</div>
                        <div className="col-span-3 text-center">Funil (Vis / Cliq / Carr / Ped)</div>
                        <div className="col-span-2">Conversão</div>
                        <div className="col-span-2 text-right">Receita</div>
                        <div className="col-span-1"></div>
                    </div>

                    <div className="flex flex-col gap-1">
                        {products.map((item, index) => (
                            <ProductRow key={item.id} item={item} index={index} />
                        ))}
                    </div>

                    {/* Footer / Empty State */}
                    {products.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                            <ShoppingBag className="w-12 h-12 text-gray-200 mb-3" />
                            <p className="text-sm font-medium">Nenhum dado encontrado para o período.</p>
                            <Button variant="link" size="sm" className="mt-2 text-primary">Ajustar filtros</Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
