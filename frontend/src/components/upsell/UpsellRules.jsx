import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button, Input, Select } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { Plus, Search, MoreHorizontal, Edit2, Trash2, PauseCircle, PlayCircle, Filter } from 'lucide-react';
import UpsellWizard from './UpsellWizard';

export default function UpsellRules() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const rules = [
    { id: 1, name: 'Upgrade Batata', type: 'Upsell', trigger: 'Batata P', offer: 'Batata M (+R$2)', status: 'active', priority: 'Alta' },
    { id: 2, name: 'Bebida no Lanche', type: 'Cross-sell', trigger: 'Hambúrguer', offer: 'Coca-Cola', status: 'active', priority: 'Média' },
    { id: 3, name: 'Sobremesa Jantar', type: 'Cross-sell', trigger: 'Prato Principal', offer: 'Pudim', status: 'paused', priority: 'Baixa' },
  ];

  return (
    <div className="space-y-6">

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="Buscar por nome ou item..." className="pl-10" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={18} /> Filtros
          </Button>
        </div>
        <Button onClick={() => setIsWizardOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
          <Plus size={18} /> Nova Regra
        </Button>
      </div>

      {/* Rules Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Nome da Regra</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Gatilho</th>
                <th className="px-6 py-4">Oferta</th>
                <th className="px-6 py-4">Prioridade</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-900">{rule.name}</td>
                  <td className="px-6 py-4">
                    <Badge variant={rule.type === 'Upsell' ? 'default' : 'secondary'}>
                      {rule.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{rule.trigger}</td>
                  <td className="px-6 py-4 text-gray-600">{rule.offer}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${rule.priority === 'Alta' ? 'text-red-600' :
                        rule.priority === 'Média' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                      {rule.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${rule.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="capitalize text-gray-600">{rule.status === 'active' ? 'Ativa' : 'Pausada'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="Editar" className="p-1 hover:bg-gray-200 rounded text-gray-500"><Edit2 size={16} /></button>
                      <button title={rule.status === 'active' ? 'Pausar' : 'Ativar'} className="p-1 hover:bg-gray-200 rounded text-gray-500">
                        {rule.status === 'active' ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
                      </button>
                      <button title="Excluir" className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={16} /></button>
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
