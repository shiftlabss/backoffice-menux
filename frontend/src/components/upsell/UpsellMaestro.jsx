import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Sparkles, ArrowRight, TrendingUp, AlertTriangle, CheckCircle, BrainCircuit } from 'lucide-react';

export default function UpsellMaestro() {
  const suggestions = [
    {
      id: 1,
      title: 'Combo de Almoço',
      insight: '85% dos clientes que pedem Hambúrguer no almoço também pedem bebida. Crie um combo para aumentar o ticket.',
      impact: '+R$ 450/semana',
      confidence: 'Alta',
      type: 'opportunity'
    },
    {
      id: 2,
      title: 'Sobremesa Oculta',
      insight: 'Seu "Pudim" tem alta conversão (30%) mas poucas visualizações. Sugira após pratos principais.',
      impact: '+15% vendas',
      confidence: 'Média',
      type: 'visibility'
    },
    {
      id: 3,
      title: 'Ajuste de Preço',
      insight: 'A Batata G é apenas R$ 1,00 mais cara que a M. Aumentar a diferença para R$ 3,00 pode melhorar a margem sem perder conversão.',
      impact: 'Margem +12%',
      confidence: 'Alta',
      type: 'pricing'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <BrainCircuit size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Sparkles className="text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold">Maestro Intelligence</h2>
          </div>
          <p className="text-purple-100 text-lg leading-relaxed mb-8">
            Analisei seus dados de vendas das últimas 4 semanas. Encontrei 3 oportunidades de upsell que podem gerar
            <strong className="text-white"> R$ 1.800 extras</strong> este mês.
          </p>
          <Button className="bg-white text-purple-900 hover:bg-gray-100 border-none font-bold">
            Aplicar Todas as Sugestões
          </Button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mt-8">
        <Sparkles size={18} className="text-purple-600" />
        Oportunidades Identificadas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="p-6 flex flex-col justify-between hover:border-purple-300 transition-all group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100">
                  {suggestion.confidence === 'Alta' ? <TrendingUp size={12} className="mr-1" /> : <AlertTriangle size={12} className="mr-1" />}
                  Confiança {suggestion.confidence}
                </Badge>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {suggestion.impact}
                </span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">{suggestion.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {suggestion.insight}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex gap-2">
              <Button className="flex-1 bg-gray-900 text-white hover:bg-black text-xs">
                Criar Regra
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-red-500">
                Ignorar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
