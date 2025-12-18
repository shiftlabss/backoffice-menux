import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Activity, Calendar, MoreVertical, Download, Image as ImageIcon, Maximize2, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../../lib/utils';

const DATA_FORECAST_MOCK = {
    'Hoje': [
        { time: '08h', real: 1000, prev: 1200 },
        { time: '10h', real: 2500, prev: 2400 },
        { time: '12h', real: 4800, prev: 4500 },
        { time: '14h', real: 5600, prev: 5800 },
        { time: '16h', real: 6200, prev: 6500 },
        { time: '18h', real: 8900, prev: 8500 },
        { time: '20h', real: 11200, prev: 10500 },
        { time: '22h', real: null, prev: 13000 },
    ],
    '7 dias': [
        { time: 'Seg', real: 15000, prev: 14000 },
        { time: 'Ter', real: 18000, prev: 17500 },
        { time: 'Qua', real: 16000, prev: 16500 },
        { time: 'Qui', real: 22000, prev: 21000 },
        { time: 'Sex', real: 35000, prev: 32000 },
        { time: 'Sáb', real: 42000, prev: 40000 },
        { time: 'Dom', real: null, prev: 38000 },
    ],
    '30 dias': Array.from({ length: 10 }, (_, i) => ({
        time: `Dia ${i * 3 + 1}`,
        real: Math.floor(Math.random() * 5000) + 10000,
        prev: Math.floor(Math.random() * 5000) + 10000
    }))
};

export default function DashboardForecastBlock() {
    const [period, setPeriod] = useState('Hoje');
    const [isLoading, setIsLoading] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [toast, setToast] = useState(null);

    const data = DATA_FORECAST_MOCK[period];

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handlePeriodChange = (newPeriod) => {
        if (newPeriod === period) return;
        setPeriod(newPeriod);
    };

    const handleAction = (action) => {
        setShowActions(false);
        if (action === 'csv') showToast('Exportando CSV...');
        if (action === 'image') showToast('Gerando imagem do gráfico...');
        if (action === 'expand') showToast('Expandindo tela cheia...');
    };

    return (
        <Card className="p-6 relative">
            {/* Local Toast */}
            {toast && (
                <div className="absolute top-2 right-2 z-50 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="bg-primary text-white px-3 py-1.5 rounded-full shadow text-xs font-medium">
                        {toast}
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gray-500" />
                        Linha do Tempo e Previsões
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Comparativo em tempo real das últimas 24h.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-muted p-1 rounded-lg">
                        {['Hoje', '7 dias', '30 dias'].map((t) => (
                            <button
                                key={t}
                                onClick={() => handlePeriodChange(t)}
                                className={cn(
                                    "px-3 py-1 text-xs font-bold rounded-md transition-all",
                                    period === t ? "bg-white shadow text-foreground" : "text-gray-500 hover:text-foreground"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    {/* Actions Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowActions(!showActions)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                        >
                            <MoreVertical className="w-4 h-4" />
                        </button>

                        {showActions && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)}></div>
                                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-border py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                                    <button onClick={() => handleAction('csv')} className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-gray-600 hover:bg-gray-50 hover:text-foreground">
                                        <Download className="w-3 h-3" /> Exportar CSV
                                    </button>
                                    <button onClick={() => handleAction('image')} className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-gray-600 hover:bg-gray-50 hover:text-foreground">
                                        <ImageIcon className="w-3 h-3" /> Salvar Imagem
                                    </button>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <button onClick={() => handleAction('expand')} className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-gray-600 hover:bg-gray-50 hover:text-foreground">
                                        <Maximize2 className="w-3 h-3" /> Tela Cheia
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="h-[250px] w-full relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                )}
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#121212" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#121212" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9333ea" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#737373' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#737373' }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            labelStyle={{ color: '#737373', fontSize: '12px', marginBottom: '4px' }}
                            itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="prev" stroke="#9333ea" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPrev)" name="Previsto" />
                        <Area type="monotone" dataKey="real" stroke="#121212" strokeWidth={2} fillOpacity={1} fill="url(#colorReal)" name="Real" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-[#121212]"></div>
                    <span className="text-xs text-gray-500 font-medium">Realizado</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-purple-600 border-dashed border-b border-purple-600"></div>
                    <span className="text-xs text-gray-500 font-medium">Previsto (IA)</span>
                </div>
            </div>
        </Card>
    );
}
