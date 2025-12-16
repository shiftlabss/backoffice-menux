import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Plus, UtensilsCrossed, Monitor, Smartphone, ChevronRight } from 'lucide-react';

export default function UpsellCombos() {
  const combos = [
    { id: 1, name: 'Combo Casal', trigger: '2x Hambúrguer', offer: '2x Bebidas + Batata G', discount: 'R$ 15,00 OFF', active: true },
    { id: 2, name: 'Trio Clássico', trigger: 'Qualquer Burger', offer: 'Batata P + Refri', discount: 'Preço fixo R$ 39,90', active: true },
    { id: 3, name: 'Sobremesa Dupla', trigger: '2x Pratos Principais', offer: '2x Petit Gâteau', discount: '15% OFF', active: false },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UtensilsCrossed className="text-orange-500" /> Montador de Combos Inteligentes
          </h2>
          <p className="text-gray-500 text-sm">Crie ofertas que agrupam itens automaticamente quando o cliente seleciona os gatilhos.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
          <Plus size={18} /> Novo Combo
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* List of Combos */}
        <div className="lg:col-span-2 space-y-4">
          {combos.map(combo => (
            <Card key={combo.id} className="p-0 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow cursor-pointer group border border-gray-200">
              <div className={`w-2 md:w-0 md:border-l-4 ${combo.active ? 'bg-orange-500 border-orange-500' : 'bg-gray-300 border-gray-300'}`}></div>
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">{combo.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${combo.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {combo.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 uppercase font-bold block mb-1">Se comprar</span>
                    <span className="text-sm font-medium text-gray-900">{combo.trigger}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-400">
                    <ChevronRight />
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <span className="text-xs text-orange-600 uppercase font-bold block mb-1">Oferecer</span>
                    <span className="text-sm font-medium text-gray-900">{combo.offer}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Benefício:</span>
                  <span className="text-sm font-bold text-green-600">{combo.discount}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Sidebar / Preview / Tips */}
        <div className="space-y-6">
          {/* Preview Card */}
          <Card className="bg-gray-900 text-white border-none p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <UtensilsCrossed size={120} />
            </div>

            <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm">
              <Smartphone size={16} /> Preview Mobile
            </div>

            <div className="space-y-4 relative z-10">
              <div className="text-center">
                <p className="text-orange-400 font-bold text-sm uppercase mb-1">Oportunidade Encontrada!</p>
                <h4 className="text-xl font-bold">Leve o Trio e economize</h4>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span>Batata M</span>
                  <span className="opacity-50 line-through text-xs">R$ 16,00</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Coca-Cola</span>
                  <span className="opacity-50 line-through text-xs">R$ 8,00</span>
                </div>
                <div className="h-px bg-white/20 my-3"></div>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total no Combo</span>
                  <span className="text-green-400">R$ 19,90</span>
                </div>
              </div>

              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold h-12 rounded-full">
                Adicionar Combo
              </Button>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-6 bg-blue-50 border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">Dica Pro</h4>
            <p className="text-sm text-blue-800">
              Combos pré-definidos aumentam a percepção de valor e aceleram a decisão de compra em 30%. Evite dar muitas opções de troca para não gerar paralisia.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
}
