import React, { useState, useEffect } from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Card } from '../../ui/Card';
import { AlertTriangle, Clock, Activity, ListChecks, History, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { toast } from 'react-hot-toast';

export function AlertAnalysisDrawer({ isOpen, onClose, alert, onResolve, onPlaybook, onSnooze }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate data fetch for detailed analysis
      setTimeout(() => setLoading(false), 600);
    }
  }, [isOpen, alert]);

  if (!alert) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Análise do Alerta"
      size="lg" // Wide drawer for analysis
    >
      <div className="space-y-8 pb-20">

        {/* Header Summary */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className={cn("text-red-600")} size={20} />
              <h3 className="font-bold text-red-900 text-lg">{alert.title}</h3>
            </div>
            <p className="text-red-800 text-sm">{alert.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-white border-red-200 text-red-700">{alert.type}</Badge>
              <Badge variant="outline" className="bg-white border-red-200 text-red-700">{alert.severity}</Badge>
              <span className="text-xs text-red-600 flex items-center gap-1 ml-2"><Clock size={12} /> Iniciado {alert.time_relative}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Diagnostics */}
        <div>
          <SectionHeader icon={Activity} title="Diagnóstico do Maestro" />
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {alert.diagnosis || "O sistema identificou um desvio padrão no comportamento desta métrica. A causa provável é um aumento repentino de demanda não acompanhado pela capacidade operacional atual."}
            </p>

            {/* Evidence Metrics (Mock) */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <MetricBox label="Meta" value={alert.meta || "15 min"} />
              <MetricBox label="Atual" value={alert.current_value || "28 min"} trend="+85%" status="bad" />
              <MetricBox label="Histórico" value="Normal" sub="Últimos 7 dias" />
            </div>
          </div>
        </div>

        {/* Section 2: Action Plan */}
        <div>
          <SectionHeader icon={ListChecks} title="Plano de Ação Sugerido" />
          <div className="space-y-3">
            {alert.checklist?.map((step, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700">{step}</p>
              </div>
            ))}
            {onPlaybook && (
              <Button
                variant="link"
                className="text-xs text-indigo-600 p-0 h-auto mt-2 hover:no-underline hover:text-indigo-700 flex items-center gap-1"
                onClick={() => onPlaybook(alert)}
              >
                Abrir playbook completo <ChevronRight size={12} />
              </Button>
            )}
          </div>
        </div>

        {/* Section 3: Supported Actions */}
        <div>
          <SectionHeader icon={Play} title="Ações Suportadas" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ActionCard
              title="Pausar Item no App"
              desc="Remove temporariamente do cardápio digital."
              action={() => toast.success("Item pausado com sucesso")}
              btnLabel="Pausar"
            />
            <ActionCard
              title="Notificar Gerente"
              desc="Envia push notification para o gerente de turno."
              action={() => toast.success("Notificação enviada")}
              btnLabel="Notificar"
            />
          </div>
        </div>

        {/* Section 4: History */}
        <div>
          <SectionHeader icon={History} title="Histórico Recente" />
          <div className="pl-4 border-l-2 border-slate-200 space-y-4">
            <HistoryItem time="12:45" text="Alerta detectado pelo sistema" />
            <HistoryItem time="12:50" text="Notificação enviada para Cozinha" />
            <HistoryItem time="Agora" text="Em análise por você" active />
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col gap-3">
        <div className="flex gap-3">
          <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => toast.success("Marcado como em andamento")}>
            Marcar como em andamento
          </Button>
          <Button variant="outline" className="flex-1 border-slate-200 text-slate-700" onClick={() => onResolve(alert)}>
            Marcar como resolvido
          </Button>
        </div>
        <div className="flex justify-between items-center px-1">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900" onClick={onClose}>
            Voltar
          </Button>
          {onSnooze && (
            <Button variant="link" className="text-slate-400 hover:text-slate-600" onClick={() => onSnooze(alert)}>
              Silenciar por 2h
            </Button>
          )}
        </div>
      </div>


    </Drawer>
  );
}

// Helpers
const SectionHeader = ({ icon: Icon, title }) => (
  <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-4 mt-2">
    <div className="p-1.5 bg-slate-100 rounded-md text-slate-500">
      <Icon size={16} />
    </div>
    {title}
  </h4>
);

const MetricBox = ({ label, value, trend, status, sub }) => (
  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
    <p className="text-xs text-slate-500 uppercase">{label}</p>
    <p className={cn("text-xl font-bold mt-1", status === 'bad' ? "text-red-600" : "text-slate-900")}>{value}</p>
    {trend && <p className={cn("text-xs font-bold", status === 'bad' ? "text-red-600" : "text-green-600")}>{trend}</p>}
    {sub && <p className="text-[10px] text-slate-400 mt-1">{sub}</p>}
  </div>
);

const ActionCard = ({ title, desc, action, btnLabel }) => (
  <div className="p-4 border border-slate-200 rounded-lg flex flex-col justify-between h-full hover:border-indigo-200 transition-colors bg-white">
    <div>
      <p className="font-bold text-sm text-slate-900">{title}</p>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
    <Button size="sm" variant="secondary" className="mt-4 w-full" onClick={action}>{btnLabel}</Button>
  </div>
);

const HistoryItem = ({ time, text, active }) => (
  <div className="relative">
    <div className={cn("absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white", active ? "bg-indigo-600" : "bg-slate-300")} />
    <p className="text-xs font-bold text-slate-700">{time}</p>
    <p className="text-sm text-slate-600">{text}</p>
  </div>
);
