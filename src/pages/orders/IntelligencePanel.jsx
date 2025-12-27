import React from 'react';
import { Sparkles, Coffee, Wine, Utensils, AlertTriangle, Check, X, Clock, Zap, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

// --- TableDetailsBlock Component ---


// --- Main Panel ---
export default function IntelligencePanel({ table, suggestions, onAction, onIgnore }) {
  if (!table) return null;

  const getActionIcon = (type) => {
    switch (type) {
      case 'drink': return Wine;
      case 'food': return Utensils;
      case 'dessert': return Coffee;
      default: return Sparkles;
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high': return {
        styles: 'text-red-700 bg-red-50 border-red-100',
        icon: AlertTriangle,
        label: 'Alta'
      };
      case 'medium': return {
        styles: 'text-amber-700 bg-amber-50 border-amber-100',
        icon: Zap,
        label: 'Média'
      };
      default: return {
        styles: 'text-blue-700 bg-blue-50 border-blue-100',
        icon: Info,
        label: 'Baixa'
      };
    }
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col w-full md:w-96 animate-in slide-in-from-right duration-300 shadow-xl z-50">
      {/* Header Fixo */}
      <div className="p-4 border-b border-gray-100 bg-white z-10 sticky top-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-900 text-white text-xs font-bold mb-2">
              {table.name}
            </span>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className={cn("font-medium", table.status === 'risk' ? 'text-red-600' : 'text-blue-600')}>
                {table.status === 'occupied' ? 'Ocupada' : table.status === 'risk' ? 'Em risco' : 'Livre'}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1">
                <Clock size={10} />
                <span>{table.time || '0 min'}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">Total Parcial</span>
            <span className="text-lg font-bold text-gray-900">R$ {table.totalValue?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* Seção 1: Maestro */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-indigo-600" />
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Sugestões do Maestro</h4>
          </div>

          {suggestions.length === 0 ? (
            <div className="bg-indigo-50/50 rounded-xl p-4 text-center border border-indigo-100/50">
              <p className="text-xs text-indigo-400 font-medium">Nenhuma oportunidade detectada agora.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((suggestion, idx) => {
                const Icon = getActionIcon(suggestion.type);
                const priorityConfig = getPriorityConfig(suggestion.priority);
                const PriorityIcon = priorityConfig.icon;

                return (
                  <div key={idx} className={cn(
                    "bg-white rounded-xl border shadow-sm p-3 hover:shadow-md transition-all group",
                    suggestion.priority === 'high' ? 'border-red-100 hover:border-red-200' :
                      suggestion.priority === 'medium' ? 'border-amber-100 hover:border-amber-200' :
                        'border-gray-200 hover:border-gray-300'
                  )}>
                    {/* Badge */}
                    <div className="flex justify-between items-start mb-2">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border",
                        priorityConfig.styles
                      )}>
                        <PriorityIcon size={10} />
                        Prioridade {priorityConfig.label}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{suggestion.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{suggestion.reason}</p>
                      </div>
                    </div>

                    {/* Recommended Items */}
                    {suggestion.items && (
                      <div className="mb-3 bg-gray-50/50 rounded-lg p-2 border border-dashed border-gray-200">
                        <div className="flex flex-wrap gap-1">
                          {suggestion.items.map((item, i) => (
                            <span key={i} className="text-[10px] bg-white px-2 py-1 rounded border border-gray-100 text-gray-600 shadow-sm font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => onAction(table.id, suggestion)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                      >
                        <Check size={14} />
                        Oferecer
                      </button>
                      <button
                        onClick={() => onIgnore(table.id, suggestion)}
                        className="px-3 py-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                        title="Ignorar"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Seção 2: Detalhes da Mesa */}


      </div>
    </div>
  );
}
