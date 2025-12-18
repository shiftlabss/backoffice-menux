import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import {
  Sparkles,
  TrendingUp,
  Zap,
  ArrowRight,
  DollarSign,
  ShoppingBag,
  Percent,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function IntelligenceOverview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    forecast: null,
    insight: null,
    kpis: null,
    recommendations: []
  });

  const [activeModal, setActiveModal] = useState(null); // 'insight' | 'recommendation'
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [kpiPeriod, setKpiPeriod] = useState('7d');
  const [isRefreshingForecast, setIsRefreshingForecast] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, [kpiPeriod]);

  // Forecast Polling (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshForecast();
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [forecastRes, insightRes, kpisRes, recsRes] = await Promise.all([
        api.get('/intelligence/overview/forecast'),
        api.get('/intelligence/insight-of-the-day'),
        api.get(`/intelligence/overview/kpis?period=${kpiPeriod}`),
        api.get('/intelligence/recommendations?limit=5')
      ]);

      setData({
        forecast: forecastRes.data,
        insight: insightRes.data,
        kpis: kpisRes.data,
        recommendations: recsRes.data
      });
    } catch (error) {
      console.error("Error fetching intelligence data:", error);
      toast.error("Erro ao carregar dados de inteligência.");
    } finally {
      setLoading(false);
    }
  };

  const refreshForecast = async () => {
    setIsRefreshingForecast(true);
    try {
      const res = await api.get('/intelligence/overview/forecast');
      setData(prev => ({ ...prev, forecast: res.data }));
    } catch (err) {
      console.error("Error refreshing forecast", err);
    } finally {
      setIsRefreshingForecast(false);
    }
  };

  const handleReviewRecommendation = (rec) => {
    setSelectedRecommendation(rec);
    setActiveModal('recommendation');
  };

  const handleApplyRecommendation = async (id) => {
    try {
      // Optimistic update
      setData(prev => ({
        ...prev,
        recommendations: prev.recommendations.map(r => r.id === id ? { ...r, status: 'Aplicada' } : r)
      }));
      setActiveModal(null);
      toast.success("Recomendação aplicada com sucesso!");
      await api.post(`/intelligence/recommendations/${id}/apply`);
    } catch (err) {
      toast.error("Erro ao aplicar recomendação.");
      fetchData(); // Rollback on error
    }
  };

  const handleIgnoreRecommendation = async (id) => {
    try {
      setData(prev => ({
        ...prev,
        recommendations: prev.recommendations.map(r => r.id === id ? { ...r, status: 'Ignorada' } : r)
      }));
      setActiveModal(null);
      toast('Recomendação ignorada.', { icon: '🚫' });
      await api.post(`/intelligence/recommendations/${id}/ignore`);
    } catch (err) {
      toast.error("Erro ao ignorar.");
      fetchData();
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

  if (loading && !data.forecast) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-2 text-gray-500">Carregando inteligência...</span>
      </div>
    );
  }

  const { forecast, insight, kpis, recommendations } = data;

  const kpiItems = [
    { label: 'Receita via IA', value: `R$ ${(kpis?.ai_revenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', sub: kpis?.previous_period_comparison?.ai_revenue },
    { label: '% Faturamento', value: `${kpis?.ai_revenue_pct || 0}%`, icon: Percent, color: 'text-blue-600', bg: 'bg-blue-50', sub: null },
    { label: 'Pedidos com IA', value: kpis?.ai_orders || 0, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50', sub: kpis?.previous_period_comparison?.ai_orders },
    { label: 'Conversão', value: `${(kpis?.conversion_rate || 0).toFixed(1)}%`, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50', sub: kpis?.previous_period_comparison?.conversion_rate },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">

      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Visão Geral
          </h2>
          <p className="text-sm text-gray-500 mt-1">Acompanhe em tempo real como a IA está impulsionando seu negócio.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-border">
          {['Hoje', '7d', '30d'].map((p) => (
            <button
              key={p}
              onClick={() => setKpiPeriod(p.toLowerCase())}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                kpiPeriod === p.toLowerCase()
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Block 1: Forecast & Projections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 flex flex-col justify-between bg-gradient-to-br from-[#171717] to-[#262626] text-white border-none shadow-lg shadow-gray-900/10 relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                Previsão Hoje
                {isRefreshingForecast && <RefreshCw className="w-3 h-3 animate-spin" />}
              </p>
              <h3 className="text-3xl font-bold mt-1">R$ {forecast?.prediction_today?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            </div>
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 z-10">
            <Badge className="bg-green-500/20 text-green-300 border-0">Confiança Alta ({forecast?.confidence_pct}%)</Badge>
            <span className="text-xs text-gray-400">Baseado em histórico e clima.</span>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Projeção Final</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">R$ {forecast?.projected_final?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-bold text-green-600 flex items-center">
              <ArrowRight className="w-4 h-4 mr-1 rotate-45" />
              {forecast?.vs_forecast_pct > 0 ? '+' : ''}{forecast?.vs_forecast_pct}%
            </span>
            <span className="text-xs text-gray-400">vs previsão inicial.</span>
          </div>
        </Card>
      </div>

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

      {/* Block 3: Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} className="p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200 border-border">
              <div className="flex justify-between items-start">
                <div className={cn("p-2 rounded-lg", item.bg, item.color)}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold text-foreground mt-1">{item.value}</p>
                  {item.sub && <p className="text-[10px] text-green-600 mb-1 font-medium">{item.sub}</p>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Block 4: Recent Recommendations List */}
      <Card className="border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-muted flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-foreground text-sm">Últimas Recomendações</h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            onClick={() => navigate('/intelligence/recommendations')}
          >
            Ver histórico completo <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <div className="divide-y divide-[#F5F5F5]">
          {recommendations.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">Nenhuma recomendação recente.</div>
          ) : (
            recommendations.map((rec) => (
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
                      onClick={() => handleReviewRecommendation(rec)}
                    >
                      Revisar
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

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
                    navigate(`/intelligence/recommendations?insightId=${insight.id}`);
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

      {/* Recommendation Review Modal */}
      <Modal
        isOpen={activeModal === 'recommendation'}
        onClose={() => setActiveModal(null)}
        title="Revisar Recomendação"
      >
        {selectedRecommendation && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">{selectedRecommendation.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Item alvo: <span className="font-medium text-foreground">{selectedRecommendation.entity}</span></p>
            </div>

            <div className="flex gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-900">Impacto Esperado</p>
                <p className="text-sm text-blue-800">{selectedRecommendation.impact_estimate}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Contexto da IA</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                {selectedRecommendation.context}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button
                onClick={() => handleApplyRecommendation(selectedRecommendation.id)}
                className="w-full bg-primary hover:bg-[#262626] text-white"
              >
                Aplicar Agora
              </Button>
              <Button
                variant="outline"
                onClick={() => handleIgnoreRecommendation(selectedRecommendation.id)}
                className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
              >
                Ignorar
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => setActiveModal(null)}
              className="w-full text-gray-500"
            >
              Decidir depois
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
