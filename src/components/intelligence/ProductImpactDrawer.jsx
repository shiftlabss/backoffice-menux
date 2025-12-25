
import React from 'react';
import { Drawer } from '../../components/ui/Drawer';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';

import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  MousePointer,
  ArrowRight,
  Zap,
  Calendar,
  ThermometerSun,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// --- MOCK DATA ---
const MOCK_DETAILS = {
  funnel: [
    { stage: 'Sugestões', value: 1240, color: '#94a3b8' },
    { stage: 'Visualizações', value: 980, color: '#94a3b8' },
    { stage: 'Cliques', value: 345, color: '#a78bfa' },
    { stage: 'Adições', value: 180, color: '#8b5cf6' },
    { stage: 'Pedidos', value: 142, color: '#7c3aed' },
  ],
  triggers: [
    { id: 1, name: 'Clima: Frio', win_rate: '18%', conversion: '12%', context: 'Noite' },
    { id: 2, name: 'Pairing: Vinhos', win_rate: '15%', conversion: '9%', context: 'Jantar' },
    { id: 3, name: 'Horário: 20h-22h', win_rate: '11%', conversion: '8%', context: 'Pico' },
  ]
};

const KPICard = ({ title, value, subtext, icon: Icon, colorClass }) => (
  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col items-center text-center">
    <div className={cn("mb-2 p-2 rounded-full bg-white shadow-sm", colorClass)}>
      <Icon size={16} />
    </div>
    <span className="text-xs text-slate-500 font-medium uppercase mb-1">{title}</span>
    <span className="text-lg font-bold text-slate-900">{value}</span>
    <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded mt-1">{subtext}</span>
  </div>
);

export function ProductImpactDrawer({ isOpen, onClose, product, filters }) {
  if (!product) return null;

  const activePeriodLabel = filters?.period === '7d' ? 'Últimos 7 dias' : 'Período selecionado';

  const footer = (
    <div className="flex w-full justify-end">
      <Button variant="outline" onClick={onClose}>Fechar</Button>
    </div>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      subtitle={`${product.category} • ${activePeriodLabel}`}
      footer={footer}
      size="lg"
      className="md:max-w-xl"
    >
      <div className="space-y-6">

        {/* BLOCK 1: SUMMARY METRICS */}
        <div className="grid grid-cols-3 gap-3">
          <KPICard
            title="Receita Gerada"
            value={`R$ ${product.receita_atribuida}`}
            subtext="+15% vs Org"
            icon={DollarSign}
            colorClass="text-emerald-600"
          />
          <KPICard
            title="Pedidos"
            value={product.conv_maestro.split('/')[0]}
            subtext="22% do mix"
            icon={ShoppingCart}
            colorClass="text-blue-600"
          />
          <KPICard
            title="Lift Conv."
            value={product.lift}
            subtext="Alta eficácia"
            icon={TrendingUp}
            colorClass="text-purple-600"
          />
        </div>

        {/* BLOCK 2: FUNNEL */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h4 className="font-semibold text-slate-800 text-sm">Funil de Conversão</h4>
            <Badge variant="outline" className="text-[10px] bg-white">Maestro Funnel</Badge>
          </div>
          <div className="p-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DETAILS.funnel} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" width={80} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20} background={{ fill: '#f8fafc' }}>
                  {MOCK_DETAILS.funnel.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BLOCK 3: WINNING TRIGGERS */}
        <div>
          <h4 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <Zap size={16} className="text-amber-500" /> Gatilhos de maior impacto
          </h4>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2">Gatilho</th>
                  <th className="px-3 py-2 text-right">Taxa Aceite</th>
                  <th className="px-3 py-2 text-right">Conversão</th>
                  <th className="px-3 py-2">Contexto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_DETAILS.triggers.map((t) => (
                  <tr key={t.id} className="bg-white hover:bg-slate-50/50">
                    <td className="px-3 py-2 font-medium text-slate-700 flex items-center gap-2">
                      {t.name.includes('Clima') && <ThermometerSun size={14} className="text-orange-500" />}
                      {t.name.includes('Horário') && <Clock size={14} className="text-blue-500" />}
                      {t.name.includes('Pairing') && <Zap size={14} className="text-purple-500" />}
                      {t.name}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-600">{t.win_rate}</td>
                    <td className="px-3 py-2 text-right font-bold text-emerald-600">{t.conversion}</td>
                    <td className="px-3 py-2 text-slate-500 text-xs">{t.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BLOCK 4: EVIDENCE */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-start">
          <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h5 className="font-bold text-blue-900 text-sm mb-1">Evidência Estatística</h5>
            <p className="text-sm text-blue-800 leading-relaxed">
              Pedidos que receberam sugestão deste item tiveram uma conversão <strong>1.5x maior</strong> do que pedidos orgânicos no turno de Jantar.
            </p>
            <div className="mt-2 flex gap-4 text-xs text-blue-600/80 font-medium">
              <span>Base: 420 sessões</span>
              <span>Intervalo confiança: 95%</span>
            </div>
          </div>
        </div>

      </div>
    </Drawer>
  );
}
