import React from 'react';
import { Outlet } from 'react-router-dom';
import { Users, Shield } from 'lucide-react';
import ModuleLayout from '../components/layout/ModuleLayout';
import { SecondaryNavigation } from '../components/ui/SecondaryNavigation';

export default function UsersLayout() {
    const navItems = [
        { label: 'Usuários', to: '/users/list', icon: Users },
        { label: 'Funções e Permissões', to: '/users/roles', icon: Shield },
    ];

    return (
        <ModuleLayout
            title="Usuários e Equipe"
            subtitle="Gerencie o acesso ao sistema."
            items={null}
        >
            <div className="mb-6">
                <SecondaryNavigation items={navItems} />
            </div>
            <Outlet />
        </ModuleLayout>
    );
}

