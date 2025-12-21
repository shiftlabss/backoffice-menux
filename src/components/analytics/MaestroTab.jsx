
import React, { useEffect, useState } from 'react';
import { MaestroKPIs } from './maestro/MaestroKPIs';
import { RulesTable } from './maestro/RulesTable';
import { analyticsService } from '../../services/mockAnalytics';
import { Loader2, Info } from 'lucide-react';

export function MaestroTab({ isActive }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isActive && !data) {
      setLoading(true);
      analyticsService.getMaestro()
        .then(res => setData(res))
        .finally(() => setLoading(false));
    }
  }, [isActive, data]);

  if (!isActive) return null;

  if (loading && !data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl flex items-start gap-3 mb-6">
        <Info className="text-purple-600 mt-0.5" size={18} />
        <div>
          <h4 className="font-bold text-purple-900 text-sm">Modelo de Atribuição: Ampliado</h4>
          <p className="text-xs text-purple-700/80 mt-1">
            Consideramos receita influenciada qualquer pedido que teve interação com uma sugestão do Maestro até 30 minutos antes do checkout.
            <span className="underline ml-1 cursor-pointer">Alterar modelo</span>
          </p>
        </div>
      </div>

      <MaestroKPIs />
      <RulesTable rules={data.rules} />
    </div>
  );
}
