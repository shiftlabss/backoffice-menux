
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const hourlyData = [
    { time: '12h', actual: 1200, predicted: 1100 },
    { time: '13h', actual: 3500, predicted: 3200 },
    { time: '14h', actual: 4200, predicted: 4000 },
    { time: '15h', actual: 1800, predicted: 2000 },
    { time: '16h', actual: 900, predicted: 1200 },
    { time: '17h', actual: 2100, predicted: 2400 },
    { time: '18h', actual: 3800, predicted: 3500 },
    { time: '19h', actual: 5600, predicted: 5000 },
    { time: '20h', actual: 7200, predicted: 6800 },
    { time: '21h', actual: null, predicted: 8500 }, // Future
    { time: '22h', actual: null, predicted: 6000 }, // Future
];

const weeklyComparison = [
    { day: 'Seg', current: 4000, previous: 3800 },
    { day: 'Ter', current: 3500, previous: 4200 },
    { day: 'Qua', current: 5000, previous: 4800 },
    { day: 'Qui', current: 6200, previous: 5900 },
    { day: 'Sex', current: 8500, previous: 7500 },
    { day: 'Sab', current: 12000, previous: 11000 },
    { day: 'Dom', current: 9000, previous: 9500 },
];

export default function TrendCharts() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* 4.1 Timeline & Peak Forecast */}
            <Card className="border-border flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                        <div>
                            <CardTitle>Linha do Tempo e Previsão</CardTitle>
                            <p className="text-xs text-muted-foreground">Faturamento Real vs Previsto (24h)</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div> Real
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600">
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div> Previsto
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#171717" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#171717" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11, fontWeight: 500 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11, fontWeight: 500 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Area type="monotone" dataKey="predicted" stroke="#A855F7" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorPredicted)" name="Previsão" />
                            <Area type="monotone" dataKey="actual" stroke="#171717" strokeWidth={3} fill="url(#colorActual)" name="Realizado" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* 4.2 Weekly Comparison */}
            <Card className="border-border flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                    <div>
                        <CardTitle>Performance Semanal</CardTitle>
                        <p className="text-xs text-muted-foreground">Comparativo vs Semana Anterior</p>
                    </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyComparison} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={6}>
                            <CartesianGrid vertical={false} stroke="#F5F5F5" strokeDasharray="3 3" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11, fontWeight: 500 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 11, fontWeight: 500 }} />
                            <Tooltip
                                cursor={{ fill: '#F8FAFC' }}
                                contentStyle={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Bar dataKey="previous" name="Semana Anterior" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="current" name="Semana Atual" fill="#171717" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
