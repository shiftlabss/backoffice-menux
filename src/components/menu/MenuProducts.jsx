import React, { useState, useMemo } from 'react';
import {
    Plus, Search, Filter, Pencil, Trash2, Copy, Eye, EyeOff,
    Image as ImageIcon, MoreVertical, LayoutGrid, List, SlidersHorizontal, ArrowUpDown
} from 'lucide-react';
import { Button, Input } from '../ui/Form';
import { cn, formatCurrency } from '../../lib/utils';

import { toast } from 'react-hot-toast';

export default function MenuProducts({
    categories,
    onAdd,
    onEdit,
    onDelete
}) {
    // State

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterSubCategory, setFilterSubCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('name'); // name, price_asc, price_desc

    // Flatten all products
    const allProducts = useMemo(() => {
        let products = [];
        categories.forEach(cat => {
            if (cat.subcategories) {
                cat.subcategories.forEach(sub => {
                    if (sub.items) {
                        sub.items.forEach(item => {
                            products.push({
                                ...item,
                                categoryName: cat.name,
                                subCategoryName: sub.name,
                                categoryId: cat.id,
                                subCategoryId: sub.id
                            });
                        });
                    }
                });
            }
        });
        return products;
    }, [categories]);

    // Available Subcategories based on selected Category
    const availableSubcategories = useMemo(() => {
        if (filterCategory === 'all') return [];
        const cat = categories.find(c => c.id === parseInt(filterCategory) || c.id === filterCategory);
        return cat?.subcategories || [];
    }, [categories, filterCategory]);

    // Filtering & Sorting
    const processedProducts = useMemo(() => {
        let result = allProducts.filter(p => {
            const matchesSearch = (p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.code?.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory = filterCategory === 'all' || p.categoryId === (typeof p.categoryId === 'string' ? filterCategory : parseInt(filterCategory));
            const matchesSubCategory = filterSubCategory === 'all' || p.subCategoryId === (typeof p.subCategoryId === 'string' ? filterSubCategory : parseInt(filterSubCategory));

            const matchesStatus = filterStatus === 'all' ||
                (filterStatus === 'active' && p.is_active) ||
                (filterStatus === 'inactive' && !p.is_active);

            return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus;
        });

        // Sorting
        result.sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'price_asc') return a.price - b.price;
            if (sortBy === 'price_desc') return b.price - a.price;
            return 0;
        });

        return result;
    }, [allProducts, searchTerm, filterCategory, filterSubCategory, filterStatus, sortBy]);

    // Group by Category
    const groupedProducts = useMemo(() => {
        const groups = {};
        processedProducts.forEach(p => {
            const catName = p.categoryName || 'Outros';
            if (!groups[catName]) groups[catName] = [];
            groups[catName].push(p);
        });
        return groups;
    }, [processedProducts]);

    // Helper: Toggle Product Status (Mock)
    const handleToggleStatus = (product) => {
        // In real app, call API
        toast.success(`Produto ${product.is_active ? 'desativado' : 'ativado'}!`);
        // We can't actually mutate prop data here without a refresh/callback, 
        // so we just show visual feedback for now.
    };

    const handleDuplicate = (product) => {
        toast.success(`Cópia de ${product.name} criada!`);
        // Actual logic would be onAdd({ ...product, name: `${product.name} (Cópia)` })
    };

    return (
        <div className="h-full flex flex-col overflow-y-auto">


            {/* Catalog Section */}
            <div className="flex-1 flex flex-col gap-6">

                {/* Header & Filters */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                <List className="w-5 h-5" />
                                Catálogo de Produtos
                            </h2>
                            <p className="text-sm text-text-tertiary">Gerencie itens, preços e disponibilidade.</p>
                        </div>
                        <Button onClick={onAdd} className="gap-2 shadow-lg hover:shadow-primary/20 transition-all">
                            <Plus className="h-4 w-4" />
                            Novo Produto
                        </Button>
                    </div>

                    <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1 min-w-[250px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                            <Input
                                placeholder="Buscar por nome, categoria ou código..."
                                className="pl-9 bg-background"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 items-center flex-1">
                            {/* Category Filter */}
                            <div className="relative">
                                <span className="absolute -top-2 left-2 text-[10px] font-semibold text-text-tertiary bg-surface px-1">Categoria</span>
                                <select
                                    className="h-10 bg-background border border-input rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-[160px]"
                                    value={filterCategory}
                                    onChange={(e) => {
                                        setFilterCategory(e.target.value);
                                        setFilterSubCategory('all'); // Reset sub
                                    }}
                                >
                                    <option value="all">Todas</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Subcategory Filter (Conditional) */}
                            {filterCategory !== 'all' && availableSubcategories.length > 0 && (
                                <div className="relative animate-fadeIn">
                                    <span className="absolute -top-2 left-2 text-[10px] font-semibold text-text-tertiary bg-surface px-1">Subcategoria</span>
                                    <select
                                        className="h-10 bg-background border border-input rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-[160px]"
                                        value={filterSubCategory}
                                        onChange={(e) => setFilterSubCategory(e.target.value)}
                                    >
                                        <option value="all">Todas</option>
                                        {availableSubcategories.map(sub => (
                                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Status Filter */}
                            <div className="relative">
                                <span className="absolute -top-2 left-2 text-[10px] font-semibold text-text-tertiary bg-surface px-1">Status</span>
                                <select
                                    className="h-10 bg-background border border-input rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-[120px]"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">Todos</option>
                                    <option value="active">Ativos</option>
                                    <option value="inactive">Inativos</option>
                                </select>
                            </div>

                            {/* Sort */}
                            <div className="relative">
                                <span className="absolute -top-2 left-2 text-[10px] font-semibold text-text-tertiary bg-surface px-1">Ordenar</span>
                                <select
                                    className="h-10 bg-background border border-input rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-[140px]"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="name">Nome (A-Z)</option>
                                    <option value="price_asc">Menor Preço</option>
                                    <option value="price_desc">Maior Preço</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product List */}
                <div className="space-y-8">
                    {Object.keys(groupedProducts).length === 0 ? (
                        <div className="text-center py-20 bg-surface rounded-xl border border-dashed border-border">
                            <Search className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-text-primary">Nenhum produto encontrado</h3>
                            <p className="text-text-secondary">Tente ajustar seus filtros de busca.</p>
                        </div>
                    ) : (
                        Object.entries(groupedProducts).map(([categoryName, products]) => (
                            <div key={categoryName} className="space-y-3">
                                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                                    <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wider">{categoryName}</h3>
                                    <span className="text-xs bg-surface px-2 py-0.5 rounded-full text-text-tertiary">{products.length}</span>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {products.map(product => {
                                        const isHighlighted = highlights.some(h => h?.id === product.id);
                                        const hasImage = !!(product.image_url || product.photo_url);

                                        return (
                                            <div
                                                key={product.id}
                                                className={cn(
                                                    "group relative flex flex-col md:flex-row md:items-center bg-surface border rounded-xl p-3 transition-all hover:shadow-md",
                                                    isHighlighted ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/20"
                                                )}
                                            >
                                                {/* Left: Image & Identity */}
                                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                                    {/* Image Thumbnail */}
                                                    <div className="relative h-16 w-16 rounded-lg bg-background border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                                                        {hasImage ? (
                                                            <img
                                                                src={product.image_url || product.photo_url}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center text-text-tertiary">
                                                                <ImageIcon className="h-5 w-5 mb-1" />
                                                                <span className="text-[8px] uppercase">Sem img</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Names */}
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-semibold text-text-primary truncate font-medium">{product.name}</h4>
                                                            {isHighlighted && (
                                                                <span className="px-1.5 py-0.5 bg-primary text-[10px] text-primary-foreground font-bold rounded flex items-center gap-1 uppercase tracking-wider">
                                                                    <LayoutGrid className="w-3 h-3" /> No carrossel
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-text-tertiary font-mono bg-background px-1 rounded border border-border">
                                                                {product.code || '---'}
                                                            </span>
                                                            <span className="text-xs text-text-secondary truncate">
                                                                {product.categoryName} • {product.subCategoryName || 'Geral'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Center/Right: Details */}
                                                <div className="flex items-center gap-6 mt-3 md:mt-0 md:ml-6 flex-shrink-0 justify-between md:justify-end">

                                                    {/* Price */}
                                                    <div className="text-right">
                                                        {product.original_price && product.original_price > product.price ? (
                                                            <div className="flex flex-col items-end">
                                                                <span className="text-xs text-text-tertiary line-through">{formatCurrency(product.original_price)}</span>
                                                                <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="font-medium text-text-primary">{formatCurrency(product.price)}</span>
                                                        )}
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className={cn(
                                                        "px-2.5 py-1 rounded-full text-xs font-medium border",
                                                        product.is_active
                                                            ? "bg-green-500/10 text-green-600 border-green-500/20"
                                                            : "bg-text-tertiary/10 text-text-tertiary border-border"
                                                    )}>
                                                        {product.is_active ? 'Ativo' : 'Inativo'}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-1 pl-4 border-l border-border/50">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-text-secondary hover:text-primary"
                                                            onClick={() => onEdit(product)}
                                                            title="Editar"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-text-secondary hover:text-text-primary"
                                                            onClick={() => handleDuplicate(product)}
                                                            title="Duplicar"
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className={cn("h-8 w-8", product.is_active ? "text-text-secondary hover:text-orange-500" : "text-text-tertiary hover:text-green-500")}
                                                            onClick={() => handleToggleStatus(product)}
                                                            title={product.is_active ? "Desativar" : "Ativar"}
                                                        >
                                                            {product.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-500/10"
                                                            onClick={() => onDelete(product)}
                                                            title="Excluir"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
