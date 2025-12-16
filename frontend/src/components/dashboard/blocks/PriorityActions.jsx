import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { AlertCircle, ArrowRight, Zap, TrendingUp, Package, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function PriorityActions() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: 'Repor Estoque: Coca-Cola',
      reason: 'Projeção de alta saída no jantar (Sexta-feira)',
      impact: 'Risco de perder R$ 450,00',
      priority: 'Alta',
      type: 'estoque',
      icon: Package,
      action: () => {
        toast.success('Solicitação de reposição enviada para o estoque!');
        // Mock navigation/action
      }
    },
    {
      id: 2,
      title: 'Ativar Combo "Happy Hour"',
      reason: 'Movimento baixo esperado entre 17h-19h',
      impact: 'Potencial de +R$ 800,00',
      priority: 'Média',
      type: 'marketing',
      icon: Zap,
      action: () => {
        navigate('/menu/upsell');
        toast.success('Redirecionando para ativação de Combos...');
      }
    },
    {
      id: 3,
      title: 'Ajustar Tempo de Preparo',
      reason: 'Batata Frita com atraso médio de 5min',
      impact: 'Melhora SLA em 12%',
      priority: 'Média',
      type: 'operacao',
      icon: Clock,
      action: () => {
        toast.loading('Abrindo configurações de tempo...', { duration: 1500 });
        // Mock modal opening
        setTimeout(() => toast.success('Configurações atualizadas'), 1500);
      }
    }
  ];

  return (
    <Card className="p-0 overflow-hidden border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-all">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 p-1.5 rounded-lg">
            <Zap className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900">Ações Prioritárias do Dia</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-7"
          onClick={() => {
            navigate('/intelligence/recommendations');
            toast('Visualizando todas as recomendações do Maestro');
          }}
        >
          Ver todas
        </Button>
      </div>
      <div className="divide-y divide-gray-50">
        {actions.map((action) => (
          <div
            key={action.id}
            className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer active:bg-gray-100"
            onClick={action.action}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 p-1.5 rounded-full ${action.priority === 'Alta' ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-600'}`}>
                <action.icon size={14} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  {action.title}
                  <Badge variant="outline" className={`text-[10px] px-1.5 h-4 ${action.priority === 'Alta' ? 'text-red-600 border-red-200 bg-red-50' : 'text-yellow-600 border-yellow-200 bg-yellow-50'
                    }`}>
                    {action.priority}
                  </Badge>
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">{action.reason}</p>
                <span className="text-xs font-medium text-green-600 mt-1 block flex items-center gap-1">
                  <TrendingUp size={10} /> {action.impact}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
