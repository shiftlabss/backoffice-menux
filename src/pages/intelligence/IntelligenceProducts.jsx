import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAudit } from '../../hooks/useAudit';
import { intelligenceService } from '../../services/dataService'; // Keep for products fetch
import { ProductsFilterBar } from '../../components/intelligence/products/ProductsFilterBar';
import { MaestroSummary } from '../../components/intelligence/products/MaestroSummary';
import { MaestroActionList } from '../../components/intelligence/products/MaestroActionList';
import { UniversalActionDrawer } from '../../components/intelligence/products/UniversalActionDrawer';
import { RankingsTabs } from '../../components/intelligence/products/RankingsTabs';

// Mock Data Generators for new actionable schema
const generateOpportunities = () => [
  {
    id: 'opp-1',
    priority: 'Alta',
    title: 'Sugerir Harmonização com Vinhos',
    entity_type: 'product',
    entity_name: 'Picanha na Chapa',
    evidence: 'Picanha tem alta saída (80 un/sem) mas venda de vinhos caiu 15%.',
    impact: 'Est. +R$ 1.800/sem',
    confidence: 'Alta',
    time_estimate: '2 min',
    can_apply: true,
    description: "Ativar regra de sugestão automática: Quando cliente adicionar 'Picanha na Chapa', sugerir 'Malbec Argentino' com 10% OFF.",
    diff_before: "Nenhuma sugestão configurada.",
    diff_after: "Regra ativa: Sugerir Malbec quando Picanha > 0.",
  },
  {
    id: 'opp-2',
    priority: 'Alta',
    title: 'Criar Combo "Happy Hour"',
    entity_type: 'combo',
    entity_name: 'Novo Combo',
    evidence: 'Pico de pedidos de cerveja e fritas entre 17h-19h sextas-feiras.',
    impact: 'Est. +R$ 1.200/sex',
    confidence: 'Média',
    time_estimate: '5 min',
    can_apply: true,
    description: "Agrupar 'Porção de Fritas' + '2 Chopps' por preço promocional apenas no horário de Happy Hour.",
  },
  {
    id: 'opp-3',
    priority: 'Média',
    title: 'Ajustar Preço: Suco Natural',
    entity_type: 'product',
    entity_name: 'Suco de Laranja',
    evidence: 'Conversão 20% acima da média. Elasticidade permite aumento de R$ 1,00.',
    impact: 'Est. +R$ 450/sem',
    confidence: 'Alta',
    time_estimate: '1 min',
    can_apply: false // Mock "Em breve"
  },
  {
    id: 'opp-4',
    priority: 'Baixa',
    title: 'Melhorar Foto: Pudim',
    entity_type: 'product',
    entity_name: 'Pudim de Leite',
    evidence: 'Alta visualização mas baixa taxa de adição ao carrinho.',
    impact: 'Baixo',
    confidence: 'Baixa',
    time_estimate: '10 min',
    can_apply: false
  }
];

const generateMetrics = () => ({
  revenue_total: 'R$ 45.280',
  revenue_trend: '+12% vs. semana ant.',
  revenue_attributed: 'R$ 8.950',
  revenue_attributed_pct: '19.7%',
  top_opportunity_value: '+ R$ 1.800',
  top_opportunity_name: 'Harmonização Vinhos',
  menu_health_score: '85/100'
});

export default function IntelligenceProducts() {
  const { log } = useAudit();

  // State
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [opportunities, setOpportunities] = useState([]);
  const [metrics, setMetrics] = useState(null);

  // Rankings Data
  const [products, setProducts] = useState([]);
  const [combos, setCombos] = useState([]);

  // Drawer Action State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // Initial Fetch & Filter Effect
  useEffect(() => {
    fetchData();
    log('intelligence.products.page_view');
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mock API Delays and Responses
      await new Promise(r => setTimeout(r, 600));

      setOpportunities(generateOpportunities());
      setMetrics(generateMetrics());

      // Fetch Real Products (and filter for table)
      const productsData = await intelligenceService.getProducts();
      // Enhanced Product Data for UI
      const enhancedProducts = productsData
        .filter(p => !filters.search || p.name.toLowerCase().includes(filters.search.toLowerCase()))
        .map(p => ({
          ...p,
          revenue_total: p.revenue_attributed, // Mapping for compatibility
          revenue_incremental: p.revenue_attributed * 0.2, // Mock
          conv_maestro: 28,
          conv_organic: 22,
          lift: '+27%',
          recommendations_count: Math.floor(Math.random() * 5),
          base_sessions: 1200,
          dominant_opportunity: 'Cross-sell'
        }));
      setProducts(enhancedProducts);

      // Mock Combos
      setCombos([
        {
          id: 'c1',
          name: 'Combo Família',
          revenue_total: 3500,
          revenue_incremental: 500,
          lift: '+15%',
          recommendations_count: 2,
          base_sessions: 800,
          dominant_opportunity: 'Upsell',
          conv_maestro: 30,
          conv_organic: 25
        }
      ]);

    } catch (e) {
      console.error(e);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  // Actions Handlers
  const handleResolveAction = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setDrawerOpen(true);
    log('intelligence.products.resolve_click', { id: opportunity.id });
  };

  const handleEditAction = (opportunity) => {
    toast("Abrindo editor... (Mock)", { icon: "✏️" });
    log('intelligence.products.edit_click', { id: opportunity.id });
  };

  const handleIgnoreAction = (opportunity) => {
    toast("Oportunidade ignorada por 7 dias", { icon: "😴" });
    setOpportunities(prev => prev.filter(o => o.id !== opportunity.id));
    log('intelligence.products.ignore_click', { id: opportunity.id });
  };

  const handleApplyAction = (opportunity) => {
    // Logic handled inside drawer validation, this is the final commit
    setOpportunities(prev => prev.filter(o => o.id !== opportunity.id));
    setDrawerOpen(false);
    // Maybe refresh data here
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">

      {/* 1. Context & Filters (Sticky) */}
      <ProductsFilterBar
        onFilterChange={setFilters}
        isLoading={loading}
      />

      <div className="max-w-[1600px] mx-auto px-6 space-y-8 mt-6">

        {/* 2. Maestro Summary */}
        <MaestroSummary
          metrics={metrics}
          onResolveTopAction={() => handleResolveAction(opportunities[0])}
        />

        {/* 3. Priority Actions List */}
        <MaestroActionList
          opportunities={opportunities}
          onResolve={handleResolveAction}
          onEdit={handleEditAction}
          onIgnore={handleIgnoreAction}
        />

        {/* 4. Rankings & Diagnostics (Tabs) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Análise Detalhada</h2>
          </div>
          <RankingsTabs
            products={products}
            combos={combos}
            loading={loading}
            onAnalyzeProduct={(p) => toast(`Analisando ${p.name}`)}
            onAnalyzeCombo={(c) => toast(`Analisando ${c.name}`)}
          />
        </div>

      </div>

      {/* 5. Drawers */}
      <UniversalActionDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        opportunity={selectedOpportunity}
        onApply={handleApplyAction}
      />

    </div>
  );
}
