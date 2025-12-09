
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    UtensilsCrossed,
    ShoppingBag,
    BarChart3,
    Settings,
    LogOut,
    Bell,
    Menu as MenuIcon,
    Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useMenux } from '../../context/MenuxContext';

export default function Sidebar() {
    const { role, isSidebarOpen, toggleSidebar } = useMenux();

    const managerLinks = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/analytics', icon: BarChart3, label: 'Analytics' },
        { to: '/intelligence', icon: Sparkles, label: 'Menux Intelligence' },
        { to: '/menu', icon: UtensilsCrossed, label: 'Cardápio' },
        { to: '/orders', icon: ShoppingBag, label: 'Pedidos' },
        { to: '/users', icon: Users, label: 'Usuários' },
        { to: '/settings', icon: Settings, label: 'Configurações' },
    ];

    const waiterLinks = [
        { to: '/orders', icon: ShoppingBag, label: 'Pedidos' },
    ];

    const links = role === 'manager' ? managerLinks : waiterLinks;

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
            !isSidebarOpen && "-translate-x-full"
        )}>
            {/* Logo */}
            <div className="h-[72px] shrink-0 flex items-center justify-center border-b border-transparent">
                <img src="/logo-menux.svg" alt="Menux" className="h-6 w-auto" />
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-[16px] text-sm font-medium transition-all duration-200",
                            isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <link.icon className="h-5 w-5" strokeWidth={2} />
                        {link.label}
                    </NavLink>
                ))}
            </nav>


        </aside>
    );
}
