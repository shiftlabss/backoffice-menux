import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Sparkles, TrendingUp, AlertTriangle, ArrowRight, Camera, Tag } from 'lucide-react';

const RecommendationCard = ({ type, title, description, badge, action, onAction }) => {
    let icon = <Sparkles className="w-5 h-5 text-indigo-400" />;
    let bgColor = "bg-indigo-500/10";
    let borderColor = "border-indigo-500/20";

    if (type === 'alert') {
        icon = <AlertTriangle className="w-5 h-5 text-amber-400" />;
        bgColor = "bg-amber-500/10";
        borderColor = "border-amber-500/20";
    }

    return (
        <div className={`p-4 rounded-xl border ${borderColor} ${bgColor} relative group transition-all hover:bg-opacity-20`}>
            {badge && (
                <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/90 px-2 py-0.5 rounded-full">
                    {badge}
                </div>
            )}
            <div className="flex gap-4">
                <div className="mt-1">{icon}</div>
                <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
                    <p className="text-gray-300 text-xs leading-relaxed mb-3">{description}</p>
                    <button
                        onClick={() => onAction && onAction(title)}
                        className="flex items-center gap-1 text-xs font-bold text-white hover:text-indigo-300 transition-colors"
                    >
                        {action} <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function MaestroHighlights({ onAction }) {
    return (
        <Card className="bg-gray-900 border-gray-800 text-white overflow-hidden relative">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-wine-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <CardHeader className="relative z-10 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-500 rounded-lg">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-lg text-white">Maestro Intelligence</CardTitle>
                        <p className="text-xs text-gray-400">3 novas recomendações baseadas em dados</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="relative z-10 p-6 space-y-4">
                <RecommendationCard
                    title="Ajuste de Preço Sugerido"
                    description="O item 'Suco Natural' tem conversão de 80% (muito acima da média). Aumentar o preço em 8% pode gerar +R$ 450,00 de lucro mensal sem impactar vendas."
                    badge="+ R$ 450/mês"
                    action="Aplicar Ajuste (+8%)"
                    onAction={() => onAction('apply_price_adjustment')}
                />

                <RecommendationCard
                    type="alert"
                    title="Queda de Conversão"
                    description="O item 'Salmão Grelhado' perdeu 18% de conversão nos últimos 7 dias. Verifique se a foto está atualizada ou se houve mudança na receita."
                    badge="-18% Conv."
                    action="Ver Detalhes do Item"
                    onAction={() => onAction('view_item_details')}
                />

                <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-white/10">
                            <Camera className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                            <div className="text-white text-sm font-medium">Fotos Faltantes</div>
                            <div className="text-gray-400 text-xs">3 itens sem foto no cardápio</div>
                        </div>
                    </div>
                    <button
                        onClick={() => onAction('resolve_missing_photos')}
                        className="text-xs bg-white text-gray-900 px-3 py-1.5 rounded-lg font-bold hover:bg-gray-100"
                    >
                        Resolver
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
