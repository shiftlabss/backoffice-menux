
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Button } from '../../ui/Button';

export function MainDailyChart({ data }) {
  const [activeMetric, setActiveMetric] = useState('revenue'); // revenue, orders, sessions

  if (!data) return null;

  const config = {
    revenue: { color: '#8b5cf6', label: 'Faturamento', prefix: 'R$ ' },
    orders: { color: '#10b981', label: 'Pedidos', prefix: '' },
    sessions: { color: '#3b82f6', label: 'Sessões', prefix: '' }
  };

  const currentConfig = config[activeMetric];
  const chartData = data[activeMetric] || [];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Performance do Dia</h3>
          <p className="text-sm text-slate-500">Comparativo hora a hora com período anterior.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg">
          {Object.keys(config).map(key => (
            <button
              key={key}
              onClick={() => setActiveMetric(key)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeMetric === key
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {config[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentConfig.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={currentConfig.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#64748b' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#64748b' }}
              tickFormatter={(val) => `${currentConfig.prefix}${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              labelStyle={{ color: '#1e293b', fontWeight: 'bold', marginBottom: '4px' }}
              cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
              formatter={(value, name) => [
                <span className="font-bold text-slate-700">{currentConfig.prefix}{value}</span>,
                name === 'value' ? 'Atual' : 'Anterior'
              ]}
            />

            {/* Previous Period Line (dashed) */}
            <Area
              type="monotone"
              dataKey="comparison"
              stroke="#cbd5e1"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="none"
              name="Anterior"
            />

            {/* Current Period Area */}
            <Area
              type="monotone"
              dataKey="value"
              stroke={currentConfig.color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCurrent)"
              name="Atual"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
