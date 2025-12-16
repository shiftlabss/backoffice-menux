
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Form';
import { Sparkles, AlertTriangle, Tag, DollarSign, ArrowRight } from 'lucide-react';

const InsightItem = ({ type, text, action, color, icon: Icon, onClick }) => (
    <div className="bg-background p-4 rounded-xl border border-border hover:bg-muted transition-all duration-200 group flex flex-col sm:flex-row gap-4 items-start sm:items-center cursor-pointer hover:shadow-md h-full">
        <div className="flex-1 flex gap-3">
            <div className={`p-2 rounded-lg h-fit bg-${color}-50 text-${color}-600 shrink-0 border border-${color}-100`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h4 className={`text-sm font-bold text-foreground mb-1`}>{type}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{text}</p>
            </div>
        </div>
        <div className="flex items-center justify-end sm:justify-start w-full sm:w-auto">
            <Button
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                variant="ghost"
                size="sm"
                className={`h-9 px-4 text-xs font-bold bg-white text-foreground border border-border hover:bg-background whitespace-nowrap w-full sm:w-auto hover:scale-105 transition-transform`}
            >
                <span className="mr-2">{action}</span>
                <ArrowRight className="w-3 h-3" />
            </Button>
        </div>
    </div>
);

export default function MaestroWidget({ onAction }) {
    return (
        <Card className="border-border bg-white relative overflow-hidden shadow-sm">
            <CardHeader className="relative z-10 border-b border-muted pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-600" />
                            <CardTitle className="text-xl text-foreground">Maestro <span className="text-purple-600">Recomendações</span></CardTitle>
                        </div>
                        <p className="text-sm text-muted-foreground">Inteligência contextual em tempo real para tomada de decisão.</p>
                    </div>
                    <span className="text-xs font-bold bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200 flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Sistema Ativo
                    </span>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 pt-6 flex flex-col gap-4">

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                    <InsightItem
                        type="Oportunidade Upsell"
                        text="Clientes comprando 'Hambúrguer Gourmet' aceitam 'Batata Rústica' em 68% das vezes."
                        action="Criar Combo (+R$ 12,00)"
                        color="yellow"
                        icon={Tag}
                        onClick={() => onAction('create-combo')}
                    />

                    <InsightItem
                        type="Anomalia Detectada"
                        text="Queda abrupta de 40% nas vendas de 'Sucos Naturais' hoje."
                        action="Verificar Estoque"
                        color="red"
                        icon={AlertTriangle}
                        onClick={() => onAction('stock-check')}
                    />

                    <InsightItem
                        type="Previsão de Estoque"
                        text="Ruptura de 'File Mignon' prevista para 21:00 baseado no fluxo atual."
                        action="Alertar Compras"
                        color="orange"
                        icon={AlertTriangle}
                        onClick={() => onAction('alert-purchasing')}
                    />

                    <InsightItem
                        type="Sugestão de Preço"
                        text="Margem do 'Chopp' pode ser otimizada em +R$ 1,50 sem afetar conversão no Happy Hour."
                        action="Ajustar Preço"
                        color="green"
                        icon={DollarSign}
                        onClick={() => onAction('price-adjust')}
                    />
                </div>

                <div className="mt-4 pt-4 border-t border-muted flex justify-center">
                    <Button variant="link" className="text-purple-600 hover:text-purple-700" onClick={() => onAction('view-history')}>
                        Ver histórico completo de recomendações
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}
