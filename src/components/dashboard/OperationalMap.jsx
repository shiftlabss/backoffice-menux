
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Clock, AlertCircle, Check, Utensils } from 'lucide-react';

const tables = Array.from({ length: 12 }, (_, i) => {
    const status = Math.random() > 0.7 ? 'alert' : Math.random() > 0.4 ? 'occupied' : 'free';
    return { id: i + 1, status, time: status === 'free' ? null : Math.floor(Math.random() * 60) + 'm' };
});

export default function OperationalMap() {
    return (
        <Card className="border-border h-full">
            <CardHeader className="border-b border-muted py-4">
                <CardTitle className="text-base">Mapa Operacional</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 gap-3">
                    {tables.map(table => (
                        <div
                            key={table.id}
                            className={`
                                relative p-3 rounded-xl border flex flex-col items-center justify-center aspect-square transition-all cursor-pointer hover:scale-105
                                ${table.status === 'free' ? 'bg-background border-border text-muted-foreground hover:border-[#121212]' : ''}
                                ${table.status === 'occupied' ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
                                ${table.status === 'alert' ? 'bg-red-50 border-red-200 text-red-700 animate-pulse' : ''}
                            `}
                        >
                            <span className="text-sm font-bold">T{table.id}</span>
                            {table.time && (
                                <div className="flex items-center gap-1 text-xs mt-1 font-medium bg-white/50 px-1.5 py-0.5 rounded-md">
                                    <Clock className="w-3 h-3" />
                                    {table.time}
                                </div>
                            )}
                            <div className="absolute top-1 right-1">
                                {table.status === 'alert' && <AlertCircle className="w-3 h-3 text-red-500" />}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 space-y-3">
                    <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Legenda</h5>
                    <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-background border border-border"></div>
                            <span className="text-muted-foreground">Livre</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-blue-50 border border-blue-200"></div>
                            <span className="text-muted-foreground">Ocupada</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-red-50 border border-red-200"></div>
                            <span className="text-muted-foreground">Atenção</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
