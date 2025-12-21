
import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Search, Filter, Camera, AlignLeft, Info, PieChart, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { cn } from '../../../lib/utils';
import { ItemDrawer } from './ItemDrawer';

export function ItemsTable({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  if (!items) return null;

  const filteredItems = items.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg">Detalhe por Item</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar item..."
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon"><Filter size={16} /></Button>
          </div>
        </div>

        {/* Table */}
        <Card className="p-0 border border-slate-200 overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 w-[250px]">Item</th>
                  <th className="px-4 py-3 text-right">Impr.</th>
                  <th className="px-4 py-3 text-right">Views</th>
                  <th className="px-4 py-3 text-center">Engajamento</th>
                  <th className="px-4 py-3 text-right">Bolsa</th>
                  <th className="px-4 py-3 text-right">Pedidos</th>
                  <th className="px-4 py-3 text-right">Conv. Funil</th>
                  <th className="px-4 py-3 text-right">Receita</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 w-[50px]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-purple-50/30 transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.category}</div>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">{item.impressions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{item.views.toLocaleString()}</td>

                    {/* Engagements Icons */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2 text-slate-400">
                        {item.engagements > 500 && <Camera size={14} className="text-purple-500" />}
                        {item.engagements > 300 && <AlignLeft size={14} className="text-blue-500" />}
                        {item.engagements > 100 && <Info size={14} className="text-amber-500" />}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right text-slate-600">{item.cartAdds.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{item.orders.toLocaleString()}</td>

                    {/* Visual Funnel Conversion */}
                    <td className="px-4 py-3 text-right font-bold text-slate-800">
                      {item.conversion}
                      <div className="w-16 h-1 bg-slate-100 rounded-full ml-auto mt-1 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: item.conversion }}></div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right font-medium text-emerald-600">{item.revenue}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="secondary" className={cn(
                        "text-[10px]",
                        item.status === 'Ativo' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                          item.status === 'Baixo Estoque' ? "bg-amber-50 text-amber-700 border-amber-100" :
                            "bg-slate-100 text-slate-500"
                      )}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-purple-600 transition-colors" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <ItemDrawer
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
    </>
  );
}
