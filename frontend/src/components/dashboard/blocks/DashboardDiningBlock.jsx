import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Clock, AlertCircle, CheckCircle, Utensils, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TABLES_MOCK = Array(12).fill(null).map((_, i) => ({
    id: i + 1,
    status: i === 3 || i === 7 ? 'risk' : i % 3 === 0 ? 'free' : 'active',
    time: i % 3 === 0 ? 0 : Math.floor(Math.random() * 60) + 10
}));

const BOTTLENECKS = [
    { id: 1, msg: 'Cozinha sobrecarregada', detail: '8 pedidos > 25min', priority: 'high' },
    { id: 2, msg: 'Espera na entrada', detail: 'Fila de 12 pessoas', priority: 'medium' },
];

export default function DashboardDiningBlock() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all'); // all, free, active, risk

    const handleTableClick = (t) => {
        if (t.status === 'free') {
            toast('Mesa Livre', { icon: '✅' });
        } else {
            navigate('/orders');
            toast(`Abrindo pedidos da Mesa ${t.id}`, { icon: '📝' });
        }
    };

    const handleFilter = (status) => {
        setFilter(status === filter ? 'all' : status);
        toast(status === filter ? 'Mostrando todas as mesas' : `Filtrando por: ${status}`, { position: 'bottom-center' });
    }

    const filteredTables = TABLES_MOCK.map(t => ({
        ...t,
        dimmed: filter !== 'all' && t.status !== filter
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
            {/* Map Section */}
            <Card className="lg:col-span-2 p-5 bg-[#1A1A1A] text-white border-[#333]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-gray-400" />
                        Mapa de Mesas
                    </h3>
                    <div className="flex gap-2 text-xs">
                        <span
                            className={`flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity ${filter === 'free' ? 'underline decoration-green-500 underline-offset-4' : ''}`}
                            onClick={() => handleFilter('free')}
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500"></div> Livre
                        </span>
                        <span
                            className={`flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity ${filter === 'active' ? 'underline decoration-blue-500 underline-offset-4' : ''}`}
                            onClick={() => handleFilter('active')}
                        >
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div> Ocupada
                        </span>
                        <span
                            className={`flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity ${filter === 'risk' ? 'underline decoration-red-500 underline-offset-4' : ''}`}
                            onClick={() => handleFilter('risk')}
                        >
                            <div className="w-2 h-2 rounded-full bg-red-500"></div> Risco
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-3">
                    {filteredTables.map((t) => (
                        <div
                            key={t.id}
                            onClick={() => handleTableClick(t)}
                            className={`aspect-square rounded-xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer hover:scale-105 active:scale-95 ${t.dimmed ? 'opacity-20 grayscale' : ''
                                } ${t.status === 'free' ? 'border-green-500/30 bg-green-500/10 text-green-400' :
                                    t.status === 'risk' ? 'border-red-500 bg-red-500/20 text-red-400 animate-pulse' :
                                        'border-blue-500/30 bg-blue-500/10 text-blue-400'
                                }`}
                        >
                            <span className="font-bold text-lg">{t.id}</span>
                            {t.status !== 'free' && (
                                <span className="text-xs font-black mt-0.5 tracking-tight">{t.time}m</span>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
}
