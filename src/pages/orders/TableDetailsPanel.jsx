import React, { useState } from 'react';
import { Clock, Info, Utensils, AlertTriangle, CheckCircle, FileText, RotateCcw, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Modal } from '../../components/ui/Modal';
import { Button, Input, Label, Select } from '../../components/ui/Form';
import { useAudit } from '../../hooks/useAudit';
import toast from 'react-hot-toast';

export default function TableDetailsPanel({ table, onUpdateTableStatus }) {
  const { log } = useAudit();

  // Local state for Modals only
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isReopenModalOpen, setIsReopenModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reopen Reason State
  const [reopenReason, setReopenReason] = useState('more_items');

  if (!table) return null;
  const orders = table.orders || [];

  // Helper to check status (safe access)
  const isClosing = table.status === 'closing' || table.status === 'closed';

  // Group items by category (Mock categorization based on names)
  const groupedItems = {
    drinks: [],
    starters: [],
    mains: [],
    desserts: []
  };

  orders.forEach(order => {
    order.items?.forEach(item => {
      const name = item.name.toLowerCase();
      const itemWithStatus = { ...item, orderStatus: order.status, orderTime: order.created_at };

      if (name.includes('coca') || name.includes('suco') || name.includes('água') || name.includes('vinho') || name.includes('cerveja') || name.includes('drink')) {
        groupedItems.drinks.push(itemWithStatus);
      } else if (name.includes('entrada') || name.includes('batata') || name.includes('salada')) {
        groupedItems.starters.push(itemWithStatus);
      } else if (name.includes('sobremesa') || name.includes('gâteau') || name.includes('pudim') || name.includes('café')) {
        groupedItems.desserts.push(itemWithStatus);
      } else {
        groupedItems.mains.push(itemWithStatus);
      }
    });
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'preparing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ready': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'delivered': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const statusTranslations = {
    pending: 'Pendente',
    preparing: 'Preparando',
    ready: 'Pronto',
    delivered: 'Entregue',
    cancelled: 'Cancelado'
  };

  const handleCloseBill = async () => {
    try {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      log('table.close_requested', {
        tableId: table.id,
        tableName: table.name,
        totalValue: table.totalValue,
      }, `Solicitado fechamento da Mesa ${table.name}`);

      // Call parent handler to persist status
      onUpdateTableStatus(table.id, 'closing');

      toast.success('Conta solicitada. Mesa agora está "Encerrando".');
      setIsCloseModalOpen(false);
    } catch (error) {
      toast.error('Erro ao encerrar conta');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReopenBill = async () => {
    try {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      log('table.reopened', {
        tableId: table.id,
        tableName: table.name,
        reason: reopenReason,
      }, `Mesa ${table.name} reaberta por: ${reopenReason}`);

      // Call parent handler to revert status
      onUpdateTableStatus(table.id, 'occupied');

      toast.success('Conta reaberta. Mesa voltou para "Ocupada".');
      setIsReopenModalOpen(false);
    } catch (error) {
      toast.error('Erro ao reabrir conta');
    } finally {
      setIsProcessing(false);
    }
  };

  const ItemGroup = ({ title, items }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4 last:mb-0">
        <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">{title}</h5>
        <div className="space-y-1">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1 hover:bg-gray-50 rounded px-1 -mx-1 transition-colors">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-500 w-4">{item.quantity}x</span>
                <span className="text-gray-900 font-medium">{item.name}</span>
                {item.observation && (
                  <span className="text-gray-400 text-[10px] italic truncate max-w-[100px]">- {item.observation}</span>
                )}
              </div>
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full lowercase", getStatusColor(item.orderStatus))}>
                {statusTranslations[item.orderStatus] || item.orderStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* 1. Header Operacional Único */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 text-gray-500 rounded-lg border border-gray-100">
            <Utensils size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Detalhes Operacionais - {table.name}
              </h4>
              {isClosing && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase">
                  Encerrando
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {orders.length > 0 ? `Último: ${formatDistanceToNow(new Date(orders[0].created_at), { locale: ptBR })} ` : 'Sem pedidos'}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{orders.length} pedidos</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Total & Status */}
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 font-medium uppercase">Total Parcial</span>
            <span className="text-lg font-bold text-gray-900">R$ {table.totalValue?.toFixed(2)}</span>
          </div>

          {/* Action */}
          <div className="pl-4 border-l border-gray-100">
            {isClosing ? (
              <button
                onClick={() => setIsReopenModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors shadow-sm active:scale-95"
              >
                <RotateCcw size={14} />
                Reabrir conta
              </button>
            ) : (
              <button
                onClick={() => setIsCloseModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm active:scale-95"
              >
                <CheckCircle size={14} />
                Fechar a conta
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* 3. Itens na mesa (Primary Content) */}
        <div className="flex-1 p-6 border-r border-gray-100 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-gray-400" />
            <h4 className="text-xs font-bold text-gray-700 uppercase">Itens na Mesa</h4>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200 text-gray-400 text-xs">
              Mesa livre, sem itens no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              <ItemGroup title="Bebidas" items={groupedItems.drinks} />
              <ItemGroup title="Entradas" items={groupedItems.starters} />
              <ItemGroup title="Principais" items={groupedItems.mains} />
              <ItemGroup title="Sobremesas" items={groupedItems.desserts} />
            </div>
          )}
        </div>

        {/* 4. Timeline (Secondary Side Panel) */}
        <div className="w-full md:w-80 p-6 bg-gray-50/50">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-gray-400" />
            <h4 className="text-xs font-bold text-gray-700 uppercase">Histórico de Pedidos</h4>
          </div>

          <div className="space-y-3 relative pl-4 border-l border-gray-200 ml-1.5">
            {orders.map((order) => (
              <div key={order.id} className="relative group">
                <div className={`absolute - left - [22px] top - 1.5 w - 2.5 h - 2.5 rounded - full border - 2 border - white transition - colors ${order.status === 'pending' ? 'bg-amber-400' : 'bg-green-400'} `} />

                <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-gray-900">#{order.id}</span>
                    <span className="text-[10px] text-gray-500">{formatDistanceToNow(new Date(order.created_at), { locale: ptBR, addSuffix: true })}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className={cn("text-[10px] lowercase",
                      order.status === 'preparing' ? 'text-blue-600' : 'text-gray-600'
                    )}>
                      {statusTranslations[order.status] || order.status}
                    </span>
                    <span className="text-xs font-medium text-gray-900">R$ {order.total_amount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            {orders.length === 0 && <span className="text-xs text-gray-400 italic">Histórico vazio</span>}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleCloseBill}
        title="Confirmar Fechamento"
        message="Você vai marcar a mesa como encerrando e gerar um resumo para fechamento no caixa. As sugestões do Maestro serão pausadas."
        confirmText="Confirmar Fechamento"
        variant="success"
        loading={isProcessing}
      />

      {/* Reopen Modal */}
      <Modal
        isOpen={isReopenModalOpen}
        onClose={() => setIsReopenModalOpen(false)}
        title="Reabrir Conta da Mesa"
        className="max-w-md"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex gap-3 text-sm">
            <Info className="shrink-0 w-5 h-5 mt-0.5" />
            <div>
              <p className="font-bold">Atenção Operacional</p>
              <p>Você vai reabrir a mesa para novos pedidos. O status voltará para "Ocupada" e as sugestões do Maestro serão reativadas.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reopen-reason">Motivo da Reabertura (Opcional)</Label>
            <div className="relative">
              <select
                id="reopen-reason"
                className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={reopenReason}
                onChange={(e) => setReopenReason(e.target.value)}
              >
                <option value="more_items">Cliente pediu mais itens</option>
                <option value="correction">Correção de pedido</option>
                <option value="payment_error">Erro no fechamento</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 justify-end">
            <Button variant="outline" onClick={() => setIsReopenModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleReopenBill} disabled={isProcessing}>
              {isProcessing ? 'Processando...' : 'Confirmar Reabertura'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

