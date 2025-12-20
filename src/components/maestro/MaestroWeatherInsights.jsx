import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Form';
import { Badge } from '../ui/Badge';
import { Sparkles, ArrowRight, TrendingUp, Check, Plus, ThermometerSun, Snowflake, Umbrella, Wind } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../../lib/utils';

export function MaestroWeatherInsights({ weatherScenario, insights, loading }) {

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!insights || insights.length === 0) return null;

  const handleApply = (action, type) => {
    toast.custom((t) => (
      <div className={cn(
        "max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5",
        t.visible ? "animate-enter" : "animate-leave"
      )}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {type === 'upsell' ? 'Regra de Upsell Criada' : 'Destaque no Cardápio'}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                O Maestro aplicou: "{action}"
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
    // Here we would actually call the backend
    console.log(`[Maestro] Applying ${type}: ${action}`);
  };

  const getScenarioIcon = () => {
    switch (weatherScenario?.scenario) {
      case 'QUENTE': return <ThermometerSun className="w-5 h-5 text-orange-500" />;
      case 'FRIO': return <Snowflake className="w-5 h-5 text-blue-500" />;
      case 'CHUVOSO': return <Umbrella className="w-5 h-5 text-purple-500" />;
      default: return <Wind className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
          Maestro <span className="text-gray-400 font-medium text-sm">• Sugestões com base no clima</span>
        </h3>
        <span className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600 shadow-sm">
          {getScenarioIcon()}
          {weatherScenario?.label}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <Card
            key={insight.id}
            className="p-5 border-border hover:shadow-md transition-all duration-200 group relative overflow-hidden bg-white/50"
          >
            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="outline" className={cn(
                  "text-[10px] uppercase tracking-wider font-bold border-0",
                  insight.type === 'upsell' ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                )}>
                  {insight.type === 'upsell' ? 'Estratégia de Upsell' : 'Otimização de Cardápio'}
                </Badge>
              </div>

              <h4 className="font-bold text-gray-900 mb-1">{insight.title}</h4>
              <p className="text-sm text-gray-500 mb-4 flex-grow">{insight.reason}</p>

              <div className="mb-4 bg-gray-50/80 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-2">Sugestões de Itens</p>
                <div className="flex flex-wrap gap-2">
                  {insight.suggestion.map((item, i) => (
                    <span key={i} className="text-xs font-medium px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-auto pt-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gray-900 hover:bg-black text-white text-xs h-9 shadow-sm"
                  onClick={() => handleApply(insight.action, insight.type)}
                >
                  {insight.type === 'upsell' ? (
                    <><TrendingUp className="w-3 h-3 mr-1.5" /> Aplicar Upsell</>
                  ) : (
                    <><Plus className="w-3 h-3 mr-1.5" /> Aplicar no Menu</>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 rounded-lg border border-transparent hover:border-gray-200"
                >
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
