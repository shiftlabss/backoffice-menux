import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export default function MaestroInsights({ insights = [] }) {
  if (!insights || insights.length === 0) return null;

  return (
    <section className="mb-6 animate-in slide-in-from-top-4 duration-500">
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-none p-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Sparkles size={120} />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Sparkles className="text-yellow-400" size={20} />
            </div>
            <h3 className="text-lg font-bold">Maestro Insights</h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/10 text-gray-300">Beta</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {insights.map((insight, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="font-bold text-gray-100 mb-2 text-sm">{insight.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {insight.description}
                </p>
                <div className="flex gap-2">
                  {insight.action && (
                    <Button size="sm" className="h-7 text-xs bg-white text-gray-900 hover:bg-gray-200 border-none">
                      {insight.action}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-400 hover:text-white">
                    Ver detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
