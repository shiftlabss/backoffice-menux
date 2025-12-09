import React, { useMemo } from 'react';
import {
    Package, Layers, FolderTree, Tag, Zap,
    ArrowRight, AlertTriangle, CheckCircle, Plus,
    BarChart3, Settings2, Image
} from 'lucide-react';
import { Button } from '../ui/Form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';

function InfoTile({ label, value, subtext, icon: Icon, colorClass, trend }) {
    return (
        <div className="bg-surface rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}>
                    <Icon className={`h-6 w-6 ${colorClass.replace('bg-', 'text-')}`} />
                </div>
                {trend && (
                    <span className="inline-flex items-center text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-full">
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-text-primary tracking-tight mb-1">{value}</h3>
                <p className="text-sm font-medium text-text-secondary">{label}</p>
                {subtext && <p className="text-xs text-text-tertiary mt-1">{subtext}</p>}
            </div>
        </div>
    );
}

function ActionChip({ label, icon: Icon, onClick, variant = 'default' }) {
    const variants = {
        default: "bg-surface border-border text-text-secondary hover:border-primary/50 hover:text-primary",
        primary: "bg-primary/5 border-primary/20 text-primary hover:bg-primary/10",
        accent: "bg-accent/5 border-accent/20 text-accent hover:bg-accent/10"
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold transition-all duration-200 active:scale-95 ${variants[variant]}`}
        >
            <Icon className="h-4 w-4" />
            {label}
        </button>
    );
}

export default function MenuOverview({ data, onAction }) {
    // Analytics Calculation
    const stats = useMemo(() => {
        let totalSubCategories = 0;
        let totalProducts = 0;
        let activeProducts = 0;
        let productsWithoutImage = 0;

        data.forEach(cat => {
            if (cat.subcategories) {
                totalSubCategories += cat.subcategories.length;
                cat.subcategories.forEach(sub => {
                    if (sub.items) {
                        totalProducts += sub.items.length;
                        activeProducts += sub.items.filter(i => i.is_active).length;
                        productsWithoutImage += sub.items.filter(i => !i.photo_url).length;
                    }
                });
            }
        });

        return {
            categories: data.length,
            subCategories: totalSubCategories,
            totalProducts,
            activeProducts,
            inactiveProducts: totalProducts - activeProducts,
            productsWithoutImage,
            completeness: totalProducts > 0 ? Math.round(((totalProducts - productsWithoutImage) / totalProducts) * 100) : 0
        };
    }, [data]);

    const hasData = data.length > 0;

    if (!hasData) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fadeIn">
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                    <Layers className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Comece seu Cardápio</h2>
                <p className="text-text-secondary max-w-md mb-8">
                    Seu cardápio é o coração do seu restaurante. Crie sua primeira categoria e comece a adicionar produtos para vender.
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => onAction('create_category')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Primeira Categoria
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-background p-6 md:p-8 animate-fadeIn space-y-8">

            {/* 1. Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="success" className="animate-pulse">Loja Online</Badge>
                        <span className="text-xs text-text-tertiary">Última atualização: Hoje, 14:30</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-text-primary">Visão Geral</h1>
                    <p className="text-text-secondary mt-1">
                        Resumo operacional e saúde do seu catálogo digital.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => onAction('open_ai_panel')}>
                        <Zap className="h-4 w-4 mr-2 text-warning" />
                        IA Insights
                    </Button>
                    <Button onClick={() => onAction('create_category')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Categoria
                    </Button>
                </div>
            </div>

            {/* 2. Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <InfoTile
                    label="Categorias Ativas"
                    value={stats.categories}
                    icon={Package}
                    colorClass="bg-blue-500 text-blue-500"
                    subtext={`${stats.subCategories} subcategorias`}
                />
                <InfoTile
                    label="Produtos no Cardápio"
                    value={stats.totalProducts}
                    icon={Tag}
                    colorClass="bg-purple-500 text-purple-500"
                    trend="+5 novos"
                />
                <InfoTile
                    label="Itens Disponíveis"
                    value={stats.activeProducts}
                    icon={CheckCircle}
                    colorClass="bg-emerald-500 text-emerald-500"
                    subtext={`${stats.inactiveProducts} inativos/esgotados`}
                />
                <InfoTile
                    label="Score de Completude"
                    value={`${stats.completeness}%`}
                    icon={BarChart3}
                    colorClass="bg-orange-500 text-orange-500"
                    subtext={`${stats.productsWithoutImage} itens sem foto`}
                />
            </div>

            {/* 3. AI Insight & Actions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* AI Insight Card */}
                <div className="lg:col-span-2">
                    <Card className="h-full bg-gradient-to-br from-surface to-surface-hover border-primary/10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap className="h-32 w-32 text-primary" />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-warning fill-warning" />
                                Menux Intelligence
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary mb-2">Oportunidade de Venda</h4>
                                <p className="text-text-secondary leading-relaxed">
                                    Identificamos que a categoria <strong className="text-primary">Bebidas</strong> tem alta visualização mas baixa conversão das 18h às 20h. Sugerimos criar um "Combo Happy Hour" para aumentar o ticket médio.
                                </p>
                            </div>
                            <div className="pt-2 flex flex-wrap gap-3">
                                <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 border-none shadow-none">
                                    Aplicar Sugestão
                                </Button>
                                <Button size="sm" variant="ghost">Ignorar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions Panel */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider">Ações Recomendadas</h3>
                    <div className="flex flex-col gap-3">
                        <ActionChip
                            label="Gerenciar Categorias"
                            icon={Settings2}
                            onClick={() => onAction('switch_view_categories')}
                        />
                        <ActionChip
                            label="Adicionar Fotos em Massa"
                            icon={Image}
                            variant="accent"
                            onClick={() => onAction('bulk_photos')}
                        />
                        <ActionChip
                            label="Revisar Itens Esgotados"
                            icon={AlertTriangle}
                            variant="primary" // Assuming red logic handled in component styling or variant prop needs extending
                            onClick={() => onAction('switch_view_products')}
                        />
                    </div>
                </div>
            </div>

            {/* 4. Menu Health / Details Table (Conceptual) */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-text-primary">Top Categorias</h3>
                    <Button variant="ghost" size="sm" className="text-primary" onClick={() => onAction('switch_view_categories')}>
                        Ver todas <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-surface-hover border-b border-border text-xs uppercase text-text-secondary font-semibold">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Itens</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {data.slice(0, 5).map((cat) => (
                                <tr key={cat.id} className="hover:bg-background transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-primary">{cat.name}</td>
                                    <td className="px-6 py-4 text-text-secondary">{cat.subcategories?.reduce((acc, sub) => acc + (sub.items?.length || 0), 0) || 0} produtos</td>
                                    <td className="px-6 py-4">
                                        <Badge variant="success">Ativo</Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
