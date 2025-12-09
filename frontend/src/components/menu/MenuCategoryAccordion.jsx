import React, { useState } from 'react';
import {
    Plus,
    GripVertical,
    Pencil,
    Trash2,
    ChevronDown,
    ChevronRight,
    FolderOpen,
    AlertCircle,
    Package,
    Filter
} from 'lucide-react';
import { Button } from '../ui/Form';
import { cn } from '../../lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Sortable Subcategory Item (nested inside category)
function SortableSubcategoryItem({ sub, onEdit, onDelete, onClickSubcategory }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: sub.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const productCount = sub.items?.length || 0;
    const hasNoProducts = productCount === 0;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group flex items-center justify-between py-3 px-4 bg-background border border-border/50 rounded-lg transition-all duration-200 hover:border-primary/30 hover:bg-surface/50",
                isDragging && "shadow-lg ring-2 ring-primary/20"
            )}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                    {...attributes}
                    {...listeners}
                    className="p-1 text-text-tertiary hover:text-text-primary cursor-grab active:cursor-grabbing rounded hover:bg-surface flex-shrink-0"
                >
                    <GripVertical className="h-4 w-4" />
                </button>

                <button
                    onClick={() => onClickSubcategory(sub)}
                    className="flex items-center gap-2 flex-1 min-w-0 text-left hover:text-primary transition-colors"
                >
                    <span className="font-medium text-text-primary truncate">{sub.name}</span>
                    <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full flex-shrink-0",
                        hasNoProducts
                            ? "bg-amber-100 text-amber-700"
                            : "bg-text-tertiary/10 text-text-secondary"
                    )}>
                        {productCount}
                    </span>
                    {hasNoProducts && (
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                    )}
                </button>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                    onClick={() => onEdit(sub)}
                    className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Editar"
                >
                    <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                    onClick={() => onDelete(sub)}
                    className="p-1.5 text-text-tertiary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Excluir"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}

// Sortable Category Card (Accordion)
function SortableCategoryCard({
    category,
    isExpanded,
    onToggleExpand,
    onEditCategory,
    onDeleteCategory,
    onAddSubcategory,
    onEditSubcategory,
    onDeleteSubcategory,
    onReorderSubcategories,
    onClickSubcategory
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: category.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    const subcategories = category.subcategories || [];
    const hasNoSubcategories = subcategories.length === 0;
    const totalProducts = subcategories.reduce((acc, sub) => acc + (sub.items?.length || 0), 0);

    // Sensors for nested DnD
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleSubDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            onReorderSubcategories(category.id, active.id, over.id);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "bg-surface border border-border rounded-xl overflow-hidden transition-all duration-200",
                isDragging && "shadow-2xl ring-2 ring-primary opacity-90",
                hasNoSubcategories && "border-amber-200 bg-amber-50/30"
            )}
        >
            {/* Category Header */}
            <div
                className={cn(
                    "flex items-center justify-between p-4 cursor-pointer transition-colors",
                    isExpanded ? "bg-surface border-b border-border" : "hover:bg-surface-hover"
                )}
                onClick={onToggleExpand}
            >
                <div className="flex items-center gap-3">
                    <button
                        {...attributes}
                        {...listeners}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-text-tertiary hover:text-text-primary cursor-grab active:cursor-grabbing rounded-lg hover:bg-background"
                    >
                        <GripVertical className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-2">
                        {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-text-tertiary" />
                        ) : (
                            <ChevronRight className="h-5 w-5 text-text-tertiary" />
                        )}

                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-text-primary text-base">{category.name}</h3>
                                {hasNoSubcategories && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        Vazia
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-text-secondary mt-0.5">
                                {subcategories.length} subcategorias • {totalProducts} produtos
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => onEditCategory(category)}
                        className="p-2 text-text-tertiary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Editar categoria"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDeleteCategory(category)}
                        className="p-2 text-text-tertiary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Excluir categoria"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Expanded Content - Subcategories */}
            {isExpanded && (
                <div className="p-4 bg-background/50 space-y-3">
                    {/* Add Subcategory Button */}
                    <button
                        onClick={() => onAddSubcategory(category.id)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-dashed border-border rounded-lg text-text-secondary hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        <span className="text-sm font-medium">Nova Subcategoria</span>
                    </button>

                    {/* Subcategories List */}
                    {subcategories.length > 0 ? (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleSubDragEnd}
                        >
                            <SortableContext
                                items={subcategories.map(s => s.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-2">
                                    {subcategories.map((sub) => (
                                        <SortableSubcategoryItem
                                            key={sub.id}
                                            sub={sub}
                                            onEdit={onEditSubcategory}
                                            onDelete={onDeleteSubcategory}
                                            onClickSubcategory={onClickSubcategory}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    ) : (
                        <div className="text-center py-6 text-text-tertiary">
                            <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Nenhuma subcategoria criada</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Main Component
export default function MenuCategoryAccordion({
    categories,
    onAddCategory,
    onEditCategory,
    onDeleteCategory,
    onReorderCategories,
    onAddSubcategory,
    onEditSubcategory,
    onDeleteSubcategory,
    onReorderSubcategories,
    onFilterBySubcategory
}) {
    const [expandedCategories, setExpandedCategories] = useState(new Set());

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const toggleExpand = (categoryId) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    const expandAll = () => {
        setExpandedCategories(new Set(categories.map(c => c.id)));
    };

    const collapseAll = () => {
        setExpandedCategories(new Set());
    };

    const handleCategoryDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            onReorderCategories(active.id, over.id);
        }
    };

    const handleClickSubcategory = (subcategory) => {
        if (onFilterBySubcategory) {
            onFilterBySubcategory(subcategory);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pt-6 px-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">Categorias & Subcategorias</h2>
                    <p className="text-text-secondary">Organize a estrutura do seu cardápio de forma hierárquica.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={expandAll} className="text-xs">
                        Expandir Tudo
                    </Button>
                    <Button variant="ghost" size="sm" onClick={collapseAll} className="text-xs">
                        Recolher Tudo
                    </Button>
                    <Button onClick={onAddCategory} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nova Categoria
                    </Button>
                </div>
            </div>

            {/* Categories Accordion List */}
            <div className="flex-1 overflow-y-auto pb-10 pr-1">
                {categories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl bg-surface/30">
                        <FolderOpen className="h-12 w-12 text-text-tertiary mb-4 opacity-50" />
                        <p className="text-text-tertiary mb-4">Nenhuma categoria encontrada</p>
                        <Button variant="outline" onClick={onAddCategory}>
                            Criar primeira categoria
                        </Button>
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleCategoryDragEnd}
                    >
                        <SortableContext
                            items={categories.map(c => c.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-3">
                                {categories.map((category) => (
                                    <SortableCategoryCard
                                        key={category.id}
                                        category={category}
                                        isExpanded={expandedCategories.has(category.id)}
                                        onToggleExpand={() => toggleExpand(category.id)}
                                        onEditCategory={onEditCategory}
                                        onDeleteCategory={onDeleteCategory}
                                        onAddSubcategory={onAddSubcategory}
                                        onEditSubcategory={onEditSubcategory}
                                        onDeleteSubcategory={onDeleteSubcategory}
                                        onReorderSubcategories={onReorderSubcategories}
                                        onClickSubcategory={handleClickSubcategory}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
}
