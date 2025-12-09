import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button, Input } from '../../components/ui/Form';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Plus, Search, Mail, Clock, Shield, MoreHorizontal, User, History, Edit2 } from 'lucide-react';
import UserModal from '../../components/users/UserModal';

// Mock Data
const MOCK_USERS = [
    { id: 1, name: 'Fernando Calado', email: 'fernando@menux.com', role: 'Proprietário', status: 'active', lastAccess: 'Agora' },
    { id: 2, name: 'Maria Silva', email: 'maria.gerente@restaurante.com', role: 'Gerente', status: 'active', lastAccess: '15 min atrás' },
    { id: 3, name: 'João Santos', email: 'joao.caixa@restaurante.com', role: 'Caixa', status: 'active', lastAccess: '2 horas atrás' },
    { id: 4, name: 'Ana Costa', email: 'ana.garcom@restaurante.com', role: 'Garçom', status: 'inactive', lastAccess: '3 dias atrás' },
    { id: 5, name: 'Pedro Alves', email: 'pedro.mkt@restaurante.com', role: 'Marketing', status: 'active', lastAccess: '1 semana atrás' },
];

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInvite = () => {
        if (!inviteEmail) return;
        alert(`Convite enviado para ${inviteEmail}`); // Simple feedback for now
        setInviteEmail('');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Usuários</h1>
                    <p className="text-sm text-muted-foreground">Gerencie acessos e permissões da sua equipe.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button variant="outline" className="gap-2">
                        <User className="w-4 h-4" />
                        Para Garçom
                    </Button>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Input
                            placeholder="email@exemplo.com"
                            className="min-w-[200px]"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                        />
                        <Button variant="secondary" onClick={handleInvite}>Convidar</Button>
                    </div>
                    <Button
                        className="gap-2 bg-[#121212] text-white hover:bg-[#262626]"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Novo Usuário
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card className="p-4 border-border flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nome, email ou perfil..."
                        className="pl-9 bg-background border-transparent focus:bg-white focus:border-border"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </Card>

            {/* Table */}
            <Card className="border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-background">
                            <TableRow>
                                <TableHead>Usuário</TableHead>
                                <TableHead>Perfil</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Último Acesso</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_USERS.map((user) => (
                                <TableRow key={user.id} className="hover:bg-background">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground text-sm">{user.name}</p>
                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                                            <span className="text-sm font-medium text-foreground">{user.role}</span>
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
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                            <Clock className="w-3.5 h-3.5" />
                                            {user.lastAccess}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Auditoria">
                                                <History className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Editar">
                                                <Edit2 className="w-4 h-4 text-foreground" />
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
