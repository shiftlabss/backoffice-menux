
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import MenuxIA from '../components/MenuxIA';
import { useMenux } from '../context/MenuxContext';
import { Menu } from 'lucide-react';

export default function Layout() {
    const { toggleSidebar, isIAPanelOpen, isSidebarCollapsed } = useMenux();

    return (
        <div className="min-h-screen bg-gray-50/50 flex">
            {/* Main Sidebar (Left, Fixed) */}
            <Sidebar />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative ${isIAPanelOpen ? 'mr-96' : ''
                } ${isSidebarCollapsed ? 'lg:ml-[112px]' : 'lg:ml-[312px]'
                }`}>
                <main className="flex-1 h-screen overflow-hidden flex flex-col">
                    <Outlet />
                </main>
            </div>

            <MenuxIA />
        </div>
    );
}
