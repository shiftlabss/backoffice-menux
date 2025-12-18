import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button, Input, Label, Select } from '../ui/Form';
import { User, Mail, Shield, Lock, Phone, Upload, Camera } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function UserModal({ isOpen, onClose, user = null }) {
    const isEdit = !!user;
    const [role, setRole] = useState(user?.role || '');
    const [status, setStatus] = useState(user?.status || 'active');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Editar Usuário" : "Novo Usuário"}
            className="max-w-4xl"
        >
            <div className="flex flex-col md:flex-row gap-8">
                {/* LEFT COLUMN: Profile Visuals */}
                <div className="md:w-1/3 flex flex-col items-center gap-6 pt-4">
                    <div className="relative group cursor-pointer">
                        <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                            {user?.photo ? (
                                <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-16 h-16 text-gray-300" />
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 p-2 bg-purple-600 rounded-full shadow-lg border-2 border-white">
                            <Upload className="w-4 h-4 text-white" />
                        </div>
                    </div>

                    <div className="text-center space-y-2 w-full">
                        <h3 className="font-bold text-lg text-foreground">{user?.name || "Novo Usuário"}</h3>
                        <div className={cn(
                            "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                            role === 'Proprietário' ? "bg-black text-white" :
                                role === 'Gerente' ? "bg-purple-100 text-purple-700" :
                                    "bg-gray-100 text-gray-600"
                        )}>
                            {role || "Sem Função"}
                        </div>
                        <p className="text-xs text-gray-500 max-w-[200px] mx-auto leading-relaxed">
                            {role === 'Proprietário' ? 'Acesso total a todos os módulos e configurações.' :
                                role === 'Gerente' ? 'Acesso operacional e relatórios.' :
                                    'Permissões definidas pelo cargo.'}
                        </p>
                    </div>
                </div>

                {/* RIGHT COLUMN: Form Fields */}
                <div className="md:w-2/3 space-y-6">
                    {/* Personal Info Group */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-4 h-4 text-purple-600" /> Informações Pessoais
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input id="name" placeholder="Ex: João Silva" defaultValue={user?.name} className="bg-white border-gray-200" />
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="email">E-mail Corporativo</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input id="email" type="email" placeholder="nome@empresa.com" className="pl-10 bg-white border-gray-200" defaultValue={user?.email} />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input id="phone" placeholder="(11) 99999-9999" className="pl-10 bg-white border-gray-200" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Access & Security */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="role">Função / Cargo</Label>
                                <Select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="border-gray-200"
                                >
                                    <option value="" disabled>Selecione...</option>
                                    <option value="Proprietário">Proprietário</option>
                                    <option value="Gerente">Gerente</option>
                                    <option value="Caixa">Caixa</option>
                                    <option value="Garçom">Garçom</option>
                                    <option value="Cozinha">Cozinha</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">Status da Conta</Label>
                                <Select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={cn(
                                        "border-gray-200 font-medium",
                                        status === 'active' ? "text-green-600" : "text-gray-500"
                                    )}
                                >
                                    <option value="active">Ativo</option>
                                    <option value="inactive">Inativo / Bloqueado</option>
                                </Select>
                            </div>
                        </div>

                        {!isEdit && (
                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mt-4">
                                <h4 className="text-sm font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                    <Lock className="w-4 h-4" /> Definição de Senha Inicial
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs">Senha Provisória</Label>
                                        <Input type="password" placeholder="••••••••" className="bg-white border-yellow-200" />
                                    </div>
                                    <div>
                                        <Label className="text-xs">Confirmar Senha</Label>
                                        <Input type="password" placeholder="••••••••" className="bg-white border-yellow-200" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-yellow-700 mt-2">
                                    O usuário será solicitado a alterar esta senha no primeiro login.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
                <Button variant="outline" onClick={onClose} className="border-gray-200 text-gray-600 hover:bg-gray-50">Cancelar</Button>
                <Button className="bg-[#121212] text-white hover:bg-gray-900 shadow-lg shadow-gray-200">
                    {isEdit ? "Salvar Alterações" : "Criar Usuário"}
                </Button>
            </div>
        </Modal>
    );
}
