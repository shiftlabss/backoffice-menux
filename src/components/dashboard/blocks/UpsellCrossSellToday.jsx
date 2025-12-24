import React from 'react';
import { useAudit } from '../../../hooks/useAudit';
import { Card } from '../../ui/Card';
import { TrendingUp, MousePointer2, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Skeleton } from '../../ui/Skeleton';

export default function UpsellCrossSellToday({ isLoading = false }) {
  const navigate = useNavigate();
  const { log } = useAudit();

  const handleNavigate = (ruleName) => {
    log('dashboard.upsell.open_rule', { rule: ruleName });
    navigate(`/menu/upsell?rule=${encodeURIComponent(ruleName)}`);
    toast.loading(`Carregando regra: ${ruleName}`, { duration: 1000 });
  };

  if (isLoading) {
    return (
      <Card className="p-5 h-full flex flex-col gap-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </Card>
    );
  }


  return (
    <Card className="p-0 overflow-hidden relative border-l-4 border-l-green-500 h-full flex flex-col">
      <div className="p-5 pb-3 flex-1">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-green-600" />
          Upsell Hoje
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-3 rounded-xl border border-green-100">
            <p className="text-xs font-medium uppercase tracking-wide text-green-800 mb-1">Receita Extra</p>
            <p className="text-lg font-semibold text-green-700">+ R$ 320,00</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">Taxa Conversão</p>
            <p className="text-lg font-semibold text-gray-900">18.5%</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-medium uppercase tracking-wide text-gray-400">Top Regras do Dia</h4>
          {[
            { name: 'Batata M -> G', conv: '22%', val: 'R$ 120' },
            { name: 'Adic. Bebida', conv: '15%', val: 'R$ 80' }
          ].map((rule, i) => (
            <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0 hover:bg-gray-50 cursor-pointer p-1 rounded transition-colors" onClick={() => handleNavigate(rule.name)}>
              <span className="font-medium text-gray-700">{rule.name}</span>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs font-medium h-5 px-1">{rule.conv}</Badge>
                <span className="font-bold text-gray-900">{rule.val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>


    </Card>
  );
}
