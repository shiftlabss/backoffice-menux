import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Clock, AlertCircle, CheckCircle, Utensils, AlertTriangle } from 'lucide-react';

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
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Livre</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Ocupada</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Risco</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-3">
                    {TABLES_MOCK.map((t) => (
                        <div key={t.id} className={`aspect-square rounded-xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer hover:scale-105 ${t.status === 'free' ? 'border-green-500/30 bg-green-500/10 text-green-400' :
                                t.status === 'risk' ? 'border-red-500 bg-red-500/20 text-red-400 animate-pulse' :
                                    'border-blue-500/30 bg-blue-500/10 text-blue-400'
                            }`}>
                            <span className="font-bold text-lg">{t.id}</span>
                            {t.status !== 'free' && (
                                <span className="text-[10px] font-medium mt-1">{t.time}m</span>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Status & Bottlenecks */}
            <div className="flex flex-col gap-4">
                <Card className="p-4 flex-1">
                    <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        Status de Atendimento
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Espera Mesa</span>
                            <span className="font-bold text-foreground">12 min</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Preparo</span>
                            <span className="font-bold text-foreground">24 min</span>
                        </div>
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">SLA Atual</span>
                                <Badge variant={94 > 95 ? 'success' : 'warning'}>94%</Badge>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-4 flex-1 border-red-100 bg-red-50/50">
                    <h3 className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Gargalos Críticos
                    </h3>
                    <div className="space-y-2">
                        {BOTTLENECKS.map((b) => (
                            <div key={b.id} className="bg-white p-2 rounded-lg border border-red-100 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold text-foreground">{b.msg}</span>
                                    {b.priority === 'high' && <span className="text-[10px] font-bold text-white bg-red-500 px-1 rounded">ALTA</span>}
                                </div>
                                <p className="text-[10px] text-gray-500 mt-0.5">{b.detail}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
