import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  MousePointer,
  Eye,
  ArrowRight,

  Filter,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Clock,
  CheckCircle,
  Lightbulb,
  ChevronRight,
  BarChart3,

  CheckCircle2
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



// --- REFACTOR: Moved Logic to Hook and Fixed Imports ---
import { useNavigate } from 'react-router-dom';
import { useIntelligenceImpact } from '../../hooks/useIntelligenceImpact';
import { useAudit } from '../../hooks/useAudit';

// Removed generatedTrendData and mock constants
// They are now handled inside the hook for consistency.



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

const KPICard = ({ title, value, subtext, trend, trendValue, icon: Icon, info, warning }) => (
  // Removed hover:shadow-md to comply with Audit: "Affordance honesta" (Blocks 4)
  <Card className="shadow-sm transition-shadow border-slate-200">
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
      {warning && (
        <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-amber-600 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1"></span>
          {warning}
        </div>
      )}
    </CardContent>
  </Card>
);

const IntelligenceImpact = () => {
  const navigate = useNavigate();
  const { log } = useAudit();
  const [trendMetric, setTrendMetric] = useState('revenue');
  const [rankingTab, setRankingTab] = useState('products');

  const [filters, setFilters] = useState({
    period: '7d', // Default to 7d for better data vis
    shift: 'all',
    channel: 'all',
    segment: 'all',
    compare: true
  });

  // Use the new Hook (Block 1)
  const { data, isLoading, isError } = useIntelligenceImpact(filters);

  // Handlers
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    log('intelligence.impact.filter.change', newFilters);
  };



  const handleProductDetails = (product) => {
    log('intelligence.impact.product.details', { productId: product.produto_id });
    navigate(`/menu/products?highlight=${product.produto_id}`); // Block 3: Real navigation to verified route
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



      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
        <KPICard
          title="Receita Atribuída"
          value={`R$ ${data?.kpis.receita_atribuida.toLocaleString('pt-BR')}`}
          subtext="Vendas influenciadas"
          trend="up"
          trendValue="12.5%"
          icon={DollarSign}
          info="Receita gerada a partir de sugestões exibidas e aceitas dentro da janela de atribuição (30min)."
        />
        <KPICard
          title="Receita Incremental"
          value={`R$ ${data?.kpis.receita_incremental.toLocaleString('pt-BR')}`}
          subtext="Estimativa IA"
          trend="up"
          trendValue="15%"
          icon={Lightbulb}
          info="Receita que não teria acontecido sem as sugestões, baseada em grupos de controle."
          warning={data?.meta.confidenceLevel < 0.8 ? "Baixa confiança estatística" : null} // Block 5: Confidence warning
        />
        <KPICard
          title="Pedidos Influenciados"
          value={data?.kpis.pedidos_influenciados}
          subtext="28% do total"
          trend="up"
          trendValue="8.2%"
          icon={ShoppingCart}
          info="Total de pedidos que contiveram pelo menos um item sugerido pelo Maestro."
        />
        <KPICard
          title="Lift Conversão"
          value={data?.kpis.lift_conversao}
          subtext="vs. Orgânico"
          trend="up"
          trendValue="1.1%"
          icon={MousePointer}
          info="Aumento percentual na taxa de conversão de pedidos com sugestões vs. sem sugestões."
        />
        <KPICard
          title="Lift Ticket Médio"
          value={data?.kpis.lift_ticket}
          subtext="vs. Sem Maestro"
          trend="up"
          trendValue="R$ 8,50"
          icon={TrendingUp}
          info="Diferença média de valor entre pedidos com sugestões aceitas e pedidos orgânicos."
        />
        <KPICard
          title="Confiança Atribuição"
          value={data?.kpis.confianca_atribuicao}
          subtext="Alta Precisão"
          icon={CheckCircle}
          info="Nível de certeza estatística do modelo de atribuição atual."
        />
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8">

        {/* Section 3: Time Evolution (Chart) */}
        <div>
          {data?.trend && <TrendChart data={data.trend} metric={trendMetric} setMetric={setTrendMetric} />}
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
                {data?.funnel.map((step, index) => (
                  <div key={index} className="relative flex flex-col items-center text-center p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-all">
                    {/* Removed group hover:border-purple-200 to imply non-clickability (Block 4) */}
                    {index < (data?.funnel?.length || 0) - 1 && (
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
            {data?.drivers.map((driver) => (
              <Card key={driver.id} className={cn("border-t-4 shadow-sm border-slate-200", driver.borderColor)}>
                {/* Removed hover:shadow-md (Block 4) */}
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
                  {data?.table.map((product) => (
                    <TableRow key={product.produto_id} className="group">
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          <span className="text-xs text-slate-500">{product.category}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-slate-600">{product.views}</TableCell>
                      <TableCell className="text-right text-slate-600">{product.adicoes}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium text-slate-700">{product.conv_maestro}</span>
                        <span className="block text-[10px] text-slate-400">Org: {product.conv_organica}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">{product.lift}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-900">R$ {product.receita_atribuida}</TableCell>
                      <TableCell className="text-right">
                        {/* Block 3: Detail Button Fixed */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleProductDetails(product)}
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        >
                          Detalhes
                        </Button>
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



      </div >
    </div >
  );

  return content;
};

export default IntelligenceImpact;
