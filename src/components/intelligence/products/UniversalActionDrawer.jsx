import React, { useState } from 'react';
import { Drawer } from '../../ui/Drawer'; // Assuming standard Drawer component exists
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { toast } from 'react-hot-toast';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock,
  ChevronRight,
  FileText
} from 'lucide-react';
import { useAudit } from '../../../hooks/useAudit';

export function UniversalActionDrawer({ isOpen, onClose, opportunity, onApply }) {
  const [step, setStep] = useState('review'); // review | applying | success
  const { log } = useAudit();

  if (!opportunity) return null;

  const handleConfirm = () => {
    setStep('applying');
    // Mock API call
    setTimeout(() => {
      onApply(opportunity);
      setStep('success');
      toast.success("Ação aplicada com sucesso!");
      log('intelligence.action.applied', { id: opportunity.id, title: opportunity.title });
    }, 1500);
  };

  const handleClose = () => {
    setStep('review');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 'success' ? 'Sucesso!' : 'Revisar e Aplicar'}
      size="md"
    >
      <div className="flex flex-col h-full">

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto space-y-6 pt-2">

          {step === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ação Concluída</h3>
              <p className="text-slate-500 max-w-xs mb-8">
                A alteração "{opportunity.title}" foi aplicada e já está ativa no cardápio.
              </p>
              <Button onClick={handleClose} className="w-full max-w-sm">
                Voltar para Inteligência
              </Button>
            </div>
          ) : (
            <>
              {/* Header Context */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-white">{opportunity.entity_type === 'Product' ? 'Produto' : 'Combo'}</Badge>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={12} /> {opportunity.time_estimate}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">{opportunity.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{opportunity.description}</p>
              </div>

              {/* Evidence Block */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-3 flex items-center gap-2">
                  <TrendingUp size={14} className="text-purple-600" />
                  Por que o Maestro sugere isso?
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-3 bg-white border-slate-200">
                    <span className="text-xs text-slate-400 block mb-1">Impacto Projetado</span>
                    <span className="text-lg font-bold text-emerald-600">{opportunity.impact}</span>
                  </Card>
                  <Card className="p-3 bg-white border-slate-200">
                    <span className="text-xs text-slate-400 block mb-1">Confiança IA</span>
                    <span className="text-lg font-bold text-slate-800">{opportunity.confidence}</span>
                  </Card>
                </div>
                <p className="text-xs text-slate-500 mt-3 italic bg-yellow-50 p-2 rounded border border-yellow-100">
                  <span className="font-bold">Evidência:</span> {opportunity.evidence}
                </p>
              </div>

              {/* Diff / Action Preview */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-3 flex items-center gap-2">
                  <FileText size={14} className="text-blue-600" />
                  O que vai mudar?
                </h4>
                <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
                  {/* Before */}
                  <div className="p-3 bg-red-50/30 flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-red-100 text-red-600 flex items-center justify-center shrink-0 text-xs font-bold">-</div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-0.5">Antes</p>
                      <p className="text-sm text-slate-700">{opportunity.diff_before || 'Configuração padrão'}</p>
                    </div>
                  </div>
                  {/* After */}
                  <div className="p-3 bg-emerald-50/30 flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">+</div>
                    <div>
                      <p className="text-xs font-bold text-emerald-700 uppercase mb-0.5">Depois</p>
                      <p className="text-sm text-slate-900 font-medium">{opportunity.diff_after || 'Nova configuração otimizada'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer Actions */}
        {step !== 'success' && (
          <div className="pt-4 mt-4 border-t border-slate-100 flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-[2] bg-slate-900 hover:bg-purple-700 text-white"
              disabled={step === 'applying'}
            >
              {step === 'applying' ? 'Aplicando...' : 'Confirmar e Aplicar'}
            </Button>
          </div>
        )}

      </div>
    </Drawer>
  );
}
