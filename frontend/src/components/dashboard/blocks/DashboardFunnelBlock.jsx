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

            <div className="flex-1 flex flex-col justify-center space-y-4">
                {/* Stage 1 */}
                <div className="relative">
                    <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 p-4 rounded-xl flex justify-between items-center z-10 relative">
                        <div>
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Iniciados</p>
                            <h4 className="text-xl font-bold text-foreground">186</h4>
                        </div>
                        <span className="text-xs font-bold text-gray-400">100%</span>
                    </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center -my-2 opacity-50">
                    <ArrowRight className="w-4 h-4 text-gray-300 rotate-90" />
                </div>

                {/* Stage 2 */}
                <div className="relative px-4">
                    <div className="bg-gradient-to-r from-purple-50 to-white border border-purple-100 p-4 rounded-xl flex justify-between items-center relative">
                        <div>
                            <p className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">Adicionados</p>
                            <h4 className="text-xl font-bold text-foreground">154</h4>
                        </div>
                        <span className="text-xs font-bold text-purple-600">82%</span>
                    </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center -my-2 opacity-50">
                    <ArrowRight className="w-4 h-4 text-gray-300 rotate-90" />
                </div>

                {/* Stage 3 */}
                <div className="relative px-8">
                    <div className="bg-gradient-to-r from-green-50 to-white border border-green-100 p-4 rounded-xl flex justify-between items-center relative shadow-sm border-l-4 border-l-green-400">
                        <div>
                            <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Finalizados</p>
                            <h4 className="text-xl font-bold text-foreground">142</h4>
                        </div>
                        <span className="text-xs font-bold text-green-600">76%</span>
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
