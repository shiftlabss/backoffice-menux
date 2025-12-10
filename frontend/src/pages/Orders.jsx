import React, { useState } from 'react';
import { Search, Filter, Eye, Clock, CheckCircle2, AlertCircle, LayoutList, Kanban as KanbanIcon, ShoppingBag } from 'lucide-react';
import OrdersKanban from './orders/OrdersKanban';
import OrderDetailsModal from './orders/OrderDetailsModal';
import ModuleLayout from '../components/layout/ModuleLayout';

export default function Orders() {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock data
    const [orders, setOrders] = useState([
        {
            id: '#1234',
            table: 'Mesa 05',
            items: 3,
            total: 'R$ 145,90',
            status: 'pending',
            time: '5 min',
            itemsList: [
                { name: 'Filé Mignon ao Molho Madeira', quantity: 1 },
                { name: 'Coca-Cola', quantity: 2 }
            ]
        },
        {
            id: '#1233',
            table: 'Mesa 02',
            items: 1,
            total: 'R$ 45,00',
            status: 'preparing',
            time: '12 min',
            itemsList: [
                { name: 'Hambúrguer Artesanal', quantity: 1 }
            ]
        },
        {
            id: '#1232',
            table: 'Delivery',
            items: 5,
            total: 'R$ 210,50',
            status: 'ready',
            time: '25 min',
            itemsList: [
                { name: 'Pizza Grande Calabresa', quantity: 1 },
                { name: 'Guaraná 2L', quantity: 1 },
                { name: 'Borda Recheada', quantity: 1 }
            ]
        },
        {
            id: '#1240',
            table: 'Mesa 10',
            items: 2,
            total: 'R$ 89,00',
            status: 'pending',
            time: '2 min',
            itemsList: [
                { name: 'Risoto de Camarão', quantity: 1 },
                { name: 'Suco de Laranja', quantity: 1 }
            ]
        },
        {
            id: '#1241',
            table: 'Mesa 08',
            items: 4,
            total: 'R$ 320,00',
            status: 'preparing',
            time: '15 min',
            itemsList: [
                { name: 'Picanha na Chapa', quantity: 1 },
                { name: 'Arroz Piamontese', quantity: 1 },
                { name: 'Batata Frita', quantity: 2 }
            ]
        },
    ]);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        setSelectedOrder(prev => prev && prev.id === orderId ? { ...prev, status: newStatus } : prev);

        const labels = { pending: 'Pendente', preparing: 'Em Preparo', ready: 'Pronto', finished: 'Finalizado' };
        toast.success(`Pedido ${orderId} movido para ${labels[newStatus]}`);

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

    const filteredOrders = filterStatus === 'all'
        ? orders
        : orders.filter(o => o.status === filterStatus);

    return (
        <ModuleLayout
            title="Pedidos"
            subtitle="Gerencie os pedidos em tempo real da sua operação."
            actions={
                <div className="bg-gray-100 p-1 rounded-lg flex items-center">
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
            }
        >
            <div className="space-y-6 animate-in fade-in">
                {/* Quick Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
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
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <ShoppingBag size={20} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">{order.id}</span>
                                                    <span className="text-sm text-gray-500">{order.table}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600">{order.items} itens</td>
                                        <td className="py-4 px-6 font-medium text-gray-900">{order.total}</td>
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
                    <OrdersKanban orders={filteredOrders} onViewOrder={handleViewOrder} />
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
