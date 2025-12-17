import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { ShoppingBag, TrendingUp, TrendingDown, Eye, ArrowRight, Loader2, ImageOff } from 'lucide-react';
import { Badge } from '../../ui/Badge';

const HIGHLIGHTS_DATA = {
    'Hoje': [
        {
            label: 'Mais Vendido',
            product: 'Burger Clássico',
            metric: '42 un',
            icon: ShoppingBag,
            color: 'text-gray-600 bg-gray-50 border border-gray-100', // Neutral
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=150&auto=format&fit=crop',
            trend: 'up'
        },
        {
            label: 'Maior Margem',
            product: 'Gin Tônica',
            metric: '68%',
            icon: TrendingUp,
            color: 'text-emerald-700 bg-emerald-50 border border-emerald-100', // Semantic (Positive)
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=150&auto=format&fit=crop',
            trend: 'up'
        },
        {
            label: 'Queda Vendas',
            product: 'Salada Ceasar',
            metric: '-15%',
            icon: TrendingDown,
            color: 'text-red-700 bg-red-50 border border-red-100', // Semantic (Negative)
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=150&auto=format&fit=crop',
            trend: 'down'
        },
        {
            label: 'Mais Visto',
            product: 'Combo Família',
            metric: '156 views',
            icon: Eye,
            color: 'text-gray-600 bg-gray-50 border border-gray-100', // Neutral
            image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=150&auto=format&fit=crop',
            trend: 'neutral'
        },
    ],
    '7 dias': [
        {
            label: 'Mais Vendido',
            product: 'Combo Família',
            metric: '256 un',
            icon: ShoppingBag,
            color: 'text-gray-600 bg-gray-50 border border-gray-100',
            image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=150&auto=format&fit=crop',
            trend: 'up'
        },
        {
            label: 'Maior Margem',
            product: 'Suco Natural',
            metric: '72%',
            icon: TrendingUp,
            color: 'text-emerald-700 bg-emerald-50 border border-emerald-100',
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=150&auto=format&fit=crop',
            trend: 'up'
        },
        {
            label: 'Queda Vendas',
            product: 'Wrap Frango',
            metric: '-8%',
            icon: TrendingDown,
            color: 'text-red-700 bg-red-50 border border-red-100',
            image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=150&auto=format&fit=crop',
            trend: 'down'
        },
        {
            label: 'Mais Visto',
            product: 'Burger Clássico',
            metric: '890 views',
            icon: Eye,
            color: 'text-gray-600 bg-gray-50 border border-gray-100',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=150&auto=format&fit=crop',
            trend: 'neutral'
        },
    ]
};

