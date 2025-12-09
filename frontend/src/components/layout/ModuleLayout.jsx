
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Menu, User, Settings, LogOut, Briefcase, Utensils, ChevronDown } from 'lucide-react';
import { useMenux } from '../../context/MenuxContext';
import NotificationsPopover from './NotificationsPopover';

export default function ModuleLayout({ title, subtitle, items, children, actions }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { toggleSidebar, role, toggleRole } = useMenux();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'info' | 'error' }

    // Helper to show toast
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };



    const handleProfileNavigation = (path) => {
        setIsProfileOpen(false);
        showToast(`Navegando para ${path}...`, 'info');
        // navigate(path);
    };

    const handleLogout = () => {
        setIsProfileOpen(false);
        setToast({ message: 'Encerrando sessão...', type: 'info' });
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative">

            {/* Simple Toast Notification */}
            {toast && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className={cn(
                        "text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2",
                        toast.type === 'error' ? "bg-red-600" : "bg-primary"
                    )}>
                        <span className={cn(
                            "w-2 h-2 rounded-full animate-pulse",
                            toast.type === 'error' ? "bg-white" : "bg-green-400"
                        )}></span>
                        {toast.message}
                    </div>
                </div>
            )}

            {/* Header / Title Area */}
            <header className="px-4 sm:px-8 py-4 sm:py-6 flex flex-col md:flex-row items-start md:items-center justify-between shrink-0 gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button onClick={toggleSidebar} className="lg:hidden p-2 -ml-2 text-muted-foreground" aria-label="Abrir menu">
                        <Menu className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{title}</h1>
                        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
                    </div>
                </div>

                <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-xl md:bg-transparent md:p-0 w-full md:w-auto overflow-x-auto md:overflow-visible items-center gap-2 sm:gap-4 no-scrollbar">

                    {/* Actions Prop (Date Filter, etc) */}
                    {actions && <div className="shrink-0">{actions}</div>}



                    {/* Notifications */}
                    <NotificationsPopover />

                    {/* Profile Dropdown */}
                    <div className="relative shrink-0">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            aria-label="Menu do usuário"
                            aria-expanded={isProfileOpen}
                            className="flex items-center gap-2 pl-1 pr-2 py-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-sm">
                                {role === 'manager' ? 'A' : 'G'}
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-xs font-bold text-foreground leading-none">Admin</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">Restaurante Exemplo</p>
                            </div>
                            <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        </button>

                        {isProfileOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-border p-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-3 py-2 border-b border-muted mb-1">
                                        <p className="text-sm font-bold text-foreground">Fernando Calado</p>
                                        <p className="text-xs text-muted-foreground">admin@menux.com.br</p>
                                    </div>
                                    <button onClick={() => handleProfileNavigation('/profile')} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground rounded-xl transition-colors">
                                        <User className="w-4 h-4" /> Meu Perfil
                                    </button>
                                    <button onClick={() => handleProfileNavigation('/settings')} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground rounded-xl transition-colors">
                                        <Settings className="w-4 h-4" /> Configurações
                                    </button>
                                    <div className="h-px bg-muted my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" /> Sair
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Content Body */}
            <div className="flex-1 flex px-8 pb-8 gap-8 min-h-0 overflow-hidden">
                {/* Secondary Sidebar (Optional) */}
                {items && items.length > 0 && (
                    <aside className="w-[280px] shrink-0 overflow-y-auto hidden lg:block">
                        <div className="bg-white rounded-[20px] shadow-sm shadow-black/5 p-2 space-y-1">
                            {items.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.isActive !== undefined
                                    ? item.isActive
                                    : (item.to
                                        ? (item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to))
                                        : false);

                                return (
                                    <NavLink
                                        key={item.label}
                                        to={item.to || '#'}
                                        onClick={(e) => {
                                            if (!item.to) e.preventDefault();
                                            if (item.onClick) item.onClick();
                                        }}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary text-white shadow-md shadow-black/10"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        {Icon && <Icon className="h-4 w-4" />}
                                        {item.label}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </aside>
                )}

                {/* Main View Area */}
                <main className={cn(
                    "flex-1 bg-white rounded-[20px] shadow-sm shadow-black/5 overflow-y-auto p-6 lg:p-10",
                    !items && "ml-0" // If no sidebar, content is full width
                )}>
                    {children}
                </main>
            </div>
        </div>
    );
}
