
import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Form';
import { Bell, AlertTriangle, ArrowRight } from 'lucide-react';

export default function DashboardNotifications() {
  return (
    <Card className="p-6 h-full flex flex-col justify-between border-l-4 border-l-red-500/50 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-500" />
            Alertas Críticos
          </h3>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-red-600">3</span>
            <span className="text-xs text-gray-500 font-medium">pendentes</span>
          </div>
        </div>
        <div className="bg-red-50 p-2 rounded-full animate-pulse">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-xs text-gray-600 line-clamp-1">
          Ruputura de estoque (Coca-Cola), +2 riscos...
        </p>
        <Button variant="outline" size="sm" className="w-full text-xs h-8 justify-between group">
          Resolver Agora
          <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-gray-900 transition-colors" />
        </Button>
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">CD</div>
            <span className="text-xs font-medium text-gray-600">Camila Duarte</span>
          </div>
          <span className="text-[10px] text-gray-400">Perfil &gt;</span>
        </div>
      </div>
    </Card>
  );
}
