
import React, { useState } from 'react';
import {
    Plus, Search, Filter, Pencil, Trash2, Shield, Lock, History, UserPlus,
    MoreVertical, Eye, FileText, QrCode, Mail, CheckCircle, Smartphone
} from 'lucide-react';
import ModuleLayout from '../components/layout/ModuleLayout';
import { Button, Input } from '../components/ui/Form';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';
import { toast } from 'react-hot-toast';

// --- Audit Modal ---
function AuditModal({ isOpen, onClose, user }) {
    const auditLogs = [
        { id: 1, action: 'Criou produto "Bife Ancho Premium"', date: '02/12/2024 14:30', icon: Plus, color: 'text-green-600', bg: 'bg-green-600' },
        { id: 2, action: 'Editou preço de "Risoto de Camarão"', date: '03/12/2024 09:15', icon: Pencil, color: 'text-blue-600', bg: 'bg-blue-600' },
        { id: 3, action: 'Acessou tela Analytics', date: '03/12/2024 10:00', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-600' },
        { id: 4, action: 'Convidou novo usuário (Garçom)', date: '04/12/2024 16:45', icon: UserPlus, color: 'text-orange-600', bg: 'bg-orange-600' },
        { id: 5, action: 'Login realizado com sucesso', date: '05/12/2024 08:00', icon: Lock, color: 'text-green-600', bg: 'bg-green-600' },
        { id: 6, action: 'Exportou relatório financeiro', date: '05/12/2024 11:30', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-600' },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Auditoria: ${user?.name || 'Usuário'}`}>
            <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-background rounded-[16px] border border-border">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center font-bold text-white text-sm">
                        {user?.name?.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">{user?.name}</h4>
                        <p className="text-xs text-muted-foreground">{user?.role} • {user?.email}</p>
                    </div>
                    <Badge variant={user?.status === 'active' ? 'success' : 'secondary'} className="ml-auto">
                        {user?.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                </div>

                <div className="relative border-l border-border ml-3 space-y-6 pb-2">
                    {auditLogs.map((log) => (
                        <div key={log.id} className="relative pl-6">
                            <span className={cn(
                                "absolute -left-1.5 top-1 h-3 w-3 rounded-full border-2 border-white",
                                log.bg
                            )} />
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-muted-foreground font-mono">{log.date}</span>
                                <p className="text-sm text-foreground font-medium flex items-center gap-2">
                                    <log.icon className={cn("w-3 h-3", log.color)} />
                                    {log.action}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-2">
                    <Button variant="outline" size="sm" onClick={() => toast.success('Relatório CSV exportado!')}>
                        <FileText className="w-4 h-4 mr-2" />
                        Exportar Histórico
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

// --- User Modal ---
function UserModal({ isOpen, onClose, user, onSave }) {
    const isEditing = !!user;
    const [role, setRole] = useState(user?.role || 'Garçom');
    const [status, setStatus] = useState(user?.status || 'active');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
        onClose();
        const msg = isEditing ? 'Usuário atualizado!' : 'Convite enviado com sucesso!';
        toast.success(msg);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Editar Usuário' : 'Novo Usuário'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Nome Completo" placeholder="Ex: Maria Silva" defaultValue={user?.name} required />
                <Input label="E-mail ou Telefone" placeholder="Ex: maria@menux.com" defaultValue={user?.email} required />

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Tipo de Acesso</label>
                    <div className="relative">
                        <select
                            className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black appearance-none cursor-pointer"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="Gerente">Gerente (Acesso Total)</option>
                            <option value="Garçom">Garçom (Pedidos)</option>
                            <option value="Financeiro">Financeiro (Relatórios)</option>
                            <option value="Marketing">Marketing (Cardápio)</option>
                            <option value="Caixa">Caixa (Checkout)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">↓</div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-border mt-4">
                    <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" className="gap-2">
                        {isEditing ? <CheckCircle className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                        {isEditing ? 'Salvar Alterações' : 'Convidar Usuário'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default function Users() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        { id: 1, name: 'Fernando Calado', email: 'admin@menux.com', role: 'Gerente', status: 'active', lastAccess: 'Agora' },
        { id: 2, name: 'João Silva', email: 'joao@menux.com', role: 'Garçom', status: 'active', lastAccess: '5 min atrás' },
        { id: 3, name: 'Maria Oliveira', email: 'maria.fin@menux.com', role: 'Financeiro', status: 'active', lastAccess: '2 dias atrás' },
        { id: 4, name: 'Carlos Santos', email: 'carlos@menux.com', role: 'Caixa', status: 'inactive', lastAccess: '30 dias atrás' },
        { id: 5, name: 'Ana Souza', email: 'ana.mkt@menux.com', role: 'Marketing', status: 'active', lastAccess: '1 dia atrás' },
    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNewUser = () => {
        setSelectedUser(null);
        setIsUserModalOpen(true);
    };

    return (
        <ModuleLayout
            title="Usuários"
            subtitle="Gerencie acessos e permissões."
            actions={
                <Button onClick={handleNewUser} className="gap-2 bg-primary text-white hover:bg-[#262626]">
                    <UserPlus className="h-4 w-4" />
                    Novo Usuário
                </Button>
            }
        >
            <div className="space-y-6 animate-fadeIn pb-12">
                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative flex-1 max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar usuário..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleNewUser} className="gap-2 bg-primary text-white hover:bg-[#262626]">
                        <UserPlus className="h-4 w-4" />
                        Convidar
                    </Button>
                </div>

                <Card className="min-h-[400px]">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Usuário</TableHead>
                                    <TableHead>Papel</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Último Acesso</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center font-bold text-foreground">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-foreground">{user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-background">{user.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                                                {user.status === 'active' ? 'Ativo' : 'Inativo'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                                                <History className="h-3 w-3" />
                                                {user.lastAccess}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => { setSelectedUser(user); setIsAuditModalOpen(true); }}
                                                    title="Auditoria"
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                >
                                                    <Shield className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => { setSelectedUser(user); setIsUserModalOpen(true); }}
                                                    title="Editar"
                                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <UserModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                user={selectedUser}
                onSave={() => setIsUserModalOpen(false)}
            />

            <AuditModal
                isOpen={isAuditModalOpen}
                onClose={() => setIsAuditModalOpen(false)}
                user={selectedUser}
            />
        </ModuleLayout>
    );
}
