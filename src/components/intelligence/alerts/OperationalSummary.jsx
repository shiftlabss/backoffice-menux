import React from 'react';
import { Card } from '../../ui/Card';
import { AlertCircle, TrendingUp, Clock, PackageX } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function OperationalSummary({ summary }) {
  // Mock fallback if undefined
  const data = summary || {
    criticalCount: 0,
    bottleneck: { label: 'Tudo fluindo', value: '100%', status: 'ok' },
    riskTables: 0,
    stockRisks: 0
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Critical Alerts */}
      <SummaryCard
        icon={AlertCircle}
        label="Alertas Críticos"
        value={data.criticalCount}
        subValue="Abertos agora"
        color="red"
        onClick={() => { }}
        pulse={data.criticalCount > 0}
      />

      {/* 2. Bottleneck */}
      <SummaryCard
        icon={TrendingUp}
        label="Gargalo Principal"
        value={data.bottleneck.label}
        subValue={data.bottleneck.value}
        color={data.bottleneck.status === 'ok' ? 'emerald' : 'orange'}
        customValueClass="text-sm line-clamp-1"
      />

      {/* 3. Tables Risk */}
      <SummaryCard
        icon={Clock}
        label="Mesas em Risco"
        value={data.riskTables}
        subValue="Acima do tempo"
        color={data.riskTables > 0 ? 'purple' : 'slate'}
      />

      {/* 4. Stock Risk */}
      <SummaryCard
        icon={PackageX}
        label="Risco de Ruptura"
        value={data.stockRisks}
        subValue="Itens críticos"
        color={data.stockRisks > 0 ? 'amber' : 'slate'}
      />
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, subValue, color, onClick, pulse, customValueClass }) {
  const colorStyles = {
    red: "bg-red-50 text-red-600 border-red-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    slate: "bg-slate-50 text-slate-600 border-slate-100",
  };

  const textColors = {
    red: "text-red-900",
    orange: "text-orange-900",
    amber: "text-amber-900",
    emerald: "text-emerald-900",
    purple: "text-purple-900",
    slate: "text-slate-900",
  };

  return (
    <Card
      className={cn(
        "p-4 border shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]",
        colorStyles[color].replace('bg-', 'hover:bg-opacity-80 ').replace('text-', 'border-')
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">{label}</p>
          <div className={cn("font-bold text-2xl tracking-tight leading-none", textColors[color], customValueClass)}>
            {value}
          </div>
          {subValue && <p className="text-xs opacity-80 mt-1 font-medium">{subValue}</p>}
        </div>
        <div className={cn("p-2 rounded-full bg-white bg-opacity-60", pulse && "animate-pulse ring-2 ring-offset-1 ring-red-200")}>
          <Icon size={18} />
        </div>
      </div>
    </Card>
  )
}
