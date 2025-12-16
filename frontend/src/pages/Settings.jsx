
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModuleLayout from '../components/layout/ModuleLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button, Input } from '../components/ui/Form';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Switch } from '../components/ui/Switch';
import { Copy, Plus, Edit2, Trash2, Store, Users, User, Settings as SettingsIcon, Bell, Moon, Globe, Volume2, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Sparkles } from 'lucide-react';
import IntelligenceSettings from './intelligence/IntelligenceSettings';

export default function Settings() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.tab || 'restaurant');
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    // Preferences State
    const [pushNotif, setPushNotif] = useState(true);
    const [emailNotif, setEmailNotif] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Update activeTab if location state changes (though typical navigation remounts component)
    React.useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    // Navigation Items for the Module Sidebar
    const navItems = [
        { id: 'restaurant', label: 'Dados do Restaurante', subtitle: 'Informações gerais e logo', icon: Store, onClick: () => setActiveTab('restaurant') },
        { id: 'profile', label: 'Meu Perfil', subtitle: 'Dados pessoais e senha', icon: User, onClick: () => setActiveTab('profile') },
        { id: 'users', label: 'Usuários e Permissões', subtitle: 'Gestão de equipe', icon: Users, onClick: () => setActiveTab('users') },
        { id: 'ai', label: 'Configurações da IA', subtitle: 'Personalize seu assistente', icon: Sparkles, onClick: () => setActiveTab('ai') },
        { id: 'preferences', label: 'Preferências do Sistema', subtitle: 'Configurações globais', icon: SettingsIcon, onClick: () => setActiveTab('preferences') },
    ].map(item => ({ ...item, isActive: activeTab === item.id }));

    // Mock Users Data
    const users = [
        { id: 1, name: 'Fernando Calado', email: 'admin@menux.com', role: 'Administrador', status: 'active' },
        { id: 2, name: 'João Silva', email: 'joao@menux.com', role: 'Gerente', status: 'active' },
        { id: 3, name: 'Maria Oliveira', email: 'maria@menux.com', role: 'Garçom', status: 'active' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'ai':
                return (
                    <div className="animate-fadeIn">
                        <IntelligenceSettings />
                    </div>
                );
            case 'profile':
                return (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-foreground">Meu Perfil</h3>
                            <div className="flex items-center gap-6 pb-6 border-b border-border">
                                <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                                    FC
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Fernando Calado</h4>
                                    <p className="text-muted-foreground">admin@menux.com.br</p>
                                    <Badge className="mt-2" variant="outline">Administrador</Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Nome Completo" defaultValue="Fernando Calado" />
                                <Input label="Email" defaultValue="admin@menux.com.br" readOnly />
                            </div>

                            <div className="space-y-4 pt-4">
                                <h4 className="font-bold text-foreground">Alterar Senha</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Senha Atual" type="password" />
                                    <Input label="Nova Senha" type="password" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-border flex justify-end">
                            <Button onClick={() => toast.success('Perfil atualizado!')} className="bg-primary text-white">Salvar Alterações</Button>
                        </div>
                    </div>
                );
            case 'restaurant':
                // ... (existing restaurant case) ...
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
            case 'preferences':
                return (
                    <div className="space-y-8 animate-fadeIn">
                        {/* Notifications Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Bell className="h-5 w-5" /> Notificações
                            </h3>
                            <div className="bg-white border border-border rounded-xl p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 pr-4">
                                        <p className="font-semibold text-foreground">Notificações Push</p>
                                        <p className="text-sm text-muted-foreground">Receba alertas em tempo real sobre novos pedidos.</p>
                                    </div>
                                    <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 pr-4">
                                        <p className="font-semibold text-foreground">Relatório por Email</p>
                                        <p className="text-sm text-muted-foreground">Receba o fechamento diário no seu email.</p>
                                    </div>
                                    <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                                </div>
                            </div>
                        </div>

                        {/* Appearance & System */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <SettingsIcon className="h-5 w-5" /> Sistema
                            </h3>
                            <div className="bg-white border border-border rounded-xl p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 rounded-lg"><Moon className="h-4 w-4" /></div>
                                        <div className="flex-1 pr-4">
                                            <p className="font-semibold text-foreground">Modo Escuro</p>
                                            <p className="text-sm text-muted-foreground">Alternar entre tema claro e escuro.</p>
                                        </div>
                                    </div>
                                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 rounded-lg"><Volume2 className="h-4 w-4" /></div>
                                        <div className="flex-1 pr-4">
                                            <p className="font-semibold text-foreground">Sons de Alerta</p>
                                            <p className="text-sm text-muted-foreground">Tocar som ao receber novo pedido.</p>
                                        </div>
                                    </div>
                                    <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 rounded-lg"><Globe className="h-4 w-4" /></div>
                                        <div className="flex-1 pr-4">
                                            <p className="font-semibold text-foreground">Idioma</p>
                                            <p className="text-sm text-muted-foreground">Português (Brasil)</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" disabled>Alterar</Button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-border flex justify-end">
                            <Button onClick={() => toast.success('Preferências salvas!')} className="bg-primary text-white">Salvar Preferências</Button>
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
