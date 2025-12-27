import React, { useState, useEffect } from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Button';
import { Label } from '../../ui/Label';
import { Input } from '../../ui/Input';
import { Plus, Trash2, Layers, Clock, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function EditComboDrawer({ isOpen, onClose, combo, onSave, products = [] }) {
  const isEditing = !!combo?.id;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    items: [], // { productId, quantity }
    price: '',
    status: 'Paused',
    rules: { timing: 'All', context: [] }
  });

  useEffect(() => {
    if (combo) {
      setFormData({
        name: combo.name || '',
        description: combo.description || '',
        items: combo.item_details || [], // Looking for strutured item data
        price: combo.price || '',
        status: combo.status || 'Paused',
        rules: combo.rules || { timing: 'All', context: [] }
      });
    } else {
      // Reset for new
      setFormData({
        name: '', description: '', items: [], price: '', status: 'Paused', rules: { timing: 'All', context: [] }
      });
    }
  }, [combo, isOpen]);

  const handleSave = () => {
    if (!formData.name) return toast.error("Nome do combo é obrigatório");
    // if (formData.items.length < 2) return toast.error("Adicione pelo menos 2 itens");

    onSave({ ...formData, id: combo?.id });
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Editar: ${combo.name}` : "Novo Combo"}
      size="lg"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-8 overflow-y-auto px-1 py-2">

          {/* 1. Basic Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">1. Definições Básicas</h4>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Nome do Combo</Label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Combo Família Feliz"
                />
              </div>
            </div>
          </div>

          {/* 2. Items - Mock Implementation */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="text-sm font-bold text-slate-900">2. Itens do Combo</h4>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <Plus size={14} className="mr-1" /> Adicionar Item
              </Button>
            </div>

            {formData.items.length === 0 ? (
              <div className="text-center p-6 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-slate-400 text-sm">
                Nenhum item adicionado.
              </div>
            ) : (
              <div className="space-y-2">
                {formData.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between p-3 bg-white border border-slate-200 rounded shadow-sm">
                    <span>{item.name}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-400">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Rules */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">3. Regras de Exibição</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Turno</Label>
                <select className="w-full border border-slate-300 rounded-md p-2 text-sm">
                  <option>Todos os turnos</option>
                  <option>Almoço (11h-15h)</option>
                  <option>Jantar (18h-23h)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Contexto</Label>
                <select className="w-full border border-slate-300 rounded-md p-2 text-sm">
                  <option>Geral</option>
                  <option>Para Compartilhar</option>
                  <option>Individual</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Preview */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Preview no Cardápio</div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900">{formData.name || 'Nome do Combo'}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {formData.items.length > 0 ? formData.items.map(i => i.name).join(' + ') : 'Item 1 + Item 2...'}
                </div>
              </div>
              <div className="font-bold text-slate-900">R$ {formData.price || '0,00'}</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-auto">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button className="bg-slate-900 text-white hover:bg-slate-800" onClick={handleSave}>
            {isEditing ? 'Salvar Alterações' : 'Criar Combo'}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
