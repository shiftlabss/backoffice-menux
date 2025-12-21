import React, { useMemo } from 'react';
import {
  UsersIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const KPICard = ({ title, value, subtext, icon: Icon, trend, color = "blue", onClick }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
  };

  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
    </div>
  );
};

export default function ExecutiveKPIs({ customers, period }) {
  const metrics = useMemo(() => {
    if (!customers.length) return null;

    const totalCustomers = customers.length;
    const recurringCustomers = customers.filter(c => c.metrics.totalOrders > 1).length;
    const recurrenceRate = ((recurringCustomers / totalCustomers) * 100).toFixed(1);

    const totalRevenue = customers.reduce((acc, c) => acc + c.metrics.totalSpent, 0);
    const avgTicket = (customers.reduce((acc, c) => acc + c.metrics.ticketAverage, 0) / totalCustomers).toFixed(2);

    const avgLTV = (customers.reduce((acc, c) => acc + c.metrics.ltv, 0) / totalCustomers).toFixed(2);
    const avgFrequency = (customers.reduce((acc, c) => acc + c.metrics.frequencyDays, 0) / totalCustomers).toFixed(0);

    // Hypothetical Anonymous Revenue (25% of total)
    const anonymousRevenue = totalRevenue * 0.25;

    return {
      totalCustomers,
      recurrenceRate,
      avgTicket,
      avgLTV,
      avgFrequency,
      totalRevenue,
      anonymousRevenue
    };
  }, [customers]);

  if (!metrics) return <div className="animate-pulse h-32 bg-gray-100 rounded-xl w-full"></div>;

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const formatNumber = (val) => new Intl.NumberFormat('pt-BR').format(val);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <KPICard
        title="Clientes Únicos"
        value={formatNumber(metrics.totalCustomers)}
        subtext={`No período de ${period}`}
        icon={UsersIcon}
        color="blue"
        trend={12}
      />
      <KPICard
        title="Recorrência"
        value={`${metrics.recurrenceRate}%`}
        subtext="Clientes com 2+ pedidos"
        icon={ArrowPathIcon}
        color="purple"
        trend={5}
      />
      <KPICard
        title="Ticket Médio"
        value={formatCurrency(metrics.avgTicket)}
        subtext="Por cliente identificado"
        icon={CurrencyDollarIcon}
        color="green"
        trend={-2}
      />
      <KPICard
        title="LTV Estimado"
        value={formatCurrency(metrics.avgLTV)}
        subtext="Valor vitalício médio"
        icon={ChartBarIcon}
        color="orange"
        trend={8}
      />
      <KPICard
        title="Freq. de Compra"
        value={`${metrics.avgFrequency} dias`}
        subtext="Intervalo médio"
        icon={ClockIcon}
        color="blue"
      />
      <KPICard
        title="Receita Identificada"
        value={formatCurrency(metrics.totalRevenue)}
        subtext={`+ ${formatCurrency(metrics.anonymousRevenue)} (anônimos)`}
        icon={BanknotesIcon}
        color="green"
        trend={15}
      />
    </div>
  );
}
