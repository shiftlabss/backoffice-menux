import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { ProductRowCard } from '../ProductRowCard';
import { ComboPerformanceRow } from '../ComboPerformanceRow';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/Tabs'; // Assuming usage of ui/Tabs or standard button tabs
import { cn } from '../../../lib/utils';
import { Loader2, Package, Layers, Activity } from 'lucide-react';

import { useAudit } from '../../../hooks/useAudit';

export function RankingsTabs({ activeTab, onTabChange, products, combos, loading, onAnalyzeProduct, onAnalyzeCombo }) {
  const { log } = useAudit();

  const handleTabChange = (tab) => {
    onTabChange(tab);
    log('intelligence.products.tab_changed', { tab });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex bg-slate-100 p-1 rounded-lg self-start">
          <button
            onClick={() => handleTabChange('products')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === 'products' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Package size={16} />
            Produtos
          </button>
          <button
            onClick={() => handleTabChange('combos')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === 'combos' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Layers size={16} />
            Combos
          </button>
          <button
            onClick={() => handleTabChange('diagnostics')}
            id="tab-diagnostics"
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2",
              activeTab === 'diagnostics' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Activity size={16} />
            Diagnósticos
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <Card key={i} className="h-24 bg-slate-50 border-slate-100 animate-pulse" />)}
        </div>
      ) : (
        <div className="min-h-[300px]">
          {activeTab === 'products' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              {products.length === 0 ? (
                <EmptyState label="Nenhum produto encontrado" />
              ) : (
                products.map(p => (
                  <ProductRowCard
                    key={p.id}
                    product={p}
                    onAnalyze={() => onAnalyzeProduct(p)}
                  // Assuming row card manages its own expanded state or we simplify for new design
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'combos' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              {combos.length === 0 ? (
                <EmptyState label="Nenhum combo encontrado" />
              ) : (
                combos.map(c => (
                  <ComboPerformanceRow
                    key={c.id}
                    combo={c}
                    onAnalyze={() => onAnalyzeCombo(c)}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
              <Card className="p-6 border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Itens sem saída há 30 dias</h3>
                <p className="text-sm text-slate-500 mb-4">5 itens não tiveram vendas no último mês. Considere remover ou criar promoção.</p>
                <Button variant="outline" size="sm">Ver lista</Button>
              </Card>
              <Card className="p-6 border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Combos com margem baixa</h3>
                <p className="text-sm text-slate-500 mb-4">2 combos estão com margem abaixo da meta de 30%.</p>
                <Button variant="outline" size="sm">Analisar custos</Button>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const EmptyState = ({ label }) => (
  <div className="p-12 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400">
    {label}
  </div>
);
