import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, LayoutGrid, Clock, Users, AlertTriangle, Filter, Sparkles, AlertCircle, Info, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import IntelligencePanel from './IntelligencePanel';
import { cn } from '../../lib/utils';

export default function TableMap({ orders, onTableSelect, selectedTable }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [autoFilter, setAutoFilter] = useState(true);
    const [tables, setTables] = useState([]);

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
        const hasDrink = orderItems.some(i => i.name.toLowerCase().includes('coca') || i.name.toLowerCase().includes('suco') || i.name.toLowerCase().includes('vinho') || i.name.toLowerCase().includes('guaraná'));

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
            // Check if ignored recently (simple check)
            if (!ignored[tableId]?.includes('offer_refill')) {
                suggs.push({
                    id: 'offer_refill',
                    type: 'drink',
                    title: 'Oferecer nova rodada',
                    reason: 'Última bebida pedida há mais de 15 min',
                    priority: 'high',
                    items: ['Repetir anteriores', 'Café', 'Novo Drink']
                });
            }
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

        return suggs;
    };

    useEffect(() => {
        // Calculate status for each table based on orders AND generate suggestions
        const newTables = Array.from({ length: TABLE_COUNT }, (_, i) => {
            const tableNum = i + 1;
            const tableName = `Mesa ${tableNum.toString().padStart(2, '0')}`;

            // Find active orders for this table
            const tableOrders = orders.filter(o =>
                o.table === tableName &&
                o.status !== 'ready' &&
                o.status !== 'finished'
            );

            const isOccupied = tableOrders.length > 0;

            // Determine status
            let status = 'free'; // free, occupied, risk
            let time = null;
            let currentSuggestions = [];

            if (isOccupied) {
                status = 'occupied';
                time = tableOrders[0].time; // Use first order time

                const minutes = parseInt(time.replace(' min', '')) || 0;
                if (minutes > 20) status = 'risk';

                // Intelligence Logic
                if (intelligenceEnabled) {
                    const allItems = tableOrders.flatMap(o => o.itemsList || []); // Simplified
                    currentSuggestions = generateSuggestions(tableName, time, allItems, ignoredSuggestions);
                }
            }

            return {
                id: tableName,
                number: tableNum,
                name: tableName,
                status,
                time,
                orderCount: tableOrders.length,
                suggestions: currentSuggestions,
                // Helper to get highest priority
                highestPriority: currentSuggestions.reduce((highest, curr) => {
                    if (curr.priority === 'high') return 'high';
                    if (curr.priority === 'medium' && highest !== 'high') return 'medium';
                    if (curr.priority === 'low' && highest !== 'high' && highest !== 'medium') return 'low';
                    return highest;
                }, null)
            };
        });

        setTables(newTables);
    }, [orders, intelligenceEnabled, ignoredSuggestions]);

    // Responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) setIsExpanded(true);
            else setIsExpanded(false);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTableClick = (tableId) => {
        if (autoFilter) {
            onTableSelect(tableId === selectedTable ? null : tableId);
        } else {
            // If auto-filter is off, maybe just select for intelligence?
            // For now adhering to requirement that selecting table shows intelligence
            onTableSelect(tableId === selectedTable ? null : tableId);
        }
    };

    const handleSuggestionAction = (tableId, suggestion) => {
        toast.success(`Ação "${suggestion.title}" registrada para ${tableId}`);
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

    const StatusChip = ({ label, color }) => (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-${color}-50 text-${color}-600 border border-${color}-100`}>
            <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500`} />
            {label}
        </span>
    );

    // Helpers for styles based on priority
    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'high': return {
                border: 'border-red-400',
                glow: 'shadow-[0_0_10px_rgba(248,113,113,0.3)]',
                badge: 'bg-red-50 text-red-700 border-red-100',
                balloon: 'bg-red-600 text-white',
                label: 'Alta',
                ring: 'ring-red-500 border-red-500 bg-red-50/20',
                hover: 'hover:border-red-500'
            };
            case 'medium': return {
                border: 'border-amber-400',
                glow: 'shadow-[0_0_10px_rgba(251,191,36,0.3)]',
                badge: 'bg-amber-50 text-amber-700 border-amber-100',
                balloon: 'bg-amber-500 text-white',
                label: 'Média',
                ring: 'ring-amber-500 border-amber-500 bg-amber-50/20',
                hover: 'hover:border-amber-500'
            };
            case 'low': return {
                border: 'border-blue-300',
                glow: 'shadow-[0_0_5px_rgba(96,165,250,0.3)]',
                badge: 'bg-blue-50 text-blue-700 border-blue-100',
                balloon: 'bg-blue-500 text-white',
                label: 'Baixa',
                ring: 'ring-blue-500 border-blue-500 bg-blue-50/20',
                hover: 'hover:border-blue-500'
            };
            default: return null;
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return <AlertCircle size={10} />;
            case 'medium': return <Zap size={10} />;
            case 'low': return <Info size={10} />;
            default: return null;
        }
    };

    const getTableCardStyles = (status, isSelected, priority) => {
        const base = "relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between h-32";

        let styles = `${base} bg-white`;

        if (isSelected) {
            if (priority) {
                const pStyles = getPriorityStyles(priority);
                styles = cn(styles, "ring-2 ring-offset-1", pStyles.ring);
            } else {
                styles += " ring-2 ring-offset-1 ring-indigo-500 border-indigo-500 bg-indigo-50/10";
            }
        } else {
            // Base Status Styles
            if (status === 'free') {
                styles += " border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200";
            } else if (status === 'occupied') {
                styles += " border-blue-100 hover:border-blue-300 hover:shadow-md";
            } else if (status === 'risk') {
                styles += " border-red-100 bg-red-50/10 hover:border-red-300 hover:shadow-md";
            }

            // Priority Override (Glow & Border)
            if (priority) {
                const pStyles = getPriorityStyles(priority);
                // Priority border takes precedence if present, specially for high/medium
                styles = cn(styles, pStyles.border, pStyles.glow, pStyles.hover, "hover:scale-[1.02]");
            }
        }

        return styles;
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 flex flex-col lg:flex-row transition-all duration-300 ease-in-out">
            {/* Main Map Content - Flexible Width */}
            <div className={`flex-1 flex flex-col transition-all duration-300`}>
                {/* Header */}
                <div
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors gap-4"
                    onClick={(e) => {
                        // Don't toggle if clicking interactive elements
                        if (e.target.closest('button') || e.target.closest('.interactive')) return;
                        setIsExpanded(!isExpanded);
                    }}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <LayoutGrid size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">Mapa de Mesas</h3>
                            <p className="text-xs text-gray-500">
                                {tables.filter(t => t.status !== 'free').length} mesas ocupadas
                            </p>
                        </div>

                        <div className="hidden md:flex items-center gap-2 ml-4 border-l border-gray-200 pl-4">
                            <StatusChip label="Livre" color="gray" />
                            <StatusChip label="Ocupada" color="blue" />
                            <StatusChip label="Em risco" color="red" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 interactive">
                        {/* Maestro Toggle */}
                        <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${intelligenceEnabled ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'
                                }`}
                            onClick={() => setIntelligenceEnabled(!intelligenceEnabled)}
                        >
                            <Sparkles size={14} className={intelligenceEnabled ? "text-indigo-600" : "text-gray-400"} />
                            <div className="flex flex-col items-start leading-none opacity-80">
                                <span className={`text-[10px] uppercase font-bold ${intelligenceEnabled ? 'text-indigo-700' : 'text-gray-500'}`}>
                                    Maestro
                                </span>
                                <span className="text-[10px] text-gray-500 font-medium">
                                    {intelligenceEnabled ? 'Ativo' : 'Pausado'}
                                </span>
                            </div>
                        </div>

                        <div
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-white cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); setAutoFilter(!autoFilter); }}
                        >
                            <Filter size={14} className={autoFilter ? "text-indigo-600" : "text-gray-400"} />
                            <span className="text-xs font-medium text-gray-600 hidden sm:inline">Auto filtrar</span>
                            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${autoFilter ? 'bg-indigo-500' : 'bg-gray-300'}`}>
                                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${autoFilter ? 'translate-x-4' : 'translate-x-0'}`} />
                            </div>
                        </div>
                        {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>
                </div>

                {/* Grid Content */}
                {isExpanded && (
                    <div className="p-6 bg-gray-50/50 flex-1 animate-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {tables.map((table) => {
                                const priority = table.highestPriority;
                                const pStyles = priority ? getPriorityStyles(priority) : null;

                                return (
                                    <div
                                        key={table.id}
                                        onClick={() => handleTableClick(table.id)}
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
                                                    pStyles ? pStyles.balloon : (table.status === 'free' ? 'text-gray-400 bg-gray-100' : 'text-gray-900 bg-gray-100')
                                                )}>
                                                    {table.number}
                                                </span>
                                                {table.status === 'risk' && !priority && (
                                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                                                )}
                                            </div>

                                            {/* Priority Badge */}
                                            {priority ? (
                                                <span className={cn(
                                                    "flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border",
                                                    pStyles.badge
                                                )}>
                                                    {getPriorityIcon(priority)}
                                                    {pStyles.label}
                                                </span>
                                            ) : table.status === 'occupied' && (
                                                <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                                    <Clock size={10} />
                                                    <span>{table.time}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Row */}
                                        <div className="mt-auto">
                                            {table.status === 'free' ? (
                                                <div className="flex items-center justify-center h-full">
                                                    <span className="text-xs font-medium text-gray-400">Livre</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-1.5">
                                                    {/* If has priority, explain why briefly or show count */}
                                                    {priority ? (
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-gray-500 font-medium">Sugestão ativa:</span>
                                                            <span className="text-xs font-semibold text-gray-900 truncate">
                                                                {table.suggestions[0]?.title}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[10px] text-gray-500 font-medium bg-white/50 px-1.5 py-0.5 rounded-md border border-gray-100">
                                                                {table.orderCount} pedido(s)
                                                            </span>
                                                            {table.status === 'risk' && (
                                                                <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                                                                    <AlertTriangle size={10} /> Atencão
                                                                </span>
                                                            )}
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

            {/* Intelligence Panel (Sidebar) */}
            {
                isExpanded && selectedTable && intelligenceEnabled && (
                    <IntelligencePanel
                        table={tables.find(t => t.id === selectedTable)}
                        suggestions={tables.find(t => t.id === selectedTable)?.suggestions || []}
                        onAction={handleSuggestionAction}
                        onIgnore={handleSuggestionIgnore}
                    />
                )
            }
        </div >
    );
}
