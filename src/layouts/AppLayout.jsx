
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PrimarySidebar from '../components/layout/PrimarySidebar';
import SecondarySidebar from '../components/layout/SecondarySidebar';
import { useMenux } from '../context/MenuxContext';
import { getMenuByPath } from '../config/navigation';
import { Menu as MenuIcon, Bell, Search, ChevronRight } from 'lucide-react';
import Maestro from '../components/Maestro';

export default function AppLayout() {
    const location = useLocation();
    const { role, isIAPanelOpen, toggleSidebar } = useMenux();

    // Determine if secondary sidebar is active
    const activeMenu = getMenuByPath(location.pathname, role);
    const showSecondary = activeMenu && activeMenu.submenus && activeMenu.submenus.length > 0;

    // Find active submenu label for breadcrumb
    const activeSubmenu = activeMenu?.submenus?.find(sub =>
        location.pathname === sub.path || location.pathname.startsWith(sub.path) && sub.path !== activeMenu.path
    );

    return (
        <div className="min-h-screen bg-[var(--background)] font-sans flex text-[var(--foreground)] selection:bg-primary/10">
            {/* Primary Navigation (Fixed Left) */}
            <div className="hidden lg:block">
                <PrimarySidebar />
            </div>

            {/* Secondary Navigation (Fixed Left + 80px) */}
            {showSecondary && (
                <div className="hidden lg:block">
                    <SecondarySidebar />
                </div>
            )}

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative
                ${showSecondary ? 'lg:ml-[320px]' : 'lg:ml-[80px]'}
                ${isIAPanelOpen ? 'xl:mr-96' : ''}
            `}>

                {/* Header (Desktop & Mobile) */}
                <header className="h-[72px] bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between px-6 sticky top-0 z-30 transition-all">
                    <div className="flex items-center gap-4">
                        {/* Mobile Toggle */}
                        <button onClick={toggleSidebar} className="lg:hidden p-2 -ml-2 text-foreground/70 hover:text-foreground">
                            <MenuIcon className="h-6 w-6" />
                        </button>

                        {/* Breadcrumbs / Page Title */}
                        {activeMenu && (
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <span className="text-muted-foreground">{activeMenu.label}</span>
                                {activeSubmenu && (
                                    <>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                                        <span className="text-foreground">{activeSubmenu.label}</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar (Visual only for now) */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-[var(--input)] rounded-full border border-transparent focus-within:border-[var(--primary)] transition-all w-64">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-full">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-[var(--background)]" />
                        </button>
                    </div>
                </header>

                {/* Content Outlet */}
                <main className="flex-1 p-6 lg:p-8 animate-fadeIn overflow-y-auto">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* AI Panel (Right Side) */}
            <Maestro />
        </div>
    );
}
