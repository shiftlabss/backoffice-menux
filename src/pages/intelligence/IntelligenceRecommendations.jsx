import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { WeatherCard } from '../../components/maestro/WeatherCard';
import { MaestroWeatherInsights } from '../../components/maestro/MaestroWeatherInsights';
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
  BarChart3
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_INSIGHT, MOCK_FORECAST, MOCK_KANBAN_DATA } from '../../services/mockIntelligence'; // Fallback mocks
import { KanbanBoard } from '../../components/maestro/kanban/KanbanBoard';

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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleApply = async (id, e) => {
    if (e) e.stopPropagation();
    toast.success("Ação aplicada com sucesso!");
    setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status: 'Aplicada' } : r));
  };

  const handleIgnore = async (id, e) => {
    if (e) e.stopPropagation();
    toast("Ação ignorada por 7 dias.", { icon: '🗓️' });
    setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status: 'Ignorada' } : r));
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

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">



      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">

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
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <ThermometerSun size={18} className="text-orange-500" /> Clima Hoje
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">São Paulo, SP</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setDrawerOpen('forecast')} className="text-purple-600 text-xs hover:bg-purple-50">
                  Ver próximas horas
                </Button>
              </div>

              {weatherLoading ? (
                <div className="flex-1 flex items-center justify-center animate-pulse bg-slate-100 rounded-lg h-32" />
              ) : weatherData ? (
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-50 rounded-full">
                      <CloudRain size={32} className="text-blue-500" />
                    </div>
                    <div>
                      <span className="text-3xl font-bold text-slate-900">{Math.round(weatherData.current.temp)}°C</span>
                      <p className="text-sm text-slate-600 capitalize">{weatherData.current.condition}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-medium text-slate-700 mb-1">Impacto no consumo:</p>
                    <p className="text-sm text-slate-600 leading-snug">
                      Dia chuvoso tende a aumentar pedidos de delivery (+20%) e reduzir movimento no salão.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500">Dados indisponíveis</div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-purple-600" />
              <h3 className="font-bold text-slate-800">Sugestões baseadas no Clima</h3>
            </div>
            {weatherInsights ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {weatherInsights.insights.slice(0, 2).map((insight, idx) => (
                  <Card key={idx} className="p-4 border-l-4 border-l-purple-500 hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-purple-50 text-purple-700 text-[10px]">Agora</Badge>
                      <span className="text-[10px] text-slate-400 font-medium">Confiança Alta</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs text-slate-500 mb-3">Aumenta conversão em dias como hoje.</p>
                    <Button size="sm" className="w-full bg-slate-900 text-white hover:bg-slate-800 h-8 text-xs">
                      Aplicar Sugestão
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="h-32 bg-slate-50 rounded-xl border border-dashed flex items-center justify-center text-slate-400">
                Carregando insights climáticos...
              </div>
            )}
          </div>
        </div>

        {/* Bloco 3: Oportunidades Priorizadas (Kanban) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Oportunidades Priorizadas</h2>
            <div className="text-sm text-slate-500">
              Gerencie suas oportunidades por prioridade
            </div>
          </div>

          <KanbanBoard data={MOCK_KANBAN_DATA} />
        </div>



        {/* --- Drawers --- */}

        {/* Evidence Drawer */}
        <Drawer
          isOpen={drawerOpen === 'evidence'}
          onClose={() => { setDrawerOpen(null); setSelectedRec(null); }}
          title="Evidência da Sugestão"
          size="md" // changed from lg to md for cleaner look
        >
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 text-lg mb-1">{selectedRec?.title || "Análise de Contexto"}</h4>
              <p className="text-sm text-slate-600">{selectedRec?.context || "Análise detalhada do cenário atual comparado com a média histórica."}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-xs text-slate-500 uppercase font-semibold">Impacto Estimado</p>
                <p className="text-xl font-bold text-emerald-600 mt-1">{selectedRec?.impact_estimate || "+ R$ 450,00"}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-xs text-slate-500 uppercase font-semibold">Confiança</p>
                <p className="text-xl font-bold text-blue-600 mt-1">Alta (92%)</p>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <BarChart3 size={18} className="text-purple-600" /> Comparativo Histórico
              </h5>
              {/* Mock Mini Chart */}
              <div className="h-40 bg-slate-50 rounded-lg flex items-end justify-between p-4 px-8 border border-slate-100">
                <div className="w-8 bg-slate-300 h-[40%] rounded-t mx-auto relative group">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100">Sem IA</span>
                </div>
                <div className="w-8 bg-purple-500 h-[75%] rounded-t mx-auto relative group">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600 opacity-0 group-hover:opacity-100">Com IA</span>
                </div>
              </div>
              <div className="flex justify-between px-8 mt-2 text-xs text-slate-500 font-medium text-center">
                <span className="w-8 mx-auto">Média</span>
                <span className="w-8 mx-auto">Hoje</span>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <p className="text-xs font-bold text-amber-800 uppercase mb-1">Por que aplicar agora?</p>
              <p className="text-sm text-amber-900/80">O pico de movimento começa em 30 minutos. Aplicar agora maximiza a exposição.</p>
            </div>

            <div className="pt-4 flex gap-3">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white" onClick={() => { toast.success("Aplicado!"); setDrawerOpen(null); }}>
                Aplicar Agora
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setDrawerOpen(null)}>
                Fechar
              </Button>
            </div>
          </div>
        </Drawer>

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

      </div>
    </div>
  );
}

// Helper Components

const ContextCard = ({ title, value, subtext, icon: Icon, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
      <Icon size={16} className={cn("opacity-40 group-hover:opacity-100 transition-opacity", color)} />
    </div>
    <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
    <p className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors">{subtext}</p>
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
