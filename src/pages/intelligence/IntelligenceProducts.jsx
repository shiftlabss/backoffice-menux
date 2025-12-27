import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/Tooltip';
import { intelligenceService } from '../../services/dataService';
import { toast } from 'react-hot-toast';
import {
  Package,
  TrendingUp,
  Layers,
  Loader2,
  DollarSign,
  ArrowUpRight,
  Utensils,
  Info
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_KPIS } from '../../services/mockIntelligence';
import ProductDetailDrawer from '../../components/intelligence/ProductDetailDrawer';
import { ProductRowCard } from '../../components/intelligence/ProductRowCard';

// Redesign Components
import { ActiveCombosList } from '../../components/intelligence/combinations/ActiveCombosList';
import { SuggestedCombosList } from '../../components/intelligence/combinations/SuggestedCombosList';
import { MaestroSuggestionsList } from '../../components/intelligence/combinations/MaestroSuggestionsList';
import { EditComboDrawer } from '../../components/intelligence/combinations/EditComboDrawer';
import { ReviewSuggestionDrawer } from '../../components/intelligence/combinations/ReviewSuggestionDrawer';
import { ComboPerformanceRow } from '../../components/intelligence/ComboPerformanceRow';
import ComboAnalysisDrawer from '../../components/intelligence/ComboAnalysisDrawer';

