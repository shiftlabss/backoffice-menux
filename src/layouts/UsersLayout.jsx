import React from 'react';
import { Outlet } from 'react-router-dom';
import UsersSidebar from '../components/users/UsersSidebar';

export default function UsersLayout() {
    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 min-h-full">
            <UsersSidebar />
            <main className="flex-1 min-w-0">
                <Outlet />
            </main>
        </div>
    );
}
