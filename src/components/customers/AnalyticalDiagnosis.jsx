import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-4">
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

const TopList = ({ data, metric, labelFn, valueFn }) => (
  <div className="space-y-3">
    {data.map((item, index) => (
      <div key={item.id} className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${index < 3 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
            {index + 1}
          </span>
          <span className="font-medium text-gray-700 truncate max-w-[120px]">{item.name}</span>
        </div>
        <span className="font-semibold text-gray-900">{valueFn(item)}</span>
      </div>
    ))}
  </div>
);

export default function AnalyticalDiagnosis({ customers }) {
  const analysis = useMemo(() => {
    if (!customers.length) return null;

    // 1. Value Distribution
    const topSpenders = [...customers].sort((a, b) => b.metrics.totalSpent - a.metrics.totalSpent).slice(0, 5);
    const topFrequent = [...customers].sort((a, b) => b.metrics.totalOrders - a.metrics.totalOrders).slice(0, 5);

    // 2. Base Health (Lifecycle)
    // Classification logic matched with mock generator
    const healthStats = [
      { name: 'Novos', value: customers.filter(c => c.tags.includes('Novo')).length, color: '#3b82f6' },
      { name: 'Leais', value: customers.filter(c => c.tags.includes('Leal') || c.rfm.classification === 'Leal' || c.rfm.classification === 'Campeão').length, color: '#10b981' },
      { name: 'Em Risco', value: customers.filter(c => c.tags.includes('Em Risco') || c.rfm.classification === 'Em Risco').length, color: '#f59e0b' },
      { name: 'Inativos', value: customers.filter(c => c.metrics.lastOrderDaysAgo > 90).length, color: '#ef4444' },
    ];

    // 3. Cohort Simulation (Simplified)
    // Group by month of 'since' date
    const cohorts = {};
    customers.forEach(c => {
      const month = new Date(c.since).toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
      if (!cohorts[month]) cohorts[month] = { month, customers: 0, retained: 0 };
      cohorts[month].customers++;
      if (c.metrics.lastOrderDaysAgo < 30) cohorts[month].retained++;
    });

    // Take last 6 months roughly
    const cohortData = Object.values(cohorts).slice(0, 6).reverse();

    return { topSpenders, topFrequent, healthStats, cohortData };
  }, [customers]);

  if (!analysis) return <div className="animate-pulse h-64 bg-gray-100 rounded-xl xl:col-span-2"></div>;

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Block 1: Distribution & Top Lists */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <SectionTitle title="Distribuição de Valor" subtitle="Quem são seus melhores clientes" />

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Top 5 Receita</h4>
            <TopList
              data={analysis.topSpenders}
              valueFn={(c) => formatCurrency(c.metrics.totalSpent)}
            />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Top 5 Frequência</h4>
            <TopList
              data={analysis.topFrequent}
              valueFn={(c) => `${c.metrics.totalOrders} pedidos`}
            />
          </div>
        </div>
      </div>

      {/* Block 2: Base Health & Cohorts */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
        <SectionTitle title="Saúde da Base" subtitle="Ciclo de vida e retenção" />

        <div className="flex-1 grid grid-cols-1 gap-4">
          {/* Health Pie Chart/Stats */}
          <div className="flex items-center justify-around">
            <div className="h-32 w-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analysis.healthStats}
                    innerRadius={25}
                    outerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analysis.healthStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {analysis.healthStats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }}></span>
                  <span className="text-xs text-gray-600">{stat.name}: <span className="font-bold text-gray-900">{stat.value}</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Cohort Bar Chart */}
          <div className="mt-4 h-24">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Retenção (Ativos no último mês)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analysis.cohortData}>
                <Tooltip
                  contentStyle={{ background: '#111', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar dataKey="retained" fill="#10b981" radius={[4, 4, 0, 0]} name="Retidos" StackId="a" />
                <Bar dataKey="customers" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Total da Safra" StackId="b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
