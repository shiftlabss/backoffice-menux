import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMenux } from '../context/MenuxContext';
import {
    LayoutDashboard,
    ShoppingBag,
    UtensilsCrossed,
    BarChart3,
    Settings,
    LogOut,
    Menu as MenuIcon,
    X,
    Users
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Sidebar() {
    const { role, isSidebarOpen, toggleSidebar } = useMenux();

    const managerLinks = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/users', icon: Users, label: 'Usuários' },
        { to: '/menu', icon: UtensilsCrossed, label: 'Cardápio' },
        { to: '/orders', icon: ShoppingBag, label: 'Pedidos' },
        { to: '/analytics', icon: BarChart3, label: 'Analytics' },
        { to: '/settings', icon: Settings, label: 'Configurações' },
    ];

    const waiterLinks = [
        { to: '/orders', icon: ShoppingBag, label: 'Pedidos' },
    ];

    const links = role === 'manager' ? managerLinks : waiterLinks;

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border z-50 transition-transform duration-300 flex flex-col",
                !isSidebarOpen && "-translate-x-full lg:translate-x-0"
            )}>
                {/* Logo Area */}
                <div className="h-[60px] flex items-center justify-between px-6 border-b border-border">
                    <div className="flex items-center gap-2">
                        <img src="/logo-menux.svg" alt="Menux" className="h-8 w-auto" />
                    </div>
                    <button onClick={toggleSidebar} className="lg:hidden text-text-secondary">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-4 space-y-1.5">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                            )}
                        >
                            <link.icon className="h-5 w-5 transition-colors" />
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-background border border-border">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                            {role === 'manager' ? 'AD' : 'GR'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {role === 'manager' ? 'Admin' : 'Garçom'}
                            </p>
                            <p className="text-xs text-text-secondary truncate">
                                {role === 'manager' ? 'admin@menux.com' : 'garcom@menux.com'}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
