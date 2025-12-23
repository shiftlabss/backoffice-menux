import React, { useState, useEffect } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Form';
import { Checkbox } from '../../ui/Checkbox'; // Assuming Checkbox exists or using native input
import { Badge } from '../../ui/Badge';
import {
  Zap,
  TrendingUp,
  Check,
  Loader2,
  Clock,
  AlertTriangle,
  Eye,
  Edit2
} from 'lucide-react';
import { cn, formatCurrency } from '../../../lib/utils';
import toast from 'react-hot-toast';

// --- SUB-COMPONENTS ---

function SuggestionItem({ item, isSelected, onToggle, status, isCompact = false }) {
  const isPending = status === 'pending';
  const isApplying = status === 'applying';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className={cn(
      "group flex items-start gap-3 p-3 rounded-xl border transition-all duration-200",
      isSelected ? "bg-slate-50 border-slate-200" : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100",
      (isSuccess || isApplying) && "bg-emerald-50/30 border-emerald-100"
    )}>
      {/* Checkbox / Status Icon */}
      <div className="pt-1">
        {isApplying ? (
          <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
        ) : isSuccess ? (
          <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
        ) : isError ? (
          <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-3 h-3 text-red-500" />
          </div>
        ) : (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(item.id)}
            className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
            disabled={!isPending}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className={cn(
            "text-sm font-bold leading-tight transition-colors",
            isSelected ? "text-slate-900" : "text-slate-500",
            isSuccess && "text-emerald-800"
          )}>
            {item.title}
          </h4>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
            <button className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700" title="Ver evidência">
              <Eye size={14} />
            </button>
            <button className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700" title="Editar ajustes">
              <Edit2 size={14} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          {/* Impact Badge */}
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
            <TrendingUp size={10} />
            {item.impact}
          </div>

          {/* Confidence Badge */}
          <span className={cn(
            "text-[10px] font-medium px-1.5 py-0.5 rounded border",
            item.confidence >= 90
              ? "bg-blue-50 text-blue-700 border-blue-100"
              : "bg-amber-50 text-amber-700 border-amber-100"
          )}>
            {item.confidence}% confiança
          </span>

          {/* Effort */}
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
            <Clock size={10} />
            {item.effort}
          </span>
        </div>
      </div>
    </div>
  );
}


export function ApplySuggestionsModal({ isOpen, onClose, suggestions = [] }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [processState, setProcessState] = useState('idle'); // idle, applying, success
  const [itemStatuses, setItemStatuses] = useState({}); // { id: 'pending' | 'applying' | 'success' | 'error' }

  // Initialize selection when modal opens
  useEffect(() => {
    if (isOpen && processState === 'idle') {
      const allIds = suggestions.map(s => s.id);
      setSelectedIds(allIds);
      const initialStatuses = {};
      suggestions.forEach(s => initialStatuses[s.id] = 'pending');
      setItemStatuses(initialStatuses);
    }
  }, [isOpen, suggestions, processState]);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      // Reset state after a delay to allow animation to finish
      const timer = setTimeout(() => {
        setProcessState('idle');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleToggle = (id) => {
    if (processState !== 'idle') return;

    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (processState !== 'idle') return;
    if (e.target.checked) {
      setSelectedIds(suggestions.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleConfirm = async () => {
    if (selectedIds.length === 0) return;

    setProcessState('applying');

    // Execute batch sequentially mock
    for (const id of selectedIds) {
      // 1. Mark as applying
      setItemStatuses(prev => ({ ...prev, [id]: 'applying' }));

      // 2. Wait random delay (simulating network)
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

      // 3. Mark as success
      setItemStatuses(prev => ({ ...prev, [id]: 'success' }));
    }

    // All done
    setProcessState('success');
    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-bold">{selectedIds.length} sugestões aplicadas!</span>
        <span className="text-xs">Impacto projetado de {totalImpact} adicionado.</span>
      </div>,
      { duration: 4000 }
    );

    // Close after brief success State
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  // Derived State
  const selectedCount = selectedIds.length;
  const isAllSelected = suggestions.length > 0 && selectedCount === suggestions.length;

  // Parse currency strings (e.g., "+R$ 450") to numbers for totaling
  const totalImpactValue = suggestions
    .filter(s => selectedIds.includes(s.id))
    .reduce((acc, curr) => {
      const val = parseFloat(curr.impact.replace(/[^\d]/g, ''));
      return acc + val;
    }, 0);

  const totalImpact = `R$ ${totalImpactValue}`; // Simple formatting for mock

  return (
    <Modal
      isOpen={isOpen}
      onClose={processState === 'applying' ? undefined : onClose}
      title="Aplicar sugestões do Maestro"
      className="max-w-xl"
    >
      <div className="space-y-6">

        {/* Header Description */}
        <div className="bg-slate-50 -mx-6 -mt-0 px-6 py-4 border-b border-slate-100">
          <p className="text-sm text-slate-600">
            Você selecionou as sugestões para o recorte <span className="font-bold text-slate-900">Hoje</span>.
            As alterações serão processadas imediatamente.
          </p>
        </div>

        {/* List Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              disabled={processState !== 'idle'}
              className="w-4 h-4 rounded border-slate-300 cursor-pointer disabled:opacity-50"
            />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              {selectedCount} itens selecionados
            </span>
          </div>
        </div>

        {/* Suggestions List */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {suggestions.map(item => (
            <SuggestionItem
              key={item.id}
              item={item}
              isSelected={selectedIds.includes(item.id)}
              status={itemStatuses[item.id]} // pending, applying, success
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* Footer Totals & Actions */}
        <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500">Impacto Estimado Total</span>
            <span className="text-xl font-bold text-emerald-600 tracking-tight">{totalImpact}</span>
          </div>

          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={processState === 'applying'}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              className={cn(
                "flex-[2] text-white transition-all",
                processState === 'success' ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-900 hover:bg-black"
              )}
              onClick={handleConfirm}
              disabled={selectedCount === 0 || processState !== 'idle'}
            >
              {processState === 'applying' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Aplicando...
                </>
              ) : processState === 'success' ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Concluído
                </>
              ) : (
                `Confirmar Aplicação`
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
