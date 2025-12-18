
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Sparkles, TrendingUp, AlertTriangle, Zap, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '../ui/Form';

export default function AIInsights() {
    return (
        <Card className="border-none bg-gradient-to-br from-indigo-900 to-purple-900 text-white h-full overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>

            <CardHeader className="relative z-10 border-white/10">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <CardTitle className="text-white">Insights Menux AI</CardTitle>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
                {/* Insight 1 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer group">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-yellow-400/20 rounded-lg text-yellow-300">
                            <Lightbulb className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm mb-1 group-hover:text-yellow-200 transition-colors">Oportunidade de Upsell</h4>
                            <p className="text-xs text-white/70 leading-relaxed">
                                Clientes pedindo "Picanha" têm 75% de chance de aceitar "Cerveja Artesanal". Crie um combo agora.
                            </p>
                            <Button size="sm" className="mt-3 h-7 text-xs bg-yellow-400 text-black hover:bg-yellow-300 border-none">
                                Criar Combo Auto
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Insight 2 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-400/20 rounded-lg text-red-300">
                            <TrendingUp className="w-4 h-4 rotate-180" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm mb-1">Queda de Ticket em Bebidas</h4>
                            <p className="text-xs text-white/70 leading-relaxed">
                                Vendas de vinho caíram 15% em relação à sexta passada. Sugestão: Ativar promoção de Happy Hour.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Insight 3 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-400/20 rounded-lg text-blue-300">
                            <Zap className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm mb-1">Previsão de Pico</h4>
                            <p className="text-xs text-white/70 leading-relaxed">
                                Preparar cozinha! Fluxo intenso previsto entre 20:30 e 21:30 baseado em dados históricos.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>

            <div className="absolute bottom-4 right-4 z-10">
                <Button variant="ghost" className="text-white/50 hover:text-white text-xs gap-1">
                    Ver todos <ArrowRight className="w-3 h-3" />
                </Button>
            </div>
        </Card>
    );
}
