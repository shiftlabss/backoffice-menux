import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Clock, CheckCircle2, AlertCircle, LayoutList, Kanban as KanbanIcon, ShoppingBag, X, Layout } from 'lucide-react';
import OrdersKanban from './orders/OrdersKanban';
import OrderDetailsModal from './orders/OrderDetailsModal';
import TableMap from './orders/TableMap';
import ModuleLayout from '../components/layout/ModuleLayout';
import { Skeleton } from '../components/ui/Skeleton';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';

import { useOrders, useOrderStats } from '../hooks/useOrders';
import { useAudit } from '../hooks/useAudit';

export default function Orders() {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'
    const [activeTab, setActiveTab] = useState('map'); // 'map' | 'orders'
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    // Connect to Data Layer
    const { orders, isLoading, updateOrderStatus } = useOrders();
    const stats = useOrderStats(orders);
    const { log } = useAudit();

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
        log('orders.details.open', { orderId: order.id });
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
        if (newStatus === 'finished') setIsModalOpen(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'preparing': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'ready': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'Pendente';
            case 'preparing': return 'Preparando';
            case 'ready': return 'Pronto';
            default: return status;
        }
    };

    const filteredOrders = orders.filter(o => {
        const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
        const matchesTable = !selectedTable || o.table === selectedTable;
        return matchesStatus && matchesTable;
    });

    return (
        <ModuleLayout
            title="Pedidos"
            subtitle="Gerencie os pedidos em tempo real da sua operação."
        >
            <div className="space-y-6 animate-in fade-in">

                {/* TABS NAVIGATION */}
                <div className="flex justify-start"> {/* Left aligned or center? User image shows it inside a big bar, but let's start with a pill container */}
                    <div className="bg-slate-100/80 p-1.5 rounded-full inline-flex items-center gap-1 border border-slate-200/50">
                        <button
                            onClick={() => setActiveTab('map')}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2",
                                activeTab === 'map'
                                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                            )}
                        >
                            <Layout size={16} />
                            Mapa de Mesas
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2",
                                activeTab === 'orders'
                                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                            )}
                        >
                            <LayoutList size={16} />
                            Pedidos
                        </button>
                    </div>
                </div>

                {/* --- TAB CONTENT: MAPA --- */}
                {activeTab === 'map' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <TableMap
                            orders={orders}
                            selectedTable={selectedTable}
                            onTableSelect={(tableId) => {
                                setSelectedTable(tableId);
                                // Prevent auto-switch to keep map/drawer visible
                                // if (tableId) setActiveTab('orders'); 
                            }}
                        />
                    </div>
                )}

                {/* --- TAB CONTENT: PEDIDOS --- */}
                {activeTab === 'orders' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Quick Filters + View Toggles (Moved inside Pedidos tab) */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                            <div className="flex gap-2 overflow-x-auto">
                                {[
                                    { id: 'all', label: 'Todos' },
                                    { id: 'pending', label: 'Pendentes', icon: AlertCircle },
                                    { id: 'preparing', label: 'Em Preparo', icon: Clock },
                                    { id: 'ready', label: 'Prontos', icon: CheckCircle2 }
                                ].map(filter => (
                                    <button
                                        key={filter.id}
                                        onClick={() => setFilterStatus(filter.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${filterStatus === filter.id
                                            ? 'bg-gray-900 text-white border-gray-900'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {filter.icon && <filter.icon size={16} />}
                                        {filter.label}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-gray-100 p-1 rounded-lg flex items-center self-start sm:self-auto">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                                    title="Lista"
                                >
                                    <LayoutList size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('kanban')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'kanban' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                                    title="Kanban"
                                >
                                    <KanbanIcon size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Active Filters Pill (Context of Map Selection) */}
                        {selectedTable && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                                <span className="text-sm text-gray-500">Filtrando por:</span>
                                <div className="flex items-center gap-1 pl-3 pr-2 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                    {selectedTable}
                                    <button
                                        onClick={() => setSelectedTable(null)}
                                        className="p-0.5 hover:bg-indigo-100 rounded-full transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        {viewMode === 'list' ? (
                            /* List View */
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Pedido</th>
                                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Itens</th>
                                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Total</th>
                                            <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {isLoading ? (
                                            [1, 2, 3, 4, 5].map(i => (
                                                <tr key={i}>
                                                    <td className="py-4 px-6"><Skeleton className="h-10 w-full" /></td>
                                                    <td className="py-4 px-6"><Skeleton className="h-6 w-20" /></td>
                                                    <td className="py-4 px-6"><Skeleton className="h-6 w-16" /></td>
                                                    <td className="py-4 px-6"><Skeleton className="h-6 w-16" /></td>
                                                    <td className="py-4 px-6 text-right"><Skeleton className="h-8 w-8 ml-auto" /></td>
                                                </tr>
                                            ))
                                        ) : filteredOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                                            <ShoppingBag size={20} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-gray-900">#{order.id.toString().slice(0, 8)}</span>
                                                            <span className="text-sm text-gray-500">{order.table_number || 'Sem mesa'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                        {getStatusLabel(order.status)}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-gray-600">{order.items?.length || 0} itens</td>
                                                <td className="py-4 px-6 font-medium text-gray-900">
                                                    {typeof order.total_amount === 'number'
                                                        ? `R$ ${order.total_amount.toFixed(2).replace('.', ',')}`
                                                        : order.total_amount}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => handleViewOrder(order)}
                                                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            /* Kanban View */
                            <OrdersKanban
                                orders={filteredOrders}
                                onViewOrder={handleViewOrder}
                                onUpdateStatus={handleUpdateStatus}
                            />
                        )}
                    </div>
                )}

                <OrderDetailsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    order={selectedOrder}
                    onUpdateStatus={handleUpdateStatus}
                />
            </div>
        </ModuleLayout>
    );
}
