import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

import { Drawer } from '../../components/ui/Drawer';
import { Select } from '../../components/ui/Select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/Tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/DropdownMenu';
import { intelligenceService } from '../../services/dataService';
import { toast } from 'react-hot-toast';
import {
  Package,
  Sparkles,
  TrendingUp,
  Layers,
  Loader2,
  DollarSign,
  ArrowUpRight,
  Utensils,
  Search,
  MoreHorizontal,
  Plus,
  ChevronRight,
  XCircle,
  CheckCircle2,
  Info,
  Filter,
  Eye,
  FileText,
  Clock,
  Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';
import { MOCK_KPIS } from '../../services/mockIntelligence';
import ProductDetailDrawer from '../../components/intelligence/ProductDetailDrawer';
import { ProductRowCard } from '../../components/intelligence/ProductRowCard';

export default function IntelligenceProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [period, setPeriod] = useState('today');
  const [filters, setFilters] = useState({ shift: 'all', channel: 'all', category: 'all' });
  const [sortBy, setSortBy] = useState('revenue');
  const [searchTerm, setSearchTerm] = useState('');

  // Drawer State
  const [activeDrawer, setActiveDrawer] = useState(null); // 'product-detail' | 'new-combo' | 'evidence'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedProductId, setExpandedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [filters, period, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      const data = await intelligenceService.getProducts();

      // Synthesize extra fields for "Helena Costa" requirements
      const enhancedData = data.map(p => ({
        ...p,
        conv_maestro: (p.conversion_rate * 1.15).toFixed(1),
        conv_organic: (p.conversion_rate * 0.9).toFixed(1),
        lift: "+18%",
        acceptance_rate: "High",
        // Mock revenue breakdown
        revenue_total: p.revenue_attributed,
        revenue_incremental: p.revenue_attributed * 0.2, // Mock 20% incremental
        dominant_opportunity: p.category === 'Lanches' ? 'upsell' : p.category === 'Combos' ? 'promo' : 'cross-sell',
        base_sessions: Math.floor(Math.random() * 1000) + 500,
        next_step: p.recommendations_count > 5 ? 'Criar combo' : 'Melhorar foto'
      }));

      // Sorting logic (mock)
      const sortedData = enhancedData.sort((a, b) => {
        if (sortBy === 'revenue') return b.revenue_attributed - a.revenue_attributed;
        if (sortBy === 'conversion') return b.conversion_rate - a.conversion_rate;
        return 0;
      });

      setProducts(sortedData);
    } catch (err) {
      toast.error("Erro ao carregar dados de produtos.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Combos Data Split
  const activeCombos = [
    { name: 'Combo Família Inteligente', items: ['2x Burger', '2x Batata', '1x Refri 2L'], revenue: 'R$ 890,00', ticketVar: '+15%', status: 'Ativo' },
    { name: 'Trio Universitário', items: ['Pizza Média', 'Refri Lata'], revenue: 'R$ 450,00', ticketVar: '+8%', status: 'Ativo' },
  ];

  const suggestedCombos = [
    { name: 'Combo Happy Hour', items: ['Porção Fritas', '2x Chopp'], potential_revenue: 'R$ 1.200,00', impact: 'Alto', status: 'Sugerido' },
    { name: 'Dupla Doce', items: ['2x Petit Gateau'], potential_revenue: 'R$ 350,00', impact: 'Médio', status: 'Sugerido' },
  ];

  // Filtering
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div className="space-y-8">



        {/* 2. Executive KPIs (Static) - 2 Blocks of 3 */}
        <div className="flex flex-col gap-6">
          {/* Block 1: Main Impacts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPICard
              title="Receita Atribuída (IA)"
              value={`R$ ${MOCK_KPIS.ai_revenue}`}
              trend="+12%"
              icon={DollarSign}
              color="text-emerald-600"
              tooltip="Faturamento proveniente direto de sugestões aceitas."
              base="Base: 450 pedidos"
            />
            <KPICard
              title="Produtos Influenciados"
              value="12"
              trend="+3"
              icon={Package}
              color="text-purple-600"
              tooltip="Número de SKUs distintos que receberam um boost de vendas via IA."
              base="Total catálogo: 85"
            />
            <KPICard
              title="Lift de Conversão"
              value="+15%"
              trend="vs média"
              icon={TrendingUp}
              color="text-blue-600"
              tooltip="Aumento percentual na taxa de conversão quando há sugestão."
              base="Comparativo A/B"
            />
          </div>

          {/* Block 2: Operational Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPICard
              title="Ticket Médio (Com IA)"
              value="R$ 85,50"
              trend="+18%"
              icon={ArrowUpRight}
              color="text-orange-600"
              tooltip="Ticket médio de pedidos que contêm pelo menos uma sugestão aceita."
              base="vs R$ 72 sem IA"
            />
            <KPICard
              title="Vendas de Combos"
              value="450"
              trend="+5%"
              icon={Layers}
              color="text-pink-600"
              tooltip="Total de combos vendidos no período."
              base="Meta: 400"
            />
            <KPICard
              title="Margem Média"
              value="32%"
              trend="-1%"
              icon={Utensils}
              color="text-slate-600"
              tooltip="Margem de contribuição média dos produtos influenciados (Estimada)."
              base="Custo vs Preço Venda"
            />
          </div>
        </div>

        {/* 3. Product Performance List (Redesign: Card Rows) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Performance por Produto
              {loading && <Loader2 size={16} className="animate-spin text-slate-400" />}
            </h2>
          </div>

          <div className="space-y-3">
            {loading ? (
              // Loading Skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="h-24 w-full bg-slate-50 border-slate-100 animate-pulse" />
              ))
            ) : filteredProducts.length === 0 ? (
              <div className="p-8 text-center text-slate-500 bg-slate-50 border border-slate-100 rounded-lg border-dashed">
                Nenhum produto encontrado.
              </div>
            ) : (
              filteredProducts.map((p) => (
                <ProductRowCard
                  key={p.id}
                  product={p}
                  isExpanded={expandedProductId === p.id}
                  onToggleExpand={() => setExpandedProductId(expandedProductId === p.id ? null : p.id)}
                  onAnalyze={() => { setSelectedProduct(p); setActiveDrawer('product-detail'); }}
                />
              ))
            )}
          </div>
        </div>

        {/* 4. Combos Layout (Active vs Suggested) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">

          {/* Active Combos */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-500" />
              Combos Ativos
            </h3>
            <div className="space-y-3">
              {activeCombos.map((combo, i) => (
                <Card key={i} className="p-4 border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 text-sm">{combo.name}</h4>
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">Ativo</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{combo.items.join(' + ')}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs">
                    <div className="flex gap-3">
                      <span className="font-medium text-slate-700">Rec: {combo.revenue}</span>
                      <span className="font-medium text-green-600">{combo.ticketVar} tkt</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-slate-400 hover:text-purple-600 font-medium">Editar</button>
                      <button className="text-slate-400 hover:text-red-600 font-medium">Pausar</button>
                    </div>
                  </div>
                </Card>
              ))}
              {activeCombos.length === 0 && <p className="text-sm text-slate-500 italic">Nenhum combo ativo.</p>}
            </div>
          </div>

          {/* Suggested Combos */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles size={20} className="text-purple-500" />
                Sugestões de Combos
              </h3>
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setActiveDrawer('new-combo')}>
                <Plus size={14} className="mr-1" /> Novo Combo
              </Button>
            </div>

            <div className="space-y-3">
              {suggestedCombos.map((combo, i) => (
                <Card key={i} className="p-4 border border-purple-100 bg-purple-50/30 hover:bg-purple-50/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 text-sm">{combo.name}</h4>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-[10px]">Sugerido</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{combo.items.join(' + ')}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-purple-100 text-xs">
                    <div>
                      <span className="block font-bold text-slate-700">Est. {combo.potential_revenue}</span>
                      <span className="text-[10px] text-slate-400">Impacto {combo.impact}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="h-7 bg-purple-600 hover:bg-purple-700 text-white text-[10px] px-3">
                        Revisar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>

        {/* 5. Maestro Suggestions (Standardized Cards) */}
        <div className="pt-8 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Utensils size={20} className="text-slate-600" />
            Sugestões do Maestro para Produtos e Combos
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <MaestroCard
              type="Combo"
              impact="Alto Impacto"
              impactColor="green"
              title="Combo de Almoço Executivo"
              description="Seus pratos executivos têm alta saída entre 11h e 14h, mas baixo ticket médio. Crie um combo com bebida e sobremesa 'mini' para aumentar o ticket em 25%."
              projection="+ R$ 2.400/mês"
              evidence="150 pedidos analisados no almoço."
              confidence="Alta"
              base="120 un"
              time="15 min"
              onApply={() => toast.success("Aplicando...")}
              onIgnore={() => toast('Sugestão ignorada')}
            />
            {/* Card 2 */}
            <MaestroCard
              type="Harmonização"
              impact="Médio Impacto"
              impactColor="yellow"
              title="Vinhos para Carnes"
              description="A 'Picanha na Brasa' é seu item mais vendido. Sugira o vinho 'Malbec Argentino' automaticamente quando ela for adicionada ao carrinho."
              projection="+ R$ 1.800/mês"
              evidence="Correlação de 18% em pedidos premium."
              confidence="Média"
              base="80 un"
              time="5 min"
              onApply={() => toast.success("Aplicando...")}
              onIgnore={() => toast('Sugestão ignorada')}
            />
            {/* Card 3 */}
            <MaestroCard
              type="Tamanho"
              impact="Alto Impacto"
              impactColor="green"
              title="Upsell de Sucos"
              description="80% dos clientes pedem suco de 300ml. A margem no de 500ml é 40% maior. Ative a sugestão de upgrade por +R$ 4,00."
              projection="+ R$ 900/mês"
              evidence="Ticket médio atual abaixo do potencial."
              confidence="Alta"
              base="400 un"
              time="2 min"
              onApply={() => toast.success("Aplicando...")}
              onIgnore={() => toast('Sugestão ignorada')}
            />
          </div>
        </div>

        {/* --- Drawers --- */}

        {/* Product Detail Drawer */}
        <ProductDetailDrawer
          isOpen={activeDrawer === 'product-detail'}
          onClose={() => { setActiveDrawer(null); setSelectedProduct(null); }}
          product={selectedProduct}
        />

        {/* New Combo Wizard Mock */}
        <Drawer
          isOpen={activeDrawer === 'new-combo'}
          onClose={() => setActiveDrawer(null)}
          title="Assistente de Combos"
          size="lg"
        >
          <div className="space-y-6">
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
              <h4 className="font-bold text-purple-900 mb-1 flex items-center gap-2"><Sparkles size={14} /> Sugestão da IA</h4>
              <p className="text-sm text-purple-800">Identificamos que <strong>Hamburguer + Milkshake</strong> são vendidos juntos em <strong>35%</strong> dos pedidos de Domingo à noite.</p>
            </div>

            {/* Wizard Steps Mock */}
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between px-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span className="text-purple-600">1. Itens</span>
                <span className="text-slate-300">------------</span>
                <span>2. Preço</span>
                <span className="text-slate-300">------------</span>
                <span>3. Regras</span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setActiveDrawer(null)}>Cancelar</Button>
              <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => { toast.success("Combo criado!"); setActiveDrawer(null); }}>
                Avançar
              </Button>
            </div>
          </div>
        </Drawer>

      </div >
    </TooltipProvider>
  );
}

// Helper Components

const KPICard = ({ title, value, trend, icon: Icon, color, tooltip, base }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm h-full flex flex-col justify-between select-none">
        <div className="flex justify-between items-start mb-2">
          <Icon size={18} className={cn("opacity-80", color)} />
          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full",
            trend.includes('+') ? "bg-green-50 text-green-700" :
              trend.includes('-') ? "bg-red-50 text-red-700" : "bg-slate-50 text-slate-600"
          )}>{trend}</span>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase truncate">{title}</p>
            <Info size={10} className="text-slate-300" />
          </div>
          {base && <p className="text-[9px] text-slate-400 mt-1">{base}</p>}
        </div>
      </div>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="max-w-[200px]">
      <p className="text-xs">{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

const MaestroCard = ({ type, impact, impactColor, title, description, projection, evidence, confidence, base, time, onApply, onIgnore }) => (
  <Card className={cn("flex flex-col h-full border-t-4 hover:shadow-lg transition-shadow bg-white",
    impactColor === 'green' ? "border-emerald-500" :
      impactColor === 'yellow' ? "border-amber-500" : "border-red-500"
  )}>
    <div className="p-6 flex-1">
      <div className="flex justify-between items-start mb-4">
        <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">{type}</Badge>
        <div className="flex items-center gap-2">
          <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full",
            impactColor === 'green' ? "bg-emerald-50 text-emerald-700" :
              impactColor === 'yellow' ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
          )}>{impact}</span>
        </div>
      </div>

      <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">{description}</p>

      {/* Metric Block */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={16} className="text-emerald-600" />
          <span className="font-bold text-slate-900">{projection}</span>
          <span className="text-[10px] text-slate-500 uppercase">projeção</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2 size={12} className="text-slate-400" />
          {evidence}
        </div>
      </div>

      <div className="flex gap-4 text-xs text-slate-500 px-1">
        <div className="flex flex-col">
          <span className="font-bold text-slate-700">{confidence}</span>
          <span className="text-[9px] uppercase">Confiança</span>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="flex flex-col">
          <span className="font-bold text-slate-700">{base}</span>
          <span className="text-[9px] uppercase">Base</span>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="flex flex-col">
          <span className="font-bold text-slate-700">{time}</span>
          <span className="text-[9px] uppercase">Tempo</span>
        </div>
      </div>
    </div>

    <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex gap-2">
      <Button variant="outline" className="flex-1 bg-white text-slate-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50" size="sm" onClick={onIgnore}>
        Ignorar
      </Button>
      <Button className="flex-1 bg-slate-900 text-white hover:bg-slate-800" size="sm" onClick={onApply}>
        Aplicar Agora
      </Button>
    </div>
  </Card>
);
