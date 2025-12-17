import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Sparkles, ArrowRight, Zap, RefreshCw, Package } from 'lucide-react';
import { Badge } from '../../ui/Badge';

const RECS = [
  {
    id: 1,
    type: 'upsell',
    title: 'Ativar Combo Família no Jantar',
    desc: 'Alta procura por combos grandes às 20h.',
    impact: '+R$ 450/dia',
    icon: Zap,
    color: 'text-amber-500 bg-amber-50 border-amber-100'
  },
  {
    id: 2,
    type: 'stock',
    title: 'Repor Coca-Cola Lata',
    desc: 'Estoque projetado para acabar em 2h.',
    impact: 'Evitar ruptura',
    icon: Package,
    color: 'text-blue-500 bg-blue-50 border-blue-100'
  },
];

export default function DashboardRecommendationsBlock() {
  return (
    <Card className="h-full p-6 bg-white border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gray-900 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <h3 className="font-bold text-gray-900">Recomendações</h3>
        </div>
        <Badge variant="outline" className="text-[10px] bg-gray-50 border-gray-200 text-gray-500">
          2 Novas
        </Badge>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {RECS.map((rec) => {
          const Icon = rec.icon;
          return (
            <div key={rec.id} className="p-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-gray-300 hover:shadow-md transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div className={`p-1.5 rounded-md border ${rec.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  {rec.impact}
                </span>
              </div>

              <h4 className="text-sm font-bold text-gray-900 mb-1 leading-tight group-hover:text-black">
                {rec.title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-1 mb-3">
                {rec.desc}
              </p>

              <Button size="sm" className="w-full h-8 text-xs font-semibold bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm">
                Aplicar Sugestão
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-2 text-center">
        <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 mx-auto transition-colors">
          <RefreshCw className="w-3 h-3" /> Atualizar Análise
        </button>
      </div>
    </Card>
  );
}
