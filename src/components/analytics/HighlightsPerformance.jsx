import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Sparkles, Eye, MousePointer, ShoppingBag, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

export default function HighlightsPerformance() {
    // Mock Data - In a real app, this would be passed as a prop or fetched
    const highlightsMetrics = [
        {
            id: 1,
            position: 1,
            name: 'Picanha Angus Premium',
            image_url: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            price: 129.90,
            views: 1240,
            clicks: 186,
            added_to_cart: 142,
            orders: 118,
            conversion: 9.5,
            is_active: true
        },
        {
            id: 2,
            position: 2,
            name: 'Risoto de Camarão',
            image_url: 'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?w=800&auto=format&fit=crop',
            price: 89.90,
            views: 1050,
            clicks: 120,
            added_to_cart: 85,
            orders: 72,
            conversion: 6.8,
            is_active: true
        },
        {
            id: 3,
            position: 3,
            name: 'Vinho Tinto Malbec',
            price: 145.00,
            views: 980,
            clicks: 65,
            added_to_cart: 40,
            orders: 28,
            conversion: 2.8,
            is_active: false // Inactive example
        }
    ];

    if (!highlightsMetrics || highlightsMetrics.length === 0) {
        return (
            <Card className="mb-8 border-dashed">
                <CardContent className="py-8 text-center">
                    <Sparkles className="w-8 h-8 text-text-tertiary mx-auto mb-3" />
                    <p className="text-text-secondary font-medium">Nenhum destaque definido no cardápio</p>
                    <p className="text-sm text-text-tertiary">Defina destaques em Cardápio &gt; Produtos para ver a performance aqui.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-yellow-500 rounded-full"></div>
                <h2 className="text-lg font-bold text-text-primary">Performance dos Destaques</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {highlightsMetrics.map((item) => (
                    <Card
                        key={item.id}
                        className={cn(
                            "overflow-hidden transition-all hover:shadow-md border-t-4 h-full flex flex-col",
                            item.is_active ? "border-t-yellow-500" : "border-t-border opacity-80"
                        )}
                    >
                        <CardContent className="p-0">
                            {/* Product Header */}
                            <div className="p-4 flex items-start gap-3 border-b border-border bg-surface/50 flex-none h-[100px]">
                                <div className="h-12 w-12 rounded-lg bg-surface-hover border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-surface-hover flex items-center justify-center text-[8px] font-bold text-text-tertiary uppercase">Sem img</div>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                                            Posição #{item.position}
                                        </span>
                                        {!item.is_active && (
                                            <span className="text-[10px] font-bold text-text-tertiary bg-surface border border-border px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                                <AlertTriangle className="w-2.5 h-2.5" /> Inativo
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-text-primary text-sm truncate mt-0.5" title={item.name}>
                                        {item.name}
                                    </h3>
                                    <p className="text-xs font-medium text-primary">{formatCurrency(item.price)}</p>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 flex-1">
                                {/* Views (Top Left) */}
                                <div className="p-3 border-r border-b border-border">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Eye className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-xs text-text-secondary">Visualizações</span>
                                    </div>
                                    <p className="text-lg font-bold text-text-primary">{item.views.toLocaleString()}</p>
                                </div>

                                {/* Clicks (Top Right) */}
                                <div className="p-3 border-b border-border">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <MousePointer className="w-3.5 h-3.5 text-purple-500" />
                                        <span className="text-xs text-text-secondary">Cliques</span>
                                    </div>
                                    <p className="text-lg font-bold text-text-primary">{item.clicks.toLocaleString()}</p>
                                    <p className="text-[10px] text-text-tertiary">
                                        {Math.round((item.clicks / item.views) * 100)}% CTR
                                    </p>
                                </div>

                                {/* Add to Cart (Bottom Left) */}
                                <div className="p-3 border-r border-border">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
                                        <span className="text-xs text-text-secondary">Adições</span>
                                    </div>
                                    <p className="text-lg font-bold text-text-primary">{item.added_to_cart}</p>
                                </div>

                                {/* Orders (Bottom Right) */}
                                <div className="p-3">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                        <span className="text-xs text-text-secondary font-medium">Pedidos</span>
                                    </div>
                                    <p className="text-lg font-bold text-green-600">{item.orders}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <TrendingUp className="w-3 h-3 text-green-600" />
                                        <span className="text-[10px] font-bold text-green-600">{item.conversion}% Conv.</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
