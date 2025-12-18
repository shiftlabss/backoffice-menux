import React from 'react';
import {
    Zap, TrendingUp, AlertCircle, CheckCircle,
    Clock, Target, ArrowRight, Lightbulb, BarChart3
} from 'lucide-react';
import { Button } from '../ui/Form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';

function InsightCard({ title, description, impact, actionLabel, onAction, type = 'suggestion' }) {
    const typeStyles = {
        suggestion: { bg: 'bg-primary/5', border: 'border-primary/20', icon: Lightbulb, iconColor: 'text-primary' },
        warning: { bg: 'bg-warning/5', border: 'border-warning/20', icon: AlertCircle, iconColor: 'text-warning' },
        success: { bg: 'bg-success/5', border: 'border-success/20', icon: CheckCircle, iconColor: 'text-success' },
        opportunity: { bg: 'bg-accent/5', border: 'border-accent/20', icon: Target, iconColor: 'text-accent' }
    };

    const style = typeStyles[type];
    const Icon = style.icon;

    return (
        <div className={`${style.bg} border ${style.border} rounded-2xl p-5 transition-all duration-300 hover:shadow-md group`}>
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-white/80 shadow-sm ${style.iconColor}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-text-primary mb-1">{title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3">{description}</p>
                    <div className="flex items-center justify-between">
                        <Badge variant={impact === 'high' ? 'success' : 'secondary'} className="text-xs">
                            Impacto {impact === 'high' ? 'Alto' : impact === 'medium' ? 'Médio' : 'Baixo'}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" onClick={onAction}>
                            {actionLabel} <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, icon: Icon }) {
    return (
        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
                <p className="text-2xl font-bold text-text-primary">{value}</p>
                <p className="text-xs text-text-secondary">{label}</p>
            </div>
            {trend && (
                <div className="ml-auto text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-full">
                    {trend}
                </div>
            )}
        </div>
    );
}

export default function MenuInsights({ data, onAction }) {
    // Mock insights - in production, these would come from an AI service
    const insights = [
        {
            id: 1,
            type: 'opportunity',
            title: 'Combo Happy Hour',
            description: 'A categoria Bebidas tem alta visualização das 18h às 20h, mas baixa conversão. Sugerimos criar um combo promocional para aumentar o ticket médio.',
            impact: 'high',
            actionLabel: 'Criar Combo'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Produtos sem Foto',
            description: 'Existem 12 produtos sem imagem no cardápio. Produtos com foto têm 40% mais conversão.',
            impact: 'high',
            actionLabel: 'Ver Produtos'
        },
        {
            id: 3,
            type: 'suggestion',
            title: 'Descrições Curtas',
            description: '8 produtos têm descrições com menos de 20 caracteres. Descrições detalhadas ajudam na decisão de compra.',
            impact: 'medium',
            actionLabel: 'Melhorar'
        },
        {
            id: 4,
            type: 'success',
            title: 'Top Performer',
            description: 'O item "X-Burguer Especial" teve 45% mais pedidos esta semana. Considere destacá-lo no topo da categoria.',
            impact: 'medium',
            actionLabel: 'Destacar'
        }
    ];

    const recentLogs = [
        { time: '14:32', message: 'Análise de categorias concluída' },
        { time: '14:30', message: 'Padrões de consumo atualizados' },
        { time: '12:00', message: 'Relatório diário gerado' },
        { time: '09:15', message: 'Sync com dados de pedidos' },
    ];

    return (
        <div className="h-full overflow-y-auto bg-background p-6 md:p-8 animate-fadeIn space-y-8">

            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="warning">Beta</Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-text-primary">Insights da IA Menux</h1>
                <p className="text-text-secondary mt-1">
                    Sugestões inteligentes baseadas no comportamento dos clientes e performance do cardápio.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Insights Ativos" value="4" icon={Lightbulb} trend="+2 novos" />
                <StatCard label="Sugestões Aplicadas" value="12" icon={CheckCircle} />
                <StatCard label="Impacto Estimado" value="+18%" icon={TrendingUp} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Insights List */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Oportunidades Detectadas
                    </h3>
                    <div className="space-y-4">
                        {insights.map((insight) => (
                            <InsightCard
                                key={insight.id}
                                {...insight}
                                onAction={() => onAction(`insight_${insight.id}`)}
                            />
                        ))}
                    </div>
                </div>

                {/* Sidebar: Activity Log */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <Clock className="h-5 w-5 text-text-tertiary" />
                        Atividade Recente
                    </h3>
                    <Card className="bg-surface">
                        <CardContent className="p-0">
                            <ul className="divide-y divide-border">
                                {recentLogs.map((log, i) => (
                                    <li key={i} className="px-4 py-3 flex items-center gap-3">
                                        <span className="text-xs font-mono text-text-tertiary bg-background px-2 py-0.5 rounded">{log.time}</span>
                                        <span className="text-sm text-text-secondary">{log.message}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Chart Placeholder */}
                    <Card className="bg-surface">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-text-tertiary" />
                                Tendência Semanal
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-32 flex items-end justify-between gap-1 px-2">
                                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-primary/20 rounded-t transition-all hover:bg-primary/40"
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-text-tertiary mt-2 px-2">
                                <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}
