import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Users, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';

export default function UsersSidebar() {
    const location = useLocation();

    const navItems = [
        {
            path: '/users/list',
            label: 'Usuários',
            icon: Users,
            desc: 'Gerencie sua equipe'
        },
        {
            path: '/users/roles',
            label: 'Perfil',
            icon: ShieldCheck,
            desc: 'Funções e Permissões'
        }
    ];

    return (
        <aside className="w-full md:w-64 flex flex-col gap-4">
            <Card className="p-2 border-border flex flex-row md:flex-col gap-1 bg-white shadow-sm overflow-x-auto md:overflow-visible sticky top-24 md:top-auto z-10">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 min-w-[140px] md:min-w-0 ${isActive
                                    ? 'bg-[#121212] text-white shadow-md'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                        >
                            <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/10' : 'bg-transparent'}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold leading-tight">{item.label}</span>
                                <span className={`text-[10px] hidden md:block ${isActive ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                                    {item.desc}
                                </span>
                            </div>
                        </NavLink>
                    );
                })}
            </Card>
        </aside>
    );
}
