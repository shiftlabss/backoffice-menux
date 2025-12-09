import React from 'react';
import { Card } from '../ui/Card';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function AIImpactCard() {
    return (
        <Card className="h-full border-border bg-white flex flex-col p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-5">
                <div className="p-1.5 bg-purple-100 rounded-lg">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-800">Impacto IA nas Vendas</h3>
            </div>

            <div className="flex-1 flex flex-col gap-6">
                {/* Main Metric */}
                <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">Vendas Totais (IA)</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">R$ 3.850</span>
                        <span className="flex items-center text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                            +12% <TrendingUp className="w-3 h-3 ml-0.5" />
                        </span>
                    </div>
                </div>

                {/* Sub Metrics Grid - 2 Columns to prevent truncation */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                            Ticket Médio
                        </p>
                        <p className="text-lg font-bold text-gray-800 mt-0.5">R$ 45,20</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                            Pedidos
                        </p>
                        <p className="text-lg font-bold text-gray-800 mt-0.5">85 un.</p>
                    </div>
                </div>

                {/* Narrative */}
                <div className="mt-auto bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <p className="text-xs text-purple-900 font-medium leading-relaxed">
                        <span className="font-bold text-purple-700">29%</span> da receita total do dia vem de vendas influenciadas pela IA.
                    </p>
                    <div className="w-full bg-purple-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-purple-600 h-full rounded-full" style={{ width: '29%' }}></div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
