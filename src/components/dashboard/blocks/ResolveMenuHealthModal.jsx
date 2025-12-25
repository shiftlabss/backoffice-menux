
import React, { useState, useEffect } from 'react';
import { Drawer } from '../../ui/Drawer';
import { Button } from '../../ui/Form';
import { Badge } from '../../ui/Badge';
import { useAudit } from '../../../hooks/useAudit';
import toast from 'react-hot-toast';
import {
  ImageOff,
  FileText,
  Tag,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Upload,
  Wand2,
  Plus,
  Check,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../../lib/utils';

// --- MOCK DATA ---
const MOCK_ISSUES = {
  itemsWithoutPhoto: [
    { id: 101, name: 'X-Burger Clássico', category: 'Burgers', issue: 'missing_photo' },
    { id: 102, name: 'Coca Cola Lata', category: 'Bebidas', issue: 'missing_photo' },
    { id: 103, name: 'Porção de Fritas', category: 'Acompanhamentos', issue: 'missing_photo' },
    { id: 104, name: 'Pudim de Leite', category: 'Sobremesas', issue: 'missing_photo' },
    { id: 105, name: 'Suco de Laranja', category: 'Bebidas', issue: 'missing_photo' },
    { id: 106, name: 'Combo Casal', category: 'Combos', issue: 'missing_photo' },
    { id: 107, name: 'X-Salada', category: 'Burgers', issue: 'missing_photo' },
    { id: 108, name: 'Água s/ Gás', category: 'Bebidas', issue: 'missing_photo' },
    { id: 109, name: 'Água c/ Gás', category: 'Bebidas', issue: 'missing_photo' },
    { id: 110, name: 'Brownie', category: 'Sobremesas', issue: 'missing_photo' },
    { id: 111, name: 'Cerveja Long Neck', category: 'Bebidas', issue: 'missing_photo' },
    { id: 112, name: 'Adicional Bacon', category: 'Adicionais', issue: 'missing_photo' },
  ],
  shortDescription: [
    { id: 201, name: 'X-Bacon', category: 'Burgers', issue: 'short_description', desc: 'Pão, carne e bacon.' },
    { id: 202, name: 'Mousse de Chocolate', category: 'Sobremesas', issue: 'short_description', desc: 'Mousse caseiro.' },
    { id: 203, name: 'Isca de Frango', category: 'Porções', issue: 'short_description', desc: 'Frango empanado.' },
    { id: 204, name: 'Pastel de Carne', category: 'Entradas', issue: 'short_description', desc: 'Carne moida.' },
    { id: 205, name: 'Salada Simples', category: 'Saladas', issue: 'short_description', desc: 'Alface e tomate.' },
    { id: 206, name: 'Brigadeiro', category: 'Sobremesas', issue: 'short_description', desc: 'Chocolate.' },
    { id: 207, name: 'Refrigerante 2L', category: 'Bebidas', issue: 'short_description', desc: 'Coca ou Guaraná.' },
    { id: 208, name: 'Molho Especial', category: 'Adicionais', issue: 'short_description', desc: 'Da casa.' },
  ],
  noTags: [] // Healthy state example
};

export function ResolveMenuHealthModal({ isOpen, onClose }) {
  const { log } = useAudit();

  // State
  const [issues, setIssues] = useState(MOCK_ISSUES);
  const [expandedGroups, setExpandedGroups] = useState({
    itemsWithoutPhoto: true,
    shortDescription: false,
    noTags: false
  });
  const [totalInitial, setTotalInitial] = useState(0);

  // Edit States
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [uploadingId, setUploadingId] = useState(null);

  // Initialize counts
  useEffect(() => {
    if (isOpen) {
      // Check if we need to reset mock data or if it persists (persisting for demo flow)
      // For now, let's recalculate total
      const total = Object.values(MOCK_ISSUES).reduce((acc, list) => acc + list.length, 0);
      setTotalInitial(total);
    }
  }, [isOpen]);

  const getCurrentTotal = () => Object.values(issues).reduce((acc, list) => acc + list.length, 0);
  const currentTotal = getCurrentTotal();
  const resolvedCount = totalInitial - currentTotal;
  const progress = totalInitial > 0 ? (resolvedCount / totalInitial) * 100 : 100;

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // --- ACTIONS ---

  const handleUploadPhoto = (item) => {
    setUploadingId(item.id);
    // Simulate upload delay
    setTimeout(() => {
      setIssues(prev => ({
        ...prev,
        itemsWithoutPhoto: prev.itemsWithoutPhoto.filter(i => i.id !== item.id)
      }));
      log('menu.health.fix.photo', { itemId: item.id, itemName: item.name });
      toast.success(`${item.name}: Foto adicionada!`);
      setUploadingId(null);
    }, 1500);
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditValue(item.desc);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue('');
  };

  const saveDescription = (item) => {
    if (editValue.length < 20) {
      toast.error("Descrição ainda muito curta. Tente detalhar mais.");
      return;
    }

    setIssues(prev => ({
      ...prev,
      shortDescription: prev.shortDescription.filter(i => i.id !== item.id)
    }));

    log('menu.health.fix.description', { itemId: item.id, itemName: item.name, newDesc: editValue });
    toast.success(`${item.name}: Descrição atualizada!`);
    setEditingId(null);
  };

  // --- RENDER HELPERS ---

  const GroupHeader = ({ id, icon: Icon, title, count, description, colorClass }) => (
    <div
      className={cn("flex flex-col p-4 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100", expandedGroups[id] && "bg-slate-50")}
      onClick={() => toggleGroup(id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", colorClass)}>
            <Icon size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <span className="text-xs text-slate-500">{description}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {count === 0 ? (
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
              <CheckCircle2 size={12} /> OK
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-white border shadow-sm text-slate-700">
              {count} pendentes
            </Badge>
          )}
          {expandedGroups[id] ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </div>
      </div>
    </div>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Resolver Pendências do Cardápio"
      size="lg"
      className="md:max-w-xl"
    >
      <div className="flex flex-col h-full">
        {/* Progress Header */}
        <div className="px-6 pb-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <p className="text-sm text-slate-600 mb-2">Corrija problemas que afetam a conversão do seu cardápio.</p>
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-700">{currentTotal} problemas restantes</span>
            <span className="text-emerald-600">{Math.round(progress)}% resolvido</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* GROUP 1: PHOTOS */}
          <div className="border-b border-slate-100">
            <GroupHeader
              id="itemsWithoutPhoto"
              title="Itens sem foto"
              count={issues.itemsWithoutPhoto.length}
              description="Itens com foto vendem até 2x mais."
              icon={ImageOff}
              colorClass="bg-red-50 text-red-600"
            />

            {expandedGroups.itemsWithoutPhoto && issues.itemsWithoutPhoto.length > 0 && (
              <div className="bg-slate-50/50 p-4 space-y-3">
                {issues.itemsWithoutPhoto.map(item => (
                  <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300">
                        {uploadingId === item.id ? (
                          <div className="w-4 h-4 border-2 border-slate-300 border-t-purple-600 rounded-full animate-spin" />
                        ) : (
                          <ImageOff size={16} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUploadPhoto(item)}
                      disabled={uploadingId === item.id}
                      className="text-xs h-8 gap-2 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200"
                    >
                      <Upload size={14} />
                      {uploadingId === item.id ? 'Enviando...' : 'Adicionar Foto'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {expandedGroups.itemsWithoutPhoto && issues.itemsWithoutPhoto.length === 0 && (
              <div className="p-8 text-center bg-slate-50/30">
                <CheckCircle2 size={32} className="mx-auto text-emerald-400 mb-2" />
                <p className="text-slate-600 font-medium">Tudo certo! Todas as fotos foram adicionadas.</p>
              </div>
            )}
          </div>

          {/* GROUP 2: DESCRIPTION */}
          <div className="border-b border-slate-100">
            <GroupHeader
              id="shortDescription"
              title="Descrição curta"
              count={issues.shortDescription.length}
              description="Descrições detalhadas aumentam a confiança."
              icon={FileText}
              colorClass="bg-orange-50 text-orange-600"
            />

            {expandedGroups.shortDescription && issues.shortDescription.length > 0 && (
              <div className="bg-slate-50/50 p-4 space-y-3">
                {issues.shortDescription.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                      {editingId !== item.id && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditing(item)}
                          className="h-7 text-xs text-blue-600 hover:bg-blue-50"
                        >
                          Editar
                        </Button>
                      )}
                    </div>

                    {editingId === item.id ? (
                      <div className="space-y-3">
                        <div className="relative">
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full text-sm p-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none min-h-[80px]"
                            placeholder="Descreva os ingredientes, modo de preparo e diferenciais..."
                            autoFocus
                          />
                          <div className="absolute bottom-2 right-2 text-[10px] text-slate-400">
                            {editValue.length} chars
                          </div>
                        </div>
                        <div className="flex items-center gap-2 justify-between">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-purple-600" title="Gerar com IA">
                              <Wand2 size={12} className="mr-1" /> Melhorar com IA
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={cancelEditing} className="h-8 text-xs">Cancelar</Button>
                            <Button size="sm" onClick={() => saveDescription(item)} className="h-8 text-xs bg-slate-900 text-white">Salvar</Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-2 rounded text-xs text-slate-600 border border-slate-100">
                        {item.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {expandedGroups.shortDescription && issues.shortDescription.length === 0 && (
              <div className="p-8 text-center bg-slate-50/30">
                <CheckCircle2 size={32} className="mx-auto text-emerald-400 mb-2" />
                <p className="text-slate-600 font-medium">As descrições estão ótimas!</p>
              </div>
            )}
          </div>

          {/* GROUP 3: TAGS */}
          <div className="border-b border-slate-100">
            <GroupHeader
              id="noTags"
              title="Sem tags"
              count={issues.noTags.length}
              description="Tags ajudam na busca e filtros."
              icon={Tag}
              colorClass="bg-gray-100 text-gray-600"
            />
            {expandedGroups.noTags && (
              <div className="p-8 text-center bg-slate-50/30">
                <CheckCircle2 size={32} className="mx-auto text-emerald-400 mb-2" />
                <p className="text-slate-600 font-medium">Parabéns! Nenhum item sem tags.</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={onClose}>
            {currentTotal === 0 ? 'Fechar' : 'Resolver depois'}
          </Button>
          {currentTotal === 0 && (
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onClose}>
              Concluir
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
}
