import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Wine
} from 'lucide-react';
import { Button } from '../ui/Form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from '../ui/Table';
import { Badge } from '../ui/Badge';
import { formatCurrency, cn } from '../../lib/utils';
import { menuService } from '../../services/menuService';
import { toast } from 'react-hot-toast';

export default function MenuWineList({ onAdd, onEdit, onDelete }) {
    const [wines, setWines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        fetchWines();
    }, []);

    const fetchWines = async () => {
        try {
            setLoading(true);
            const data = await menuService.getWines();
            setWines(data);
        } catch (error) {
            console.error('Error fetching wines:', error);
            toast.error('Erro ao carregar carta de vinhos');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Tem certeza que deseja excluir o vinho "${name}"?`)) {
            try {
                await onDelete(id);
                setWines(wines.filter(w => w.id !== id));
                toast.success('Vinho excluído com sucesso');
            } catch (error) {
                console.error('Error deleting wine:', error);
                toast.error('Erro ao excluir vinho');
            }
        }
    };

    const filteredWines = wines.filter(wine => {
        const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (wine.grape && wine.grape.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = filterType === 'all' || wine.wine_type === filterType;
        return matchesSearch && matchesType;
    });

    const getWineColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'tinto': return 'bg-red-100 text-red-800 border-red-200';
            case 'branco': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
            case 'rose': return 'bg-pink-100 text-pink-800 border-pink-200'; // Corrected from rosé to rose for variable matching if needed, though usually string comparison
            case 'rosé': return 'bg-pink-100 text-pink-800 border-pink-200';
            case 'espumante': return 'bg-amber-100 text-amber-800 border-amber-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">

            <div className="space-y-4 mb-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Carta de Vinhos</h2>
                    <p className="text-sm text-gray-500 mt-1">Gerencie sua seleção de vinhos e espumantes</p>
                </div>

                <div className="flex justify-end">
                    <Button
                        onClick={onAdd}
                        className="bg-[#8E4156] text-white font-semibold text-[15px] py-3 px-5 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:brightness-110 hover:bg-[#723445] flex items-center gap-2 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Novo Vinho
                    </Button>
                </div>
            </div>

            <Card className="border-gray-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-2 w-full max-w-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar por nome, uva..."
                                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="all">Todos os tipos</option>
                                <option value="Tinto">Tinto</option>
                                <option value="Branco">Branco</option>
                                <option value="Rosé">Rosé</option>
                                <option value="Espumante">Espumante</option>
                                <option value="Sobremesa">Sobremesa</option>
                            </select>
                            <Filter className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Wine className="w-4 h-4" />
                        <span>{wines.length} Rótulos</span>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wine-600"></div>
                        </div>
                    ) : filteredWines.length === 0 ? (
                        <div className="text-center py-12">
                            <Wine className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">Nenhum vinho encontrado</h3>
                            <p className="text-gray-500 mt-1">
                                {searchTerm || filterType !== 'all'
                                    ? 'Tente ajustar os filtros de busca'
                                    : 'Comece adicionando seu primeiro rótulo'}
                            </p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead className="w-[300px]">Rótulo</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Uva</TableHead>
                                    <TableHead>Safra</TableHead>
                                    <TableHead>Origem</TableHead>
                                    <TableHead>Preço</TableHead>
                                    <TableHead className="w-[100px] text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredWines.map((wine) => (
                                    <TableRow key={wine.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {wine.photo_url ? (
                                                    <div className="w-10 h-14 rounded bg-gray-100 flex-shrink-0 overflow-hidden relative">
                                                        <img
                                                            src={wine.photo_url}
                                                            alt={wine.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = 'https://placehold.co/40x56/e2e8f0/94a3b8?text=Wine';
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-14 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-300">
                                                        <Wine className="w-5 h-5" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-gray-900">{wine.name}</div>
                                                    {wine.volume && (
                                                        <div className="text-xs text-gray-500">{wine.volume}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn("font-normal border", getWineColor(wine.wine_type))}>
                                                {wine.wine_type || 'N/A'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-600">{wine.grape || '-'}</TableCell>
                                        <TableCell className="text-gray-600">{wine.vintage || '-'}</TableCell>
                                        <TableCell className="text-gray-600">{wine.origin || '-'}</TableCell>
                                        <TableCell className="font-medium text-gray-900">
                                            {formatCurrency(wine.price)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => onEdit(wine)}
                                                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(wine.id, wine.name)}
                                                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Excluir"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
