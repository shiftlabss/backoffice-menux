import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { DollarSign, Sparkles, TrendingUp, Activity, ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

const SummaryCard = ({ title, value, subtext, icon: Icon, color, actionLabel, onAction }) => (
  <Card className="p-5 border-slate-200 bg-white shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
    {/* Background Decoration */}
    <div className={cn("absolute -right-4 -top-4 opacity-5 transition-transform group-hover:scale-110", color)}>
      <Icon size={80} />
    </div>

    <div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider z-10">{title}</h3>
        <div className={cn("p-1.5 rounded-lg z-10", color.replace('text-', 'bg-').replace('600', '50'))}>
          <Icon size={16} className={cn("z-10", color)} />
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1 z-10 relative">{value}</div>
      <p className="text-xs text-slate-500 z-10 relative">{subtext}</p>
    </div>

    {actionLabel && (
      <div className="mt-4 pt-4 border-t border-slate-100 z-10 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onAction}
          className="w-full justify-between text-xs h-8 px-0 hover:bg-transparent hover:text-purple-700 group/btn"
        >
          {actionLabel}
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    )}
  </Card>
);

export function MaestroSummary({ metrics, onResolveTopAction, onViewDiagnostics }) {
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">

      <SummaryCard
        title="Receita no Período"
        value={metrics.revenue_total}
        subtext={metrics.revenue_trend}
        icon={DollarSign}
        color="text-slate-600"
      />

      <SummaryCard
        title="Atribuído ao Maestro"
        value={metrics.revenue_attributed}
        subtext={`${metrics.revenue_attributed_pct} do total`}
        icon={Sparkles}
        color="text-purple-600"
      />

      <SummaryCard
        title="Top Oportunidade"
        value={metrics.top_opportunity_value}
        subtext={metrics.top_opportunity_name}
        icon={TrendingUp}
        color="text-emerald-600"
      />

      <SummaryCard
        title="Saúde do Cardápio"
        value={metrics.menu_health_score}
        subtext="3 itens precisam de atenção"
        icon={Activity}
        color="text-blue-600"
      />

    </div>
  );
}
