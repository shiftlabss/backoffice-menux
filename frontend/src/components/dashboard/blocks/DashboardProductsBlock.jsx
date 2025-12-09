import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../ui/Table';
import { ShoppingBag, TrendingUp, TrendingDown, Eye, ArrowRight, Loader2 } from 'lucide-react';
import { Badge } from '../../ui/Badge';

const HIGHLIGHTS_DATA = {
    'Hoje': [
        { label: 'Mais Vendido', product: 'Burger Clássico', metric: '42 un', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
        { label: 'Maior Margem', product: 'Gin Tônica', metric: '68%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
        { label: 'Queda Vendas', product: 'Salada Ceasar', metric: '-15%', icon: TrendingDown, color: 'text-red-600 bg-red-50' },
        { label: 'Mais Visto', product: 'Combo Família', metric: '156 views', icon: Eye, color: 'text-purple-600 bg-purple-50' },
    ],
    '7 dias': [
        { label: 'Mais Vendido', product: 'Combo Família', metric: '256 un', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
        { label: 'Maior Margem', product: 'Suco Natural', metric: '72%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
        { label: 'Queda Vendas', product: 'Wrap Frango', metric: '-8%', icon: TrendingDown, color: 'text-red-600 bg-red-50' },
        { label: 'Mais Visto', product: 'Burger Clássico', metric: '890 views', icon: Eye, color: 'text-purple-600 bg-purple-50' },
    ]
};

const PRODUTOS_DATA = {
    'Hoje': [
        { id: 1, name: 'Burger Clássico', cat: 'Frios', conv: '18%', rev: 'R$ 1.250' },
        { id: 2, name: 'Combo Família', cat: 'Combos', conv: '12%', rev: 'R$ 980' },
        { id: 3, name: 'Coca-Cola Zero', cat: 'Bebidas', conv: '45%', rev: 'R$ 450' },
        { id: 4, name: 'Batata Frita G', cat: 'Entradas', conv: '22%', rev: 'R$ 320' },
    ],
    '7 dias': [
        { id: 1, name: 'Burger Clássico', cat: 'Frios', conv: '21%', rev: 'R$ 8.450' },
        { id: 2, name: 'Combo Família', cat: 'Combos', conv: '14%', rev: 'R$ 6.120' },
        { id: 3, name: 'Coca-Cola Zero', cat: 'Bebidas', conv: '42%', rev: 'R$ 3.100' },
        { id: 4, name: 'Batata Frita G', cat: 'Entradas', conv: '25%', rev: 'R$ 2.450' },
    ]
};

export default function DashboardProductsBlock() {
    const [period, setPeriod] = useState('Hoje');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handlePeriodChange = (e) => {
        const newPeriod = e.target.value;
        if (newPeriod === period) return;
        setPeriod(newPeriod);
    };

    const handleViewAll = () => {
        // Mock navigation
        // navigate('/analytics/products');
        console.log("Navigating to full products list...");
    };

    const highlights = HIGHLIGHTS_DATA[period];
    const products = PRODUTOS_DATA[period];

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-gray-500" />
                    Performance de Produtos
                </h3>
                <div className="flex gap-2">
                    <select
                        value={period}
                        onChange={handlePeriodChange}
                        className="bg-transparent text-xs font-bold text-gray-500 border-none outline-none cursor-pointer hover:text-foreground focus:ring-0"
                    >
                        <option value="Hoje">Hoje</option>
                        <option value="7 dias">7 dias</option>
                    </select>
                </div>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {isLoading ? (
                    // Skeleton Loading for Cards
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-border flex flex-col gap-1 shadow-sm h-[74px] animate-pulse">
                            <div className="h-4 bg-gray-100 rounded w-1/3 mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                        </div>
                    ))
                ) : (
                    highlights.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="bg-white p-3 rounded-xl border border-border flex flex-col gap-1 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <span className={`p-1.5 rounded-lg ${item.color}`}>
                                        <Icon className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Top {idx + 1}</span>
                                </div>
                                <div className="mt-1">
                                    <p className="text-xs text-gray-500 font-medium truncate">{item.label}</p>
                                    <p className="text-sm font-bold text-foreground truncate" title={item.product}>{item.product}</p>
                                    <p className="text-xs font-bold text-foreground mt-0.5">{item.metric}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Table */}
            <Card className="flex-1 overflow-hidden border-border relative min-h-[200px]">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                )}
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-muted">
                                <TableHead className="py-2 h-10 text-xs">Produto</TableHead>
                                <TableHead className="py-2 h-10 text-xs">Cat.</TableHead>
                                <TableHead className="py-2 h-10 text-xs">Conv.</TableHead>
                                <TableHead className="py-2 h-10 text-xs text-right">Receita</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((p) => (
                                <TableRow key={p.id} className="border-b border-muted hover:bg-background">
                                    <TableCell className="py-2 font-medium text-xs">{p.name}</TableCell>
                                    <TableCell className="py-2 text-xs text-gray-500">{p.cat}</TableCell>
                                    <TableCell className="py-2 text-xs">
                                        <Badge variant="secondary" className="scale-90 origin-left">{p.conv}</Badge>
                                    </TableCell>
                                    <TableCell className="py-2 text-xs font-bold text-right text-foreground">{p.rev}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="p-2 border-t border-muted flex justify-center mt-auto">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-7 w-full text-gray-500 hover:text-foreground"
                        onClick={handleViewAll}
                    >
                        Ver todos
                    </Button>
                </div>
            </Card>
        </div>
    );
}
