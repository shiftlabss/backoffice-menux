
import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Sparkles, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Form';

export default function SmartSummary() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Forecast Card */}
            <Card className="bg-gradient-to-br from-[#171717] to-[#262626] text-white border-none relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <CardContent className="p-6 relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-white/70 mb-2">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-xs font-bold uppercase tracking-wider">Previsão Inteligente</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">R$ 18.500</h3>
                        <p className="text-sm text-white/60">Estimativa de faturamento para hoje</p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/80">Confiança da IA</span>
                            <span className="font-bold text-green-400">94%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                            <div className="bg-green-400 w-[94%] h-full rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Customer Behavior Synthesis */}
            <Card className="border-border bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#3B82F6]"></div>
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Comportamento</h4>
                        <span className="bg-[#EFF6FF] text-[#3B82F6] text-xs px-2 py-1 rounded-full font-bold">Hoje</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[#EFF6FF] rounded-lg">
                                <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">Ticket Médio Elevado</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Clientes gastando 12% a mais em bebidas premium.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[#F0FDF4] rounded-lg">
                                <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">Alta Conversão</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Menus de sugestão convertendo 25% dos acessos.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Operational Alerts */}
            <Card className="border-border bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#EF4444]"></div>
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Alertas Operacionais</h4>
                        <span className="bg-[#FEF2F2] text-[#EF4444] text-xs px-2 py-1 rounded-full font-bold animate-pulse">2 Críticos</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                                <span className="text-sm font-medium text-[#7F1D1D]">Gargalo na Cozinha</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-6 text-[10px] bg-white/50 text-[#7F1D1D] hover:bg-white">
                                Ver
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="w-4 h-4 text-[#F97316]" />
                                <span className="text-sm font-medium text-[#7C2D12]">Estoque: Picanha</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-6 text-[10px] bg-white/50 text-[#7C2D12] hover:bg-white">
                                Repor
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
