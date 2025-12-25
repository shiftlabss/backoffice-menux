import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { WeatherCard } from '../../components/maestro/WeatherCard';
import { MaestroWeatherInsights } from '../../components/maestro/MaestroWeatherInsights';
import { WeatherSuggestionCard } from '../../components/maestro/WeatherSuggestionCard';
import { SuggestionEvidenceDrawer } from '../../components/dashboard/blocks/SuggestionEvidenceDrawer';
import { intelligenceService } from '../../services/dataService';
import { weatherService } from '../../services/weatherService';
import { toast } from 'react-hot-toast';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ThermometerSun,
  CloudRain,
  Activity,

  BarChart3,
  Download
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_INSIGHT, MOCK_FORECAST, MOCK_KANBAN_DATA } from '../../services/mockIntelligence'; // Fallback mocks
import { KanbanBoard } from '../../components/maestro/kanban/KanbanBoard';
import { ConfirmModal, useConfirmModal } from '../../components/ui/ConfirmModal';
import { useAudit } from '../../hooks/useAudit';

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

export default function IntelligenceRecommendations() {
  // State
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ period: 'today', shift: 'all', channel: 'all' });

  // Weather State
  const [weatherData, setWeatherData] = useState(null);
  const [weatherInsights, setWeatherInsights] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Drawers State
  const [drawerOpen, setDrawerOpen] = useState(null); // 'filters' | 'evidence' | 'forecast'
  const [selectedRec, setSelectedRec] = useState(null);

  // Collapsed Sections
  const [collapsedSections, setCollapsedSections] = useState({ high: false, medium: false, low: false });

  const { confirm, ConfirmModalComponent } = useConfirmModal();

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [recs] = await Promise.all([
        intelligenceService.getRecommendations()
      ]);
      setRecommendations(recs || []);

      // Initial Weather Fetch (Sao Paulo default)
      fetchWeather(-23.5505, -46.6333, 'São Paulo');
    } catch (err) {
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (lat, lon, cityName) => {
    try {
      setWeatherLoading(true);
      const data = await weatherService.getWeather(lat, lon, cityName);
      setWeatherData(data);
      if (data) {
        const insights = weatherService.generateInsights(data);
        setWeatherInsights(insights);
      }
    } catch (err) {
      console.error("Weather error", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleLocationChange = (city) => {
    fetchWeather(city.latitude, city.longitude, city.name);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleApply = async (id, e) => {
    if (e) e.stopPropagation();

    const rec = recommendations.find(r => r.id === id);
    const confirmed = await confirm({
      title: "Confirmar Aplicação",
      message: `Deseja aplicar a recomendação "${rec?.title || 'esta ação'}"? O impacto estimado é de ${rec?.impact_estimate || 'R$ 0,00'}.`,
      variant: "success",
      confirmText: "Aplicar Agora"
    });

    if (confirmed) {
      toast.success("Ação aplicada com sucesso!");
      setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status: 'Aplicada' } : r));
    }
  };

  const handleIgnore = async (id, e) => {
    if (e) e.stopPropagation();

    const confirmed = await confirm({
      title: "Ignorar Recomendação",
      message: "Tem certeza que deseja ignorar esta oportunidade por 7 dias? Ela não aparecerá no seu painel durante este período.",
      variant: "warning",
      confirmText: "Ignorar"
    });

    if (confirmed) {
      toast("Ação ignorada por 7 dias.", { icon: '🗓️' });
      setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status: 'Ignorada' } : r));
    }
  };

  // Group recommendations by priority/impact
  const groupedRecs = {
    high: recommendations.filter(r => r.impact_estimate && r.impact_estimate.includes('R$') && !r.status.match(/(Aplicada|Ignorada)/)), // Mock logic
    medium: recommendations.filter(r => !r.impact_estimate.includes('R$') && !r.status.match(/(Aplicada|Ignorada)/)),
    low: [] // Add low priority logic if needed
  };

  // Ensure items exist if mock data creates empty groups
  if (groupedRecs.high.length === 0 && recommendations.length > 0) {
    groupedRecs.high = recommendations.slice(0, 3);
    groupedRecs.medium = recommendations.slice(3);
  }

  const { log } = useAudit();
  const [kanbanData, setKanbanData] = useState(MOCK_KANBAN_DATA);

  const handleKanbanAction = async (action, card) => {
    if (action === 'evidence') {
      setSelectedRec(card);
      setDrawerOpen('evidence');
      log('opportunity.evidence.open', { opportunityId: card.id, title: card.title });
    } else if (action === 'apply') {
      const requiresApproval = card.requires_approval;

      const confirmed = await confirm({
        title: requiresApproval ? "Solicitar Aprovação" : "Confirmar Aplicação",
        message: requiresApproval
          ? `Esta ação requer aprovação. Deseja enviar s solicitação para "${card.title}"?`
          : `Deseja aplicar imediatamente "${card.title}"? O impacto estimado é de ${card.impact_day_est}.`,
        variant: requiresApproval ? "warning" : "success",
        confirmText: requiresApproval ? "Enviar Solicitação" : "Aplicar Agora",
        cancelText: "Cancelar"
      });

      if (confirmed) {
        // Update local state to reflect change
        setKanbanData(prev => {
          const newData = { ...prev };
          // Find which column the card is in
          Object.keys(newData).forEach(key => {
            newData[key] = newData[key].map(c => {
              if (c.id === card.id) {
                return {
                  ...c,
                  status: requiresApproval ? 'under_review' : 'applied'
                };
              }
              return c;
            });
          });
          return newData;
        });

        if (requiresApproval) {
          toast.success("Solicitação enviada para aprovação!");
          log('opportunity.apply.requested', { opportunityId: card.id, title: card.title });
        } else {
          toast.success("Oportunidade aplicada com sucesso!");
          log('opportunity.apply.confirmed', { opportunityId: card.id, title: card.title });
        }
      }
    }
  };

  return (
    <div className="space-y-8">

      {/* Bloco 1: Contexto do dia */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ContextCard
          title="Resumo do Dia"
          value="R$ 4.520"
          subtext="Previsão de fechamento"
          icon={Activity}
          color="text-purple-600"
          onClick={() => setDrawerOpen('evidence')}
        />
        <ContextCard
          title="Maior Gargalo"
          value="-15%"
          subtext="Conversão no delivery (Chuva)"
          icon={AlertTriangle}
          color="text-red-600"
          onClick={() => setDrawerOpen('evidence')}
        />
        <ContextCard
          title="Maior Oportunidade"
          value="+ R$ 450"
          subtext="Upsell de Bebidas (Almoço)"
          icon={TrendingUp}
          color="text-emerald-600"
          onClick={() => setDrawerOpen('evidence')}
        />
        <ContextCard
          title="Score de Confiança"
          value={`${MOCK_FORECAST.confidence_pct}%`}
          subtext="Alta precisão hoje"
          icon={CheckCircle2}
          color="text-blue-600"
          onClick={() => setDrawerOpen('evidence')}
        />
      </div>

      {/* Bloco 2: Clima hoje e impacto */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WeatherCard
            weatherData={weatherData}
            loading={weatherLoading}
            onLocationChange={handleLocationChange}
          />
        </div>

        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-purple-600" />
            <h3 className="font-bold text-slate-800">Sugestões baseadas no Clima</h3>
          </div>
          {weatherInsights ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {weatherInsights.insights.slice(0, 2).map((insight, idx) => {
                const isSecond = idx === 1;
                return (
                  <WeatherSuggestionCard
                    key={idx}
                    suggestion={{
                      id: idx,
                      timing: isSecond ? 'Próxima Hora' : 'Agora',
                      confidence: isSecond ? 'medium' : 'high',
                      title: insight.title,
                      insight: isSecond
                        ? "Aumento de 25% na probabilidade de chuva para o próximo turno (Jantar)."
                        : "Tempo quente (+30°C) reduz vendas de pratos quentes em 12% e aumenta bebidas geladas em 18%.",
                      actions: isSecond ? [
                        "Ativar 'Promoção Dia de Chuva' no Delivery",
                        "Reforçar equipe de entregadores",
                        "Sugerir 'Vinhos Tintos' no checkout"
                      ] : [
                        "Destacar categoria 'Bebidas'",
                        "Sugerir 'Sucos Naturais' no checkout",
                        "Ocultar 'Sopas' da home"
                      ],
                      impact: isSecond
                        ? "Impacto estimado: +R$ 150 a +R$ 300 hoje"
                        : "Impacto estimado: +R$ 280 a +R$ 420 hoje",
                      history: isSecond ? { sessions: 980, days: 10 } : { sessions: 1240, days: 14 }
                    }}
                    onApply={(s) => handleApply(999 + idx)} // Mock ID
                    onViewEvidence={() => setDrawerOpen('evidence')}
                    onEdit={() => toast("Abrindo wizard de edição (Mock)", { icon: '✏️' })}
                  />
                );
              })}
            </div>
          ) : (
            <div className="h-32 bg-slate-50 rounded-xl border border-dashed flex items-center justify-center text-slate-400">
              Carregando insights climáticos...
            </div>
          )}
        </div>
      </div>


      {/* Moved from Intelligence Impact: Oportunidades Identificadas */}
      <Card className="shadow-sm border-l-4 border-l-purple-500 overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Sparkles size={120} />
        </div>
        <div className="p-6 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Oportunidades Identificadas</h3>
              <p className="text-sm text-slate-500">Ações recomendadas para maximizar seu faturamento agora</p>
            </div>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendationsData.map((rec) => (
              <div key={rec.id} className="p-4 bg-white rounded-lg border border-slate-200 flex flex-col h-full">
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
                    <CheckCircle2 size={14} className="text-slate-300" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-2 leading-tight transition-colors">
                  {rec.title}
                </h4>
                <p className="text-xs text-slate-500 mb-4 line-clamp-3">
                  {rec.diagnosis}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Bloco 3: Oportunidades Priorizadas (Kanban) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Oportunidades Priorizadas</h2>
          <div className="text-sm text-slate-500">
            Gerencie suas oportunidades por prioridade
          </div>
        </div>

        <KanbanBoard data={kanbanData} onAction={handleKanbanAction} />
      </div>



      {/* --- Drawers --- */}

      <SuggestionEvidenceDrawer
        isOpen={drawerOpen === 'evidence'}
        onClose={() => { setDrawerOpen(null); setSelectedRec(null); }}
        suggestion={selectedRec}
        onApply={(rec) => {
          // If rec comes from drawer, it might be the same as selectedRec
          // Trigger the central apply logic
          handleKanbanAction('apply', rec);
        }}
        onEdit={(rec) => {
          toast("Abrindo editor... (Mock)", { icon: "✏️" });
        }}
      />

      {/* Forecast Drawer */}
      <Drawer
        isOpen={drawerOpen === 'forecast'}
        onClose={() => setDrawerOpen(null)}
        title="Clima: Próximas Horas"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Previsão hora-a-hora para planejamento operacional.</p>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map(i => {
              const hour = new Date().getHours() + i;
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-sm font-bold text-slate-700">{hour > 23 ? hour - 24 : hour}:00</span>
                  <div className="flex items-center gap-2">
                    <CloudRain size={16} className="text-blue-400" />
                    <span className="text-sm font-medium text-slate-600">22°C</span>
                  </div>
                  <span className="text-xs text-slate-400">Rain risk: 60%</span>
                </div>
              )
            })}
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-blue-800 text-sm mt-4">
            <strong>Resumo:</strong> Chuva deve intensificar às 20h. Prepare reforço para embalagens de delivery.
          </div>
        </div>
      </Drawer>

      {/* Filter Drawer (Placeholder) */}
      <Drawer
        isOpen={drawerOpen === 'filters'}
        onClose={() => setDrawerOpen(null)}
        title="Filtros Avançados"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Filtrar oportunidades por:</p>
          {/* Filter Controls would go here */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start font-normal text-slate-600">Categoria do Produto</Button>
            <Button variant="outline" className="w-full justify-start font-normal text-slate-600">Tipo de Oportunidade</Button>
            <Button variant="outline" className="w-full justify-start font-normal text-slate-600">Impacto Mínimo (R$)</Button>
          </div>
          <div className="pt-20">
            <Button className="w-full" onClick={() => setDrawerOpen(null)}>Aplicar Filtros</Button>
          </div>
        </div>
      </Drawer>

      <ConfirmModalComponent />
    </div>
  );
}

// Helper Components

const ContextCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div
    className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
      <Icon size={16} className={cn("opacity-40", color)} />
    </div>
    <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
    <p className="text-xs text-slate-400">{subtext}</p>
  </div>
);

