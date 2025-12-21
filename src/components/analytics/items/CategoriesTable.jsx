
import React from 'react';
import { Card } from '../../ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui/Table'; // Adjust path if needed or use standard structure
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../../ui/Button';

export function CategoriesTable({ categories }) {
  if (!categories) return null;

  return (
    <Card className="p-0 border border-slate-200 overflow-hidden mb-8">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Performance por Categoria</h3>
        <Button variant="outline" size="sm">Exportar</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3 text-right">Sessões</th>
              <th className="px-4 py-3 text-right">Itens Vistos</th>
              <th className="px-4 py-3 text-right">Add Carrinho</th>
              <th className="px-4 py-3 text-right">Pedidos</th>
              <th className="px-4 py-3 text-right">Conversão</th>
              <th className="px-4 py-3 text-right">Receita</th>
              <th className="px-4 py-3 w-[50px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-4 py-3 font-medium text-slate-900">{cat.name}</td>
                <td className="px-4 py-3 text-right text-slate-600">{cat.sessions.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-600">{cat.itemsViewed.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-600">{cat.cartAdds.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-600">{cat.orders.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-bold text-slate-800">{cat.conversion}</td>
                <td className="px-4 py-3 text-right font-medium text-emerald-600">{cat.revenue}</td>
                <td className="px-4 py-3 text-center">
                  <button className="text-slate-400 hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
