import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { AlertTriangle, CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

export default function IntelligenceAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/intelligence/alerts');
      setAlerts(res.data || []);
    } catch (err) {
      toast.error("Erro ao carregar alertas.");
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolvido' } : a));
      setActiveModal(null);
      toast.success("Alerta resolvido!");
      await api.post(`/intelligence/alerts/${id}/resolve`);
    } catch (err) {
      toast.error("Erro ao resolver alerta.");
      fetchAlerts();
    }
  };

  const openDetails = (alert) => {
    setSelectedAlert(alert);
    setActiveModal('details');
  };

  const openResolve = (alert) => {
    setSelectedAlert(alert);
    setActiveModal('resolve');
  };

  const getPriorityStyle = (p) => {
    switch (p) {
      case 'Alta': return "bg-red-50 text-red-600 border-red-200";
      case 'Média': return "bg-orange-50 text-orange-600 border-orange-200";
      default: return "bg-blue-50 text-blue-600 border-blue-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>
    );
  }

  const criticalCount = alerts.filter(a => a.severity === 'Alta' && a.status === 'Aberto').length;
  // Mock metrics for cards as they are not in the list endpoint usually, but we can compute or mock
  const avgTime = "1h 15m";
  const health = "94%";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-purple-600" />
          Alertas e Operação
        </h2>
        <p className="text-sm text-gray-500 mt-1">Monitoramento em tempo real de gargalos e riscos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <Card className="p-4 flex items-center gap-3 border-l-4 border-l-red-500">
          <div className="p-2 bg-red-50 rounded-full text-red-600"><AlertCircle className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold text-foreground">{criticalCount}</p>
            <p className="text-xs text-gray-500 font-bold uppercase">Alertas Críticos</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3 border-l-4 border-l-orange-500">
          <div className="p-2 bg-orange-50 rounded-full text-orange-600"><Clock className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold text-foreground">{avgTime}</p>
            <p className="text-xs text-gray-500 font-bold uppercase">Tempo Médio Resolução</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3 border-l-4 border-l-green-500">
          <div className="p-2 bg-green-50 rounded-full text-green-600"><CheckCircle2 className="w-5 h-5" /></div>
          <div>
            <p className="text-2xl font-bold text-foreground">{health}</p>
            <p className="text-xs text-gray-500 font-bold uppercase">Saúde Operacional</p>
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-dashed">Nenhum alerta para exibir.</div>
        ) : (
          alerts.map((alert) => (
            <Card key={alert.id} className={cn(
              "p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4",
              alert.status === 'Resolvido' ? "opacity-60 border-l-gray-300" : "border-l-purple-500"
            )}>
              <div className="flex gap-4 items-start">
                <div className={cn("px-2 py-1 text-[10px] font-bold uppercase rounded border", getPriorityStyle(alert.severity))}>
                  {alert.severity}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{alert.type}: {alert.description}</h4>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              {alert.status !== 'Resolvido' && (
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8"
                    onClick={() => openDetails(alert)}
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs h-8 bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => openResolve(alert)}
                  >
                    Resolver
                  </Button>
                </div>
              )}
              {alert.status === 'Resolvido' && (
                <Badge variant="outline" className="bg-gray-100 text-gray-500">Resolvido</Badge>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={activeModal === 'details'}
        onClose={() => setActiveModal(null)}
        title="Detalhes do Alerta"
      >
        {selectedAlert && (
          <div className="space-y-4">
            <div className={cn("inline-block px-2 py-1 text-[10px] font-bold uppercase rounded border mb-2", getPriorityStyle(selectedAlert.severity))}>
              {selectedAlert.severity}
            </div>
            <h3 className="font-bold text-lg">{selectedAlert.description}</h3>
            <p className="text-sm text-gray-600">{selectedAlert.full_description}</p>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
              <p className="text-xs font-bold text-purple-900 uppercase">Recomendação da IA</p>
              <p className="text-sm text-purple-800 mt-1">{selectedAlert.recommendation}</p>
            </div>

            <div className="flex justify-end pt-4">
              {selectedAlert.status !== 'Resolvido' && (
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => { setActiveModal(null); openResolve(selectedAlert); }}
                >
                  Resolver Alerta
                </Button>
              )}
              <Button variant="ghost" onClick={() => setActiveModal(null)} className="ml-2">Fechar</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Resolve Confirmation Modal */}
      <Modal
        isOpen={activeModal === 'resolve'}
        onClose={() => setActiveModal(null)}
        title="Resolver Alerta"
      >
        {selectedAlert && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Você está marcando o alerta <strong>&quot;{selectedAlert.description}&quot;</strong> como resolvido.
              Confirma que a ação necessária foi tomada?
            </p>
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleResolve(selectedAlert.id)}
              >
                Sim, Resolvido
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setActiveModal(null)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
