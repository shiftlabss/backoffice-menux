import React from 'react';
import { Modal } from '../../components/ui/Modal';
import { Clock, ShoppingBag, User, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/Form';

export default function OrderDetailsModal({ isOpen, onClose, order, onUpdateStatus }) {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Detalhes do Pedido ${order.id}`}>
      <div className="space-y-6">
        {/* Header Info */}
        <div className="flex justify-between items-start bg-gray-50 p-4 rounded-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShoppingBag size={16} />
              <span>Mesa / Origem</span>
            </div>
            <p className="font-semibold text-gray-900">{order.table}</p>
          </div>
          <div className="space-y-1 text-right">
            <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>Tempo</span>
            </div>
            <p className="font-semibold text-gray-900">{order.time}</p>
          </div>
        </div>

        {/* Items List (Mocked since we only have summary data in the parent) */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Itens do Pedido</h3>
          <div className="space-y-3">
            {/* We'll simulate items based on the count for now */}
            {Array.from({ length: order.items }).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">1x</div>
                  <span className="text-gray-700">Item Exemplo #{i + 1}</span>
                </div>
                <span className="font-medium text-gray-900">R$ 45,00</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="text-lg font-bold text-gray-900">
            Total: {order.total}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>Fechar</Button>

            {order.status === 'pending' && (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => onUpdateStatus(order.id, 'preparing')}>
                Iniciar Preparo
              </Button>
            )}

            {order.status === 'preparing' && (
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => onUpdateStatus(order.id, 'ready')}>
                Marcar Pronto
              </Button>
            )}

            {order.status === 'ready' && (
              <Button className="bg-gray-900 hover:bg-gray-800 text-white" onClick={() => onUpdateStatus(order.id, 'finished')}>
                Entregar / Finalizar
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
