import React from 'react';
import { cn } from '../../lib/utils';
import {
    LayoutDashboard,
    Layers,
    GitFork,
    Coffee,
    Plus,
    Zap,
    Store,
    TrendingUp,
    Wine
} from 'lucide-react';

export default function MenuSidebar({ activeView, onViewChange, onAction }) {

    const navigationGroups = [
        {
            title: "Visão & Status",
            items: [
                { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
                { id: 'insights', label: 'Insights IA', icon: Zap },
            ]
        },
        {
            title: "Estrutura",
            items: [
                { id: 'categories', label: 'Categorias', icon: Layers },
                { id: 'products', label: 'Produtos', icon: Coffee },
                { id: 'wine_list', label: 'Carta de Vinhos', icon: Wine },
            ]
        }
    ];

    const quickActions = [
        { label: 'Nova Categoria', action: 'create_category', icon: Layers },
        { label: 'Novo Produto', action: 'create_product', icon: Coffee },
    ];

    return (
        <div className="hidden lg:flex w-64 flex-shrink-0 border-r border-border bg-surface h-full flex-col shadow-[1px_0_20px_rgba(0,0,0,0.02)] z-10 transition-all duration-300">
            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">

                {/* Status Block */}
                <div className="px-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="relative">
                            <span className="flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-text-primary uppercase tracking-wide">Loja Online</p>
                            <p className="text-[10px] text-text-secondary">Visível para clientes</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Blocks */}
                {navigationGroups.map((group, idx) => (
                    <div key={idx}>
                        <h3 className="px-4 text-[11px] font-bold text-text-tertiary uppercase tracking-wider mb-2">
                            {group.title}
                        </h3>
                        <nav className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = !item.isAction && activeView === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => item.isAction ? onAction(item.action) : onViewChange(item.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-md"
                                                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                                        )}
                                    >
                                        <Icon className={cn(
                                            "h-4 w-4 transition-colors",
                                            isActive ? "text-primary-foreground" : "text-text-tertiary group-hover:text-text-primary"
                                        )} />
                                        <span className="relative z-10">{item.label}</span>

                                        {isActive && (
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                ))}

                {/* Quick Actions Block */}
                <div>
                    <h3 className="px-4 text-[11px] font-bold text-text-tertiary uppercase tracking-wider mb-2">
                        Ações Rápidas
                    </h3>
                    <div className="space-y-2 px-1">
                        {quickActions.map((action, i) => (
                            <button
                                key={i}
                                onClick={() => onAction(action.action)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg border border-transparent hover:border-primary/10 transition-all group"
                            >
                                <div className="h-6 w-6 rounded-md bg-surface border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                                    <Plus className="h-3 w-3 text-text-tertiary group-hover:text-primary" />
                                </div>
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Promo / Footer */}
            <div className="p-4 border-t border-border bg-gradient-to-br from-surface to-surface-hover">
                <button
                    onClick={() => onAction('open_analytics')}
                    className="w-full p-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 group hover:shadow-indigo-500/30 transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold opacity-90">Performance</span>
                        <TrendingUp className="h-3 w-3" />
                    </div>
                    <div className="flex items-end gap-1">
                        <span className="text-lg font-bold leading-none">+12%</span>
                        <span className="text-[10px] opacity-75 mb-0.5">hoje</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
