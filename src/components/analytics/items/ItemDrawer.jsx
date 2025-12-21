
import React from 'react';
import { Drawer } from '../../ui/Drawer'; // Assuming Drawer component exists
import { Button } from '../../ui/Button';
import { Camera, ImagePlus, Sparkles } from 'lucide-react';

export function ItemDrawer({ isOpen, onClose, item }) {
  if (!item) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={item.name}
      size="md"
    >
      <div className="space-y-6 pb-20">
        {/* Header / Main Stat */}
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
            <Camera size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{item.revenue}</h2>
            <p className="text-sm text-slate-500">Receita total no período</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded">Alta Performance</span>
              <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded flex items-center gap-1">
                <Sparkles size={10} /> Recomendação IA
              </span>
            </div>
          </div>
        </div>

        {/* Funnel Section Placeholders */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">Funil Específico do Item</h3>
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Impressões</span>
            <div className="flex-1 mx-4 h-px bg-slate-200"></div>
            <span className="font-bold text-slate-900">{item.impressions}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Visualizações</span>
            <div className="flex-1 mx-4 h-px bg-slate-200"></div>
            <span className="font-bold text-slate-900">{item.views}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Add Carrinho</span>
            <div className="flex-1 mx-4 h-px bg-slate-200"></div>
            <span className="font-bold text-slate-900">{item.cartAdds}</span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between">
            <span className="font-bold text-slate-600">Taxa de Conversão</span>
            <span className="font-bold text-emerald-600">{item.conversion}</span>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-purple-600" /> Recomendações do Maestro
          </h3>
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <p className="text-sm text-purple-900 font-medium mb-1">Melhore a foto deste item</p>
            <p className="text-xs text-purple-700 mb-3">Itens com fotos profissionais convertem 25% mais. Detectamos baixa interação com a imagem atual.</p>
            <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700 border-none w-full">
              <ImagePlus size={14} className="mr-2" />
              Agendar Fotoshoot
            </Button>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-slate-200 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>Fechar</Button>
        <Button className="flex-1 bg-slate-900 text-white">Ver Detalhes Completos</Button>
      </div>
    </Drawer>
  );
}
