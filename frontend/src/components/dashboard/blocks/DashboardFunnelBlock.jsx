import React from 'react';
import { Card } from '../../ui/Card';
import { Filter, ArrowRight } from 'lucide-react';

export default function DashboardFunnelBlock() {
    return (
        <Card className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    Funil de Pedidos
                </h3>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                    {/* Stage 1 */}
                    <div className="flex-1 bg-blue-50/50 border border-blue-100 p-2 rounded-lg text-center">
                        <p className="text-[10px] text-blue-600 font-bold uppercase mb-0.5">Iniciados</p>
                        <h4 className="text-lg font-bold text-foreground leading-none">186</h4>
                        <span className="text-[10px] text-gray-400 font-medium">100%</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-300 shrink-0" />
                    {/* Stage 2 */}
                    <div className="flex-1 bg-purple-50/50 border border-purple-100 p-2 rounded-lg text-center">
                        <p className="text-[10px] text-purple-600 font-bold uppercase mb-0.5">Add</p>
                        <h4 className="text-lg font-bold text-foreground leading-none">154</h4>
                        <span className="text-[10px] text-purple-600 font-bold">82%</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-300 shrink-0" />
                    {/* Stage 3 */}
                    <div className="flex-1 bg-green-50/50 border border-green-100 p-2 rounded-lg text-center border-b-2 border-b-green-400">
                        <p className="text-[10px] text-green-600 font-bold uppercase mb-0.5">Fim</p>
                        <h4 className="text-lg font-bold text-foreground leading-none">142</h4>
                        <span className="text-[10px] text-green-600 font-bold">76%</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500 font-medium">
                <span>Abandono: <span className="text-red-500 font-bold">24%</span></span>
                <span>Tempo Médio: <span className="text-foreground font-bold">2m 14s</span></span>
            </div>
        </Card>
    );
}