const PRODUTOS_DATA = {
    'Hoje': [
        { id: 1, name: 'Burger Clássico', cat: 'Frios', conv: '18%', rev: 'R$ 1.250', status: 'high', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=100&auto=format&fit=crop' },
        { id: 2, name: 'Combo Família', cat: 'Combos', conv: '12%', rev: 'R$ 980', status: 'medium', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=100&auto=format&fit=crop' },
        { id: 3, name: 'Coca-Cola Zero', cat: 'Bebidas', conv: '45%', rev: 'R$ 450', status: 'high', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=100&auto=format&fit=crop' },
        { id: 4, name: 'Batata Frita G', cat: 'Entradas', conv: '22%', rev: 'R$ 320', status: 'medium', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=100&auto=format&fit=crop' },
        { id: 5, name: 'Brownie Duplo', cat: 'Sobremesas', conv: '4%', rev: 'R$ 180', status: 'low', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?q=80&w=100&auto=format&fit=crop' },
    ],
    '7 dias': [
        { id: 1, name: 'Burger Clássico', cat: 'Frios', conv: '21%', rev: 'R$ 8.450', status: 'high', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=100&auto=format&fit=crop' },
        { id: 2, name: 'Combo Família', cat: 'Combos', conv: '14%', rev: 'R$ 6.120', status: 'medium', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=100&auto=format&fit=crop' },
        { id: 3, name: 'Coca-Cola Zero', cat: 'Bebidas', conv: '42%', rev: 'R$ 3.100', status: 'high', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=100&auto=format&fit=crop' },
        { id: 4, name: 'Batata Frita G', cat: 'Entradas', conv: '25%', rev: 'R$ 2.450', status: 'medium', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=100&auto=format&fit=crop' },
        { id: 5, name: 'Brownie Duplo', cat: 'Sobremesas', conv: '5%', rev: 'R$ 890', status: 'low', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?q=80&w=100&auto=format&fit=crop' },
    ]
};

function getConversionColor(status) {
    if (status === 'high') return 'text-emerald-700 bg-emerald-50 border-emerald-100';
    if (status === 'medium') return 'text-yellow-700 bg-yellow-50 border-yellow-100';
    return 'text-red-700 bg-red-50 border-red-100';
}

function Zone1Card({ item, rank }) {
    const isLoss = item.trend === 'down';

    return (
        <div className={`relative overflow-hidden group rounded-xl border border-border bg-white p-3 transition-all duration-300 hover:shadow-md ${isLoss ? 'bg-red-50/30' : ''}`}>
            {/* Context Badge */}
            <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-[10px] font-bold px-1.5 h-5 bg-gray-100 text-gray-500 border-gray-200">
                    TOP {rank}
                </Badge>
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isLoss ? 'text-red-500' : 'text-gray-400'}`}>
                    {item.label}
                </div>
            </div>

            <div className="flex gap-3 items-center">
                {/* Image */}
                <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-black/5 bg-gray-100">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.product}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <div className="hidden absolute inset-0 items-center justify-center bg-gray-50 text-gray-300" style={{ display: item.image ? 'none' : 'flex' }}>
                        <ImageOff className="w-5 h-5" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 truncate mb-0.5 group-hover:text-primary transition-colors">
                        {item.product}
                    </h4>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-lg font-bold leading-none ${isLoss ? 'text-red-600' : 'text-gray-900'}`}>
                            {item.metric}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Zone2ProductRow({ product }) {
    return (
        <div className="group flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-border hover:bg-gray-50/80 hover:shadow-sm transition-all duration-200 cursor-pointer">
            {/* Image */}
            <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-black/5 bg-white shadow-sm">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div className="hidden absolute inset-0 items-center justify-center bg-gray-50 text-gray-300">
                    <ImageOff className="w-4 h-4" />
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className="font-bold text-sm text-gray-900 truncate mb-0.5">{product.name}</h4>
                <p className="text-xs text-gray-500 font-medium">{product.cat}</p>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-6">
                <div className={`px-2 py-1 rounded-md text-xs font-bold border ${getConversionColor(product.status)}`}>
                    Conv. {product.conv}
                </div>
                <div className="text-right min-w-[80px]">
                    <span className="block text-sm font-bold text-gray-900">{product.rev}</span>
                </div>
            </div>

            {/* Arrow Hint */}
            <ArrowRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        </div>
    );
}

export default function DashboardProductsBlock() {
    const [period, setPeriod] = useState('Hoje');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlePeriodChange = (e) => {
        const newPeriod = e.target.value;
        if (newPeriod === period) return;

        setIsLoading(true);
        setPeriod(newPeriod);
        // Simulate fetch
        setTimeout(() => setIsLoading(false), 600);
    };

    const highlights = HIGHLIGHTS_DATA[period];
    const products = PRODUTOS_DATA[period];

    return (
        <div className="h-full flex flex-col bg-white/50">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pl-1 pr-2">
                <h3 className="font-bold text-foreground flex items-center gap-2 text-base">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    Performance de Produtos
                </h3>
                <div className="flex gap-2">
                    <select
                        value={period}
                        onChange={handlePeriodChange}
                        className="bg-transparent text-xs font-bold text-gray-500 border-none outline-none cursor-pointer hover:text-foreground focus:ring-0 transition-colors"
                    >
                        <option value="Hoje">Hoje</option>
                        <option value="7 dias">7 dias</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex-1 flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
                </div>
            ) : (
                <div className="flex flex-col gap-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {/* Zone 1: Highlights Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {highlights.map((item, idx) => (
                            <Zone1Card key={idx} item={item} rank={idx + 1} />
                        ))}
                    </div>

                    {/* Zone 2: Premium Visual List */}
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Vendas & Conversão</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            {products.map((product) => (
                                <Zone2ProductRow key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="pt-4 flex justify-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs font-semibold text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                onClick={() => navigate('/analytics')}
                            >
                                Ver todos os produtos
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
