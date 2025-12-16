import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { UtensilsCrossed, Plus, ArrowRight, Gift } from 'lucide-react';

export default function UpsellCombos() {
  const combos = [
    { id: 1, name: 'Combo Clássico', trigger: 'Hamburguer', items: ['Batata Frita', 'Refrigerante'], discount: 'R$ 49,90 (Save 15%)', active: true },
    { id: 2, name: 'Jantar a Dois', trigger: '2x Pratos Principais', items: ['Vinho', 'Sobremesa'], discount: 'Ganhe a Sobremesa', active: true },
    { id: 3, name: 'Happy Hour', trigger: 'Cerveja', items: ['Porção Batata'], discount: '50% off na Batata', active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Combos Inteligentes</h3>
          <p className="text-sm text-gray-500">Crie ofertas de pacote quando o cliente seleciona um item principal.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus size={16} className="mr-2" /> Novo Combo
        </Button>
      </div>

      <div className="space-y-4">
        {combos.map((combo) => (
          <Card key={combo.id} className="p-0 overflow-hidden flex flex-col md:flex-row border-l-4 border-l-purple-500 hover:shadow-md transition-all">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed size={18} className="text-purple-600" />
                  <h4 className="font-bold text-gray-900 text-lg">{combo.name}</h4>
                  {!combo.active && <Badge variant="secondary">Pausado</Badge>}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-700">
                  {combo.trigger}
                </div>
                <ArrowRight size={16} className="text-gray-400" />
                <div className="flex gap-2">
                  {combo.items.map((it, idx) => (
                    <div key={idx} className="bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg text-sm font-medium text-purple-700 flex items-center gap-2">
                      <Gift size={12} /> {it}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 flex flex-col justify-center items-end border-l border-gray-100 min-w-[200px]">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Oferta</span>
              <span className="text-lg font-bold text-green-600">{combo.discount}</span>
              <div className="flex gap-2 mt-4">
                <Button variant="ghost" size="sm" className="text-gray-500 text-xs">Editar</Button>
                <Button variant="outline" size="sm" className="text-xs h-8">Relatório</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
