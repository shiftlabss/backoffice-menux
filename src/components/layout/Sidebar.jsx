import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
    Sparkles,
    ChevronLeft,
    ChevronRight,
    PanelLeft,
    TrendingUp,

    FileText,
    User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useMenux } from '../../context/MenuxContext';

export default function Sidebar() {
    const { role, isSidebarOpen, toggleSidebar, isSidebarCollapsed, toggleSidebarCollapse } = useMenux();
    const location = useLocation();

    const managerLinksGeneral = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/orders', icon: ShoppingBag, label: 'Pedidos' },
    ];

    const managerLinksIntelligence = [
        { to: '/intelligence', icon: Sparkles, label: 'Maestro' },
        { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    ];

    const managerLinksManagement = [
        { to: '/customers/list', icon: User, label: 'Clientes' },
        { to: '/menu', icon: UtensilsCrossed, label: 'Cardápio' },
        { to: '/menu/upsell', icon: TrendingUp, label: 'Upsell' },
        { to: '/users', icon: Users, label: 'Usuários' },

        { to: '/settings', icon: Settings, label: 'Configurações' },
    ];

    // Simple store mock
    const currentStore = { name: 'Restaurante Exemplo', logo: '/icon-menux.svg' };

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[49] lg:hidden backdrop-blur-sm"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={cn(
                "fixed z-50 bg-white group/sidebar flex flex-col",
                "top-4 left-4 bottom-4 border border-border rounded-[25px] shadow-sm",
                // Mobile: default hidden (-translate), lg: always visible (translate-0 logic handled by layout spacing)
                !isSidebarOpen && "-translate-x-[150%] lg:translate-x-0",
                isSidebarCollapsed ? "w-20" : "w-[260px]"
            )}>
                {/* Floating Toggle Button */}
                <button
                    onClick={toggleSidebarCollapse}
                    className="absolute -right-3 top-9 bg-white border border-border text-primary rounded-full p-1 shadow-md hover:bg-gray-50 z-50 h-6 w-6 flex items-center justify-center"
                >
                    {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* Header: Logo */}
                <div className={cn(
                    "h-16 shrink-0 flex items-center px-4 mt-2",
                    isSidebarCollapsed ? "justify-center" : "justify-between"
                )}>
                    <div className={cn("flex items-center gap-2 overflow-hidden", isSidebarCollapsed && "hidden")}>
                        <img src="/logo-menux.svg" alt="Menux" className="h-7 w-auto" />
                    </div>
                    {isSidebarCollapsed && (
                        <img src="/icon-menux.svg" alt="Menux" className="h-8 w-8" />
                    )}
                </div>

                {/* Restaurant Selector (Stores) */}
                <div className={cn("px-4 mb-2", isSidebarCollapsed && "px-2")}>
                    <button className={cn(
                        "w-full flex items-center gap-3 p-2 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white",
                        isSidebarCollapsed && "justify-center aspect-square p-0"
                    )}>
                        <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold">R</span>
                        </div>
                        {!isSidebarCollapsed && (
                            <>
                                <div className="flex-1 text-left min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate">Restaurante</p>
                                </div>
                                <ChevronRight size={16} className="text-gray-400 rotate-90" />
                            </>
                        )}
                    </button>
                </div>

                {/* Navigation Groups */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6">

                    {/* General Group */}
                    <div className="space-y-1">
                        {!isSidebarCollapsed && (
                            <p className="px-2 text-xs font-medium text-gray-400 mb-2">Geral</p>
                        )}
                        {managerLinksGeneral.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 p-2.5 rounded-xl group",
                                    isActive
                                        ? "text-gray-900 font-bold bg-transparent"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
                                    isSidebarCollapsed && "justify-center aspect-square px-0"
                                )}
                                title={isSidebarCollapsed ? link.label : undefined}
                            >
                                {({ isActive }) => (
                                    <>
                                        <link.icon
                                            size={22}
                                            strokeWidth={isActive ? 2.5 : 2}
                                            className={cn(isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900")}
                                        />
                                        {!isSidebarCollapsed && (
                                            <span className="text-sm truncate">{link.label}</span>
                                        )}
                                        {!isSidebarCollapsed && link.label === "Pedidos" && (
                                            <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-bold px-1.5 py-0.5 rounded-md border border-gray-200">2</span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Intelligence Group */}
                    <div className="space-y-1">
                        {!isSidebarCollapsed && (
                            <p className="px-2 text-xs font-medium text-gray-400 mb-2">Menux Intelligence</p>
                        )}
                        {managerLinksIntelligence.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 p-2.5 rounded-xl group",
                                    isActive
                                        ? "text-gray-900 font-bold bg-transparent"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
                                    isSidebarCollapsed && "justify-center aspect-square px-0"
                                )}
                                title={isSidebarCollapsed ? link.label : undefined}
                            >
                                {({ isActive }) => (
                                    <>
                                        <link.icon
                                            size={22}
                                            strokeWidth={isActive ? 2.5 : 2}
                                            className={cn(isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900")}
                                        />
                                        {!isSidebarCollapsed && (
                                            <span className="text-sm truncate">{link.label}</span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Management Group */}
                    <div className="space-y-1">
                        {!isSidebarCollapsed && (
                            <p className="px-2 text-xs font-medium text-gray-400 mb-2">Gestão</p>
                        )}
                        {managerLinksManagement.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => {
                                    // Custom active logic:
                                    // 'Menu' should NOT be active if we are on 'Upsell' route
                                    let active = isActive;
                                    if (link.to === '/menu' && location.pathname.startsWith('/menu/upsell')) {
                                        active = false;
                                    }

                                    return cn(
                                        "flex items-center gap-3 p-2.5 rounded-xl group",
                                        active
                                            ? "text-gray-900 font-bold bg-transparent"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
                                        isSidebarCollapsed && "justify-center aspect-square px-0"
                                    );
                                }}
                                title={isSidebarCollapsed ? link.label : undefined}
                            >
                                {({ isActive }) => {
                                    // We need to recalculate active inside children render prop as well for icon styling
                                    // Or reuse the active state if we could.
                                    // Since we can't easily pass state down from className to children here without context or ref refactoring, 
                                    // we will duplicate the logic or trust the parent style. 
                                    // HOWEVER, the icon also changes style.

                                    let active = isActive;
                                    if (link.to === '/menu' && location.pathname.startsWith('/menu/upsell')) {
                                        active = false;
                                    }

                                    return (
                                        <>
                                            <link.icon
                                                size={22}
                                                strokeWidth={active ? 2.5 : 2}
                                                className={cn(active ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900")}
                                            />
                                            {!isSidebarCollapsed && (
                                                <span className="text-sm truncate">{link.label}</span>
                                            )}
                                        </>
                                    );
                                }}
                            </NavLink>
                        ))}
                    </div>

                </div>

                {/* Footer Toggle (Only when collapsed to expand back) */}
                {isSidebarCollapsed && (
                    <div className="p-2 border-t border-border mt-auto">
                        <button
                            onClick={toggleSidebarCollapse}
                            className="w-full flex items-center justify-center p-2 hover:bg-gray-50 rounded-xl text-gray-500"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}
