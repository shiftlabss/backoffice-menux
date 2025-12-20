import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { intelligenceService } from '../../services/dataService';
import { weatherService } from '../../services/weatherService';
import { toast } from 'react-hot-toast';
import {
  Sparkles,
  Search,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Filter
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ModuleLayout from '../../components/layout/ModuleLayout';
import { intelligenceSidebarItems } from '../../constants/intelligenceSidebar';
import { WeatherCard } from '../../components/maestro/WeatherCard';
import { MaestroWeatherInsights } from '../../components/maestro/MaestroWeatherInsights';
import { MOCK_INSIGHT } from '../../services/mockIntelligence';

export default function IntelligenceRecommendations() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Kept state for potential future use or if URL params need them, 
  // though the UI filter bar was removed.
  const [filterPeriod, setFilterPeriod] = useState('7d');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const [activeModal, setActiveModal] = useState(null); // 'review' | 'insight'
  const [selectedRec, setSelectedRec] = useState(null);

  // Weather & Insight State
  const [weatherData, setWeatherData] = useState(null);
  const [weatherInsights, setWeatherInsights] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [insight, setInsight] = useState(null);


  useEffect(() => {
    // If navigated from Insight Overview
    const insightId = searchParams.get('insightId');
    if (insightId) {
      setSearch('Insight related...');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchRecommendations();
    fetchWeather();
    fetchInsight();
  }, [filterPeriod, filterType, filterStatus]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const data = await intelligenceService.getRecommendations({
        period: filterPeriod,
        type: filterType,
        status: filterStatus
      });
      setRecommendations(data || []);
    } catch (error) {
      toast.error("Erro ao carregar recomendações.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (lat, lon, cityName) => {
    try {
      setWeatherLoading(true);
      const data = await weatherService.getWeather(lat, lon, cityName);
      setWeatherData(data);

      const insights = weatherService.generateInsights(data);
      setWeatherInsights(insights);
    } catch (err) {
      console.error("Weather error", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  const fetchInsight = async () => {
    try {
      const data = await intelligenceService.getInsight();
      setInsight(data);
    } catch (err) {
      setInsight(MOCK_INSIGHT);
    }
  }

  const filteredRecs = recommendations.filter(rec =>
    rec.title.toLowerCase().includes(search.toLowerCase()) ||
    rec.entity.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status: 'Aplicada' } : r));
      toast.success("Recomendação aplicada!");
      await intelligenceService.applyRecommendation(id);
    } catch (err) {
      toast.error("Erro ao aplicar.");
      fetchRecommendations();
    }
  };

  const handleIgnore = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status: 'Ignorada' } : r));
      toast('Recomendação ignorada.', { icon: '🚫' });
      await intelligenceService.ignoreRecommendation(id);
    } catch (err) {
      toast.error("Erro ao ignorar.");
      fetchRecommendations();
    }
  };

  const openReviewModal = (rec) => {
    setSelectedRec(rec);
    setActiveModal('review');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Upsell': return { icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'Preço': return { icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' };
      case 'Estoque': return { icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' };
      default: return { icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pendente': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>;
      case 'Aplicada': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Aplicada</Badge>;
      case 'Ignorada': return <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">Ignorada</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">

      {/* --- MOVED BLOCKS START --- */}

      {/* Block 1: Weather & Projections */}
      <div className="grid grid-cols-1 gap-4">
        <WeatherCard
          weatherData={weatherData}
          loading={weatherLoading}
          onLocationChange={(city) => fetchWeather(city.lat, city.lon, city.name)}
        />
      </div>

      {/* Weather Insights Section */}
      {weatherInsights && (
        <MaestroWeatherInsights
          weatherScenario={weatherInsights}
          insights={weatherInsights.insights}
          loading={weatherLoading}
        />
      )}

      {/* Block 2: Insight of the Day */}
      {insight && (
        <Card className="relative overflow-hidden border-purple-100 bg-purple-50/30 transition-all hover:bg-purple-50/50">
          <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
            <Sparkles className="w-32 h-32 text-purple-600" />
          </div>
          <div className="p-6 relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="p-3 bg-purple-100 rounded-2xl shrink-0 shadow-sm">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-foreground">Insight do Dia</h3>
                {insight.is_new && <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 text-[10px] h-5">Novo</Badge>}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                {insight.description}
              </p>
            </div>
            <Button onClick={() => setActiveModal('insight')} className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200 w-full sm:w-auto">
              Ver detalhes
            </Button>
          </div>
        </Card>
      )}

      {/* --- MOVED BLOCKS END --- */}

      {/* Recommendations List (New Design) */}
      <Card className="border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-muted flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-foreground text-sm">Últimas Recomendações</h3>
          {/* 'Ver histórico completo' removed as this IS the history page/full list */}
        </div>
        <div className="divide-y divide-[#F5F5F5]">
          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>
          ) : filteredRecs.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">Nenhuma recomendação encontrada.</div>
          ) : (
            filteredRecs.map((rec) => {
              const { icon: Icon, color, bg } = getIcon(rec.type);

              return (
                <div key={rec.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-2 rounded-full shrink-0 mt-0.5",
                      rec.type === 'Upsell' ? "bg-blue-50 text-blue-600" :
                        rec.type === 'Preço' ? "bg-green-50 text-green-600" :
                          "bg-orange-50 text-orange-600"
                    )}>
                      {rec.type === 'Upsell' ? <TrendingUp className="w-4 h-4" /> :
                        rec.type === 'Preço' ? <DollarSign className="w-4 h-4" /> :
                          <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{rec.title}</h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-gray-700 font-medium px-1.5 py-0.5 bg-gray-100 rounded">{rec.entity}</span>
                        <span className="text-gray-300 hidden sm:inline">•</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pl-12 sm:pl-0">
                    {getStatusBadge(rec.status)}
                    {rec.status === 'Pendente' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-xs hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200"
                        onClick={() => openReviewModal(rec)}
                      >
                        Revisar
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* --- MODALS --- */}

      {/* Insight Modal */}
      <Modal
        isOpen={activeModal === 'insight'}
        onClose={() => setActiveModal(null)}
        title="Detalhes do Insight"
      >
        {insight && (
          <div className="space-y-6">
            <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 shadow-inner">
              <h4 className="font-bold text-purple-950 mb-3 flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-purple-700" /> {insight.title}
              </h4>
              <p className="text-sm text-purple-900 leading-relaxed">
                {insight.full_description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                <p className="text-xs text-gray-500 uppercase font-semibold">Volume Analisado</p>
                <p className="text-lg font-bold text-foreground">{insight.order_volume} pedidos</p>
              </div>
              <div className="p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                <p className="text-xs text-gray-500 uppercase font-semibold">Impacto Conversão</p>
                <p className="text-lg font-bold text-green-600">+{insight.conversion_increase}%</p>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-bold text-gray-900 mb-2">Ação Sugerida</h5>
              <p className="text-sm text-gray-600 mb-6 bg-white border border-gray-200 p-3 rounded-lg">
                Criar oferta combinada ou destacar estes itens no topo do cardápio digital hoje.
              </p>

              <div className="flex gap-3 flex-col sm:flex-row">
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-11"
                  onClick={() => {
                    toast.success("Sugestão aplicada!");
                    setActiveModal(null);
                  }}
                >
                  Aplicar Sugestão Agora
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-11"
                  onClick={() => {
                    // navigate(`/intelligence/recommendations?insightId=${insight.id}`);
                    // Already IN recommendations, so maybe just filter?
                    setSearch('Insight related...');
                    setActiveModal(null);
                  }}
                >
                  Ver recomendações relacionadas
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Review Modal */}
      <Modal
        isOpen={activeModal === 'review'}
        onClose={() => setActiveModal(null)}
        title="Detalhes da Recomendação"
      >
        {selectedRec && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">{selectedRec.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Entidade: <span className="font-medium text-foreground">{selectedRec.entity}</span></p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h4 className="font-bold text-purple-900 text-sm mb-1">Por que a IA sugeriu isso?</h4>
              <p className="text-sm text-purple-800">{selectedRec.context}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <p className="text-xs text-gray-500">Impacto Financeiro</p>
                <p className="font-bold text-green-600">{selectedRec.impact_estimate}</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-xs text-gray-500">Tipo</p>
                <p className="font-bold text-gray-800">{selectedRec.type}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => { handleApply(selectedRec.id); setActiveModal(null); }}
                className="flex-1 bg-primary hover:bg-[#262626] text-white"
              >
                Aplicar Recomendação
              </Button>
              <Button
                variant="outline"
                onClick={() => { handleIgnore(selectedRec.id); setActiveModal(null); }}
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
              >
                Ignorar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
