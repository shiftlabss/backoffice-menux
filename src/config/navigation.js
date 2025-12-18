
import {
    LayoutDashboard,
    Users,
    UtensilsCrossed,
    ShoppingBag,
    BarChart3,
    Settings,
    Store
} from "lucide-react";

export const navigationConfig = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
        roles: ['manager'],
        submenus: [
            { label: "Visão Geral", path: "/" },
            { label: "Alertas", path: "/dashboard/alerts" },
            { label: "Atividade Recente", path: "/dashboard/activity" }
        ],
    },
    {
        id: "restaurants",
        label: "Restaurantes",
        icon: Store,
        path: "/restaurants",
        roles: ['manager'],
        submenus: [
            { label: "Todas as Unidades", path: "/restaurants" },
            { label: "Nova Unidade", path: "/restaurants/new" }
        ],
    },
    {
        id: "users",
        label: "Usuários",
        icon: Users,
        path: "/users",
        roles: ['manager'],
        submenus: [
            { label: "Todos os Usuários", path: "/users" },
            { label: "Grupos de Acesso", path: "/users/groups" },
            { label: "Permissões", path: "/users/permissions" },
            { label: "Activity Log", path: "/users/logs" }
        ],
    },
    {
        id: "menu",
        label: "Cardápio",
        icon: UtensilsCrossed,
        path: "/menu",
        roles: ['manager'],
        submenus: [
            { label: "Visão Geral", path: "/menu" },
            { label: "Insights IA", path: "/menu/insights" },
            { label: "Categorias", path: "/menu/categories" },
            { label: "Produtos", path: "/menu/products" },
            { label: "Carta de Vinhos", path: "/menu/wine-list" },
            { label: "Disponibilidade", path: "/menu/availability" }
        ],
    },
    {
        id: "orders",
        label: "Pedidos",
        icon: ShoppingBag,
        path: "/orders",
        roles: ['manager', 'waiter'],
        submenus: [
            { label: "Mesa", path: "/orders" }, // Taking /orders as base
            { label: "Balcão", path: "/orders/counter" },
            { label: "Delivery", path: "/orders/delivery" },
            { label: "Histórico", path: "/orders/history" }
        ],
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        path: "/analytics",
        roles: ['manager'],
        submenus: [
            { label: "Vendas", path: "/analytics" },
            { label: "Performance de Produtos", path: "/analytics/products" },
            { label: "Clientes", path: "/analytics/customers" },
        ],
    },
    {
        id: "settings",
        label: "Configurações",
        icon: Settings,
        path: "/settings",
        roles: ['manager'],
        submenus: [
            { label: "Geral", path: "/settings" },
            { label: "Restaurante", path: "/settings/restaurant" },
            { label: "Integrações", path: "/settings/integrations" },
            { label: "Faturamento", path: "/settings/billing" },
        ],
    },
];

export const getMenuByPath = (pathname, role = 'manager') => {
    // Find the primary menu that matches the start of the pathname
    const primary = navigationConfig.find(item =>
        (pathname === "/" && item.path === "/") ||
        (item.path !== "/" && pathname.startsWith(item.path))
    );

    // Check role access
    if (primary && primary.roles && !primary.roles.includes(role)) {
        return null;
    }

    return primary;
};
