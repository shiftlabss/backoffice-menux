import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, BookOpenIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';

const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Pedidos', href: '/orders', icon: ClipboardDocumentListIcon },
    { name: 'Menu', href: '/menu', icon: BookOpenIcon },
    { name: 'Dados', href: '/analytics', icon: ChartBarIcon },
    { name: 'Config', href: '/settings', icon: Cog6ToothIcon },
];

export default function BottomNav() {
    const location = useLocation();

    return (
        <div className="fixed bottom-0 w-full max-w-[480px] bg-surface border-t border-border pb-safe">
            <nav className="flex justify-around items-center h-16 px-2">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="flex flex-col items-center justify-center w-full h-full space-y-1"
                        >
                            <item.icon
                                className={cn(
                                    isActive ? 'text-primary' : 'text-text-tertiary',
                                    'h-6 w-6 transition-colors duration-200'
                                )}
                            />
                            <span className={cn(
                                isActive ? 'text-primary font-medium' : 'text-text-tertiary',
                                'text-[10px] transition-colors duration-200'
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
