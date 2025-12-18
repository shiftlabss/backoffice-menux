import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button, Input } from '../../components/ui/Form';
import { Search, Plus, ArrowRight, Scaling, Save } from 'lucide-react';

export default function UpsellSize() {
  const [items] = useState([
    { id: 1, name: 'Batata Frita', hasSizeRule: true, sizes: ['P', 'M', 'G'], prices: [12, 16, 20] },
    { id: 2, name: 'Refrigerante', hasSizeRule: true, sizes: ['300ml', '500ml', '700ml'], prices: [6, 9, 12] },
    { id: 3, name: 'Milkshake', hasSizeRule: false, sizes: ['P', 'M'], prices: [15, 20] },
    { id: 4, name: 'Suco Natural', hasSizeRule: false, sizes: ['300ml', '500ml'], prices: [10, 14] },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Intro / Header */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
            <Scaling size={20} />
            Upsell de Tamanho
          </h3>
          <p className="text-sm text-blue-700 mt-1 max-w-2xl">
            Configure automaticamente sugestões para o cliente levar o tamanho maior por uma pequena diferença de valor.
            Ex: &quot;Por apenas +R$ 4,00, leve a Batata Grande!&quot;
          </p>
        </div>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap">
          Configurar em Massa
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Item List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="Buscar item..." className="pl-10 h-10" />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {items.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${item.hasSizeRule ? 'bg-white border-green-200 hover:border-green-400' : 'bg-gray-50 border-gray-100 hover:border-gray-300'
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.sizes.join(' → ')}
                    </p>
                  </div>
                  {item.hasSizeRule && (
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 ring-4 ring-green-100"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Configuration Panel */}
        <div className="lg:col-span-2">
          <Card className="h-full border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Configuração: Batata Frita</h3>
            </div>

            <div className="p-8 space-y-8">

              {/* Flow Visualization */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {/* Size P */}
                <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl border border-gray-200 w-32">
                  <span className="text-2xl font-bold text-gray-400">P</span>
                  <span className="text-sm font-medium text-gray-600 mt-1">R$ 12,00</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <ArrowRight className="text-gray-300" />
                  <span className="text-xs font-bold text-green-600">+ R$ 4,00</span>
                </div>

                {/* Size M */}
                <div className="flex flex-col items-center bg-white p-4 rounded-xl border-2 border-indigo-500 shadow-md w-32 relative">
                  <div className="absolute -top-3 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Sugestão</div>
                  <span className="text-3xl font-bold text-indigo-700">M</span>
                  <span className="text-sm font-medium text-gray-900 mt-1">R$ 16,00</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <ArrowRight className="text-gray-300" />
                  <span className="text-xs font-bold text-green-600">+ R$ 4,00</span>
                </div>

                {/* Size G */}
                <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl border border-gray-200 w-32">
                  <span className="text-2xl font-bold text-gray-400">G</span>
                  <span className="text-sm font-medium text-gray-600 mt-1">R$ 20,00</span>
                </div>
              </div>

              {/* Settings Form */}
              <div className="space-y-4 max-w-lg mx-auto bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Regras de Sugestão</h4>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ativar sugestão P → M</span>
                  <input type="checkbox" className="toggle toggle-primary h-5 w-9" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ativar sugestão M → G</span>
                  <input type="checkbox" className="toggle toggle-primary h-5 w-9" defaultChecked />
                </div>

                <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Mensagem de cabeçalho</label>
                    <Input defaultValue="Turbine sua batata!" className="h-9 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Texto do botão</label>
                    <Input defaultValue="Quero Maior (+R$ 4,00)" className="h-9 text-sm" />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="flex justify-center pt-4">
                <div className="bg-black text-white p-4 rounded-2xl w-[300px] shadow-2xl">
                  <div className="text-center mb-4">
                    <h5 className="font-bold text-lg">Turbine sua batata!</h5>
                    <p className="text-xs text-gray-400">Muitos clientes preferem o tamanho M.</p>
                  </div>
                  <div className="bg-[#1e1e1e] p-3 rounded-lg flex justify-between items-center mb-3 border border-indigo-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl">M</div>
                      <div className="text-left">
                        <div className="font-bold text-sm">Batata M</div>
                        <div className="text-xs text-green-400">+ R$ 4,00</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-500 bg-indigo-500"></div>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10 rounded-full text-sm">
                    Atualizar Pedido
                  </Button>
                  <button className="w-full text-center text-xs text-gray-500 mt-3 hover:text-white">
                    Manter tamanho pequeno
                  </button>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <Button variant="ghost">Cancelar</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                <Save size={18} /> Salvar Regra
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
