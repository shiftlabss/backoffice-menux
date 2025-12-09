
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Clock, Flame, Utensils, Users, AlertOctagon, Target } from 'lucide-react';
import { Badge } from '../ui/Badge';

// Internal KPI Component for this section
const OpMetric = ({ label, value, sub, icon: Icon, colorClass, highlight }) => (
    <div className={`p-3 rounded-xl border ${highlight ? 'border-red-200 bg-red-50' : 'border-border bg-white'} flex flex-col justify-between shadow-sm transition-all hover:shadow-md`}>
        <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
            <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
        </div>
        <div className="text-lg font-bold text-foreground">{value}</div>
        {sub && <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>}
    </div>
);

const tables = Array.from({ length: 24 }, (_, i) => {
    const r = Math.random();
    let status = 'free';
    if (r > 0.6) status = 'occupied';
    if (r > 0.9) status = 'alert';
    if (r > 0.95) status = 'payment';
    return { id: i + 1, status, time: status !== 'free' ? Math.floor(Math.random() * 90) + 'm' : null };
});

const TableNode = ({ id, status, time }) => {
    const colors = {
        free: 'bg-white border-border text-muted-foreground hover:bg-gray-50',
        occupied: 'bg-blue-50 border-blue-200 text-blue-700 shadow-blue-100',
        alert: 'bg-red-50 border-red-200 text-red-700 animate-pulse shadow-red-100',
        payment: 'bg-green-50 border-green-200 text-green-700 shadow-green-100'
    };
    return (
        <div className={`relative p-1 rounded-lg border flex flex-col items-center justify-center aspect-square text-xs transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${colors[status]}`}>
            <span className="font-bold text-[10px] sm:text-xs">{id}</span>
            {time && <span className="text-[8px] mt-0.5 opacity-80 font-medium">{time}</span>}
        </div>
    );
};

export default function AdvancedOperations() {
    return (
        <div className="space-y-6">

            {/* 3.1 & 3.2 Layout: Map on Left, Times/Bottlenecks on Right */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* 3.1 Bloco Mesas e Status (Left - Wider) */}
                <Card className="col-span-1 xl:col-span-8 border-border shadow-sm">
                    <CardHeader className="py-4 border-b border-muted flex flex-row items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Utensils className="w-4 h-4" /> Mapa de Mesas
                        </CardTitle>
                        <div className="flex gap-2 sm:gap-3">
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded-lg border border-blue-100">
                                <Users className="w-3 h-3 text-blue-600" />
                                <span className="text-[10px] sm:text-xs font-bold text-blue-700">24 Ativas</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded-lg border border-amber-100">
                                <AlertOctagon className="w-3 h-3 text-amber-600" />
                                <span className="text-[10px] sm:text-xs font-bold text-amber-700">3 Risco</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4">
                            {tables.map(t => <TableNode key={t.id} {...t} />)}
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 text-[10px] font-medium text-muted-foreground justify-center bg-background py-3 rounded-xl border border-muted">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Ocupada</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-400"></div> Pagamento</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div> Alerta</span>
                        </div>
                    </CardContent>
                </Card>

                {/* 3.2 & 3.3 Times, SLAs & Bottlenecks (Right - Narrower) */}
                <div className="col-span-1 xl:col-span-4 flex flex-col gap-6">

                    {/* Times Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <OpMetric label="Espera Mesa" value="2m" icon={Clock} colorClass="text-gray-500" />
                        <OpMetric label="Preparo" value="22m" icon={Flame} colorClass="text-red-500" highlight />
                        <OpMetric label="Entrega" value="3m" icon={Clock} colorClass="text-blue-500" />
                        <OpMetric label="SLA Meta" value="98%" sub="Alvo 95%" icon={Target} colorClass="text-purple-500" />
                    </div>

                    {/* Bottlenecks Card */}
                    <Card className="border-border flex-1 shadow-sm">
                        <CardHeader className="py-3 border-b border-muted">
                            <CardTitle className="text-sm font-bold text-orange-700 flex items-center gap-2">
                                <Flame className="w-4 h-4 text-orange-500" /> Gargalos Críticos
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                                <div className="p-1.5 bg-orange-200 rounded text-orange-700 mt-0.5">
                                    <Utensils className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Cozinha Sobrecarregada</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">12 pedidos na fila &gt; 15min</p>
                                    <Badge variant="destructive" className="mt-2 text-[10px] h-5 px-2 bg-orange-200 text-orange-800 hover:bg-orange-300 border-none">
                                        Prioridade Alta
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
