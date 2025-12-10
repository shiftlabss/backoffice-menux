import React, { createContext, useContext, useState } from 'react';

const MenuxContext = createContext();

export function MenuxProvider({ children }) {
    // Role: 'manager' | 'waiter'
    const [role, setRole] = useState('manager');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isIAPanelOpen, setIsIAPanelOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleRole = () => setRole(prev => prev === 'manager' ? 'waiter' : 'manager');
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const toggleSidebarCollapse = () => setIsSidebarCollapsed(prev => !prev);
    const toggleIAPanel = () => setIsIAPanelOpen(prev => !prev);

    return (
        <MenuxContext.Provider value={{
            role,
            setRole,
            toggleRole,
            isSidebarOpen,
            toggleSidebar,
            isSidebarCollapsed,
            toggleSidebarCollapse,
            isIAPanelOpen,
            toggleIAPanel
        }}>
            {children}
        </MenuxContext.Provider>
    );
}

export function useMenux() {
    const context = useContext(MenuxContext);
    if (!context) {
        throw new Error('useMenux must be used within a MenuxProvider');
    }
    return context;
}