export default function IntelligenceProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [period, setPeriod] = useState('today');
  const [filters, setFilters] = useState({ shift: 'all', channel: 'all', category: 'all' });
  const [sortBy, setSortBy] = useState('revenue');
  const [searchTerm, setSearchTerm] = useState('');

  // Drawers State
  const [activeDrawer, setActiveDrawer] = useState(null); // 'product-detail' | 'edit-combo' | 'review-suggestion' | 'analyze-combo'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  // State for Combo Performance Block
  const [comboPerformanceData, setComboPerformanceData] = useState([]);

  // --- Real State for Combos Section ---
  const [combosSortBy, setCombosSortBy] = useState('impact');
  const [combosSearchTerm, setCombosSearchTerm] = useState('');

  // Mock Data for Combos Section
  const [activeCombos, setActiveCombos] = useState([
    {
      id: 'c1',
      name: 'Combo Família Inteligente',
      items: ['2x Burger', '2x Batata', '1x Refri 2L'],
      revenue: 'R$ 890,00',
      revenue_trend: '+12%',
      ticket_lift: '+15%',
      orders_count: 58,
      status: 'Active'
    },
    {
      id: 'c2',
      name: 'Trio Universitário',
      items: ['Pizza Média', 'Refri Lata'],
      revenue: 'R$ 450,00',
      revenue_trend: '-5%',
      ticket_lift: '+8%',
      orders_count: 32,
      status: 'Active'
    },
  ]);

  const [suggestedCombos, setSuggestedCombos] = useState([
    {
      id: 's1',
      name: 'Combo Happy Hour',
      items: ['Porção Fritas', '2x Chopp'],
      estimated_revenue: 'R$ 1.200,00',
      ticket_lift: '+25%',
      impact: 'Alto',
      confidence: 'Alta',
      base_size: '150 peds',
      time_estimate: '2 min',
      evidence: 'Evidência: alta visualização conjunta e baixa conversão separados às 18h',
      status: 'Suggested'
    },
    {
      id: 's2',
      name: 'Dupla Doce',
      items: ['2x Petit Gateau'],
      estimated_revenue: 'R$ 350,00',
      ticket_lift: '+40%',
      impact: 'Médio',
      confidence: 'Média',
      base_size: '80 peds',
      time_estimate: '5 min',
      evidence: 'Evidência: Padrão repetido em 3 sextas-feiras seguidas',
      status: 'Suggested'
    },
  ]);

  const [maestroSuggestions, setMaestroSuggestions] = useState([
    {
      id: 'm1',
      type: 'Harmonização',
      impact: 'Alto',
      title: 'Vinhos para Carnes',
      description: "A 'Picanha na Brasa' é seu item mais vendido. Sugira o vinho 'Malbec Argentino' automaticamente quando ela for adicionada ao carrinho.",
      metrics: { projection: '+ R$ 1.800', evidence: 'Correlação de 18% em pedidos premium' },
      tags: { confidence: 'Alta', base: '500 un', time: '5 min' },
      canApply: true
    },
    {
      id: 'm2',
      type: 'Tamanho',
      impact: 'Médio',
      title: 'Upsell de Sucos',
      description: "80% dos clientes pedem suco de 300ml. A margem no de 500ml é 40% maior. Ative a sugestão de upgrade.",
      metrics: { projection: '+ R$ 900', evidence: 'Ticket médio atual abaixo do potencial' },
      tags: { confidence: 'Média', base: '120 un', time: '2 min' },
      canApply: false // Should show 'Em breve'
    }
  ]);

  useEffect(() => {
    fetchProducts();
    fetchComboPerformance(); // Fetch combos for performance block
  }, [filters, period, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      const data = await intelligenceService.getProducts();

      // Filter: Strictly exclude 'Combos' category
      const productsOnly = data.filter(p => p.category !== 'Combos');

      const enhancedData = productsOnly.map(p => ({
        ...p,
        conv_maestro: (p.conversion_rate * 1.15).toFixed(1),
        conv_organic: (p.conversion_rate * 0.9).toFixed(1),
        lift: "+18%",
        acceptance_rate: "High",
        revenue_total: p.revenue_attributed,
        revenue_incremental: p.revenue_attributed * 0.2,
        dominant_opportunity: p.category === 'Lanches' ? 'upsell' : 'cross-sell',
        base_sessions: Math.floor(Math.random() * 1000) + 500
      }));

      // Sorting: Revenue > Lift > Base
      const sortedData = enhancedData.sort((a, b) => {
        if (b.revenue_attributed !== a.revenue_attributed) return b.revenue_attributed - a.revenue_attributed;
        const liftA = parseInt(a.lift?.replace(/\D/g, '') || 0);
        const liftB = parseInt(b.lift?.replace(/\D/g, '') || 0);
        if (liftB !== liftA) return liftB - liftA;
        return b.base_sessions - a.base_sessions;
      });

      setProducts(sortedData);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar dados de produtos.");
    } finally {
      setLoading(false);
    }
  };

  // Mock Fetch for Combo Performance Block
  const fetchComboPerformance = () => {
    // Mock data mirroring ProductRowCard structure but for Combos
    const mockCombos = [
      {
        id: 'c1',
        name: 'Combo Família Inteligente',
        category: 'Combos',
        recommendations_count: 3,
        revenue_total: 3500.00,
        revenue_incremental: 700.00,
        conv_maestro: 28.7,
        conv_organic: 22.5,
        lift: '+18%',
        base_sessions: 672,
        suggestions_count: 36,
        dominant_opportunity: 'promo',
        status: 'Active'
      },
      {
        id: 'c2',
        name: 'Trio Universitário',
        category: 'Combos',
        recommendations_count: 1,
        revenue_total: 1200.00,
        revenue_incremental: 150.00,
        conv_maestro: 15.2,
        conv_organic: 12.0,
        lift: '+12%',
        base_sessions: 420,
        suggestions_count: 15,
        dominant_opportunity: 'upsell',
        status: 'Active'
      }
    ];
    setComboPerformanceData(mockCombos);
  };

  // Handlers
  const handleAnalyzeCombo = (combo) => {
    setSelectedCombo(combo);
    setActiveDrawer('analyze-combo');
  };

  // --- Handlers for Combos ---

  const handleNewCombo = () => {
    setSelectedCombo(null); // Clear selection for new
    setActiveDrawer('edit-combo');
  };

  const handleEditCombo = (combo) => {
    setSelectedCombo(combo);
    setActiveDrawer('edit-combo');
  };

  const handleSaveCombo = (formData) => {
    if (formData.id) {
      // Update existing
      setActiveCombos(prev => prev.map(c => c.id === formData.id ? { ...c, ...formData } : c));
      toast.success("Combo atualizado.");
    } else {
      // Create new
      const newCombo = {
        id: `nc-${Date.now()}`,
        name: formData.name,
        items: formData.items?.map(i => i.name) || ['Item Novo 1', 'Item Novo 2'], // Mock items
        revenue: 'R$ 0,00',
        revenue_trend: '-',
        ticket_lift: '0%',
        orders_count: 0,
        status: formData.status === 'Active' ? 'Active' : 'Paused',
        ...formData
      };

      // If active, add to list (if paused, logic might differ but for now add to list)
      setActiveCombos(prev => [newCombo, ...prev]);
      toast.success("Combo criado.");
    }
    setActiveDrawer(null);
  };

  const handleToggleStatus = (combo) => {
    if (combo.status === 'Active') {
      // Pause logic could have modal, for now direct toast
      setActiveCombos(prev => prev.map(c => c.id === combo.id ? { ...c, status: 'Paused' } : c));
      toast.success("Combo pausado.");
    } else {
      setActiveCombos(prev => prev.map(c => c.id === combo.id ? { ...c, status: 'Active' } : c));
      toast.success("Combo reativado.");
    }
  };

  const handleReviewSuggestion = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setActiveDrawer('review-suggestion');
  };

  const handleApplySuggestion = () => {
    // Mock apply logic
    toast.success("Sugestão aplicada com sucesso.");

    // Remove from suggestions
    setSuggestedCombos(prev => prev.filter(s => s.id !== selectedSuggestion.id));

    // Add to active (Mock transformation)
    const newActive = {
      id: selectedSuggestion.id,
      name: selectedSuggestion.name,
      items: selectedSuggestion.items,
      revenue: 'R$ 0,00',
      ticket_lift: selectedSuggestion.ticket_lift || '+10%',
      orders_count: 0,
      status: 'Active',
      revenue_trend: '+'
    };
    setActiveCombos(prev => [newActive, ...prev]);

    setActiveDrawer(null);
  };

  const handleIgnoreSuggestion = (item) => {
    toast("Sugestão ignorada por 7 dias.");
    if (item.status === 'Suggested') {
      setSuggestedCombos(prev => prev.filter(s => s.id !== item.id));
    } else {
      setMaestroSuggestions(prev => prev.filter(s => s.id !== item.id));
    }
  };

  const handleApplyMaestro = (suggestion) => {
    toast.success(`Aplicando ${suggestion.title}...`);
    // Mock apply
    setTimeout(() => {
      setMaestroSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
      toast.success("Sugestão ativada!");
    }, 800);
  };


  // Filtered Combos (Search)
  const filteredActiveCombos = activeCombos.filter(c =>
    c.name.toLowerCase().includes(combosSearchTerm.toLowerCase()) ||
    c.items.some(i => i.toLowerCase().includes(combosSearchTerm.toLowerCase()))
  );

  const filteredSuggestedCombos = suggestedCombos.filter(c =>
    c.name.toLowerCase().includes(combosSearchTerm.toLowerCase()) ||
    c.items.some(i => i.toLowerCase().includes(combosSearchTerm.toLowerCase()))
  );


  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div className="space-y-8">

        {/* 3. Product Performance List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Performance por Produto
                {loading && <Loader2 size={16} className="animate-spin text-slate-400" />}
              </h2>
              <p className="text-sm text-slate-500">Combos aparecem na seção Combos abaixo.</p>
            </div>

          </div>

          <div className="space-y-3">
            {loading ? (
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


        {/* ================================================================================= */}
        {/* 4. REDESIGNED COMBOS SECTION */}
        {/* ================================================================================= */}

        {/* NEW: Performance por Combos Block */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Performance por Combos</h3>
              <p className="text-sm text-slate-500">Este bloco analisa combos. Para criar e pausar, use Combos ativos abaixo.</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {comboPerformanceData.map(combo => (
              <ComboPerformanceRow
                key={combo.id}
                combo={combo}
                isExpanded={false}
                onAnalyze={() => handleAnalyzeCombo(combo)}
              />
            ))}
          </div>
        </div>

        <div className="pt-10 pb-10">




          {/* Maestro Suggestions Block */}
          <div className="mt-8">
            <MaestroSuggestionsList
              suggestions={maestroSuggestions}
              onApply={handleApplyMaestro}
              onIgnore={handleIgnoreSuggestion}
              onDetails={() => toast("Ver detalhes da oportunidade")}
            />
          </div>
        </div>

        {/* NEW: Performance por Combos Block (Actually, user wanted this BETWEEN Product and Active Combos)
            Wait, in the previous broken file, it was inserted ABOVE the Redesigned Combos Section.
            Checking line 212 of broken file: "NEW: Performance por Combos Block"
            I missed including this block in my 'logic' analysis above, but I should verify the order.
            
            Order:
            1. Product Performance
            2. Combo Performance
            3. Active/Suggested Combos
            
            My current write_to_file `return` block above has:
            1. Product Performance
            2. Redesigned Combos Section (Active/Suggested)
            
            I MISSING THE COMBO PERFORMANCE BLOCK!
            I need to add it back.
        */}



        {/* --- Drawers --- */}

        <ProductDetailDrawer
          isOpen={activeDrawer === 'product-detail'}
          onClose={() => { setActiveDrawer(null); setSelectedProduct(null); }}
          product={selectedProduct}
        />

        <ComboAnalysisDrawer
          isOpen={activeDrawer === 'analyze-combo'}
          onClose={() => setActiveDrawer(null)}
          combo={selectedCombo}
          onEdit={(c) => {
            setActiveDrawer('edit-combo');
          }}
        />

        <EditComboDrawer
          isOpen={activeDrawer === 'edit-combo'}
          onClose={() => setActiveDrawer(null)}
          combo={selectedCombo}
          onSave={handleSaveCombo}
        />

        <ReviewSuggestionDrawer
          isOpen={activeDrawer === 'review-suggestion'}
          onClose={() => setActiveDrawer(null)}
          suggestion={selectedSuggestion}
          onApply={handleApplySuggestion}
          onEditBefore={() => {
            setActiveDrawer(null);
            setTimeout(() => handleEditCombo({
              name: selectedSuggestion.name,
              items: selectedSuggestion.items,
            }), 200);
          }}
        />

      </div>
    </TooltipProvider>
  );
}

// KPI Component
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
