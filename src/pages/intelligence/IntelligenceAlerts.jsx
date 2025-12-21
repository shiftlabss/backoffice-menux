import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { MaestroHeader } from '../../components/maestro/MaestroHeader';
import { intelligenceService } from '../../services/dataService';
import { toast } from 'react-hot-toast';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Wifi,
  WifiOff,
  Armchair,
  UtensilsCrossed,
  ChefHat,
  Search,
  Timer,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_ALERTS } from '../../services/mockIntelligence';

export default function IntelligenceAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ period: 'today', shift: 'all', channel: 'all' });
  const [activeDrawer, setActiveDrawer] = useState(null); // 'alert-playbook' | 'table-detail'
  const [selectedItem, setSelectedItem] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('online');

  // Mock Tables Data
  const [tables] = useState(Array.from({ length: 20 }, (_, i) => {
    const status = Math.random() > 0.7 ? 'risk' : Math.random() > 0.4 ? 'occupied' : 'free';
    return {
      id: i + 1,
      status,
      time: status !== 'free' ? Math.floor(Math.random() * 90) : 0, // minutes
      waiter: 'João',
      total: status !== 'free' ? Math.floor(Math.random() * 300) + 50 : 0
    };
  }));

  useEffect(() => {
    fetchAlerts();
  }, [filters]);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = await intelligenceService.getAlerts();
      setAlerts(data || []);
    } catch (err) {
      toast.error("Erro ao carregar alertas.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const criticalCount = alerts.filter(a => a.severity === 'Alta' && a.status === 'Aberto').length;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">

      <MaestroHeader
        title="Alertas e Operação"
        subtitle="Monitoramento em tempo real da saúde operacional"
        filters={filters}
        onFilterChange={handleFilterChange}
        onOpenAdvancedFilters={() => toast("Filtros avançados em breve.")}
      />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Block 1: Critical Alerts & Timing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Critical Alerts List */}
          <Card className="lg:col-span-2 border-l-4 border-l-red-500 p-0 overflow-hidden">
            <div className="p-4 bg-red-50/50 border-b border-red-100 flex justify-between items-center">
              <h3 className="font-bold text-red-900 flex items-center gap-2">
                <AlertCircle size={20} /> Alertas Críticos
              </h3>
              <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">{criticalCount} Pendentes</Badge>
            </div>
            <div className="divide-y divide-slate-50">
              {loading ? (
                <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-red-500" /></div>
              ) : alerts.filter(a => a.status === 'Aberto').slice(0, 3).map(alert => (
                <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={cn("text-[10px]",
                        alert.severity === 'Alta' ? "bg-red-50 text-red-700 border-red-200" : "bg-orange-50 text-orange-700 border-orange-200"
                      )}>{alert.type}</Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={12} /> 12min</span>
                    </div>
                    <p className="font-bold text-slate-800 text-sm">{alert.description}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.recommendation}</p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 text-xs border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => { setSelectedItem(alert); setActiveDrawer('alert-playbook'); }}>
                    Resolver Agora
                  </Button>
                </div>
              ))}
              {alerts.filter(a => a.status === 'Aberto').length === 0 && !loading && (
                <div className="p-8 text-center text-slate-500 text-sm">
                  <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={32} />
                  Operação fluindo sem alertas críticos.
                </div>
              )}
            </div>
          </Card>

          {/* Operational Timing KPIs */}
          <div className="space-y-4">
            <TimingCard title="Tempo Médio Bebidas" value="4m 30s" target="5m" status="ok" />
            <TimingCard title="Tempo Médio Cozinha" value="22m 15s" target="20m" status="warning" />
            <TimingCard title="Tempo Mesa Ocupada" value="1h 12m" target="1h 30m" status="ok" />
          </div>

        </div>

        {/* Block 2: Smart Table Map */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Armchair size={20} className="text-slate-500" /> Mapa de Mesas Inteligente</h2>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-200 block"></span> Livre</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-100 border border-purple-200 block"></span> Ocupada</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-100 border border-red-300 block"></span> Atenção</span>
            </div>
          </div>

          <Card className="p-6 bg-white border-slate-200">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {tables.map(table => (
                <button
                  key={table.id}
                  onClick={() => { setSelectedItem(table); setActiveDrawer('table-detail'); }}
                  className={cn(
                    "aspect-square rounded-lg flex flex-col items-center justify-center p-1 transition-all hover:scale-105 active:scale-95 border",
                    table.status === 'free' ? "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100" :
                      table.status === 'occupied' ? "bg-purple-50 border-purple-100 text-purple-700 hover:bg-purple-100 shadow-sm" :
                        "bg-red-50 border-red-200 text-red-700 hover:bg-red-100 shadow-sm ring-1 ring-red-200 animate-pulse"
                  )}
                >
                  <span className="text-xs font-bold">{table.id}</span>
                  {table.status !== 'free' && (
                    <span className="text-[10px] items-center flex gap-0.5 mt-1 font-medium">
                      {table.time}'
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Block 4: Production Bottlenecks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-5 border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ChefHat size={18} className="text-orange-500" /> Fila de Produção (Top 3)
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
                <span className="text-sm font-medium text-slate-700">Grelha (Carnes)</span>
                <span className="text-xs font-bold text-red-600">12 pedidos na fila</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
                <span className="text-sm font-medium text-slate-700">Saladas</span>
                <span className="text-xs font-bold text-orange-600">5 pedidos na fila</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
                <span className="text-sm font-medium text-slate-700">Bar</span>
                <span className="text-xs font-bold text-green-600">2 pedidos na fila</span>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-slate-200 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 mb-2">Recomendação Operacional</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              O tempo de permanência na praça externa está 20% acima da média. Considere enviar um garçom extra para agilizar o fechamento de contas.
            </p>
            <Button size="sm" className="bg-slate-900 text-white w-full">Alocar Staff Extra</Button>
          </Card>
        </div>

      </div>

      {/* --- Drawers --- */}

      {/* Alert Playbook Drawer */}
      <Drawer
        isOpen={activeDrawer === 'alert-playbook'}
        onClose={() => setActiveDrawer(null)}
        title="Playbook de Resolução"
        size="md"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <h4 className="font-bold text-red-900 mb-1">{selectedItem.type}</h4>
              <p className="text-sm text-red-800">{selectedItem.full_description}</p>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-3">Passo a Passo Recomendado</h5>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">1</span>
                  Verifique fisicamente o estoque de {selectedItem.description}.
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">2</span>
                  Se confirmado baixo, acione fornecedor de emergência ou pause vendas no app.
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">3</span>
                  Notifique a equipe de salão sobre a indisponibilidade.
                </li>
              </ul>
            </div>

            <div className="pt-10">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => { toast.success("Alerta marcado como resolvido!"); setActiveDrawer(null); }}>
                Marcar como Resolvido
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Table Detail Drawer */}
      <Drawer
        isOpen={activeDrawer === 'table-detail'}
        onClose={() => setActiveDrawer(null)}
        title={`Mesa ${selectedItem?.id}`}
        size="sm"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <p className="text-xs text-slate-500 uppercase">Status</p>
                <p className="font-bold text-slate-900 capitalize">{selectedItem.status === 'risk' ? 'Atenção' : selectedItem.status === 'occupied' ? 'Ocupada' : 'Livre'}</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <p className="text-xs text-slate-500 uppercase">Tempo</p>
                <p className="font-bold text-slate-900">{selectedItem.time} min</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <h5 className="font-bold text-purple-900 text-sm mb-2 flex items-center gap-2"><Sparkles size={14} /> Sugestão do Maestro</h5>
              <p className="text-xs text-purple-800 leading-relaxed">
                Esta mesa está há 20 min sem pedir. Ofereça sobremesa ou café agora para aumentar o ticket ou liberar a mesa.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-2 text-sm">Conta Parcial</h5>
              <div className="flex justify-between items-center text-sm p-2 border-b border-slate-100">
                <span>2x Burger Artesanal</span>
                <span>R$ 78,00</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 border-b border-slate-100">
                <span>2x Coca-Cola</span>
                <span>R$ 16,00</span>
              </div>
              <div className="flex justify-between items-center font-bold text-base mt-2 px-2">
                <span>Total</span>
                <span>R$ {selectedItem.total},00</span>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Button className="flex-1 bg-slate-900 text-white hover:bg-slate-800">Ver Pedido Completo</Button>
            </div>
          </div>
        )}
      </Drawer>

    </div>
  );
}

// Helper Components
const TimingCard = ({ title, value, target, status }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-full", status === 'ok' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600")}>
        <Timer size={18} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700">{title}</p>
        <p className="text-xs text-slate-400">Meta: {target}</p>
      </div>
    </div>
    <div className={cn("text-xl font-bold", status === 'ok' ? "text-slate-900" : "text-orange-600")}>
      {value}
    </div>
  </div>
);
