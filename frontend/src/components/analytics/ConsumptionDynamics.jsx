import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Users, Clock, LogOut } from 'lucide-react';

const funnelData = [
    { stage: 'Scan QR', users: 1200 },
    { stage: 'Visualizar', users: 950 },
    { stage: 'Adicionar', users: 400 },
    { stage: 'Checkout', users: 200 },
    { stage: 'Pedido', users: 180 },
];

const newVsReturningData = [
    { name: 'Novos', value: 65, color: '#8E4156' },
    { name: 'Recorrentes', value: 35, color: '#171717' },
];

const HeatmapRow = ({ label, values }) => (
    <div className="flex items-center gap-2">
        <div className="w-16 text-xs font-semibold text-gray-500">{label}</div>
        <div className="flex-1 grid grid-cols-12 gap-1 h-8">
            {values.map((v, i) => (
                <div
                    key={i}
                    className="rounded-sm hover:opacity-80 transition-opacity"
                    style={{
                        backgroundColor: v > 80 ? '#8E4156' : v > 50 ? '#cc4d6e' : v > 20 ? '#fae9ed' : '#f5f5f5',
                        opacity: v === 0 ? 0.5 : 1
                    }}
                    title={`${label} - ${12 + i}h: ${v} pedidos`}
                ></div>
            ))}
        </div>
    </div>
);

export default function ConsumptionDynamics() {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-wine-600 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-900">Dinâmica do Cliente</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Journey Funnel */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            Jornada do Cliente
                            <span className="text-xs font-normal px-2 py-1 bg-gray-100 rounded-full text-gray-500">Funil Diário</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="stage" type="category" width={80} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="users" radius={[0, 4, 4, 0]}>
                                    {funnelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 4 ? '#8E4156' : '#2563EB'} fillOpacity={0.8 - (index * 0.1)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Heatmap Area */}
                <div className="space-y-6">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Horários de Pico</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <HeatmapRow label="Sexta" values={[0, 10, 20, 45, 80, 95, 100, 85, 60, 40, 20, 10]} />
                            <HeatmapRow label="Sábado" values={[0, 5, 15, 50, 90, 100, 90, 70, 50, 30, 20, 5]} />
                            <HeatmapRow label="Domingo" values={[10, 30, 60, 80, 60, 40, 30, 20, 10, 5, 0, 0]} />

                            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-900">Novos vs Recorrentes</div>
                                    <div className="text-xs text-gray-500">Com base nos últimos 30 dias</div>
                                </div>
                                <div className="h-24 w-24">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={newVsReturningData}
                                                innerRadius={25}
                                                outerRadius={40}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {newVsReturningData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">4m 12s</div>
                        <div className="text-xs text-gray-500">Tempo médio decisão</div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">12.4x</div>
                        <div className="text-xs text-gray-500">Itens vistos por visita</div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                        <LogOut className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">15%</div>
                        <div className="text-xs text-gray-500">Abandono no Checkout</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
