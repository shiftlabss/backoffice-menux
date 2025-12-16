import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import MaestroInsights from './MaestroInsights';
import { Package, ImageOff, TrendingDown, Eye, Plus } from 'lucide-react';

export default function ReportsProducts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Produtos Ativos</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">128</h3>
          </div>
          <div className="p-3 bg-gray-100 rounded-full text-gray-600">
            <Package size={24} />
          </div>
        </Card>
        <Card className="p-5 flex items-center justify-between border border-red-200 bg-red-50">
          <div>
            <p className="text-xs text-red-700 font-bold uppercase tracking-wider">Sem Foto</p>
            <h3 className="text-2xl font-bold text-red-900 mt-1">12</h3>
          </div>
          <div className="p-3 bg-red-100 rounded-full text-red-600">
            <ImageOff size={24} />
          </div>
        </Card>
        <Card className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Baixa Conversão</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">5</h3>
          </div>
          <div className="p-3 bg-orange-100 rounded-full text-orange-600">
            <TrendingDown size={24} />
          </div>
        </Card>
      </div>

      <MaestroInsights insights={[
        {
          title: 'Itens com descrição ruim',
          description: 'Identifiquei 5 pratos muito visualizados mas com poucos pedidos. As descrições são curtas (< 20 caracteres). Melhorar o texto pode aumentar conversão em 15%.',
          action: 'Revisar descrições'
        }
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Mais Populares (Visualização)</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Produto</th>
                <th className="px-6 py-3 font-medium">Views</th>
                <th className="px-6 py-3 font-medium text-right">Taxa Conv.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Picanha na Chapa', views: 450, conv: '32%' },
                { name: 'Hambúrguer Clássico', views: 410, conv: '28%' },
                { name: 'Petit Gateau', views: 380, conv: '45%' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-200"></div>
                    <span className="font-medium text-gray-900">{row.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 flex items-center gap-1"><Eye size={14} />{row.views}</td>
                  <td className="px-6 py-4 text-right text-green-600 font-bold">{row.conv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Oportunidades</h3>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <ImageOff size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Adicionar Fotos (12)</h4>
                <p className="text-xs text-gray-500 mt-1 mb-2">Produtos sem foto vendem 40% menos.</p>
                <Button size="sm" variant="outline" className="text-xs h-8">Ver lista</Button>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <Plus size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Sem Vendas (8)</h4>
                <p className="text-xs text-gray-500 mt-1 mb-2">Estes produtos não tiveram saída nos últimos 30 dias. Considere remover ou promover.</p>
                <Button size="sm" variant="outline" className="text-xs h-8">Ver lista</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
