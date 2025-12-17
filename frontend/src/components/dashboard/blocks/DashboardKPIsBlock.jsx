
import React from 'react';
import { Card } from '../../ui/Card';
import { DollarSign, ShoppingBag, Clock, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';

export default function DashboardKPIsBlock() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-orange-50 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                        <ChevronDown className="w-3 h-3" /> 18s
                    </span>
                </div>
                <div>
                    <span className="text-xs font-medium text-gray-500 block mb-1">Tempo Decisão</span>
                    <h3 className="text-2xl font-extrabold text-gray-900">4m 12s</h3>
                </div>
            </Card>

            <Card className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                        <ChevronUp className="w-3 h-3" /> 5%
                    </span>
                </div>
                <div>
                    <span className="text-xs font-medium text-gray-500 block mb-1">Pedidos Totais</span>
                    <h3 className="text-2xl font-extrabold text-gray-900">342</h3>
                </div>
            </Card>

            <Card className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                        <ChevronDown className="w-3 h-3" /> 2%
                    </span>
                </div>
                <div>
                    <span className="text-xs font-medium text-gray-500 block mb-1">Ticket Médio</span>
                    <h3 className="text-2xl font-extrabold text-gray-900">R$ 84,50</h3>
                </div>
            </Card>

            <Card className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                        <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                        <ChevronUp className="w-3 h-3" /> 12%
                    </span>
                </div>
                <div>
                    <span className="text-xs font-medium text-gray-500 block mb-1">Receita do Dia</span>
                    <h3 className="text-2xl font-extrabold text-gray-900">R$ 14.250</h3>
                </div>
            </Card>
        </div>
    );
}
