import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { Button } from '../ui/Form';
import { cn } from '../../lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

function SortableSubCategoryItem({ sub, onEdit, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: sub.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group flex items-center justify-between p-4 bg-surface border border-border rounded-xl transition-all duration-200 hover:border-primary/50 hover:shadow-sm mb-3"
        >
            <div className="flex items-center gap-4">
                <button
                    {...attributes}
                    {...listeners}
                    className="p-1.5 text-text-tertiary hover:text-text-primary cursor-grab active:cursor-grabbing rounded-lg hover:bg-background"
                >
                    <GripVertical className="h-5 w-5" />
                </button>
                <div>
                    <h3 className="font-medium text-text-primary text-base">{sub.name}</h3>
                    <span className="text-xs text-text-secondary">{sub.items?.length || 0} produtos</span>
                </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={() => onEdit(sub)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => onDelete(sub)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default function MenuSubCategories({
    categories,
    subcategories, // This might be a flat list or filtered from parent.
    // Actually, `subcategories` prop implies the parent filtered it? 
    // Wait, the design is to have a robust selector here.
    // So parent might pass ALL categories, but we need to select one.
    // To keep it simple, let parent manage "selected category for subcat view".
    selectedCategoryId,
    onSelectCategory,
    onAdd,
    onEdit,
    onDelete,
    onReorder
}) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            onReorder(active.id, over.id);
        }
    };

    // Derived state for display
    const currentSubCategories = categories.find(c => c.id === selectedCategoryId)?.subcategories || [];

    return (
        <div className="max-w-4xl mx-auto pt-6 px-6 h-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">Subcategorias</h2>
                    <p className="text-text-secondary">Organize os produtos em grupos dentro das categorias.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        className="bg-surface border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 min-w-[200px]"
                        value={selectedCategoryId || ''}
                        onChange={(e) => onSelectCategory(e.target.value)}
                    >
                        <option value="" disabled>Selecione uma categoria</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <Button onClick={onAdd} disabled={!selectedCategoryId} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nova Subcategoria
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 pb-10">
                {!selectedCategoryId ? (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl bg-surface/30">
                        <p className="text-text-tertiary">Selecione uma categoria para gerenciar suas subcategorias</p>
                    </div>
                ) : currentSubCategories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl bg-surface/30">
                        <p className="text-text-tertiary mb-4">Nenhuma subcategoria nesta categoria</p>
                        <Button variant="outline" onClick={onAdd}>Criar primeira subcategoria</Button>
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={currentSubCategories.map(s => s.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {currentSubCategories.map((sub) => (
                                <SortableSubCategoryItem
                                    key={sub.id}
                                    sub={sub}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
}
