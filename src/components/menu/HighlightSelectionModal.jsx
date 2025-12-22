import React, { useState, useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Button } from '../ui/Form';
import { Search, Image as ImageIcon, Check, CheckCircle2 } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

export default function HighlightSelectionModal({
  isOpen,
  onClose,
  products,
  activeHighlights = [],
  onSelect
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = (
        product.name?.toLowerCase().includes(searchLower) ||
        product.code?.toLowerCase().includes(searchLower)
      );

      // Should verify if valid product
      const isValid = product.is_active;

      return matchesSearch && isValid;
    }).sort((a, b) => {
      // Sort by name
      return a.name.localeCompare(b.name);
    });
  }, [products, searchTerm]);

  const handleSelect = (product) => {
    onSelect(product);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Selecionar Destaque"
      className="max-w-2xl h-[80vh] flex flex-col"
    >
      <div className="flex flex-col h-full gap-4">
        {/* Search Header */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <Input
            placeholder="Buscar produto por nome ou código..."
            className="pl-9 bg-background h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 -mr-2">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-text-tertiary">
              <Search className="w-8 h-8 mb-2 opacity-50" />
              <p>Nenhum produto encontrado</p>
            </div>
          ) : (
            filteredProducts.map(product => {
              const isSelected = activeHighlights.some(h => h.id === product.id);

              return (
                <div
                  key={product.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all",
                    isSelected
                      ? "bg-primary/5 border-primary/30 opacity-70 cursor-not-allowed"
                      : "bg-surface border-border hover:border-primary/50 hover:shadow-sm cursor-pointer group"
                  )}
                  onClick={() => !isSelected && handleSelect(product)}
                >
                  {/* Image */}
                  <div className="h-12 w-12 rounded-lg bg-background border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                    {(product.image_url || product.photo_url) ? (
                      <img
                        src={product.image_url || product.photo_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-text-tertiary" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={cn("font-medium truncate", isSelected ? "text-primary" : "text-text-primary")}>
                        {product.name}
                      </h4>
                      {product.code && (
                        <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-text-tertiary">
                          {product.code}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-text-secondary">
                      {formatCurrency(product.price)}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="ml-2">
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selecionado
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(product);
                        }}
                      >
                        Selecionar
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </Modal>
  );
}
