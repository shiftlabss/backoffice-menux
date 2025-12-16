import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, LayoutGrid, Clock, Users, AlertTriangle, Filter, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import IntelligencePanel from './IntelligencePanel';

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
                priority: 'medium',
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
                priority: 'medium',
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
                suggestions: currentSuggestions
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

    const getStatusStyles = (status, isSelected) => {
        const base = "relative p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between h-28";
        if (isSelected) return `${base} ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50`;
        switch (status) {
            case 'occupied': return `${base} bg-white border-blue-200 hover:border-blue-300 hover:shadow-md`;
            case 'risk': return `${base} bg-red-50/50 border-red-200 hover:border-red-300 hover:shadow-md`;
            default: return `${base} bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300`;
        }
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
                            {tables.map((table) => (
                                <div
                                    key={table.id}
                                    onClick={() => handleTableClick(table.id)}
                                    className={getStatusStyles(table.status, selectedTable === table.id)}
                                >
                                    {/* Top Row */}
                                    <div className="flex justify-between items-start">
                                        <span className={`text-lg font-bold ${table.status === 'free' ? 'text-gray-400' : 'text-gray-900'}`}>
                                            {table.number}
                                        </span>
                                        {table.suggestions.length > 0 && (
                                            <div className="absolute top-2 right-2 animate-bounce">
                                                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-600 text-white rounded-full text-[10px] font-bold shadow-sm">
                                                    {table.suggestions.length}
                                                </span>
                                            </div>
                                        )}
                                        {table.status === 'risk' && !table.suggestions.length && (
                                            <AlertTriangle size={16} className="text-red-500 animate-pulse" />
                                        )}
                                    </div>

                                    {/* Bottom Row */}
                                    <div>
                                        {table.status === 'free' ? (
                                            <span className="text-xs font-medium text-gray-400">Livre</span>
                                        ) : (
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                                                    <Clock size={12} className={table.status === 'risk' ? 'text-red-500' : 'text-gray-400'} />
                                                    <span className={table.status === 'risk' ? 'text-red-600 font-bold' : ''}>
                                                        {table.time}
                                                    </span>
                                                </div>

                                                {/* Intelligence Badge */}
                                                {table.suggestions.length > 0 ? (
                                                    <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded-md self-start border border-indigo-100 flex items-center gap-1">
                                                        <Sparkles size={10} />
                                                        {table.suggestions.length} sugestão
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] text-gray-500 font-medium bg-white/50 px-1.5 py-0.5 rounded-md self-start border border-gray-100">
                                                        {table.orderCount} pedido(s)
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <span className="text-xs text-gray-400 italic">
                                * Clique para filtrar e ver sugestões
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Intelligence Panel (Sidebar) */}
            {isExpanded && selectedTable && intelligenceEnabled && (
                <IntelligencePanel
                    table={tables.find(t => t.id === selectedTable)}
                    suggestions={tables.find(t => t.id === selectedTable)?.suggestions || []}
                    onAction={handleSuggestionAction}
                    onIgnore={handleSuggestionIgnore}
                />
            )}
        </div>
    );
}
