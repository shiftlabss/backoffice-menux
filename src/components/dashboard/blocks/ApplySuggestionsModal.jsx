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

function SuggestionItem({ item, isSelected, onToggle, status, onApplySingle, onViewEvidence, isCompact = false }) {
  const isPending = status === 'pending' || !status;
  const isApplying = status === 'applying';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className={cn(
      "group relative flex flex-col p-4 rounded-xl border transition-all duration-200",
      isSelected ? "bg-white border-slate-300 shadow-sm" : "bg-white border-slate-100",
      (isSuccess) && "bg-emerald-50/10 border-emerald-100",
      isError && "bg-red-50/30 border-red-100"
    )}>
      {/* Row 1: Header (Checkbox + Title + Status) */}
      <div className="flex items-start gap-3 mb-2">
        <div className="pt-0.5">
          {isApplying ? (
            <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
          ) : isSuccess ? (
            <div className="w-4 h-4 bg-emerald-500 rounded text-white flex items-center justify-center">
              <Check size={12} strokeWidth={3} />
            </div>
          ) : (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => !isSuccess && onToggle(item.id)}
              className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer disabled:opacity-50"
              disabled={!isPending && !isError}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h4 className={cn(
              "text-sm font-semibold text-slate-900 leading-snug",
              isSuccess && "text-emerald-900"
            )}>
              {item.title}
            </h4>

            {/* Status Chip */}
            {isSuccess && (
              <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                <Check size={10} strokeWidth={3} /> Aplicada
              </span>
            )}
            {isError && (
              <span className="shrink-0 text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Falhou
              </span>
            )}
            {/* "Em aprovação" mock state could go here */}
          </div>
        </div>
      </div>

      {/* Row 2: Context Chips */}
      <div className="pl-7 mb-4 flex flex-wrap items-center gap-2">
        {/* Impact Badge */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
          <TrendingUp size={12} />
          {item.impact}
        </div>

        {/* Confidence Badge */}
        <span className={cn(
          "text-[11px] font-medium px-2 py-1 rounded border",
          item.confidence >= 90
            ? "bg-slate-50 text-slate-600 border-slate-200"
            : "bg-amber-50 text-amber-700 border-amber-100"
        )}>
          {item.confidence}% confiança
        </span>
      </div>

      {/* Row 3: Actions Footer */}
      <div className="pl-7 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
        {/* Secondary Action: Ver evidência */}
        <button
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-medium transition-colors"
          onClick={onViewEvidence}
        >
          <Eye size={14} />
          Ver evidência
        </button>

        {/* Primary Action: CTA */}
        {!isSuccess && (
          <Button
            size="sm"
            variant={isError ? "destructive" : "default"}
            className={cn(
              "h-8 text-xs font-bold px-4 shadow-sm transition-all",
              isApplying && "opacity-80"
            )}
            onClick={() => onApplySingle(item.id)}
            disabled={isApplying}
          >
            {isApplying ? (
              <>
                <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                Aplicando...
              </>
            ) : isError ? (
              "Tentar novamente"
            ) : (
              "Aplicar agora"
            )}
          </Button>
        )}

        {isSuccess && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
          >
            Ver regra
          </Button>
        )}
      </div>
    </div>
  );
}


// ... imports
import { SuggestionEvidenceDrawer } from './SuggestionEvidenceDrawer';

// ... SuggestionItem component (ensure it uses onToggle, onApplySingle, and now onViewEvidence)

// ... ApplySuggestionsModal component
export function ApplySuggestionsModal({ isOpen, onClose, suggestions = [] }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [processState, setProcessState] = useState('idle'); // idle, applying, success
  const [itemStatuses, setItemStatuses] = useState({}); // { id: 'pending' | 'applying' | 'success' | 'error' }
  const [activeEvidenceItem, setActiveEvidenceItem] = useState(null); // [NEW] for drawer

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

  // [NEW] Evidence Handlers
  const handleViewEvidence = (item) => {
    setActiveEvidenceItem(item);
  };

  const handleCloseEvidence = () => {
    setActiveEvidenceItem(null);
  };

  const handleApplyFromEvidence = async (id) => {
    await handleApplySingle(id);
  };

  // Individual Apply Logic
  const handleApplySingle = async (id) => {
    // Prevent double clicks if already working on this item
    if (itemStatuses[id] === 'applying' || itemStatuses[id] === 'success') return;

    // Set state
    setItemStatuses(prev => ({ ...prev, [id]: 'applying' }));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      setItemStatuses(prev => ({ ...prev, [id]: 'success' }));

      // Remove from selection if checkboxes are used for "Pending Batch"
      setSelectedIds(prev => prev.filter(i => i !== id));

      toast.success("Sugestão aplicada com sucesso!");
    } catch (error) {
      setItemStatuses(prev => ({ ...prev, [id]: 'error' }));
      toast.error("Falha ao aplicar sugestão.");
    }
  };

  const handleConfirm = async () => {
    // Filter only pending items selected
    const pendingIds = selectedIds.filter(id => itemStatuses[id] !== 'success' && itemStatuses[id] !== 'applying');

    if (pendingIds.length === 0) {
      toast("Nenhuma sugestão pendente selecionada.", { icon: 'ℹ️' });
      return;
    }

    setProcessState('applying');

    // Execute batch sequentially mock
    for (const id of pendingIds) {
      setItemStatuses(prev => ({ ...prev, [id]: 'applying' }));
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
      setItemStatuses(prev => ({ ...prev, [id]: 'success' }));
    }

    setProcessState('success');

    // Calculate total impact of THIS batch
    const batchImpactValue = suggestions
      .filter(s => pendingIds.includes(s.id))
      .reduce((acc, curr) => acc + parseFloat(curr.impact.replace(/[^\d]/g, '')), 0);

    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-bold">{pendingIds.length} sugestões aplicadas!</span>
        <span className="text-xs">Impacto projetado de R$ {batchImpactValue} confirmado.</span>
      </div>,
      { duration: 4000 }
    );

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  // Derived State
  const selectedCount = selectedIds.length;
  const isAllSelected = suggestions.length > 0 && selectedCount === suggestions.length;

  const totalImpactValue = suggestions
    .filter(s => selectedIds.includes(s.id))
    .reduce((acc, curr) => {
      const val = parseFloat(curr.impact.replace(/[^\d]/g, ''));
      return acc + val;
    }, 0);

  const totalImpact = `R$ ${totalImpactValue}`;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={processState === 'applying' ? undefined : onClose}
        title="Aplicar sugestões do Maestro"
        className="max-w-xl z-50" // Ensure explicit Z
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
                onApplySingle={handleApplySingle}
                onViewEvidence={() => handleViewEvidence(item)} // Pass handler
              />
            ))}
          </div>

          {/* Footer Totals & Actions */}
          <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-500">Impacto Estimado Total</span>
              <div className="text-right">
                <span className="text-xl font-bold text-emerald-600 tracking-tight">{totalImpact}</span>
                {Object.values(itemStatuses).some(s => s === 'success') && (
                  <p className="text-[10px] text-emerald-600/70 font-medium">
                    Algumas sugestões já foram aplicadas
                  </p>
                )}
              </div>
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

      {/* Evidence Drawer */}
      <SuggestionEvidenceDrawer
        isOpen={!!activeEvidenceItem}
        onClose={handleCloseEvidence}
        suggestion={activeEvidenceItem ? {
          ...activeEvidenceItem,
          isApplied: itemStatuses[activeEvidenceItem.id] === 'success'
        } : null}
        onApply={handleApplyFromEvidence}
      />
    </>
  );
}
