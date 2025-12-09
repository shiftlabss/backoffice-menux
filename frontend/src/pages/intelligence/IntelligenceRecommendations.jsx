import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import {
  Sparkles,
  Search,
  Calendar,
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
import { useSearchParams } from 'react-router-dom';

export default function IntelligenceRecommendations() {
  const [searchParams] = useSearchParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState('7d');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const [activeModal, setActiveModal] = useState(null);
  const [selectedRec, setSelectedRec] = useState(null);

  useEffect(() => {
    // If navigated from Insight Overview
    const insightId = searchParams.get('insightId');
    if (insightId) {
      // In a real app we would set a specific filter or call a specific endpoint
      setSearch('Insight related...');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchRecommendations();
  }, [filterPeriod, filterType, filterStatus]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterPeriod) params.append('period', filterPeriod);
      if (filterType !== 'all') params.append('type', filterType);
      if (filterStatus !== 'all') params.append('status', filterStatus);

      const response = await api.get(`/intelligence/recommendations?${params.toString()}`);
      setRecommendations(response.data || []);
    } catch (error) {
      toast.error("Erro ao carregar recomendações.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRecs = recommendations.filter(rec =>
    rec.title.toLowerCase().includes(search.toLowerCase()) ||
    rec.entity.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status: 'Aplicada' } : r));
      toast.success("Recomendação aplicada!");
      await api.post(`/intelligence/recommendations/${id}/apply`);
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
      await api.post(`/intelligence/recommendations/${id}/ignore`);
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

  const getStatusParams = (status) => {
    switch (status) {
      case 'Pendente': return { label: 'Pendente', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock };
      case 'Aplicada': return { label: 'Aplicada', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle2 };
      case 'Ignorada': return { label: 'Ignorada', color: 'bg-gray-50 text-gray-500 border-gray-200', icon: XCircle };
      default: return { label: status, color: 'bg-gray-100', icon: Sparkles };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Recomendações
          </h2>
          <p className="text-sm text-gray-500 mt-1">Gerencie e analise todas as sugestões da IA.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center bg-gray-50/50 border-border">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título, produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all bg-white"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="today">Hoje</option>
            <option value="7d">7 Dias</option>
            <option value="30d">30 Dias</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="all">Tipos</option>
            <option value="Upsell">Upsell</option>
            <option value="Cross-sell">Cross-sell</option>
            <option value="Preço">Preço</option>
            <option value="Estoque">Estoque</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="all">Status</option>
            <option value="Pendente">Pendente</option>
            <option value="Aplicada">Aplicada</option>
            <option value="Ignorada">Ignorada</option>
          </select>

          <Button
            variant="outline"
            onClick={() => {
              setFilterType('all');
              setFilterStatus('all');
              setSearch('');
            }}
            title="Limpar Filtros"
            className="px-3"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>
        ) : filteredRecs.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Nenhuma recomendação encontrada.</p>
          </div>
        ) : (
          filteredRecs.map((rec) => {
            const { icon: Icon, color, bg } = getIcon(rec.type);
            const status = getStatusParams(rec.status);
            const isPending = rec.status === 'Pendente';

            return (
              <Card key={rec.id} className="p-0 border-border overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5 flex flex-col lg:flex-row gap-4 lg:items-center">
                  {/* Icon & Time */}
                  <div className="flex items-center gap-4 lg:w-48 shrink-0">
                    <div className={cn("p-2.5 rounded-xl shrink-0", bg, color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">{new Date(rec.timestamp).toLocaleDateString()}</p>
                      <p className="text-sm font-bold text-foreground">{new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-foreground flex items-center gap-2 flex-wrap">
                      {rec.title}
                      <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal text-gray-500 bg-gray-100">{rec.entity}</Badge>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 truncate">{rec.context}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Impacto: {rec.impact_estimate}
                      </span>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 lg:justify-end lg:w-auto">
                    <Badge variant="outline" className={cn("flex items-center gap-1.5 pl-1.5 pr-2.5 py-1", status.color)}>
                      <status.icon className="w-3.5 h-3.5" />
                      {status.label}
                    </Badge>

                    {isPending && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="text-gray-600" onClick={() => openReviewModal(rec)}>
                          Revisar
                        </Button>
                        <Button size="sm" className="bg-primary text-white hover:bg-[#262626]" onClick={(e) => handleApply(rec.id, e)}>
                          Aplicar
                        </Button>
                      </div>
                    )}
                    {!isPending && (
                      <Button size="sm" variant="ghost" disabled className="text-gray-300">
                        Ação concluída
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

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
