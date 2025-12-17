
import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { ArrowRight, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RECOMENDACOES_MOCK = [
  { id: 1, type: 'upsell', title: 'Oportunidade de Upsell', desc: 'Sugerir "Bebida Grande" no Combo Família aumenta ticket em 15%.', action: 'Criar combo', actionType: 'create_combo' },
  { id: 2, type: 'anomalia', title: 'Anomalia de Preço', desc: 'Seu "Hamburguer Clássico" está 10% abaixo da média da região.', action: 'Ajustar preço', actionType: 'adjust_price' },
  { id: 3, type: 'estoque', title: 'Alerta de Estoque', desc: 'Tomate atingiu nível crítico. Previsão de esgotar em 4h.', action: 'Alertar compras', actionType: 'alert_stock' },
];

export default function DashboardRecommendationsBlock() {
  const navigate = useNavigate();

  const handleAction = (type) => {
    if (type === 'create_combo') {
      navigate('/menu/upsell');
      toast.success('Redirecionando para criação de Combo...');
    } else if (type === 'adjust_price') {
      navigate('/menu');
      toast.success('Filtrando produto para ajuste...');
    } else if (type === 'alert_stock') {
      toast.success('Alerta enviado para compras');
    }
  };

  return (
    <Card className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-foreground text-sm">Recomendações em Tempo Real</h3>
        <Button variant="ghost" size="sm" className="text-xs h-6 px-2 text-purple-600">
          Histórico <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {RECOMENDACOES_MOCK.map((rec) => (
          <div key={rec.id} className="p-2.5 rounded-lg border border-border bg-background/50 hover:bg-background transition-colors flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md shrink-0 ${rec.type === 'upsell' ? 'bg-green-100 text-green-600' :
                    rec.type === 'anomalia' ? 'bg-amber-100 text-amber-600' :
                      'bg-red-100 text-red-600'
                  }`}>
                  {rec.type === 'upsell' ? <DollarSign className="w-3.5 h-3.5" /> :
                    rec.type === 'anomalia' ? <TrendingUp className="w-3.5 h-3.5" /> :
                      <AlertTriangle className="w-3.5 h-3.5" />}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-foreground truncate">{rec.title}</h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{rec.desc}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 w-auto" onClick={() => handleAction(rec.actionType)}>
                {rec.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
