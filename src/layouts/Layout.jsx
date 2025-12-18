
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Maestro from '../components/Maestro';
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

                {/* Mobile Header Trigger - Removed to avoid duplication with ModuleLayout */}
                {/* <div className="lg:hidden p-4 flex items-center gap-4 bg-white border-b border-border">
                    <button onClick={toggleSidebar} className="p-2 -ml-2 text-gray-600">
                        <Menu size={24} />
                    </button>
                    <img src="/logo-menux.svg" alt="Menux" className="h-6 w-auto" />
                </div> */}

                <main className="flex-1 h-screen overflow-hidden flex flex-col">
                    <Outlet />
                </main>
            </div>

            <Maestro />
        </div>
    );
}
