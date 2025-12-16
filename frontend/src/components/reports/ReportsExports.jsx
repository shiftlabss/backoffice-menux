import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { FileText, Download, Clock } from 'lucide-react';

export default function ReportsExports() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Pacotes de Dados</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'Vendas Detalhadas', desc: 'CSV com todas as transações, itens, valores e taxas.', icon: FileText },
          { name: 'Histórico de Pedidos', desc: 'CSV com logs de status, tempos de preparo e entrega.', icon: Clock },
          { name: 'Performance de Produtos', desc: 'CSV consolidado por item do cardápio.', icon: FileText },
        ].map((item, i) => (
          <Card key={i} className="p-6 flex items-start gap-4 hover:border-purple-300 transition-colors">
            <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
              <item.icon />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500 mt-1 mb-4">{item.desc}</p>
              <Button variant="outline" size="sm" className="w-full justify-center">
                <Download size={14} className="mr-2" /> Baixar CSV
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Últimas Exportações</h3>
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Arquivo</th>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Solicitante</th>
                <th className="px-6 py-3 font-medium text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'vendas_nov_2024.csv', date: 'Hoje, 09:30', user: 'Admin' },
                { name: 'produtos_performance.pdf', date: 'Ontem, 18:00', user: 'Gerente' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-gray-500">{row.date}</td>
                  <td className="px-6 py-4 text-gray-500">{row.user}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="text-purple-600 font-bold hover:underline">Baixar Novamente</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
