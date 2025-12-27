import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import {
  X, Info, TrendingUp, TrendingDown, Clock, Target,
  ArrowRight, Users, MousePointer, ShoppingBag, DollarSign,
  AlertCircle, CheckCircle2, ChevronRight, Filter, Sparkles
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

// --- Stub Data Generators ---

const generateChartData = () => {
  return Array.from({ length: 7 }).map((_, i) => ({
    day: `D-${6 - i}`,
    revenue: Math.floor(Math.random() * 500) + 200,
    conversion: (Math.random() * 10 + 10).toFixed(1),
    acceptance: (Math.random() * 20 + 30).toFixed(1),
    prev_revenue: Math.floor(Math.random() * 400) + 150,
  }));
};

const generateFunnelData = (impressions = 1240) => {
  const viewed = Math.floor(impressions * 0.65);
  const clicked = Math.floor(viewed * 0.45);
  const accepted = Math.floor(clicked * 0.85); // Added to cart
  const ordered = Math.floor(accepted * 0.92); // Actually ordered

  return [
    { label: 'Sugestões Exibidas', value: impressions, drop: null },
    { label: 'Visualizadas', value: viewed, drop: Math.round(((impressions - viewed) / impressions) * 100) },
    { label: 'Interações', value: clicked, drop: Math.round(((viewed - clicked) / viewed) * 100) },
    { label: 'Aceitas (Cart)', value: accepted, drop: Math.round(((clicked - accepted) / clicked) * 100) },
    { label: 'Pedidos Confirmados', value: ordered, drop: Math.round(((accepted - ordered) / accepted) * 100) }
  ];
};

export default function ProductDetailDrawer({ isOpen, onClose, product }) {
  if (!product) return null;

  const [chartTab, setChartTab] = useState('revenue');
  const chartData = generateChartData();
  const funnelData = generateFunnelData(product.base_sessions || 1000);

  // Determine context chips (mock logic)
  const contextChips = [
    { label: 'Ativo agora', color: 'emerald' },
    { label: 'Jantar', color: 'slate' },
    { label: 'Delivery', color: 'slate' }
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={null} // Custom header
      size="lg" // Wider drawer for analytics
      hideCloseButton={true} // Custom close button
    >
      <div className="h-full flex flex-col bg-slate-50/50">

        {/* 1. Header Contextual */}
        <div className="bg-white border-b border-slate-100 px-6 py-5 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {contextChips.map((chip, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className={cn(
                    "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5",
                    chip.color === 'emerald' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-100 text-slate-600 border-slate-200"
                  )}
                >
                  {chip.label}
                </Badge>
              ))}
              <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-2">
                <Clock size={10} /> Atualizado às {format(new Date(), 'HH:mm')}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{product.name}</h2>
            <p className="text-slate-500 text-sm">{product.category}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100 -mr-2">
            <X size={20} className="text-slate-400" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* 2. Resumo Executivo (Impact Grid) */}
          <div className="grid grid-cols-2 gap-4">
            <ImpactCard
              title="Receita Atribuída"
              value={`R$ ${product.revenue_attributed?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              sublabel="Base: 142 pedidos"
              tooltip="Receita de pedidos onde o cliente aceitou esta sugestão."
              icon={DollarSign}
              color="text-emerald-600"
            />
            <ImpactCard
              title="Conversão Maestro"
              value={`${product.conv_maestro}%`}
              sublabel={`vs ${product.conv_organic}% orgânico`}
              tooltip="Taxa de conversão quando a sugestão é exibida vs navegação natural."
              icon={Target}
              color="text-blue-600"
            />
            <ImpactCard
              title="Lift de Vendas"
              value={product.lift}
              sublabel="Impacto direto"
              tooltip="Aumento percentual trazido pela exposição do Maestro."
              icon={TrendingUp}
              color="text-purple-600"
            />
            <ImpactCard
              title="Taxa de Aceitação"
              value="8.4%"
              sublabel="Base: 1.240 exibições"
              tooltip="Percentual de clientes que clicaram na sugestão."
              icon={MousePointer}
              color="text-orange-600"
            />
          </div>

          {/* 3. Evolução Temporal */}
          <Card className="p-5 border-slate-200 shadow-sm bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-900">Evolução de Performance</h3>
                <p className="text-xs text-slate-500">Comparativo últimos 7 dias</p>
              </div>
              <Tabs value={chartTab} onValueChange={setChartTab} className="w-[300px]">
                <TabsList className="grid w-full grid-cols-3 h-8">
                  <TabsTrigger value="revenue" className="text-xs">Receita</TabsTrigger>
                  <TabsTrigger value="conversion" className="text-xs">Conv.</TabsTrigger>
                  <TabsTrigger value="acceptance" className="text-xs">Aceitação</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}
                    formatter={(value) => chartTab === 'revenue' ? `R$ ${value}` : `${value}%`}
                  />
                  <Area
                    type="monotone"
                    dataKey={chartTab}
                    stroke="#7c3aed"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  {chartTab === 'revenue' && (
                    <Area
                      type="monotone"
                      dataKey="prev_revenue"
                      stroke="#cbd5e1"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      fill="none"
                      activeDot={false}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* 4. Funil e Gatilhos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Funnel */}
            <Card className="p-5 border-slate-200 shadow-sm bg-white">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Filter size={16} className="text-slate-400" /> Funil do Item
              </h3>
              <div className="space-y-4">
                {funnelData.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-end mb-1 text-xs">
                      <span className="font-medium text-slate-700">{step.label}</span>
                      <span className="font-bold text-slate-900">{step.value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-800 rounded-full"
                        style={{ width: `${(step.value / funnelData[0].value) * 100}%`, opacity: 1 - (index * 0.15) }}
                      />
                    </div>
                    {step.drop !== null && (
                      <div className="absolute right-0 -top-1 translate-x-full ml-2 flex items-center text-[10px] text-red-500 font-medium">
                        <TrendingDown size={10} className="mr-0.5" /> -{step.drop}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Triggers & Rejections */}
            <Card className="p-5 border-slate-200 shadow-sm bg-white">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target size={16} className="text-slate-400" /> Gatilhos e Motivos
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-emerald-600 uppercase mb-3">Top Gatilhos de Sucesso</h4>
                  <div className="space-y-2">
                    <TriggerRow label="Adicionado ao carrinho (Upsell)" percent="42%" />
                    <TriggerRow label="Combo sugerido (Checkout)" percent="28%" />
                    <TriggerRow label="Menu principal (Destaque)" percent="15%" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-red-500 uppercase mb-3">Principais Motivos de Rejeição</h4>
                  <div className="space-y-2">
                    <TriggerRow label="Fechou modal sem interagir" percent="55%" isBad />
                    <TriggerRow label="Removeu do carrinho" percent="12%" isBad />
                    <TriggerRow label="Visualizou e saiu" percent="8%" isBad />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* 5. Segments */}
          <div className="grid grid-cols-2 gap-6">
            <SegmentTable
              title="Por Canal"
              headers={['Canal', 'Aceit.', 'Rec.']}
              rows={[
                { label: 'Salão (Mesa)', col1: '12%', col2: 'R$ 5k' },
                { label: 'Delivery', col1: '4.5%', col2: 'R$ 2k' },
                { label: 'Retirada', col1: '3.2%', col2: 'R$ 800' },
              ]}
            />
            <SegmentTable
              title="Por Turno"
              headers={['Turno', 'Aceit.', 'Rec.']}
              rows={[
                { label: 'Jantar', col1: '14%', col2: 'R$ 6k' },
                { label: 'Almoço', col1: '8%', col2: 'R$ 1.5k' },
                { label: 'Madrugada', col1: '18%', col2: 'R$ 300' },
              ]}
            />
          </div>

          {/* 6. Opportunities (Read Only) */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-purple-500" /> Oportunidades Relacionadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <OppCard title="Criar Combo Família" type="Combo" desc="Alta afinidade com Bebidas 2L" />
              <OppCard title="Melhorar Descrição" type="Conteúdo" desc="Taxa de visualização alta, conversão baixa" />
              <OppCard title="Oferta de Terça" type="Promoção" desc="Baixo giro às terças-feiras" />
            </div>
          </div>

        </div>
      </div>
    </Drawer>
  );
}

// Helper Components

function ImpactCard({ title, value, sublabel, tooltip, icon: Icon, color }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm cursor-help hover:border-slate-300 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <Icon size={16} className={cn("opacity-80", color)} />
            </div>
            <div className="font-bold text-xl text-slate-900 tracking-tight">{value}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">{title}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{sublabel}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[200px] text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function TriggerRow({ label, percent, isBad }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-600 font-medium truncate pr-4">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full", isBad ? "bg-red-400" : "bg-emerald-500")}
            style={{ width: percent }}
          />
        </div>
        <span className="font-bold text-slate-700 w-8 text-right">{percent}</span>
      </div>
    </div>
  );
}

function SegmentTable({ title, headers, rows }) {
  return (
    <Card className="p-4 border-slate-200 bg-white shadow-sm">
      <h4 className="font-bold text-sm text-slate-800 mb-3">{title}</h4>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate-400 border-b border-slate-100">
            <th className="text-left py-1 font-medium">{headers[0]}</th>
            <th className="text-right py-1 font-medium">{headers[1]}</th>
            <th className="text-right py-1 font-medium">{headers[2]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
              <td className="py-2 text-slate-700 font-medium">{r.label}</td>
              <td className="py-2 text-right text-slate-600">{r.col1}</td>
              <td className="py-2 text-right text-slate-900 font-bold">{r.col2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function OppCard({ title, type, desc }) {
  return (
    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex flex-col gap-1">
      <div className="flex justify-between items-start">
        <span className="font-bold text-xs text-slate-800">{title}</span>
        <Badge variant="outline" className="text-[9px] bg-white h-4 px-1">{type}</Badge>
      </div>
      <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
    </div>
  );
}
