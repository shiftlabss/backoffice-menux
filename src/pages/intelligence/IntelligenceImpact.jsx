import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  MousePointer,
  Eye,
  ArrowRight,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Clock,
  CheckCircle,
  Lightbulb,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Skeleton } from '../../components/ui/Skeleton';
import { cn } from '../../lib/utils';
import ModuleLayout from '../../components/layout/ModuleLayout';
import { intelligenceSidebarItems } from '../../constants/intelligenceSidebar';
import { ImpactFilters } from '../../components/maestro/ImpactFilters';
import { MaestroHeader } from '../../components/maestro/MaestroHeader';

// --- Local Mock Data Generator ---

const generateTrendData = () => {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  return days.map(day => ({
    name: day,
    total: Math.floor(Math.random() * 5000) + 8000,
    attributed: Math.floor(Math.random() * 2000) + 3000,
    organic: Math.floor(Math.random() * 3000) + 5000,
    conversionMaestro: (Math.random() * 5 + 15).toFixed(1),
    conversionOrganic: (Math.random() * 5 + 8).toFixed(1),
    ticketMaestro: (Math.random() * 10 + 45).toFixed(2),
    ticketOrganic: (Math.random() * 10 + 35).toFixed(2),
  }));
};

const funnelData = [
  { stage: 'Sugestões Exibidas', value: 15420, conversion: '100%', dropoff: '-' },
  { stage: 'Interações (Cliques)', value: 8420, conversion: '54%', dropoff: '46%' },
  { stage: 'Itens Adicionados', value: 6150, conversion: '73% (do anterior)', dropoff: '27%' },
  { stage: 'Pedidos Finalizados', value: 4125, conversion: '67% (do anterior)', dropoff: '33%' },
  { stage: 'Receita Atribuída', value: 'R$ 28.450', conversion: '-', dropoff: '-' },
];

const revenueDrivers = [
  {
    id: 'upsell',
    label: 'Upsell (Upgrade/Tamanho)',
    value: 'R$ 14.230',
    growth: '+12%',
    desc: 'Melhoria de oferta no item principal',
    color: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    details: 'Top: Batata Grande (+R$ 4.2k)'
  },
  {
    id: 'cross-sell',
    label: 'Cross-sell (Complementos)',
    value: 'R$ 8.540',
    growth: '+8%',
    desc: 'Bebidas e sobremesas adicionais',
    color: 'text-blue-600',
    borderColor: 'border-blue-200',
    details: 'Top: Coca-Cola Lata (+R$ 2.1k)'
  },
  {
    id: 'timing',
    label: 'Timing (Ociosidade)',
    value: 'R$ 5.120',
    growth: '+25%',
    desc: 'Ofertas em momentos ociosos',
    color: 'text-amber-600',
    borderColor: 'border-amber-200',
    details: 'Top: Petit Gateau (+R$ 1.8k)'
  },
  {
    id: 'repositioning',
    label: 'Reposicionamento (Cardápio)',
    value: 'R$ 3.250',
    growth: '+5%',
    desc: 'Otimização visual de itens',
    color: 'text-purple-600',
    borderColor: 'border-purple-200',
    details: 'Top: Destaque Promoção Almoço'
  },
];

const productsData = [
  { id: 1, name: 'Hambúrguer Clássico', category: 'Lanches', views: 1240, clicks: 850, cart: 600, orders: 450, conv_maestro: '36%', conv_organic: '28%', lift: '+15%', revenue: 'R$ 12.400' },
  { id: 2, name: 'Refrigerante Lata', category: 'Bebidas', views: 3500, clicks: 1200, cart: 1100, orders: 950, conv_maestro: '27%', conv_organic: '25%', lift: '+8%', revenue: 'R$ 5.500' },
  { id: 3, name: 'Batata Frita', category: 'Acompanhamentos', views: 2100, clicks: 900, cart: 850, orders: 700, conv_maestro: '33%', conv_organic: '27%', lift: '+22%', revenue: 'R$ 4.250' },
  { id: 4, name: 'Petit Gateau', category: 'Sobremesas', views: 800, clicks: 300, cart: 250, orders: 200, conv_maestro: '25%', conv_organic: '18%', lift: '+35%', revenue: 'R$ 3.100' },
  { id: 5, name: 'Suco Natural', category: 'Bebidas', views: 950, clicks: 400, cart: 350, orders: 300, conv_maestro: '31%', conv_organic: '29%', lift: '+5%', revenue: 'R$ 2.800' },
];

const rulesData = [
  { id: 1, name: 'Oferta Batata Grande', type: 'Upsell', shown: 4500, clicks: 1200, accepted: 850, revenue: 'R$ 4.250', conversion: '18%' },
  { id: 2, name: 'Sobremesa Jantar', type: 'Timing', shown: 2100, clicks: 500, accepted: 320, revenue: 'R$ 3.100', conversion: '15%' },
  { id: 3, name: 'Bebida c/ Lanche', type: 'Cross-sell', shown: 5600, clicks: 1800, accepted: 1400, revenue: 'R$ 7.000', conversion: '25%' },
];

