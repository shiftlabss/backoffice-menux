
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const timelineData = [
    { time: '12h', orders: 12, revenue: 1200 },
    { time: '13h', orders: 28, revenue: 3500 },
    { time: '14h', orders: 35, revenue: 4200 },
    { time: '15h', orders: 15, revenue: 1800 },
    { time: '16h', orders: 10, revenue: 900 },
    { time: '17h', orders: 18, revenue: 2100 },
    { time: '18h', orders: 30, revenue: 3800 },
    { time: '19h', orders: 45, revenue: 5600 },
    { time: '20h', orders: 55, revenue: 7200 },
];

const comparisonData = [
    { day: 'Seg', current: 4000, previous: 3800 },
    { day: 'Ter', current: 3500, previous: 4200 },
    { day: 'Qua', current: 5000, previous: 4800 },
    { day: 'Qui', current: 6200, previous: 5900 },
    { day: 'Sex', current: 8500, previous: 7500 },
    { day: 'Sab', current: 12000, previous: 11000 },
    { day: 'Dom', current: 9000, previous: 9500 },
];

export default function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Timeline Chart */}
            <Card className="lg:col-span-2 border-border">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Linha do Tempo (Hoje)</CardTitle>
                        <select className="bg-background border border-border text-xs rounded-lg px-2 py-1 outline-none cursor-pointer">
                            <option>Pedidos & Faturamento</option>
                            <option>Apenas Pedidos</option>
                        </select>
                    </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8E4156" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#8E4156" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#8E4156" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Faturamento (R$)" />
                            <Area type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorOrders)" name="Pedidos" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Comparison Chart */}
            <Card className="border-border">
                <CardHeader>
                    <CardTitle>Comparativo Semanal</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} layout="vertical" barGap={2} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid horizontal={false} stroke="#E5E5E5" strokeDasharray="3 3" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="day" type="category" axisLine={false} tickLine={false} tick={{ fill: '#525252', fontSize: 11, fontWeight: 500 }} width={40} />
                            <Tooltip
                                cursor={{ fill: '#F5F5F5' }}
                                contentStyle={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E5E5E5', fontSize: '11px' }}
                            />
                            <Bar dataKey="previous" name="Ant." fill="#E5E5E5" radius={[0, 3, 3, 0]} barSize={10} />
                            <Bar dataKey="current" name="Atual" fill="#171717" radius={[0, 3, 3, 0]} barSize={10} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
