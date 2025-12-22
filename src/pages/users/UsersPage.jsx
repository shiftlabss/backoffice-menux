import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button, Input } from '../../components/ui/Form';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Plus, Search, Mail, Clock, Shield, MoreHorizontal, User, History, Edit2, Users } from 'lucide-react';
import UserModal from '../../components/users/UserModal';

// Mock Data
const MOCK_USERS = [
    { id: 1, name: 'Fernando Calado', email: 'fernando@menux.com', role: 'Proprietário', status: 'active', lastAccess: 'Agora' },
    { id: 2, name: 'Maria Silva', email: 'maria.gerente@restaurante.com', role: 'Gerente', status: 'active', lastAccess: '15 min atrás' },
    { id: 3, name: 'João Santos', email: 'joao.caixa@restaurante.com', role: 'Caixa', status: 'active', lastAccess: '2 horas atrás' },
    { id: 4, name: 'Ana Costa', email: 'ana.garcom@restaurante.com', role: 'Garçom', status: 'inactive', lastAccess: '3 dias atrás' },
    { id: 5, name: 'Pedro Alves', email: 'pedro.mkt@restaurante.com', role: 'Marketing', status: 'active', lastAccess: '1 semana atrás' },
];

import { toast } from 'react-hot-toast';

// ... (imports)

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInvite = () => {
        if (!inviteEmail) return;
        toast.success(`Convite enviado para ${inviteEmail}`);
        setInviteEmail('');
    };

    const handleEdit = (user) => {
        toast("Edição de usuário simulada!", { icon: '✏️' });
    };

    const handleHistory = (user) => {
        toast("Histórico de acesso simulado!", { icon: '🕒' });
    };

    const filteredUsers = MOCK_USERS.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Usuários
                    </h1>
                    <p className="text-sm text-text-tertiary">Gerencie acessos e permissões da sua equipe.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Novo Usuário
                    </Button>
                </div>
            </div>

            {/* Tools Section: Search & Invite */}
            <div className="bg-surface p-4 rounded-xl border border-border shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
                {/* Search */}
                <div className="relative w-full lg:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                    <Input
                        placeholder="Buscar por nome, email ou perfil..."
                        className="pl-9 bg-background border-input focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Invite Action */}
                <div className="flex gap-2 w-full lg:w-auto">
                    <Input
                        placeholder="email@exemplo.com"
                        className="min-w-[240px] bg-background border-input"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <Button variant="secondary" onClick={handleInvite} className="whitespace-nowrap gap-2">
                        <Mail className="w-4 h-4" />
                        Convidar
                    </Button>
                </div>
            </div>

            {/* Table Section */}
            <Card className="border-border overflow-hidden bg-surface shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-surface-hover/50">
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="text-text-secondary font-semibold">Usuário</TableHead>
                                <TableHead className="text-text-secondary font-semibold">Perfil</TableHead>
                                <TableHead className="text-text-secondary font-semibold">Status</TableHead>
                                <TableHead className="text-text-secondary font-semibold">Último Acesso</TableHead>
                                <TableHead className="text-right text-text-secondary font-semibold">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="hover:bg-surface-hover border-border transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-text-primary text-sm">{user.name}</p>
                                                <p className="text-xs text-text-tertiary">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-3.5 h-3.5 text-text-tertiary" />
                                            <span className="text-sm text-text-secondary">{user.role}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.status === 'active' ? 'success' : 'secondary'}
                                            className="capitalize"
                                        >
                                            {user.status === 'active' ? 'Ativo' : 'Inativo'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-text-tertiary text-sm">
                                            <Clock className="w-3.5 h-3.5" />
                                            {user.lastAccess}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-secondary hover:text-primary" title="Auditoria" onClick={() => handleHistory(user)}>
                                                <History className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-secondary hover:text-primary" title="Editar" onClick={() => handleEdit(user)}>
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