const shiftsData = [
  { id: 'jantar', name: 'Jantar', revenue: 'R$ 18.400', lift_conv: '+4.2%', lift_ticket: '+R$ 15.00', opportunity: 'Alta' },
  { id: 'almoco', name: 'Almoço', revenue: 'R$ 8.200', lift_conv: '+2.1%', lift_ticket: '+R$ 5.50', opportunity: 'Média' },
  { id: 'madrugada', name: 'Madrugada', revenue: 'R$ 1.850', lift_conv: '+5.5%', lift_ticket: '+R$ 8.00', opportunity: 'Alta' },
];

const recommendationsData = [
  {
    id: 1,
    type: 'success',
    title: 'Aumentar oferta de sobremesa no jantar',
    diagnosis: 'A conversão de sobremesas caiu 5% nas últimas 2h do jantar.',
    impact: 'Est. +R$ 450/dia',
    confidence: 'Alto (85%)'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Revisar preço do Combo Família',
    diagnosis: 'Visualizações altas, mas conversão 20% abaixo da média.',
    impact: 'Est. +R$ 120/dia',
    confidence: 'Médio (60%)'
  },
  {
    id: 3,
    type: 'info',
    title: 'Ativar "Modo Happy Hour" mais cedo',
    diagnosis: 'Pico de pedidos de bebidas começando as 17h, 1h antes do previsto.',
    impact: 'Est. +R$ 300/dia',
    confidence: 'Alto (92%)'
  },
];

const InfoTooltip = ({ text }) => (
  <div className="group relative ml-1 inline-flex cursor-help">
    <HelpCircle size={14} className="text-slate-400 hover:text-slate-600 transition-colors" />
    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 opacity-0 transition-all group-hover:opacity-100 z-50">
      <div className="rounded bg-slate-800 p-2 text-xs text-white shadow-md text-center">
        {text}
        <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-800" />
      </div>
    </div>
  </div>
);

