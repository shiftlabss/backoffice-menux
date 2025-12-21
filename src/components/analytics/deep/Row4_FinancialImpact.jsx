import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { DEEP_ANALYTICS_DATA } from '../../../services/mockAnalyticsDeep';
import { BadgeDollarSign, GitMerge, ScatterChart as ScatterIcon, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Row4_FinancialImpact() {
  const { ticketImpact, upsellCombinations, marginVolumeData } = DEEP_ANALYTICS_DATA;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Ticket Impact - Spans 4 cols */}
      <Card className="md:col-span-4 border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BadgeDollarSign className="w-24 h-24 text-primary" />
        </div>
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-foreground mb-6">Impacto no Ticket Médio</h3>
          <div className="space-y-6 relative z-10">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold">Com Interação no Menu Digital</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(ticketImpact.withInteraction)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold">Sem Interação (Garçom apenas)</p>
              <p className="text-xl font-bold text-gray-500">{formatCurrency(ticketImpact.withoutInteraction)}</p>
            </div>
            <div className="pt-4 border-t border-dashed border-border">
              <div className="flex items-center gap-2 text-primary font-bold">
                <ArrowUpRight className="w-5 h-5" />
                <span>+{ticketImpact.lift}% de Aumento</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upsell Combinations - Spans 4 cols */}
      <Card className="md:col-span-4 border-border shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-purple-600" />
            Cross-sell Mais Frequentes
          </h3>
          <div className="space-y-4">
            {upsellCombinations.map((combo, i) => (
              <div key={i} className="bg-muted/30 p-3 rounded-lg flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-bold text-gray-800">{combo.item}</span>
                  <span className="mx-2 text-muted-foreground">+</span>
                  <span className="font-bold text-purple-700">{combo.pair}</span>
                </div>
                <div className="text-xs font-bold bg-white px-2 py-1 rounded shadow-sm border">
                  {combo.frequency}x
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-4 text-center">
            Baseado em pedidos realizados na mesma sessão.
          </p>
        </CardContent>
      </Card>

      {/* Margin vs Volume - Spans 4 cols */}
      <Card className="md:col-span-4 border-border shadow-sm">
        <CardContent className="p-6 h-full flex flex-col">
          <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
            <ScatterIcon className="w-4 h-4 text-blue-600" />
            Matriz Margem x Volume
          </h3>
          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" dataKey="x" name="Volume" tick={{ fontSize: 10 }} unit="un" />
                <YAxis type="number" dataKey="y" name="Margem" tick={{ fontSize: 10 }} unit="%" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Itens" data={marginVolumeData} fill="#8884d8">
                  {marginVolumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#EA580C', '#16A34A', '#2563EB', '#9333EA'][index % 4]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
