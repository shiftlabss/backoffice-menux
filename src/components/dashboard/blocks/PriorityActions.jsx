import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { AlertCircle, ArrowRight, Zap, TrendingUp, Package, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import toast from 'react-hot-toast';

const priorityConfig = {
    high: { color: 'bg-red-500', label: 'Alta' },
    medium: { color: 'bg-amber-500', label: 'Média' },
    low: { color: 'bg-blue-500', label: 'Baixa' }
};

const ACTIONS = [
    {
        id: 1,
        title: 'Repor Estoque: Coca-Cola',
        impact: 'Risco de Ruptura',
        priority: 'high',
        time: '15min'
    },
    {
        id: 2,
        title: 'Ativar Combo "Happy Hour"',
        impact: '+R$ 800 Potencial',
        priority: 'medium',
        time: '2h'
    },
    {
        id: 3,
        title: 'Ajustar Tempo de Preparo',
        impact: 'SLA em risco',
        priority: 'high',
        time: '5min'
    },
    {
        id: 4,
        title: 'Revisar Meta do Jantar',
        impact: 'Abaixo do esperado',
        priority: 'medium',
        time: '1h'
    }
];

export default function PriorityActions() {
    const navigate = useNavigate();

    return (
        <Card className="h-full flex flex-col bg-white border-gray-200 shadow-sm overflow-hidden" >
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-gray-900" />
                        Ações Prioritárias
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">4 pendências requerem atenção</p>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                    4
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {ACTIONS.map((action) => (
                    <div
                        key={action.id}
                        className="group relative flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all bg-white"
                    >
                        {/* Side Urgency Indicator */}
                        <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", priorityConfig[action.priority].color)} />

                        <div className="pl-3 flex flex-col gap-1">
                            <span className="text-sm font-bold text-gray-900 leading-tight group-hover:text-black">
                                {action.title}
                            </span>
                            <div className="flex items-center gap-3">
                                <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-gray-100 text-gray-600 border border-gray-200")}>
                                    {action.impact}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                                    <Clock className="w-3 h-3" /> {action.time} atraso
                                </span>
                            </div>
                        </div>

                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                <button className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1 transition-colors w-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Marcar todas como vistas
                </button>
            </div>
        </Card >
    );
}