const TrendChart = ({ data, metric, setMetric }) => {
  return (
    <Card className="h-full flex flex-col shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-800">Evolução de Impacto</CardTitle>
          <CardDescription>Comparativo temporal de performance</CardDescription>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setMetric('revenue')}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all",
              metric === 'revenue' ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            Receita
          </button>
          <button
            onClick={() => setMetric('conversion')}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all",
              metric === 'conversion' ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            Conversão
          </button>
          <button
            onClick={() => setMetric('ticket')}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all",
              metric === 'ticket' ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            Ticket
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-[350px]">
        <ResponsiveContainer width="100%" height={350}>
          {metric === 'revenue' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAttributed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `R$ ${value / 1000}k`} />
              <RechartsTooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`R$ ${value}`, '']}
              />
              <Legend iconType="circle" />
              <Area type="monotone" dataKey="total" name="Receita Total" stroke="#94a3b8" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
              <Area type="monotone" dataKey="attributed" name="Atribuída ao Maestro" stroke="#7c3aed" fillOpacity={1} fill="url(#colorAttributed)" strokeWidth={2} />
            </AreaChart>
          ) : metric === 'conversion' ? (
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
              <RechartsTooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`${value}%`, '']}
              />
              <Legend iconType="circle" />
              <Line type="monotone" dataKey="conversionOrganic" name="Conv. Orgânica" stroke="#94a3b8" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="conversionMaestro" name="Conv. com Maestro" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `R$ ${value}`} />
              <RechartsTooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`R$ ${value}`, '']}
              />
              <Legend iconType="circle" />
              <Line type="monotone" dataKey="ticketOrganic" name="Ticket Médio (Orgânico)" stroke="#94a3b8" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="ticketMaestro" name="Ticket Médio (Maestro)" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const KPICard = ({ title, value, subtext, trend, trendValue, icon: Icon, info }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-5">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-slate-500 flex items-center">
          {title}
          {info && <InfoTooltip text={info} />}
        </p>
        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
          <Icon size={16} />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-slate-500">{subtext}</span>
        {trend && (
          <span className={cn(
            "flex items-center font-medium",
            trend === 'up' ? "text-emerald-600" : "text-rose-600"
          )}>
            {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
            {trendValue}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

const IntelligenceImpact = () => {
  const [data, setData] = useState(generateTrendData());
  const [trendMetric, setTrendMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);
  const [rankingTab, setRankingTab] = useState('products');

  const [filters, setFilters] = useState({
    period: 'today',
    shift: 'all',
    channel: 'all',
    segment: 'all',
    compare: true
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, you would trigger a refetch here
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading
  };

  const handleExport = () => {
    const headers = ['ID', 'Produto', 'Categoria', 'Views', 'Cliques', 'Adicoes', 'Pedidos', 'Conv. Maestro', 'Conv. Organica', 'Lift', 'Receita'];
    const csvContent = [
      headers.join(','),
      ...productsData.map(row => [
        row.id,
        `"${row.name}"`,
        row.category,
        row.views,
        row.clicks,
        row.cart,
        row.orders,
        row.conv_maestro,
        row.conv_organic,
        row.lift,
        row.revenue
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'maestro_impacto_vendas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const content = isLoading ? (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
      <div className="grid grid-cols-12 gap-6">
        <Skeleton className="col-span-8 h-96" />
        <Skeleton className="col-span-4 h-96" />
      </div>
    </div>
  ) : (
    <div className="space-y-8 animate-in fade-in duration-500">


      {/* Section 1: Standard Maestro Header */}
      <MaestroHeader
        title="Impacto nas Vendas"
        subtitle="Análise detalhada de conversão e receita atribuída"
        filters={filters}
        onFilterChange={(key, value) => handleFilterChange({ ...filters, [key]: value })}
        onOpenAdvancedFilters={() => { }} // or open a drawer if needed
        onExport={handleExport}
      />

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
        <KPICard
          title="Receita Atribuída"
          value="R$ 28.450"
          subtext="Vendas influenciadas"
          trend="up"
          trendValue="12.5%"
          icon={DollarSign}
          info="Receita gerada a partir de sugestões exibidas e aceitas dentro da janela de atribuição (30min)."
        />
        <KPICard
          title="Receita Incremental"
          value="R$ 8.900"
          subtext="Estimativa IA"
          trend="up"
          trendValue="15%"
          icon={Lightbulb}
          info="Receita que não teria acontecido sem as sugestões, baseada em grupos de controle."
        />
        <KPICard
          title="Pedidos Influenciados"
          value="1.240"
          subtext="28% do total"
          trend="up"
          trendValue="8.2%"
          icon={ShoppingCart}
          info="Total de pedidos que contiveram pelo menos um item sugerido pelo Maestro."
        />
        <KPICard
          title="Lift Conversão"
          value="+3.2%"
          subtext="vs. Orgânico"
          trend="up"
          trendValue="1.1%"
          icon={MousePointer}
          info="Aumento percentual na taxa de conversão de pedidos com sugestões vs. sem sugestões."
        />
        <KPICard
          title="Lift Ticket Médio"
          value="+R$ 12,40"
          subtext="vs. Sem Maestro"
          trend="up"
          trendValue="R$ 8,50"
          icon={TrendingUp}
          info="Diferença média de valor entre pedidos com sugestões aceitas e pedidos orgânicos."
        />
        <KPICard
          title="Confiança Atribuição"
          value="94%"
          subtext="Alta Precisão"
          icon={CheckCircle}
          info="Nível de certeza estatística do modelo de atribuição atual."
        />
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8">

        {/* Section 3: Time Evolution (Chart) */}
        <div>
          <TrendChart data={data} metric={trendMetric} setMetric={setTrendMetric} />
        </div>

        {/* Section 4: Maestro Funnel */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Funil de Influência do Maestro</CardTitle>
            <CardDescription>Jornada do cliente desde a sugestão até a venda atribuída</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Funnel Steps */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {funnelData.map((step, index) => (
                  <div key={index} className="relative flex flex-col items-center text-center p-4 bg-slate-50 rounded-lg border border-slate-100 group hover:border-purple-200 transition-all">
                    {index < funnelData.length - 1 && (
                      <div className="hidden md:block absolute top-[50%] -right-3 w-6 h-0.5 bg-slate-200 z-10" />
                    )}
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3 border-2",
                      index === 4 ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-white text-slate-600 border-slate-200"
                    )}>
                      {index + 1}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 px-2 h-8 flex items-center justify-center leading-tight">
                      {step.stage}
                    </span>
                    <span className={cn(
                      "text-xl font-bold mb-1",
                      index === 4 ? "text-emerald-600" : "text-slate-800"
                    )}>
                      {step.value}
                    </span>

                    {/* Pass Rate Badge */}
                    {step.conversion !== '-' && (
                      <Badge variant="outline" className={cn(
                        "mt-2 text-[10px] h-5",
                        parseInt(step.conversion) < 60 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-slate-100 text-slate-600"
                      )}>
                        {step.conversion} conv.
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Automatic Insight / Bottleneck */}
              <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-full text-amber-700 mt-0.5">
                    <ArrowDownRight size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 text-sm">Gargalo Detectado: Interação em Sugestões</h4>
                    <p className="text-sm text-amber-800/80">
                      Apenas 54% das sugestões exibidas recebem clique. O benchmark é 65%.
                      Estima-se perda de <strong className="font-medium">R$ 320/dia</strong> nesta etapa.
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-amber-700 border-amber-300 hover:bg-amber-100 whitespace-nowrap">
                  Ver oportunidades para corrigir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Impact Drivers */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-purple-600" size={20} />
            <h3 className="text-lg font-bold text-slate-800">Drivers de Receita</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {revenueDrivers.map((driver) => (
              <Card key={driver.id} className={cn("border-t-4 shadow-sm hover:shadow-md transition-all", driver.borderColor)}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className={cn("text-xs font-bold uppercase tracking-wider", driver.color)}>
                      {driver.id}
                    </span>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                      {driver.growth}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">{driver.label}</h4>
                  <div className="text-2xl font-bold text-slate-900 mb-2">{driver.value}</div>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2 h-8">{driver.desc}</p>

                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs font-medium text-slate-600 truncate">
                      <span className="text-slate-400 mr-1">Top:</span>
                      {driver.details.replace('Top: ', '')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 6: Actionable Rankings */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-semibold text-slate-800">Impacto Detalhado</CardTitle>
              <CardDescription>Análise granular por vetores de influência</CardDescription>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setRankingTab('products')}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  rankingTab === 'products' ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Produtos
              </button>
              <button
                onClick={() => setRankingTab('rules')}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  rankingTab === 'rules' ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Regras IA
              </button>
              <button
                onClick={() => setRankingTab('shifts')}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  rankingTab === 'shifts' ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Turnos
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {rankingTab === 'products' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Adição</TableHead>
                    <TableHead className="text-right">Conv. Maestro</TableHead>
                    <TableHead className="text-right">Lift</TableHead>
                    <TableHead className="text-right">Receita</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsData.map((product) => (
                    <TableRow key={product.id} className="group">
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          <span className="text-xs text-slate-500">{product.category}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-slate-600">{product.views}</TableCell>
                      <TableCell className="text-right text-slate-600">{product.cart}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium text-slate-700">{product.conv_maestro}</span>
                        <span className="block text-[10px] text-slate-400">Org: {product.conv_organic}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">{product.lift}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-900">{product.revenue}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">Detalhes</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {rankingTab === 'rules' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Regra / Campanha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Exibições</TableHead>
                    <TableHead className="text-right">Aceites</TableHead>
                    <TableHead className="text-right">Conversão</TableHead>
                    <TableHead className="text-right">Receita Gerada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rulesData.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium text-slate-900">{rule.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-50 text-slate-600">{rule.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-slate-600">{rule.shown}</TableCell>
                      <TableCell className="text-right text-slate-600">{rule.accepted}</TableCell>
                      <TableCell className="text-right text-slate-700 font-medium">{rule.conversion}</TableCell>
                      <TableCell className="text-right text-emerald-600 font-bold">{rule.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {rankingTab === 'shifts' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shiftsData.map((shift) => (
                  <div key={shift.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800">{shift.name}</h4>
                      <Badge variant={shift.opportunity === 'Alta' ? 'default' : 'secondary'} className={shift.opportunity === 'Alta' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : ''}>
                        Oportunidade {shift.opportunity}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mb-4">{shift.revenue}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Lift Conv.</span>
                        <span className="font-medium text-emerald-600">{shift.lift_conv}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Lift Ticket</span>
                        <span className="font-medium text-emerald-600">{shift.lift_ticket}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-white hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-colors">
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 7: Actionable Recommendations */}
        <Card className="shadow-sm border-l-4 border-l-purple-500 overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Lightbulb size={120} />
          </div>
          <CardHeader className="pb-3 relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold text-slate-800">Oportunidades Identificadas</CardTitle>
                <CardDescription>Ações recomendadas para maximizar seu faturamento agora</CardDescription>
              </div>
              <Button onClick={handleExport} variant="outline" className="hidden md:flex gap-2">
                <Download size={16} /> Exportar Relatório
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendationsData.map((rec) => (
                <div key={rec.id} className="p-4 bg-white rounded-lg border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className={cn(
                      "text-xs font-semibold px-2 py-0.5",
                      rec.type === 'success' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        rec.type === 'warning' ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-blue-50 text-blue-700 border-blue-200"
                    )}>
                      {rec.impact}
                    </Badge>
                    <div className="flex gap-1">
                      <CheckCircle size={14} className="text-slate-300" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2 leading-tight group-hover:text-purple-700 transition-colors">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-3">
                    {rec.diagnosis}
                  </p>

                  <div className="mt-auto flex gap-2">
                    <Button size="sm" className="flex-1 bg-slate-900 hover:bg-slate-800 text-white h-8 text-xs">
                      Aplicar
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div >
    </div>
  );

  return content;
};

export default IntelligenceImpact;
