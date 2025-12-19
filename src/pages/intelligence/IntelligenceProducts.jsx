import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Package, Sparkles, TrendingUp, Layers, Loader2 } from 'lucide-react';
import ModuleLayout from '../../components/layout/ModuleLayout';
import { intelligenceSidebarItems } from '../../constants/intelligenceSidebar';
import { intelligenceService } from '../../services/dataService';
import { toast } from 'react-hot-toast';

export default function IntelligenceProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock combos for now as backend endpoint currently only returns products
  // In a real scenario, this would also come from an API
  const combos = [
    { name: 'Combo Família Inteligente', items: ['2x Burger', '2x Batata', '1x Refri 2L'], revenue: 'R$ 890,00', ticketVar: '+15%' },
    { name: 'Combo Happy Hour', items: ['Porção Fritas', '2x Chopp'], revenue: 'R$ 1.200,00', ticketVar: '+22%' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await intelligenceService.getProducts();
      setProducts(data || []);
    } catch (err) {
      toast.error("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>
    );
  }

  return (
    <ModuleLayout
      title="Maestro"
      subtitle="Produtos e Combos"
      items={intelligenceSidebarItems}
    >
      <div className="space-y-6 max-w-7xl mx-auto pb-8">

        {/* Combos Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {combos.map((combo, i) => (
            <Card key={i} className="p-4 border-purple-100 bg-purple-50/20 hover:bg-purple-50/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-100 rounded-lg text-purple-600">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-foreground">{combo.name}</h3>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">
                  {combo.ticketVar} Ticket
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mb-3">{combo.items.join(' + ')}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-800">
                <Sparkles className="w-3 h-3" /> Gerou {combo.revenue} este mês
              </div>
            </Card>
          ))}
        </div>

        {/* Products Table */}
        <Card className="border-border overflow-hidden">
          <div className="p-4 border-b border-muted bg-gray-50/50">
            <h3 className="font-bold text-foreground">Performance por Produto</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-muted">
                  <TableHead className="w-[300px]">Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-center">Recomendações</TableHead>
                  <TableHead className="text-right">Receita Gerada</TableHead>
                  <TableHead className="text-right">Conversão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id} className="border-b border-muted">
                    <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                    <TableCell className="text-gray-500">{p.category}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{p.recommendations_count}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      R$ {p.revenue_attributed?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right font-bold text-foreground">{p.conversion_rate?.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </ModuleLayout>
  );
}
