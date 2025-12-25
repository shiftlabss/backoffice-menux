import React, { useState, useEffect } from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Skeleton } from '../../ui/Skeleton';
import {
  TrendingUp,
  BarChart3,
  Target,
  AlertTriangle,
  ArrowRight,
  Check,
  Calendar,
  Clock,
  Loader2,
  Copy,
  FileDown,
  ExternalLink,
  Eye,
  MousePointerClick,
  Monitor
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import toast from 'react-hot-toast';
import { useAudit } from '../../../hooks/useAudit';

// Mock Data Generator for Evidence
const getMockEvidence = (suggestionId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Generate mock event logs
      const events = Array.from({ length: 8 }).map((_, i) => {
        const types = ['shown', 'viewed', 'accepted'];
        // Weighted random to have more shown than viewed than accepted
        const typeIndex = Math.random() > 0.6 ? (Math.random() > 0.7 ? 2 : 1) : 0;
        const type = types[typeIndex];

        const timeOffset = Math.floor(Math.random() * 60) + i * 60; // Minutes ago
        const date = new Date(Date.now() - timeOffset * 60000);

        return {
          id: `evt_${Math.random().toString(36).substr(2, 9)}`,
          type: type,
          timestamp: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          context: type === 'shown' ? 'Modal de Ociosidade' : (type === 'viewed' ? 'Tempo de tela: 4s' : 'Adicionado ao carrinho'),
          device: Math.random() > 0.3 ? 'Mobile' : 'Desktop'
        };
      }).sort((a, b) => b.timestamp.localeCompare(a.timestamp));

      resolve({
        id: suggestionId,
        context: {
          period: 'Hoje',
          turn: 'Almoço',
          channels: ['Salão', 'Delivery']
        },
        stats: {
          analyzed_orders: 142,
          uplift: '+15%',
          conversion_rate: '22.4%'
        },
        insight: {
          main: "Analisamos 142 sessões onde este item foi sugerido via Maestro hoje. A taxa de aceitação é 3.1% superior à média da categoria.",
          secondary: "O gatilho de 'Ociosidade' demonstrou ser o momento mais propício para conversão."
        },
        events: events
      });
    }, 800);
  });
};

export function SuggestionEvidenceDrawer({ isOpen, onClose, suggestion, onApply, onEdit }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { log } = useAudit();

  // Fetch logic
  useEffect(() => {
    if (isOpen && suggestion?.id) {
      setLoading(true);
      setError(null);

      // Log only if not already logged by parent (parent logs click, this logs view load)
      // or we can stick to one. User asked for specific ID.
      // log('opportunity.evidence.open', { itemId: suggestion.id }); 

      getMockEvidence(suggestion.id)
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else if (!isOpen) {
      setData(null);
      setLoading(true);
    }
  }, [isOpen, suggestion, log]);

  const handleCopyLink = () => {
    toast.success('Link do relatório copiado!');
    log('maestro.evidence.copyLink', { itemId: suggestion?.id });
  };

  const handleExportCSV = () => {
    toast.success('Exportando CSV de evidências...');
    log('maestro.evidence.exportCsv', { itemId: suggestion?.id });
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Evidências de Aceitação"
      subtitle={`Auditoria detalhada de sugestões para ${suggestion?.name}`}
      size="lg"
      footer={
        <div className="flex w-full justify-between items-center gap-4">
          <div className="text-xs text-slate-400 shrink-0">
            ID da Análise: <span className="font-mono">{String(suggestion?.id || '').substring(0, 8) || '---'}</span>
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200"
              onClick={() => { onApply?.(suggestion); onClose(); }}
            >
              Aplicar
            </Button>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-8 pb-4">

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-24 w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex flex-col items-center text-center gap-2">
            <AlertTriangle className="text-red-500 h-8 w-8" />
            <p className="text-sm text-red-700 font-medium">Não foi possível carregar as evidências.</p>
            <Button variant="outline" size="sm" onClick={() => getMockEvidence(suggestion.id)} className="mt-2">
              Tentar novamente
            </Button>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && data && (
          <>
            {/* 1. Context Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 gap-1.5 hover:bg-slate-200">
                <Calendar size={12} /> {data.context.period}
              </Badge>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 gap-1.5 hover:bg-slate-200">
                <Clock size={12} /> {data.context.turn}
              </Badge>
              {data.context.channels.map(channel => (
                <Badge key={channel} variant="outline" className="text-slate-500 border-slate-200">
                  {channel}
                </Badge>
              ))}
            </div>

            {/* 2. Analytical Statement & Stats */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900 mb-1">
                    Análise de Impacto
                  </h4>
                  <p className="text-sm text-emerald-800/80 leading-relaxed">
                    {data.insight.main}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-100/60">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-600/70">Pedidos Analisados</span>
                      <div className="text-lg font-bold text-emerald-900">{data.stats.analyzed_orders}</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-600/70">Conversão Real</span>
                      <div className="text-lg font-bold text-emerald-900">{data.stats.conversion_rate}</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-600/70">Uplift vs Média</span>
                      <div className="text-lg font-bold text-emerald-600">+{data.stats.uplift}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Event Sample List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-slate-400" />
                  Amostra de Eventos
                  <Badge variant="secondary" className="ml-2 text-[10px] h-5 px-1.5">Últimos eventos</Badge>
                </h4>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleCopyLink}>
                    <Copy size={14} className="text-slate-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleExportCSV}>
                    <FileDown size={14} className="text-slate-400" />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 grid grid-cols-12 gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <div className="col-span-2">Hora</div>
                  <div className="col-span-3">Evento</div>
                  <div className="col-span-5">Contexto</div>
                  <div className="col-span-2 text-right">Device</div>
                </div>
                <div className="divide-y divide-slate-50">
                  {data.events.map((event) => (
                    <div key={event.id} className="px-4 py-3 grid grid-cols-12 gap-4 items-center text-sm hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-2 font-mono text-xs text-slate-500">
                        {event.timestamp}
                      </div>
                      <div className="col-span-3 flex items-center gap-2">
                        {event.type === 'accepted' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                        {event.type === 'viewed' && <Eye className="w-3.5 h-3.5 text-blue-500" />}
                        {event.type === 'shown' && <MousePointerClick className="w-3.5 h-3.5 text-slate-400" />}

                        <span className={cn(
                          "font-medium",
                          event.type === 'accepted' ? "text-emerald-700" :
                            event.type === 'viewed' ? "text-blue-700" : "text-slate-600"
                        )}>
                          {event.type === 'accepted' ? 'Sugestão Aceita' :
                            event.type === 'viewed' ? 'Visualizada' : 'Exibida'}
                        </span>
                      </div>
                      <div className="col-span-5 text-slate-600 text-xs">
                        {event.context}
                      </div>
                      <div className="col-span-2 text-right text-xs text-slate-400">
                        {event.device}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 text-center">
                  <span className="text-xs text-slate-400">Amostra anonimizada para conformidade LGPD</span>
                </div>
              </div>
            </div>


          </>
        )}

      </div>
    </Drawer >
  );
}
