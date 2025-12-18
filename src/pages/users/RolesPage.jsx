import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Form';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Shield, Plus, Users, Lock, MoreHorizontal, Edit2, Copy, Archive } from 'lucide-react';
import RoleModal from '../../components/users/RoleModal';

const MOCK_ROLES = [
    { id: 1, name: 'Proprietário', users: 1, status: 'active', desc: 'Acesso total ao sistema.', isSystem: true, createdAt: '01/01/2024' },
    { id: 2, name: 'Gerente', users: 2, status: 'active', desc: 'Gestão operacional e financeira.', isSystem: true, createdAt: '01/01/2024' },
    { id: 3, name: 'Garçom', users: 12, status: 'active', desc: 'Apenas pedidos e mesas.', isSystem: true, createdAt: '10/01/2024' },
    { id: 4, name: 'Financeiro', users: 1, status: 'active', desc: 'Acesso a relatórios e caixa.', isSystem: false, createdAt: '15/02/2024' },
    { id: 5, name: 'Marketing', users: 0, status: 'inactive', desc: 'Gestão de campanhas e CRM.', isSystem: false, createdAt: '20/03/2024' },
];

export default function RolesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Perfis de Acesso</h1>
                    <p className="text-sm text-muted-foreground">Defina funções e permissões para sua equipe.</p>
                </div>
                <Button
                    className="gap-2 bg-[#121212] text-white hover:bg-[#262626]"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="w-4 h-4" />
                    Novo Perfil
                </Button>
            </div>

            {/* Table */}
            <Card className="border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-background">
                            <TableRow>
                                <TableHead>Perfil</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Usuários Vinculados</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Criado em</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_ROLES.map((role) => (
                                <TableRow key={role.id} className="hover:bg-background">
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {role.isSystem ? (
                                                <Lock className="w-3.5 h-3.5 text-amber-500" title="Perfil de Sistema" />
                                            ) : (
                                                <Shield className="w-3.5 h-3.5 text-purple-600" />
                                            )}
                                            <span className="font-bold text-foreground text-sm">{role.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-sm text-muted-foreground max-w-[200px] truncate" title={role.desc}>{role.desc}</p>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5 text-muted-foreground" />
                                            <span className="text-sm font-medium text-foreground">{role.users}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={role.status === 'active' ? 'success' : 'secondary'}
                                            className="capitalize"
                                        >
                                            {role.status === 'active' ? 'Ativo' : 'Inativo'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground">{role.createdAt}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Ver Permissões">
                                                <Shield className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Duplicar">
                                                <Copy className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Editar">
                                                <Edit2 className="w-4 h-4 text-foreground" />
                                            </Button>
                                            {!role.isSystem && (
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600" title="Arquivar">
                                                    <Archive className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            <RoleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
