import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button, Input, Label, Select } from '../ui/Form';
import { Check, Shield, Globe, Lock, Sliders, LayoutGrid, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

const TABS = [
    { id: 'basic', label: 'Dados Básicos', icon: Sliders },
    { id: 'matrix', label: 'Matriz de Permissões', icon: LayoutGrid },
    { id: 'rules', label: 'Regras & Restrições', icon: Lock },
];

const MODULES = [
    { name: 'Cardápio', desc: 'Gestão de produtos e categorias' },
    { name: 'Pedidos', desc: 'Acompanhamento e status' },
    { name: 'Usuários', desc: 'Gestão de acessos' },
    { name: 'Financeiro', desc: 'Relatórios e métricas' },
    { name: 'Configurações', desc: 'Dados da loja e sistemas' },
    { name: 'IA Menux', desc: 'Recomendações e inteligência' }
];

const PERMISSIONS = [
    'Visualizar', 'Criar', 'Editar', 'Excluir', 'Exportar'
];

export default function RoleModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('basic');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Novo Perfil de Acesso"
            className="max-w-5xl h-[80vh] flex flex-col"
        >
            <div className="flex flex-col h-full">
                {/* Tabs Header - Sticky at top of modal content */}
                <div className="flex border-b border-gray-200 px-6 bg-gray-50/50 sticky top-0 z-10 shrink-0">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all",
                                    isActive
                                        ? "border-purple-600 text-purple-700 bg-purple-50/50"
                                        : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                )}
                            >
                                <Icon className={cn("w-4 h-4", isActive ? "text-purple-600" : "text-gray-400")} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">

                    {/* 1. Basic Info */}
                    {activeTab === 'basic' && (
                        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
                            <div className="md:w-1/3 space-y-4">
                                <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 text-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-purple-100">
                                        <Shield className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h3 className="font-bold text-purple-900">Configuração Inicial</h3>
                                    <p className="text-xs text-purple-700 mt-2 leading-relaxed">
                                        Defina o nome e o escopo base para este perfil. Perfis bem definidos aumentam a segurança da operação.
                                    </p>
                                </div>
                            </div>

                            <div className="md:w-2/3 space-y-6">
                                <div>
                                    <Label className="mb-1.5 block">Nome do Perfil</Label>
                                    <Input placeholder="Ex: Gerente Operacional" className="h-12 text-lg font-medium border-gray-200 focus:border-purple-500" />
                                </div>
                                <div>
                                    <Label className="mb-1.5 block">Descrição</Label>
                                    <Input placeholder="Ex: Acesso total ao cardápio e pedidos, sem acesso financeiro." className="border-gray-200" />
                                </div>
                                <div>
                                    <Label className="mb-1.5 block">Modelo Base</Label>
                                    <Select className="border-gray-200 h-11">
                                        <option value="">Começar do zero (Personalizado)</option>
                                        <option value="manager">Copiar de: Gerente</option>
                                        <option value="waiter">Copiar de: Garçom</option>
                                        <option value="finance">Copiar de: Financeiro</option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. Permission Matrix */}
                    {activeTab === 'matrix' && (
                        <div>
                            <div className="mb-6 flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
                                <Info className="w-4 h-4 shrink-0" />
                                Selecione as ações permitidas para cada módulo do sistema.
                            </div>

                            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                            <tr>
                                                <th className="px-6 py-4 border-b border-gray-200 w-1/3">Módulo</th>
                                                {PERMISSIONS.map(p => (
                                                    <th key={p} className="px-4 py-4 text-center border-b border-gray-200 border-l border-gray-100">{p}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {MODULES.map((module) => (
                                                <tr key={module.name} className="bg-white hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <p className="font-bold text-gray-900">{module.name}</p>
                                                        <p className="text-xs text-gray-500">{module.desc}</p>
                                                    </td>
                                                    {PERMISSIONS.map(p => (
                                                        <td key={p} className="px-4 py-4 text-center border-l border-gray-100">
                                                            <div className="flex justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer transition-all hover:scale-110"
                                                                />
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50 text-gray-500 text-xs font-medium">
                                            <tr>
                                                <td colSpan={PERMISSIONS.length + 1} className="px-6 py-3 text-right">
                                                    * As alterações de permissão aplicam-se imediatamente a todos os usuários deste perfil.
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Rules */}
                    {activeTab === 'rules' && (
                        <div className="max-w-3xl mx-auto space-y-6">
                            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-purple-200 transition-colors">
                                <div className="p-2.5 bg-green-50 rounded-xl">
                                    <Check className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">Perfil Padrão</h4>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Definir este perfil como o padrão atribuído automaticamente a novos membros convidados via link.
                                            </p>
                                        </div>
                                        <input type="checkbox" className="w-6 h-6 rounded border-gray-300 text-purple-600 focus:ring-purple-500 ml-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
                                <div className="p-2.5 bg-gray-200 rounded-xl">
                                    <Lock className="w-6 h-6 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-500 text-lg">Restrições de IP / Horário</h4>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Funcionalidade para restringir o acesso apenas à rede do restaurante ou horário de expediente.
                                    </p>
                                    <div className="mt-3 inline-block px-2 py-1 bg-gray-200 text-gray-600 text-[10px] font-bold uppercase rounded">Em Breve</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer - Always visible */}
                <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-3 shrink-0 rounded-b-xl">
                    <Button variant="outline" onClick={onClose} className="border-gray-200 text-gray-600 hover:bg-gray-50">Cancelar</Button>
                    <Button className="bg-[#121212] text-white hover:bg-gray-900 shadow-lg shadow-gray-200 min-w-[140px]">Salvar Perfil</Button>
                </div>
            </div>
        </Modal>
    );
}
