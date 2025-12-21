import React, { useMemo } from 'react';
import { SparklesIcon, PlusIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

const SegmentCard = ({ title, count, color = "gray", icon: Icon }) => {
  const colorClasses = {
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-700",
    amber: "bg-amber-50 border-amber-100 text-amber-700",
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
    rose: "bg-rose-50 border-rose-100 text-rose-700",
    gray: "bg-gray-50 border-gray-100 text-gray-700",
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]} flex items-center justify-between cursor-pointer hover:shadow-md transition-all`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white bg-opacity-60`}>
          {Icon && <Icon className="w-4 h-4" />}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{title}</span>
          <span className="text-xs opacity-80">{count} clientes</span>
        </div>
      </div>
    </div>
  );
};

export default function SegmentsSection({ customers }) {
  const counts = useMemo(() => {
    if (!customers.length) return {};
    return {
      vip: customers.filter(c => c.tags.includes('VIP')).length,
      risk: customers.filter(c => c.tags.includes('Em Risco')).length,
      new: customers.filter(c => c.tags.includes('Novo')).length,
      loyal: customers.filter(c => c.tags.includes('Leal')).length,
    };
  }, [customers]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:col-span-3">
      {/* Title Block */}
      <div className="md:col-span-2 lg:col-span-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-yellow-500" />
            Segmentos Inteligentes
          </h3>
          <p className="text-sm text-gray-500">Agrupamentos automáticos baseados em comportamento</p>
        </div>
      </div>

      <SegmentCard
        title="VIPs & Champions"
        count={counts.vip || 0}
        color="indigo"
        icon={SparklesIcon}
      />

      <SegmentCard
        title="Em Risco de Churn"
        count={counts.risk || 0}
        color="amber"
        icon={MegaphoneIcon}
      />

      <SegmentCard
        title="Novos ( < 30 dias )"
        count={counts.new || 0}
        color="blue"
        icon={SparklesIcon}
      />

      <div className="p-4 rounded-xl border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
        <div className="flex items-center gap-2 text-gray-400 group-hover:text-primary">
          <PlusIcon className="w-5 h-5" />
          <span className="font-medium text-sm">Criar Novo Segmento</span>
        </div>
      </div>
    </div>
  );
}
