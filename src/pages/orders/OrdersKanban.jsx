import React from 'react';
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  closestCorners
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Clock, Eye, ShoppingBag } from 'lucide-react';
import { cn } from '../../lib/utils';
import { createPortal } from 'react-dom';

const columns = [
  { id: 'pending', label: 'Pendente', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'preparing', label: 'Em Preparo', color: 'bg-indigo-50 text-indigo-900 border-indigo-200' }, // Changed to indigo to match standard
  { id: 'ready', label: 'Pronto', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

export default function OrdersKanban({ orders, onViewOrder, onUpdateStatus }) {
  const [activeId, setActiveId] = React.useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id && active.data.current?.status !== over.id) {
      // Trigger update
      onUpdateStatus(active.id, over.id);
    }
  };

  const getOrdersByStatus = (status) => orders.filter((order) => order.status === status);

  const activeOrder = activeId ? orders.find(o => o.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)] overflow-hidden">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            orders={getOrdersByStatus(column.id)}
            onViewOrder={onViewOrder}
          />
        ))}
      </div>

      {createPortal(
        <DragOverlay>
          {activeOrder ? (
            <div className="transform rotate-3 cursor-grabbing w-[300px]">
              <OrderCard order={activeOrder} isOverlay />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

function KanbanColumn({ column, orders, onViewOrder }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col h-full rounded-2xl border transition-colors",
        isOver ? "bg-gray-100 border-gray-300 ring-2 ring-gray-200" : "bg-gray-50/50 border-gray-100",
      )}
    >
      {/* Column Header */}
      <div className={cn(
        "p-4 border-b rounded-t-2xl flex items-center justify-between",
        column.color,
        "bg-opacity-40"
      )}>
        <div className="flex items-center gap-2 font-semibold">
          <div className={cn("w-2 h-2 rounded-full", column.color.includes('amber') ? 'bg-amber-500' : column.color.includes('indigo') ? 'bg-indigo-500' : 'bg-emerald-500')} />
          {column.label}
        </div>
        <span className="text-xs font-bold px-2 py-1 bg-white/50 rounded-full text-gray-600">
          {orders.length}
        </span>
      </div>

      {/* Cards Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {orders.map((order) => (
          <DraggableOrderCard
            key={order.id}
            order={order}
            onViewOrder={onViewOrder}
          />
        ))}

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
            <ShoppingBag size={24} className="mb-2 opacity-20" />
            Sem pedidos
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableOrderCard({ order, onViewOrder }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: order.id,
    data: { status: order.status }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 grayscale"
      >
        <OrderCard order={order} />
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <OrderCard order={order} onViewOrder={onViewOrder} />
    </div>
  );
}

function OrderCard({ order, onViewOrder, isOverlay }) {
  const time = React.useMemo(() => {
    if (!order.created_at) return '--';
    const diff = Math.floor((new Date() - new Date(order.created_at)) / 60000);
    return `${diff} min`;
  }, [order.created_at]);

  return (
    <div className={cn(
      "bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all group",
      !isOverlay && "hover:shadow-md cursor-grab active:cursor-grabbing",
      isOverlay && "shadow-xl border-indigo-200"
    )}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
            <ShoppingBag size={16} />
          </div>
          <div>
            <span className="block font-bold text-gray-900">#{order.id.toString().slice(0, 6)}</span>
            <span className="text-xs text-gray-500">{order.table_number || 'Sem mesa'}</span>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 gap-1 bg-gray-50 px-2 py-1 rounded-md">
          <Clock size={12} />
          {time}
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-4 text-sm text-gray-600 border-t border-gray-50 pt-3">
        {order.items && order.items.slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs">
            <span>{item.quantity}x {item.name}</span>
          </div>
        ))}
        {order.items && order.items.length > 3 && (
          <span className="text-xs text-gray-400 italic">e mais {order.items.length - 3} itens...</span>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 text-sm">
        <span className="text-xs text-gray-500 font-medium">{order.items?.length || 0} itens</span>
        <div className="font-semibold text-gray-900 border px-2 py-1 rounded bg-gray-50">
          R$ {Number(order.total_amount || 0).toFixed(2)}
        </div>
      </div>

      {onViewOrder && (
        <div className="mt-3 pt-3 border-t border-gray-50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag start when clicking button
            onClick={() => onViewOrder(order)}
            className="text-xs font-medium text-indigo-600 flex items-center gap-1 hover:underline"
          >
            Ver detalhes <Eye size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
