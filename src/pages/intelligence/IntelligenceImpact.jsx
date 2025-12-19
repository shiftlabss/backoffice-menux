import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import ModuleLayout from '../../components/layout/ModuleLayout';
import { intelligenceSidebarItems } from '../../constants/intelligenceSidebar';
import { TrendingUp, DollarSign, ShoppingBag, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { cn } from '../../lib/utils';

export default function IntelligenceImpact() {
  const [period, setPeriod] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchImpact();
  }, [period]);

  const fetchImpact = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/intelligence/impact?period=${period}`);
      setData(res.data);
    } catch (err) {
      toast.error("Erro ao carregar dados de impacto.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>
    );
  }

  const kpis = [
    { label: 'Receita via IA', value: `R$ ${data?.revenue_generated?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, change: '+12.5%', isUp: true },
    { label: '% da Receita Total', value: `${data?.revenue_pct}%`, change: '+2.1%', isUp: true },
    { label: 'Ticket Médio (com IA)', value: `R$ ${data?.ticket_with_ai?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, change: `+${((data?.ticket_with_ai - data?.ticket_without_ai) / data?.ticket_without_ai * 100).toFixed(1)}%`, isUp: true },
    { label: 'Ticket Médio (sem IA)', value: `R$ ${data?.ticket_without_ai?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, change: 'Ref', isUp: false },
  ];

  return (
    <ModuleLayout
      title="Maestro"
      subtitle="Impacto nas Vendas"
      items={intelligenceSidebarItems}
      actions={
        <div className="flex bg-white border border-border rounded-lg p-1">
          {['7d', '30d'].map(t => (
            <button
              key={t}
              onClick={() => setPeriod(t)}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-md transition-colors",
                period === t ? "bg-gray-100 text-foreground" : "text-gray-500 hover:text-foreground hover:bg-gray-50"
              )}
            >
              {t === '7d' ? '7 dias' : '30 dias'}
            </button>
          ))}
        </div>
      }
    >
      <div className="space-y-6 max-w-7xl mx-auto pb-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <Card key={i} className="p-4 border-border">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{kpi.label}</p>
              <div className="mt-2 flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
                <span className={`text-xs font-bold flex items-center gap-0.5 ${kpi.isUp ? 'text-green-600' : 'text-gray-500'}`}>
                  {kpi.isUp && <ArrowUpRight className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Chart */}
        <Card className="p-6 border-border">
          <h3 className="font-bold text-foreground mb-6">Evolução da Receita (IA)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.chart_data || []}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#9333ea" strokeWidth={2} fill="url(#colorValue)" name="Receita IA" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-border">
            <h3 className="font-bold text-foreground mb-4">Conversão Geral</h3>
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <p className="text-4xl font-black text-purple-600">+{data?.conversion_lift}%</p>
                <p className="text-gray-500 mt-2">Aumento na conversão de produtos recomendados</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border flex flex-col justify-center items-center text-center">
            <div className="p-4 bg-purple-50 rounded-full mb-4">
              <ShoppingBag className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-foreground">Produtos Mais Influenciados</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Estes são os itens que mais convertem quando sugeridos pela IA.
            </p>
            <div className="w-full space-y-2">
              {['Coca-Cola Zero', 'Batata Frita G', 'Pudim'].map((p, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg text-sm">
                  <span className="font-medium text-gray-700">{p}</span>
                  <span className="text-green-600 font-bold text-xs">Alta Conversão</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ModuleLayout>
  );
}
