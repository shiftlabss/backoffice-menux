import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, LayoutGrid, Clock, Users, AlertTriangle, Filter, Sparkles, AlertCircle, Info, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import IntelligencePanel from './IntelligencePanel';
import TableDetailsPanel from './TableDetailsPanel';
import { useAudit } from '../../hooks/useAudit';
import { cn } from '../../lib/utils';

export default function TableMap({ orders, onTableSelect, selectedTable }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [autoFilter, setAutoFilter] = useState(true);
    const [tables, setTables] = useState([]);

    // Intelligence State
    // Custom Status State (Mocking backend persistence)
    const [customTableStatuses, setCustomTableStatuses] = useState({});

    // Intelligence State
    const [intelligenceEnabled, setIntelligenceEnabled] = useState(true);
    const [suggestions, setSuggestions] = useState({}); // tableId -> []
    const [ignoredSuggestions, setIgnoredSuggestions] = useState({}); // tableId -> timestamp

    // Simulate 12 tables
    const TABLE_COUNT = 12;

    const generateSuggestions = (tableId, timeStr, orderItems, ignored) => {
        const suggs = [];
        const minutes = parseInt(timeStr.replace(' min', '')) || 0;

        // 1. Check for drinks
        const hasDrink = orderItems.some(i => i.name.toLowerCase().includes('coca') || i.name.toLowerCase().includes('suco') || i.name.toLowerCase().includes('vinho') || i.name.toLowerCase().includes('guaraná') || i.name.toLowerCase().includes('água'));

        // Rule: Offer drink if none ordered and time > 5 min
        if (!hasDrink && minutes > 5) {
            suggs.push({
                id: 'offer_drink_initial',
                type: 'drink',
                title: 'Oferecer Bebida',
                reason: 'Mesa sem pedido de bebida há 5 min',
                priority: 'medium',
                items: ['Suco de Laranja', 'Coca-Cola', 'Água com Gás']
            });
        }

        // Rule: Offer refill if drink ordered and time > 15 min (Mock logic for refill)
        if (hasDrink && minutes > 15 && minutes < 60) {
            suggs.push({
                id: 'offer_refill',
                type: 'drink',
                title: 'Oferecer nova rodada',
                reason: 'Última bebida pedida há mais de 15 min',
                priority: 'high',
                items: ['Repetir anteriores', 'Café', 'Novo Drink']
            });
        }

        // 2. Check for Main Course
        const hasMain = orderItems.some(i => i.name.toLowerCase().includes('filé') || i.name.toLowerCase().includes('risoto') || i.name.toLowerCase().includes('picanha') || i.name.toLowerCase().includes('hambúrguer'));

        if (!hasMain && minutes > 12) {
            suggs.push({
                id: 'offer_main',
                type: 'food',
                title: 'Sugerir Prato Principal',
                reason: 'Mesa apenas com entradas/bebidas há 12 min',
                priority: 'high',
                items: ['Picanha na Chapa', 'Filé Mignon', 'Risoto']
            });
        }

        // 3. Dessert Rule (Mock: if time > 30 min)
        if (hasMain && minutes > 30) {
            suggs.push({
                id: 'offer_dessert',
                type: 'dessert',
                title: 'Oferecer Sobremesa',
                reason: 'Prato principal provavelmente finalizado',
                priority: 'low',
                items: ['Petit Gâteau', 'Pudim', 'Café Expresso']
            });
        }

        // Filter out ignored/seen suggestions
        const tableIgnored = ignored[tableId] || [];
        return suggs.filter(s => !tableIgnored.includes(s.id));
    };

    useEffect(() => {
        // Calculate status for each table based on orders AND generate suggestions
        const newTables = Array.from({ length: TABLE_COUNT }, (_, i) => {
            const tableNum = i + 1;
            const tableName = `Mesa ${tableNum}`;

            let tableOrders = orders.filter(o =>
                (o.table_number && o.table_number.toString() === tableName) ||
                (typeof o.table_number === 'number' && o.table_number === tableNum)
            );

            // OVERRIDE CHECK FIRST: If custom status is 'free', act as if there are no orders
            if (customTableStatuses[tableName] === 'free') {
                tableOrders = [];
            }

            const isOccupied = tableOrders.length > 0;
            const totalValue = tableOrders.reduce((sum, order) => {
                return sum + (Number(order.total_amount) || 0);
            }, 0);

            // Determine status
            let status = 'free';
            let time = null;
            let currentSuggestions = [];

            if (isOccupied) {
                status = 'occupied';
                const firstOrderTime = new Date(tableOrders[0].created_at);
                const now = new Date();
                const diffMs = now - firstOrderTime;
                const minutes = Math.floor(diffMs / 60000);
                time = `${minutes} min`;

                if (minutes > 20) status = 'risk';

                // Intelligence Logic
                if (intelligenceEnabled) {
                    const allItems = tableOrders.flatMap(o => o.items || []);
                    currentSuggestions = generateSuggestions(tableName, time, allItems, ignoredSuggestions);
                }
            }

            // OVERRIDE status with custom status if exists (e.g. 'closing', 'closed')
            if (customTableStatuses[tableName] && customTableStatuses[tableName] !== 'free') {
                status = customTableStatuses[tableName];
            }

            return {
                id: tableName,
                number: tableNum,
                name: tableName,
                status,
                time,
                orderCount: tableOrders.length, // Will be 0 if forced free
                totalValue, // Will be 0 if forced free
                suggestions: currentSuggestions,
                highestPriority: currentSuggestions.reduce((highest, curr) => {
                    if (curr.priority === 'high') return 'high';
                    if (curr.priority === 'medium' && highest !== 'high') return 'medium';
                    if (curr.priority === 'low' && highest !== 'high' && highest !== 'medium') return 'low';
                    return highest;
                }, null),
                orders: tableOrders
            };
        });

        setTables(newTables);
    }, [orders, intelligenceEnabled, ignoredSuggestions, customTableStatuses]); // Added customTableStatuses dependency

    const { log } = useAudit(); // Hook for audit logging

    const handleTableClick = (tableId) => {
        // Log the action
        log('orders.tables.open.drawer', { tableId }, `Opened drawer for ${tableId}`);

        if (autoFilter) {
            onTableSelect(tableId === selectedTable ? null : tableId);
        } else {
            onTableSelect(tableId === selectedTable ? null : tableId);
        }
    };

    const handleUpdateTableStatus = (tableId, newStatus) => {
        setCustomTableStatuses(prev => ({
            ...prev,
            [tableId]: newStatus
        }));
    };

    const handleSuggestionAction = (tableId, suggestion) => {
        toast.success(`Sugestão marcada como vista.`);
        // In a real app we would call backend. For now, add to ignored so it disappears
        setIgnoredSuggestions(prev => ({
            ...prev,
            [tableId]: [...(prev[tableId] || []), suggestion.id]
        }));
    };

    const handleSuggestionIgnore = (tableId, suggestion) => {
        toast('Sugestão ignorada por 20 min', { icon: '😴' });
        setIgnoredSuggestions(prev => ({
            ...prev,
            [tableId]: [...(prev[tableId] || []), suggestion.id]
        }));
    };

    const handleMarkTableClosed = (tableId) => {
        setCustomTableStatuses(prev => ({
            ...prev,
            [tableId]: 'closed'
        }));
        log('table.closed', { tableId }, `Table ${tableId} marked as closed`);
    };

    const handleReleaseTable = (tableId) => {
        setCustomTableStatuses(prev => ({
            ...prev,
            [tableId]: 'free'
        }));
        log('table.released', { tableId }, `Table ${tableId} released`);
        // Note: In a real app, backend would clear orders. Here 'free' status override triggers data clearing in useEffect.

        // Also clear ignored suggestions for a fresh start
        setIgnoredSuggestions(prev => {
            const next = { ...prev };
            delete next[tableId];
            return next;
        });
    };

    const StatusChip = ({ label, color, icon: Icon }) => (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-${color}-50 text-${color}-600 border border-${color}-100`}>
            {Icon ? <Icon size={10} className="stroke-[3]" /> : <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500`} />}
            {label}
        </span>
    );

    // Helpers for styles based on priority
    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'high': return {
                // RED - Priority 1 (after closing)
                border: 'border-red-400',
                glow: 'shadow-[0_0_10px_rgba(248,113,113,0.3)]',
                badge: 'bg-red-50 text-red-700 border-red-100',
                balloon: 'bg-red-600 text-white',
                label: 'Alta',
                ring: 'ring-red-500 border-red-500 bg-red-50/20',
                hover: 'hover:border-red-500',
                color: 'red'
            };
            case 'medium': return {
                // ORANGE - Priority 2
                border: 'border-orange-400',
                glow: 'shadow-[0_0_10px_rgba(251,146,60,0.3)]',
                badge: 'bg-orange-50 text-orange-700 border-orange-100',
                balloon: 'bg-orange-500 text-white',
                label: 'Média',
                ring: 'ring-orange-500 border-orange-500 bg-orange-50/20',
                hover: 'hover:border-orange-500',
                color: 'orange'
            };
            default: return null;
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return <AlertTriangle size={10} />;
            case 'medium': return <Zap size={10} />;
            default: return null;
        }
    };

    // Precedence: Closing/Closed > High > Medium > Occupied > Free
    const getTableCardStyles = (status, isSelected, priority) => {
        const base = "relative p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between h-24";
        let styles = `${base} bg-white`;

        // 1. CLOSING / CLOSED (Overrides everything)
        if (status === 'closing' || status === 'closed') {
            styles += " border-purple-400 bg-purple-50 hover:border-purple-500 hover:shadow-md";
            if (isSelected) styles = cn(styles, "ring-2 ring-offset-1 ring-purple-500 border-purple-500 bg-purple-50/20");
            return styles;
        }

        // 2 & 3. PRIORITIES (If not closing and has active suggestion)
        if (priority) {
            const pStyles = getPriorityStyles(priority);
            styles = cn(styles, pStyles.border, pStyles.glow, pStyles.hover, "hover:scale-[1.02]");
            if (isSelected) styles = cn(styles, "ring-2 ring-offset-1", pStyles.ring);
            return styles;
        }

        // 4. OCCUPIED (Blue)
        if (status === 'occupied' || status === 'risk') {
            styles += " border-blue-200 hover:border-blue-400 hover:shadow-md bg-white";
            if (isSelected) styles += " ring-2 ring-offset-1 ring-blue-500 border-blue-500 bg-blue-50/10";
            return styles;
        }

        // 5. FREE (Gray)
        if (status === 'free') {
            styles += " border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200";
            if (isSelected) styles += " ring-2 ring-offset-1 ring-gray-400 border-gray-400";
            return styles;
        }

        return styles;
    };

    const grandTotal = tables.reduce((acc, t) => acc + (t.totalValue || 0), 0);

    return (
        <div className="flex flex-col gap-6 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col lg:flex-row transition-all duration-300 ease-in-out">
                {/* Main Map Content - Flexible Width */}
                <div className={`flex-1 flex flex-col transition-all duration-300 min-w-0`}>
                    <div className="flex-1 overflow-y-auto">
                        {/* Header */}
                        <div
                            className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors gap-4 overflow-x-auto"
                            onClick={(e) => {
                                if (e.target.closest('button') || e.target.closest('.interactive')) return;
                                setIsExpanded(!isExpanded);
                            }}
                        >
                            <div className="flex items-center gap-4 min-w-max">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                    <LayoutGrid size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 whitespace-nowrap">Mapa de Mesas</h3>
                                    <p className="text-xs text-gray-500 whitespace-nowrap">
                                        {tables.filter(t => t.status !== 'free').length} mesas ocupadas
                                    </p>
                                </div>

                                <div className="hidden md:flex items-center gap-2 ml-4 border-l border-gray-200 pl-4">
                                    <StatusChip label="Livre" color="gray" />
                                    <StatusChip label="Ocupada" color="blue" />
                                    <StatusChip label="Média" color="orange" />
                                    <StatusChip label="Alta" color="red" />
                                    <StatusChip label="Encerrando" color="purple" icon={Clock} />
                                    <StatusChip label="Encerrada" color="purple" />
                                </div>
                            </div>

                            <div className="flex flex-col items-end interactive min-w-max">
                                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Valor em Aberto</span>
                                <span className="text-lg font-bold text-gray-900 whitespace-nowrap">R$ {grandTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Grid Content */}
                        {isExpanded && (
                            <div className="p-6 bg-gray-50/50 flex-1 animate-in slide-in-from-top-2 duration-200">
                                <div className={`grid gap-4 ${selectedTable && intelligenceEnabled
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                                    }`}>
                                    {tables.map((table) => {
                                        // Determine effective visual state
                                        const isClosing = table.status === 'closing';
                                        const isClosed = table.status === 'closed';
                                        const priority = (!isClosing && !isClosed) ? table.highestPriority : null;
                                        const pStyles = priority ? getPriorityStyles(priority) : null;

                                        // Aria Label Construction
                                        const statusText = isClosed ? 'Encerrada' : isClosing ? 'Encerrando' : priority ? `Prioridade ${pStyles.label}` : table.status === 'free' ? 'Livre' : 'Ocupada';
                                        const ariaLabel = `Mesa ${table.number}, ${statusText}, total parcial R$ ${table.totalValue.toFixed(2)}, tempo ${table.time || '0 min'}`;

                                        return (
                                            <div
                                                key={table.id}
                                                onClick={() => handleTableClick(table.id)}
                                                role="button"
                                                aria-label={ariaLabel}
                                                tabIndex={0}
                                                onKeyDown={(e) => { if (e.key === 'Enter') handleTableClick(table.id); }}
                                                className={cn(
                                                    getTableCardStyles(table.status, selectedTable === table.id, priority),
                                                    "shadow-sm"
                                                )}
                                            >
                                                {/* Top Row */}
                                                <div className="flex justify-between items-start">
                                                    <div className="relative">
                                                        <span className={cn(
                                                            "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all",
                                                            (isClosing || isClosed) ? 'bg-purple-600 text-white' :
                                                                pStyles ? pStyles.balloon :
                                                                    (table.status === 'free' ? 'text-gray-400 bg-gray-100' :
                                                                        'text-gray-900 bg-gray-100')
                                                        )}>
                                                            {table.number}
                                                        </span>
                                                        {table.status === 'risk' && !priority && !isClosing && !isClosed && (
                                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                                                        )}
                                                    </div>

                                                    {/* Status Chips */}
                                                    {isClosing ? (
                                                        <div className="flex items-center gap-1.5 text-xs text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md font-bold uppercase">
                                                            <span>Encerrando</span>
                                                        </div>
                                                    ) : isClosed ? (
                                                        <div className="flex items-center gap-1.5 text-xs text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md font-bold uppercase">
                                                            <span>Encerrada</span>
                                                        </div>
                                                    ) : pStyles ? (
                                                        <span className={cn(
                                                            "flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border",
                                                            pStyles.badge
                                                        )}>
                                                            {getPriorityIcon(priority)}
                                                            {pStyles.label}
                                                        </span>
                                                    ) : table.status === 'occupied' || table.status === 'risk' ? (
                                                        <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                            <span>Ocupada</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                                            <div className="w-1.5 h-1.5 rounded-full border border-gray-400" />
                                                            <span>Livre</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Bottom Row */}
                                                <div className="mt-auto">
                                                    {table.status === 'free' ? (
                                                        <div className="flex items-center justify-center h-full">
                                                            {/* Empty for clean look or label */}
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-1.5">
                                                            {(isClosing || isClosed) ? (
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-[10px] text-gray-500 font-medium bg-white/50 px-1.5 py-0.5 rounded-md border border-gray-100">
                                                                        {table.orderCount} pedido(s)
                                                                    </span>
                                                                    <span className="text-xs font-bold text-gray-900">
                                                                        R$ {table.totalValue.toFixed(2)}
                                                                    </span>
                                                                </div>
                                                            ) : pStyles ? (
                                                                <div className="flex flex-col">
                                                                    <div className="flex justify-between items-end">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-[10px] text-gray-500 font-medium">Sugestão ativa:</span>
                                                                            <span className="text-xs font-semibold text-gray-900 truncate max-w-[100px]">
                                                                                {table.suggestions[0]?.title}
                                                                            </span>
                                                                        </div>
                                                                        <span className="text-xs font-bold text-gray-900">
                                                                            R$ {table.totalValue.toFixed(2)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="flex items-center gap-1 text-[10px] text-gray-500 font-medium bg-white/50 px-1.5 py-0.5 rounded-md border border-gray-100">
                                                                            <Clock size={10} /> {table.time}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-xs font-bold text-gray-900">
                                                                        R$ {table.totalValue.toFixed(2)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <span className="text-xs text-gray-400 italic">
                                        * As cores das bordas indicam a prioridade da sugestão
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Intelligence Panel (Sidebar) */}
                {
                    isExpanded && selectedTable && intelligenceEnabled && (
                        <IntelligencePanel
                            table={tables.find(t => t.id === selectedTable)}
                            suggestions={tables.find(t => t.id === selectedTable)?.suggestions || []}
                            onAction={handleSuggestionAction}
                            onIgnore={handleSuggestionIgnore}
                            isClosing={tables.find(t => t.id === selectedTable)?.status === 'closing' || tables.find(t => t.id === selectedTable)?.status === 'closed'}
                        />
                    )
                }
            </div>

            {/* Table Details Panel (Bottom - Full Width) */}
            {selectedTable && isExpanded && intelligenceEnabled && (
                <TableDetailsPanel
                    table={tables.find(t => t.id === selectedTable)}
                    onUpdateTableStatus={handleUpdateTableStatus}
                    onMarkAsClosed={handleMarkTableClosed}
                    onReleaseTable={handleReleaseTable}
                />
            )}
        </div>
    );
}
