import React from 'react';
import { useAudit } from '../../../hooks/useAudit';
import { Card } from '../../ui/Card';
import { Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useNavigate } from 'react-router-dom';

const TABLES = Array(20).fill(null).map((_, i) => ({
    id: i + 1,
    status: i === 3 || i === 7 ? 'risk' : i % 3 === 0 ? 'free' : 'occupied',
    time: i % 3 === 0 ? 0 : Math.floor(Math.random() * 45) + 5
}));

export default function DashboardDiningBlock() {
    const navigate = useNavigate();

    const { log } = useAudit();

    return (
        <Card className="h-full p-4 lg:p-6 bg-white border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 lg:mb-6 shrink-0">
                <h3 className="text-base font-semibold text-gray-900">Mapa de Mesas</h3>
                <div className="flex gap-3 text-[10px] font-medium text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white border-2 border-emerald-500"></div> Ocupada
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-50 border border-red-500"></div> Risco
                    </div>
                </div>
            </div>

            {/* Grid - Expanded to bottom */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 flex-1 content-start overflow-y-auto pr-2 custom-scrollbar max-h-[380px]">
                {TABLES.filter(t => t.status !== 'free').map((table) => (
                    <div
                        key={table.id}
                        onClick={() => {
                            log('dashboard.tables.open', { tableId: table.id });
                            navigate(`/orders?table=${table.id}`);
                        }}
                        className={cn(
                            "w-full aspect-square rounded-xl flex flex-col items-center justify-center relative cursor-pointer transition-all hover:scale-105 border-2",
                            table.status === 'free' && "bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-300",
                            table.status === 'occupied' && "bg-white border-emerald-500 text-gray-900 shadow-sm",
                            table.status === 'risk' && "bg-red-50 border-red-500 text-red-900"
                        )}
                    >
                        {table.status === 'risk' && (
                            <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 border-2 border-white">
                                <AlertCircle className="w-3 h-3" />
                            </div>
                        )}

                        <span className="text-lg font-bold mb-0.5">{table.id}</span>

                        {table.status !== 'free' ? (
                            <div className="flex flex-col items-center">
                                <span className={cn(
                                    "text-[10px] font-bold flex items-center gap-0.5",
                                    table.status === 'risk' ? "text-red-700" : "text-gray-500"
                                )}>
                                    <Clock className="w-3 h-3" /> {table.time}'
                                </span>
                            </div>
                        ) : (
                            <span className="text-[10px] font-medium opacity-50">Livre</span>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}
