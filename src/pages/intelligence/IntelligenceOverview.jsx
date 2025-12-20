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
    <ModuleLayout
      title="Maestro"
      subtitle="Visão Geral"
      items={intelligenceSidebarItems}
      actions={
        <div className="flex items-center gap-4">
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
        </div>
      }
    >
      <div className="space-y-6 max-w-7xl mx-auto pb-8">







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
    </ModuleLayout>
  );
}
