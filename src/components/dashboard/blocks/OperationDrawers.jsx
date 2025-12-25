import React from 'react';
import { Drawer } from '../../ui/Drawer';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Form';
import {
  AlertTriangle,
  Package,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
  Calendar,
  Database,
  Info
} from 'lucide-react';
import { cn } from '../../../lib/utils';

// --- SHARED COMPONENTS ---

const AnalyticalBlock = ({ title, children, className }) => (
  <div className={cn("bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-2", className)}>
    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h4>
    {children}
  </div>
);

const MetricRow = ({ label, value, subtext, alert }) => (
  <div className="flex justify-between items-start">
    <div>
      <span className="text-sm font-medium text-slate-700 block">{label}</span>
      {subtext && <span className="text-xs text-slate-400 block mt-0.5">{subtext}</span>}
    </div>
    <div className="text-right">
      <span className={cn("text-base font-bold block", alert ? "text-red-600" : "text-slate-900")}>{value}</span>
    </div>
  </div>
);

const ContextFooter = ({ lastUpdate, source }) => (
  <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 pt-3 mt-2">
    <span>Atualizado: {lastUpdate}</span>
    <span>Fonte: {source}</span>
  </div>
);

// --- DRAWERS ---

export function StockDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Análise de Ruptura: Coca-Cola"
      subtitle="Prioridade Alta • Há 15min"
      size="md"
      footer={<Button variant="outline" onClick={onClose} className="w-full">Fechar Análise</Button>}
    >
      <div className="space-y-4 pt-2">
        {/* Bloco 1: Situação Atual */}
        <AnalyticalBlock title="Situação Atual" className="bg-red-50 border-red-100">
          <MetricRow label="Estoque Físico" value="3 un" alert />
          <div className="h-px bg-red-200/50 my-2" />
          <MetricRow label="Consumo Médio (Hora)" value="12 un" />
          <MetricRow label="Previsão de Ruptura" value="20 min" alert subtext="Baseado no ritmo atual" />
        </AnalyticalBlock>

        {/* Bloco 2: Impacto Estimado */}
        <AnalyticalBlock title="Impacto Estimado">
          <MetricRow label="Pedidos em Risco" value="~22 pedidos" subtext="Próxima 1 hora" />
          <div className="h-px bg-slate-200 my-2" />
          <MetricRow label="Receita Potencial Perdida" value="R$ 180,00" alert />
        </AnalyticalBlock>

        {/* Bloco 3: Contexto Operacional */}
        <AnalyticalBlock title="Contexto Operacional">
          <div className="flex gap-2 items-start text-sm text-slate-600 mb-2">
            <Package size={16} className="mt-0.5 text-slate-400" />
            <span>Próxima entrega do fornecedor agendada apenas para <strong>Amanhã 08:00</strong>.</span>
          </div>
          <div className="flex gap-2 items-start text-sm text-slate-600">
            <ArrowRight size={16} className="mt-0.5 text-slate-400" />
            <span>Alternativa disponível: <strong>Pepsi (Estoque: 45un)</strong>.</span>
          </div>
        </AnalyticalBlock>

        {/* Bloco 4: Observação do Sistema */}
        <div className="flex gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-xs leading-relaxed items-start">
          <Info size={14} className="mt-0.5 shrink-0" />
          Historicamente, a ruptura deste item reduz o ticket médio em 15% devido à perda de combos.
        </div>

        <ContextFooter lastUpdate="Agora mesmo" source="KDS + Estoque" />
      </div>
    </Drawer>
  );
}

export function ComboDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Análise de Oportunidade: Happy Hour"
      subtitle="Prioridade Média • Há 2h"
      size="md"
      footer={<Button variant="outline" onClick={onClose} className="w-full">Fechar Análise</Button>}
    >
      <div className="space-y-4 pt-2">
        <AnalyticalBlock title="Métricas de Ocupação" className="bg-amber-50 border-amber-100">
          <MetricRow label="Ocupação Atual" value="42%" subtext="Meta para o horário: 65%" />
          <div className="h-px bg-amber-200/50 my-2" />
          <MetricRow label="Ticket Médio Atual" value="R$ 45,00" />
        </AnalyticalBlock>

        <AnalyticalBlock title="Projeção de Impacto">
          <MetricRow label="Potencial de Mesas" value="+40 mesas" subtext="Estimativa proxs. 2h" />
          <MetricRow label="Uplift de Receita" value="+ R$ 800,00" className="text-emerald-600" />
        </AnalyticalBlock>

        <AnalyticalBlock title="Capacidade Operacional">
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 bg-white rounded border border-slate-200">
              <span className="block text-slate-400 mb-1">Cozinha</span>
              <span className="font-bold text-emerald-600">30% Ociosa</span>
            </div>
            <div className="p-2 bg-white rounded border border-slate-200">
              <span className="block text-slate-400 mb-1">Bar</span>
              <span className="font-bold text-emerald-600">20% Ocioso</span>
            </div>
          </div>
        </AnalyticalBlock>

        <div className="flex gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-xs leading-relaxed items-start">
          <Info size={14} className="mt-0.5 shrink-0" />
          Terças-feiras com ativação de Happy Hour apresentam retenção de clientes 20% maior após as 20h.
        </div>

        <ContextFooter lastUpdate="Tempo Real" source="Gestão de Salão" />
      </div>
    </Drawer>
  );
}

