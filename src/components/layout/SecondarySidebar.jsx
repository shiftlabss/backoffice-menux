
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMenux } from '../../context/MenuxContext';
import { getMenuByPath } from '../../config/navigation';
import { cn } from '../../lib/utils';
import { ChevronRight } from 'lucide-react';

export default function SecondarySidebar() {
    const location = useLocation();
    const { role } = useMenux();

    const activeMenu = getMenuByPath(location.pathname, role);

    if (!activeMenu || !activeMenu.submenus || activeMenu.submenus.length === 0) {
        return null; // Or return a placeholder if layout demands rigid spacing
    }

    return (
        <aside className="w-[240px] bg-[var(--background)]/50 backdrop-blur-xl border-r border-[var(--border)] h-screen fixed left-[80px] top-0 z-40 flex flex-col pt-8 pb-4 transition-all duration-300">
            {/* Header / Title of the Section */}
            <div className="px-6 mb-8 mt-2">
                <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
                    {/* Optional: Icon again? Or just text. Text is cleaner. */}
                    {activeMenu.label}
                </h2>
                <p className="text-xs text-muted-foreground mt-1 font-medium opacity-80">
                    Gerenciamento
                </p>
            </div>

            {/* Submenu List */}
            <nav className="flex-1 overflow-y-auto px-4 space-y-1">
                {activeMenu.submenus.map((sub, index) => (
                    <NavLink
                        key={sub.path + index}
                        to={sub.path}
                        end={sub.path === activeMenu.path} // Handle exact match for root of the submenu
                        className={({ isActive }) => cn(
                            "flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                            isActive
                                ? "bg-white shadow-sm text-primary border border-border/50"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                    >
                        <span>{sub.label}</span>
                        {/* Optional Chevron for styling */}
                        {/* <ChevronRight className={cn("w-3 h-3 transition-transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0", isActive && "opacity-100 translate-x-0")} /> */}
                    </NavLink>
                ))}
            </nav>

            {/* Footer or Info area if needed */}
            <div className="p-4 text-[10px] text-muted-foreground text-center opacity-40">
                Menux Workspace v2.0
            </div>
        </aside>
    );
}