const RecommendationRow = ({ rec, onApply, onIgnore, onViewEvidence }) => (
  <Card className="p-0 border border-slate-200 overflow-hidden hover:border-purple-300 transition-colors">
    <div className="p-4 grid grid-cols-12 gap-4 items-center">
      {/* Desc */}
      <div className="col-span-12 md:col-span-6">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg bg-slate-100 text-slate-600",
            rec.type === 'Upsell' && "bg-blue-50 text-blue-600",
            rec.type === 'Preço' && "bg-green-50 text-green-600"
          )}>
            {rec.type === 'Upsell' ? <TrendingUp size={18} /> :
              rec.type === 'Preço' ? <DollarSign size={18} /> : <Sparkles size={18} />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">{rec.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[10px] h-5 px-1">{rec.type}</Badge>
              <span className="text-xs text-slate-400 truncate max-w-[200px]">{rec.entity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="col-span-6 md:col-span-3">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-500 uppercase">Impacto Est.</span>
          <span className="text-sm font-bold text-emerald-600">{rec.impact_estimate}</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-1">Confiança Alta</div>
      </div>

      {/* Actions */}
      <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onViewEvidence(rec)} className="text-xs text-slate-500 h-8">
          Evidência
        </Button>
        <Button size="sm" onClick={(e) => onApply(rec.id, e)} className="bg-slate-900 text-white text-xs h-8 hover:bg-purple-700">
          Aplicar Agora
        </Button>
        <button onClick={(e) => onIgnore(rec.id, e)} className="text-slate-300 hover:text-red-400 transition-colors">
          <XCircle size={18} />
        </button>
      </div>
    </div>
  </Card>
);
