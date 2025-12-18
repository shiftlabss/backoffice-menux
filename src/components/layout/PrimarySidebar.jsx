
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMenux } from '../../context/MenuxContext';
import { navigationConfig } from '../../config/navigation';
import { cn } from '../../lib/utils';
import { LogOut } from 'lucide-react';

export default function PrimarySidebar() {
    const { role } = useMenux();
    const location = useLocation();

    const allowedNav = navigationConfig.filter(item => !item.roles || item.roles.includes(role));

    return (
        <aside className="w-[80px] flex flex-col items-center bg-white border-r border-[var(--border)] py-6 z-50 h-screen fixed left-0 top-0 shadow-sm transition-all duration-300">
            {/* Logo */}
            <div className="mb-8 p-2 flex items-center justify-center h-16 w-full">
                <img src="/logo-menux.svg" alt="Menux" className="h-10 w-auto object-contain" />
            </div>

            {/* Navigation Icons */}
            <nav className="flex-1 w-full flex flex-col items-center gap-4 px-2">
                {allowedNav.map((item) => {
                    const isActive =
                        (item.path === "/" && location.pathname === "/") ||
                        (item.path !== "/" && location.pathname.startsWith(item.path));

                    return (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={cn(
                                "w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 relative group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105"
                            )}
                        >
                            <item.icon className="w-6 h-6" strokeWidth={1.5} />

                            {/* Tooltip on Hover */}
                            <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60]">
                                {item.label}
                            </div>
                        </NavLink>
                    );
                })}
            </nav>

            {/* User / Bottom Actions */}
            <div className="mt-auto flex flex-col gap-4 w-full items-center px-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer border border-transparent hover:border-primary/20">
                    {role === 'manager' ? 'A' : 'G'}
                </div>
            </div>
        </aside>
    );
}
