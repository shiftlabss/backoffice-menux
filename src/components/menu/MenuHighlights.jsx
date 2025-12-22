import React from 'react';
import { useDroppable, useDraggable, DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, X, GripVertical, Image as ImageIcon } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { Button } from '../ui/Form';
import { Modal } from '../ui/Modal';

function HighlightCard({ product, index, onRemove }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: product.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "relative group flex items-center gap-3 p-3 bg-surface border border-border rounded-xl shadow-sm hover:shadow-md transition-all select-none touch-none",
                isDragging && "opacity-50 ring-2 ring-primary"
            )}
        >
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-text-tertiary hover:text-text-primary p-1">
                <GripVertical className="w-4 h-4" />
            </div>

            <div className="h-12 w-12 rounded-lg bg-background border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                    <ImageIcon className="h-4 w-4 text-text-tertiary" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-text-primary truncate">{product.name}</h4>
                <p className="text-xs text-primary font-medium">{formatCurrency(product.price)}</p>
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(product.id)}
                className="h-7 w-7 text-text-tertiary hover:text-red-500 hover:bg-red-50"
            >
                <X className="w-4 h-4" />
            </Button>

            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {index + 1}
            </div>
        </div>
    );
}

function EmptySlot({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-2 h-[80px] w-full border border-dashed border-border rounded-xl hover:border-primary/50 hover:bg-surface transition-all group"
        >
            <div className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                <Plus className="w-4 h-4 text-text-tertiary group-hover:text-primary" />
            </div>
            <span className="text-xs font-medium text-text-tertiary group-hover:text-primary">Adicionar Destaque</span>
        </button>
    );
}

export default function MenuHighlights({ highlights, onUpdate, onAddClick }) {
    // DND Handlers
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = highlights.findIndex(h => h.id === active.id);
            const newIndex = highlights.findIndex(h => h.id === over.id);
            onUpdate(arrayMove(highlights, oldIndex, newIndex));
        }
    };

    return (
        <div className="space-y-3 p-4 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        Vitrine do Cardápio
                    </h3>
                    <p className="text-xs text-text-tertiary">Selecione até 3 produtos para destacar no topo do cardápio digital.</p>
                </div>
                <span className="text-xs font-medium text-text-secondary bg-surface px-2 py-1 rounded-md border border-border">
                    {highlights.length}/3 Selecionados
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={highlights.map(h => h.id)} strategy={horizontalListSortingStrategy}>
                        {highlights.map((product, index) => (
                            <HighlightCard
                                key={product.id}
                                product={product}
                                index={index}
                                onRemove={(id) => onUpdate(highlights.filter(h => h.id !== id))}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                {/* Fill remaining slots with EmptySlots */}
                {Array.from({ length: 3 - highlights.length }).map((_, i) => (
                    <EmptySlot key={`empty-${i}`} onClick={onAddClick} />
                ))}
            </div>
        </div>
    );
}
