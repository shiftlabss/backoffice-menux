
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModuleLayout from '../components/layout/ModuleLayout';
import { SecondaryNavigation } from '../components/ui/SecondaryNavigation';

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
import { ConfirmModal, useConfirmModal } from '../components/ui/ConfirmModal';

export default function Settings() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.tab || 'restaurant');
    const [isDirty, setIsDirty] = useState(false);

    const { confirm, ConfirmModalComponent } = useConfirmModal();

    // Preferences State
    const [pushNotif, setPushNotif] = useState(true);
    const [emailNotif, setEmailNotif] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Update activeTab if location state changes
    React.useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    // Prevent accidental navigation
    React.useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    const handleTabSwitch = async (tabId) => {
        if (tabId === activeTab) return;

        if (isDirty) {
            const confirmed = await confirm({
                title: "Alterações não salvas",
                message: "Você tem alterações não salvas. Deseja sair sem salvar?",
                variant: "warning",
                confirmText: "Sair sem salvar",
                cancelText: "Ficar e salvar"
            });
            if (!confirmed) return;
        }
        setIsDirty(false);
        setActiveTab(tabId);
    };

    const handleSave = () => {
        setIsDirty(false);
        toast.success("Alterações salvas com sucesso!");
    };

    // Navigation Items for the Module Sidebar
    const navItems = [
        { id: 'restaurant', label: 'Dados do Restaurante', subtitle: 'Informações gerais e logo', icon: Store, onClick: () => handleTabSwitch('restaurant') },
        { id: 'profile', label: 'Meu Perfil', subtitle: 'Dados pessoais e senha', icon: User, onClick: () => handleTabSwitch('profile') },
    ].map(item => ({ ...item, isActive: activeTab === item.id }));

    const renderContent = () => {
        switch (activeTab) {
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
                                <Input label="Nome Completo" defaultValue="Fernando Calado" onChange={() => setIsDirty(true)} />
                                <Input label="Email" defaultValue="admin@menux.com.br" readOnly />
                            </div>

                            <div className="space-y-4 pt-4">
                                <h4 className="font-bold text-foreground">Alterar Senha</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input label="Senha Atual" type="password" onChange={() => setIsDirty(true)} />
                                    <Input label="Nova Senha" type="password" onChange={() => setIsDirty(true)} />
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-border flex justify-end gap-3 items-center">
                            {isDirty && <Badge variant="warning" className="animate-pulse">Alterações Pendentes</Badge>}
                            <Button onClick={handleSave} className="bg-primary text-white">Salvar Alterações</Button>
                        </div>
                    </div>
                );
            case 'restaurant':
                return (
                    <div className="space-y-8 animate-fadeIn">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-foreground">Informações Gerais</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input label="Nome do Restaurante" defaultValue="Restaurante Exemplo" onChange={() => setIsDirty(true)} />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Logomarca</label>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-background border border-border flex items-center justify-center text-xs text-muted-foreground font-medium">
                                            Logo
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => { setIsDirty(true); toast.info('Upload de logo em breve!'); }}>Alterar Logo</Button>
                                    </div>
                                </div>
                            </div>

                            <Input label="Horário de Funcionamento" defaultValue="Seg-Dom: 11:00 - 23:00" onChange={() => setIsDirty(true)} />

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

                        <div className="pt-8 border-t border-border flex justify-end gap-3 items-center">
                            {isDirty && <Badge variant="warning" className="animate-pulse">Alterações Pendentes</Badge>}
                            <Button onClick={handleSave} className="bg-primary text-white hover:bg-[#262626]">Salvar Alterações</Button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <ModuleLayout
            title="Configurações"
            subtitle="Gerencie sua conta e preferências."
            items={null}
        >
            <div className="mb-6">
                <SecondaryNavigation items={navItems} />
            </div>

            {renderContent()}

            <ConfirmModalComponent />
        </ModuleLayout>
    );
}
