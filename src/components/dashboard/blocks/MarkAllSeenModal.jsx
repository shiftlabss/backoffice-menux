import React from 'react';
import { ConfirmModal } from '../../ui/ConfirmModal';
import { CheckCircle2 } from 'lucide-react';

export function MarkAllSeenModal({ isOpen, onClose, onConfirm }) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Marcar todas como vistas?"
      message="Isso removerá os alertas visuais e zerará o contador, mas as pendências continuarão existindo até serem resolvidas. Tem certeza?"
      confirmText="Sim, marcar como vistas"
      cancelText="Cancelar"
      variant="warning" // Using warning to differentiate from destructive actions
    />
  );
}
