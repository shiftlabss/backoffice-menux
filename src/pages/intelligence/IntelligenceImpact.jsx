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
  }));
};

const funnelData = [
  { stage: 'Sugestões Exibidas', value: 12543, conversion: '100%', dropoff: '0%' },
  { stage: 'Interações (Cliques)', value: 8420, conversion: '67%', dropoff: '33%' },
  { stage: 'Adições ao Carrinho', value: 5894, conversion: '70% (do anterior)', dropoff: '30%' },
  { stage: 'Pedidos Finalizados', value: 4125, conversion: '70% (do anterior)', dropoff: '30%' },
];

const revenueDrivers = [
  {
    id: 'upsell',
    label: 'Upsell de Produto',
    value: 'R$ 14.230',
    growth: '+12%',
    desc: 'Itens adicionais sugeridos no combo',
    color: 'text-emerald-600',
    details: 'Principal driver: Batata Grande (+R$ 4.2k)'
  },
  {
    id: 'cross-sell',
    label: 'Cross-sell (Bebidas/Sobremesas)',
    value: 'R$ 8.540',
    growth: '+8%',
    desc: 'Sugestões complementares ao prato',
    color: 'text-blue-600',
    details: 'Principal driver: Coca-Cola Lata (+R$ 2.1k)'
  },
  {
    id: 'timing',
    label: 'Timing (2ª Bebida/Sobremesa)',
    value: 'R$ 5.120',
    growth: '+25%',
    desc: 'Ofertas no momento ocioso da mesa',
    color: 'text-amber-600',
    details: 'Principal driver: Petit Gateau (+R$ 1.8k)'
  },
];

