import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Scaling, ArrowRight, Plus } from 'lucide-react';

export default function UpsellSize() {
  const sizeRules = [
    { id: 1, product: 'Batata Frita', progression: ['P', 'M', 'G'], delta: ['+ R$ 2,00', '+ R$ 5,00'], status: 'active' },
    { id: 2, product: 'Refrigerante', progression: ['350ml', '500ml'], delta: ['+ R$ 1,50'], status: 'active' },
    { id: 3, product: 'Açaí', progression: ['300ml', '500ml', '700ml'], delta: ['+ R$ 4,00', '+ R$ 8,00'], status: 'paused' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Upsell de Tamanho</h3>
          <p className="text-sm text-gray-500">Configure progressões automáticas para itens com variações de tamanho.</p>
        </div>
        <Button className="bg-white border border-gray-200 text-gray-900 hover:bg-gray-50">
          <Plus size={16} className="mr-2" /> Nova Progressão
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sizeRules.map((rule) => (
          <Card key={rule.id} className="p-6 relative overflow-hidden group hover:border-purple-200 transition-colors">
            {rule.status === 'paused' && (
              <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 rounded-bl-xl text-xs font-bold text-gray-500">PAUSADO</div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Scaling size={20} />
              </div>
              <h4 className="font-bold text-gray-900">{rule.product}</h4>
            </div>

            <div className="flex items-center justify-between gap-2 max-w-full overflow-x-auto pb-2">
              {rule.progression.map((size, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 text-sm bg-white shrink-0">
                    {size}
                  </div>
                  {i < rule.progression.length - 1 && (
                    <div className="w-12 h-0.5 bg-gray-200 relative mx-1">
                      <span className="absolute -top-4 w-full text-center text-[10px] text-green-600 font-bold whitespace-nowrap">
                        {rule.delta[i]}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-500">Conversão média: <strong className="text-green-600">18%</strong></span>
              <Button variant="ghost" size="sm" className="text-purple-600 text-xs">Editar</Button>
            </div>
          </Card>
        ))}

        {/* New Card Placeholder */}
        <button className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center min-h-[180px] hover:border-purple-300 hover:bg-purple-50 transition-all group">
          <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center mb-2">
            <Plus className="text-gray-400 group-hover:text-purple-600" />
          </div>
          <span className="font-bold text-gray-400 group-hover:text-purple-600">Criar Nova Progressão</span>
        </button>
      </div>
    </div>
  );
}
