import React from 'react';
import { Plus, GripVertical, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Form';
import { cn } from '../../lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

function SortableCategoryItem({ category, onEdit, onDelete, isActive }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: category.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group flex items-center justify-between p-4 bg-surface border border-border rounded-xl transition-all duration-200 hover:border-primary/50 hover:shadow-sm mb-3",
                isActive && "ring-2 ring-primary border-primary"
            )}
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
                    <h3 className="font-medium text-text-primary text-base">{category.name}</h3>
                    <span className="text-xs text-text-secondary">{category.subcategories?.length || 0} subcategorias</span>
                </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Placeholder for Toggle Activate - Assuming API supports it later, just UI for now if needed. 
                     For now sticking to Edit/Delete as per MVP requirements. 
                 */}
                <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => onDelete(category)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default function MenuCategories({
    categories,
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

    return (
        <div className="max-w-4xl mx-auto pt-6 px-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">Categorias</h2>
                    <p className="text-text-secondary">Gerencie os departamentos do seu cardápio.</p>
                </div>
                <Button onClick={onAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Categoria
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 pb-10">
                {categories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl bg-surface/30">
                        <p className="text-text-tertiary mb-4">Nenhuma categoria encontrada</p>
                        <Button variant="outline" onClick={onAdd}>Criar primeira categoria</Button>
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={categories.map(c => c.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {categories.map((cat) => (
                                <SortableCategoryItem
                                    key={cat.id}
                                    category={cat}
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
