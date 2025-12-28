import React from 'react';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';
import {
  X, TrendingUp, TrendingDown, Clock, Target,
  DollarSign, MousePointer, Filter, Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

export default function ComboAnalysisDrawer({ isOpen, onClose, combo, onEdit, onViewActions }) {
  if (!combo) return null;

  // Mock Context Chips
  const contextChips = [
    { label: combo.status === 'Active' ? 'Ativo' : 'Pausado', color: combo.status === 'Active' ? 'emerald' : 'slate' },
    { label: 'Impacto Alto', color: 'purple' },
    { label: 'Jantar', color: 'slate' }
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={null}
      size="lg"
      hideCloseButton={true}
      hideHeader={true}
    >
      <div className="h-full flex flex-col bg-slate-50/50">

        {/* 1. Header Contextual */}
        <div className="bg-white border-b border-slate-100 px-6 py-5 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {contextChips.map((chip, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className={cn(
                    "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5",
                    chip.color === 'emerald' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      chip.color === 'purple' ? "bg-purple-50 text-purple-700 border-purple-100" :
                        "bg-slate-100 text-slate-600 border-slate-200"
                  )}
                >
                  {chip.label}
                </Badge>
              ))}
              <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-2">
                <Clock size={10} /> Atualizado às {format(new Date(), 'HH:mm')}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{combo.name}</h2>
            <p className="text-slate-500 text-sm">Combos</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100 -mr-2">
            <X size={20} className="text-slate-400" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* 2. Resumo Executivo (Impact Grid) */}
          <div className="grid grid-cols-2 gap-4">
            <ImpactCard
              title="Receita Atribuída"
              value={combo.revenue_incremental ? `R$ ${combo.revenue_incremental.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}` : 'R$ 0,00'}
              sublabel={`Base: ${combo.orders_count || 0} pedidos`}
              tooltip="Receita incremental gerada por sugestões deste combo."
              icon={DollarSign}
              color="text-emerald-600"
            />
            <ImpactCard
              title="IA vs Orgânico"
              value={`${combo.conv_maestro}%`}
              sublabel={`vs ${combo.conv_organic}% org`}
              tooltip="Taxa de aceitação quando sugerido vs escolhido organicamente."
              icon={Target}
              color="text-blue-600"
            />
            <ImpactCard
              title="Lift Médio"
              value={combo.lift}
              sublabel="Aumento de Ticket"
              tooltip="Diferença percentual no ticket médio quando o combo é levado."
              icon={TrendingUp}
              color="text-purple-600"
            />
            <ImpactCard
              title="Base de Análise"
              value={combo.base_sessions}
              sublabel={`${combo.suggestions_count || 0} exibições`}
              tooltip="Número de sessões consideradas para esta análise."
              icon={MousePointer}
              color="text-slate-600"
            />
          </div>

          {/* 3. Oportunidades Priorizadas */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={16} className="text-purple-500" /> Oportunidades Identificadas
            </h3>

            {/* Mock Opportunities */}
            <div className="space-y-3">
              <OpportunityRow
                priority="Alta"
                title="Timing de Sugestão"
                evidence="Maior conversão após adição de bebida"
                impact="R$ 450 estim."
                onEdit={onEdit}
              />
              <OpportunityRow
                priority="Média"
                title="Ajuste de Preço"
                evidence="Preço atual 10% acima da percepção de valor"
                impact="R$ 120 estim."
                onEdit={onEdit}
              />
            </div>
          </div>

          {/* 4. Evidência & Histórico (Mocked) */}
          <Card className="p-5 border-slate-200 shadow-sm bg-white">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Target size={16} className="text-slate-400" /> Histórico de Sugestão
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 uppercase font-bold">Sugerido</div>
                <div className="text-lg font-bold text-slate-900">1.2k</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 uppercase font-bold">Aceito</div>
                <div className="text-lg font-bold text-emerald-600">180</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500 uppercase font-bold">Taxa</div>
                <div className="text-lg font-bold text-blue-600">15%</div>
              </div>
            </div>
          </Card>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center">
          <Button variant="ghost" onClick={onClose} className="text-slate-500">Voltar</Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onEdit(combo)}>Editar Combo</Button>
            <Button
              onClick={onViewActions}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Ver ações do Maestro
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

// Helpers
function ImpactCard({ title, value, sublabel, tooltip, icon: Icon, color }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm cursor-help hover:border-slate-300 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <Icon size={16} className={cn("opacity-80", color)} />
            </div>
            <div className="font-bold text-xl text-slate-900 tracking-tight">{value}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">{title}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{sublabel}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[200px] text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function OpportunityRow({ priority, title, evidence, impact, onEdit }) {
  const color = priority === 'Alta' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-orange-600 bg-orange-50 border-orange-100';
  return (
    <div className="p-4 border border-slate-100 rounded-lg bg-white shadow-sm flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border", color)}>{priority}</span>
          <h4 className="font-bold text-sm text-slate-900">{title}</h4>
        </div>
        <p className="text-xs text-slate-500">{evidence}</p>
      </div>
      <div className="text-right">
        <div className="font-bold text-emerald-600 text-sm">{impact}</div>
        <Button variant="link" size="sm" className="h-auto p-0 text-purple-600 text-xs" onClick={onEdit}>Editar antes</Button>
      </div>
    </div>
  )
}
