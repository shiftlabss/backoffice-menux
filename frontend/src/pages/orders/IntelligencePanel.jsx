import React from 'react';
import { Sparkles, Coffee, Wine, Utensils, AlertTriangle, Check, X, Clock } from 'lucide-react';

export default function IntelligencePanel({ table, suggestions, onAction, onIgnore }) {
  if (!table) return null;

  const getActionIcon = (type) => {
    switch (type) {
      case 'drink': return Wine;
      case 'food': return Utensils;
      case 'dessert': return Coffee; // Using Coffee for dessert/coffee
      default: return Sparkles;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col w-full md:w-80 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} className="text-indigo-600" />
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Maestro</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900">Sugestões da {table.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <Clock size={12} />
          <span>Tempo na mesa: <span className="font-medium text-gray-900">{table.time || '0 min'}</span></span>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {suggestions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check size={20} className="text-green-500" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">Tudo certo por aqui!</h4>
            <p className="text-xs text-gray-500 mt-1">Nenhuma sugestão crítica no momento.</p>
          </div>
        ) : (
          suggestions.map((suggestion, idx) => {
            const Icon = getActionIcon(suggestion.type);
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 hover:shadow-md transition-shadow">
                {/* Badge */}
                <div className="flex justify-between items-start mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getPriorityColor(suggestion.priority)}`}>
                    {suggestion.priority === 'high' && <AlertTriangle size={10} />}
                    Prioridade {suggestion.priority === 'high' ? 'Alta' : suggestion.priority === 'medium' ? 'Média' : 'Baixa'}
                  </span>
                </div>

                {/* Content */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{suggestion.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{suggestion.reason}</p>
                  </div>
                </div>

                {/* Recommended Items */}
                {suggestion.items && (
                  <div className="mb-3 bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] font-medium text-gray-500 uppercase mb-1">Items Sugeridos</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.items.map((item, i) => (
                        <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-700">
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
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors"
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
          })
        )}
      </div>

      {/* Footer with Stats */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="text-xs text-center text-gray-500">
          Tempo médio bebida: <span className="font-semibold text-gray-900">14 min</span>
        </div>
      </div>
    </div>
  );
}
