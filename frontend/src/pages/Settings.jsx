
import React, { useState } from 'react';
import ModuleLayout from '../components/layout/ModuleLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button, Input } from '../components/ui/Form';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Copy, Plus, Edit2, Trash2, Store, Users, Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('restaurant');
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    // Navigation Items for the Module Sidebar
    const navItems = [
        { id: 'restaurant', label: 'Dados do Restaurante', icon: Store, onClick: () => setActiveTab('restaurant') },
        { id: 'users', label: 'Usuários e Permissões', icon: Users, onClick: () => setActiveTab('users') },
        { id: 'preferences', label: 'Preferências do Sistema', icon: SettingsIcon, onClick: () => setActiveTab('preferences') },
    ].map(item => ({ ...item, isActive: activeTab === item.id }));
    // Note: isActive logic is handled in ModuleLayout by 'to' or 'id' matching. 
    // Since we are using state here, we need to pass the current state to ModuleLayout or use IDs.

    // Actually ModuleLayout looks for 'to' path matching. Let's adjust ModuleLayout to handle onClick/active state from props too?
    // Or just fake the navigation by passing `to` as `#` and handling `onClick`.
    // Let's rely on ModuleLayout's fallback logic.

    const users = [
        { id: 1, name: 'Fernando Calado', email: 'admin@menux.com', role: 'Administrador', status: 'active' },
        { id: 2, name: 'João Silva', email: 'joao@menux.com', role: 'Gerente', status: 'active' },
        { id: 3, name: 'Maria Oliveira', email: 'maria@menux.com', role: 'Garçom', status: 'active' },
    ];

    // Override the id logic for ModuleLayout highlighting
    const sidebarItems = navItems.map(item => ({
        ...item,
        // Hack: Make the layout think this is the active route if the IDs match
        to: activeTab === item.id ? window.location.pathname : undefined,
        // Better: pass a specific 'isActive' prop if I update ModuleLayout, but for now let's strict match.
        // Actually, let's just update `ModuleLayout` to accept an `activeId` prop to be cleaner.
        // Waiting... I will update ModuleLayout in a second pass if needed, but for now 
        // I will just rely on the `onClick` and manually manage the view.
        // The ModuleLayout uses `location.pathname` for highlighting. 
        // Let's use `onClick` and passed `id` to match logic? 
        // Let's just update the internal logic of ModuleLayout slightly in my mind or use a hack.
        // I'll make the items contain `onClick`.
    }));


    const renderContent = () => {
        switch (activeTab) {
            case 'restaurant':
                return (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-foreground">Informações Gerais</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input label="Nome do Restaurante" defaultValue="Restaurante Exemplo" />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Logomarca</label>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-background border border-border flex items-center justify-center text-xs text-muted-foreground font-medium">
                                            Logo
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => toast.info('Upload de logo em breve!')}>Alterar Logo</Button>
                                    </div>
                                </div>
                            </div>

                            <Input label="Horário de Funcionamento" defaultValue="Seg-Dom: 11:00 - 23:00" />

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Link do Cardápio (QR Code)</label>
                                <div className="flex gap-2">
                                    <Input readOnly value="https://menux.app/r/restaurante-exemplo" className="bg-background font-mono text-xs" />
                                    <Button variant="outline" onClick={() => { navigator.clipboard.writeText('https://menux.app/r/restaurante-exemplo'); toast.success('Link copiado!'); }}>
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copiar
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-border flex justify-end">
                            <Button onClick={() => toast.success('Alterações salvas!')} className="bg-primary text-white hover:bg-[#262626]">Salvar Alterações</Button>
                        </div>
                    </div>
                );
            case 'users':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-foreground">Gerenciar Usuários</h3>
                            <Button onClick={() => setIsUserModalOpen(true)} className="bg-primary text-white">
                                <Plus className="h-4 w-4 mr-2" />
                                Criar Usuário
                            </Button>
                        </div>
                        <div className="border border-border rounded-xl overflow-hidden">
                            <Table>
                                <TableHeader className="bg-background">
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Papel</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                            <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                                            <TableCell><Badge variant="success">Ativo</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Need to pass a way for ModuleLayout to know which is active since we aren't using routes for tabs here yet
    // I will modify ModuleLayout slightly to accept `activeId` in the prop.
    const extendedNavItems = navItems.map(item => ({
        ...item,
        id: item.id // Explicit id passing
    }));

    return (
        <ModuleLayout
            title="Configurações"
            subtitle="Gerencie sua conta e preferências."
            items={extendedNavItems}
        >
            {renderContent()}

            <Modal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                title="Novo Usuário"
            >
                <div className="space-y-4">
                    <Input label="Nome Completo" placeholder="Ex: João Silva" />
                    <Input label="Email" type="email" placeholder="Ex: joao@menux.com" />
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Papel</label>
                        <select className="flex h-12 w-full rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option>Garçom</option>
                            <option>Gerente</option>
                            <option>Administrador</option>
                        </select>
                    </div>
                    <Input label="Senha Inicial" type="password" />
                    <div className="pt-4 flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setIsUserModalOpen(false)}>Cancelar</Button>
                        <Button onClick={() => { toast.success('Usuário criado com sucesso!'); setIsUserModalOpen(false); }}>Criar Usuário</Button>
                    </div>
                </div>
            </Modal>
        </ModuleLayout>
    );
}
