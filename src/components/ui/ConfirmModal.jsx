import React from 'react';
import { Modal } from './Modal';
import { Button } from './Form';
import { AlertTriangle, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Reusable confirmation modal to replace window.confirm()
 */
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Ação",
  message = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger", // danger, warning, success
  loading = false
}) {
  const variants = {
    danger: {
      icon: Trash2,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      buttonClass: "bg-red-600 hover:bg-red-700 text-white"
    },
    warning: {
      icon: AlertTriangle,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      buttonClass: "bg-yellow-600 hover:bg-yellow-700 text-white"
    },
    success: {
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      buttonClass: "bg-green-600 hover:bg-green-700 text-white"
    }
  };

  const v = variants[variant] || variants.danger;
  const Icon = v.icon;

  const handleConfirm = () => {
    onConfirm();
    if (!loading) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="max-w-md">
      <div className="text-center">
        <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", v.iconBg)}>
          <Icon className={cn("w-8 h-8", v.iconColor)} />
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border-gray-200"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className={cn("flex-1", v.buttonClass)}
          >
            {loading ? "Processando..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/**
 * Hook to manage confirmation modal state
 */
export function useConfirmModal() {
  const [state, setState] = React.useState({
    isOpen: false,
    title: "",
    message: "",
    variant: "danger",
    onConfirm: () => { }
  });

  const confirm = ({ title, message, variant = "danger" }) => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        title,
        message,
        variant,
        onConfirm: () => {
          resolve(true);
          setState(prev => ({ ...prev, isOpen: false }));
        }
      });
    });
  };

  const close = () => {
    setState(prev => ({ ...prev, isOpen: false }));
  };

  const ConfirmModalComponent = () => (
    <ConfirmModal
      isOpen={state.isOpen}
      onClose={close}
      onConfirm={state.onConfirm}
      title={state.title}
      message={state.message}
      variant={state.variant}
    />
  );

  return { confirm, close, ConfirmModalComponent };
}
