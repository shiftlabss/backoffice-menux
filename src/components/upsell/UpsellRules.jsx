import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button, Input, Select } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Plus, Search, MoreHorizontal, Edit2, Trash2, PauseCircle, PlayCircle, Filter, ArrowUpDown } from 'lucide-react';
import UpsellWizard from './UpsellWizard';

export default function UpsellRules() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const rules = [
    { id: 1, name: 'Upgrade Batata', type: 'Upsell', trigger: 'Batata P', offer: 'Batata M (+R$2)', status: 'active', priority: 'Alta', conversation: '22%' },
    { id: 2, name: 'Bebida no Lanche', type: 'Cross-sell', trigger: 'Hambúrguer', offer: 'Coca-Cola', status: 'active', priority: 'Média', conversation: '15%' },
    { id: 3, name: 'Sobremesa Jantar', type: 'Cross-sell', trigger: 'Prato Principal', offer: 'Pudim', status: 'paused', priority: 'Baixa', conversation: '8%' },
    { id: 4, name: 'Adicional de Queijo', type: 'Cross-sell', trigger: 'Todo Cardápio', offer: 'Extra Queijo', status: 'active', priority: 'Média', conversation: '30%' },
    { id: 5, name: 'Vinho com Massas', type: 'Cross-sell', trigger: 'Categoria Massas', offer: 'Vinho Tinto', status: 'active', priority: 'Alta', conversation: '12%' },
  ];

  return (
    <div className="space-y-6">

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-1 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="Buscar regra, gatilho ou oferta..." className="pl-10" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={18} /> <span className="hidden sm:inline">Filtros</span>
          </Button>
          <div className="flex gap-2">
            <select
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Todos os Tipos</option>
              <option value="Upsell">Upsell</option>
              <option value="Cross-sell">Cross-sell</option>
            </select>
          </div>
        </div>
        <Button onClick={() => setIsWizardOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 whitespace-nowrap">
          <Plus size={18} /> Nova Regra
        </Button>
      </div>

      {/* Rules Table */}
      <Card className="overflow-hidden border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Nome da Regra</th>
                <th className="px-6 py-4 font-semibold">Tipo</th>
                <th className="px-6 py-4 font-semibold">Gatilho & Oferta</th>
                <th className="px-6 py-4 font-semibold cursor-pointer hover:text-gray-700 flex items-center gap-1">
                  Prioridade <ArrowUpDown size={14} />
                </th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {rule.name}
                    <div className="text-xs text-gray-400 mt-0.5 font-normal">Conv: {rule.conversation}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={rule.type === 'Upsell' ? 'default' : 'secondary'} className={rule.type === 'Upsell' ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}>
                      {rule.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium mb-1">Se: <span className="text-gray-600 font-normal">{rule.trigger}</span></span>
                      <span className="text-gray-900 font-medium">Ofertar: <span className="text-gray-600 font-normal">{rule.offer}</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold border ${rule.priority === 'Alta' ? 'bg-red-50 text-red-700 border-red-100' :
                        rule.priority === 'Média' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                      {rule.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`relative flex h-2.5 w-2.5`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${rule.status === 'active' ? 'bg-green-400' : 'hidden'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${rule.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      </span>
                      <span className="capitalize text-sm font-medium text-gray-600">{rule.status === 'active' ? 'Ativa' : 'Pausada'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50" title="Editar">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50" title={rule.status === 'active' ? 'Pausar' : 'Ativar'}>
                        {rule.status === 'active' ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50" title="Excluir">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <UpsellWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}
