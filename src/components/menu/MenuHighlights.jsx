import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { Button, Input } from '../ui/Form';
import { formatCurrency } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';
import {
    Plus,
    X,
    Pencil,
    ChevronLeft,
    ChevronRight,
    Search,
    Star,
    Image as ImageIcon,
    Sparkles
} from 'lucide-react';

// Single Highlight Slot
function HighlightSlot({ position, product, onSelect, onRemove, onMoveLeft, onMoveRight, isFirst, isLast }) {
    if (!product) {
        return (
            <div
                onClick={onSelect}
                className="group relative flex flex-col items-center justify-center h-48 bg-surface border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
            >
                <div className="p-3 bg-primary/10 rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
                    <Plus className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-text-secondary">Selecionar Produto</span>
                <span className="text-xs text-text-tertiary mt-1">Posição {position}</span>
            </div>
        );
    }

    return (
        <div className="relative group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-md transition-all">
            {/* Position Badge */}
            <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                #{position}
            </div>

            {/* Image */}
            <div className="h-28 bg-background overflow-hidden">
                {product.photo_url || product.image_url ? (
                    <img
                        src={product.photo_url || product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-text-tertiary" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3">
                <h4 className="font-semibold text-text-primary text-sm truncate">{product.name}</h4>
                <p className="text-xs text-text-tertiary truncate">{product.categoryName || 'Sem categoria'}</p>
                <p className="text-sm font-bold text-primary mt-1">{formatCurrency(product.price)}</p>
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!isFirst && (
                    <Button size="icon" variant="secondary" className="h-8 w-8" onClick={onMoveLeft}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                )}
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={onSelect}>
                    <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={onRemove}>
                    <X className="w-4 h-4" />
                </Button>
                {!isLast && (
                    <Button size="icon" variant="secondary" className="h-8 w-8" onClick={onMoveRight}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}

// Carousel Preview Mini
function CarouselPreview({ highlights }) {
    const filledHighlights = highlights.filter(h => h !== null);

    if (filledHighlights.length === 0) {
        return (
            <div className="mt-4 p-4 bg-background rounded-lg border border-border text-center">
                <p className="text-xs text-text-tertiary">Prévia do carrossel aparecerá aqui quando você adicionar destaques.</p>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <p className="text-xs text-text-tertiary mb-2">Prévia do Carrossel:</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
                {filledHighlights.map((product, i) => (
                    <div key={i} className="flex-shrink-0 w-24 bg-background rounded-lg border border-border overflow-hidden">
                        <div className="h-14 bg-surface-hover">
                            {(product.photo_url || product.image_url) ? (
                                <img src={product.photo_url || product.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="w-4 h-4 text-text-tertiary" />
                                </div>
                            )}
                        </div>
                        <div className="p-1.5">
                            <p className="text-[10px] font-medium text-text-primary truncate">{product.name}</p>
                            <p className="text-[10px] text-primary font-bold">{formatCurrency(product.price)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Product Selector Modal
function ProductSelectorModal({ isOpen, onClose, products, onSelect, currentHighlights }) {
    const [search, setSearch] = useState('');

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
        const notAlreadySelected = !currentHighlights.some(h => h?.id === p.id);
        return matchesSearch && notAlreadySelected;
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Selecionar Produto para Destaque">
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                    <Input
                        placeholder="Buscar produto..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="max-h-80 overflow-y-auto space-y-2">
                    {filteredProducts.length === 0 ? (
                        <p className="text-center text-text-tertiary py-8">Nenhum produto disponível.</p>
                    ) : (
                        filteredProducts.map(product => (
                            <div
                                key={product.id}
                                onClick={() => { onSelect(product); onClose(); }}
                                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-all"
                            >
                                <div className="h-12 w-12 rounded-lg bg-surface-hover border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {(product.photo_url || product.image_url) ? (
                                        <img src={product.photo_url || product.image_url} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                        <ImageIcon className="h-5 w-5 text-text-tertiary" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-text-primary truncate">{product.name}</p>
                                    <p className="text-xs text-text-tertiary">{product.categoryName}</p>
                                </div>
                                <p className="text-sm font-bold text-primary">{formatCurrency(product.price)}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Modal>
    );
}

// Main Component
export default function MenuHighlights({ allProducts, highlights = [null, null, null], onChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    // Auto-save effect (simulated visualization only, parent handles actual persistence if needed)
    useEffect(() => {
        const filledCount = highlights.filter(h => h !== null).length;
        if (filledCount > 0) {
            setIsSaving(true);
            const timer = setTimeout(() => {
                setIsSaving(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [highlights]);

    const handleOpenModal = (slotIndex) => {
        setSelectedSlot(slotIndex);
        setIsModalOpen(true);
    };

    const handleSelectProduct = (product) => {
        const newHighlights = [...highlights];
        newHighlights[selectedSlot] = product;
        onChange(newHighlights);
        toast.success(`Destaque ${selectedSlot + 1} definido!`);
    };

    const handleRemove = (slotIndex) => {
        const newHighlights = [...highlights];
        newHighlights[slotIndex] = null;
        onChange(newHighlights);
        toast.success('Destaque removido');
    };

    const handleMoveLeft = (index) => {
        if (index === 0) return;
        const newHighlights = [...highlights];
        [newHighlights[index - 1], newHighlights[index]] = [newHighlights[index], newHighlights[index - 1]];
        onChange(newHighlights);
    };

    const handleMoveRight = (index) => {
        if (index === 2) return;
        const newHighlights = [...highlights];
        [newHighlights[index], newHighlights[index + 1]] = [newHighlights[index + 1], newHighlights[index]];
        onChange(newHighlights);
    };

    const filledCount = highlights.filter(h => h !== null).length;

    return (
        <Card className="mb-8 border-primary/20 shadow-sm animate-fadeIn bg-gradient-to-br from-surface to-background">
            <CardHeader className="pb-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-text-primary">Destaques do Cardápio</CardTitle>
                            <p className="text-sm text-text-tertiary">Selecione 3 produtos para exibir no carrossel principal do cardápio digital.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {isSaving ? (
                            <span className="text-xs font-medium text-primary animate-pulse flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Salvando...
                            </span>
                        ) : filledCount > 0 ? (
                            <span className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-md">
                                ✓ Salvo
                            </span>
                        ) : null}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {highlights.map((product, index) => (
                        <div key={index} className="space-y-2">
                            <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider pl-1 block">
                                Produto em destaque - Posição {index + 1}
                            </span>
                            <HighlightSlot
                                position={index + 1}
                                product={product}
                                onSelect={() => handleOpenModal(index)}
                                onRemove={() => handleRemove(index)}
                                onMoveLeft={() => handleMoveLeft(index)}
                                onMoveRight={() => handleMoveRight(index)}
                                isFirst={index === 0}
                                isLast={index === 2}
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border/50">
                    <CarouselPreview highlights={highlights} />
                </div>
            </CardContent>

            {/* Product Selector Modal */}
            <ProductSelectorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                products={allProducts}
                onSelect={handleSelectProduct}
                currentHighlights={highlights}
            />
        </Card>
    );
}