const productsData = [
  { id: 1, name: 'Hambúrguer Clássico', category: 'Lanches', views: 1240, clicks: 850, cart: 600, conversion_lift: '+15%', revenue: 'R$ 12.400' },
  { id: 2, name: 'Refrigerante Lata', category: 'Bebidas', views: 3500, clicks: 1200, cart: 1100, conversion_lift: '+8%', revenue: 'R$ 5.500' },
  { id: 3, name: 'Batata Frita', category: 'Acompanhamentos', views: 2100, clicks: 900, cart: 850, conversion_lift: '+22%', revenue: 'R$ 4.250' },
  { id: 4, name: 'Petit Gateau', category: 'Sobremesas', views: 800, clicks: 300, cart: 250, conversion_lift: '+35%', revenue: 'R$ 3.100' },
  { id: 5, name: 'Suco Natural', category: 'Bebidas', views: 950, clicks: 400, cart: 350, conversion_lift: '+5%', revenue: 'R$ 2.800' },
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

// --- Components ---

const InfoTooltip = ({ text }) => (
  <div className="group relative ml-1 inline-flex cursor-help">
    <HelpCircle className="h-4 w-4 text-slate-400" />
    <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-900 text-white text-xs rounded shadow-lg z-50">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
    </div>
  </div>
);

const TrendChart = ({ data, metric, setMetric }) => {
  return (
    <Card className="col-span-12 lg:col-span-8 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-800">Evolução de Impacto</CardTitle>
          <CardDescription>Comparativo temporal de performance</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            variant={metric === 'revenue' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMetric('revenue')}
            className={metric === 'revenue' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            Receita
          </Button>
          <Button
            variant={metric === 'conversion' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMetric('conversion')}
            className={metric === 'conversion' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            Conversão
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
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
          ) : (
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
  const [period, setPeriod] = useState('7d');

  const handleFilterChange = (setter, value) => {
    setter(value);
    setIsLoading(true);
    setTimeout(() => {
      setData(generateTrendData());
      setIsLoading(false);
    }, 800);
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

      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Impacto nas Vendas</h1>
          <p className="text-slate-500 mt-1">Acompanhe como o Maestro está influenciando sua receita e conversão.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            <Button
              variant={period === '7d' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleFilterChange(setPeriod, '7d')}
              className="text-xs h-8"
            >
              7 dias
            </Button>
            <Button
              variant={period === '30d' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleFilterChange(setPeriod, '30d')}
              className="text-xs h-8"
            >
              30 dias
            </Button>
            <Button
              variant={period === 'mes' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleFilterChange(setPeriod, 'mes')}
              className="text-xs h-8"
            >
              Este Mês
            </Button>
          </div>

          <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block" />

          <Button variant="outline" size="sm" className="h-9 gap-2 text-slate-600">
            <Filter size={14} /> Filtros
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-2 text-slate-600">
            <Download size={14} /> Exportar
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard
          title="Receita Atribuída"
          value="R$ 28.450"
          subtext="Vendas influenciadas"
          trend="up"
          trendValue="12.5%"
          icon={DollarSign}
          info="Receita..."
        />
        <KPICard
          title="Pedidos Influenciados"
          value="1.240"
          subtext="28% do total"
          trend="up"
          trendValue="8.2%"
          icon={ShoppingCart}
          info="Total de pedidos..."
        />
        <KPICard
          title="Lift Ticket Médio"
          value="+R$ 12,40"
          subtext="vs. Sem Maestro"
          trend="up"
          trendValue="R$ 8,50"
          icon={TrendingUp}
          info="Diferença..."
        />
        <KPICard
          title="Lift Conversão"
          value="+3.2%"
          subtext="vs. Orgânico"
          trend="up"
          trendValue="1.1%"
          icon={MousePointer}
          info="Aumento percentual..."
        />
        <KPICard
          title="Receita Incremental"
          value="R$ 8.900"
          subtext="Estimativa IA"
          trend="up"
          trendValue="15%"
          icon={Lightbulb}
          info="Estimativa..."
        />
        <KPICard
          title="Confiança Atribuição"
          value="94%"
          subtext="Alta Precisão"
          icon={CheckCircle}
          info="Nível de certeza..."
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">

        {/* Left Column: Trend Chart & Products */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <TrendChart data={data} metric={trendMetric} setMetric={setTrendMetric} />

          {/* Revenue Drivers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {revenueDrivers.map((driver) => (
              <Card key={driver.id} className="bg-slate-50 overflow-hidden relative border-slate-200/60 shadow-sm">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <BarChart3 size={64} />
                </div>
                <CardContent className="p-5">
                  <p className="text-sm text-slate-500 font-medium mb-1">{driver.label}</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-slate-800">{driver.value}</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">{driver.growth}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{driver.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Products Table */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-800">Detalhe por Produto</CardTitle>
                  <CardDescription>Itens com maior impacto nas sugestões</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                  Ver Todos <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Cliques</TableHead>
                    <TableHead className="text-right">Lift Conv.</TableHead>
                    <TableHead className="text-right">Receita Atrib.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          <span className="text-xs text-slate-500">{product.category}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-slate-600">{product.views}</TableCell>
                      <TableCell className="text-right text-slate-600">{product.clicks}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">
                          {product.conversion_lift}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-900">{product.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Funnel & Recommendations */}
        <div className="col-span-12 lg:col-span-4 space-y-6">

          {/* Funnel Widget */}
          <Card className="bg-white shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Funil de Influência</CardTitle>
              <CardDescription>Eficiência das sugestões do Maestro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={index} className="relative">
                  {index !== 0 && (
                    <div className="absolute left-6 -top-4 bottom-1/2 w-0.5 bg-slate-100 -z-10" />
                  )}
                  <div className="flex items-center gap-4 group">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2",
                      index === 0 ? "bg-purple-50 border-purple-100 text-purple-600" :
                        index === 3 ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                          "bg-white border-slate-100 text-slate-400"
                    )}>
                      {index === 0 && <Eye size={20} />}
                      {index === 1 && <MousePointer size={20} />}
                      {index === 2 && <ShoppingCart size={20} />}
                      {index === 3 && <CheckCircle size={20} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">{stage.stage}</span>
                        <span className="text-sm font-bold text-slate-900">{stage.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", index === 3 ? "bg-emerald-500" : "bg-purple-500")}
                          style={{ width: stage.conversion.split('%')[0] + '%' }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-slate-400">
                        <span>Conv: {stage.conversion}</span>
                        <span>Drop: {stage.dropoff}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Timing / Operational */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md border-none">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Clock className="text-purple-400" size={20} />
                <CardTitle className="text-white text-lg">Oportunidade de Tempo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                  <span className="text-slate-300 text-sm">Tempo médio até 2ª bebida</span>
                  <span className="text-xl font-bold font-mono">18min</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                  <span className="text-slate-300 text-sm">Conv. Sobremesa (Jantar)</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">12%</span>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-purple-400">Insight:</strong> Reduzir o tempo de oferta da 2ª bebida para 15min pode aumentar a receita em ~8% no jantar.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actionable Recommendations */}
          <Card className="shadow-sm border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-slate-800">Ações Recomendadas</CardTitle>
              <CardDescription>Oportunidades de alto impacto identificadas agora</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendationsData.map((rec) => (
                <div key={rec.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-purple-200 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className={cn(
                      "text-xs bg-white",
                      rec.type === 'success' ? "text-emerald-700 border-emerald-200" :
                        rec.type === 'warning' ? "text-amber-700 border-amber-200" :
                          "text-blue-700 border-blue-200"
                    )}>
                      {rec.impact}
                    </Badge>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-purple-500 transition-colors" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1 leading-tight group-hover:text-purple-700 transition-colors">{rec.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{rec.diagnosis}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full text-purple-600 border-purple-200 hover:bg-purple-50 mt-2">
                Ver todas recomendações
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Maestro"
      subtitle="Inteligência Artificial"
      items={intelligenceSidebarItems}
    >
      {content}
    </ModuleLayout>
  );
};

export default IntelligenceImpact;