export function SlaDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Análise de Desvio de SLA: Cozinha"
      subtitle="Prioridade Alta • Há 5min"
      size="md"
      footer={<Button variant="outline" onClick={onClose} className="w-full">Fechar Análise</Button>}
    >
      <div className="space-y-4 pt-2">
        <AnalyticalBlock title="Performance Atual" className="bg-red-50 border-red-100">
          <MetricRow label="Tempo Médio de Preparo" value="25 min" alert subtext="Meta SLA: 15 min" />
          <div className="h-px bg-red-200/50 my-2" />
          <MetricRow label="Pedidos em Atraso" value="8 mesas" subtext="Atraso > 10 min" />
        </AnalyticalBlock>

        <AnalyticalBlock title="Impacto na Experiência">
          <MetricRow label="Risco de NPS" value="-15 pts" alert subtext="Projeção baseada em atrasos" />
          <MetricRow label="Cancelamentos Potenciais" value="Baixo risco" subtext="Clientes informados" />
        </AnalyticalBlock>

        <AnalyticalBlock title="Diagnóstico de Causa">
          <div className="flex gap-2 items-start text-sm text-slate-600 mb-2">
            <AlertTriangle size={16} className="mt-0.5 text-red-400" />
            <span>Estação de <strong>Grelhados</strong> sobrecarregada (18 pedidos na fila).</span>
          </div>
          <div className="flex gap-2 items-start text-sm text-slate-600">
            <AlertTriangle size={16} className="mt-0.5 text-red-400" />
            <span>Redução de equipe: <strong>2 cozinheiros ausentes</strong> hoje.</span>
          </div>
        </AnalyticalBlock>

        <div className="flex gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-xs leading-relaxed items-start">
          <Info size={14} className="mt-0.5 shrink-0" />
          Ajustes temporários de SLA no sistema de delivery podem evitar avaliações negativas externas.
        </div>

        <ContextFooter lastUpdate="Agora mesmo" source="KDS Analysis" />
      </div>
    </Drawer>
  );
}

export function GoalDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Análise de Meta: Jantar"
      subtitle="Prioridade Média • Há 1h"
      size="md"
      footer={<Button variant="outline" onClick={onClose} className="w-full">Fechar Análise</Button>}
    >
      <div className="space-y-4 pt-2">
        <AnalyticalBlock title="Status da Meta" className="bg-slate-50 border-slate-200">
          <MetricRow label="Faturamento Realizado" value="R$ 3.200" />
          <div className="h-px bg-slate-200 my-2" />
          <MetricRow label="Meta do Turno" value="R$ 15.000" />
          <MetricRow label="Pace (Projeção)" value="R$ 10.000" alert subtext="Gap de R$ 5k previsto" />
        </AnalyticalBlock>

        <AnalyticalBlock title="Impacto Financeiro">
          <MetricRow label="Gap para Meta" value="- R$ 5.000" alert className="text-red-600" />
          <MetricRow label="Impacto Bônus Equipe" value="Em risco" subtext="Gatilho de 90% não atingido" />
        </AnalyticalBlock>

        <AnalyticalBlock title="Fatores Externos">
          <div className="flex gap-2 items-start text-sm text-slate-600 mb-2">
            <Calendar size={16} className="mt-0.5 text-slate-400" />
            <span>Fatores climáticos: <strong>Chuva forte</strong> na região reduziu fluxo espontâneo em 40%.</span>
          </div>
        </AnalyticalBlock>

        <div className="flex gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-xs leading-relaxed items-start">
          <Info size={14} className="mt-0.5 shrink-0" />
          O canal de Delivery mantém-se estável. Incentivos de venda sugestiva no salão podem mitigar até 20% do gap.
        </div>

        <ContextFooter lastUpdate="Últimos 5 min" source="Sales Dashboard" />
      </div>
    </Drawer>
  );
}
