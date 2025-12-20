import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import ModuleLayout from '../../components/layout/ModuleLayout';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useNavigate } from 'react-router-dom';
import { intelligenceService } from '../../services/dataService';
import { toast } from 'react-hot-toast';
import {
  TrendingUp,
  ArrowRight,
  DollarSign,
  ShoppingBag,
  Percent,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_FORECAST, MOCK_KPIS, MOCK_RECOMMENDATIONS } from '../../services/mockIntelligence';
import { intelligenceSidebarItems } from '../../constants/intelligenceSidebar';

export default function IntelligenceOverview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    forecast: null,
    kpis: null,
    recommendations: []
  });

  const [activeModal, setActiveModal] = useState(null); // 'recommendation'
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
      const [forecastRes, kpisRes, recsRes] = await Promise.all([
        intelligenceService.getForecast(),
        intelligenceService.getKPIs(kpiPeriod),
        intelligenceService.getRecommendations({ limit: 5 })
      ]);

      setData({
        forecast: forecastRes,
        kpis: kpisRes,
        recommendations: recsRes
      });
    } catch (error) {
      console.warn("API Error, using mock data:", error);
      // Fallback to mock data
      setData({
        forecast: MOCK_FORECAST,
        kpis: MOCK_KPIS,
        recommendations: MOCK_RECOMMENDATIONS
      });

    } finally {
      setLoading(false);
    }
  };

  const refreshForecast = async () => {
    setIsRefreshingForecast(true);
    try {
      const data = await intelligenceService.getForecast();
      setData(prev => ({ ...prev, forecast: data }));
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
      await intelligenceService.applyRecommendation(id);
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
      await intelligenceService.ignoreRecommendation(id);
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

  const { forecast, kpis, recommendations } = data;



  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Filters moved to top of content */}
      <div className="flex items-center justify-end gap-4 mb-4">
        {/* Desktop Buttons */}
        <div className="hidden md:flex bg-gray-100/50 p-1 rounded-lg border border-gray-200/50">
          {['Hoje', 'Ontem', '7 dias', '30 dias'].map((p) => (
            <button
              key={p}
              onClick={() => setKpiPeriod(p === '7 dias' ? '7d' : p === '30 dias' ? '30d' : p.toLowerCase())}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                (kpiPeriod === '7d' && p === '7 dias') || (kpiPeriod === '30d' && p === '30 dias') || (kpiPeriod === p.toLowerCase())
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <select
            className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            value={kpiPeriod}
            onChange={(e) => setKpiPeriod(e.target.value)}
          >
            <option value="hoje">Hoje</option>
            <option value="ontem">Ontem</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-muted-foreground">Vendas Totais</span>
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{kpis?.sales?.value || "R$ 0,00"}</h3>
            <div className="flex items-center text-xs text-green-600 font-medium">
              <TrendingUp size={14} className="mr-1" />
              {kpis?.sales?.trend || "+0%"} vs. período anterior
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-muted-foreground">Pedidos</span>
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{kpis?.orders?.value || "0"}</h3>
            <div className="flex items-center text-xs text-blue-600 font-medium">
              <TrendingUp size={14} className="mr-1" />
              {kpis?.orders?.trend || "+0%"} vs. período anterior
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-muted-foreground">Ticket Médio</span>
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Percent size={18} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{kpis?.ticket?.value || "R$ 0,00"}</h3>
            <div className="flex items-center text-xs text-purple-600 font-medium">
              <TrendingUp size={14} className="mr-1" />
              {kpis?.ticket?.trend || "+0%"} vs. período anterior
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-muted-foreground">Itens/Pedido</span>
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{kpis?.itemsPerOrder?.value || "0"}</h3>
            <div className="flex items-center text-xs text-orange-600 font-medium">
              <TrendingUp size={14} className="mr-1" />
              {kpis?.itemsPerOrder?.trend || "+0%"} vs. período anterior
            </div>
          </div>
        </Card>
      </div>

      {/* Forecast Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold">Projeção de Vendas</h3>
              <p className="text-sm text-muted-foreground">Previsão baseada em histórico e tendências</p>
            </div>
            <Button variant="outline" size="sm" onClick={refreshForecast} disabled={isRefreshingForecast}>
              {isRefreshingForecast ? <Loader2 className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4 mr-2" />}
              Atualizar
            </Button>
          </div>

          {/* Placeholder for Chart - In real app use Recharts */}
          <div className="h-[300px] bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-200">
            <p className="text-muted-foreground text-sm">Gráfico de Projeção de Vendas (Simulado)</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Alertas Recentes</h3>
          <div className="space-y-4">
            <div className="flex gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-900">Estoque Crítico: Coca-Cola</p>
                <p className="text-xs text-red-700 mt-1">Restam apenas 12 unidades. Reposição sugerida urgente.</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <Clock className="w-5 h-5 text-yellow-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Tempo de Espera Elevado</p>
                <p className="text-xs text-yellow-700 mt-1">Média de 45min na cozinha. Considere pausar delivery.</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" className="w-full mt-4 text-sm text-muted-foreground" onClick={() => navigate('/intelligence/alerts')}>
            Ver todos os alertas
          </Button>
        </Card>
      </div>

      {/* Recommendations Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Recomendações Ativas</h3>
          <Button variant="link" onClick={() => navigate('/intelligence/recommendations')}>Ver todas</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.slice(0, 3).map((rec) => (
            <Card key={rec.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-purple-500" onClick={() => handleReviewRecommendation(rec)}>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Alta Prioridade</Badge>
                {getStatusBadge(rec.status)}
              </div>
              <h4 className="font-bold text-gray-900 mb-1 line-clamp-2">{rec.title}</h4>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{rec.diagnosis}</p>
              <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 p-2 rounded-lg inline-block">
                <TrendingUp size={14} />
                {rec.impact_estimate}
              </div>
            </Card>
          ))}
        </div>
      </div>

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
