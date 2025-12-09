
import React, { useState } from 'react';
import { Button } from '../ui/Form';
import { Plus, Settings, Box, Zap, CalendarDays, ChevronDown, Check } from 'lucide-react';

export default function QuickActions({ onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState("Hoje, 07 Dez");

    const ranges = [
        { label: "Hoje, 07 Dez", value: "today" },
        { label: "Ontem", value: "yesterday" },
        { label: "Últimos 7 dias", value: "7d" },
        { label: "Últimos 30 dias", value: "30d" },
    ];

    const handleSelect = (range) => {
        setSelectedDetail(range.label);
        setIsOpen(false);
        if (onFilterChange) onFilterChange(range.value);
    };

    return (
        <div className="flex items-center gap-3 relative">

            {/* Overlay for clicking outside */}
            {isOpen && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>}

            {/* Date Filter Button */}
            <div className="relative z-20">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="hidden md:flex items-center bg-white border border-border hover:bg-gray-50 transition-colors rounded-lg px-3 py-1.5 shadow-sm"
                >
                    <CalendarDays className="w-4 h-4 text-muted-foreground mr-2" />
                    <span className="text-sm font-medium text-foreground mr-2 min-w-[90px] text-left">{selectedDetail}</span>
                    <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Popover Menu */}
                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-border p-1 animate-in fade-in zoom-in-95 duration-200">
                        {ranges.map((range) => (
                            <button
                                key={range.value}
                                onClick={() => handleSelect(range)}
                                className="w-full text-left flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:bg-background hover:text-foreground rounded-lg transition-colors"
                            >
                                {range.label}
                                {selectedDetail === range.label && <Check className="w-3 h-3 text-purple-600" />}
                            </button>
                        ))}
                        <div className="h-px bg-muted my-1"></div>
                        <button className="w-full text-left px-3 py-2 text-xs font-bold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                            Personalizar período...
                        </button>
                    </div>
                )}
            </div>


        </div>
    );
}
